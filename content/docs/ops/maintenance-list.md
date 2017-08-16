---
menu:
  docs:
    parent: operations
title: Ongoing platform maintenance
---

The platform requires regular support and maintenance activities to remain in a
compliant state. If you are on support and you can’t complete any of the items
personally, you are responsible for ensuring that an appropriate person does it.
If you haven't already reached out on Slack, reach out during standup to get
visibility with the people who might best help.

# Is it your first day of support?

- Update the [`#cg-platform`](https://gsa-tts.slack.com/messages/cg-platform/)
topic to include your name as the support contact.
- Update the support schedule by moving yourself to the end of the list in the
[slackbot auto response](https://gsa-tts.slack.com/customize/slackbot) for
`atlas support schedule`.
- Join/unmute [`#cg-support`](https://gsa-tts.slack.com/messages/cg-support/)
and [`#cg-platform-news`](https://gsa-tts.slack.com/messages/cg-platform-news/)
- Meet with the previous support person and take responsibility for any open
support items they are still working on. There is a standing support sync meeting
(Tuesday 4:30-5 pm ET) that you should join if you are rolling on or off support
that week.

## At least once during your week of support

- Confirm that all AWS users have MFA configured. The following should return `[]`
or the users that don't have MFA enabled:

```sh
users=$(aws iam list-users | jq '[.[]| .[] | select (.PasswordLastUsed) | .UserName] | sort')
mfa_users=$(aws iam list-virtual-mfa-devices | jq '[.[]| .[].User.UserName]| sort')
echo "{ \"users\": $users, \"mfa_users\": $mfa_users}" | jq '.users - .mfa_users'
```

# Daily maintenance checklist

The tasks on this checklist should be performed each day.

## PR as you go

If you see a way to make this checklist better, just submit a PR to the
[cg-site](https://github.com/18F/cg-site) repo for `content/docs/ops/maintenance-list.md`

## Ensure all VMs are running the current stemcell

- Get the latest stemcell version from http://bosh.cloudfoundry.org/stemcells/
  for AWS Xen-HVM Light

- From the jumpbox in each of our four environments, run `bosh deployments` and verify the stemcell in-use
for each deployment is current.

- **Note:** The
[nessus manager deployment](https://github.com/18F/cg-deploy-nessus-manager)
requires that the System Owner reset the license key after a stemcell upgrade.
Coordinate with the System Owner to ensure the key is ready to be reset before
deploying an update that will upgrade the stemcell and read through the
[Troubleshooting Nessus runbook]({{< relref
"docs/ops/runbook/troubleshooting-nessus.md">}}).

## Review and respond to open alerts

Review all recent alerts and notifications delivered to [`cg-notifications`](https://groups.google.com/a/gsa.gov/forum/#!forum/cloud-gov-notifications)
and [`#cg-platform-news`](https://gsa-tts.slack.com/messages/cg-platform-news/).

### Are there no alerts or notifications?
Verify the monitoring system is functioning correctly and confirm that alerts
are reaching their expected destinations.

### Is the alert a real issue?
Remediate it.

### Is the alert a false-positive?
If the alert can be tuned to reduce the number of false-positives with less than
one day's work, do it.  If more work is required to tune the alert, add a card
to capture the work that needs to be done or +1 an existing card if one already
exists for tuning the alert.

Be prepared to represent support needs at the next grooming meeting to ensure
that cards to fix alerts are prioritized properly.

## Review AWS CloudTrail events

> [Get familiar with the documentation for CloudTrail logs](http://docs.aws.amazon.com/IAM/latest/UserGuide/cloudtrail-integration.html).

Use the [AWS Console](http://docs.aws.amazon.com/govcloud-us/latest/UserGuide/govcloud-console.html)
to [review API activity history](http://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events-console.html)
for the _EventNames_ listed below.
Or, use the AWS CLI with the appropriate `$event_name`, and parse the emitted JSON:
```sh
aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=$event_name
```

These `EventNames` should be attributed to human individuals on the cloud.gov team:

* ConsoleLogin

All human-generated events should be mapped to named users, e.g. `firstname.lastname`, and NOT to `Administrator`.
Discuss the event(s) with the indicated [cloud.gov operator(s)](https://docs.google.com/spreadsheets/d/1mW3tphZ98ExmMxLHPogSpTq8DzYr5Oh8_SHnOTvjRWM/edit)

All events in the following `EventNames` should be attributed to Terraform:

- DeleteTrail
- UpdateTrail
- ModifyVpcAttribute
- PutUserPolicy
- PutRolePolicy
- RevokeSecurityGroupEgress
- RevokeSecurityGroupIngress
- AuthorizeSecurityGroupEgress
- AuthorizeSecurityGroupIngress
- CreatePolicy
- CreateSecurityGroup

Terraform runs on instances that use instance profile roles, so authorized events will include:

* a user name like `i-17deadbeef1234567`
* a source IP address within AWS.
* an AWS access key starting with `ASIA`

If you observe any non-Terraform activity, discuss the event(s) with the
indicated cloud.gov operator(s) (see above)

If you're unable to ascertain an event was authorized, follow the
[Security Incident Response Guide]({{< relref "docs/ops/security-ir.md" >}}).

## Review vulnerability and compliance reports
- [Nessus Vulnerability Reports](https://nessus.fr.cloud.gov/)
- [Nessus Compliance Reports](https://nessus.fr.cloud.gov/)
- [CloudFoundry Alerts](https://www.cloudfoundry.org/category/security/)
- [US Cert Alerts](https://www.us-cert.gov/ncas/alerts)

If the reports contain any HIGH items work to remediate them.

### Is an update from our IaaS provider required to remediate?
Open a case with the IaaS provider and monitor the case until it has been
resolved.

### Is a stemcell update required to remediate?
Ask for a date when new stemcells will be delivered in #security in the
[CF Slack](https://cloudfoundry.slack.com/).

### Is a bosh release update required to remediate?
Update the bosh release and file a PR for the changes.  Once the PR is merged,
ensure the updated release is deployed to all required VMs.

## Review open support requests

Review the "new" (yellow) and "open" (red) Zendesk tickets. First-tier support
(customer squad) has primary responsibility to do the work of answering these, and
you serve as second-tier support providing technical expertise. You're welcome
to reply to the customer with answers if you like (choose "pending" when you
submit the answer)*, but your main responsibility is to provide technical
diagnoses/advice/details. The easiest way to do that is to write comments on the
associated posts in
[`#cg-supportstream`](https://gsa-tts.slack.com/messages/cg-supportstream).
First-tier support may also ask you for pairing time to work out responses
together.

`*` People with @gsa.gov emails can't receive email via Zendesk, so we have to
email them via the [cloud-gov-support Google Group instead](https://groups.google.com/a/gsa.gov/forum/#!forum/cloud-gov-support).

See also: [Detailed guidance on working with our support tools](https://docs.google.com/document/d/1QXZvcUl-6gtI7jEQObXV9FyiIpJC-Fx1R7RzB0C6PHM/edit#heading=h.80zn694rriw3).
