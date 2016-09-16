---
menu:
  main:
    parent: apps
title: What Is New in Govcloud?
---

The new environment is a bit different and full of shiny new things here is some and how use them:

The new API endpoint (for now) is api.fr.cloud.gov. To use it: `cf login -a api.fr.cloud.gov --sso`. Your GSA/EPA credentials should still work there, no other credentials work at this time.

`cf-ssh` is gone, long live `cf ssh`. With the current cli you have in your environment you should be able to run `cf ssh` in the new environment. `cf-ssh` is not supported in the govcloud environment.

If you are going to be working in both east-west and govcloud environments, this plugin might be helpful: https://github.com/guidowb/cf-targets-plugin.
