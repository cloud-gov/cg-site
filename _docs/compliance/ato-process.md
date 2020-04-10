---
parent: compliance
layout: docs
sidenav: true
title: ATO process
---

This is an outline of a typical ATO process for a cloud.gov customer system. All agencies handle the ATO process in their own way, so you should talk with your agency's security compliance specialists, but this can give you a broad overview.

## What's a FedRAMP Provisional ATO?

[cloud.gov has a FedRAMP Authorization.](https://marketplace.fedramp.gov/#/product/18f-cloudgov?sort=productName) In precise terms, it is a Provisional Authority to Operate (P-ATO) at the Moderate impact level from the FedRAMP Joint Authorization Board (JAB).

It's normal and expected that this is a **"Provisional"** ATO. The JAB does not have the authority to issue an ATO for a system at your agency. Only your own agency has the authority to issue ATOs for systems that your agency uses or operates.

So instead, the JAB issues a *pre-authorization* that your agency can review, including [an audited documentation package]({{ site.baseurl }}{% link _docs/overview/fedramp-tracker.md %}). Any federal employee or contractor can access the package using [this FedRAMP form](https://www.fedramp.gov/assets/resources/documents/Agency_Package_Request_Form.pdf) (Package ID F1607067912). If your agency finds that the cloud.gov P-ATO meets their requirements, they can issue an ATO for cloud.gov. [Here's a template agency ATO letter (.docx).](https://s3.amazonaws.com/sitesusa/wp-content/uploads/sites/482/2017/03/FedRAMP-ATO-Letter-Template-v1.0.docx)

## How customer system ATOs work

First, a quick definition: a customer "system" is typically an [org](http://docs.cloudfoundry.org/concepts/roles.html#orgs) that contains [spaces](http://docs.cloudfoundry.org/concepts/roles.html#spaces) (such as staging and production spaces), applications, and service instances that serve together as sub-components of the system. The exact definition and boundary of "system" is up to your agency.

### Customer ATO that inherits from cloud.gov ATO (ideal)

Here's what this can look like for the first system to use cloud.gov at an agency. In this diagram, AOs stands for Authorizing Officials -- people who can ATO a system.

{% mermaid_diagram  id-prefix="Figure-1." %}
graph TD
CONCEPT(Concept for the first system on cloud.gov at your agency) --> START(1. Talk to AOs about plan to establish system on cloud.gov)
START -.1.5. If allowed, start work on system.-> DEV
REVIEW --AOs disapprove-->  STOP(Stop*)
START --AOs request FedRAMP package--> REVIEW(2. AOs review cloud.gov P-ATO)
REVIEW --AOs approve-->  CATO(3. AOs issue cloud.gov ATO)
CATO --> DEV(4. Work on your system and compliance materials inheriting from cloud.gov) 
DEV -->REQUESTATO(5. Ask AOs to start your ATO review)
REQUESTATO --AOs review system and compliance materials--> APPATO(6. AOs issue system ATO )
APPATO -->PROD(Put your system in production)
{% endmermaid_diagram %}

Steps in more detail:

1. Early in your process, talk to your AOs and explain your plans so that you get on the right track to ATO.
  * 1.5. You may be able to start working on your system and preparing your ATO materials -- ask your AOs.
1. AOs request the cloud.gov FedRAMP P-ATO package and review the materials.
  * *`*` If your AOs have concerns, [contact us]({{ site.baseurl }}/docs/help/) -- we can help, and the [FedRAMP program team](https://www.fedramp.gov/) can help too.*
1. AOs issue an ATO for cloud.gov itself.
1. Develop (or migrate) your system and put together your compliance materials.
  * Your System Security Plan should document that your system inherits some controls (partially or fully) from the cloud.gov ATO, as well as documenting the controls handled by your system.
1. Your agency reviews your system and ATO materials.
1. Your agency issues a *new* ATO just for your system.

Then if somebody else at your agency wants to run a system on cloud.gov, the cloud.gov ATO is easy to reuse! They don't have to repeat steps 2 and 3 to review the cloud.gov P-ATO.

Here's what the second system ATO process can look like:

{% mermaid_diagram id-prefix="Figure-2." %}

graph TD
CONCEPT(Concept for second system on cloud.gov at your agency) -->START(Talk to AOs about plan to establish system on cloud.gov)
START -->| | DEV(Work on system and compliance materials inheriting from cloud.gov)
DEV -->REQUESTATO(Ask AOs to start your ATO review)
REQUESTATO --AOs review system and compliance materials--> APPATO(AOs issue system ATO )
APPATO -->PROD(Put system in production)

{% endmermaid_diagram %}

### Consolidated ATO

If your agency prefers, they can issue a consolidated ATO.

Steps:

1. Your agency reviews the cloud.gov P-ATO materials *and* your customer system ATO materials together.
  * Your System Security Plan should document that your system inherits some controls (partially or fully) from the cloud.gov P-ATO, as well as documenting the controls handled by your system.
1. Your agency issues an ATO for your system running on cloud.gov.

This does not result in an ATO for cloud.gov in general at your agency, so if another team at your agency wants to run a system on cloud.gov, your agency may need to redo some ATO work.
