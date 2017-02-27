---
menu:
  docs:
    parent: services
title: cloud.gov identity provider
name: "cloud-gov-identity-provider"
description: "Authenticate cloud.gov users in your app"
status: "Beta"
---

You can leverage cloud.gov's identity hub to reduce the burden of authenticating users from government agencies and partners in your app.

## Plans

Plan Name | Description | Price
--------- | ----------- | -----
`oauth-client` | OAuth2 client credentials for authenticating cloud.gov users in your app | Free

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
