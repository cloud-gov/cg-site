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

After you create one of these service instances, you will see a new "user" in your org and space with a name made of 36 letters, numbers, and dashes as its unique identifier, similar to `f6ab4cfb-6e6c-4b10-8585-3f39e740905c`. In your event logs, its actions will display as actions by `service-account@cloud.gov`.

To create a service instance that can deploy applications, run the following command:

```sh
cf create-service cloud-gov-service-account space-deployer <SERVICE-INSTANCE-NAME>
```

If your service account only requires read access and does not need the ability to deploy applications, use the `space-auditor` plan instead:

```sh
cf create-service cloud-gov-service-account space-auditor <SERVICE-INSTANCE-NAME>
```

## Obtaining credentials

Once you've created the service instance, you'll want to obtain the username and password from it:

```sh
cf service <SERVICE-INSTANCE-NAME>
```

This will display a link to a page on [Toaster](https://fugacious.18f.gov/) (Fugacious) which contains your credentials. Be sure to retrieve your credentials right away, since the link will only work for a brief length of time. Keep these credentials secure. If they’re compromised, the way to invalidate the credentials is to delete the service instance (you can create another, and it will have a fresh set of credentials). <!-- this advice should match on /docs/apps/continuous-deployment/ + /docs/services/cloud-gov-service-account/ + /docs/services/cloud-gov-identity-provider/ -->

These credentials can be used with the `cf login` command in automated deployment scripts.

## More information

To use this service, see [continuous deployment]({{< relref "docs/apps/continuous-deployment.md" >}}).

### The broker in GitHub

You can find the broker here: [https://github.com/cloudfoundry-community/uaa-credentials-broker](https://github.com/cloudfoundry-community/uaa-credentials-broker).
