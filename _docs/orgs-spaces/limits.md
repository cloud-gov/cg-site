---
parent: orgs-spaces
layout: docs
sidenav: true
title: Manage org quotas
---

Org Managers are free to configure your org's [quota]({{ site.baseurl }}{% link _docs/pricing/quotas.md %}) capacity among your spaces and applications as you see fit. This enables Org Managers to limit usage and corresponding costs.

## How your memory quota works

Every application instance or running task uses some amount of your organizaton's memory quota. The amount of memory used by your running tasks and started applications must not exceed your memory quota.

### Memory overhead for staging applications

In order to stage applications using 1 GB or more memory per application instance, **you must have as much memory left in your quota as the memory used by each instance**.

If you are trying to stage an application using less than 1 GB of memory per application instance, [**then the check for available memory in your quota will be bypassed**](https://github.com/cloudfoundry/cloud_controller_ng/blob/9941def05eca25e732c4a73ac709e05215e056f5/lib/cloud_controller/backends/quota_validating_staging_memory_calculator.rb#L10) and staging should always succeed.

So for example:

- If you want to stage an application with **a single instance using 2 GB of memory**, you must have at least **2 GB** of memory left in your memory quota
- If you want to stage an application with **2 instances each using 1 GB of memory**, you must have at least **1 GB** of memory left in your memory quota
- If you want to stage an application with anything **less than 1 GB of memory per instance**, staging should always succeed

Even if staging for an application succeeds, **the total amount of memory used by all application instance(s) still cannot exceed the memory quota otherwise deployment will fail**.

> **Please note:** [This 1 GB threshold for checking the memory quota when staging applications is based on current CloudFoundry configuration](https://github.com/cloudfoundry/capi-release/blob/a172ff232ab6befdc8f9a55b17bd20cc1a3eeb40/jobs/cloud_controller_ng/spec#L913) and is subject to change.

### Example

As an example, if the `gov-agency` org has a memory quota of 4 GB and the following running applications/tasks:

- 1 application instance using 1 GB in their `staging` space
- 2 application instances using 1 GB each in their `prod` space

Then they are currently using 3 GB out of their 4 GB memory quota:

```text
(1 GB * 1 instance) + (1 GB * 2 instances) = 3 GB
```

Developers in this org **could not**:

- Deploy a new application with greater than 1 GB of memory per instance, since that operation would exceed the total memory in the quota
- Add an instance using [`instances` in the app manifest](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest-attributes.html#instances) and deploy via [`cf push`](https://cli.cloudfoundry.org/en-US/v7/push.html) for either application. Though the application would instantly scale to the desired number of instances, using up all of the memory quota, it would fail when trying restage the app because there would any memory left for staging

Developers in this org **could**:

- [Launch new tasks](https://docs.cloudfoundry.org/devguide/using-tasks.html#run-tasks) using up to 1 GB of total memory. Launching tasks on existing applications does not require staging those applications, thus the [memory overhead for application staging is not necessary](#memory-overhead-for-staging-applications).
- Scale either of their existing applications using [`cf scale`](https://cli.cloudfoundry.org/en-US/v7/scale.html) to have 1 additional instance
- Deploy application(s) using less than or equal to 1 GB of memory per instance without exceeding the remaining 1 GB of the memory quota, such as:
  - 1 application instance using 1 GB of memory
    - The initial deployment of this application would succeed, but subsequent re-pushes or restaging of any application would fail since there would no longer be [sufficient memory overhead to stage any application](#memory-overhead-for-staging-applications)
  - 2 application instances each using 512 MB of memory
  - 4 application instances each using 256 MB of memory

## Updating a quota

To change your org quota, please have an Org Manager [send a quota change request email](mailto:inquiries@cloud.gov,support@cloud.gov?subject=Quota%20change%20request&body=Please%20update%20the%20quota%20for%20the%20following%20organization%3A%0A%0AOrg%20name%3A%20%0AMemory%3A%20%23GB%0AServices%3A%20%23%20or%20no%20change%0ARoutes%3A%20%23%20or%20no%20change"). This email link will pre-populate required information.

You can request an increase in number of [application routes]({{ site.baseurl }}{% link _docs/management/custom-domains.md %}) or [service instances]({{ site.baseurl }}{% link _docs/deployment/managed-services.md %}) with no cost impact. Increasing or decreasing org memory quota changes your maximum usage costs.

### View org quota details

To view your [org quota]({{ site.baseurl }}{% link _docs/pricing/quotas.md %}):

1. List the details about your org: `cf org <org>`
2. Find your quota name from the `quota:` property.
3. View your quota: `cf quota <quota>`

### Tracking quota usage

You can use the following `cf` CLI plugins to help identify the right quota to set for your org.

- The [report-usage plugin](https://github.com/aegershman/cf-report-usage-plugin) gives you a report of how your quota is used across visible organizations and spaces. See the [plugin README for installation instructions](https://github.com/aegershman/cf-report-usage-plugin?tab=readme-ov-file#installation). The plugin can be invoked like so to give a summary of memory usage for an organization:

    ```shell
    cf report-usage -o <org-name> --format string
    ```

- The [Statistics plugin](https://github.com/swisscom/cf-statistics-plugin) gives you real-time visibility of the actual memory usage for each application instance compared to the memory limit. To install:
  1. Add the _CF-Community_ plugin site:

      ```shell
      cf add-plugin-repo CF-Community \
        https://plugins.cloudfoundry.org/
      ```

  1. Install

      ```shell
      cf install-plugin Statistics -r CF-Community
      ```

You can use these two in combination to get a good sense of where you can lower instance memory limits to make room for more instances elsewhere in your org or just reduce your quota to reduce costs.
