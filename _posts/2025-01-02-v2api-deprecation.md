---
layout: post
date: "2025-01-07"
title: "End-of-life for CloudFoundry API v2"
excerpt: "You may need to update versions of the CF CLI, terraform, and some other tools to support v3"
---

## Cloud.gov end-of-life for v2 of Cloud Foundry API

When Cloud.gov app developers interact with our the platform, they
do so via the Cloud Foundry API at <https://api.fr.cloud.gov>. Currently
that API works for both version 2 (with `/v2` paths) and version 3
(with `/v3` paths).

The v2 API has been in deprecated status with the Cloud Foundry
Foundation since 2021, and in 2025 the [Cloud Foundry development
teams will stop supporting v2](https://github.com/cloudfoundry/community/blob/main/toc/rfc/rfc-0032-cfapiv2-eol.md). At Cloud.gov we will continue
to support v2 for through June 6, 2025, per our 
[deprecation policy]({{site.baseurl}}/docs/technology/responsibilities/#deprecation-policy).


## What this means for our customers

This only impacts developers on the Cloud.gov Platform, not Cloud.gov Pages.
This should not impact any applications running on Cloud.gov, but it may
 impact how you deploy and manage your applications.

Your team should check that all of the following have been updated to v3-compatible
versions, if applicable:

* CF Client, `cf-cli`. You can check your version with `cf version`.
  * Versions v7.7.1 and v8.7.1 are the minimum supported versions.
  * In early 2025, unsupported clients will trigger an alert like this: \
  `🚨 [WARNING] Outdated CF CLI version - please upgrade: https://github.com/cloudfoundry/cli/releases/latest 🚨`
  * You **may** continue using unsupported clients until v2 is discontinued.
  * If you need to reinstall/upgrade your client, follow our [documentation]({{site.baseurl}}/docs/getting-started/setup/#set-up-the-command-line)
* `cf-cli` plugins. Our Cloud.gov documentation references a [number of useful plugins]({{site.baseurl}}docs/management/plugins/), their current [v3 Plugin Status](#plugin-status) is detailed in the table below.
  * For "pending" plugins, periodically check the linked GitHub issues for status.
  * For plugins with no update pending, seek an alternative.
* CF API client libraries such as [cf-java-client](https://github.com/cloudfoundry/cf-java-client), [go-cfclient](https://github.com/cloudfoundry/go-cfclient), or [cf-python-client](https://github.com/cloudfoundry-community/cf-python-client/issues/220):
  * Review your deployment and management scripts for such libraries
  * Ensure you've updated to a v3-compatible library
* Terraform:
  * Use the [v3 CloudFoundry Terraform provider](https://github.com/cloudfoundry/terraform-provider-cloudfoundry)
  * The original [community-supported Terraform provider](https://registry.terraform.io/providers/cloudfoundry-community/cloudfoundry/latest) is not v2-compatible.
* Scripts that directly use `cf curl`:
  * Review the scripts and ensure you're using paths that start with `/v3/`
  * Test the scripts to ensure they perform identically

In general, calls to the API using `/v2` will need to be refactored to use `/v3`. In almost all cases, the API has changed, so:

* review the [v3 upgrade guide](https://v3-apidocs.cloudfoundry.org/index.html#upgrade-guide)
* review the [v3 API docs](https://v3-apidocs.cloudfoundry.org/)
* compare with the [v2 API docs](https://v2-apidocs.cloudfoundry.org/)

### Plugin Status

| Plugin | v3 Compatible? |
|----------------|------|
| [app-autoscaler-plugin](https://github.com/cloudfoundry/app-autoscaler-cli-plugin) | Yes |
| [cf-service-connect](https://github.com/cloud-gov/cf-service-connect) | [Pending](https://github.com/cloud-gov/cf-service-connect/issues/83) |
| [log-cache-cli plugin](https://github.com/cloudfoundry/log-cache-cli/issues/275) | [Pending](https://github.com/cloudfoundry/log-cache-cli/issues/275) |
| [stack-auditor plugin](https://github.com/cloudfoundry/stack-auditor/issues/86) | [Pending](https://github.com/cloudfoundry/stack-auditor/issues/86) |
| [report-usage plugin](https://github.com/aegershman/cf-report-usage-plugin) | [Pending](https://github.com/aegershman/cf-report-usage-plugin/issues/137) | 
| [cf-route-lookup](https://github.com/cloud-gov/cf-route-lookup) | No, use `cf routes` instead|
| [top plugin](https://github.com/ECSTeam/cloudfoundry-top-plugin) | [No](https://github.com/ECSTeam/cloudfoundry-top-plugin/issues/21), this is an admin-only tool, no replacement expected|
| [statistics plugin](https://github.com/swisscom/cf-statistics-plugin) | No, project appears  abandoned
  
## Deprecation timeline

* January 2025: Cloud.gov will start publishing statistics on usage of `v2` vs `v3` endpoints to track progress to decommissioning.
  * v2 CF CLI clients will trigger an alert that they need updating.
* February 2025: Cloud.gov will publish our v2 "brownout" schedule. Brownouts are when we intentionally disable the 
v2 endpoint for a published period of time so developers can test their development and release procedures.
  * We will schedule brownouts to accommodate customer releases, so please respond to any suggested brownout schedule.
* March, April, May 2025: Cloud.gov will hold published v2 brownouts. These will increase in duration as we approach end-of-life.
* June 7, 2025: Cloud.gov will permanently disable v2.

The Cloud.gov team may accelerate this schedule if v2 usage has ceased, or if maintaining v2 poses risks to platform operation.

## Updates

Updates to this page, or links to additional documentation will be listed below:

* 2025-01-07: Added update guidance and links to the v3 upgrade guide and the v2 docs.