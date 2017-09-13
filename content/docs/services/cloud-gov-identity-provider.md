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

*These instances are available in [sandbox spaces]({{< relref "overview/pricing/free-limited-sandbox.md#sandbox-limitations" >}}).*

## How to create an instance

To create a service instance that can provision identity provider credentials, run the following command:

```sh
cf create-service cloud-gov-identity-provider oauth-client my-uaa-client \
  -c '{"redirect_uri": ["https://my.app.cloud.gov"]}'
```

By default, identity provider service instances use the `openid` scope. You can request custom scopes using the `scopes` option:

```sh
cf create-service cloud-gov-identity-provider oauth-client my-uaa-client \
  -c '{"redirect_uri": ["https://my.app.cloud.gov"], "scopes": ["openid", "cloud_controller.read"]}'
```

Note: The user will be prompted to grant any permissions required by custom scopes the first time they login to your application. You can only request the `openid` and `cloud_controller.read` scopes at present. (The `cloud_controller.read` scope enables your application to make read-only queries to [the cloud.gov API](https://apidocs.cloudfoundry.org) on behalf of the user.)

## Obtaining credentials

To create an identity provider, bind a [service key](https://docs.cloudfoundry.org/devguide/services/service-keys.html) to the service instance:

```bash
cf create-service-key my-uaa-client my-service-key -c '{"redirect_uri": ["https://my.app.cloud.gov"]}'
cf service-key my-uaa-client my-service-key
```

This will create a cloud.gov identity provider and make the credentials available to you via a service key. Keep these credentials secure. If they’re compromised, the way to invalidate the credentials is to delete the service key (you can create another, and it will have a fresh set of credentials). Each service key that you bind to your instance creates a separate identity provider with different credentials; you can create as many service keys per instance as you like. <!-- this advice should match on /docs/services/cloud-gov-service-account/ + /docs/services/cloud-gov-identity-provider/ -->

By default, identity provider service instances use the `openid` scope. You can request custom scopes using the `scopes` option:

```bash
cf create-service-key my-uaa-client my-service-key -c '{"redirect_uri": ["https://my.app.cloud.gov"], "scopes": ["openid", "cloud_controller.read"]}'
```

### If you can't find your service keys

<!-- this description matches on cloud-gov-identity-provider.md and cloud-gov-service-account.md -->

If you're trying to retrieve credentials for a service instance created before July 7, 2017, those old service instances had a different way of retrieving credentials. You can check this by running `cf services` to get your service instance name and then running `cf service service-instance-name` -- if the service information includes a link to `fugacious.18f.gov`, it's an old service instance. See [this post for changes]({{< relref "updates/2017-07-07-changes-to-credentials-broker.md" >}}) -- your best next step is to delete the old service instance and create a new one.

## More information

See [leveraging authentication]({{< relref "docs/apps/leveraging-authentication.md" >}}) for details.

### Rotating credentials

The identity provider service creates unique cloud.gov credentials for each service key. To rotate credentials associated with a service key, delete and recreate the service key.

### The broker in GitHub

You can find the broker here: [https://github.com/cloudfoundry-community/uaa-credentials-broker](https://github.com/cloudfoundry-community/uaa-credentials-broker).
