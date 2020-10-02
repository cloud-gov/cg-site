---
parent: overview
layout: docs
sidenav: true
overview: true
title: The benefits of cloud.gov
weight: -51
redirect_from:
  - /docs/intro/overview/why-use-cloudgov
  - /intro/overview/why-use-cloudgov
  - /overview/overview/why-use-cloudgov
  - /overview/security/improving-application-security/
  - /docs/intro/security/improving-application-security
  - /intro/security/improving-application-security
  - /overview/security/improving-application-security/
  - /docs/intro/overview/why-available-other-agencies
  - /intro/overview/why-available-other-agencies
  - /overview/overview/why-available-other-agencies
---

## 1. Security

cloud.gov is built on the open source [Cloud Foundry project](http://www.cloudfoundry.org/), which is run by a non-profit foundation with many commercial members and an active community of contributors. Cloud Foundry’s “stemcell” capability allows cloud.gov to deploy all apps on a hardened operating system image that is tightly audited for compliance with federal standards. We are continually improving the security of the platform, which in turn centrally improves the security of your products that are running on the platform.

cloud.gov enforces an immutable infrastructure. Instead of logging into a live system to make a change, we deploy an entirely new system with security updates applied. That ensures any foothold which might have been exploited by hackers gets wiped away at the same time. The same is true for applications deployed on cloud.gov. When vulnerabilities in a software stack are identified, we can re-deploy applications that use it on a clean and updated baseline. This happens independently of the application team’s availability, as often as needed, and without downtime.

## 2. Compliance with federal requirements

cloud.gov has a [Provisional Authority to Operate (P-ATO) at the Moderate impact level from the FedRAMP Joint Authorization Board (JAB)]({{ site.baseurl }}{% link _docs/overview/fedramp-tracker.md %}). When you deploy a system on cloud.gov, you can [leverage this P-ATO](https://www.fedramp.gov/faqs/) as part of your agency ATO.

Every moderate-impact federal IT system is required to account for a baseline of at least [261 security controls](https://nvd.nist.gov/800-53/Rev4/impact/moderate) (your agency may have additional controls) before it can be granted an ATO. As part of the compliance work that is baked into the cloud.gov platform, as many as 60 percent of these controls can be inherited for your system's ATO. Ultimately, your agency Authorizing Official is responsible for determining which controls apply to your IT system, and which may be inherited from the underlying platform. However, the option of inheriting security controls already covered by the cloud.gov P-ATO can dramatically shorten the time and effort required to obtain an ATO for your system.

## 3. Usability

A Platform as a Service (PaaS) like cloud.gov can save you the resources of managing your own cloud deployments, but it has to work the way you need it to work. cloud.gov was built inside a government development environment by government developers. We face similar security and compliance requirements to the ones that other government teams do, and our coworkers on other teams deploy their applications on cloud.gov. We know first-hand that it works for government teams.

The cloud.gov UI delivers the main concepts of the Cloud Foundry project in a straightforward form. Cloud Foundry provides a good API and tools for teams to manage all the environments, services, and applications necessary to deliver an app to production with minimal hassle. Cloud Foundry also provides well-designed tenancy controls. They make it easy to manage both who can access what, and how usage will be billed back to specific projects or agencies.

The cloud.gov deployment is [publicly documented in GitHub]({{ site.baseurl }}{% link _docs/ops/repos.md %}). We encourage other agencies and the general public to contribute. Anyone is also free to take our work to deploy their own Platform as a Service.
