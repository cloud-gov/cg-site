---
menu:
  main:
    parent: apps
title: GovCloud guide
---

# GovCloud guide
cloud.gov currently has two "environments" where orgs can live: the main environment that most orgs are using (located in AWS East/West) and a new GovCloud environment (located in [AWS GovCloud](https://aws.amazon.com/govcloud-us/)).

When your org starts using cloud.gov's GovCloud environment, here are changes to look out for.

### Breaking changes

- GSA and EPA accounts still work in GovCloud. No other login credentials work at this time.
- The API endpoint (for now) is `api.fr.cloud.gov`. When you [log in on the command line]({{< relref "getting-started/setup.md" >}}), use this new command: `cf login -a api.fr.cloud.gov --sso`
- To access the Dashboard, visit [`https://dashboard.fr.cloud.gov/`](https://dashboard.fr.cloud.gov/).

### New features

- To run [one-off tasks]({{< relref "getting-started/one-off-tasks.md" >}}), [`cf-ssh`]({{< relref "getting-started/one-off-tasks.md#cf-ssh" >}}) is not available in GovCloud. Instead, you can use [`cf ssh`]({{< relref "getting-started/one-off-tasks.md#govcloud-environment-cf-ssh" >}}) (note the space instead of the `-`), which is more flexible than `cf-ssh`.
- To set up custom domains, you can use the [managed service method]({{< relref "apps/custom-domains.md#managed-service-method" >}}).

#### Experimental new features

- You can [require cloud.gov authentication to access your application]({{< relref "apps/experimental/experimental-services.md#authorization-proxy" >}}).
- You can [push Docker images]({{< relref "apps/experimental/docker.md" >}}).

### Tips

- If you need to work in both the East/West and GovCloud environments, [this Cloud Foundry plugin](https://github.com/guidowb/cf-targets-plugin) may be helpful.
