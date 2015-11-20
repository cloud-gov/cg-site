---
menu:
  main:
    parent: overview
title: What was 18F’s process for building cloud.gov?
weight: 22
---

## Why we built it

The law and federal agency requirements describe a long list of good practices for government digital services. But there is no accompanying tooling support for implementers, so delivering and deploying an app requires a lot of work. An agency needs operations expertise to follow all the regulations, manage the ATO process, and design a robust service infrastructure.

As 18F scaled up the number of teams deploying applications at any given time, we wanted to avoid turning cloud operations talent into the kind of bottleneck that slows down development for many federal teams. We focused on technical operations that could act as force-multipliers for each team, enabling our cloud ops staffers to focus on solving new problems.

The arrival of cloud.gov has enabled 18F to deploy cloud-based applications with baseline security and scalability concerns addressed consistently, right up front, without dramatically scaling the number of cloud operations experts in our organization.

## How long it took to build

After exploring configuration-management based approaches and tools, we turned instead to the platform-as-a-service (PaaS) model. By building on Cloud Foundry, we were able to deploy a functioning PaaS quickly, then fine-tune it with each project we launched on it. The first prototype of the platform took about three months to complete, and production apps started launching about a month after that.

As an agile project, cloud.gov is always under development. As we observe its use, we will continue to add new features that move the platform forward. Therefore, we do not refer to it as “complete” and probably never will.

## The process of building it

Building cloud.gov was a collaboration among our engineering, product, operations, and security teams. We built in phases:

1. **Research:** We deployed multiple open source solutions and decided that the best one that would fit our needs was Cloud Foundry. That project was selected mainly because of its [scalability, extensibility, and security](({{< relref "overview/why-use-cloudgov.md" >}})).
1. **Customization:** We started working on configuring and customizing the open source project to fit the government’s needs. Among other hardening scripts, we also incorporated HTTPS as a default for all our applications.
1. **Self-service:** We created tools that allow customers to [self-serve their accounts](({{< relref "overview/using-cloudgov-paas.md" >}}), like account invitations, shared documentation, and code samples.
1. **Growth:** We are currently expanding the platform’s capabilities and finding the growing pains that come with more diverse systems and teams using the platform.

We understood that if working with open source solutions (always 18F’s first choice) did not work out, we would have the option to try a commercial PaaS option later. Our experience with open source options indicates this is the right choice for us. However, vendor PaaS options offer features which may be attractive to agencies that have different requirements.
