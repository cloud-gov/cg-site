---
menu:
  overview:
    parent: technology
title: What the cloud.gov PaaS offers
weight: 5
aliases:
  - /docs/intro/technology/responsibilities
  - /intro/technology/responsibilities
---

As a Platform as a Service, cloud.gov is responsible for maintenance and security of the cloud.gov platform. Customers are responsible for maintenance and security of their custom code running on the platform.

Here's a chart to illustrate this in three example use cases:

<img src="/img/boundaries.svg" alt="Diagram of responsibilities, described in text below" width="450" />

<!-- Source for this diagram is https://docs.google.com/drawings/d/1UBiOteSPXpA72KE52Kh-j7aYr73zTkzJ_oMuw5F293I/edit -->

App #1 uses a [standard buildpack]({{< relref "docs/getting-started/concepts.md#buildpacks" >}}). (A buildpack provides support for a programming language.) The customer is only responsible for the app code and its dependencies.

App #2 uses an [unsupported/custom buildpack]({{< relref "docs/apps/experimental/custom-buildpacks.md" >}}), so the customer's responsibility expands from the app code to managing the unsupported/custom buildpack and its dependencies. If you choose to use a custom buildpack, you are responsible for:

* Ensuring your application framework/runtime and all dependencies are supported versions with no known vulnerabilities.
* Continually updating your runtime and dependencies as new vulnerabilities are discovered and fixed.
* Maintaining a best practice baseline configuration for your application framework/runtime that meets all applicable security standards.

App #3 is a Docker setup, where the customer is fully responsible for their Docker container and custom image. [Learn about this experimental feature.]({{< relref "docs/apps/experimental/docker.md" >}})

cloud.gov is always responsible for the following components at its platform level:

* Operating system
* Continuous monitoring
* Anti-malware
* Network security
* Versioning
* Scaling
* Logging
* Alerting
