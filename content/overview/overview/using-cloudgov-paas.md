---
menu:
  overview:
    parent: overview
title: How to use it
weight: 40
aliases:
  - /docs/intro/overview/using-cloudgov-paas
  - /intro/overview/using-cloudgov-paas
---

## Using the cloud.gov PaaS as self-service

- To use cloud.gov without 18F’s other delivery services, your agency needs an organization account. 18F works with agencies to set up their cloud.gov presence. After that, the rest of the work is self-service. It wouldn’t require any more interaction with 18F.

- You can then use cloud.gov to set up a number of online “spaces” required for developing a federal website. Your team could choose from a list of additional, optional services that cloud.gov offers, including database and search capabilities. Once the requested services are available (which happens automatically upon request), you can use them from within your code.

- After your team is set up on cloud.gov, the team can:
  - Set up a Cloud Foundry “org” that correctly references the agency for billing purposes. This would include a quota.
  - Add “spaces” to represent as many environments as you need (for example: blue-green production, QA and CI, personal development, etc.)
  - Choose from cloud.gov’s list of supported “managed services”. You would then provision “service instances” specific to your spaces.
  - Deploy applications and services that you will manage on your own into those same spaces, and bind them to the managed service instances to ensure you can use them.
  - Bind “routes” to your applications in order to enable traffic from the outside world to reach them.
  - Watch metrics, logs, and events as your service is used. You can redeploy applications to add capabilities or fix problems.

- Beyond the first step above, the rest of the steps are self-service. You can self-manage access for individual team members at either the org or space level.

- Once your team is comfortable with the CLI and web-based interface for cloud.gov, the team can write scripts to orchestrate more complex processes involving multiple applications and spaces, all built on the Cloud Foundry API.

## Using the cloud.gov PaaS with an 18F team

18F teams that are working with agency partners use cloud.gov to develop and deploy applications. If 18F is delivering a product, the use of cloud.gov is implicit, and we recoup costs from the partner agency. This ensures the least possible friction for our teams. For example, [Every Kid in a Park](https://everykidinapark.gov/) (for the Department of the Interior) and [College Scorecard](https://collegescorecard.ed.gov/) (for the Department of Education) were both developed and launched using cloud.gov.

The cloud.gov team delivered a presentation about [our early experience developing and using cloud.gov](http://www.altoros.com/cflive/gsa-cuts-app-deployment-from-14-months-to-2-3-days-with-cloud-foundry/) at the May 2015 Cloud Foundry conference.
