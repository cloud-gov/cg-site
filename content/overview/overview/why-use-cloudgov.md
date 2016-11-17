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

Hosting applications in the cloud does not automatically solve all the infrastructure problems that agencies face. It eliminates a lot of the concerns around managing data centers, but exposes the need for a new cloud operations skillset which is not widely available in government yet.

We are building on the public [Cloud Foundry project](http://www.cloudfoundry.org/). Cloud Foundry provides a good API and tools for teams to manage all the environments, services, and applications necessary to deliver an app to production with minimal hassle. Cloud Foundry also provides well-designed tenancy controls. They make it easy to manage both who can access what, and how usage will be billed back to specific projects or agencies. We’ve developed our own UI that exposes the main Cloud Foundry concepts in a straightforward form. We are improving and expanding that user experience. As with everything 18F does, our changes will be based on how users use the interface.

## 2. Security

By using Cloud Foundry’s “stemcell” capability, we can deploy all apps on a [hardened](https://github.com/18F/cg-harden-boshrelease) operating system image that is tightly audited for compliance with federal standards. We can also centrally scan and audit the platform itself, as well as applications running on it.

The cloud.gov deployment is [publicly documented in GitHub]({{< relref "docs/ops/repos.md" >}}). We will steadily improve it over time, centrally improving the security of all apps running on top of it. We encourage other agencies and even the general public to contribute. They are also free to take our work to make it easier for them to deploy their own platform-as-a-service by following in our footsteps. That said, we think working together on a single PaaS deployment will produce the greatest economy of scale in operations and security.


## 3. Conformity with federal rules
A typical agency process to show compliance with FISMA and to gain Authority to Operate (ATO) requires the agency to create a lengthy, largely copy-pasted document enumerating the full design of the system. This is a significant burden both to write and to audit. Instead of the typical approach, we are documenting all NIST controls that exist in the PaaS, infrastructure, and human layers that implement cloud.gov. And we are doing this in a software-friendly way that lets us “render” out different documents for different contexts: human-readable, gap analysis, spreadsheet matrix, web page visualization, etc. Any app deploying on top of cloud.gov can use these “parts-included” descriptions to make generating their own documentation much easier. They need to supply information only about what their system adds on top of the PaaS. See our video, [“Handling FISMA Faster and Better”](https://www.youtube.com/watch?v=T1S52B1-NT4), for an overview.

The tools and formats we are developing to enable this are applicable outside the cloud.gov context. We have seen other agencies interested in contributing, even when they are not interested in cloud.gov. For more information, please see the [Compliance Masonry repository](https://github.com/opencontrol/compliance-masonry).

Our goal for the future is to generate monitoring dashboards and continuous audits based on the supplied information. This will dramatically reduce the costs of auditing a site and ensuring it remains in compliance, while improving security across the board.
