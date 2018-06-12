---
menu:
  docs:
    parent: apps
title: Deploying Docker images
aliases:
  - /docs/intro/technology/containers
  - /overview/technology/containers
  - /docs/apps/experimental/docker
---

As an alternative to using buildpacks, you can push applications based on Docker.

To push a Docker image, use the `--docker-image` flag when pushing your app, for example:

`cf push lattice-app --docker-image cloudfoundry/lattice-app`

You can also push an image from a private Docker registry by providing the host and authentication information, as in this example:

`CF_DOCKER_PASSWORD=YOUR-PASSWORD cf push APP-NAME --docker-image REPO/IMAGE:TAG --docker-username USER`

Details are in the Cloud Foundry documentation for [deploying an app with Docker](https://docs.cloudfoundry.org/devguide/deploy-apps/push-docker.html#private-repo). If you want to build your own Docker image, or if you want to read more about the implementation, check out the [Docker documentation](http://docs.cloudfoundry.org/adminguide/docker.html) in the Cloud Foundry project.

Once you push a Docker image as your application, cloud.gov cannot update the baseline for your application, so you are responsible for keeping it up to date. **You are responsible** for maintaining the operating system, libraries, application code, and all of the associated configuration (losing some of the benefits of a PaaS environment). See [this chart of responsibilities]({{< relref "overview/technology/responsibilities.md">}}).

Here are some considerations to keep in mind when deciding to use Docker images instead of supported buildpacks in your application's deployment:

|   | Supported buildpack | Docker container  |
|---|---|---|
| Pros | It "just works".<br />Automatic and constant security updates.<br \>All you need to do is write code. | Can build container images and run containers on local workstation.<br \>Fine-grained control over compilation and root filesystem. |
| Cons | Difficult to recreate the execution environment locally.<br \>Testing compilation and the result of staging is harder. | Added responsibility for all security updates and bug fixes.<br \>More compliance responsibility means more work.  |

<!-- Based on the table in this slide: https://twitter.com/benbravo73/status/781125385777999872 -->

#### Docker as tasks

There is [a Cloud Foundry API for tasks creation](http://v3-apidocs.cloudfoundry.org/version/3.31.0/index.html#tasks). This allows single, one-off tasks to be triggered through the API.
