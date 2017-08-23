---
menu:
  docs:
    parent: runbook

title: Troubleshooting Nessus Manager
---


To clear up the `fetch --register` error in the nessus manager
deployment, you will [create a jumpbox]({{< relref "docs/ops/runbook/troubleshooting-bosh.md" >}}) to [ssh into the Nessus Manager VM]({{< relref "docs/ops/runbook/troubleshooting-bosh.md#troubleshooting-individual-vms" >}}).

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
