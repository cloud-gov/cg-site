---
menu:
  docs:
    parent: getting-started
title: App maintenance on cloud.gov
weight: 0
---
One of the benefits of hosting your application or website on cloud.gov is that the platform takes care of a lot of the maintenance and security details for you. There’s still work for you to do, though; you remain responsible for the security and maintenance of your apps and ensuring your apps are using the latest buildpacks. Restaging your app and pushing updates to your code are key to your app’s security.

## Restaging your app

Restaging is [a process that recreates your app](https://docs.cloudfoundry.org/devguide/deploy-apps/start-restart-restage.html#restage) on cloud.gov using the most recent environment. When the platform updates the filesystem (rootfs) and buildpacks, your apps need to be restaged in order to use them. cloud.gov doesn’t restage your apps for you because doing so may have unintended consequences for your app. So, make restaging a part of your development process. You may choose to restage your development and staging environment apps before restaging your production apps.

Run `cf restage <app-name>` every two weeks to get any updates we may have pushed that affect your app, especially if you don’t update your own code very often. Changes like these are announced in the platform release notes so you can know when we’ve mitigated a critical security issue or fixed a bug that affects your app’s stability. Without a restage, your app will miss out on these updates.

## Keeping your app up to date

You’re responsible for keeping your own app up to date. `cf restage` restarts your app with updates from the platform but not any updates to the software you use. If you’re running Drupal, Rails, Django, etc., you’re responsible for patching and updating those components and anything built on top of them. Only you should control when and how your apps are maintained. We encourage you to keep your apps, any associated libraries, and custom buildpacks up to date and make a plan for testing those changes in a [staging or development environment](https://cloud.gov/docs/getting-started/concepts/#spaces).

Whenever you push an update with `cf push`, your app will automatically restage to update your buildpack (if you’re using one the platform provides) and filesystem.
