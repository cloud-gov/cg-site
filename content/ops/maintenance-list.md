---
menu:
  main:
    parent: operations
title: Ongoing Platform Maintenance
---

## General List for Operation Maintenance

* Keeping any forks up-to-date with any upstream changes.
    * [Here are all forks with a `cg-` in their
      names](https://github.com/18F?utf8=%E2%9C%93&query=%20only%3Aforks%20cg-).
      And there will be others so make sure you check that list during a
      maintenance run.
* Reacting / Researching PagerDuty alerts
* Responding to `cg-support` emails regarding the latest scans for
  vulnerabilities and compliance in a timely manner.
* Reconciling `staging` and `master` branches via Pull Requests for
  `cg-deploy-cf`.

## Manual Scans for Indicators of Compromise

* Pagerduty - https://18fi.pagerduty.com/incidents
  * Snort Network Intrusion alerts
  * ClamAV malicious behavior / signature alerts
* Amazon CloudTrail API Activity
* Amazon CloudWatch logs
  * Review auth.log access
    * https://console.amazonaws-us-gov.com/cloudwatch/home?region=us-gov-west-1#metrics:graph=!AX9!D07-2!E01-2!ET8!MN6~5!NS3-2!PD2-2!SS4-2!ST0!VA-P90D~%252Fvar%252Flog%252Fauth.log~300~AWS%252FLogs~Average~IncomingBytes~IncomingLogEvents~LogGroupName~P0D~RIGHT
  * Review auditd logs for ['shadow', 'password'] along with file modifications and deletions
  * Review syslog for suspicious daemons, services, time skew or other suspicious activity
    * https://console.amazonaws-us-gov.com/cloudwatch/home?region=us-gov-west-1#metrics:graph=!D07-2!E01-2!ET8!MN6~5!NS3-2!PD2-2!SS4-2!ST0!VA-P90D~%25252Fvar%25252Flog%25252Fmessages~300~AWS%25252FLogs~Average~IncomingBytes~IncomingLogEvents~LogGroupName~P0D
    * https://console.amazonaws-us-gov.com/cloudwatch/home?region=us-gov-west-1#metrics:graph=!D07-2!E01-2!ET8!MN6~5!NS3-2!PD2-2!SS4-2!ST0!VA-P90D~%25252Fvar%25252Flog%25252Fsyslog~300~AWS%25252FLogs~Average~IncomingBytes~IncomingLogEvents~LogGroupName~P0D
* Review Nessus security scanning reports
* Review upstream stemcell releases for security patches - http://bosh.cloudfoundry.org/stemcells/
* Review US Cert Alerts - https://www.us-cert.gov/ncas/alerts
* Review Pivotal Alerts - https://pivotal.io/security
