---
parent: deployment

aliases:
    - /apps/multi-buildpack-deploys/
    - /apps/apt-get/
    - /apps/experimental/custom-buildpacks/
    - /docs/apps/assets/

layout: docs
sidenav: true
title: More languages (custom buildpacks)

weight: 30
---

Cloud Foundry (the underlying open source project behind cloud.gov) uses [buildpacks]({ site.baseurl }}{% link _docs/getting-started/concepts.md %}#buildpacks) to allow your applications to be deployed. cloud.gov [officially supports](/pricing/) a set of buildpacks, and it also allows you to provide your own.

Once you push your code using a custom buildpack, cloud.gov cannot update it for you. You are responsible for keeping it up to date. Please see [this description of responsibilities]({ site.baseurl }}{% link _docs/technology/responsibilities.md %}).

## Example custom buildpacks

### apt-buildpack

cloud.gov does not allow the use of `sudo` inside of buildpacks. If your app depends on a library that is `apt-get` installable, you can use the CF flavor of [`apt-buildpack`](https://github.com/cloudfoundry/apt-buildpack), which is a custom buildpack.

## Multi-buildpack support

If your application involves multiple languages, and it's not practical to split it into smaller applications (or the other options [under "Multiple languages" here]({ site.baseurl }}{% link _docs/getting-started/concepts.md %}#buildpacks), Cloud Foundry offers support for [using multiple buildpacks](https://docs.cloudfoundry.org/buildpacks/use-multiple-buildpacks.html) for an application.
