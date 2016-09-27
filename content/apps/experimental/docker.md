---
menu:
  main:
    parent: experimental
title: Deploying Docker Images
---

### [THIS IS AN EXPERIMENTAL FEATURE](/apps/experimental/)

#### Docker as apps

In the new [cloud.gov environment (govcloud)](/apps/govcloud/) an experimental feature is enabled to allow docker image pushes.

The only way to push docker applications right now is through a public Docker registry. We will enable a private registry in the future.

To push a Docker image just use the `-o` flag when pushing your app, like: `cf push lattice-app -o cloudfoundry/lattice-app`.

If you want to build your own Docker image or if you want to read more, please check out the [full Docker documentation page](http://docs.cloudfoundry.org/adminguide/docker.html) of the cloud foundry project.

Once you push a Docker image as your application, cloud.gov cannot update the baseline for your application. You are responsible for keeping it up to date, please see https://docs.cloud.gov/intro/technology/responsibilities/.


#### Docker as tasks

There is an experimental API for tasks creation, to read more please visit http://v3-apidocs.cloudfoundry.org/version/3.0.0-alpha.1/index.html#tasks. This will allow single, one-off tasks to be triggered through the API.
