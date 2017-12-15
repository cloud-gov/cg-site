---
menu:
  docs:
    parent: compliance
title: ATO process
---

This is an outline of a typical ATO process for a cloud.gov customer application. All agencies handle the ATO process in their own way, so you should talk with your agency's security compliance specialists, but this can give you a broad overview.

## What's a FedRAMP Provisional ATO?

cloud.gov has a FedRAMP Authorization. In precise terms, it is a Provisional Authority to Operate (P-ATO) at the Moderate impact level from the FedRAMP Joint Authorization Board (JAB).

It's normal and expected that this is a **Provisional** ATO. The JAB does not have the authority to issue an ATO for a system at your agency. Only your own agency has the authority to issue ATOs for systems that your agency uses or operates.

So instead, the JAB issues a *pre-authorization* that your agency can review, including an audited documentation package and Continuous Monitoring program. If your agency finds that the cloud.gov P-ATO meets their requirements, they can issue an ATO for cloud.gov at the agency. This usually looks like this: [template agency ATO letter (.docx)](https://s3.amazonaws.com/sitesusa/wp-content/uploads/sites/482/2017/03/FedRAMP-ATO-Letter-Template-v1.0.docx).

## How customer application ATOs work

### Customer ATO that inherits from cloud.gov ATO (ideal)

Here's what this can look like for the first application to use cloud.gov at an agency. In this diagram, AOs stands for Authorizing Officials -- people who can ATO a system.

{{< diagrams id-prefix="Figure-1." >}}
graph TD
CONCEPT(Concept for the first app on cloud.gov at your agency) -->START(1. Discuss with your AOs and get approval to start)
START -->| | DEV(3. Work on app and start app ATO process)
START -->| | REVIEW(2. AOs review cloud.gov P-ATO)
REVIEW -->|AOs approve| CATO(2. AOs issue cloud.gov ATO)
DEV -->|Can't take next step until AOs issue cloud.gov ATO| APPATO(4. AOs issue app ATO that inherits from cloud.gov ATO)
APPATO -->| | PRO(Put app in production)
{{< /diagrams >}}

You can usually start step 3 (working on your app and preparing your ATO materials) before step 2 (cloud.gov ATO) is complete, but this depends on your AOs -- ask them!

Steps in more detail:

1. Early in your process, talk to your AOs and explain your plans so that you get on the right track to ATO.
1. AOs review the cloud.gov P-ATO and issue an ATO for cloud.gov itself.
  * While they're working on this, you may be able to start working on your app and preparing your ATO materials, but this depends on your AOs -- ask them! 
1. Prepare your application and your application ATO materials.
  * Your System Security Plan should document that your system inherits some controls (partially or fully) from the cloud.gov ATO, as well as documenting the controls handled by your application.
1. Your agency reviews your application and ATO materials, and your agency issues a *new* ATO just for your application.
1. If somebody else at your agency wants to run an application on cloud.gov, they can repeat steps 3 and 4. The agency issues a new ATO just for that application.

This means that the cloud.gov ATO is easy to reuse at your agency!

Here's what the second app ATO process can look like:

{{< diagrams id-prefix="Figure-2." >}}

graph TD
CONCEPT(Concept for second app  on cloud.gov at your agency) -->START(Discuss with your AOs and get approval to start)
START -->| | DEV(Work on app and start app ATO process)
DEV -->| | APPATO(AOs issue app ATO that inherits from cloud.gov ATO)
APPATO -->| | PRO(Put app in production)

{{< /diagrams >}}

### Consolidated ATO

If your agency prefers, they can issue a consolidated ATO.

Steps:

1. Your agency reviews the cloud.gov P-ATO materials *and* your customer application ATO materials together.
  * Your System Security Plan should document that your system inherits some controls (partially or fully) from the cloud.gov P-ATO, as well as documenting the controls handled by your application.
1. Your agency issues an ATO for your application running on cloud.gov.

This does not result in an ATO for cloud.gov in general at your agency, so if another team at your agency wants to run an application on cloud.gov, your agency may need to redo some ATO work.
