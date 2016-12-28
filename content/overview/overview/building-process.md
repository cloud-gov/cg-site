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

After exploring configuration-management based approaches and tools, engineers at 18F turned instead to the platform-as-a-service (PaaS) model. By building on Cloud Foundry, the cloud.gov team was able to deploy a functioning PaaS quickly, then fine-tune it with each project an 18F product team launched on it. The first prototype of the platform took about three months to complete, and teams began to deploy their work to production about a month after that.

As an agile project, cloud.gov is always under development. We periodically ask customers to participate in voluntary research interviews where they share their needs and ideas for the platform. It will continue to grow based on this feedback and on observations of how it is used.

## The process of building it

Building cloud.gov was a collaboration among engineering, product, operations, and security teams. We built in phases:

1. **Research:** The cloud.gov team deployed multiple open source solutions and decided that the best one that would fit our needs was Cloud Foundry. That project was selected mainly because of its [scalability, extensibility, and security]({{< relref "why-use-cloudgov.md" >}}).
1. **Customization:** We started working on configuring and customizing the open source project to fit the government’s needs. Among other hardening scripts, cloud.gov also incorporated HTTPS as a default for all applications.
1. **Self-service:** We created tools that allow customers to [self-serve their accounts]({{< relref "using-cloudgov-paas.md" >}}), like account invitations, shared documentation, and code samples.
1. **Growth:** We are continuing to expand the platform’s capabilities and find the growing pains that come with more diverse systems and teams using the platform.
