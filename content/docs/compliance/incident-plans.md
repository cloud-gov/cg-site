---
menu:
  docs:
    parent: compliance
title: Contingency/incident plans
---

You are responsible for contingency planning (disaster recovery planning) and security incident response planning for your customer system. Here are suggestions for developing your plans.

Here's the cloud.gov division of responsibility, as described in our [System Security Plan and Control-by-Control Inheritance matrix](/docs/security/fedramp-tracker/#how-you-can-use-this-p-ato):

* cloud.gov is responsible for its own contingency plan and security incident response plan for platform resources, such as issues at the operating system level.
* Each customer Application System Owner is responsible for plans at your customer application level (your code that your team deploys on cloud.gov). Your agency should determine your specific requirements as part of your ATO process.

## Customer contingency plan suggestions
From our Control-by-Control Inheritance matrix:

* CP-2: "The application owner is responsible for developing a contingency plan that addresses the listed items for the application."
* CP-4: "The application owner is responsible for testing the contingency plan for the application."

You can build a brief contingency plan that focuses on communications around the application and management of your application code and data. 

For example, consider writing down which roles on your team are subscribed to [cloud.gov status updates](https://cloudgov.statuspage.io) (such as Application System Owner and Product Manager), and link to parts of the cloud.gov documentation that give instructions for re-deploying your application or restoring data backups. If your agency doesn't provide a template, NIST provides templates, and feel free to adapt [the cloud.gov contingency plan](/docs/ops/contingency-plan/).

Example scenarios for your contingency plan test/exercise:

* You release new code that accidentally corrupts your databases, and you have to take down, fix, and re-deploy your application.
  * You can make this a functional exercise by making a test version of your application in a "dev" space, deleting a database, and practicing recovery.
* cloud.gov has a major customer application outage for three hours due to internal technical problems, so you have to communicate with your management and your users about the outage while waiting for cloud.gov to recover.
* cloud.gov has an outage of an individual service (such as Redis or RDS) for three hours, and it takes out that service for your application (the service simply returns errors), but your code is still working fine.
* Your Inter-Agency Agreement renewal runs into signing delays, so your Period of Performance expires without a new agreement in place. cloud.gov has to suspend your application for two days until the new agreement is fully signed, so your application is showing an error message to its users for two days.

### Functional exercise plan template

<!-- To cloud.gov team: this template is based on this document: https://docs.google.com/document/d/1diCaE4SkJE1QHz8bqy6XFFw-dSxMLHsEkvxvgYKKUwg/edit# -->

If your agency doesn't provide a template, here's a template that you can use, based on [NIST SP 800-84 Sample Functional Exercise Scenario](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-84.pdf) (starting on page B-2): [Word .docx format](/resources/Contingency-plan-exercise-template.docx) or [PDF format](/resources/Contingency-plan-exercise-template.pdf).

## Customer incident response plan suggestions

* IR-3: "The application owner is responsible for testing the incident response for the application."
* IR-4: "Application owners must define events and SLAs for the detection and reporting of suspicious activities. The application owner must have their own procedures and processes in place to respond to all reported incidents."

Along the same lines as the contingency plan, you can build a brief security incident response plan that focuses on communications for your application.

For example, consider writing down who you need to notify at your agency if you have a security incident in your application, and write down which role on your team is responsible for [notifying cloud.gov of the incident and asking cloud.gov for support](/help/). If your agency doesn’t provide a template, NIST provides templates, and feel free to adapt the [cloud.gov incident response plan](/docs/ops/security-ir/).

Example scenarios for your security incident response plan test/exercise:

* Your application has a major security vulnerability that allows somebody to deface the site, and you have to take down, fix, and re-deploy the application. This may be very similar to your usual practices for deploying updates to the application.
* A helpful member of the public emails your agency with a report that your application may have a security vulnerability.
* Your application is getting a suspiciously high amount of traffic that may be a targeted scan of the application for vulnerabilities -- from a curious or malicious member of the public.
  * You can make this a functional exercise by running a load tester and a web vulnerability scanner (such as [OWASP ZAP](https://www.owasp.org/index.php/OWASP_Zed_Attack_Proxy_Project)) in an aggressive mode on a copy of your application in a "dev" space.

