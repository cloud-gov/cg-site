---
parent: runbook
layout: ops

layout: docs
sidenav: true
title: Troubleshooting Bosh
---
## Accessing jumpboxes

If you're going to be accessing Bosh, you will need to intercept a jumpbox via
Concourse.

### Pre-flight checklist

This section explains how to use Concourse with the `fly` CLI tool. For more
information, [please refer to the official concourse/fly
documentation](https://github.com/concourse/fly#installing-from-the-concourse-ui-for-project-development).

{% asset concourse-fly-download-icons.png alt="Download icons for Concourse fly binary" %}

1. Need to have access to Concourse for cloud.gov (e.g., https://ci.fr.cloud.gov)
1. Need to have `fly` installed locally, the icons for supported platforms are
   located on the bottom right of the Concourse page after logging in. See the
   image above.
1. Login to Concourse through the web, click on the link next to `cli:` to download `fly` for your platform
1. Save to a location in your path and make it executable

### Creating and Intercepting ephemeral jumpboxes

1. Go to [Concourse web](https://ci.fr.cloud.gov/login) and login if necessary
1. Select the [jumpbox pipeline](https://ci.fr.cloud.gov/pipelines/jumpbox)
1. Select the job that corresponds to whichever BOSH you want to work with, e.g. `container-bosh-staging` (we'll call this `JOB_NAME` below)
1. Click the plus button to start your own build of your selected job. Remember
   the build number as you'll be referencing it in the `builds` command.

If you haven't already, name a target for interactions with this concourse using the following command

```sh
$ fly --target <YOUR_TARGET_NAME> login --concourse-url https://ci.fr.cloud.gov
```
You should now see that target when you issue the following command.
```sh
$ fly targets
```
Using the `fly` CLI, check the builds in your targeted Concourse. Builds are
displayed in reverse chronological order, so more recent builds will be
visible towards the top.

```sh
$ fly -t <YOUR_TARGET_NAME> builds
targeting https://ci.fr.cloud.gov

id   pipeline/job                                                    build  status     start                     end                       duration
X    jumpbox/<JOB_NAME>                                              Y      succeeded  datetime                  datetime                  XmYs

# ... output shortened for brevity

```

Using the `fly` CLI, get an interactive shell inside the final build jumpbox step, of type 'task', for
your unique build number.

```sh
$ fly -t <YOUR_TARGET_NAME> intercept -j jumpbox/<JOB_NAME>

# ... output shortened for brevity

X: build #<NUMBER>, step: jumpbox, type: task
```

If you get the message "no containers matched your search parameters!" when
running the intercept command, it could mean that the build you created when
you clicked the plus button in the previous steps has expired.  Return to that
step to create another build and try the intercept command again as quickly
as possible.

You now have a shell with all the Bosh tools, like the Bosh CLI. You can
reference the [Bosh CLI documentation](https://bosh.io/docs) or continue to
the Troubleshooting Bosh Managed VMS section below.

## Troubleshooting Bosh Managed VMS

In order to troubleshoot a Bosh-managed VMS, you will need to first access a
jumpbox, outlined previously. All of the commands below assume that you're operating in the `/tmp/build/<buildid>` directory. 

### Finding the deployment

In order see all the deployments, run the following command:

```sh
$ bosh deployments
Name                   Release(s)                           Stemcell(s)                                      Team(s)  Cloud Config
admin-ui               clamav/9                             bosh-aws-xen-hvm-ubuntu-trusty-go_agent/3421.11  -        latest

# ... output shortened for brevity

X deployments

Succeeded
```

After selecting a deployment from the named list from the above's output, you
will need to download the manifest for that deployment to the local file-system.

```sh
$ bosh -d <DEPLOYMENT_NAME> manifest > ./<DEPLOYMENT_NAME>.yml
```

### Troubleshooting individual VMs

First, get a list of the VMs for your chosen deployment.

```sh
$ bosh -d <DEPLOYMENT_NAME> vms
Instance                                       Process State  AZ  IPs        VM CID               VM Type
admin-ui/some-guid                             running        z1  ab.cd.e.f  i-some-id            admin-ui

# ... output shortened for brevity

X vms

Succeeded
```

We can now have Bosh provide an ssh connection inside the VM.

```sh
$ bosh -d <DEPLOYMENT_NAME> ssh <VM_NAME>
# ... shells into virtual machine from within jumpbox
```

Next, we'll get an interactive root shell.

```sh
$ sudo -i
# ... run new shell as root
```

Finally, we'll go to the Bosh process logs directory to analyze any issues.

```sh
$ cd /var/vcap/sys/log
$ tail <SOME-LOG>.log
# ... analyze process logs
```

### Troubleshooting a long-running deployments

The main deployments for Bosh ( `cg-deploy-bosh` ) generally don't take longer
than 20 minutes. You can get recent historical build times from Concourse.

```sh
fly -t fr builds | \
grep -E 'deploy-bosh.*succeeded' | \
awk '{ print $2 " " $7 }'
```

If an environment's deployment is taking an unusually long amount of time, it
usually related a stuck Bosh deployment. A common symptom of this is seeing
failing Smoke Tests for Cloud Foundry and Logsearch in
[#cg-platform](https://gsa-tts.slack.com/messages/cg-platform).

When this happens, create a jumpbox in the Tooling environment and begin
troubleshooting the Bosh deployment to confirm it's in a `failing` state.

```sh
bosh-cli vms -d ${environment}bosh
```

Once confirmed, use `bosh-cli ssh` to login to that VM.

```sh
bosh-cli ssh -d ${environment}bosh bosh
```

Once in the virtual machine, check `monit` for anything in a `not monitored`
state, `monit summary`. You can also run `watch -n 1 'monit summary'` to monitor
jobs coming back up.

Verify that none of these jobs are running on the machine by checking running
processes `ps ax` for any jobs running that are `not monitored`.

Once confirming that processes are stuck and running but aren't monitored by
`monit`, you should stop all the jobs and restart them.


```sh
monit stop all
monit restart all
```

At this point, you can watch the output of `monit summary` and if the deployment
is still running, `monit` will update the states a few times stopping and
starting the machine. At this point you may be logged out of the Bosh VM and
dropped back into the Concourse jumpbox.


### Troubleshooting Master Bosh

This assumes the only time you'll need to do this is when master bosh fails to deploy.

1. Intercept the Councourse container for the failed build [as described above.](#creating-and-intercepting-ephemeral-jumpboxes)
1. Get the Director's IP from `terraform-secrets/terraform.yml`
1. Follow [Bosh's directions](https://bosh.io/docs/jumpbox/) for connecting to the Director.
