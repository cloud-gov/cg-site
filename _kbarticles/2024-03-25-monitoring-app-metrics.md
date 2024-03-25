---
layout: post
title: "Monitoring your application's health"
date: March 25, 2024
excerpt: How to monitor the CPU and memory metrics for your application on cloud.gov

---

Like any hosting environment, cloud.gov offers [performance metrics that are incredibly useful for
monitoring the health of your application](https://docs.cloudfoundry.org/loggregator/container-metrics.html).

The most important metrics for monitoring your application's health are the memory and CPU metrics, which can help you identify:

- If your application has enough memory provisioned per instance
- If your application is experiencing CPU spikes and associated performance issues
- If you need [to horizontally scale your application instances]({{ site.baseurl }}{% link _kbarticles/2023-08-07-advantages-of-multiple-application-instances.md %})

## A note about CPU metrics

CPUs are virtualized and shared across application containers on a Diego cell virtual machine (VM).

[The CPU usage figure reported as part of the application metrics represents the CPU usage of an applicaiton instance as a percentage of a single CPU core][container metrics]. Thus, **it is possible for the CPU usage to exceed 100%**, which means your application is more than the compute power of more than a single CPU core.

A CPU usage figure above 100% is not necessarily problematic. The more important metric for identifying scaling issues is CPU entitlement, which is [a formula Cloud Foundry uses to determine how much CPU your application **is allowed to use** from the host VM based on its memory capacity][container metrics].

If the CPU entitlement figure exceeds 100% for any application instance, then the instance is effectively borrowing spare CPU resources from the host VM. Since applications are regularly redistributed across the available host VMs, the amount of spare CPU capacity available on the VM can change, so any instances of CPU entitlement above 100% should be treated as an indication of insufficient scaling and addressed appropriately.

[Cloud Foundry provides a `cf` CLI plugin for determining if any of your applicaiton instances are exceeding their CPU entitlement](https://docs.cloudfoundry.org/loggregator/container-metrics.html#cpu-entitlement).

While the CPU usage figure does not independently reveal scaling issues, it is still worth monitoring as a relative value, since sudden spikes in the value can still indicate abnormal performance of your application.

## Retrieving current memory and CPU metrics

To retrieve the current memory and CPU usage for your app, you can use the `cf app` command:

```shell
cf app APP-NAME
```

The output from running that command will look something like:

!["Screenshot of application summary printed in a terminal session by the cf app command"]({{site.baseurl}}/assets/images/content/cf-app-metrics.png)

The `cpu` and `memory` metrics in the output can be interpreted as follows:

- `cpu`: percentage of CPU used by the application
- `memory`: memory used out of the amount of memory allowed for each application instance

## How to viewing historical memory and CPU metrics in Kibana

While it is useful to view your application's CPU and memory usage at a given point in time, what is usually
more helpful is to see the trends in your application's health metrics over time and in particular whether
they correlate to observed performance issues for your application.

[container metrics]: https://docs.cloudfoundry.org/loggregator/container-metrics.html#container-metrics
