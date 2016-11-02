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

The underlying infrastructure of cloud.gov is a FedRAMP-approved (and therefore, FISMA-approved) use of Amazon Web Services (AWS). However, there are many different controls at the AWS level necessary to comply with FedRAMP and agency security rules in general. Each new system deployed on AWS without a platform-as-a-service opens up the possibility of a mistake or a flaw. Checking all of those controls for each system also takes a significant amount of time that would be better spent on net-new security engineering.

With the cloud.gov PaaS, we have fundamental technological assurances that each new system cannot alter or change our desired AWS configuration. This allows us to enforce a single control layer across all systems with significantly less effort. Instead, we spend more time focusing on the web facing  portion of a system, which is most often the source of attacks anyway.

## Helping system developers reduce effort needed to gain ATO

Once a system is deployed on cloud.gov, partner agencies can use our security documentation in a machine-readable format. Since GSA is the same organization running the FedRAMP program, there should be a high level of trust that we have implemented the controls we say we’ve implemented. That said, the code of all of our systems is open-source, so agencies can directly inspect what we’ve done.

After an agency has accepted the controls implemented on the IaaS and PaaS layers, they can focus their attention where it matters most: on the application itself. We have a list of roughly 24 NIST recommended controls that should always be evaluated when creating a web system. This is a huge time-saver, and will directly increase the security of an system since more time will be spent on the most important controls.

We’re not going to stop there though - we will have trusted non-governmental third-parties evaluate our work as well. Updates on that process will be forthcoming.

## Building up cloud.gov’s conformity with federal regulations

cloud.gov is built on AWS, a FedRAMP-compliant IaaS. The actual machine image we deploy onto AWS is based on the one from [the FISMA-Ready project](https://github.com/fisma-ready), which 18F participates in. That project generates STIG-like hardened configurations of open source software.

We are further hardening the machine image based on things we identified in taking cloud.gov through the ATO process at GSA. Currently cloud.gov is in the Lightweight Authority to Operate (LATO) stage at GSA, and we will be progressing from there to full ATO.

While cloud.gov is not yet FedRAMP-compliant, all our activity is aimed at getting it there. We are now engaged in the evaluation process with FedRAMP and you can [track our progress live]({{< relref "overview/security/fedramp-tracker.md" >}}).
