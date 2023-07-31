---
parent: operations
layout: ops
layout: docs
sidenav: true
title: Ongoing platform maintenance
---



## Daily maintenance checklist
{:.no_toc}

The tasks on this checklist should be performed each day by the platform operator who is currently on the maintenance rotation.

- table of contents
{:toc}

## Review and respond to alerts

Review all alerts on [Prometheus](https://prometheus.fr.cloud.gov/alerts) (requires the VPN).

## Investigate open alerts

- Use our guides for reviewing cloud.gov alerts ([prometheus](https://github.com/cloud-gov/cg-deploy-prometheus/tree/master/bosh) for alert descriptions, links to the relevant rules, and starting points for reviewing each type of alert.
- Was the alert caused by known maintenance or testing in dev environments? Check with other members of the cloud.gov team if you can't determine the source.
- Is this a recurring alert? Search alert history to determine how frequently it is occurring and what event may have started its firing.
- Should the underlying condition have caused an alert? Alerts should only be raised when they're something we need to remediate.

### Is the alert a real issue?

If the alert may indicate a security issue follow the
[Security Incident Response Guide]({{ site.baseurl }}/docs/ops/security-ir)
, otherwise work to remediate its cause.

### Is the alert a false-positive?

If the alert can be tuned to reduce the number of false-positives with less than
two hours of work, do it.  If more work is required to tune the alert, add a card
to capture the work that needs to be done or +1 an existing card if one already
exists for tuning the alert.

Be prepared to represent support needs at the next grooming meeting to ensure
that cards to fix alerts are prioritized properly.

## Provide support backup

As necessary and requested, provide assistance to the platform operator on a [support rotation]({{ site.baseurl }}/docs/ops/customer-support) concurrent to your maintenance rotation.

## Review expiring certificates

You can view a consolidated list of all expiring certificates on the [Doomsday Dashboard](https://doomsday.fr.cloud.gov/) (requires the VPN). Make note of any that are expiring within two weeks, make sure the team is aware, and plan with the team to
determine who will renew the expiring certificate(s) and when.

You can also view this information in each of our four environments, `tooling`, `development`, `staging`, and `production`, by running `doomsday dashboard` on the command line.

## Ensure all VMs are running the current stemcell

- Lookup the most recent published stemcell version at: <https://bosh.cloudfoundry.org/stemcells/>

- From the jumpbox in each of our four environments, `tooling`, `development`,
  `staging` and `production`, run `bosh deployments` and verify the stemcell in
  use for each deployment is current. For example, the 621.61 stemcell is
  outdated below:

  ```sh
  root@Tooling:/tmp/build/8e72821d$ bosh deployments | grep go_agent
  concourse-production    awslogs-xenial/14       bosh-aws-xen-hvm-ubuntu-xenial-go_agent/621.64  -
  concourse-staging       awslogs-xenial/14       bosh-aws-xen-hvm-ubuntu-xenial-go_agent/621.64  -
  developmentbosh         awslogs-xenial/14       bosh-aws-xen-hvm-ubuntu-xenial-go_agent/621.64  -
  doomsday                awslogs-xenial/14       bosh-aws-xen-hvm-ubuntu-xenial-go_agent/621.64  -
  nessus-manager-prod     awslogs-xenial/14       bosh-aws-xen-hvm-ubuntu-xenial-go_agent/621.64  -
  opsuaa                  awslogs-xenial/14       bosh-aws-xen-hvm-ubuntu-xenial-go_agent/621.64  -
  postfix-production      awslogs-xenial/14       bosh-aws-xen-hvm-ubuntu-xenial-go_agent/621.61  -
                          bosh-dns/1.20.0         bosh-aws-xen-hvm-ubuntu-xenial-go_agent/621.64
  productionbosh          awslogs-xenial/14       bosh-aws-xen-hvm-ubuntu-xenial-go_agent/621.64  -
  prometheus-production   awslogs-xenial/14       bosh-aws-xen-hvm-ubuntu-xenial-go_agent/621.64  -
  prometheus-staging      awslogs-xenial/14       bosh-aws-xen-hvm-ubuntu-xenial-go_agent/621.64  -
  stagingbosh             awslogs-xenial/14       bosh-aws-xen-hvm-ubuntu-xenial-go_agent/621.64  -
  ```

- When the stemcells are out-of-date:
  - Trigger the appropriate `deploy-...` jobs in Concourse
    - Triggering more than X jobs simultaneously is not advised in case any
      issues arise during the deployment or if you're interrupted. X being a
      number you're comfortable with monitoring which can vary based on
      experience or confidence in the deployment.  If you're not sure, '3' is a
      good starting point.

## Monitor automated platform builds

The platform's CI builds can be automatically triggered by third-party resources when updates are released (ie. source code, stemcell). Monitor the `#cg-platform` and `#cg-platform-news` Slack channels for notifications about any failed builds. For any automated builds that failed, review the logs of the failed build task in Concourse, and escalate the failure to platform ops if a cursory triage and rebuild does not fix this issue.

### Monitor terraform-provision pipeline

As part of platform automation, and Concourse and Terraform run a `plan-bootstrap-<environment>` job if parts of our infrastructure have changed due to PR or automation. Alerts for reviewing Terraform plan runs are located in `#cg-platform`.  Review the plan updates and coordinate a time to run `bootstrap-<environment>` so the changes to the infrastructure can be made. All `bootstrap-<environment>` Concourse jobs are set for manual operator release so make sure the review of `plan-bootstrap-<environment>` and running `bootstrap-<environment>` are done in a timely fashion.  This is needed to keep parts of the platform current like platform certificates as example.

### Monitor production deployment jobs

The Concourse jobs for deploying `production-cf` and `production-logsearch` are setup for manual operator release.  Keep track of when changes are ready to deploy in production since these are customer facing and make sure deployment of these jobs are done during normal platform support hours and during pre-determined times as described [here](https://cloud.gov/docs/overview/customer-service-objectives/). 

## Monitor AWS alerts

The platform uses AWS GuardDuty to monitor changes to the platform.  If alerts are triggered by GuardDuty, they will be emailed to the security Google group.  Review these alerts to determine what triggered the alert.

### Monitor failed AWS logins

Keep tabs on the private channel `#cg-aws-security` and review the alerts that are posted on failed logins via [cg-aws-cloudtrail-notifier](https://github.com/cloud-gov/cg-aws-cloudtrail-notifier).  Review the linked CloudWatch alert for more details and research what triggered the alert.  As part of the response, in thread to each of these alerts, respond the review status of the alert.

If you're unable to ascertain why an alert was triggered, follow the
[Security Incident Response Guide]({{site.baseurl}}/docs/ops/security-ir).

## Review vulnerability and compliance reports

- [Nessus Vulnerability Reports](https://nessus.fr.cloud.gov/)
- [Nessus Compliance Reports](https://nessus.fr.cloud.gov/)
- [CloudFoundry Alerts](https://www.cloudfoundry.org/category/security/)
- [US Cert Alerts](https://www.cisa.gov/news-events/cybersecurity-advisories)

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

## PR as you go

If you see a way to make this checklist better, just submit a PR to the
[cg-site](https://github.com/cloud-gov/cg-site) repo for `content/docs/ops/maintenance-list.md`

---

## Page information

To view modifications to this page, review the [git commit history](https://github.com/cloud-gov/cg-site/commits/master/_docs/ops/maintenance-list.md).
