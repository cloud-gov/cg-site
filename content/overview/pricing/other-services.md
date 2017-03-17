---
menu:
  overview:
    parent: pricing
title: Other services
weight: 10
aliases:
  - /docs/intro/pricing/paying-for-otherservices
  - /intro/pricing/paying-for-otherservices
  - /overview/pricing/paying-for-other-services
---
Some outside services are included in cloud.gov. This page offers information about some of the most common.

To find the right cloud.gov package for you, including its costs and features, see the list of [packages and rates]({{< relref "overview/pricing/rates.md" >}}).

<!--
TODO
- TCO statement (red/not-included stuff)
-->

### Do agencies need a separate billing relationship with the IaaS provider?

No. However, they may want their own relationship if they want to use specific capabilities offered at the infrastructure-as-a-service level that are not exposed via cloud.gov.

### Does cloud.gov pricing include usage of New Relic or other external services?

No. For now, New Relic is passed through as a separate charge, invoiced every other quarter. Typical costs have been about $820 per project for six months, but on average costs are rapidly decreasing. We are also evaluating other non-3rd-party options.

### Does cloud.gov pricing include usage of S3 storage, or similar cloud storage?

Yes, S3 is available on-demand as a managed service with GSA volume discounts on usage charges.

If you have your own S3 storage credentials, you can make use of that storage from cloud.gov applications using Cloud Foundry’s [user-provided service](https://docs.cloudfoundry.org/devguide/services/user-provided.html) instances.
