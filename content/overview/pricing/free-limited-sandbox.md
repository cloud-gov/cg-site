---
menu:
  overview:
    parent: pricing
title: Try a free sandbox space
weight: -9
aliases:
  - /overview/pricing/free-limited-sandbox
---

Anyone with a U.S. federal government email address (.gov, .mil, or .fed.us) can try cloud.gov for free by requesting a sandbox space.

A sandbox is a free, limited way to try cloud.gov and see if it might suit your team's needs. The sandbox gives you a sense of how cloud.gov would work for the applications your team builds. From the [setup process]({{< relref "docs/getting-started/setup.md" >}}) through [deploying an app]({{< relref "docs/getting-started/your-first-deploy.md" >}}), it works similarly to using a [paid access package]({{< relref "overview/pricing/rates.md" >}}), with [some limitations](#sandbox-limitations).

## Get a sandbox

Anyone with a U.S. federal government email address (`.gov`, `.mil`, or `.fed.us`) can email [cloud-gov-inquiries@gsa.gov](mailto:cloud-gov-inquiries@gsa.gov) to request a free sandbox space. No paperwork required from us. (It's up to you to determine whether you may need permission from your organization.) If you have other questions or comments, see [Contact]({{< relref "docs/help.md" >}}).

Then, if you're interested in [purchasing full access]({{< relref "overview/pricing/rates.md" >}}) (whether for **Prototyping** or for production systems at the **Open Data**, **FISMA Low**, or **FISMA Moderate** levels), fill out [this interest form](https://docs.google.com/a/gsa.gov/forms/d/e/1FAIpQLSevZfuJ_4KE-MZlm9gttYfsXQp0PJL7OR6k6LbZ9XnFn-oA6g/viewform) or email us again.

## A few things you can try in your sandbox

On a technical level, a sandbox is a specially-limited ["space"]({{< relref "docs/getting-started/concepts.md#spaces" >}}) within a sandbox-only ["organization"]({{< relref "docs/getting-started/concepts.md#organizations" >}}) that is managed by cloud.gov. 

You can:

* Check out the [web interface (dashboard)]({{< relref "docs/getting-started/setup.md#check-out-the-dashboard" >}}) and the command line options.
* Deploy a demo app or two! You can use [one of these sample apps]({{< relref "docs/getting-started/your-first-deploy.md" >}}) or your own code. You can also try [an app from the Cloud Foundry community](https://github.com/cloudfoundry-samples) (we don't maintain or vouch for these).
* Create a free service instance, such as a [PostgreSQL or MySQL database instance]({{< relref "docs/services/relational-database.md" >}}), and bind it to your application.
* Look at [your application logs]({{< relref "docs/apps/logs.md" >}}).
* [Give a teammate Space Developer access.]({{< relref "docs/apps/managing-teammates.md#give-roles-to-a-teammate" >}})

## Sandbox limitations

Sandboxes are limited because cloud.gov is a cost-recoverable service. They're a free trial to help you evaluate whether to purchase cloud.gov.

Limitations include:

* Resource usage is capped at 1 GB of memory total, for all the applications in your space combined.
* Currently sandbox applications may run indefinitely, but **soon we will delete sandbox content once a month**. We will send notice emails to all sandbox users before we implement this.
* Sandboxes can only use free [managed services]({{< relref "docs/services/index.md" >}}).
* Don't put production applications or production data in sandboxes.
* Sandboxes do not have an "org manager" role available. You can control access and permissions for your own sandbox space.
* You can't set up [custom domains]({{< relref "docs/apps/custom-domains.md" >}}) for your applications. By default, your applications receive a `*.app.cloud.gov` domain.



<!--TO DO
- figure out multiple sandboxes issue. is there anything we even want to say about moving from E/W to GovCloud?
- blocked invitations content
- write user flows and see if they are followable
- figure out if sandbox reference is appropriate for the homepage
-->
