---
menu:
  docs:
    parent: apps
title: What's New in GovCloud?
---

The [new environment](https://aws.amazon.com/govcloud-us/) is a bit different and full of shiny new things. Here are some examples:

- The new API endpoint (for now) is `api.fr.cloud.gov`. To use it: `cf login -a api.fr.cloud.gov --sso`. Your GSA/EPA credentials should still work there. No other credentials will work at this time.
- `cf-ssh` is gone, long live `cf ssh`. With the current cli you have in your environment you should be able to run `cf ssh` in the new environment. `cf-ssh` is not supported in the GovCloud environment.
- If you are going to be working in both AWS East/West and GovCloud environments, [this CloudFoundry plugin](https://github.com/guidowb/cf-targets-plugin) might be helpful.
