---
parent: deployment
redirect_from:
    - /apps/multi-buildpack-deploys/
    - /apps/apt-get/
    - /apps/experimental/custom-buildpacks/
    - /docs/apps/assets/

layout: docs
sidenav: true
title: More languages (custom buildpacks)

weight: 30
---

Cloud Foundry (the underlying open source project behind Cloud.gov) uses [buildpacks]({{site.baseurl }}/docs/getting-started/concepts/#buildpacks) to allow your applications to be deployed. Cloud.gov officially supports a set of "system buildpacks", but it also allows you to provide your own.

Once you push your code using a custom buildpack, Cloud.gov cannot update it for you. You are responsible for keeping it up to date. Please see [this description of responsibilities]({{ site.baseurl }}/docs/technology/responsibilities/).

## Example custom buildpacks

### Cloud Native Buildpacks

The Cloud Native community has over the last few years developed a [Cloud Native Buildpack (CNB) ecosystem](https://buildpacks.io/). CNBs are the next stage in the evolution of buildpacks, and will eventually replace what are now (in 2025) called Classic Buildpacks. The CNBs provide better control, compliance and maintainability than either Classic Buildpacks or pre-built Docker images.

A simple [Hello World example in NodeJS](https://github.com/cloud-gov/cf-hello-worlds/tree/main/nodejs) shows how to deploy an app to Cloud.gov using either the default Classic Buildpack, or a Cloud Native Buildpack via a `lifecycle` option.

### apt-buildpack

cloud.gov does not allow the use of `sudo` inside of buildpacks. If your app depends on a library that is `apt-get` installable, you can use the CF flavor of [`apt-buildpack`](https://github.com/cloudfoundry/apt-buildpack), which is a custom buildpack.

## Multi-buildpack support

If your application involves multiple languages, and it's not practical to split it into smaller applications (or the other options [under "Multiple languages" here]({{ site.baseurl }}/docs/getting-started/concepts/#buildpacks), Cloud Foundry offers support for [using multiple buildpacks](https://docs.cloudfoundry.org/buildpacks/use-multiple-buildpacks.html) for an application.
