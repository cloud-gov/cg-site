---
menu:
  docs:
    parent: operations
title: Ongoing Platform Maintenance
---

## Regular maintenance task list

* Keep all forks up-to-date with all upstream changes.
    * Use [this list of all forks with `cg-` in their
      names](https://github.com/18F?utf8=%E2%9C%93&query=%20only%3Aforks%20cg-). We add forks regularly, so check that list during each maintenance run.
* Respond to PagerDuty alerts, including researching causes.
* Respond to `cloud-gov-support@gsa.gov` emails about scans for vulnerabilities and compliance in a timely manner.
* Reconcile `staging` and `master` branches via pull requests for
  `cg-deploy-cf`.

## Manual scans for indicators of compromise

Review all of the following and take action on items that may need further research or other work:

* [PagerDuty alerts](https://18fi.pagerduty.com/incidents)
  * Snort Network Intrusion alerts
  * ClamAV malicious behavior / signature alerts
* Amazon CloudTrail API Activity
* Amazon CloudWatch logs
  * [auth.log access](https://console.amazonaws-us-gov.com/cloudwatch/home?region=us-gov-west-1#metrics:graph=!AX9!D07-2!E01-2!ET8!MN6~5!NS3-2!PD2-2!SS4-2!ST0!VA-P90D~%252Fvar%252Flog%252Fauth.log~300~AWS%252FLogs~Average~IncomingBytes~IncomingLogEvents~LogGroupName~P0D~RIGHT)
  * [auditd logs](https://console.amazonaws-us-gov.com/cloudwatch/home?region=us-gov-west-1#metrics:graph=!D07-2!E01-2!ET8!MN6~5!NS3-2!PD2-2!SS4-2!ST0!VA-P90D~%25252Fvar%25252Flog%25252Fmessages~300~AWS%25252FLogs~Average~IncomingBytes~IncomingLogEvents~LogGroupName~P0D) for [`shadow`, `password`], file modifications, and deletions
  * [syslog](https://console.amazonaws-us-gov.com/cloudwatch/home?region=us-gov-west-1#metrics:graph=!D07-2!E01-2!ET8!MN6~5!NS3-2!PD2-2!SS4-2!ST0!VA-P90D~%25252Fvar%25252Flog%25252Fsyslog~300~AWS%25252FLogs~Average~IncomingBytes~IncomingLogEvents~LogGroupName~P0D) for suspicious daemons, services, time skew, or other suspicious activity
* Nessus security scanning reports
* [Upstream stemcell releases](http://bosh.cloudfoundry.org/stemcells/) for security patches
* [US Cert Alerts](https://www.us-cert.gov/ncas/alerts)
* [Pivotal Alerts](https://pivotal.io/security)
