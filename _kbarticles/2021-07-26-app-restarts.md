---
layout: post
title: "Questions About App Restarts"
date: July 26, 2021
excerpt: When do application restarts happen and what do they mean
---

Application restarts are a common occurrence on the Cloud.gov platform, as our operators [regularly deploy updates to the various system components](https://cloud.gov/docs/deployment/app-maintenance/#operating-system-patching). This can sometimes cause confusion as application developers or system owners may interpret restarts as an issue with the way their application is built or functions.

### What happens when an app crashes?

When an app instance running on Cloud.gov crashes for some reason (e.g., an unhandled exception occurs in your application code), the platform will automatically try to restart it. The platform automatically restarts your app by rescheduling the instance on another container 3 times. After 3 failed restarts, the platform [gradually increases the amount of time between restart attempts](https://docs.cloudfoundry.org/devguide/deploy-apps/app-lifecycle.html#crash-events).

### What else causes app restarts?

Certain maintenance activities undertaken by the Cloud.gov team require restarting VMs with containers hosting app instances. For example, when we update stemcells or installs a new version of Cloud Foundry - the software that [underlies Cloud.gov](https://cloud.gov/docs/overview/what-is-cloudgov/) - all the VMs in the deployment are restarted.

Cloud Foundry automatically relocates the instances on VMs that are shutting down through a process called "evacuation." Cloud Foundry recreates the app instances on another VM, waits until they are healthy, and then shuts down the old instances. During this  process, apps running a single instance may become temporarily unavailable if the replacement instance does not become healthy within the platform’s operation timeout, which defaults to 10 minutes.

This underscores the importance of running [multiple instances of your application](https://cloud.gov/docs/management/multiple-instances/) to ensure that app restarts do not result in downtime. 


### How can I tell what is causing my app to restart?

The easiest thing to check is the day of the week. Our operators perform platform maintenance that could result in your app restarting from **Tuesday through Thursday** each week. Application restarts that occur on these days are often related to platform maintenance and deployments.

Additionally, if you are seeing app restarts in your application logs, you can usually discern if the cause is platform maintenance or if there is an issue causing your app to crash.

During regular platform maintenance, you may see log entries that look like the following that indicate the evacuation process for restarting apps:

```
[CELL/0] OUT Cell fa1c44d16280de789416ecae0161d774 requesting replacement for instance 72aa902bd0e5852e8413002a9a6eb46c
[CELL/0] OUT Cell fa1c44d16280de789416ecae0161d774 creating container for instance 72aa902bd0e5852e8413002a9a6eb46c
[CELL/0] OUT Cell fa1c44d16280de789416ecae0161d774 successfully created container for instance 72aa902bd0e5852e8413002a9a6eb46c

```

When an app crashes for some reason, the log signature looks very different. For example, here are some logs generated when an app crashes due to an unhandled exception:

```
2021-07-27T10:49:02.95-0400 [API/1] OUT Process has crashed with type: "web"
2021-07-27T10:49:03.02-0400 [PROXY/0] OUT Exit status 137
2021-07-27T10:49:03.03-0400 [API/1] OUT App instance exited with guid 975f3c9543c5a8069ca04a1ee56d83a8 payload: {"instance"=>"0d8ecfd137c9de128e557c3f7d539b32", "index"=>0, "cell_id"=>"b701ee4f-885a-4c07-80c1-036e3d494e0a", "reason"=>"CRASHED", "exit_description"=>"APP/PROC/WEB: Exited with status 1", "crash_count"=>1, "crash_timestamp"=>1627397342782032276, "version"=>"6d3ba3a9-f72a-451c-a13a-f5033e1fa39a"}
2021-07-27T10:49:03.26-0400 [CELL/0] OUT Cell 47c65d8bcaf81e837dff0037ea75e2a9  successfully destroyed container for instance 0d8ecfd137c9de128e557c3f7d539b32
2021-07-27T10:49:03.48-0400 [CELL/0] OUT Cell bda99bfd4a206845400ffb0aa9806516  successfully created container for instance 6d4190c228fffa472fa13c200f43e404
```

If you are unsure what caused an app restart, check the day of the week and review the details of your application logs.