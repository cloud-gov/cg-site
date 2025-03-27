---
layout: post
title: "Monitoring your application's health using OpenSearch"
date: March 27, 2025
excerpt: How to monitor the CPU and memory metrics for your application on Cloud.gov using OpenSearch
---

One of the benefits of hosting your applications on Cloud.gov is that it offers [performance metrics for
monitoring the health of your application](https://docs.cloudfoundry.org/loggregator/container-metrics.html).

The most important metrics for monitoring your application's health are the memory and CPU metrics, which can help you identify:

- If your application has enough memory provisioned per instance
- If your application is experiencing CPU spikes and associated performance issues
- If you need [to horizontally scale your application instances]({{ site.baseurl }}{% link _kbarticles/2023-08-07-advantages-of-multiple-application-instances.md %})

## A note about CPU metrics

Your application runs in one or more application containers distributed across Diego cell virtual machines (VMs). CPUs are virtualized and shared with other application containers on the VM.

[The CPU usage figure reported as part of the application metrics represents the CPU usage of an application instance as a percentage of a single CPU core][container metrics]. Since there are usually multiple CPU cores per VM, **it is possible for the CPU usage to exceed 100%**, which means your application is using the equivalent compute power of more than a single CPU core.

A CPU usage figure above 100% is not necessarily problematic. The more important metric for identifying issues is CPU entitlement, which is [a formula Cloud Foundry uses to determine how much CPU your application **is allowed to use** from the host VM based on its memory capacity][container metrics].

If the CPU entitlement figure exceeds 100% for any application instance, then the instance is effectively borrowing spare CPU resources from the host VM. Since applications are regularly redistributed across the available host VMs, the amount of spare CPU capacity available on the VM can change, so any instances of CPU entitlement above 100% should be treated as an indication of insufficient application resources and addressed appropriately.

[Cloud Foundry provides a `cf` CLI plugin for determining if any of your application instances are exceeding their CPU entitlement](https://docs.cloudfoundry.org/loggregator/container-metrics.html#cpu-entitlement).

While the CPU usage figure itself does not independently reveal application issues, it is still worth monitoring as a relative value, since sudden spikes in the value can still indicate abnormal performance of your application.

## Retrieving current memory and CPU metrics

To retrieve the current memory and CPU usage for your app, you can use the `cf app` command:

```shell
cf app APP-NAME
```

The output from running that command will look something like:

!["Screenshot of application summary printed in a terminal session by the cf app command"]({{site.baseurl}}/assets/images/content/cf-app-metrics.png)

The `cpu` and `memory` metrics in the output can be interpreted as follows:

- `cpu`: percentage of CPU used by the application, as explained above
- `memory`: memory used out of the amount of memory allowed for each application instance

## How to view historical memory and CPU metrics in OpenSearch

While it is useful to view your application's CPU and memory usage at a given point in time, what is usually
more helpful is to see the trends in your application's health metrics over time and in particular whether
they correlate to observed performance issues for your application.

Logs containining these application metrics are already ingested into the [OpenSearch instance for customer logs][opensearch prod]. Furthermore, there are already built-in visualizations and dashboards for viewing these metrics for your applications.

To view the dashboards for application metrics, follow these steps:

1. Log in to [OpenSearch][opensearch prod].
1. Click `Dashboard` in the bookmark links at the top of the page.

   !["Screenshot of OpenSearch interface with an arrow pointing towards the Dashboard bookmark at the top of the page"]({{site.baseurl}}/assets/images/content/opensearch-click-dashboard-link.png)

1. Enter `App - Metrics` in the search bar on the Dashboards page and click the link to the `App - Metrics` dashboard in the results.

   !["Screenshot of OpenSearch dashboards search page with App - Metrics as the search query"]({{site.baseurl}}/assets/images/content/opensearch-search-app-metrics-dashboard.png)

1. The `App - Metrics` dashboard should automatically populate with metrics for a graph of CPU usage, memory usage (in bytes), and disk usage for all of your applications. Add filters (e.g. `@cf.space`) to limit the results to the desired applications and adjust the time filter to see metrics for the desired time period.

   !["Full-page screenshot of the App - Metrics dashboard in OpenSearch displaying visualizations of CPU usage, memory usage, and disk usage based on application metrics"]({{site.baseurl}}/assets/images/content/opensearch-app-metrics-dashboard.png)

If you encounter any difficulties using these dashboards or have any questions about them, please contact
[{{site.support_email_address}}]({{site.support_email}}) and we would be happy to assist you.

[opensearch prod]: https://logs.fr.cloud.gov
[container metrics]: https://docs.cloudfoundry.org/loggregator/container-metrics.html#container-metrics
