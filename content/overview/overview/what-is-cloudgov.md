---
menu:
  overview:
    parent: overview
title: What is cloud.gov?
weight: 10
aliases:
  - /docs/intro/overview/what-is-cloudgov
  - /intro/overview/what-is-cloudgov
---

cloud.gov is a Platform as a Service.

cloud.gov allows federal digital service teams to focus on developing and deploying their custom application code, without needing to manage underlying server infrastructure.

The core of cloud.gov is a Platform as a Service (PaaS) built specifically for government work, based on the open source Cloud Foundry project](http://www.cloudfoundry.org/). This means the customer team is responsible for their own product’s code, and the cloud.gov platform [takes care of the security and maintenance of everything underneath]({{< relref "overview/technology/responsibilities.md" >}}).

cloud.gov runs on top of industry-provided infrastructure ([currently Amazon Web Services is the "Infrastructure as a Service" provider]({{< relref "overview/technology/iaas.md" >}})). cloud.gov removes the complexity of managing this infrastructure from the customer’s experience.

All the software components of the cloud.gov Platform as a Service are [open source]({{< relref "docs/ops/repos.md" >}}).

## Why work with this Platform as a Service?

cloud.gov gives teams working for federal government a secure, fully compliant foundation on which to build and release products and updates quickly. It handles the shared technical and policy requirements common to federal government systems, so that teams can skip a large amount of repetitive work and instead focus on delivering software that serves people’s needs. It’s built to keep applications online even with large numbers of users and sharp increases in usage.

cloud.gov is built and maintained by [18F](https://18f.gsa.gov/) as part of the U.S. General Services Administration’s [Technology Transformation Service](http://www.gsa.gov/portal/category/25729) portfolio. cloud.gov is a cost-recoverable service funded by charging a fee to the teams that use it.

## cloud.gov provides a compliance toolkit

cloud.gov provides tools for customers to create the security documentation and continuing assurance necessary for federal services to comply with FISMA regulations and agency-specific “Authority to Operate” (ATO) requirements.

These tools are the Compliance Toolkit, including [Compliance Masonry](https://github.com/opencontrol/compliance-masonry). The Compliance Toolkit supports cloud.gov's ATO and the ATOs of customer applications, and they’re all open source. Other teams, including agencies and industry teams, can also use these tools for unrelated projects with similar needs.
