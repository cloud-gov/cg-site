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

Since CPUs are virtualized and shared across application containers on a Diego cell virtual machine (VM),
**it is possible for CPU usage to exceed 100%**, which in effect means your application is borrowing CPU
resources from the host VM.

While CPU usage above 100% may be acceptable in limited circumstances, the host
VM for your application regularly changes and thus so does available CPU resources for your application, so you cannot count on there being spare CPU resources for your application to use in the future. Thus, any instances of CPU usage above 100% should be treated as an indication of insufficient scaling and addressed appropriately.

[The calculation used by Cloud Foundry to determine the CPU usage figure is explained in the Diego container metrics documentation](https://docs.cloudfoundry.org/loggregator/container-metrics.html#container-metrics).

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
