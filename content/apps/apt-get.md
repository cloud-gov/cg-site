---
menu:
  main:
    parent: experimental
title: Using apt-get
---

[**This uses an experimental feature.**]({{< relref "apps/experimental/experimental.md" >}})

cloud.gov does not allow the use of `sudo` inside of buildpacks. If your app depends on a library that is `apt-get` installable, use the CF-flavor of the [`apt-buildpack`](https://github.com/pivotal-cf-experimental/apt-buildpack). This works great with [`cf-buildpack-multi`]({{< relref "multi-buildpack-deploys.md" >}}).

`apt-buildpack` and `cf-buildpack-multi` are [custom buildpacks]({{< relref "apps/experimental/custom-buildpacks.md" >}}).

You can see this in the wild in 18F's [`iaa-pdf-api`](https://github.com/18f/iaa-pdf-api) repo, which depends on the [`pdftk`](https://www.pdflabs.com/tools/pdftk-server/) library.
