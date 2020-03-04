---
parent: compliance
layout: docs
sidenav: true
title: Data flow diagrams
---

These diagrams can help you build a System Security Plan for an application, or assess the security and compliance of an application.

## Examples for customer System Security Plans

You can use these realistic sample diagrams as inspiration for your own diagrams for your customer system.

* [Example #1 PDF]({{ site.baseurl }}/assets/img/example-diagram-1.pdf) ([SVG]({{ site.baseurl }}/assets/img/example-diagram-1.svg)) - A frontend website application and a backend API application, connected to a database.
* [Example #2 PDF]({{ site.baseurl }}/assets/img/example-diagram-2.pdf) ([SVG]({{ site.baseurl }}/assets/img/example-diagram-2.svg)) - An application connected to a database and a Redis queue, with authentication, and with a connection to an external email service (not provided by cloud.gov).

## Customer systems

* [Data flow from the public to a public application]({{ site.baseurl }}{% link _docs/management/custom-domains.md %}#comparison-of-default-domains-and-custom-domains)
* [Continuous deployment]({{ site.baseurl }}{% link _docs/management/continuous-deployment.md %}#configure-your-service)
* [Administrative access to customer systems]({{ site.baseurl }}{% link _docs/compliance/meeting-tic-requirements.md %}#use-cases-for-accessing-cloudgov)

## Platform

Platform architecture diagrams from the [cloud.gov P-ATO documentation package]({{ site.baseurl }}{% link _docs/overview/fedramp-tracker.md %}#how-you-can-use-this-p-ato):

* [Network](https://diagrams.fr.cloud.gov/10-1-network.html)
* [Customer data flow](https://diagrams.fr.cloud.gov/10-4.1-customer-data-flow.html)
* [Jumpbox data flow](https://diagrams.fr.cloud.gov/10-4.2-jumpbox.html)
* [Monitoring and alerting data flow](https://diagrams.fr.cloud.gov/10-4.3-monitoring.html)
* [Software deployment data flow](https://diagrams.fr.cloud.gov/10-4.4-software-deployment.html)
