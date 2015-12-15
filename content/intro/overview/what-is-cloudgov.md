---
menu:
  main:
    parent: overview
title: What is cloud.gov?
weight: 10
---

“cloud.gov” is 18F’s product line that helps federal digital service teams operate efficiently at-scale in a cloud-hosted environment that complies with federal technology and security requirements. We provide tools, technology, and services so development teams can focus on delivering quality products.

## Tools, technology, and services

### Platform as a Service
The first major cloud.gov product is a platform-as-a-service (PaaS) suited to government work, based on the open source [Cloud Foundry project](http://www.cloudfoundry.org/). PaaS differs from infrastructure-as-a-service (IaaS) by removing the complexity of the infrastructure from the customer’s experience. cloud.gov itself is open source – [check out our repositories](https://docs.cloud.gov/ops/repos/).

We evaluated multiple open-source PaaS technologies. Ultimately, Cloud Foundry had the best combination of usability, developer experience, open-source community, and testing in production relative to 18F’s strengths and needs.

### Security documentation support
A byproduct of cloud.gov’s creation is [control-masonry](https://github.com/18F/control-masonry), which helps create the documentation and continuing assurance necessary for federal services to comply with FISMA regulations and agency-specific “Authority to Operate” (ATO) requirements. It is also an open source project that we created for cloud.gov’s ATO, but other agencies can also use it for unrelated projects that have similar needs.

### Products we are exploring for the future
- Whether cloud.gov can broker self-service access to other third-party tools.
- The need for federally-developed domain microservices around identity, authorization, etc.
- What is needed for "Government-as-a-Platform" services, including PaaS-related container and clustering technologies, and whether to incorporate these into our toolbox.
