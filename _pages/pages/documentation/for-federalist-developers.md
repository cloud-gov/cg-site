---
title: For Pages Developers
permalink: /pages/documentation/for-federalist-developers/
layout: docs
navigation: pages
sidenav: pages-documentation
redirect_from:
  - /pages/how-federalist-works/for-federalist-developers/
---

# For Pages Developers

This page is for people who are developing the Pages application, including the webapp and build system. It it not for site developers that use Pages for publishing.

## Running Pages locally
Instructions for running Pages components locally are in in each code repository README:

- [Pages README](https://github.com/18F/federalist#running-locally-development)
- [Pages-builder README](https://github.com/18F/federalist-builder#running-locally)
- [Pages-garden-build README](https://github.com/18F/federalist-garden-build#development)

## Deploying Pages from CircleCI

This guide covers how the deployment process for Pages and Pages Builder works.
In order to understand the process for Pages Docker Build and Pages Registry, see [the cloud.gov setup guide]({{site.baseurl}}/pages/documentation/cloud-gov-setup/).

Pages is deployed by [CircleCI](https://circleci.com/docs/2.0/deployment_integrations/).
Pages and Pages Builder are configured such that changes to the main branch are deployed to production and changes to the staging branch are deployed to staging.
In both repos this configuration lives in the [`.circleci/config.yml`](https://circleci.com/docs/2.0/) file in the project repository.

Both projects use a file at `scripts/deploy-circle.sh` to run the actual deploy.
These scripts authenticate with cloud.gov using a [cloud.gov deploy user]({{ site.baseurl }}/docs/apps/continuous-deployment/#deployer-account).
Despite some minor differences, both of these scripts do essentially the same thing:

0. Check the current branch and use it to determine which space to deploy to
0. Install Autopilot for cf-cli (used for zero downtime deploys)
0. Use `cf login` to authenticate the deploy user
0. Do a zero downtime push of the application

## Zero downtime deploys

Pages has high availability requirements because it needs to be up to receive GitHub webhook and build status requests.
Because of this, the [autopilot]({{ site.baseurl }}/docs/apps/production-ready/#zero-downtime-deploy) Cloud Foundry CLI plugin is used so the app can be deployed without downtime.

Zero downtime deploys work by:

0. Renaming the app to `<appname>-venerable`, for example `federalist-venerable`
0. Pushing a new app with the old app's name
0. When the new app is started, routing requests to the new app and deleting the venerable app

### Cleanup after a failed deploy

If autopilot fails to deploy the new app, it exits and does not clean up after itself.
So after a failed deploy there will be a stopped app named `<appname>` and a running app named `<appname>-venerable` fielding requests.
This is by design so that a failed deploy does not cause the app to go down.

The downside of this setup is that all future deploys will fail since there will be a name collision on `<appname>-venerable`.
As a result, the failed deploy will need to be cleaned up before another deploy can succeed.

To cleanup after a failed deploy:

0. Delete the new app. For the main Pages app that would be `federalist`.
0. Rename the venerable app to the name of the new app. For example, rename `federalist-venerable` to `federalist`.
0. Start a build on CircleCI to re-deploy.
