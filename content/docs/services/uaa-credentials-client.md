---
menu:
  docs:
    parent: services
title: UAA client credentials
name: "uaa-client-credentials"
description: "Create UAA clients for app authentication"
status: "Beta"
---

To set up your application to be deployed with an automated system, you need a deployer account that has access to push your application.

## Plans

Plan Name | Description | Price
--------- | ----------- | -----
`deployer-account-client` | Register a UAA client for app authentication | Free

## How to create an instance

To create a service instance run the following command:

```bash
cf create-service uaa-credentials-client uaa-credentials-client my-uaa-client \
  -c '{"redirect_uri": ["https://my.app.cloud.gov"]}'
```

## More information

See [leveraging authentication]({{< relref "docs/apps/leveraging-authentication.md" >}}) for details.

### The broker in GitHub

You can find the broker here: [https://github.com/cloudfoundry-community/uaa-credentials-broker](https://github.com/cloudfoundry-community/uaa-credentials-broker).
