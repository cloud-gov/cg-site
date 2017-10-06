---
menu:
  overview:
    parent: overview
title: FedRAMP Authorized
weight: 0
aliases:
  - /docs/intro/security/fedramp-tracker
  - /intro/security/fedramp-tracker
  - /overview/security/fedramp-tracker
  - /docs/apps/govcloud
---


cloud.gov has a [Provisional Authority to Operate (P-ATO) at the Moderate impact level from the FedRAMP Joint Authorization Board (JAB)](https://marketplace.fedramp.gov/#/product/18f-cloudgov). This means cloud.gov has undergone a significant, thorough security and compliance review so that your agency doesn't have to.

## What is a P-ATO?

A P-ATO is the result of thorough evaluation against a standardized set of requirements for governmentwide cloud services carried out by a trio of CIOs from the General Services Administration, Department of Defense, and Department of Homeland Security — a group known as [the Joint Authorization Board (JAB)](https://www.fedramp.gov/jab-or-agency-how-do-i-get-a-fedramp-ato/). A P-ATO is issued to cloud services that pass the JAB's review for a specific impact level. Authorization at the moderate levels which means if your system contains data that would have limited or serious — but not catastrophic — impact if breached, you can use cloud.gov.

Compared with an "agency authorization" from FedRAMP, [products with JAB P-ATOs](https://marketplace.fedramp.gov/#/products?status=Compliant&sort=productName&authorizationType=JAB) are "fit for federal data" at a specific impact levels, regardless of the agency. All of these are managed by the Federal Risk and Authorization Management Program (FedRAMP), which coordinates the details of reviewing cloud services.

With a P-ATO, your agency's authorizing official can request the documentation reviewed by the JAB and accept it for your own system rather than doing their own evaluation of cloud.gov. This saves your agency hours of redundant and labor-intensive work reviewing the details of cloud.gov; time that can now be spent reviewing the pieces of the system you'll develop and control. 

For DoD teams: the Defense Information Systems Agency (DISA) categorizes [FedRAMP Moderate as equivalent to DISA impact level two](http://iasecontent.disa.mil/cloud/SRG/#3INFORMATIONSECURITYOBJECTIVES/IMPACTLEVELS), and they have issued a DoD Provisional Authorization for cloud.gov at DISA impact level two.

## How you can use this P-ATO

For a "moderate" level system, there are 325 controls your agency will use to evaluate your system. Of those, 

If you want to use cloud.gov, [**request the P-ATO documentation package from FedRAMP**](https://s3.amazonaws.com/sitesusa/wp-content/uploads/sites/482/2015/03/FedRAMP-Package-Request-Form_V4_06192014.pdf) (the Package ID for that form is F1607067912). You can also view the [FedRAMP Marketplace page for cloud.gov](https://marketplace.fedramp.gov/#/product/18f-cloudgov?sort=productName).

For a quick summary, you can download the [**Control Implementation Summary + Customer Responsibility Matrix (.xlsx)**](/resources/cloud.gov-CIS-Worksheet.xlsx), which lists whether each Low and Moderate security control is handled by cloud.gov, shared responsibility, or customer responsibility.

The majority of federal systems are at the [Low and Moderate impact levels](http://csrc.nist.gov/publications/fips/fips199/FIPS-PUB-199-final.pdf#page=6), which can be hosted on cloud.gov. [cloud.gov can’t yet host High impact systems.]({{< relref "overview/security/fisma-high-applications.md" >}})

FedRAMP requires cloud.gov to maintain continuous monitoring and undergo annual re-assessment to retain the P-ATO, which gives your agency ongoing assurance that cloud.gov is compliant.

## Sharing our work for reuse

We plan to publish much of the documentation from our P-ATO package, as part of our open source system documentation, after we add context for public release.

As a government team with a mission to support agency efforts to improve the way they deliver services to the public, we want our compliance documentation to be available as a model that helps additional Platform as a Service providers (including commercial providers) write the documentation they need to achieve FedRAMP JAB P-ATO as well.
