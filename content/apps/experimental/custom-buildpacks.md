---
menu:
  main:
    parent: experimental
title: Custom Buildpacks
---

### [THIS IS AN EXPERIMENTAL FEATURE](/apps/experimental/)

Cloud Foundry (the underlying open source project behing cloud.gov) uses the concept of [buildpacks](https://docs.cloudfoundry.org/buildpacks/) to allow your applications to be deployed.

cloud.gov [officially supports](/intro/pricing/whats-included/) a set of buildpacks but it also allows you to provide your own.

For example if you want to use the ["R" buildpack](https://github.com/alexkago/cf-buildpack-r) you can push your code by typing `cf push myapp -b https://github.com/alexkago/cf-buildpack-r`.

Once you push your code using a custom buildpack, cloud.gov cannot update it for you. You are responsible for keeping it up to date, please see https://docs.cloud.gov/intro/technology/responsibilities/.
