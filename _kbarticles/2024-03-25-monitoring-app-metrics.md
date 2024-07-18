---
layout: post
title: "Monitoring your application's health"
date: March 25, 2024
excerpt: How to monitor the CPU and memory metrics for your application on cloud.gov

---

One of the benefits of hosting your applications on cloud.gov is that it offers [performance metrics for
monitoring the health of your application](https://docs.cloudfoundry.org/loggregator/container-metrics.html).

The most important metrics for monitoring your application's health are the memory and CPU metrics, which can help you identify:

- If your application has enough memory provisioned per instance
- If your application is experiencing CPU spikes and associated performance issues
- If you need [to horizontally scale your application instances]({{ site.baseurl }}{% link _kbarticles/2023-08-07-advantages-of-multiple-application-instances.md %})

## A note about CPU metrics

CPUs are virtualized and shared across application containers on a Diego cell virtual machine (VM).

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

## How to view historical memory and CPU metrics in Kibana

While it is useful to view your application's CPU and memory usage at a given point in time, what is usually
more helpful is to see the trends in your application's health metrics over time and in particular whether
they correlate to observed performance issues for your application.

Logs containining these application metrics are already ingested into the [Elasticsearch/Kibana instance for customer logs][kibana prod]. Furthermore, there are already built-in visualizations and dashboards for viewing these metrics for your applications.

To view the dashboards for application metrics, follow these steps:

1. Log in to [Kibana][kibana prod].
1. Click `Dashboard` in the bookmark links at the top of the page.

    !["Screenshot of Kibana interface with an arrow pointing towards the Dashboard bookmark at the top of the page"]({{site.baseurl}}/assets/images/content/kibana-click-dashboard-link.png)

1. Enter `App - Metrics` in the search bar on the Dashboards page and click the link to the `App - Metrics` dashboard in the results.

    !["Screenshot of Kibana dashboards search page with App - Metrics as the search query"]({{site.baseurl}}/assets/images/content/search-app-metrics-dashboard.png)

1. The `App - Metrics` dashboard should automatically populate with metrics for a graph of CPU usage, memory usage (in bytes), and disk usage for all of your applications. Add filters (e.g. `@cf.space`) to limit the results to the desired applications and adjust the time filter to see metrics for the desired time period.

    !["Full-page screenshot of the App - Metrics dashboard in Kibana displaying visualizations of CPU usage, memory usage, and disk usage based on application metrics"]({{site.baseurl}}/assets/images/content/app-metrics-dashboard.png)

1. If you want to see a dashboard of the same application metrics, but grouped by **each application instance** instead of just each application, repeat steps 3 - 4 and search for a dashboard name `App - Metrics by instance`.

    !["Full-page screenshot of the App - Metrics by instance dashboard in Kibana displaying visualizations of CPU usage, memory usage, and disk usage aggregated by application instance"]({{site.baseurl}}/assets/images/content/app-metrics-by-instance-dashboard.png)

If you encounter any difficulties using these dashboards or have any questions about them, please contact
[{{site.support_email_address}}]({{site.support_email}}) and we would be happy to assist you.

[kibana prod]: https://logs.fr.cloud.gov
[container metrics]: https://docs.cloudfoundry.org/loggregator/container-metrics.html#container-metrics
