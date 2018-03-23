---
menu:
  docs:
    parent: compliance
title: Customer separation
---


cloud.gov runs customer applications in containers, a combination of kernel facilities 
including namespaces for network, memory, and filesystem which are used to keep applications from interacting 
with each other or the host system.

Applications can be deployed to cloud.gov [using a buildpack](https://docs.cloudfoundry.org/buildpacks/) or by [referring to a Docker image]()
in an accessible Docker registry. Buildpack deployments are considered native to the underlying Cloud Foundry 
system and have benefits over Docker images in that the cloud.gov team can supply updates to the root filesystem 
as well as the language stack that the application uses. We recommend customers deploy using buildpacks whenever possible.

Whether the application is deployed using a buildpack or a Docker image, 
the actual container configuration is performed by Cloud Foundry's garden component.
Garden uses the [Open Container 
Initiative](https://www.opencontainers.org/)'s standard [runC](https://github.com/opencontainers/runc) implementation,
and applies [safeguards](https://docs.cloudfoundry.org/concepts/architecture/garden.html#garden-runc) above and beyond normal Docker or Kubernetes environments that fit the multi-tenant PaaS context. 
Cloud Foundry provides [additional details about various aspects of container security](https://docs.cloudfoundry.org/concepts/container-security.html). 
[Docker images are further restricted](https://docs.cloudfoundry.org/adminguide/docker.html#multi-tenant) when running in Cloud Foundry to protect customers from each other. As a result, containers on cloud.gov are highly secure by default. 

The only "moving piece" the cloud.gov team controls in our deployment is [whether privileged containers are used for applications or for buildpack staging processes](https://docs.cloudfoundry.org/concepts/container-security.html#types). 
Both of these options are set to `false` in cloud.gov. Please contact us if you need to verify this setting in our system, or have further questions about how customer separation works in cloud.gov.

For more details, see the cloud.gov SSP control descriptions in the SI and CM families, including SI-2, CM-2, CM-2 (2), and CM-6 (1).

