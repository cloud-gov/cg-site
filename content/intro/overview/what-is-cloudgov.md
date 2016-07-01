---
menu:
  main:
    parent: overview
title: What Is cloud.gov?
weight: 10
---

“cloud.gov” is 18F’s product line that helps federal digital service teams operate efficiently at-scale in a cloud-hosted environment that complies with federal technology and security requirements. We provide tools, technology, and services so development teams can focus on delivering quality products.

## Tools, technology, and services

### Platform as a Service
The first major cloud.gov product is a platform-as-a-service (PaaS) suited to government work, based on the open source [Cloud Foundry project](http://www.cloudfoundry.org/). PaaS differs from infrastructure-as-a-service (IaaS) by removing the complexity of the infrastructure from the customer’s experience. cloud.gov itself is open source – [check out our repositories](https://docs.cloud.gov/ops/repos/).

We evaluated multiple open-source PaaS technologies. Ultimately, Cloud Foundry had the best combination of usability, developer experience, open-source community, and testing in production relative to 18F’s strengths and needs.

### Security documentation support
A byproduct of cloud.gov’s creation is [compliance-masonry](https://github.com/opencontrol/compliance-masonry), which helps create the documentation and continuing assurance necessary for federal services to comply with FISMA regulations and agency-specific “Authority to Operate” (ATO) requirements. It is also an open source project that we created for cloud.gov’s ATO, but other agencies can also use it for unrelated projects that have similar needs.

### Ideas we are exploring for the future
- Whether cloud.gov can broker self-service access to other third-party tools.
- The need for federally-developed domain microservices around identity, authorization, etc.
- What is needed for "Government-as-a-Platform" services, including PaaS-related container and clustering technologies, and whether to incorporate these into our toolbox.

### What is your responsibility
cloud.gov is a FedRAMP compliant Platform as a Service (Paas).  What this means is that agencies can deploy their application on a FedRAMP compliant platform and just be responsible app code.  The way it works is cloud.gov’s compliance is encapsulated within a boundary.  All components within that boundary are cloud.gov’s responsibility in terms of maintaining and operating the platform.  The specific items that cloud.gov is responsible for are the following:

* Platform Infrastructure
* Platform Supported Buildpacks
* Platform OS
* Platform Anti-Malware
* Platform Network Security 
* Platform Continuous Monitoring 
* Platform Versioning
* Platform Load Balancing
* Platform Scaling
* Platform Logging
* Platform Alerting

Anything outside of the cloud.gov boundary is the responsibility of the tenant which can vary depending on the configuration on the app. 

Cloud.gov recommends all tenants follow the [twelve-factor](http://12factor.net/) app for developing apps for software-as-a-service.  This methodology minimizes dependency allowing apps to easily deploy to cloud.gov and other non-related platforms. In addition, to the twelve-factor methodology cloud.gov recommends developers follow the [general-tips](https://docs.cloud.gov/apps/deployment/). 

There are several scenarios in which a tenant of cloud.gov responsibility will expand from maintaining their app depending on the deployment. Tenants are responsible for maintaining and updating their code along with any dependencies.  As a security best practice, we recommend tenants not to include secrets or credentials in their code.

For the first scenario, if the tenant is using a Cloud Foundry supported buildpack then the only item they are responsible for is the app code and its dependencies.  

In the next scenario, if a tenant is deploying using an unsupported buildpack their responsibility expands from the app code to managing the unsupported buildpack and its dependencies.

As you are aware, we are big fans of Docker containers but as of today we do not offer standardized container images directly.  The responsibility for managing these containers are up to the tenants.  (Probably need to rework or add more details here)



