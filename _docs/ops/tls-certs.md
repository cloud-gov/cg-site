---
parent: deploying-cloudgov
layout: ops
layout: docs
sidenav: true
title: Provisioning TLS certificates
---

We use one wildcard TLS certificate for each cloud.gov environment, plus an additional certificate for customer applications in production:

* Development: `*.dev.us-gov-west-1.aws-us-gov.cloud.gov`
* Staging: `*.fr-stage.cloud.gov`
* Production system: `*.fr.cloud.gov`
* Production customer: `*.app.cloud.gov`

We provision certificates using Let's Encrypt. Our [terraform pipeline](https://ci.fr.cloud.gov/teams/main/pipelines/terraform-provision) checks certificate expiration dates daily and renews certificates that are about to expire. Our load balancers are configured to use the latest certificate; updating load balancers requires re-applying terraform stacks.
