---
parent: compliance
layout: docs
sidenav: true
title: Customer separation
---


cloud.gov runs customer applications in containers (a combination of kernel facilities 
including namespaces for network, memory, and filesystem), which keep applications from interacting with each other or the host system.

Customers can deploy applications to cloud.gov [using a buildpack](https://docs.cloudfoundry.org/buildpacks/) or by [referring to a Docker image]({{ site.baseurl }}{% link _docs/deployment/docker.md %})
in an accessible Docker registry. Buildpack deployments are native to the underlying Cloud Foundry 
system and have benefits over Docker images in that the cloud.gov team can supply updates to the root filesystem 
as well as the language stack that the application uses. We recommend customers deploy using buildpacks whenever possible.

Whether the application is deployed using a buildpack or a Docker image, 
the actual container configuration is performed by Cloud Foundry's garden component.
Garden uses the [Open Container 
Initiative](https://www.opencontainers.org/)'s standard [runC](https://github.com/opencontainers/runc) implementation,
and it applies [safeguards](https://docs.cloudfoundry.org/concepts/architecture/garden.html#garden-runc) above and beyond normal Docker or Kubernetes environments that fit the multi-tenant PaaS context. 
Cloud Foundry provides [additional details about various aspects of container security](https://docs.cloudfoundry.org/concepts/container-security.html). 
[Docker images are further restricted](https://docs.cloudfoundry.org/adminguide/docker.html#multi-tenant) when running in Cloud Foundry to protect customers from each other. As a result, containers on cloud.gov are isolated by default. 

The cloud.gov team configures in our Cloud Foundry deployment [whether privileged containers are used for applications and buildpack staging processes](https://docs.cloudfoundry.org/concepts/container-security.html#types). 
Both of these options are set to `false` in cloud.gov: we use unprivileged containers, which increases security. Please contact us if you need to verify this setting in our system, or if you have further questions about how customer separation works in cloud.gov.

*For more details, see the [cloud.gov SSP]({{ site.baseurl }}{% link _docs/overview/fedramp-tracker.md %}#how-you-can-use-this-p-ato), including section 9.7 (Application Isolation), 10 (System Environment), 10.2.3 (Buildpacks), CM-7 (2), SC-7 (12), and SC-39.*
