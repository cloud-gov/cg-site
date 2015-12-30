---
menu:
  main:
    parent: getting-started
title: Setup
weight: -100
---

## Install the CLI

1. Follow [these instructions](https://docs.cloudfoundry.org/devguide/installcf/install-go-cli.html).
1. Confirm the installation by running `cf -v`.

## Log in

[Once you have an account]({{< relref "accounts.md" >}}), run

```bash
cf login -a api.cloud.gov
```

If you were given a password, you'll probably want to change it with:

```bash
cf passwd
```

If for some reason you cannot reset your password with `cf passwd` you can also use the
[web-based reset feature](https://login.cloud.gov/forgot_password).

## Play around

If you want to practice deploying, run the following before continuing:


```bash
cf target -o sandbox -s <USERNAME>
```

Your `USERNAME` is probably the part of your email before the `@`, e.g. `FIRSTNAME.LASTNAME`. When you're done, please `cf delete <APPNAME>`.
