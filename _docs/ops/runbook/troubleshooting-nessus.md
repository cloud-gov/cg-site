---
parent: runbook
layout: ops
layout: docs
sidenav: true
title: Troubleshooting Nessus Manager
---

To clear up the `fetch --register` error in the nessus manager
deployment, you will [create a jumpbox]({{ site.baseurl }}{% link _docs/ops/runbook/troubleshooting-bosh.md %}) to [ssh into the Nessus Manager VM]({{ site.baseurl }}{% link _docs/ops/runbook/troubleshooting-bosh.md%}#troubleshooting-individual-vms ).

Once inside the VM, the `fetch --register` command is run from our `ctl` script
in the [nessus manager release][gh_nmr_ctl_script]. You will find this file on
the VM at `/var/vcap/jobs/nessus-manager/bin/ctl`. You're going to want to run
this command **after coordinating with the System Owner to reset the license key**.

[gh_nmr_ctl_script]: https://github.com/18F/cg-nessus-manager-boshrelease/blob/master/jobs/nessus-manager/templates/bin/ctl

Once this command completes, you will restart the `nessus-service` job on the
VM.

```sh
monit restart nessus-service; watch -n 1 "monit summary"
```


Once the job is reporting as `running`, you will be able to login again via the
Web UI.

## NessusScandeleteFailing

For some reason, `https://github.com/18F/cg-nessus-manager-boshrelease/blob/master/jobs/nessus-manager/templates/bin/emit-scans.sh`
is having problems deleting scans and exiting prematurely.  This may cause scans to build up and eventually run the system out of
disk, which can cause problems.

You will need to [create a jumpbox]({{ site.baseurl }}{% link _docs/ops/runbook/troubleshooting-bosh.md %})
to [ssh into the Nessus Manager VM]({{ site.baseurl }}{% link _docs/ops/runbook/troubleshooting-bosh.md %}#troubleshooting-individual-vms )
and try running the script by hand and debugging it from there. 

This script runs from cron: https://github.com/18F/cg-nessus-manager-boshrelease/blob/master/jobs/nessus-manager/templates/config/crontab

