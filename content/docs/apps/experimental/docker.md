---
menu:
  docs:
    parent: experimental
title: Deploying Docker images
---

{{% govcloud %}}
[**This is an experimental feature.**]({{< relref "docs/apps/experimental/experimental.md" >}})

#### Docker as apps

We've enabled an experimental feature to allow Docker image pushes.

The only way to push Docker applications right now is through a public Docker registry. We will enable a private registry in the future.

To push a Docker image, use the `-o` flag when pushing your app, for example:

`cf push lattice-app -o cloudfoundry/lattice-app`

If you want to build your own Docker image, or if you want to read more, check out the [Docker documentation](http://docs.cloudfoundry.org/adminguide/docker.html) in the Cloud Foundry project.

Once you push a Docker image as your application, cloud.gov cannot update the baseline for your application. You are responsible for keeping it up to date. Please see [this description of responsibilities]({{< relref "overview/technology/responsibilities.md">}}). However, please note that by using Docker images **you are accepting responsibility** to maintain the operating system, libraries, application code, and all the associated configurations (losing some of the benefits of a PaaS environment).

Here are some considerations to keep in mind when deciding to use Docker images instead of buildpacks in your application's deployment:

|   | Supported Buildpack | Docker Container  |
|---|---|---|
| Pros | It "just works".<br />Automatic and constant security updates.<br \>All you need to do is write code. | Can build container images and run containers on local workstation.<br \>Fine-grained control over compilation and root filesystem. |
| Cons | Difficult to recreate the execution environment locally.<br \>Testing compilation and the result of staging is harder. | Added responsibility for all security updates and bug fixes.<br \>More compliance responsibility means more work.  |

<!-- Based on the table in this slide: https://twitter.com/benbravo73/status/781125385777999872 -->

#### Docker as tasks

There is [an experimental Cloud Foundry API for tasks creation](http://v3-apidocs.cloudfoundry.org/version/3.0.0-alpha.1/index.html#tasks). This will allow single, one-off tasks to be triggered through the API.
{{% /govcloud %}}
