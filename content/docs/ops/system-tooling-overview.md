---
menu:
  docs:
    parent: operations
title: System tooling overview
---

For new members of the team who might be unfamiliar with Cloud Foundry, BOSH, Concourse/fly and a multi-repository configuration, there are many familiar aspects of the system, especially system tooling, that might well be difficult to discover. This document presents a simple overview of common system tooling elements used in Cloud.gov operations and how they're implemented in the context of our BOSH/Cloud Foundry architecture.

### Architecture components

#### Log aggregation
##### Logs to AWS CloudWatch

Cloud.gov operations uses Amazon's own [CloudWatch log agent](http://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_GettingStarted.html) to collect system and Cloud Foundry logs and push them to CloudWatch. 

As can be seen in the `cg-aws-boshrelease` repository, the `awslogs` job has a configuration file referencing the system logs to be ingested for each host. Also, the job runs a pre-start script on each host, which creates an additional config file referencing every log file under `/var/vcap/sys/log`, using the instance ID and the absolute path to the log file to create a unique log stream name which can then be viewed in the [AWS console](https://console.amazonaws-us-gov.com/cloudwatch).

For more information, consult the [CloudWatch agent reference](http://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AgentReference.html).

#### Monitoring

#### NTP

To keep system clock time accurate, the Cloud.gov operations BOSH deployment installs a `cron` job on each host for the root user which runs `ntpdate` every 15 minutes. 

From the `cg-deploy-bosh` repository, the global NTP configuration is defined in the `agent` section of the BOSH deployment manifests and ends up on each host in `/var/vcap/bosh/etc/ntpserver`, used in turn by the `ntpdate` script from the [bosh_ntpdate](https://github.com/cloudfoundry/bosh/tree/master/stemcell_builder/stages/bosh_ntpdate) stage of the BOSH stemcell builder. 

This configuration is kept geographically diverse by using pool.ntp.org's [continental zones](http://www.pool.ntp.org/zone/@).

