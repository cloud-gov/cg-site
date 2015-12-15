---
menu:
  main:
    parent: security
title: Can I host FISMA-High applications on cloud.gov?
weight: 30
---

At this time, cloud.gov is not appropriate for the highest-risk systems defined by FISMA — FISMA-High systems. We will develop that capability in the future if our research warrants it, but there are other cloud infrastructure needs we are working to support first.

For now, an agency that wants a PaaS for FISMA-High systems has two options. First, they can work with [commercial PaaS vendors]({{< relref "technology/paas-options.md" >}}) who offer that capability.

Second, agencies can stand up OpenStack somewhere in their own trusted infrastructure as an IaaS product. They can then adapt what we’ve done to deliver cloud.gov. Here’s how that would work.

Cloud Foundry has a “Cloud Provider Interface” (CPI) that acts as a driver for your IaaS. This is what enables the deployment of the platform on top of that infrastructure.  Everything we do is [open source on GitHub](https://docs.cloud.gov/ops/repos/), so any other agency can fork our work. They can switch the CPI to OpenStack from Amazon Web Services (which we use) and point it at their own instance of OpenStack.

This approach requires more work, either in-house or through a vendor, than a commercial PaaS option. No agency has adapated cloud.gov for itself yet, and we would not recommend this way of adaptating it until we have tested its support for a wider range of infrastructures. But even in the future, an agency that makes this choice will need to support a significant amount of work.
