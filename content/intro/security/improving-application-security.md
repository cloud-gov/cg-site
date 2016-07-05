---
menu:
  main:
    parent: security
title: Security for All Applications
weight: 10
---

## System architecture that supports security

Probably the biggest security improvement afforded by cloud.gov is it enforces an immutable infrastructure. Instead of logging into a live system to make a change, we deploy an entirely new system with security updates applied. That ensures any foothold which might have been exploited by hackers gets wiped away too.

The same is true for applications deployed on cloud.gov. When vulnerabilities in a software stack are identified, we can re-deploy applications that use it on a clean and updated baseline. This happens independent of the application team’s availability, as often as needed, and without downtime.

## Your security responsibilities

cloud.gov is responsible for maintenance and security of the cloud.gov platform, and as a tenant you're responsible for your custom code running on the platform. Here's a chart to illustrate these responsibility boundaries in three example use cases:

[[Google Drawing chart]](https://docs.google.com/drawings/d/1UBiOteSPXpA72KE52Kh-j7aYr73zTkzJ_oMuw5F293I/edit)

App #1 uses a [Cloud Foundry supported (standard) buildpack]({{< relref "getting-started/concepts.md#buildpacks" >}}), so the tenant is only responsible for is the app code and its dependencies.

App #2 uses an unsupported/custom buildpack, so the tenant's responsibility expands from the app code to managing the unsupported buildpack and its dependencies.

App #3 is a hypothetical Docker setup, where the tenant is responsible for their Docker container and custom image. To learn about this potential option, see [cloud.gov and Containers]({{< relref "intro/technology/containers.md" >}}).

cloud.gov is always responsible for the following components at its platform level underneath your application code:

* Operating system
* Continuous monitoring
* Anti-malware
* Network security
* Versioning
* Scaling
* Logging
* Alerting