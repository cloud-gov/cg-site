---
menu:
  docs:
    parent: operations
title: Diego for 18F operators
---

## Overview
Diego is the new application runtime system for Cloud Foundry.  While initially a rewrite of the legacy runtime (DEA) in golang, it has evolved into a container management solution, separate from but in practice integrated with Cloud Foundry.  Note the name "Diego" was originally "DEAgo", a portmanteau of the legacy runtime, DEA, and the new implementation language, go (golang).

See the [Diego Architecture](https://docs.cloudfoundry.org/concepts/diego/diego-architecture.html) document for a short overview.  More detail can be found in the [Diego BOSH Release](https://github.com/cloudfoundry/diego-release) and [Diego Design Notes](https://github.com/cloudfoundry/diego-design-notes) repositories.

For those familiar with the legacy runtime, understanding the [differences between it and Diego](https://docs.cloudfoundry.org/concepts/diego/dea-vs-diego.html) may be helpful.

### Best Practices

Rotate the data store encryption key often.  See https://github.com/cloudfoundry/diego-release/blob/master/docs/data-store-encryption.md

### Misc. Notes

#### Network Provisioning

Diego uses a network in each AZ, separate from the CF networks, and an ELB to service SSH traffic.  The networks, ELB, and associated security group are created and maintained with Terraform as part of the terraform-provision pipeline.

#### Manifest Generation and Deployment

We make use of the standard, recommended manifest generation technique (`cf-release/scripts/generate-deployment-manifest`) and afterwards use `spiff` to add on 18F-specific releases and properties.  This allows us to avoid closely tracking the `diego-release` repository's stubs and generation script.  We trust the diego-release script to generate a proper and sane manifest for any given release, taking into account any job additions or changes.

Deployment is via the `deploy-diego` pipeline in the `cg-deploy-diego` repository.  Eventually, 18F should consider combining the `deploy-cf` and `deploy-diego` pipelines.

#### Sizing

For the initial Diego deployment, we sized the cells to match existing DEAs in size and number. Future sizing/scaling should take into account a number of factors, including current and anticipated workloads, risk tolerance and recovery performance characteristics in the event a cell or AZ goes offline where containers will come up on surviving cells. See scaling notes at https://docs.cloudfoundry.org/concepts/high-availability.html#processes

#### Disk Quota Over-Enforcement during Container Setup

When copying a droplet, a buildpack, or other assets into a container, the Garden-Linux backend may end up over-reporting the amount of disk used in that container. If this disk usage exceeds the quota allocated to the container, the copying-in operation will fail, and the container will crash. If you see crash events for your CF app with the exit description, "Copying into the container failed", this quota issue is likely the cause.

This erroneous reporting appears to be an interaction between the how the backing filesystem that garden-linux uses for container images accounts for disk usage and how payloads are streamed into the container. View the [Cloud Foundry documentation](https://github.com/cloudfoundry/diego-design-notes/blob/master/migrating-to-diego.md#disk-quota-over-enforcement-during-container-setup) for more detail about this issue including possible workarounds.

#### Performance

Diego is a very high-performance runtime solution, with negligible overhead when scaling into the tens of thousands containers.  For more information, see [this CF Summit talk]( https://www.youtube.com/watch?v=VRLgOUGOo-c&index=4&list=PLhuMOCWn4P9jUjjC6Dma-59N8U9UTjjPI)

#### Testing

Diego Acceptance Tests are performed by the CF Acceptance Tests (CATs) and are run by the 18F deploy-cf pipeline.

#### BBS Data Store

18F uses an RDS (PostgreSQL) data store for its BBS component rather than etcd.  This means the etcd properties in the Diego manifest are null and there is no need for consensus (i.e., no need for an odd number of BBS instances).

#### Persistent Volumes

Diego has (beta) support for persistent volumes, which may be a good solution for some workloads.  Volume support was not enabled/implemented as part the of the initial Diego rollout at 18F.  See [this](https://lists.cloudfoundry.org/archives/list/cf-dev@lists.cloudfoundry.org/thread/VRLLU4UIHFPBEIPWYMAXPMVOEF4ULBNW/) post for more detail.

#### Add-ons

Each Diego instance runs standard 18F BOSH releases in addition the standard Diego components.  Examples include BOSH releases for ClamAV, Tripwire, Nessus agent, and Snort.

#### Logging

Diego platform logs are sent to logstash using the `syslog_daemon_config` sink provided by the platform.

#### Metrics

Metrics are ultimately sent to Grafana from the platform via a firehose nozzle and from each Diego VM via collocated `collectd` BOSH releases.

#### Legacy Runtime Removal

Once the Diego backend is determined to be stable and sufficient for 18F needs, remove the legacy backend (DEA) components and integrate `cg-deploy-cf` and `cg-deploy-diego` pipelines.

See guidance [here]( https://github.com/cloudfoundry/diego-release/blob/develop/docs/deploy-alongside-existing-cf.md) and [here]( http://docs.cloudfoundry.org/adminguide/apps-enable-diego.html#redeploy)
