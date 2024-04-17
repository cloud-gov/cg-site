---
layout: post
date: "2018-01-05"
title: "Note about Meltdown/Spectre vulnerabilities"
redirect_from:
  - /updates/2018-01-05-meltdown-statement/
---

Cloud.gov is tracking the recent public disclosure of vulnerabilities in modern CPUs, named the [Meltdown and Spectre](https://meltdownattack.com/) attacks.
We are taking all available steps to mitigate the impact of these vulnerabilities. No customer action is required.

Our cloud infrastructure provider [has already updated their systems](https://aws.amazon.com/security/security-bulletins/AWS-2018-013/) so that Cloud.gov customer applications are not vulnerable to Meltdown attacks from other tenants in AWS GovCloud.

When an update for the platform operating system is released, we will apply it. This will prevent Meltdown attacks between customer applications within Cloud.gov. We use Ubuntu, which [plans to release an update very soon](https://canonical.com/blog/ubuntu-updates-for-the-meltdown-spectre-vulnerabilities). Then the [Cloud Foundry team will release a CF-customized version](https://www.cloudfoundry.org/meltdown-spectre-attacks/), and we will apply the update to Cloud.gov. This will be [routine maintenance]({{ site.baseurl }}/docs/apps/app-maintenance#operating-system-patching) with no expected downtime.

We expect to have this update complete on or before the public release of proof-of-concept Meltdown exploit code on January 9.

There is no immediate remedy for Spectre attacks for any cloud service provider. Everyone must [upgrade their operating system and browsers](https://www.kb.cert.org/vuls/id/584653) to protect from all websites on the internet.

We will update this note as the release process progresses. If you have questions, email us at [support@cloud.gov](mailto:support@cloud.gov).

**Update** (January 9, 2018, 11 pm ET): Ubuntu has released an update with the relevant patches. We expect Cloud Foundry to released a CF-customized version in the next day, and we will apply the update when available.

**Update** (January 10, 2018, 11 am ET): Cloud Foundry released their version of Ubuntu with the Meltdown patches at 12:33 a.m. ET this morning. We are updating the development and staging environments of Cloud.gov and testing this release, then we will proceed with our production update later today. This will be [routine maintenance]({{ site.baseurl }}/docs/apps/app-maintenance#operating-system-patching) with no expected downtime.

**Update** (January 11, 2018, 5 pm ET): We've completed production deployment of the Cloud Foundry version of Ubuntu with initial Meltdown patches. Ubuntu and Cloud Foundry continue to release updates with additional patches, and we're following our standard deployment process as they become available.

**Update** (January 23, 2018, 8 pm ET): Ubuntu and Cloud Foundry released operating system updates including [mitigations for the Spectre class of vulnerabilities](https://usn.ubuntu.com/usn/usn-3540-2/) early this morning. We've completed deploying these updates in the Cloud.gov production environment.
