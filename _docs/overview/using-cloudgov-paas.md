---
parent: overview
layout: docs
sidenav: true
title: What you can do with the Cloud.gov platform
weight: 13
overview: true
redirect_from:
  - /docs/intro/overview/using-cloudgov-paas
  - /intro/overview/using-cloudgov-paas
---


[There are a few ways to get started using Cloud.gov.]({{ site.baseurl }}{% link _pages/pricing.md %}) Once your [system]({{ site.baseurl }}{% link _pages/sign-up.md %}#system) is set up, the Cloud.gov team will make sure someone from your team is designated as an Organization Manager. After that, everything is self-service. We support the platform, infrastructure, and compliance. The rest of these capabilities belong to your team.

- You can instantly set up environments ("spaces") as needed for your team (for example: blue-green production spaces, testing, development).
- You can manage access for individual team members at either the organization or space level.
- You can automatically create instances of optional managed services that Cloud.gov offers in each space, including database and search.
- You can deploy your own "application" code which uses credentials provided by the environment to access your services.
- You can bind "routes" to your application in order to enable traffic from the outside world to reach it via DNS.
- You can watch metrics, logs, and events as your application is used.
- You can instantly scale your application vertically or horizontally to handle more traffic.
- You can access your running application to troubleshoot or perform migrations.
- You can redeploy your applications to add capabilities or fix problems.

Once your team is comfortable with the CLI and web-based interface for Cloud.gov, you can write scripts to orchestrate more complex processes involving multiple applications and spaces, all built on the Cloud Foundry API.

The Cloud.gov team delivered a presentation about [our early experience developing and using Cloud.gov](http://www.altoros.com/cflive/gsa-cuts-app-deployment-from-14-months-to-2-3-days-with-cloud-foundry/) at the May 2015 Cloud Foundry conference.
