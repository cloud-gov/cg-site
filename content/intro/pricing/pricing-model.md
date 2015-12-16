---
menu:
  main:
    parent: pricing
title: What is the pricing model?
weight: 10
---

## Pricing model

18F provides its services to other agencies on a cost-recovery model. This holds not only for cloud.gov, but also for consulting, delivery, and other work. The initial funding for cloud.gov came from a grant from the Acquisition Services Fund. We also recover some of the costs by charging for labor on digital products we deliver for agency partners.

The current cloud.gov pricing model has four components:

- Base platform
- Resource usage
- Managed services
- À la carte items

More information on what these include is below. We expect to publish a dedicated page with current rates soon.

The current model is provisional. In the agile tradition, we are validating whether this model fits the needs of federal agencies, which often face issues around budget or appropriation categories for the money they spend on a particular purchase. The current model is also a test to validate that providing cloud.gov to other agencies will be cost-recoverable for 18F and GSA. The pricing model must cover the costs of developing, providing, and supporting it for other agencies, rather than just our internal use.

This model may change significantly in future, depending on what the take-up of cloud.gov across agencies looks like, and whether this capability ends up being considered critical for the government as a whole.

## Base platform

The “base platform” component covers access to the platform and [support]({{< relref "intro/terminology/pricing-terminology.md" >}}) for it to stay up and available in its current form, as well as expanded over time. The base platform component is paid 12 months at a time, and scales along with the number of systems being hosted.

The base platform component would typically be paid with “non-severable” funds, for example: funds that an agency attaches to a particular fiscal year.

## Resource usage

To support tenant applications and managed service instances, cloud.gov allocates resources (like compute nodes and memory) from an underlying IaaS. What we charge for this component covers the costs for the resources that cloud.gov allocates to hosted systems and teams. It also includes a small margin that covers our labor in managing those resources.

Resource usage fees on-demand are understood to be “severable” as they can be controlled in a self-service manner by provisioning more or fewer apps, and therefore must be treated accordingly.

Agencies can purchase reserved capacity via 18F as well, which is understood to be “non-severable”.

## Managed services

Each “managed service” (see our definition) incurs some resource usage and platform support overhead. The managed service fees ensure we can cover our costs to provide them to you. The fee varies among services and plans.

In many cases, the pricing for managed services is not yet available. This is because we are measuring their initial usage to determine what we will need to charge.

We do not yet have a good picture of how much we should charge to cover the cost of these services. We are doing more analysis of the costs we’re observing (both the cost of the IaaS layer and the cost of our support). We aim to offer explicit prices for all these by the end of the March 2016.

## À la carte items

We use Cloud Foundry’s “marketplace” capability to enable self-service provisioning of managed services that cloud.gov itself provides. We don’t yet have a way to offer services commonly provisioned outside of cloud.gov via cloud.gov, including New Relic, S3 or other bucket storage, and other app-relevant IaaS components.

18F has in the past helped agencies acquire access to these resources in a manual fashion; see our information on paying for other services. We are examining whether we can encapsulate this functionality in a self-service manner using Cloud Foundry’s service keys in the future.
