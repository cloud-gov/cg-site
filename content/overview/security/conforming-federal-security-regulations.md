---
menu:
  overview:
    parent: technology
title: Helping apps conform to regs
weight: 20
aliases:
  - /docs/intro/security/conforming-federal-security-regulations
  - /intro/security/conforming-federal-security-regulations
  - /overview/security/conforming-federal-security-regulations/
---

## A single control layer for your applications

The underlying infrastructure of cloud.gov is a FedRAMP-approved (and therefore, FISMA-approved) use of Amazon Web Services (AWS). There are many controls at the AWS level necessary to comply with FedRAMP and agency security rules. Each new system deployed on AWS without a Platform as a Service opens up the possibility of a flaw. Checking all of those controls for each system also takes significant time that would be better spent on net-new security engineering.

The cloud.gov PaaS provides fundamental technological assurances that each new system cannot alter or change our desired AWS configuration. Enforcing this single control layer across all systems takes significantly less effort overall. Instead, teams spend more time focusing on the web facing portion of a system, which is most often the source of attacks anyway.

## Helping system developers reduce effort needed to gain ATO

cloud.gov has received a FedRAMP JAB P-ATO at the Moderate impact level. (Federal systems are categorized as Low, Moderate, or High impact, so this means agencies can easily use cloud.gov to host Low and Moderate systems, which are the majority of federal systems.) When an agency accepts this P-ATO, teams at that agency can leverage the P-ATO for the systems they build.

Because cloud.gov takes care of a substantial number of compliance requirements for federal systems, each new system built on cloud.gov has a radically shortened path to achieving Authority to Operate from their agency.

This huge time saver directly increases the security of customers systems, since it enables teams to spend more time on the most important controls for their own systems.
