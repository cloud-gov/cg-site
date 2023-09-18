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

As an alternative to using buildpacks, you can push applications based on Docker images.

To push a Docker image, use the `--docker-image` flag when pushing your app, for example:

`cf push test-app --docker-image cloudfoundry/test-app`

You can also push an image from a private Docker registry by providing the host and authentication information, as in this example:

`CF_DOCKER_PASSWORD=YOUR-PASSWORD cf push APP-NAME --docker-image REPO/IMAGE:TAG --docker-username USER`

Details are in the Cloud Foundry documentation for [deploying an app with Docker](https://docs.cloudfoundry.org/devguide/deploy-apps/push-docker.html#private-repo). If you want to build your own Docker image, or if you want to read more about the implementation, check out the [Docker documentation](http://docs.cloudfoundry.org/adminguide/docker.html) in the Cloud Foundry project.

Once you push a Docker image as your application, cloud.gov cannot update the baseline for your application, so you are responsible for keeping it up to date. **You are responsible** for maintaining the operating system, libraries, application code, and all of the associated configuration. See [this chart of responsibilities]({{ site.baseurl }}{% link _docs/technology/responsibilities.md %}). This is not a recommended path and is only viable in some use cases; be aware that you lose a large set of features and some of the benefits of a PaaS system by leveraging this functionality.

Here are some considerations to keep in mind when deciding to use Docker images instead of supported buildpacks in your application's deployment:

|   | Supported buildpack | Docker container  |
|---|---|---|
| Pros | It "just works".<br />Automatic and constant security updates.<br />All you need to do is write code. | Can build container images and run containers on local workstation.<br />Fine-grained control over compilation and root filesystem. |
| Cons | Difficult to recreate the execution environment locally.<br />Testing compilation and the result of staging is harder. | Added responsibility for all security updates and bug fixes.<br />More compliance responsibility means more work.  |

<!-- Based on the table in this slide: https://twitter.com/benbravo73/status/781125385777999872 -->

### Runtime differences

Pushing an application using a Docker image creates the same type of container in the same runtime as using a buildpack does. When you supply a Docker image for your application, Cloud Foundry:
1. fetches the Docker image
1. uses the image layers to construct a base filesystem 
1. uses the image metadata to determine the command to run, environment vars, user id, and port to expose (if any)
1. creates an app specification based on the steps above 
1. passes the app specification on to diego (the multi-host container management system) to be run as a linux container.

No Docker components are involved in this process - your applications are run under the `garden-runc` runtime (versus `containerd` in Docker). Both `garden-runc` and `containerd` are layers built on top of the Open Container Initiative's `runc` package. They have significant overlap in the types of problems they solve and in many of the ways they try to solve them.
For example, both `garden-runc` and `containerd`:
- use cgroups to limit resource usage
- use process namespaces to isolate processes
- combine image layers into a single root filesystem
- use user namespaces to prevent users with escalated privileges in containers from gaining escalated privileges on hosts (this is an available option on `containerd` and is a default on `garden-runc`)

Additionally, since containers are running in Cloud Foundry, most or all of the other components of the Docker ecosystem are are replaced with Cloud Foundry components, such as service discovery, process monitoring, virtual networking, routing, volumes, etc. This means most Docker-specific guidance, checklists, etc., will not be directly applicable for applications within Cloud Foundry, regardless of whether they're pushed as Docker images or buildpack applications.


#### Docker as tasks

There is [a Cloud Foundry API for tasks creation](http://v3-apidocs.cloudfoundry.org/version/3.31.0/index.html#tasks). This allows single, one-off tasks to be triggered through the API.

### Using non-standard ports in Docker containers

When you assign a route to an app running on cloud.gov using the `*.app.cloud.gov` domain, external ports 80 and 443 are mapped to a dynamically assigned internal port on the container(s) running your app. You can't change the internal port assigned to your app if it's been assigned an `*.app.cloud.gov` domain, but you can use alternate ports if your app is assigned [an internal route](https://docs.cloudfoundry.org/devguide/deploy-apps/routes-domains.html#internal-routes) on cloud.gov.

When you deploy a Docker image that has a non-standard port exposed (e.g., port 5000) and assign an internal route to this app, this overrides the dynamic assignment of a default port by cloud.gov and exposes that non-standard port to container-to-container traffic. Your app can't be accessed by external traffic coming from outside the cloud.gov platform, but can be reached by traffic from another application running in your cloud.gov org.

In this scenario, if you want to enable external traffic to reach your Docker app running on a non-standard port, you'll need to do the following:

* Deploy a proxy application to route traffic from outside cloud.gov to the internal route you assigned to your Docker app. This can be something as simple as an nginx app that [uses a `proxy_pass` directive](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass) to route traffic to your Docker app. An example of this approach [can be seen here](https://github.com/cloud-gov/cf-redash).

* Enable container-to-container traffic by [adding a new network policy](https://cli.cloudfoundry.org/en-US/v6/add-network-policy.html) specifying the source app (your nginx proxy) and the destination app (your Docker app) as well as the port and protocol for the traffic.

### Docker + Cloud Foundry examples

#### Spring Music

We often use the [Spring Music app](https://github.com/cloudfoundry-samples/spring-music) to demonstrate the use of database services on Cloud Foundry. The same application works when bundled [into a Docker image](https://fabianlee.org/2018/05/24/docker-running-a-spring-boot-based-app-in-a-docker-container/), and works identically.

For example, push it to cloud.gov using a prebuilt Docker image with an in-memory database:
```
cf push my-spring --docker-image pburkholder/my-springmusic -m 1016M
```

Then create a database service, bind it, and restage the app to use the database:
```
cf create-service aws-rds micro-psql my-spring-db
cf bind-service my-spring my-spring-db
cf restage my-spring
```
