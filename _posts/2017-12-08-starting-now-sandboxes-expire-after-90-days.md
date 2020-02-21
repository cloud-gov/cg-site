---
layout: post
date: "2017-12-08"
title: "Starting now, sandboxes expire after 90 days"
---

Starting today, [sandbox spaces]({{< relref "docs/pricing/free-limited-sandbox.md" >}}) will expire automatically every 90 days, as planned in our [monthly update from November]({{< relref "updates/2017-11-20-release-notes-buildpacks-volume-services-other-new-features.md" >}}).

Here's what to expect:

* Any sandbox applications you have right now will be deleted 90 days from today, along with service instances (such as databases), routes, etc., in the sandbox.
* You will not lose your cloud.gov account.
* You can start a new 90-day evaluation period just by creating a new app or service.
* Starting five days before we delete your sandbox, we'll send you an email reminder every day unless you delete your applications yourself.

We're putting in place this clean-up process to ensure that any unmaintained test applications won't become increasingly vulnerable to new security exploits. This process also ensures that any forgotten test applications won't indefinitely consume resources.

For long-term prototyping, consider purchasing a paid cloud.gov plan. [Any prototyping or production package](/pricing/) will allow you to host apps without time limitations. Contact us at [cloud-gov-inquiries@gsa.gov](mailto:cloud-gov-inquiries@gsa.gov) with any questions or to start purchasing a paid plan.
