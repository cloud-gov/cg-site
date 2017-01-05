---
menu:
  docs:
    parent: services
title: Cloud.gov service account
name: "cloud-gov-service-account"
description: "Manage cloud.gov service accounts with access to your organization"
status: "Beta"
---

To set up your application to be deployed with an automated system, you need a deployer account that has access to push your application.

## Plans

Plan Name | Description | Price
--------- | ----------- | -----
`space-deployer` | Provision one account with "SpaceDeveloper" access to the space where the service is created | Free

## How to create an instance

To create a service instance run the following command:

```bash
cf create-service cloud-gov-service-account space-deployer my-service-account
```

## More information

To use this service, see [continuous deployment]({{< relref "docs/apps/continuous-deployment.md" >}}).

### The broker in GitHub

You can find the broker here: [https://github.com/cloudfoundry-community/uaa-credentials-broker](https://github.com/cloudfoundry-community/uaa-credentials-broker).
