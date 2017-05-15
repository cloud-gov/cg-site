---
menu:
  docs:
    parent: apps
title: Basic deployment instructions
weight: -100
---

Learn [how to get your application up](#how-deployment-works) and [important application architecture principles](#application-architecture-principles).

## How deployment works

The command to create a new app and to push a new version of an existing one are the same: `cf push`. The steps:

1. Set up your local directory with the code you want to deploy. For example, if you use Git or another version control system, check out the version of the code you want to deploy: `git checkout master`

1. [Target]({{< relref "docs/getting-started/concepts.md#target" >}}) the appropriate [organization]({{< relref "docs/getting-started/concepts.md#organizations" >}})/[space]({{< relref "docs/getting-started/concepts.md#spaces" >}}):

    ```bash
    cf target -o <SOMEORG> -s <SOMESPACE>
    ```
1. Deploy the application: `cf push <APPNAME>`

Check the resulting `cf` command line messages for the route for your app, usually `APPNAME.app.cloud.gov` or similar.

For details about `cf push` options, see [Deploy an Application](https://docs.cloudfoundry.org/devguide/deploy-apps/deploy-app.html) in the Cloud Foundry documentation.

## Application architecture principles

Here are core architecture principles for this cloud environment -- the five things you need to know to avoid surprises when running your applications on cloud.gov.

### Avoid writing to the local file system

Don't depend on local file system storage. When your application restarts (for example, if you restart it, or if the platform automatically restarts it for you), *files on the local filesystem will disappear*. Instead, use a storage [service]({{< relref "docs/apps/managed-services.md" >}}).

### The platform may restart your application

cloud.gov will automatically restart your application instances occasionally. For example, instances will be restarted if they exceed [memory limits]({{< relref "docs/apps/limits.md" >}}), and they may be restarted when the cloud.gov platform is updated.

### Check your log configuration

Proper [logging]({{< relref "docs/apps/logs.md" >}}) might require special libraries/configuration for your app.

### Set environment variables

See Cloud Foundry's [documentation on environment variables](https://docs.cloudfoundry.org/devguide/deploy-apps/environment-variable.html).

### Ignore unnecessary files when pushing

By default, `cf push` will deploy the working state of all the files you have in that directory. You should [exclude files](https://docs.cloudfoundry.org/devguide/deploy-apps/prepare-to-deploy.html#exclude) that your application doesn't need, to prevent those files from slowing down your `cf push` process.

## Next steps on application architecture

1. cloud.gov works best with applications that follow the [Twelve-Factor App](http://12factor.net/) guidelines. This is more of a comprehensive philosophy than a set of requirements, and it helps explain how cloud.gov expects applications to behave.
1. The Cloud Foundry [Considerations for Designing and Running an Application in the Cloud](https://docs.cloudfoundry.org/devguide/deploy-apps/prepare-to-deploy.html) apply to cloud.gov as well, including more details about the core principles above.
1. The cloud.gov [production-ready guide]({{< relref "docs/apps/production-ready.md" >}}) explains how to prepare your application for success in production on cloud.gov.
