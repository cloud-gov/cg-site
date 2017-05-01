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

After you create one of these service instances, you will see a new "user" in your org and space with a name made of 36 letters, numbers, and dashes as its unique identifier. 

To create a service instance that can deploy applications, run the following command:

```bash
cf create-service cloud-gov-service-account space-deployer <SERVICE-INSTANCE-NAME>
```

If your service account only requires read access and does not need the ability to deploy applications, use the `space-auditor` plan instead:

```bash
cf create-service cloud-gov-service-account space-auditor <SERVICE-INSTANCE-NAME>
```

## More information

To use this service, see [continuous deployment]({{< relref "docs/apps/continuous-deployment.md" >}}).

### The broker in GitHub

You can find the broker here: [https://github.com/cloudfoundry-community/uaa-credentials-broker](https://github.com/cloudfoundry-community/uaa-credentials-broker).
