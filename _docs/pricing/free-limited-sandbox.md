---
parent: pricing
layout: docs
sidenav: true
title: Try a free sandbox space
weight: -10
redirect_from:
  - /overview/pricing/free-limited-sandbox
  - /docs/pricing/free-limited-sandbox
---

A sandbox is a free space that you can use to see if cloud.gov might suit your team’s needs. From the [setup process]({{ site.baseurl }}{% link _docs/getting-started/setup.md %}) through [deploying an app]({{ site.baseurl }}{% link _docs/getting-started/your-first-deploy.md %}), it works similarly to other spaces that are included in [paid access packages]({{ site.baseurl }}/pricing/), with [some limitations](#sandbox-limitations).

## Get a sandbox

Anyone with a U.S. federal government email address (ending in `.gov`, `.mil`, or `.fed.us`) can [**sign up for a free sandbox space**](https://account.fr.cloud.gov/signup). No paperwork is required from us. (It’s up to you to determine whether you may need permission from your agency.) If you have other questions or comments, see [Contact]({{ site.baseurl }}{% link _docs/help.md %}).

If you’re interested in [purchasing full access]({{ site.baseurl }}/pricing/) (whether for **Prototyping** or for production systems at the **FISMA Low** or **FISMA Moderate** levels), email [inquiries@cloud.gov](mailto:inquiries@cloud.gov) and we'll help you get started.

## Keep in mind before you try your sandbox

* If your agency has not already integrated its single-sign on authentication provider with cloud.gov (only EPA, FDIC, GSA, and NSF have done this so far), you will access your sandbox through a [cloud.gov account]({{ site.baseurl }}{% link _docs/getting-started/accounts.md %}#cloudgov-accounts). This account requires multi-factor authentication using a mobile app such as [Google Authenticator](https://support.google.com/accounts/answer/1066447?hl=en) or [Authy](https://www.authy.com/app/mobile/). If you cannot install or use these apps, such as if your workplace prohibits mobile phones or mobile phone cameras, you might not be able to set up access. (Paid access packages support integration with your agency single sign-on authentication provider.)
* If your agency prohibits installing the [cloud.gov command line interface]({{ site.baseurl }}{% link _docs/getting-started/setup.md %}#set-up-the-command-line) on your computer, you won’t be able to deploy applications in your sandbox. (For paid access packages, we can coordinate with your agency to help them approve this tool.)
* If your agency blocks many network ports, you might receive errors when you try [`cf logs`]({{ site.baseurl }}{% link _docs/deployment/logs.md %}) or [`cf ssh`]({{ site.baseurl }}{% link _docs/management/using-ssh.md %}). (For paid access packages, we can coordinate with your agency to ask for unblocking those ports.)

## A few things you can try in your sandbox

On a technical level, a sandbox is a specially-limited ["space"]({{ site.baseurl }}{% link _docs/getting-started/concepts.md %}#spaces) within a sandbox-only ["organization"]({{ site.baseurl }}{% link _docs/getting-started/concepts.md %}#organizations) that is managed by cloud.gov. You can build and deploy applications and services within that space.

As part of that, you can:

* Try the [web interface (dashboard)]({{ site.baseurl }}{% link _docs/getting-started/setup.md %}#log-into-the-dashboard-web-interface) and the command line options.
* Deploy a demo app or two! You can use [one of these sample apps]({{ site.baseurl }}{% link _docs/getting-started/your-first-deploy.md %}) or your own code. You can also try [an app from the Cloud Foundry community](https://github.com/cloudfoundry-samples) (we don't maintain or vouch for these).
* Create a free service instance, such as a [PostgreSQL or MySQL database instance]({{ site.baseurl }}{% link _docs/services/relational-database.md %}), and bind it to your application.
* Look at [your application logs]({{ site.baseurl }}{% link _docs/deployment/logs.md %}).
* [Give a teammate permission to deploy]({{ site.baseurl }}{% link _docs/orgs-spaces/roles.md %}#adding-roles-via-the-dashboard-for-users-to-access-orgs-and-spaces) by assigning them the “space developer” role.

## Sandbox limitations

Sandboxes are limited because cloud.gov is a cost-recoverable service. They’re a free trial to help you evaluate whether to purchase cloud.gov.

Sandboxes are for testing; they’re suitable for information and applications that require **no confidentiality, integrity, or availability**. (Don’t put production applications or production data in sandboxes; that’s not what they’re for.)

Limitations include:

* Resource usage is capped at 1 GB of memory total, for all the applications in your space combined.
* You're [capped at using a maximum]({{ site.baseurl }}{% link _docs/pricing/quotas.md %}#what-quotas-limit) of 10 [service instances]({{ site.baseurl }}{% link _docs/deployment/managed-services.md %}), 10 [service keys](https://docs.cloudfoundry.org/devguide/services/service-keys.html), and 10 [application routes]({{ site.baseurl }}{% link _docs/management/custom-domains.md %}), for all the applications in your space combined.
* You can only create certain managed service instances. (See each [service documentation page]({{ site.baseurl }}{% link _docs/services/intro.md %}) for details about which service instances are available in sandboxes.)
* You can only use the default `*.app.cloud.gov` domain, not [custom domains]({{ site.baseurl }}{% link _docs/management/custom-domains.md %}).
* Sandboxes do not have an "org manager" role available. (You can control access and permissions for your own sandbox space.) If you want to manage an org of prototyping spaces for people at your agency, consider purchasing a [prototyping package]({{ site.baseurl }}{% link _pages/pricing.md %}).
* We periodically delete sandbox contents to ensure that users don't run production applications in sandboxes. Specifically, we clear all sandbox contents 90 days after the first application or service is created. We'll warn you via email five days before clearing out your sandbox.
