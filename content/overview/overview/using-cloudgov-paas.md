---
menu:
  overview:
    parent: overview
title: How to use it
weight: 20
aliases:
  - /docs/intro/overview/using-cloudgov-paas
  - /intro/overview/using-cloudgov-paas
---

## Using the cloud.gov PaaS as self-service

To make cloud.gov available for your team, [have your agency work with 18F to set up an interagency agreement]({{< relref "overview/pricing/how-to-purchase.md" >}}), which will be used for for billing. 18F will create an organization for each individual team or system upon agency request, and designate someone from your team as an Organization Manager. After that, the rest of your team's work is self-service and requires no further interaction with 18F.

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

## Using the cloud.gov PaaS with an 18F team

18F teams that are working with agency partners use cloud.gov to develop and deploy applications. If 18F is delivering a product, the use of cloud.gov is implicit, and we recoup costs from the partner agency. This ensures the least possible friction for our teams. For example, [Every Kid in a Park](https://everykidinapark.gov/) (for the Department of the Interior) and [College Scorecard](https://collegescorecard.ed.gov/) (for the Department of Education) were both developed and launched using cloud.gov.

The cloud.gov team delivered a presentation about [our early experience developing and using cloud.gov](http://www.altoros.com/cflive/gsa-cuts-app-deployment-from-14-months-to-2-3-days-with-cloud-foundry/) at the May 2015 Cloud Foundry conference.
