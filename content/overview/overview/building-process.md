---
menu:
  overview:
    parent: overview
title: The process of building it
weight: 21
aliases:
  - /docs/intro/overview/building-process
  - /intro/overview/building-process
---

## How long it took to build

After exploring configuration-management based approaches and tools, we turned instead to the platform-as-a-service (PaaS) model. By building on Cloud Foundry, we were able to deploy a functioning PaaS quickly, then fine-tune it with each project we launched on it. The first prototype of the platform took about three months to complete, and production apps started launching about a month after that.

As an agile project, cloud.gov is always under development. As we observe its use, we will continue to add new features that move the platform forward. Therefore, we do not refer to it as “complete” and probably never will.

## The process of building it

Building cloud.gov was a collaboration among our engineering, product, operations, and security teams. We built in phases:

1. **Research:** We deployed multiple open source solutions and decided that the best one that would fit our needs was Cloud Foundry. That project was selected mainly because of its [scalability, extensibility, and security]({{< relref "why-use-cloudgov.md" >}}).
1. **Customization:** We started working on configuring and customizing the open source project to fit the government’s needs. Among other hardening scripts, we also incorporated HTTPS as a default for all our applications.
1. **Self-service:** We created tools that allow customers to [self-serve their accounts]({{< relref "using-cloudgov-paas.md" >}}), like account invitations, shared documentation, and code samples.
1. **Growth:** We are currently expanding the platform’s capabilities and finding the growing pains that come with more diverse systems and teams using the platform.
