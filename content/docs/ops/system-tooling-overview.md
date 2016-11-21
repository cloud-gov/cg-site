---
menu:
  docs:
    parent: operations
title: System tooling overview
---

For new members of our team, this is an overview of system tooling elements used in cloud.gov operations and how they're implemented in our BOSH/Cloud Foundry architecture.

## Architecture components

### Log aggregation
#### Logs to AWS CloudWatch

cloud.gov operations uses Amazon's [CloudWatch log agent](http://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_GettingStarted.html) to collect system and Cloud Foundry logs and push them to CloudWatch.

As seen in the `cg-aws-boshrelease` repository, the `awslogs` job has a configuration file referencing the system logs to be ingested for each host.

The job also runs a pre-start script on each host, which creates an additional config file referencing every log file under `/var/vcap/sys/log`. This config file uses the instance ID and the absolute path to the log file to create a unique log stream name, which you can then view in the [AWS console](https://console.amazonaws-us-gov.com/cloudwatch).

For more information, consult the [CloudWatch agent reference](http://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AgentReference.html).

### Monitoring

### NTP

To keep system clock time accurate, the cloud.gov operations BOSH deployment installs a `cron` job on each host for the root user, which runs `ntpdate` every 15 minutes.

From the `cg-deploy-bosh` repository, the global NTP configuration is defined in the `agent` section of the BOSH deployment manifests and ends up on each host in `/var/vcap/bosh/etc/ntpserver`. This configuration is used in turn by the `ntpdate` script from the [bosh_ntpdate](https://github.com/cloudfoundry/bosh/tree/master/stemcell_builder/stages/bosh_ntpdate) stage of the BOSH stemcell builder.

This configuration is kept geographically diverse by using [NIST Internet Time
Servers](http://tf.nist.gov/tf-cgi/servers.cgi) and leveraging the global
address which resolves across all the server addresses in a round-robin
sequence to equalize the load across all of the servers.
