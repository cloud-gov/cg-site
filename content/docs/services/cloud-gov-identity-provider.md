---
menu:
  docs:
    parent: services
title: cloud.gov identity provider
name: "cloud-gov-identity-provider"
description: "Manage client credentials for authenticating cloud.gov users in your app"
status: "Beta"
---

## Plans

Plan Name | Description | Price
--------- | ----------- | -----
`oauth-client` | Register a UAA client for app authentication | Free

## How to create an instance

To create a service instance, run the following command:

```bash
cf create-service cloud-gov-identity-provider oauth-client my-uaa-client \
  -c '{"redirect_uri": ["https://my.app.cloud.gov"]}'
```

## More information

See [leveraging authentication]({{< relref "docs/apps/leveraging-authentication.md" >}}) for details.

### The broker in GitHub

You can find the broker here: [https://github.com/cloudfoundry-community/uaa-credentials-broker](https://github.com/cloudfoundry-community/uaa-credentials-broker).
