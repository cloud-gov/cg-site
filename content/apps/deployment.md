---
menu:
  main:
    parent: apps
title: General Deployment Tips
weight: -10
---

## How deployment works

The command to create a new app and to push a new version of an existing one are the same: `cf push`. The basic steps:

1. Check out whatever version of the code you want to deploy.

    ```bash
    git checkout master
    ```

1. [Target]({{< relref "getting-started/concepts.md#target" >}}) the appropriate [organization]({{< relref "getting-started/concepts.md#organizations" >}})/[space]({{< relref "getting-started/concepts.md#spaces" >}}).

    ```bash
    cf target -o <SOMEORG> -s <SOMESPACE>
    ```
1. Deploy the application.

    ```bash
    cf push <APPNAME>
    ```

The app should now be live at `APPNAME.18f.gov`.

## Twelve-Factor Apps

In general, applications will be easiest to deploy to Cloud Foundry if they follow the [Twelve Factor App](http://12factor.net/) guidelines.

## Exclude files

Cloud Foundry isn't version-control-aware, so `cf push` will deploy the working state of whatever files you have in that directory. In most cases, you will want to [exclude files](http://docs.cloudfoundry.org/devguide/deploy-apps/prepare-to-deploy.html#exclude) ignored by Git. From within your project directory, run

```bash
ln -s .gitignore .cfignore
```

and commit the `.cfignore` to your repository.
