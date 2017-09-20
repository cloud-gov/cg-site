---
menu:
  docs:
    parent: services
title: cloud.gov service account
name: "cloud-gov-service-account"
description: "cloud.gov service accounts for automated access by programs"
status: "Beta"
aliases:
- /docs/services/deployer-account/
---

To set up your application to be deployed with an automated system, you need a deployer account that has access to push your application.

## Plans

Plan Name | Description | Price
--------- | ----------- | -----
`space-deployer` | A service account for continuous deployment, limited to a single space | Free
`space-auditor` | A service account for auditing configuration and monitoring events limited to a single space | Free

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

This will create a cloud.gov service account and make the credentials available to you via a service key. Keep these credentials secure. If they’re compromised, the way to invalidate the credentials is to delete the service key (you can create another, and it will have a fresh set of credentials). Each service key that you bind to your instance creates a separate service account with different credentials; you can create as many service keys per instance as you like. <!-- this advice should match on /docs/services/cloud-gov-service-account/ + /docs/services/cloud-gov-identity-provider/ -->

After you create one of these service keys, you will see a new "user" in your org and space with a name made of 36 letters, numbers, and dashes as its unique identifier, similar to `f6ab4cfb-6e6c-4b10-8585-3f39e740905c`. In your event logs, its actions will display as actions by `service-account@cloud.gov`.

These credentials can be used with the `cf login` command in automated deployment scripts.

### If you can't find your service keys

<!-- this description matches on cloud-gov-identity-provider.md and cloud-gov-service-account.md -->

If you're trying to retrieve credentials for a service instance created before July 7, 2017, those old service instances had a different way of retrieving credentials. You can check this by running `cf services` to get your service instance name and then running `cf service service-instance-name` -- if the service information includes a link to `fugacious.18f.gov`, it's an old service instance. See [this post for changes]({{< relref "updates/2017-07-07-changes-to-credentials-broker.md" >}}) -- your best next step is to delete the old service instance and create a new one.

## More information

To use this service, see [continuous deployment]({{< relref "docs/apps/continuous-deployment.md" >}}).

### Rotating credentials

The service account service creates unique cloud.gov credentials for each service key. To rotate credentials associated with a service key, [delete](https://docs.cloudfoundry.org/devguide/services/service-keys.html#delete) and recreate the service key.

### The broker in GitHub

You can find the broker here: [https://github.com/cloudfoundry-community/uaa-credentials-broker](https://github.com/cloudfoundry-community/uaa-credentials-broker).
