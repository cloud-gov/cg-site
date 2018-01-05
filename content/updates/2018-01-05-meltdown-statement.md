+++
date = "2018-01-05"
title = "Note about Meltdown/Spectre vulnerabilities"
+++

cloud.gov is tracking the recent public disclosure of vulnerabilities in modern CPUs, named the [Meltdown and Spectre](https://meltdownattack.com/) attacks. 
We are taking all available steps to mitigate the impact of these vulnerabilities. No customer action is required.

Our cloud infrastructure provider [has already updated their systems](https://aws.amazon.com/security/security-bulletins/AWS-2018-013/) so that cloud.gov customer applications are not vulnerable to Meltdown attacks from other tenants in AWS GovCloud.

When an update for the platform operating system is released, we will apply it. This will prevent Meltdown attacks between customer applications within cloud.gov. We use Ubuntu, which [plans to release an update very soon](https://insights.ubuntu.com/2018/01/04/ubuntu-updates-for-the-meltdown-spectre-vulnerabilities/). Then the [Cloud Foundry team will release a CF-customized version](https://www.cloudfoundry.org/meltdown-spectre-attacks/), and we will apply the update to cloud.gov. This will be [routine maintenance]({{< relref "docs/getting-started/app-maintenance.md#operating-system-patching" >}}) with no expected downtime.

We expect to have this update complete on or before the public release of proof-of-concept Meltdown exploit code on January 9.

There is no immediate remedy for Spectre attacks for any cloud service provider. Everyone must [upgrade their operating system and browsers](https://www.kb.cert.org/vuls/id/584653) to protect from all websites on the internet.

We will update this note as the release process progresses. If you have questions, email us at [cloud-gov-support@gsa.gov](mailto:cloud-gov-support@gsa.gov).