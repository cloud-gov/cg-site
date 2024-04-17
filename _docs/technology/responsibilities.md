---
parent: technology
layout: docs
sidenav: true
title: What the Cloud.gov PaaS offers
weight: 5
redirect_from:
  - /docs/intro/technology/responsibilities/
  - /intro/technology/responsibilities/
  - /overview/technology/responsibilities/
---

As a Platform as a Service, Cloud.gov is responsible for maintenance and security of the Cloud.gov platform. Customers are responsible for maintenance and security of their custom code running on the platform.

Here's a chart to illustrate this in three example use cases:

!["Diagram of responsibilities, described in text below"]({{site.baseurl}}/assets/images/content/boundaries.svg){:width=450}

<!-- Source for this diagram is https://docs.google.com/drawings/d/1UBiOteSPXpA72KE52Kh-j7aYr73zTkzJ_oMuw5F293I/edit -->

App #1 uses a [standard buildpack]({{ site.baseurl }}{% link _docs/getting-started/concepts.md %}#buildpacks). (A buildpack provides support for a programming language.) The customer is only responsible for the app code and its dependencies.

App #2 uses a [custom buildpack]({{ site.baseurl }}{% link _docs/deployment/custom-buildpacks.md %}), so the customer's responsibility expands from the app code to managing the custom buildpack and its dependencies. If you choose to use a custom buildpack, you are responsible for:

* Ensuring your application framework/runtime and all dependencies are supported versions with no known vulnerabilities.
* Continually updating your runtime and dependencies as new vulnerabilities are discovered and fixed.
* Maintaining a best practice baseline configuration for your application framework/runtime that meets all applicable security standards.

App #3 is a Docker setup, where the customer is fully responsible for their Docker container and custom image. [Learn about this feature.]({{ site.baseurl }}{% link _docs/deployment/docker.md %})

Cloud.gov is always responsible for the following components at its platform level:

* Operating system
* Continuous monitoring
* Anti-malware
* Network security
* Versioning
* Scaling
* Logging
* Alerting

## Deprecation policy

From time to time, it becomes necessary to deprecate a service, feature, or API. Below is our policy for doing so. In the description, `service` 
refers to a service, feature, API, etc.

In cases where a replacement service will be provided, we'll make the replacement service available before beginning the deprecation process.
Deprecations happen in steps:

1. We send an email to all customers letting them know the service is being deprecated.
1. At least 30 days after the initial email, we stop allowing new instances of the deprecated service, but continue allowing existing instances to work.
1. Every two weeks after we stop allowing new instances of the deprecated service, we email customers who are still using the deprecated service.
1. At least 150 days after the initial email, we shut down existing instances of deprecated service.


Here's an example:

First, Cloud.gov determines that the coffee service is not serving customers as well as a new espresso service might, and we decide 
to replace the coffee service entirely with the espresso service. 
First, we make the espresso service generally available. Next, we send out the general announcement to all of our users. This announcement goes out on April 3rd and states:

- the coffee service is being deprecated
- the replacement is the espresso service
- as of May 3rd (30 days after April 3rd), no new instances of the coffee service will be created
- as of August 31st (150 days after April 3rd), existing instances of the coffee service will be shut down

After May 3rd, we begin sending emails to users still using the coffee service, at least one message every other week.
Finally, on August 31st, we shut down the last instances of the coffee service.
