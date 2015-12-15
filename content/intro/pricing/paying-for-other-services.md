---
menu:
  main:
    parent: pricing
title: What other services am I paying for along with cloud.gov?
weight: 30
---

## Do agencies need a separate billing relationship with the IaaS?

No. However, you may want your own relationship if you want to use specific capabilities offered at the infrastructure-as-a-service level that are not exposed via cloud.gov.

## Does cloud.gov pricing include usage of New Relic or other external services?

No. For now, New Relic is passed through as a separate charge via 18F, invoiced every other quarter. Typical costs have been about $820 per project for six months, but on average costs are rapidly decreasing. We are also evaluating other non-3rd-party options.

## Does cloud.gov pricing include usage of S3 storage, or similar cloud storage?

No. We will offer S3 storage in the future as a managed service, but for now, S3 storage is not available. When we do offer it, the billing will be usage-based, similar to how we bill for all of the existing managed services.

If you have your own S3 storage credentials, you can make them available to your cloud.gov applications using Cloud Foundry’s [user-provided service](https://docs.cloudfoundry.org/devguide/services/user-provided.html) instances.

If you don’t yet have S3 capabilities, 18F can provide them, via the same Inter-Agency Agreement you use to purchase cloud.gov.
