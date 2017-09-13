---
menu:
  overview:
    parent: pricing
title: Try a free sandbox space
weight: -10
aliases:
  - /overview/pricing/free-limited-sandbox
---

A sandbox is a free space that you can use to see if cloud.gov might suit your team’s needs. From the [setup process]({{< relref "docs/getting-started/setup.md" >}}) through [deploying an app]({{< relref "docs/getting-started/your-first-deploy.md" >}}), it works similarly to other spaces that are included in [paid access packages]({{< relref "overview/pricing/rates.md" >}}), with [some limitations](#sandbox-limitations).

## Get a sandbox

Anyone with a U.S. federal government email address (ending in `.gov`, `.mil`, or `.fed.us`) can [**sign up for a free sandbox space**](https://account.fr.cloud.gov/signup). No paperwork is required from us. (It’s up to you to determine whether you may need permission from your agency.) If you have other questions or comments, see [Contact]({{< relref "docs/help.md" >}}).

If you’re interested in [purchasing full access]({{< relref "overview/pricing/rates.md" >}}) (whether for **Prototyping** or for production systems at the **Open Data**, **FISMA Low**, or **FISMA Moderate** levels), email [cloud-gov-inquiries@gsa.gov](mailto:cloud-gov-inquiries@gsa.gov) and we'll help you get started.

## Keep in mind before you try your sandbox

* If your agency has not already integrated its single-sign on authentication provider with cloud.gov (only GSA, EPA, and FDIC have done this so far), you will access your sandbox through a [cloud.gov account]({{< relref "docs/getting-started/accounts.md#cloud-gov-accounts" >}}). This account requires multi-factor authentication using a mobile app such as [Google Authenticator](https://support.google.com/accounts/answer/1066447?hl=en) or [Authy](https://www.authy.com/app/mobile/). If you cannot install or use these apps, such as if your workplace prohibits mobile phones or mobile phone cameras, you might not be able to set up access. (Paid access packages support integration with your agency single sign-on authentication provider.)
* If your agency prohibits installing the [cloud.gov command line interface]({{< relref "docs/getting-started/setup.md#set-up-the-command-line" >}}) on your computer, you won’t be able to deploy applications in your sandbox. (For paid access packages, we can coordinate with your agency to help them approve this tool.)
* If your agency blocks many network ports, you might receive errors when you try [`cf logs`]({{< relref "docs/apps/logs.md" >}}) or [`cf ssh`]({{< relref "docs/apps/using-ssh.md" >}}). (For paid access packages, we can coordinate with your agency to ask for unblocking those ports.)

## A few things you can try in your sandbox

On a technical level, a sandbox is a specially-limited ["space"]({{< relref "docs/getting-started/concepts.md#spaces" >}}) within a sandbox-only ["organization"]({{< relref "docs/getting-started/concepts.md#organizations" >}}) that is managed by cloud.gov. You can build and deploy applications and services within that space.

As part of that, you can:

* Try the [web interface (dashboard)]({{< relref "docs/getting-started/setup.md#check-out-the-dashboard" >}}) and the command line options.
* Deploy a demo app or two! You can use [one of these sample apps]({{< relref "docs/getting-started/your-first-deploy.md" >}}) or your own code. You can also try [an app from the Cloud Foundry community](https://github.com/cloudfoundry-samples) (we don't maintain or vouch for these).
* Create a free service instance, such as a [PostgreSQL or MySQL database instance]({{< relref "docs/services/relational-database.md" >}}), and bind it to your application.
* Look at [your application logs]({{< relref "docs/apps/logs.md" >}}).
* [Give a teammate permission to deploy]({{< relref "docs/apps/managing-teammates.md#give-roles-to-a-teammate" >}}) by assigning them the “space developer” role.

## Sandbox limitations

Sandboxes are limited because cloud.gov is a cost-recoverable service. They’re a free trial to help you evaluate whether to purchase cloud.gov.

Sandboxes are for testing; they’re suitable for information and applications that require **no confidentiality, integrity, or availability**. (Don’t put production applications or production data in sandboxes; that’s not what they’re for.)

Limitations include:

* Resource usage is capped at 1 GB of memory total, for all the applications in your space combined.
* You're [capped at using a maximum]({{< relref "overview/pricing/quotas.md#what-quotas-limit" >}}) of 10 [service instances]({{< relref "docs/apps/managed-services.md" >}}), 10 [service keys](https://docs.cloudfoundry.org/devguide/services/service-keys.html), and 10 [application routes]({{< relref "docs/apps/custom-domains.md" >}}), for all the applications in your space combined.
* You can only create free managed service instances, not [managed service instances that will be paid in the future]({{< relref "overview/pricing/managed-services-cost.md" >}}).
* You can only use the default `*.app.cloud.gov` domain, not [custom domains]({{< relref "docs/apps/custom-domains.md" >}}).
* Currently sandbox applications may run indefinitely, but **soon we will delete sandbox content once a month**. We will send notice emails to all sandbox users before we implement this change in policy. Once this new policy is in place, we’ll also send a note to sandbox users before deletions so people can preserve information they need.
* Sandboxes do not have an “org manager” role available. (You can control access and permissions for your own sandbox space.) If you want to manage an org of prototyping spaces for people at your agency, consider purchasing a [prototyping package]({{< relref "overview/pricing/prototyping.md" >}}).
