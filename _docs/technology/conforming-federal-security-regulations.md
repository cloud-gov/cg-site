---
parent: technology
layout: docs
sidenav: true
title: How Cloud.gov helps teams comply with requirements
weight: 20
redirect_from:
  - /docs/intro/security/conforming-federal-security-regulations
  - /intro/security/conforming-federal-security-regulations
  - /overview/security/conforming-federal-security-regulations/
---

## A single control layer for your applications

The underlying infrastructure of Cloud.gov is a FedRAMP-approved (and therefore, FISMA-compliant) [use of Amazon Web Services (AWS)]({{ site.baseurl }}{% link _docs/technology/iaas.md %}). There are many controls at the AWS level necessary to comply with FedRAMP and agency security rules. Each new system deployed on AWS without a Platform as a Service (PaaS) opens up the possibility of flaws in the custom implementation and configuration of platform-level software. Checking all of those controls for each system also takes significant time that would be better spent on net-new security engineering.

The Cloud.gov PaaS provides fundamental technological assurances that each new system cannot alter or change our desired AWS configuration. Your team can spend more time focusing on the web-facing portion of your system.

## Helping system developers reduce effort needed to gain ATO

Cloud.gov has received a [FedRAMP JAB P-ATO at the Moderate impact level]({{ site.baseurl }}{% link _docs/overview/fedramp-tracker.md %}). Federal systems are categorized as Low, Moderate, or High impact, so this means agencies can easily use Cloud.gov to host Low and Moderate systems, which are the majority of federal systems. When an agency accepts this P-ATO, teams at that agency can leverage the P-ATO for the systems they build.

Because Cloud.gov takes care of a substantial number of compliance requirements for federal systems, each new system built on Cloud.gov has a radically shortened path to achieving Authority to Operate from their agency.

This huge time-saver directly increases the security of customers systems, since it enables teams to spend more time on the most important controls for their own systems.
