---
menu:
  docs:
    parent: overview
title: FedRAMP Authorized
weight: 0
aliases:
  - /docs/intro/security/fedramp-tracker
  - /intro/security/fedramp-tracker
  - /overview/security/fedramp-tracker
  - /docs/apps/govcloud
  - /compliance/
---


cloud.gov has a [Provisional Authority to Operate (P-ATO) at the Moderate impact level from the FedRAMP Joint Authorization Board (JAB)](https://marketplace.fedramp.gov/#/product/18f-cloudgov). This means cloud.gov has undergone a significant, thorough security and compliance review so that your agency can focus on reviewing the parts of the system that serve your mission more directly.

## What is a P-ATO?

The **[Federal Risk and Authorization Management Program (FedRAMP)](https://www.fedramp.gov/)** evaluates cloud services and issues a **Provisional Authority to Operate (P-ATO)** to those that pass review. Those come in two flavors: Agency and JAB. Both authorizations [look at a standardized set of FISMA and NIST requirements](https://www.fedramp.gov/jab-or-agency-how-do-i-get-a-fedramp-ato/) and both can be used by other agencies in their ATO process. The difference is, when the **Joint Authorization Board (JAB)** is convened, it's to review a cloud service that is and should be used throughout the government. The members of the JAB are the CIOs of the General Services Administration, Department of Defense, and Department of Homeland Security. They issue [a P-ATO for cloud services that pass their review and to be used to run systems holding any kind of government data at specific levels](https://marketplace.fedramp.gov/#/products?status=Compliant&sort=productName&authorizationType=JAB). cloud.gov has an **authorization at the moderate level** which means it is a vetted and trustable service for data where [the impact of loss is limited or serious — but not catastrophic](http://csrc.nist.gov/publications/fips/fips199/FIPS-PUB-199-final.pdf#page=6).

Once that P-ATO is granted, FedRAMP requires cloud.gov to undergo re-assessment every year and maintain continuous monitoring. This gives your agency ongoing assurance that cloud.gov is compliant.

For DoD teams: the Defense Information Systems Agency (DISA) categorizes [FedRAMP Moderate as equivalent to DISA impact level two](http://iasecontent.disa.mil/cloud/SRG/#3INFORMATIONSECURITYOBJECTIVES/IMPACTLEVELS), and they have issued a DoD Provisional Authorization for cloud.gov at DISA impact level two.

## How you can use this P-ATO

Your agency still needs to grant your system an Authority to Operate, but FedRAMP has done the labor-intensive work of reviewing cloud.gov's security posture and endorsed it, which reduces the compliance work you need to do. Your agency's authorizing official can request the P-ATO documentation package from FedRAMP and accept that endorsement for your own system. See [ATO process]({{< relref "docs/compliance/ato-process.md" >}}) for the typical workflow.

Here's how it works: Every "moderate" impact federal system is required to account for a baseline of about 325 controls before it can be granted an ATO. Once cloud.gov's P-ATO is reviewed and accepted, many of those requirements are already implemented and documented. Of the remaining requirements, responsibility for most of the rest are shared between cloud.gov and your application, and only some of them are fully yours.

Here's an example of a control breakdown for a simple moderate-impact system hosted on cloud.gov:

![Graph showing the breakdown of how many controls are fully covered by cloud.gov.](/img/fedramp-moderate-controls.png)

The [**Control Implementation Summary + Customer Responsibility Matrix + Control-by-Control Inheritance (.xlsx)**](/resources/cloud.gov-CIS-Worksheet.xlsx) (last updated November 7, 2018) is a summary of each Low and Moderate security control and whether it is handled by cloud.gov, shared responsibility, or customer responsibility. It includes guidance on which controls a customer system can fully or partially inherit from cloud.gov.

## Start the ATO process

If you want to use cloud.gov, [**request the P-ATO documentation package from FedRAMP**](https://s3.amazonaws.com/sitesusa/wp-content/uploads/sites/482/2015/03/FedRAMP-Package-Request-Form_V4_06192014.pdf) (the Package ID for that form is F1607067912). You can also view the [FedRAMP Marketplace page for cloud.gov](https://marketplace.fedramp.gov/#/product/18f-cloudgov?sort=productName).
