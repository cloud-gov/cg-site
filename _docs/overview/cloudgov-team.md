---
parent: overview
layout: docs
sidenav: true
title: The cloud.gov team
overview: true
weight: 80
redirect_from:
  - /docs/intro/overview/why-build-cloudgov
  - /intro/overview/why-build-cloudgov
  - /overview/overview/why-build-cloudgov
  - /docs/intro/overview/building-process
  - /intro/overview/building-process
  - /overview/overview/building-process
  - /overview/overview/cloudgov-team

---

cloud.gov is built and maintained by a team within the U.S. General Services Administration’s [Technology Transformation Service](http://www.gsa.gov/portal/category/25729) portfolio. cloud.gov is a cost-recoverable service funded by charging a fee to the teams that use it.

Our mission is broader than making it easier for government agencies to adopt cloud deployment. The mission of cloud.gov is to enable agencies to deliver services to the public as fast as they can develop them while applying best practices in security and compliance with minimal effort.

As an agile project, cloud.gov is always under development. We periodically ask customers to participate in voluntary research interviews where they share their needs and ideas for the platform. It will continue to grow based on this feedback and based on observations of how it is used.

## Why we built cloud.gov

18F was founded in 2014 and has been deploying new products since soon after. As 18F scaled up the number of teams, it became clear that cloud operations could be a bottleneck. The list of good practices for government digital services introduced by law and federal agency requirements was far greater than the accompanying support implementers need to do them efficiently.

To solve the bottleneck problem, 18F focused on technical operations that could act as force-multipliers for each team, including stronger cloud operations. cloud.gov emerged from this focus. The first prototype of the platform took about three months to complete, and teams began to deploy their work to production about a month after that. Today, it is a product managed outside of 18F that is available to [other government agencies]({{ site.baseurl }}{% link _docs/overview/who-can-use-cloudgov.md %}). 

One of our goals for cloud.gov is to give other agencies access to the same gains in productivity that 18F and other parts of TTS have seen from using cloud.gov. By making the model available for other agencies, as well as making it replicable as an open source project, we hope to increase the efficiency with which any agency can deliver digital services. The potential economy of scale is huge.

Our experience with this project suggests an open source PaaS is the right choice for many government teams. However, vendor PaaS options offer features which may be attractive to [agencies that have different requirements]({{ site.baseurl }}{% link _docs/overview/who-can-use-cloudgov.md %}).

## The process of building it

Building cloud.gov was a collaboration among engineering, product, operations, and security teams. We built in phases:

1. **Research:** The cloud.gov team deployed multiple open source solutions and decided that the one that would fit our needs best was Cloud Foundry. That project was selected mainly because of its [scalability, extensibility, and security]({{ site.baseurl }}{% link _docs/overview/cloudgov-benefits.md %}).
1. **Customization:** We started working on configuring and customizing the open source project to fit the government’s needs. Among other hardening scripts, cloud.gov also incorporated HTTPS as a default for all applications.
1. **Self-service:** We created tools that allow customers to [self-serve their accounts]({{ site.baseurl }}{% link _docs/overview/using-cloudgov-paas.md %}), like account invitations, shared documentation, and code samples.
1. **Growth:** We are continuing to expand the platform’s capabilities and find the growing pains that come with more diverse systems and teams using the platform.
