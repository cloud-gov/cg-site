---
parent: deployment
layout: docs
sidenav: true
title: Deploying Docker images
redirect_from:
  - /docs/intro/technology/containers
  - /overview/technology/containers
  - /docs/apps/experimental/docker
  - /docs/apps/docker/
---

As an alternative to using buildpacks, you can push applications based on Docker.

To push a Docker image, use the `--docker-image` flag when pushing your app, for example:

`cf push test-app --docker-image cloudfoundry/test-app`

You can also push an image from a private Docker registry by providing the host and authentication information, as in this example:

`CF_DOCKER_PASSWORD=YOUR-PASSWORD cf push APP-NAME --docker-image REPO/IMAGE:TAG --docker-username USER`

Details are in the Cloud Foundry documentation for [deploying an app with Docker](https://docs.cloudfoundry.org/devguide/deploy-apps/push-docker.html#private-repo). If you want to build your own Docker image, or if you want to read more about the implementation, check out the [Docker documentation](http://docs.cloudfoundry.org/adminguide/docker.html) in the Cloud Foundry project.

Once you push a Docker image as your application, cloud.gov cannot update the baseline for your application, so you are responsible for keeping it up to date. **You are responsible** for maintaining the operating system, libraries, application code, and all of the associated configuration. See [this chart of responsibilities]({{ site.baseurl }}{% link _docs/technology/responsibilities.md %}). This is not a recommended path and is only viable in some use cases; be aware that you lose a large set of features and some of the benefits of a PaaS system by leveraging this functionality.

Here are some considerations to keep in mind when deciding to use Docker images instead of supported buildpacks in your application's deployment:

|   | Supported buildpack | Docker container  |
|---|---|---|
| Pros | It "just works".<br />Automatic and constant security updates.<br \>All you need to do is write code. | Can build container images and run containers on local workstation.<br \>Fine-grained control over compilation and root filesystem. |
| Cons | Difficult to recreate the execution environment locally.<br \>Testing compilation and the result of staging is harder. | Added responsibility for all security updates and bug fixes.<br \>More compliance responsibility means more work.  |

<!-- Based on the table in this slide: https://twitter.com/benbravo73/status/781125385777999872 -->

#### Docker as tasks

There is [a Cloud Foundry API for tasks creation](http://v3-apidocs.cloudfoundry.org/version/3.31.0/index.html#tasks). This allows single, one-off tasks to be triggered through the API.

### Docker + Cloud Foundry examples

#### Spring Music

We often use the [Spring Music app](https://github.com/cloudfoundry-samples/spring-music) to demonstrate the use of database services on Cloud Foundry. The same application works when bundled [into a Docker image](https://fabianlee.org/2018/05/24/docker-running-a-spring-boot-based-app-in-a-docker-container/), and works identically.

For example, push it to cloud.gov using a prebuilt Docker image with an in-memory database:
```
cf push my-spring --docker-image pburkholder/my-springmusic -m 1016M
```

Then create a database service, bind it, and restage the app to use the database:
```
cf create-service aws-rds shared-psql my-spring-db
cf bind-service my-spring my-spring-db
cf restage my-spring
```

#### Docker task with S3 and CF CLI Variable

The folks at [Stark and Wayne](https://github.com/starkandwayne/) have published a [useful demo](https://github.com/starkandwayne/pcf-docker-scheduler-demo) of packaging a shell script into a Docker image, then pushing it to Cloud Foundry with the necessary environment variables.
