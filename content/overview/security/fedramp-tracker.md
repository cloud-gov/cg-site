---
menu:
  overview:
    parent: overview
title: FedRAMP Authorized
weight: 5
aliases:
  - /docs/intro/security/fedramp-tracker
  - /intro/security/fedramp-tracker
  - /overview/security/fedramp-tracker
---


cloud.gov has a [Provisional Authority to Operate (P-ATO) at the Moderate impact level from the FedRAMP Joint Authorization Board (JAB)](https://marketplace.fedramp.gov/#/product/18f-cloudgov).

## How this P-ATO helps your team

This P-ATO represents a comprehensive security and compliance assessment that enables federal agencies to start using cloud.gov with significantly reduced effort.

Historically each agency would have to conduct their own in-depth assessment of cloud.gov’s security and compliance before allowing their teams to use it. This means the federal government would need to do redundant labor-intensive work.

[FedRAMP (Federal Risk and Authorization Management Program)](https://www.fedramp.gov/) solves that problem. It coordinates a [Joint Authorization Board (JAB)](https://www.gsa.gov/portal/content/134223) made up of the three Chief Information Officers of DoD, DHS, and GSA. These CIOs and their teams assessed cloud.gov using rigorous standards for security and compliance, and because cloud.gov met the requirements, they endorsed this P-ATO. This means other agencies don't have to repeat their in-depth assessment.

## How you can use this

Any federal agency can [use the cloud.gov P-ATO](https://www.fedramp.gov/resources/faqs/how-does-an-agency-leverage-a-fedramp-authorization/) as part of the ATO for an agency system built on cloud.gov, which substantially reduces the effort required to give that system an ATO. If you're interested in this, you can [**request the P-ATO documentation package from FedRAMP**](https://s3.amazonaws.com/sitesusa/wp-content/uploads/sites/482/2015/03/FedRAMP-Package-Request-Form_V4_06192014.pdf) (the Package ID for that form is F1607067912). You can also view the [FedRAMP Marketplace page for cloud.gov](https://marketplace.fedramp.gov/#/product/18f-cloudgov?sort=productName).

For a quick summary, you can download the [**Control Implementation Summary + Customer Responsibility Matrix (.xlsx)**](/resources/cloud.gov-CIS-Worksheet.xlsx), which lists whether each Low and Moderate security control is handled by cloud.gov, shared responsibility, or customer responsibility.

The majority of federal systems are at the [Low and Moderate impact levels](http://csrc.nist.gov/publications/fips/fips199/FIPS-PUB-199-final.pdf#page=6), which can be hosted on cloud.gov. [cloud.gov can’t yet host High impact systems.]({{< relref "overview/security/fisma-high-applications.md" >}})

FedRAMP requires cloud.gov to maintain continuous monitoring and undergo annual re-assessment to retain the P-ATO, which gives your agency ongoing assurance that cloud.gov is compliant.

## Sharing our work for reuse

We plan to publish much of the documentation from our P-ATO package, as part of our open source system documentation, after we add context for public release.

As a government team with a mission to support agency efforts to improve the way they deliver services to the public, we want our compliance documentation to be available as a model that helps additional Platform as a Service providers (including commercial providers) write the documentation they need to achieve FedRAMP JAB P-ATO as well.
