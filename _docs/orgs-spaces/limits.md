---
parent: orgs-spaces
layout: docs
sidenav: true
title: Manage org quotas
---

Org Managers are free to configure your org's [quota]({{ site.baseurl }}{% link _docs/pricing/quotas.md %}) capacity among your spaces and applications as you see fit. This enables Org Managers to limit usage and corresponding costs.

### How your memory quota works

Every application instance or running task uses some amount of your organizaton's memory quota. The amount of memory used by your running tasks and started applications must not exceed your memory quota.

### Memory overhead for staging applications

In order to stage existing or new applications, [CloudFoundry currently requires 1 GB of memory overhead by default](https://github.com/cloudfoundry/capi-release/blob/a172ff232ab6befdc8f9a55b17bd20cc1a3eeb40/jobs/cloud_controller_ng/spec#L913), meaning you

### Example

As an example, if the `gov-agency` org has a memory quota of 4 GB and the following running applications/tasks:

- 1 application instance using 1 GB in their `staging` space
- 2 application instances using **1 GB each** in their `prod` space

Then they are currently using 3 GB out of their 4 GB memory quota:

```text
(1 GB * 1 instance) + (1 GB * 2 instances) = 3 GB
```

Since 1 GB of memory overhead is required when deploying or redeploying applications,

developers in this org **could not**:

- Increase the memory allocation for any of their applications
- Deploy a new application

None of those options would work because the remaining 1 GB of memory is reserved for staging applications.

However, developers in this org **could**:

- Launch new [tasks](https://docs.cloudfoundry.org/devguide/using-tasks.html#run-tasks) using up to 1 GB of memory. Launching tasks on existing applications does not require staging those applications, thus the [memory overhead for application staging is not necessary](#memory-overhead-for-staging-applications).

## Updating a quota

To change your org quota, please have an Org Manager [send a quota change request email](mailto:inquiries@cloud.gov,support@cloud.gov?subject=Quota%20change%20request&body=Please%20update%20the%20quota%20for%20the%20following%20organization%3A%0A%0AOrg%20name%3A%20%0AMemory%3A%20%23GB%0AServices%3A%20%23%20or%20no%20change%0ARoutes%3A%20%23%20or%20no%20change"). This email link will pre-populate required information.

You can request an increase in number of [application routes]({{ site.baseurl }}{% link _docs/management/custom-domains.md %}) or [service instances]({{ site.baseurl }}{% link _docs/deployment/managed-services.md %}) with no cost impact. Increasing or decreasing org memory quota changes your maximum usage costs.

### View org quota details

To view your [org quota]({{ site.baseurl }}{% link _docs/pricing/quotas.md %}):

1. List the details about your org: `cf org <org>`
2. Find your quota name from the `quota:` property.
3. View your quota: `cf quota <quota>`

### Tracking quota usage

You can use the following `cf` CLI plugins to help identify the right quota to set for your org. They are available from the _CF-Community_ plugin site: `cf add-plugin-repo CF-Community https://plugins.cloudfoundry.org/`

- The [report-usgae plugin](https://github.com/aegershman/cf-report-usage-plugin) gives you a report of how your quota is used across visible organizations and spaces. To install: `cf install-plugin 'Usage Report' -r CF-Community`

- The [Statistics plugin](https://github.com/swisscom/cf-statistics-plugin) gives you real-time visibility of the actual memory usage for each application instance compared to the memory limit. To install: `cf install-plugin Statistics -r CF-Community`

You can use these two in combination to get a good sense of where you can lower instance memory limits to make room for more instances elsewhere in your org or just reduce your quota to reduce costs.
