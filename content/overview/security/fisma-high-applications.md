---
menu:
  overview:
    parent: security
title: FISMA-High PaaS alternatives
weight: 30
aliases:
  - /docs/intro/security/fisma-high-applications
  - /intro/security/fisma-high-applications
---

## Is cloud.gov appropriate?

At this time, cloud.gov is not appropriate for the highest-risk systems defined by FISMA — FISMA-High systems. We will develop that capability in the future if our research warrants it, but there are other cloud infrastructure needs we are working to support first.

## Other options

For now, an agency that wants a PaaS for FISMA-High systems has two options. First, they can work with [commercial PaaS vendors]({{< relref "overview/technology/paas-options.md" >}}) who offer that capability. Second, agencies can stand up OpenStack somewhere in their own trusted infrastructure as an IaaS product. They can then adapt what we’ve done to deliver cloud.gov.

## Adapting cloud.gov on your own for FISMA-High

Cloud Foundry has a “Cloud Provider Interface” (CPI) that acts as a driver for deploying Cloud Foundry on different IaaS providers. Everything we do is [open source on GitHub]({{< relref "docs/ops/repos.md" >}}), so any other agency can fork our work, switch the CPI from Amazon Web Services (which we use) to OpenStack and point it at their own hardened, private deployment of OpenStack.

This approach requires more work, either in-house or through a vendor, than a commercial PaaS option. No agency has deployed cloud.gov privately for itself yet, and we would not recommend this path until we have tested its support for a wider range of infrastructures. Agencies choosing this path should take care to plan for the ongoing support and maintenance, which can be significant.
