---
menu:
  overview:
    parent: overview
title: Using the cloud.gov platform
weight: 20
aliases:
  - /docs/intro/overview/using-cloudgov-paas
  - /intro/overview/using-cloudgov-paas
---


[There are a few ways to get started using cloud.gov.]({{< relref "start-using-cloudgov.md" >}}) Once you have an interagency agreement (IAA) in place with 18F, the cloud.gov team will create an organization for each individual team or system upon agency request, and designate someone from your team as an Organization Manager. After that, everything is self-service, with support as needed from the cloud.gov team.

cloud.gov gives your team a range of powerful capabilities.

- You can instantly set up environments ("spaces") as needed for your team (for example: blue-green production spaces, testing, development).
- You can manage access for individual team members at either the organization or space level.
- You can automatically create instances of optional managed services that cloud.gov offers in each space, including database and search.
- You can deploy your own "application" code which uses credentials provided by the environment to access your services.
- You can bind "routes" to your application in order to enable traffic from the outside world to reach it via DNS.
- You can watch metrics, logs, and events as your application is used.
- You can instantly scale your application vertically or horizontally to handle more traffic.
- You can access your running application to troubleshoot or perform migrations.
- You can redeploy your applications to add capabilities or fix problems.

Once your team is comfortable with the CLI and web-based interface for cloud.gov, you can write scripts to orchestrate more complex processes involving multiple applications and spaces, all built on the Cloud Foundry API.

The cloud.gov team delivered a presentation about [our early experience developing and using cloud.gov](http://www.altoros.com/cflive/gsa-cuts-app-deployment-from-14-months-to-2-3-days-with-cloud-foundry/) at the May 2015 Cloud Foundry conference.
