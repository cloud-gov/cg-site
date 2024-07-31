---
parent: overview
layout: docs
sidenav: true
title: FedRAMP Authorized
weight: 0
redirect_from:
  - /docs/intro/security/fedramp-tracker
  - /docs/security/fedramp-tracker
  - /intro/security/fedramp-tracker
  - /overview/security/fedramp-tracker
  - /docs/apps/govcloud
  - /compliance/
---


cloud.gov has a [Provisional Authority to Operate (P-ATO) at the Moderate impact level from the FedRAMP Joint Authorization Board (JAB)](https://marketplace.fedramp.gov/#!/product/18f-cloudgov). This means cloud.gov has undergone a significant, thorough security and compliance review so that your agency can focus on reviewing the parts of the system that serve your mission more directly.

## What is a P-ATO?

The **[Federal Risk and Authorization Management Program (FedRAMP)](https://www.fedramp.gov/)** evaluates cloud services and issues a **Provisional Authority to Operate (P-ATO)** to those that pass review. Those come in two flavors: [Agency](https://www.fedramp.gov/agency-authorization/) and [JAB](https://www.fedramp.gov/jab-authorization/). Both authorizations look at a standardized set of FISMA and NIST requirements and both can be used by other agencies in their ATO process. The difference is, when the **Joint Authorization Board (JAB)** is convened, it's to review a cloud service that is and should be used throughout the government. The members of the JAB are the CIOs of the General Services Administration, Department of Defense, and Department of Homeland Security. They issue [a P-ATO for cloud services that pass their review and to be used to run systems holding any kind of government data at specific levels](https://marketplace.fedramp.gov/#!/products?status=Compliant&sort=productName&authorizationType=JAB). cloud.gov has an **authorization at the moderate level** which means it is a vetted and trustable service for data where [the impact of loss is limited or serious — but not catastrophic](http://csrc.nist.gov/publications/fips/fips199/FIPS-PUB-199-final.pdf#page=6).

Once that P-ATO is granted, FedRAMP requires cloud.gov to undergo re-assessment every year and maintain continuous monitoring. This gives your agency ongoing assurance that cloud.gov is compliant.

*For DoD teams:* the Defense Information Systems Agency (DISA) has issued a DoD Provisional Authorization for cloud.gov at DISA impact level two. Some points to bear in mind:

* The FedRAMP package (see below) includes the DISA Provisional Authorization (PA) letter for your reference.
* Per the PA and the [DoD Cloud Computing SRG](https://public.cyber.mil/dccs/), the artifacts available to an Authorizing Official (AO) are those included in the FedRAMP-approved package. See [Figure 5-2, "DoD Continuous Monitoring for CSOs with a FedRAMP JAB PA"](https://dl.dod.cyber.mil/wp-content/uploads/cloud/zip/U_Cloud_Computing_SRG_V1R4.zip) in the Cloud Computing SRG for a useful illustration to that effect.
* To meet the intent of OMB and DoD policies that cloud authorization follow a "do once, use many times" framework, cloud.gov will not provide artifacts that are already encompassed by the FedRAMP authorization and continuous monitoring program.

## How you can use this P-ATO

Your agency still needs to grant your system an Authority to Operate, but FedRAMP has done the labor-intensive work of reviewing cloud.gov's security posture and endorsed it, which reduces the compliance work you need to do. Your agency's authorizing official can request the P-ATO documentation package from FedRAMP and accept that endorsement for your own system. See [ATO process]({{ site.baseurl }}{% link _docs/compliance/ato-process.md %}) for the typical workflow.

Here's how it works: Every moderate-impact federal system is required to account for a baseline of at least 261 controls (your agency may have additional controls) before it can be granted an ATO. The cloud.gov platform provides you with 155 fully or partially inheritable controls. Once cloud.gov's P-ATO is reviewed and accepted, many of those requirements are already implemented and documented. Responsibility for most of the remaining requirements are shared between cloud.gov and your application, and only a limited number are fully yours.

Here's an example of a control breakdown for a simple moderate-impact system hosted on cloud.gov:

!["Graphic showing the breakdown of how many controls are fully covered by cloud.gov."]({{site.baseurl}}/assets/images/content/fedramp-moderate-controls-new.png)

### Control Implementation Summary (CIS) + Customer Responsibility Matrix (CRM):

We publish two CIS/CRM documents, one for the Paas/Platform service and one for the Pages service:

#### Cloud.gov Platform

* [cloud.gov PaaS CIS Worksheet]({{ site.baseurl }}/resources/cloud.gov-CIS-Worksheet.xlsx) summarizes each Low and Moderate security control and whether it is handled by cloud.gov (inheritable), a shared responsibility, or a customer responsibility. It includes guidance on which controls a customer on the Platform can fully or partially inherit from cloud.gov.
  * Last Update: 2023-03-17 - Updated front matter

#### Cloud.gov Pages

* The updated CIS/CRM documents using FedRAMP rev5 templates has been uploaded to [connect.gov](https://www.connect.gov/). To download the documents, please complete the FedRAMP Package Access Request Form and follow your agency’s access approval process.
  * Updated: 2024-07-30 - Updated language to use new process for obtaining documentation through connect.gov
  * Updated: 2024-04-09
    * Updated the date of change to the CIS/CRM.
    * The CIS/CRM has been updated and revised using the latest FedRAMP rev5 template including Low and
Moderate controls. The CRM focuses on the consideration of cloud.gov Pages static website customers.
  * Updated: 2022-11-15 - First published CIS/CRM for cloud.gov Pages

## Start the ATO process

If you want to authorize cloud.gov, [**request the P-ATO documentation package from FedRAMP**](https://www.fedramp.gov/assets/resources/documents/Agency_Package_Request_Form.pdf) (the Package ID for that form is F1607067912). GSA customers can use the [DocuSign Template](https://app.docusign.com/templates?view=shared) for a "FedRAMP Package Access Request". You can also view the [FedRAMP Marketplace page for cloud.gov](https://marketplace.fedramp.gov/#/product/18f-cloudgov?sort=productName).
