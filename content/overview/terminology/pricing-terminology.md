---
menu:
  overview:
    parent: terminology
title: Terms we use in pricing
weight: 20
aliases:
  - /docs/intro/terminology/pricing-terminology
  - /intro/terminology/pricing-terminology
---

These terms, among others, define a number of products and services offered by cloud.gov and 18F. The billing structure that 18F applies to cloud.gov is built around them. If other terms present frequent points of confusion, clarifications will be added to this page.

### System

A “System” roughly corresponds to a product or project team, including all the individual spaces, apps, and services necessary to realize their service, across as many environments as needed.

A system maps to an [“org” in Cloud Foundry](http://docs.cloudfoundry.org/concepts/roles.html#orgs).

### Support {#support}

“Support” is support to use the platform as intended, on a best-effort basis. We have no existing service-level agreement. We plan to always publish metrics that give agencies the ability to make an informed choice about whether to use cloud.gov or an alternative PaaS solution based on our actual track record.

### Consulting

“Consulting” is advice, development, documentation, etc. that is custom or specific the context of your application, system, or organization. If the outcome of the activity will not be reusable for our entire community of users, it’s consulting. Base platform fees for cloud.gov do not include consulting, and our team does not offer cloud-focused consulting outside of projects directly undertaken on behalf of a partner agency. This includes, for example, general information about migrating your products to the cloud. (All cloud.gov documentation and deployment are open source, so anyone may use this information to their benefit at any time.)

### Access package

The “access package” component covers access to the cloud.gov Platform as a Service (PaaS) and [support]({{< relref "#support" >}}) for it to stay up and available in its current form, as well as expanded over time. The access package component is paid 12 months at a time, and scales along with the number of systems being hosted and the impact level of the systems being launched on the platform, as defined by [Federal Information Processing Standard (FIPS) 199](http://csrc.nist.gov/publications/fips/fips199/FIPS-PUB-199-final.pdf).

The access package component is “non-severable” and therefore non-refundable. As a result, a payment in one fiscal year does not expire regardless of the status of the underlying appropriation.

### Resource usage

To support tenant applications and managed service instances, cloud.gov allocates resources (like compute nodes and memory) from an underlying IaaS. What we charge for this component covers the costs for the resources that cloud.gov allocates to hosted systems and teams. It also includes a small margin that covers our labor in managing those resources.

Resource usage fees on-demand are understood to be “severable” as they can be controlled in a self-service manner by provisioning more or fewer apps, and therefore must be treated accordingly.

Agencies can purchase reserved capacity via 18F as well, which is understood to be “non-severable”.

### Managed services

See [**managed services**]({{< relref "overview/pricing/rates.md#managed-services" >}}).
