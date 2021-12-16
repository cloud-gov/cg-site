---
layout: post
title: "Managing egress traffic from your app"
date: October 05, 2021
excerpt: If you are having issues connecting to external services from your app, use these tips to troubleshoot
---

The cloud.gov team [recently announced a new feature]({{ site.baseurl }}{% link _posts/2021-11-16-controlled-space-egress.md %}) of our platform that allows developers to more granularly control hos traffic leaves their applications.

By default, when new spaces are created in your organization an application security group (ASG) is applied that restricts access to only the internal cloud.gov network. Applications running in this ASG can respond to incoming requests, but new egress traffic to cloud.gov brokered services or to the public internet can't be initiated from these instances.

If you have created a new space in your organization and are having trouble making external requests from it (e.g., ssh'ing to your app instance to administer an RDS instance), you may need to modify the ASG that applies to your space.

You can [read the documentation]({{ site.baseurl }}{% link _docs/apps/space-egress.md %}) on controlling space egress here, and you can modify the ASGs that apply to your space by [opening a support ticket](mailto:support@clou.gov).
