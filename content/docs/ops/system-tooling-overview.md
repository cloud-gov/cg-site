---
menu:
  docs:
    parent: operations
title: System tooling overview
---



# Architecture components

## Log aggregation
### AWS logs

Cloud.gov operations uses awslogsd.sh to collect system and Cloud Foundry logs and push them to CloudWatch. As can be seen in the `cg-aws-boshrelease` repository, the awslogs job on each host runs a pre-start script which creates a config file for awslogsd containing every log file under `/var/vcap/sys/log`, using the instance ID and the path to the log file to create a unique log stream name which can then be viewed in AWS,  in the [AWS console](https://console.amazonaws-us-gov.com/cloudwatch).

For more information, consult the [CloudWatch agent reference](http://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AgentReference.html).

## NTP

Cloud.gov operations places the global NTP configuration in the BOSH deployment manifests in the `cg-deploy-bosh` repository. These servers then end up on each host in `/var/vcap/bosh/etc/ntpserver`, used by the job in root's crontab entry which runs `ntpdate` every 15 minutes.

