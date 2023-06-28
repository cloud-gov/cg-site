---
parent: services
layout: docs
sidenav: true
title: cloud.gov identity provider
name: "cloud-gov-identity-provider"
description: "Authenticate cloud.gov users in your app"
status: "Beta"
---

You can leverage cloud.gov's identity hub to reduce the burden of authenticating users from government agencies and partners in your app.

## Plans

Plan Name | Description |
--------- | ----------- | -----
`oauth-client` | OAuth2 client credentials for authenticating cloud.gov users in your app |

*These instances are available in [sandbox spaces]({{ site.baseurl }}{% link _docs/pricing/free-limited-sandbox.md %}#sandbox-limitations).*

## How to create an instance

To create a service instance that can provision identity provider credentials, run the following command:

```sh
cf create-service cloud-gov-identity-provider oauth-client <SERVICE_INSTANCE_NAME>
```

Note: By default, identity provider service instances use the `openid` scope. The user will be prompted
to grant any permissions required by scopes the first time they login to your application.

## Obtaining credentials

To create an identity provider, bind a [service key](https://docs.cloudfoundry.org/devguide/services/service-keys.html) to the service instance:

```bash
cf create-service-key \
    <SERVICE_INSTANCE_NAME> \
    <SERVICE_KEY_NAME> \
    -c '{"redirect_uri": ["<APP_AUTH_REDIRECT_ROUTE>", "<APP_LOGOUT_REDIRECT_ROUTE>"]}'
```

This will create a cloud.gov identity provider and make the credentials available to you via a service key.
The `redirect_uri` array registers your app's redirect uris with your service provider.

You can retrieve your credentials with the name of the instance and service key:

```sh
cf service-key <SERVICE_INSTANCE_NAME> <SERVICE_KEY_NAME>
```

It will return an object like this:

```bash
  {
    "client_id": CLIENT_ID,
    "client_secret": CLIENT_SECRET
  }
```

Keep these credentials secure. If they’re compromised, the way to invalidate the credentials is to [delete the service key](https://docs.cloudfoundry.org/devguide/services/service-keys.html#delete) (you can create another, and it will have a fresh set of credentials). Each service key that you bind to your instance creates a separate identity provider with different credentials; you can create as many service keys per instance as you like. <!-- this advice should match on /docs/services/cloud-gov-service-account/ + /docs/services/cloud-gov-identity-provider/ -->

### Support for the PKCE authorization flow

> Note: The [draft for the OAuth 2.1 spec](https://oauth.net/2.1/) **requires PKCE for all clients using the authorization code flow**.

If you need to create an OAuth client that supports the [PKCE authorization flow](https://dropbox.tech/developers/pkce--what-and-why-), you need to specify the `allowpublic: true` option when creating a service key like so:

```shell
cf create-service-key \
    <SERVICE_INSTANCE_NAME> \
    <SERVICE_KEY_NAME> \
    -c '{"redirect_uri": ["<APP_AUTH_REDIRECT_ROUTE>", "<APP_LOGOUT_REDIRECT_ROUTE>", "allowpublic": true]}'
```

### If you can't find your service keys

<!-- this description matches on cloud-gov-identity-provider.md and cloud-gov-service-account.md -->

If you're trying to retrieve credentials for a service instance created before July 7, 2017, those old service instances had a different way of retrieving credentials. You can check this by running `cf services` to get your service instance name and then running `cf service service-instance-name` -- if the service information includes a link to `fugacious.18f.gov`, it's an old service instance. See [this post for changes](/2017/07/07/changes-to-credentials-broker) -- your best next step is to delete the old service instance and create a new one.

## More information

See [leveraging authentication]({{ site.baseurl }}{% link _docs/management/leveraging-authentication.md %}) for details.

### Rotating credentials

The identity provider service creates unique cloud.gov credentials for each service key. To rotate credentials associated with a service key, [delete](https://docs.cloudfoundry.org/devguide/services/service-keys.html#delete) and recreate the service key.

### The broker in GitHub

You can find the broker here: [https://github.com/cloud-gov/uaa-credentials-broker](https://github.com/cloud-gov/uaa-credentials-broker).
