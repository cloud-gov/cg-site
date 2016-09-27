---
menu:
  main:
    parent: technology
title: What the cloud.gov PaaS Offers
weight: 5
---

As a Platform as a Service, cloud.gov is responsible for maintenance and security of the cloud.gov platform. Customers are responsible for maintenance and security of their custom code running on the platform.

Here's a chart to illustrate this in three example use cases:

<img src="/img/boundaries.svg" alt="Diagram of responsibilities, described in text below" width="450" />

App #1 uses a [Cloud Foundry standard buildpack]({{< relref "getting-started/concepts.md#buildpacks" >}}). (A buildpack provides support for a programming language.) The customer is only responsible for the app code and its dependencies.

App #2 uses an unsupported/custom buildpack, so the customer's responsibility expands from the app code to managing the unsupported buildpack and its dependencies. 

### Enumerate responsibilities of custom buildpack users here

App #3 is a hypothetical Docker setup, where the customer is responsible for their Docker container and custom image. To learn about this potential option, see [cloud.gov and Containers]({{< relref "intro/technology/containers.md" >}}).

cloud.gov is always responsible for the following components at its platform level:

* Operating system
* Continuous monitoring
* Anti-malware
* Network security
* Versioning
* Scaling
* Logging
* Alerting