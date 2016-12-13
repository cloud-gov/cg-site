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

## 1. Usability

cloud.gov is built on the public [Cloud Foundry project](http://www.cloudfoundry.org/). Cloud Foundry provides a good API and tools for teams to manage all the environments, services, and applications necessary to deliver an app to production with minimal hassle. Cloud Foundry also provides well-designed tenancy controls. They make it easy to manage both who can access what, and how usage will be billed back to specific projects or agencies.

cloud.gov has its own user interface that exposes the main Cloud Foundry concepts in a straightforward form. And over time, the cloud.gov team improves that interface based on direct feedback from users.

## 2. Security

Cloud Foundry’s “stemcell” capability allows cloud.gov to deploy all apps on a [hardened](https://github.com/18F/cg-harden-boshrelease) operating system image that is tightly audited for compliance with federal standards. The cloud.gov team can centrally scan and audit the platform itself, as well as applications running on it. We are continually improving the security of the platform, which in turn centrally improves the security of your products that are running on the platform.

The cloud.gov deployment is [publicly documented in GitHub]({{< relref "docs/ops/repos.md" >}}). We encourage other agencies and the general public to contribute. Anyone is also free to take our work to deploy their own platform-as-a-service, though we think working together on a single PaaS deployment will produce the greatest economy of scale in operations and security.

## 3. Conformity with federal rules
The traditional agency process to show compliance with FISMA and to gain Authority to Operate (ATO) requires the agency to create a long, largely copy-pasted document enumerating the full design of the system. This is a significant burden both to write and to audit.

Rather than leaving agency product teams to that approach, the cloud.gov team documents all NIST controls in the cloud.gov PaaS, infrastructure, and human layers. We manage this documentation in a software-friendly way that lets us “render” out different documents for different contexts: human-readable, gap analysis, spreadsheet matrix, web page visualization, etc. When you deploy a product in cloud.gov, you can build your documentation on these “parts-included” descriptions. You need to supply only the information about what your product adds on top of the PaaS. See our video, [“Handling FISMA Faster and Better”](https://www.youtube.com/watch?v=T1S52B1-NT4), for an overview.

The tools and formats that enable this may also be applicable outside the cloud.gov context. For more information or to contribute, please see the [Compliance Masonry repository](https://github.com/opencontrol/compliance-masonry).

Our goal for the future is to generate monitoring dashboards and continuous audits based on the supplied information. This will dramatically reduce the costs of auditing a site and ensuring it remains in compliance, while improving security across the board.
