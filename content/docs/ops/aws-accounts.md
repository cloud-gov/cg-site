---
menu:
  docs:
    parent: operations
title: AWS Accounts
---

cloud.gov currently (October 2016) uses 3+ AWS accounts:

1. 18F E/W cloud.gov installation: all cloud.gov apps and services run under the same account but this is the 18F account we are moving out of.
1. GovCloud cloud.gov main account: this is the "new" AWS account where BOSH/CF API and most services live. This account is where we are migrating tenants to.
1. cloud.gov E/W: We only use this for CloudFront right now since it is not available in GovCloud. **This account is linked to the GovCloud one so any support tickets should be filled here**.

Note: DNS for `cloud.gov` is managed through [https://github.com/18f/dns](https://github.com/18f/dns), which is deployed to a Route53 service in yet another account. cloud.gov does not have access to that account.
