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

By default, identity provider service instances use the `openid` scope. You can request custom scopes using the `scopes` option:

```bash
cf create-service cloud-gov-identity-provider oauth-client my-uaa-client \
  -c '{"redirect_uri": ["https://my.app.cloud.gov"], "scopes": ["openid", "cloud_controller.read"]}'
```

Note: The user will be prompted to grant any permissions required by custom scopes the first time they login to your application. You can only request the `openid` and `cloud_controller.read` scopes at present. (The `cloud_controller.read` scope enables your application to make read-only queries to [the cloud.gov API](https://apidocs.cloudfoundry.org) on behalf of the user.)

## More information

See [leveraging authentication]({{< relref "docs/apps/leveraging-authentication.md" >}}) for details.

### The broker in GitHub

You can find the broker here: [https://github.com/cloudfoundry-community/uaa-credentials-broker](https://github.com/cloudfoundry-community/uaa-credentials-broker).
