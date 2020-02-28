---
parent: services
layout: docs
sidenav: true
title: cloud.gov service account
name: "cloud-gov-service-account"
description: "cloud.gov service accounts for automated access by programs"
status: "Beta"
redirect_from:
- /docs/services/deployer-account/
---

To set up your application to be deployed with an automated system, you need a deployer account that has access to push your application.

## Plans

Plan Name | Description | 
--------- | ----------- | -----
`space-deployer` | A service account for continuous deployment, limited to a single space | 
`space-auditor` | A service account for auditing configuration and monitoring events limited to a single space | 

*These instances are available in [sandbox spaces]({{ site.baseurl }}{% link _docs/pricing/free-limited-sandbox.md %}#sandbox-limitations).*

## How to create an instance

To create a service instance that can provision service accounts, run the following command:

```bash
cf create-service cloud-gov-service-account space-deployer my-service-account
```

If your service account only requires read access and does not need the ability to deploy applications, use the `space-auditor` plan instead:

```bash
cf create-service cloud-gov-service-account space-auditor my-service-account
```

## Obtaining credentials

To create a service account, bind a [service key](https://docs.cloudfoundry.org/devguide/services/service-keys.html) to the service instance:

```bash
cf create-service-key my-service-account my-service-key
cf service-key my-service-account my-service-key
```

The last command will return a username/password pair, that you can use, like this:

```
{
 "password": "oYasdfliaweinasfdliecV",
 "username": "deadbeed-aabb-1234-feha0987654321000"
}
```

This will create a cloud.gov service account and make the credentials available to you via a service key. Keep these credentials secure. If they’re compromised, the way to invalidate the credentials is to [delete the service key](https://docs.cloudfoundry.org/devguide/services/service-keys.html#delete) (you can create another, and it will have a fresh set of credentials). Each service key that you bind to your instance creates a separate service account with different credentials; you can create as many service keys per instance as you like. <!-- this advice should match on /docs/services/cloud-gov-service-account/ + /docs/services/cloud-gov-identity-provider/ -->

After you create one of these service keys, you will see a new "user" in your org and space with a name made of 36 letters, numbers, and dashes as its unique identifier, similar to `f6ab4cfb-6e6c-4b10-8585-3f39e740905c`. In your event logs, its actions will display as actions by `service-account@cloud.gov`.

You can use these credentials with the [`cf auth`](http://cli.cloudfoundry.org/en-US/cf/auth.html) command in automated deployment scripts.


### If you can't find your service keys

<!-- this description matches on cloud-gov-identity-provider.md and cloud-gov-service-account.md -->

If you're trying to retrieve credentials for a service instance created before July 7, 2017, those old service instances had a different way of retrieving credentials. You can check this by running `cf services` to get your service instance name and then running `cf service service-instance-name` -- if the service information includes a link to `fugacious.18f.gov`, it's an old service instance. See [this post for changes](/2017/07/07/changes-to-credentials-broker) -- your best next step is to delete the old service instance and create a new one.

## More information

To use this service, see [continuous deployment]({{ site.baseurl }}{% link _docs/management/continuous-deployment.md %}).

### Rotating credentials

The service account service creates unique cloud.gov credentials for each service key. To rotate credentials associated with a service key, [delete](https://docs.cloudfoundry.org/devguide/services/service-keys.html#delete) and recreate the service key.

### Handling expired passwords

Service account passwords expire every 90 days. If you see an error like:

```
Error Code: 403
Raw Response: {"error":"access_denied","error_description":"Your current password has expired. Please reset your password."}
```

Then you'll need to delete the existing service key, recreate it, and update the username/password in your deployment scripts. For example:

```
cf delete-service-key my-service-account my-service-key
cf create-service-key my-service-account my-service-key
cf service-key my-service-account my-service-key
```

The last command will return the service account username/password pair. These steps can be used at any time to update/rotate credentials for service accounts.

### Not for human consumption

Don't use service account credentials to manually log into cloud.gov as a human. cloud.gov has no technical mechanism to prevent you from doing this, because there's no way to distinguish a human from an automated script at login. Typically, your agency and system security compliance requirements require people to only log in using their own accounts (agency single sign-on accounts or cloud.gov accounts with multi-factor authentication).

### The broker in GitHub

You can find the broker here: [https://github.com/cloudfoundry-community/uaa-credentials-broker](https://github.com/cloudfoundry-community/uaa-credentials-broker).
