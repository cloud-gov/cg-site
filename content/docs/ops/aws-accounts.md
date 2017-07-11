---
menu:
  docs:
    parent: operations
title: AWS accounts
---

cloud.gov currently (June 2017) uses two AWS accounts:

1. GovCloud cloud.gov main account: this is the "new" AWS account where BOSH/CF API and most services live. We migrated tenants to this account between 2016 and 2017.
1. cloud.gov East/West: We keep this account so we can use CloudFront, which is not currently available in GovCloud. **This account is linked to the GovCloud one so any support tickets should be filed here**.

Note: DNS for `cloud.gov` is managed through [https://github.com/18f/dns](https://github.com/18f/dns), which is deployed to a Route 53 service in yet another account. cloud.gov does not have access to that account.
