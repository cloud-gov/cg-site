---
menu:
  main:
    parent: operations
title: Troubleshooting Bosh
---

## Accessing Jump Boxes

If you're going to be accessing Bosh, you will need to intercept a jumpbox via Concourse.

### Pre-flight checklist:
1. Need to have access to Concourse for cloud.gov (e.g., https://ci.cloud.gov)
1. Need to have `fly` installed locally
 1. Login to Concourse through the web, click on the link next to `cli:` to download `fly` for your platform
 1. Save to a location in your path

### Creating and Intercepting ephemeral jumpboxes
1. Go to [Concourse web]() and login if necessary
1. Select the [jumpbox pipeline](https://ci.fr.cloud.gov/pipelines/jumpbox)
1. Select the job that corresponds to whichever BOSH you want to work with, e.g. `container-bosh-staging`
1. Click the plus button to start your own build of your selected job
1. `fly -t <YOUR_CONCOURSE_TARGET> builds`
1. `fly -t <YOUR_CONCOURSE_TARGET> intercept -j jumpbox/<JOB_NAME>`
1. select the final build jumpbox step, of type 'task' for your unique build number, e.g.,

```
X: build #<NUMBER>, step: jumpbox, type: task
```

You now have a shell with all the Bosh tools, like the Bosh CLI
- [Bosh CLI documentation](https://bosh.io/docs)

## Troubleshooting Bosh Managed VMS

In order to troubleshoot a Bosh-managed VMS, you will need to first access a jumpbox, outlined previously.

### Setting the deployment
You'll need to set up `bosh` to the correct deployment. You can verify that the
deployment is set by running the following command.

```sh
$ bosh status

  ... output tailed for brevity

Deployment
  not set
```
You can get a list of all the current deployments by running the following command:

```sh
$ bosh deployments
+----------+-------------------+-------------------------+
| Name     | Release(s)        | Stemcell(s)             |
+----------+-------------------+-------------------------+
| admin-ui | admin-ui/10       | bosh-aws-xen/3232.11    |

  ... output tailed for brevity

Deployments total: X
```

After selecting a deployment from the named list from the above's output, you
will need to download the manifest for that deployment to the local file-system.

```sh
$ bosh download manifest <DEPLOYMENT_NAME> ./<DEPLOYMENT_NAME>.yml
$ bosh deployment ./<DEPLOYMENT_NAME>.yml
$ bosh status

  ... output tailed for brevity

Deployment
  Manifest: /path/to/<DEPLOYMENT_NAME>.yml
```

### Troubleshooting individual VMs

First, get a list of the VMs for your chosen deployment

```sh
$ bosh vms <DEPLOYMENT_NAME>
+---------------------+---------+-----+------------+--------------+
| VM                  | State   | AZ  | VM Type    | IPs          |
+---------------------+---------+-----+------------+--------------+
| influxdb/0 (asdf)   | running | n/a | size_z1    | 192.168.x.x  |

 ... output tailed for brevity

VMs total: X
```

We can now have Bosh provide an ssh connection inside the VM
```sh
$ bosh ssh <VM_NAME>
```

Next, we'll get an interactive root shell
```sh
$ sudo -i
```

Finally, we'll go to the Bosh process logs directory to analyze any issues
```sh
$ cd /var/vcap/sys/log
$ tail <SOME-LOG>.log
```


