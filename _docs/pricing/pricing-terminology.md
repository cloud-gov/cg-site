---
parent: pricing
layout: docs
sidenav: true
title: Terms we use in pricing
weight: 90
aliases:
  - /docs/intro/terminology/pricing-terminology
  - /intro/terminology/pricing-terminology
  - /overview/terminology/pricing-terminology/
  - /overview/pricing/pricing-terminology/
  - /overview/pricing/system-stuffing/

---

These terms, among others, define a number of products and services offered by cloud.gov and 18F. The billing structure that 18F applies to cloud.gov is built around them. If other terms present frequent points of confusion, clarifications will be added to this page.

### System

A “system” roughly corresponds to a product or project, including all the individual spaces and services necessary to deliver your product to users. This can include multiple “applications” that serve as sub-components of the system. Your team can define a system in the way that makes sense for your work. For example, you may use your Authority to Operate system boundary definition.

A system maps to an [“org” in cloud.gov and Cloud Foundry](http://docs.cloudfoundry.org/concepts/roles.html#orgs).

### Support {#support}

“Support” is support to use the platform as intended, on a best-effort basis. We have no existing service-level agreement (SLA). We [publish metrics](https://cloudgov.statuspage.io/) that give agencies the ability to make an informed choice about whether to use cloud.gov or an alternative PaaS solution based on our actual track record.

### Consulting

“Consulting” is providing advice, development, documentation, and other resources that are custom or specific to the context of your application, system, or organization. If the outcome of the activity would not be reusable for our entire community of users, it’s consulting. Base platform fees for cloud.gov do not include consulting, and our team does not offer cloud-focused consulting outside of projects directly undertaken on behalf of a partner agency. This includes, for example, general information about migrating your products to the cloud. (All cloud.gov documentation and deployment are open source, so you may use this information to your benefit at any time.)

### Access package

The “access package” component covers access to the cloud.gov Platform as a Service (PaaS) and [support](#support) for it to stay up and available in its current form, as well as expanded over time. The access package component is invoiced monthly, and scales along with the number of systems being hosted and the impact level of the systems being launched on the platform, as defined by [Federal Information Processing Standard (FIPS) 199](http://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.199.pdf).

### Resource usage quota

To support tenant applications and managed service instances, cloud.gov allocates resources (like compute nodes and memory) from an underlying Infrastructure as a Service provider. What we charge for this component covers the costs for the resources that cloud.gov allocates to hosted systems and teams. It also includes a small margin that covers our labor in managing those resources.

Agencies can purchase reserved capacity via 18F as well, which is understood to be “non-severable”.

### Managed services

[Managed services]({{ site.baseurl }}{% link _docs/apps/managed-services.md %}) are services that cloud.gov can spin up quickly and run on your behalf (databases, storage, caching, etc.).
