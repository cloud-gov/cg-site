---
menu:
  overview:
    parent: pricing
title: What’s included?
weight: 10
aliases:
  - /docs/intro/pricing/whats-included
  - /intro/pricing/whats-included
  - /docs/intro/pricing/paying-for-otherservices
  - /intro/pricing/paying-for-otherservices
  - /overview/pricing/paying-for-other-services
---

All cloud.gov access packages include the following:

- API access, CLI access, Web UI access
- Documentation/tutorial material (including continuing development)
- Web-based support during business hours (platform available 24/7, problems addressed as-possible).
- Allocation of underlying IaaS (AWS) instances
- OS security updates and regular hardening of OS image
- Regular updates to platform security
- Network security
- Regular scanning for infrastructure-level vulnerabilities/misconfiguration
- Support for [these technologies](http://docs.cloudfoundry.org/buildpacks/#system-buildpacks), through system buildpacks (which we also call standard buildpacks).
    - All system buildpacks receive regular security updates.
    - [Custom buildpacks]({{< relref "docs/apps/experimental/custom-buildpacks.md" >}}) can also be used for other languages/frameworks, but cloud.gov will have limited ability to assist with their usage, and there may be compliance implications.
- Self-service management of spaces and users within an organization
- Platform maintenance and managed service expansion overhead
- Support for customer-provided DNS for applications (including support for IPv6)

There are [several different access packages]({{< relref "overview/pricing/rates.md#access-package" >}}) available for cloud.gov. If you’re interested in purchasing a package but aren’t sure which one is right for your team, fill out our [initial interest form](https://docs.google.com/forms/d/e/1FAIpQLSevZfuJ_4KE-MZlm9gttYfsXQp0PJL7OR6k6LbZ9XnFn-oA6g/viewform). Our team will follow up with you to figure out how we can best address your team’s needs.

Each access package covers access to both [the East/West and GovCloud environments]({{< relref "docs/apps/govcloud.md" >}}) while we complete migration of existing customers from the legacy East/West environment to the main GovCloud environment.

<!--
TODO
- TCO statement (red/not-included stuff)
-->

## Additional services

### Do agencies need a separate billing relationship with the IaaS provider?

No. However, they may want their own relationship if they want to use specific capabilities offered at the infrastructure-as-a-service level that are not exposed via cloud.gov.

### Does cloud.gov pricing include usage of New Relic or other external services?

No. For now, New Relic is passed through as a separate charge, invoiced every other quarter. Typical costs have been about $820 per project for six months, but on average costs are rapidly decreasing. We are also evaluating other non-3rd-party options.

### Does cloud.gov pricing include usage of S3 storage, or similar cloud storage?

Yes, S3 is available on-demand as a managed service with GSA volume discounts on usage charges.

If you have your own S3 storage credentials, you can make use of that storage from cloud.gov applications using Cloud Foundry’s [user-provided service](https://docs.cloudfoundry.org/devguide/services/user-provided.html) instances.
