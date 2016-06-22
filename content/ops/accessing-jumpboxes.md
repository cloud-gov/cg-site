---
menu:
  main:
    parent: operations
title: Troubleshooting Bosh
---

## Troubleshooting Bosh Managed VMS

In order to troubleshoot a Bosh-managed VMS, you will need to [access the
jumpboxes via Concourse](#accessing-jump-boxes).

You'll need to set up `bosh` to the correct deployment. You can verify that the
deployment is set by running the following command.

```sh
$ bosh status
# ... output tailed for brevity
Deployment
  not set
```

You can check your bosh deployment is set to a particular deployment. You can
verify your deployments by running the following command.

```sh
$ bosh deployments
# ... output tailed for brevity
Deployments total: X
```

After selecting a deployment from the named list from the above's output, you
will need to download the manifest for that deployment to the local file-system.

```sh
$ bosh download manifest <DEPLOYMENT_NAME> ./<DEPLOYMENT_NAME>.yml
$ bosh deployment monitoring-staging.yml
$ bosh status
# ... output tailed for brevity
Deployment
  Manifest: /path/to/<DEPLOYMENT_NAME>.yml
```

1. ``
1. `$ bosh vms <DEPLOYMENT_NAME>`
1. `$ bosh ssh <VM_NAME>`
1. `$ sudo -i`
1. `$ cd /var/vcap/sys/log`
1. `tail` some logs

### Accessing Jump Boxes

If you're going to be accessing Bosh, you will need to intercept a jumpbox via Concourse.

1. Need to have access to Concourse
1. Need to access the pipeline
1. Need to have `fly` installed locally
1. Visit: https://ci.fr.cloud.gov/pipelines/jumpbox
1. Click the plus button on either tooling / production / staging
1. `fly -t fr builds`
1. `fly -t fr intercept -j jumpbox/container-bosh-staging`
1. select the final build 'task'
1. verify which Bosh you're communicating with
    - [Bosh CLI documentation](https://bosh.io/docs)

