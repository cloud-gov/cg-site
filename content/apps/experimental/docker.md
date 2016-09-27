---
menu:
  main:
    parent: experimental
title: Deploying Docker Images
---

### [This is an experimental feature.](/apps/experimental/)

#### Docker as apps

In the new [cloud.gov environment (AWS GovCloud)](/apps/govcloud/), we've enabled an experimental feature to allow Docker image pushes.

The only way to push Docker applications right now is through a public Docker registry. We will enable a private registry in the future.

To push a Docker image, use the `-o` flag when pushing your app, for example: `cf push lattice-app -o cloudfoundry/lattice-app`

If you want to build your own Docker image, or if you want to read more, check out the [Docker documentation](http://docs.cloudfoundry.org/adminguide/docker.html) in the Cloud Foundry project.

Once you push a Docker image as your application, cloud.gov cannot update the baseline for your application. You are responsible for keeping it up to date. Please see [this description of responsibilities]({{< relref "intro/technology/responsibilities.md">}}.


#### Docker as tasks

There is an experimental API for tasks creation, to read more please visit http://v3-apidocs.cloudfoundry.org/version/3.0.0-alpha.1/index.html#tasks. This will allow single, one-off tasks to be triggered through the API.
