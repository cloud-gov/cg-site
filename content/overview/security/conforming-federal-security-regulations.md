---
menu:
  overview:
    parent: security
title: Helping apps conform to regs
weight: 20
aliases:
  - /docs/intro/security/conforming-federal-security-regulations
  - /intro/security/conforming-federal-security-regulations
---

## A single control layer for your applications

The underlying infrastructure of cloud.gov is a FedRAMP-approved (and therefore, FISMA-approved) use of Amazon Web Services (AWS). There are many controls at the AWS level necessary to comply with FedRAMP and agency security rules. Each new system deployed on AWS without a Platform as a Service opens up the possibility of a flaw. Checking all of those controls for each system also takes significant time that would be better spent on net-new security engineering.

The cloud.gov PaaS provides fundamental technological assurances that each new system cannot alter or change our desired AWS configuration. Enforcing this single control layer across all systems takes significantly less effort overall. Instead, teams spend more time focusing on the web facing portion of a system, which is most often the source of attacks anyway.

## Helping system developers reduce effort needed to gain ATO

Once a system is deployed on cloud.gov, partner agencies can use the cloud.gov security documentation in a machine-readable format. GSA runs the FedRAMP program and owns cloud.gov, so there should be a high level of trust that the controls are implemented. That said, the code of all of our systems is open-source, so agencies can directly inspect what we’ve done.

After an agency has accepted the controls implemented on the IaaS and PaaS layers, they can focus their attention on the product itself they are deploying. The cloud.gov team has a list of roughly 24 NIST-recommended controls that you should always evaluate when creating a web system. This huge time saver directly increases the security of a system, since it leads teams to spend more time on the most important controls.

cloud.gov doesn’t stop there, though. An accredited Third Party Assessment Organization (3PAO) also evaluates the platform as part of the FedRAMP P-ATO authorization process.

## Building up cloud.gov’s conformity with federal regulations

cloud.gov is built on AWS, a FedRAMP-compliant IaaS. The actual machine image deployed onto AWS is based on the one from [the FISMA-Ready project](https://github.com/fisma-ready), a project that generates STIG-like hardened configurations of open source software. 18F, the organization that manages cloud.gov, is an active participant in that project.

We are further hardening the machine image based on things identified as cloud.gov has gone through the ATO process at GSA. Currently cloud.gov is in the Lightweight Authority to Operate (LATO) stage at GSA, and it is progressing from there to full ATO.

cloud.gov is not yet FedRAMP-compliant, but all our activity is aimed at getting it there. The team is now engaging in the evaluation process with FedRAMP and you can [track our progress live]({{< relref "overview/security/fedramp-tracker.md" >}}).
