---
date: 2015-08-28T10:32:59-04:00
menu:
  main:
    parent: apps
title: Production Ready Guide
---

# Your guide to having production ready apps on cloud.gov

Read this guide early and often, especially when you’re starting to consider a future project. It explains things you can do for reliable and responsive applications deployed on cloud.gov.

## Core best practices
To build consistent, healthy, production-ready applications on cloud.gov incorporate the following practices into your development workflow from the beginning.

### Configuration as code
To ensure consistency and reproducibility, you should capture your application configuration in version control.

#### How
* Write an [application manifest](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html) that defines your application configuration, such as the application name, or what previously created services to use.

### More than one instance
It is critical that your production application has more than one instance so if
there any issue with one of the platform runners where your app instances are assigned, your app continues to function correctly.

#### How
* See the [multiple instances]({{< relref "multiple-instances.md" >}}) page.

### Prefer User Provided Services
Prefer user provided services over environment variables for a secure centralized way to store application credentials and variables. Environment variables are ephemeral to the specific deployment of each application.

#### How
* Create [user provided services](https://docs.cloudfoundry.org/devguide/services/user-provided.html) with `cf cups` and bind them with `cf bs`. Once you have updated your application to read your stored credentials from the service, update your `manifest.yml` to make it part of your configuration.

### Prefer dedicated over shared services
Shared services do not have the same constraints as a dedicated service and can be affected by other customers that are performing CPU or memory intensive tasks against that service.

#### How
* Use the `cf marketplace` to consider your options and sizes for each service and choose appropriately for the resources your application will need.

### Space per environment
When running an application for development or testing, it is best to have a separate space from your production instance in which to run the application.

#### How
* As an Org Manager for your organization, use the `cf create-space` command to create new spaces for each environment

### Health monitoring
You want to be able to receive alerts about application errors, downtime, and throughput issues.

#### How
* NewRelic provides uptime monitoring with "Insights". It is easy to set up and
receive alerts on a variety of metrics.

## Additional practices
The following practices are very helpful to incorporate into most cloud.gov apps. Check these out and evaluate which ones you need, depending on the needs of your team and users.

### Zero-Downtime deploy
Your application should be able to be deployed without generating any downtime. Be aware there are known issues if your application automatically does database migrations when deploying.

#### How
* Use the [autopilot](https://github.com/concourse/autopilot) Cloud Foundry CLI plugin or the [`cf-blue-green`](https://github.com/18F/cf-blue-green) tool; see instructions in the respective repositories.

### Automated deployments
To reduce the risk associated with manual deployments, consider automating the process so it is repeatable.

#### How
* See the [continuous deployment]({{< relref "continuous-deployment.md" >}}) page.

### Caching
The best way to prevent performance issues is by having caching enabled on your application.

#### How
* Cloud.gov has a memcached service but you can also rely on S3 or file storage for caches.

### Asset Serving
It is best not to serve static files from Cloud.gov directly.

#### How
* You can store your files in S3 or point CloudFront to an assets folder so you serve your assets with a CDN.

### Custom domain name
If and/or when you need a domain name dedicated for your application, DNS delegation for the domain is the easiest path for getting the domain up and running.

#### How
* See the [custom domains]({{< relref "custom-domains.md" >}}) page.
