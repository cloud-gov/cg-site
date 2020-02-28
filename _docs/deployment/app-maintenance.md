---
parent: deployment
redirect_from: 
    - /docs/getting-started/app-maintenance/
    - /docs/apps/app-maintenance/
layout: docs
sidenav: true
title: App maintenance
weight: -90
---

One of the benefits of hosting your application or website on cloud.gov is that the platform takes care of a lot of the maintenance and security details for you. There’s still work for you to do, though; you remain responsible for the security and maintenance of your apps and ensuring your apps are using the latest buildpacks. Restaging your app and pushing updates to your code are key to your app’s security.

## Restaging your app

Restaging is [a process that recreates your app](https://docs.cloudfoundry.org/devguide/deploy-apps/start-restart-restage.html#restage) on cloud.gov using the most recent environment. When the platform updates the filesystem (rootfs) and buildpacks, your apps need to be restaged in order to use them. cloud.gov doesn’t restage your apps for you because doing so may have unintended consequences for your app. Make restaging a part of your development process. You may choose to restage your development and staging environment apps before restaging your production apps.

Run `cf restage <app-name>` periodically (for example, every two weeks) to get any updates we may have pushed that affect your app, especially if you don’t update your own code very often. Changes like these are announced in the platform release notes so you can know when we’ve mitigated a critical security issue or fixed a bug that affects your app’s stability. When a new version of a  buildpack in use by your apps is available we also notify everyone with the space developer role about the need to restage. Without a restage, your app will miss out on these updates.

## Keeping your app up to date

You’re responsible for keeping your own app up to date. `cf restage` rebuilds and restarts your app with updates from the platform, but not any updates to the software you use. If you’re running Drupal, Rails, Django, etc., you’re responsible for patching and updating those components and anything built on top of them. Only you should control when and how your apps are maintained. We encourage you to keep your apps, any associated libraries, and custom buildpacks up to date and make a plan for testing those changes in a [staging or development environment]({{ site.baseurl }}/docs/getting-started/concepts/#spaces).

Whenever you deploy an app update with `cf push`, your app will use the latest buildpack (if you’re using one provided by the platform) and filesystem.

## Avoiding downtime during buildpack or app updates
**Note that your app may be unavailable while a `cf restage` or `cf push` is in progress.** Avoid this by [setting up zero-downtime deployments for your app]({{ site.baseurl }}/docs/deployment/production-ready/#zero-downtime-deploy), so that every new version of your app picks up the latest buildpack without impacting your app's availability.

## Operating system patching

The cloud.gov platform team is responsible for maintenance and patching of the operating system and other platform components. Your applications benefit from these updates automatically.

How this works:

1. The operating system team releases an update.
1. The [Cloud Foundry BOSH](http://bosh.cloudfoundry.org/) team packages the OS update into a ["stemcell" image](https://bosh.cloudfoundry.org/docs/stemcell.html) and releases the stemcell update, typically within 24-48 hours.
1. The cloud.gov system deploys the stemcell to our staging environment, verifies that all components are operating as expected, then deploys the stemcell to production.
1. As part of the production deployment (typically within 24-48 hours), the platform automatically restarts your application instances on a host running the updated operating system.

This means that when patches become available for security issues in the operating system, your applications receive the updates typically within 2-4 days of the patch release.

For details, see the [cloud.gov System Security Plan (SSP)]({{ site.baseurl }}{% link _docs/overview/fedramp-tracker.md %}#how-you-can-use-this-p-ato) control descriptions in the SI and CM families, including SI-2, CM-2, CM-2 (2), and CM-6 (1).

## Physical infrastructure

Our Infrastructure as a Service provider is responsible for maintenance of physical infrastructure.
