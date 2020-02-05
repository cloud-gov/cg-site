---
parent: runbook
layout: ops

layout: docs
sidenav: true
title: Rotating Secrets III - BOSH
---

## Introduction

Rotating BOSH secrets are pretty straight forward and should be done first.
There are known limitations of the BOSH agent when updating the main BOSH
password for each deployment. Deployments of BOSH should be done serially due to
the dependencies of where these BOSH directors are being deployed to. Please
reference the [18F/cg-deploy-bosh](https://github.com/18F/cg-deploy-bosh)
repository along with the rest of this guide.

### Agent limitations when updating BOSH

The following should be referenced throughout the various deployments. [According
to the BOSH development team](https://github.com/cloudfoundry/bosh/issues/1140),
there is currently no way to update the BOSH password without recreating the
virtual machines (VMs). This is easy enough to do with the BOSH CLI. It is a
time-consuming process which recreates all of the VMs for a particular
deployment. This is similar to how the platform updates during a Stemcell
release, but because of the limitations of the BOSH agent, the only update that
can be done on these machines are `cloud-check` recreations. Any other attempts
to update VMs is denied with an error.

#### Recreating and cloud checking BOSH VMs

Create a [jumpbox]({{ site.baseurl }}{% link _docs/ops/runbook/troubleshooting-bosh.md %}#creating-and-intercepting-ephemeral-jumpboxes)
for the BOSH director you'd like to target. Once in the jumpbox, view the status
of the currently deployed VMs.

```sh
bosh-cli vms
```

Any VMs with a status of `failing` need to be recreated in order to have access
to the new BOSH credentials from the updated deployment.

```sh
bosh-cli cloud-check -d ${deployment_name}
```

This command will check all the VMs found in the `${deployment_name}` and prompt
you through the next steps. Select option `4` which will recreate and monitor
the VMs as they each one spins up. Because these VMs are being recreated, **this
process can take a while**. Monitor the recreation task and the platform for any
issues.

You can attach and detach from BOSH tasks at any time by referencing the task
ID.

```sh
bosh-cli tasks -a -r | head
```

Once you have a list of task IDs, you can launch into it by attaching to the
task.

```sh
bosh-cli task ${task_id}
```

You can detach from the task without canceling it with `Ctrl-C`.

## Coordinate & monitor deployments

There are two types of deployments that need to be coordinated here. All of the
BOSH directors deploy using the previous BOSH director in the pipeline with the
exception of the environment BOSH deployments (e.g. `development`, `staging`,
`production`). The other type of dependency are deployments external to the
`deploy-bosh` pipeline which use the BOSH credentials in either their secrets or
credential files.

### External deployments

There are various pipelines that require BOSH credentials which will immediately
be out of date once the BOSH deployment it targets and cause deployment failures
and potentially cause downtime. All pipelines depending on BOSH must be paused
and updated before unpausing them again.

#### Finding deployments with BOSH dependencies

Create a jumpbox for each environment and run `bosh-cli deployments` to get a
list of all the deployments that will require pausing in Concourse. This list
can be cross-referenced with the following searchings on searches on GitHub for
the `BOSH_TARGET` and `BOSH_ENVIRONMENT` with a `YAML` filetype to find all the
different deployments

```sh
open \
  'https://github.com/search?l=YAML&q=user%3A18F+BOSH_TARGET&type=Code&utf8=%E2%9C%93' \
  'https://github.com/search?l=YAML&q=user%3A18F+BOSH_ENVIRONMENT&type=Code&utf8=%E2%9C%93' \
  'https://github.com/search?l=YAML&q=user%3A18F+upload-release&type=Code' \
  'https://github.com/search?l=YAML&q=user%3A18F+bosh-errand&type=Code'
```

Once these pipelines are paused, update the values after all BOSH deployments
have successfully deployed. Then unpause pipelines after you have successfully
uploaded secrets or reflown pipelines.

### BOSH deployments

There are five BOSH deployments which are used to deploy cloud.gov. Master BOSH
deploys Tooling BOSH which deploys Development, Staging, and Production BOSH.
During a deployment of the BOSH director, BOSH will be unresponsive and will
lead to errors in [any deployments that interact with the director](#external-deployments).
Verify that these external deployments have been paused before proceeding with
these steps.

Besides certificates, all secrets in each BOSH deployment can be generated and
replaced or can be updated from [rotated IAM users]({{ site.baseurl }}{% link _docs/ops/runbook/rotating-iam-users.md %}).

#### Deploying Master BOSH

Start with the Master bosh deployment and secrets. This will require that you
create a new root CA certificate for this deployment and to sign certificates
for subsequent BOSH deployments (e.g. Tooling, Development, Staging,
Production).

In the [`cg-deploy-bosh`](https://github.com/18F/cg-deploy-bosh) repository, you
will find a `generate-master-bosh-certs.sh`. Create a `./tmp` directory
and run that script in there with the IP address for Master BOSH. The IP address
can be found in the Terraform output for the Tooling environment as `master_bosh_static_ip`.

```sh
./generate-master-bosh-certs.sh ${master_bosh_static_ip}
```

Once the certificates have been generated, update the values in the Master BOSH
secrets. See the [secret key management]({{ site.baseurl }}{% link _docs/ops/secrets.md %})
and substitute the file you're downloading for the Master BOSH file found in the
`deploy-bosh` pipeline.

The script will also upload a new [key pair](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html) to AWS and output the name and fingerprint.  Use the name as the value for [aws.default_key_name](https://github.com/cloudfoundry-incubator/bosh-aws-cpi-release/blob/master/jobs/aws_cpi/spec#L26-L28) in all bosh manifests.

##### Encrypting private key

Use the same secrets passphrase you generated for the encrypting both the
secrets file and the private key. Encrypt and upload the private key using the
same technique for [secret key management]({{ site.baseurl }}{% link _docs/ops/secrets.md %}).

```sh
INPUT_FILE=master-bosh.key \
OUTPUT_FILE=master-bosh.pem \
PASSPHRASE=${master_bosh_secrets_passphrase} \
$CG_SCRIPT/encrypt.sh
```

##### Troubleshooting masterbosh deployment

If you encounter an issue with the `masterbosh` deployment. It's very likely due
to the `master-bosh-state.json` file being in a non-ideal state. In order to get
this file into a valid state, follow [the instructions found in the BOSH
troubleshooting guide](https://bosh.io/docs/using-bosh-init.html#recover-deployment-state).

Make sure you edit the file down only to the properties featured in the guide.
You can find the instance & volume IDs from the AWS console. Check [the resource
in the pipeline named `masterbosh-state`][mbosh-state] in the
[`cg-deploy-bosh`](https://github.com/18F/cg-deploy-bosh) repository to get the
location of the `master-bosh-state.json` file.

[mbosh-state]: https://github.com/18F/cg-deploy-bosh/search?q=masterbosh-state&type=Code&utf8=✓

#### Deploying Tooling BOSH

In the [`cg-deploy-bosh`](https://github.com/18F/cg-deploy-bosh) repository, you
will find a `generate-bosh-certs.sh`. Create a `./tmp` directory and run that
script in there with the IP address for Tooling BOSH. The IP address can be
found in the Terraform output for the Tooling environment as `tooling_bosh_static_ip`.

```sh
./generate-bosh-certs.sh Tooling ${tooling_bosh_static_ip}
```

Wait to deploy this BOSH until after Master BOSH deploys successfully and is
validated.

#### Deploying other BOSH environments

These deployments are deployed with the Tooling BOSH director.  In the
[`cg-deploy-bosh`](https://github.com/18F/cg-deploy-bosh) repository, you will
find a `generate-bosh-certs.sh`. Create a `./tmp` directory and run that script
in there with the IP address for each BOSH (e.g. Development, Staging,
Production). The IP addresses can be found in the Terraform output for each
environment as `bosh_static_ip`.

```sh
./generate-bosh-certs.sh Development ${development_bosh_static_ip}
./generate-bosh-certs.sh Staging ${staging_bosh_static_ip}
./generate-bosh-certs.sh Production ${production_bosh_static_ip}
```

#### Verify AWS key pair has been rotated for all VMS

After rotating all secrets and recreating the VMs, all bosh-managed instances should be using the new key pair generated by `generate-master-bosh-certs.sh`.  Verify this by running the following command.  It will report any instances that are not using the key pair.

```sh
aws ec2 describe-instances --max-items 500 | jq '.Reservations[].Instances[] | select(.State.Name == "running") | select(.KeyName != "'${KEYNAME}'") | .InstanceId+" "+.KeyName'
```
