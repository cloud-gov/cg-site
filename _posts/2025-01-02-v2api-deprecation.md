---
layout: post
date: "2025-01-06"
title: "Deprecation CloudFoundry API v2"
excerpt: "You may need to update versions of the CF CLI, terraform, and some other tools to support v3"
---

## Cloud.gov end-of-life for v2 of Cloud Foundry API

When Cloud.gov app developers interact with our the platform, they
do so via the Cloud Foundry API at https://api.fr.cloud.gov. Currently
that API works for both version 2 (with `/v2` paths) and version 3
(with `/v3` paths).

The v2 API has been in deprecated status with the Cloud Foundry
Foundation since 2021, and in 2025 the Cloud Foundry development
teams will no longer be supporting v2. At Cloud.gov we will continue
to support v2 for another four months, through May 6, 2025.

## What this means for our customers

This only impacts developers on the Cloud.gov Platform, not Cloud.gov Pages.
This should not impact any of the applications running on Cloud.gov, but it may
potentially impact how you deploy and manage your applications.

Your team should check that all of the following have been updated to v3-compatible
versions, if applicable:

* CF Client, `cf-cli`. You can check your version with `cf version`.
  * Versions v7.7.1 and v8.7.1 are the minimum supported versions.
  * In early 2025, unsupported clients will trigger an alert like this: \
  `🚨 [WARNING] Outdated CF CLI version - please upgrade: https://github.com/cloudfoundry/cli/releases/latest 🚨`
  * You **may** continue using unsupported clients until v2 is discontinued on May 6, 2025.
* `cf-cli` plugins. Our Cloud.gov documentation references a number of useful plugins, their current v3 is the [Plugin Status](#plugin-status) table below.
  * For "pending" plugins, periodically check the linked GitHub issues for status
  * For plugins with no update pending, seek an alternative.
* CF API client libraries such as [cf-java-client](https://github.com/cloudfoundry/cf-java-client), [go-cfclient](https://github.com/cloudfoundry/go-cfclient)
], or [cf-python-client](https://github.com/cloudfoundry-community/cf-python-client/issues/220):
  * Review your deployment and management scripts for such libraries
  * Ensure you've updated to a v3-compatible library
* Terraform:
  * Use the [v3 CloudFoundry Terraform provider](https://github.com/cloudfoundry/terraform-provider-cloudfoundry)
  * The original [community-supported Terraform provider](https://registry.terraform.io/providers/cloudfoundry-community/cloudfoundry/latest) is not v2-compatible.
* Scripts that directly use `cf curl`:
  * Review the scripts and ensure you're using paths that start with `/v3/`
  * The API has changed so [review the v3 API docs](https://v3-apidocs.cloudfoundry.org/)

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

### Who is impacted
### What should you do now?
### What happens if your testing fails?


### Timeline

| When | What | Available Stacks | Default Stack |
| ----------------|-------------|------------------|---------------|
| **March 23** | Roll out all cflinuxfs4 buildpacks | cflinuxfs3, cflinuxfs4 | cflinuxfs3
| **March 23 - April 27** | Developers test and update apps to use cflinuxfs4 | cflinuxfs3, cflinuxfs4 | cflinuxfs3
| **April 27** | Support ends for cflinuxfs3.  All new apps pushed will use cflinuxfs4 by default, existing apps will need to be migrated.  | cflinuxfs3, cflinuxfs4 | **cflinuxfs4**
| **April 27 - June 29** | Explicitly opt to use cflinuxfs3 if you need more time | cflinuxfs3, cflinuxfs4 | **cflinuxfs4**
| **June 29**  | cflinuxfs3 buildpacks will be retired from the platform, apps needing cflinuxfs3 buildpacks will need to reference them via URL on the cf push |  cflinuxfs3, cflinuxfs4 | **cflinuxfs4**
| **Sept 28** | Only cflinuxfs4 will be available, this is a breaking change for apps not updated to use cflinuxfs4 |  cflinuxfs4 | **cflinuxfs4**

