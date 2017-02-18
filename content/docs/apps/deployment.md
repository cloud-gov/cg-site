---
menu:
  docs:
    parent: apps
title: Basic deployment tips
weight: -100
---

## How deployment works

The command to create a new app and to push a new version of an existing one are the same: `cf push`. The basic steps:

1. Set up your local directory with the code you want to deploy. For example, if you use Git or another version control system, check out the version of the code you want to deploy:

    ```bash
    git checkout master
    ```

1. [Target]({{< relref "docs/getting-started/concepts.md#target" >}}) the appropriate [organization]({{< relref "docs/getting-started/concepts.md#organizations" >}})/[space]({{< relref "docs/getting-started/concepts.md#spaces" >}}):

    ```bash
    cf target -o <SOMEORG> -s <SOMESPACE>
    ```
1. Deploy the application:

    ```bash
    cf push <APPNAME>
    ```

The app should now be live at `APPNAME.app.cloud.gov`.

## Application architecture recommendations

To avoid surprises, here are basic architecture principles for this cloud environment.

See Cloud Foundry's [Considerations for Designing and Running an Application in the Cloud](https://docs.cloudfoundry.org/devguide/deploy-apps/prepare-to-deploy.html) -- these apply to cloud.gov as well. As they say, applications will be easiest to deploy if they follow the [Twelve-Factor App](http://12factor.net/) guidelines.

Once you get a sense of these, check out the [production-ready guide]({{< relref "docs/apps/production-ready.md" >}}) as well.

### Avoid writing to the local file system

Don't depend on local file system storage. When your application restarts (for example, if you restart it, or if the platform automatically restarts it for you), files on the local filesystem will disappear. Instead, use a storage [service]({{< relref "docs/apps/managed-services.md" >}}).

### The platform may restart your application

cloud.gov will automatically restart your application instances occasionally. For example, instances will be restarted if they exceed [memory limits]({{< relref "docs/apps/limits.md" >}}), and they may be restarted when the cloud.gov platform is updated.

### Check your log configuration

Proper [logging]({{< relref "docs/apps/logs.md" >}}) might require special libraries/configuration for your app.

### Set environment variables

See Cloud Foundry's [documentation on environment variables](https://docs.cloudfoundry.org/devguide/deploy-apps/environment-variable.html).

### Ignore unnecessary files when pushing

cloud.gov isn't version-control-aware, so `cf push` will deploy the working state of whatever files you have in that directory. In most cases, you will want to [exclude files](http://docs.cloudfoundry.org/devguide/deploy-apps/prepare-to-deploy.html#exclude) ignored by Git. From within your project directory, run

```bash
ln -s .gitignore .cfignore
```

and commit the `.cfignore` to your repository. However, read on if you have a more advanced CF setup.

A couple of important points on the `.cfignore`:

1. If you have a more advanced app setup and have apps with a `path` other than the project root (where you run `cf push` from), you will need an additional `.cfignore` file located in each app `path`;
2. Also note that more advanced `.gitignore` syntax, such as the `**` recursive subdirectory wildcard, are _not_ supported by `.cfignore`.
