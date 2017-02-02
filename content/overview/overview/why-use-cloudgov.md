---
menu:
  overview:
    parent: overview
title: Why agencies should use it
weight: 31
aliases:
  - /docs/intro/overview/why-use-cloudgov
  - /intro/overview/why-use-cloudgov
---

## 1. Security

cloud.gov is built on the public [Cloud Foundry project](http://www.cloudfoundry.org/). Cloud Foundry’s “stemcell” capability allows cloud.gov to deploy all apps on a [hardened](https://github.com/18F/cg-harden-boshrelease) operating system image that is tightly audited for compliance with federal standards. We are continually improving the security of the platform, which in turn centrally improves the security of your products that are running on the platform.

## 2. Conformity with federal rules

We are documenting all NIST controls that exist in the PaaS, infrastructure, and human layers that implement cloud.gov. And we are doing this in a software-friendly way that lets us “render” out different documents for different contexts: human-readable, gap analysis, spreadsheet matrix, web page visualization, etc.

Typically, agencies show compliance with FISMA and gain Authority to Operate (ATO) by creating a lengthy, largely copy-pasted document enumerating the full design of the system. When you deploy an app on cloud.gov, you can use our “parts-included” descriptions in building your own documentation. You need to supply only the information about what your product adds on top of the PaaS. See our video, [“Handling FISMA Faster and Better”](https://www.youtube.com/watch?v=T1S52B1-NT4), for an overview.

The tools and formats we are developing to enable this are applicable outside the cloud.gov context. We have seen other agencies interested in contributing, even when they are not interested in cloud.gov. For more information, please see the [Compliance Masonry repository](https://github.com/opencontrol/compliance-masonry).

Our goal for the future is to generate monitoring dashboards and continuous audits based on the supplied information. This will dramatically reduce the costs of auditing a site and ensuring it remains in compliance, while improving security across the board.

## 3. Usability

A PaaS can save you the resources of managing your own cloud deployments, but it has to work the way you need it to work. cloud.gov was built inside a government development environment by government developers. The cloud.gov team has the same security and compliance requirements that other government teams do, and our coworkers on other teams deploy their applications on cloud.gov. We know first-hand that it works for government teams.

The cloud.gov UI delivers the main concepts of the Cloud Foundry project in a straightforward form. Cloud Foundry provides a good API and tools for teams to manage all the environments, services, and applications necessary to deliver an app to production with minimal hassle. Cloud Foundry also provides well-designed tenancy controls. They make it easy to manage both who can access what, and how usage will be billed back to specific projects or agencies.

The cloud.gov deployment is [publicly documented in GitHub]({{< relref "docs/ops/repos.md" >}}). We encourage other agencies and the general public to contribute. Anyone is also free to take our work to deploy their own platform-as-a-service, though we think working together on a single PaaS deployment will produce the greatest economy of scale in operations and security.
