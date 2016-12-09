---
menu:
  docs:
    parent: services
title: Deployer Account
name: "deployer-account"
description: "Create deployer accounts for to use in automated deployment systems"
status: "Beta"
---

To set up your application to be deployed with an automated system you will need a deployer account that has access to push your application.

## Plans

Plan Name | Description | Price
--------- | ----------- | -----
`deployer-account` | Provision one account with "SpaceDeveloper" access to the space where the service is created | Free

## How to create an instance

To create a service instance run the following command:

```bash
cf create-service deployer-account deployer-account my-deployer-account
```

## More Information

To read more details on how to use this service see the [Continuous Deployment]({{< relref "docs/apps/continuous-deployment.md" >}}).


### The broker in GitHub

You can find the broker here: [https://github.com/18F/deployer-account-broker](https://github.com/18F/deployer-account-broker).
