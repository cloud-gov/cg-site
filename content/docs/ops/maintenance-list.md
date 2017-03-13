---
menu:
  docs:
    parent: operations
title: Ongoing platform maintenance
---

The platform requires regular support and maintenance activities to remain in a compliant state. If you are on support and you can’t complete any of the items personally, you are responsible for ensuring that an appropriate person does it.

# Is it your first day of support?

- Update the `#cloud-gov-atlas` topic to include your name as the support contact.
- Update the support schedule by moving yourself to the end of the list in the [slackbot auto response](https://gsa-tts.slack.com/customize/slackbot) for `atlas support schedule`.
- Join/unmute `#cloud-gov-support` and `#cloud-gov-atlas-news`.
- Meet with the previous support person and take responsibility for any open support items they are still working on.


# Daily maintenance checklist

The tasks on this checklist should be performed each day.

## Ensure all VMs are running the current stemcell
  
- Get the latest stemcell version from http://bosh.cloudfoundry.org/stemcells/.

- Check https://ci.fr.cloud.gov/teams/main/pipelines/aws-light-stemcell-builder to ensure it has built the same version.

- On each bosh director run `bosh deployments` and verify the stemcell in-use for each deployment is current.

## Review and respond to open alerts

Review all recent alerts and notifications delivered to `cg-notifications` and `#cloud-gov-atlas-news`.  

### Are there no alerts or notifications?
Verify the monitoring system is functioning correctly and confirm that alerts are reaching their expected destinations.

### Is the alert a real issue?
Remediate it.

### Is the alert a false-positive?
If the alert can be tuned to to reduce the number of false-positives with less than one day's work, do it.  If more work is required to tune the alert, add a card to capture the work that needs to be done or +1 an existing card if one already exists for tuning the alert.

Be prepared to represent support needs at the next grooming meeting to ensure that cards to fix alerts are prioritized properly.

## Review AWS CloudTrail logs for the following Events:
- AuthorizeSecurityGroupEgress
- AuthorizeSecurityGroupIngress
- ConsoleLogin
- CreatePolicy
- CreateSecurityGroup
- DeleteTrail
- ModifyVpcAttribute
- PutUserPolicy
- PutRolePolicy
- RevokeSecurityGroupEgress
- RevokeSecurityGroupIngress
- UpdateTrail

If any suspicious activity is discovered discuss with appropriate team members and if neccessary follow the [Security Incident Response Guide]({{< relref "docs/ops/security-ir.md" >}}).

## Review vulnerability and compliance reports
- Nessus Vulnerability Reports
- Nessus Compliance Reports
- [CloudFoundry Alerts](https://www.cloudfoundry.org/category/security/)
- [US Cert Alerts](https://www.us-cert.gov/ncas/alerts)

If the reports contain any HIGH items work to remediate them.

### Is an update from our IaaS provided required to remediate?
Open a case with the IaaS provider and monitor the case until it has been resolved.

### Is a stemcell update required to remediate?
Ask for a date when new stemcells will be delivered in #security in the [CF Slack](https://cloudfoundry.slack.com/).

### Is a bosh release update required to remediate?
Update the bosh release and file a PR for the changes.  Once the PR is merged, ensure the updated release is deployed to all required VMs.

## Review open support requests

Review open Zendesk tickets and provide technical support / details as needed.  When possible reply directly to the customer; if the customer response requires internal discussion post any relevant information in `#cg-supportstream` and coordinate a response with the rest of the team.
