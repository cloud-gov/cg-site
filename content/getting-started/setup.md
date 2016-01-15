---
menu:
  main:
    parent: getting-started
title: Setup
weight: -50
---

## Setting up the command line

As a user, nearly all of your interactions with Cloud Foundry will be through the command line. To get it set up:

1. [Get an account]({{< relref "accounts.md" >}}).
1. [Install the CLI](https://docs.cloudfoundry.org/devguide/installcf/install-go-cli.html).
1. Confirm the installation by running

    ```bash
    cf -v
    ```

1. Log in by running

    ```bash
    cf login -a api.cloud.gov
    ```

## Play around

If you want to practice deploying, run the following before continuing:


```bash
cf target -o sandbox -s <USERNAME>
```

Your `USERNAME` is probably the part of your email before the `@`, e.g. `FIRSTNAME.LASTNAME`. When you're done, please `cf delete <APPNAME>`.
