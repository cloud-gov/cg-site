---
menu:
  main:
    parent: operations
title: Common Procedures
---

### Creating Metrics accounts

Accounts in the metrics site require GitHub login. Local accounts are not allowed.

### Working in the open

In the cloud.gov project we open everything from start but there are a couple things that are not allowed to be public. Please use your discretion and if you have doubts please ask in #cloud-gov.
Here is a list of things that are prohibited from being publicly disclosed:
- PII (both for employees and users)
- IP addresses (both internal and external unless required for operational purposes)
- Passwords, API keys, TLS keys, Oauth secrets or any other "secret"

You can see examples on how to load secrets to a BOSH manifest here: https://github.com/18F/cg-deploy-cf
