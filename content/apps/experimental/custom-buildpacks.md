---
menu:
  main:
    parent: experimental
title: Custom Buildpacks
---

[**This is an experimental feature.**]({{< relref "apps/experimental/experimental.md" >}})

Cloud Foundry (the underlying open source project behind cloud.gov) uses [buildpacks](https://docs.cloudfoundry.org/buildpacks/) to allow your applications to be deployed.

cloud.gov [officially supports]({{< relref "intro/pricing/whats-included.md">}}) a set of buildpacks, and it also allows you to provide your own.

For example, if you want to use the ["R" buildpack](https://github.com/alexkago/cf-buildpack-r), you can push your code by typing: 

`cf push myapp -b https://github.com/alexkago/cf-buildpack-r`

Once you push your code using a custom buildpack, cloud.gov cannot update it for you. You are responsible for keeping it up to date. Please see [this description of responsibilities]({{< relref "intro/technology/responsibilities.md">}}).