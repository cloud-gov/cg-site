---
date: 2015-08-28T10:32:59-04:00
menu:
  docs:
    parent: apps
title: Production Ready guide
---

This is your guide to building production-ready apps on cloud.gov. Read this early and often, especially when you’re starting to consider a future project. It explains things you can do for reliable and responsive applications deployed on cloud.gov.

## Core best practices
To build consistent, healthy, production-ready applications on cloud.gov, incorporate the following practices into your development workflow from the beginning.

### Configuration as code
To ensure consistency and reproducibility, you should capture your application configuration in version control.

#### How
* Write an [application manifest](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html) that defines your application configuration, such as the application name, or what previously created services to use.

### More than one instance
It is critical that your production application has more than one instance. Then if
there are any issues with one of the platform runners where your app instances are assigned, your app will continue to function correctly.

#### How
* See the [multiple instances]({{< relref "multiple-instances.md" >}}) page.

### Protect access to sensitive credentials
Environment variables defined with `cf set-env` are ephemeral to the specific deployment of each application. You should use user-provided services to store sensitive information such as credentials or API keys, and use your `manifest.yml` for non-sensitive variables.

#### How
* Create [user-provided services](https://docs.cloudfoundry.org/devguide/services/user-provided.html) with `cf cups` and bind them with `cf bs`. Once you have updated your application to read your stored credentials from the service, [update your `manifest.yml`](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html#services-block) to make it part of your configuration. For non-sensitive information, use [an env: block](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html#env-block) in your `manifest.yml`.
* Protect access to platform provided variables such as `VCAP_SERVICES` for [managed services]({{< relref "managed-services.md" >}}) and `DATABASE_URL` for [the database service]({{< relref "docs/services/relational-database.md" >}}).
  * Minimize your number of users with the `SpaceDeveloper` role, as they can access all environment variables using `cf env`.
  * Educate users who require the `SpaceDeveloper` role to protect access to environment variables.

### Prefer dedicated over shared services
Shared services do not have the same constraints as a dedicated service and can be affected by other customers that are performing CPU or memory intensive tasks against that service.

#### How
* Use `cf marketplace` to consider your options and sizes for each service, and choose appropriately for the resources your application will need.

### Space per environment
When running an application for development or testing, it is best to have a separate space from your production instance in which to run the application. Ideally, each space will look identical to each other, with the exception of routes or number of instances.

#### How
* As an Org Manager for your organization, use the `cf create-space` command to create new spaces for each environment.

### Health monitoring
You want to receive alerts about application errors, downtime, and throughput issues.

#### How
* New Relic provides extensive application performance and availability monitoring with "Insights". You can set up and receive alerts on a variety of metrics.

## Additional practices
The following practices are very helpful to incorporate into most cloud.gov apps. Evaluate which ones you need for your team and users.

### Zero-downtime deploy
Your application should be able to be deployed without any downtime. Be aware there are known issues if your application automatically does database migrations when deploying.

#### How
* Use the [autopilot](https://github.com/concourse/autopilot) Cloud Foundry CLI plugin.

### Automated deployments
To reduce the risk associated with manual deployments, consider automating the process to make it repeatable.

#### How
* See [continuous deployment]({{< relref "continuous-deployment.md" >}}).

### Caching
The best way to prevent performance issues is to enable caching on your application.

#### How
* cloud.gov has a memcached service, but you can also use [S3 file storage]({{< relref "s3.md" >}}) for caches.

### Asset Serving
It's best not to serve static files from cloud.gov directly.

#### How
* You can [store your files in S3]({{< relref "s3.md" >}}) or point CloudFront to an assets folder so you serve your assets with a CDN.

### Custom domain name
When you need a domain name dedicated for your application, DNS delegation for the domain is the easiest path to getting the domain up and running.

#### How
* See [custom domains]({{< relref "custom-domains.md" >}}).