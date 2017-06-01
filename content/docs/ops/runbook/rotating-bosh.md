---
menu:
  docs:
    parent: runbook

title: Rotating Secrets - BOSH
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
to the BOSH development team](https://cloudfoundry.slack.com/archives/C02HPPYQ2/p1492784585438034),
there is currently no way to update the BOSH password without recreating the
virtual machines (VMs). This is easy enough to do with the BOSH CLI. It is a
time-consuming process which recreates all of the VMs for a particular
deployment. This is similar to how the platform updates during a Stemcell
release, but because of the limitations of the BOSH agent, the only update that
can be done on these machines are `cloud-check` recreations. Any other attempts
to update VMs is denied with an error.

#### Recreating and cloud checking BOSH VMs

Create a [jumpbox]({{< relref "docs/ops/runbook/troubleshooting-bosh.md#creating-and-intercepting-ephemeral-jumpboxes" >}})
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

## Coordinate & monitor deployments

There are two types of deployments that need to be coordinated here. All of the
BOSH directors deploy using the previous BOSH director in the pipeline with the
exception of the environment BOSH deployments (e.g. `development`, `staging`,
`production`). The other type of dependency are deployments external to the
`deploy-bosh` pipeline which use the BOSH credentials in either their secrets or
credential files.

### BOSH deployments

#### Deploying Master BOSH

Start with the Master bosh deployment and secrets. This will require that you
create a new root CA certificate for this deployment and to sign certificates
for subsequent BOSH deployments (e.g. Tooling, Development, Staging,
Production).

#### Deploying Tooling BOSH

After Master BOSH has been deployed and validated, it's time to update Tooling
BOSH.

#### Deploying other BOSH environments

This sections covers deploy development, staging, and production BOSH. These
deployments are deployed with the Tooling BOSH director. These deployments can
happen serially or

### External deployments

Enumerate dependencies in CF pipelines. These pipelines should be paused before rotating BOSH secrets,
as they will fail until corresponding values have been rotated in each of their secrets files.

#### Finding deployments with BOSH dependencies

```bash
open \
  'https://github.com/search?l=YAML&q=user%3A18F+BOSH_TARGET&type=Code&utf8=%E2%9C%93' \
  'https://github.com/search?l=YAML&q=user%3A18F+BOSH_ENVIRONMENT&type=Code&utf8=%E2%9C%93'
```
