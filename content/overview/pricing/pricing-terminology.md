---
menu:
  overview:
    parent: pricing
title: Terms we use in pricing
weight: 90
aliases:
  - /docs/intro/terminology/pricing-terminology
  - /intro/terminology/pricing-terminology
  - /overview/terminology/pricing-terminology/
  - /overview/pricing/pricing-terminology/

---

These terms, among others, define a number of products and services offered by cloud.gov and 18F. The billing structure that 18F applies to cloud.gov is built around them. If other terms present frequent points of confusion, clarifications will be added to this page.

### System

A “system” roughly corresponds to a product or project team, including all the individual spaces, apps, and services necessary to deliver their product to users.

A system maps to an [“org” in cloud.gov and Cloud Foundry](http://docs.cloudfoundry.org/concepts/roles.html#orgs).

*Recommendation:* If your product needs Authority to Operate (ATO) from your agency, we suggest that your cloud.gov “system” should align with your ATO system boundary. (In other words, your cloud.gov org shouldn't contain two or more products that each need their own ATO, because that would make your compliance process more difficult.) If you have a very complex product with multiple sub-systems, you may choose to build that with multiple cloud.gov orgs/“systems”. For formal guidance on system boundaries, see [NIST Special Publication 800-18, section 2](http://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-18r1.pdf).

### Support {#support}

“Support” is support to use the platform as intended, on a best-effort basis. We have no existing service-level agreement. We plan to always publish metrics that give agencies the ability to make an informed choice about whether to use cloud.gov or an alternative PaaS solution based on our actual track record.

### Consulting

“Consulting” is advice, development, documentation, etc. that is custom or specific the context of your application, system, or organization. If the outcome of the activity will not be reusable for our entire community of users, it’s consulting. Base platform fees for cloud.gov do not include consulting, and our team does not offer cloud-focused consulting outside of projects directly undertaken on behalf of a partner agency. This includes, for example, general information about migrating your products to the cloud. (All cloud.gov documentation and deployment are open source, so anyone may use this information to their benefit at any time.)

### Access package

The “access package” component covers access to the cloud.gov Platform as a Service (PaaS) and [support]({{< relref "#support" >}}) for it to stay up and available in its current form, as well as expanded over time. The access package component is paid 12 months at a time, and scales along with the number of systems being hosted and the impact level of the systems being launched on the platform, as defined by [Federal Information Processing Standard (FIPS) 199](http://csrc.nist.gov/publications/fips/fips199/FIPS-PUB-199-final.pdf).

The access package component is “non-severable” and therefore non-refundable. As a result, a payment in one fiscal year does not expire regardless of the status of the underlying appropriation.

### Resource usage quota

To support tenant applications and managed service instances, cloud.gov allocates resources (like compute nodes and memory) from an underlying IaaS. What we charge for this component covers the costs for the resources that cloud.gov allocates to hosted systems and teams. It also includes a small margin that covers our labor in managing those resources.

Resource usage fees on-demand are understood to be “severable” as they can be controlled in a self-service manner by provisioning more or fewer apps, and therefore must be treated accordingly.

Agencies can purchase reserved capacity via 18F as well, which is understood to be “non-severable”.

### Managed services

See [**managed services**]({{< relref "overview/pricing/rates.md#managed-services" >}}).
