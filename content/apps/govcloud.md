---
menu:
  main:
    parent: apps
title: What's New in Cloud.gov?
---

The new environment is a bit different and full of shiny new things.  Here are some and how to use them:

The new API endpoint (for now) is `api.cloud.gov`. To use it: `cf login -a api.cloud.gov --sso` for GSA/EPA accounts and `cf login -a api.cloud.gov` for non-GSA/EPA accounts. See [Setting Up Your Account]({{< relref "../getting-started/accounts.md" >}}) for more information.

`cf-ssh` is gone, long live `cf ssh`. With the [current cli](https://docs.cloudfoundry.org/devguide/installcf/install-go-cli.html), you should be able to run `cf ssh` for access to your apps. The `cf-ssh` command is no longer supported on cloud.gov.

If you are going to be working in both AWS east-west and govcloud environments, [this CloudFoundry plugin](https://github.com/guidowb/cf-targets-plugin) might be helpful.
