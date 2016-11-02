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

## Using the cloud.gov PaaS with 18F

18F uses cloud.gov to develop and deploy applications in our work with agency partners. If 18F is delivering a product, the use of cloud.gov is implicit, and we recoup costs from the partner agency. This ensures the least possible friction for our teams. For example, [Every Kid in a Park](https://everykidinapark.gov/) (for the Department of the Interior) and [College Scorecard](https://collegescorecard.ed.gov/) (for the Department of Education) were both developed and launched using cloud.gov.

We delivered a presentation about [our early experience developing and using cloud.gov](http://www.altoros.com/cflive/gsa-cuts-app-deployment-from-14-months-to-2-3-days-with-cloud-foundry/) at the May 2015 Cloud Foundry conference.

## Using the cloud.gov PaaS as self-service

- To use cloud.gov without 18F’s other delivery services, an agency would need an account for their organization. (As stated elsewhere, we are currently [limiting access while we address scaling points]({{< relref "who-can-use-cloudgov.md" >}}).) 18F would work with the agency to set up their cloud.gov presence. After that, the rest of the work is self-service. It wouldn't require any more interaction with 18F.

- The agency would then use cloud.gov to set up a number of online “spaces” required for developing a federal website. The agency team could choose from a list of additional, optional applications that we offer including technical back-end and search capabilities. Once the requested services are available (which happens automatically upon request), the agency can use them from their code.

- After an agency is set up on cloud.gov:
  - The agency team would set up a Cloud Foundry “org” that correctly references the agency for billing purposes. This would include a quota.
  - The team would then add “spaces” to represent as many environments as they need (for example: blue-green production, QA and CI, personal development, etc.)
  - The team would choose from the list of “managed services” we offer and support (for example: memcache, elasticsearch). The team would then provision “service instances” specific to their spaces.
  - The team would deploy applications and services that they will manage on their own into those same spaces, and bind them to the managed service instances to ensure they can use them.
  - The team would then bind “routes” to their applications in order to enable traffic from the outside world to reach them.
  - The team can watch metrics, logs, and events as their service is used. They can redeploy applications to add capabilities or fix problems.

- Beyond the first step above, the rest of the steps are self-service. The team can self-manage access for individual team members at either the org or space level.

- Once they’re comfortable with the CLI and web-based UI for cloud.gov, the team can write scripts to orchestrate more complex processes involving multiple applications and spaces, all built on the Cloud Foundry API.
