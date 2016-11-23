---
menu:
  overview:
    parent: technology
title: cloud.gov and containers
weight: 40
aliases:
  - /docs/intro/technology/containers
  - /intro/technology/containers
---

We use Docker containers to deliver some of the cloud.gov managed services today. In the near future, cloud.gov's internal container system will support using standardized container images directly.

A developer will be able to use Docker locally, or on a different cloud infrastructure, and then deploy into cloud.gov with no major issues. Many of the organizations that work on Cloud Foundry are part of the [Open Container Initiative](http://www.opencontainers.org/), so we are confident that we will increase cross-container support and flexibility going forward.

That said, we will carefully consider how to provide the same PaaS-level security assurance as tenants begin to bring their own containers rather than rely on PaaS-managed containers using system buildpacks. We will keep our focus on ensuring the PaaS can alleviate common security and government-space compliance issues. We want to ensure these do not resurface as impediments or security vulnerabilities for teams that want to deploy their own containers but are not prepared to regularly redeploy them for updates.
