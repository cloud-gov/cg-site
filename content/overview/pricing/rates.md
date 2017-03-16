---
menu:
  overview:
    parent: pricing
title: Rates
weight: -10
aliases:
  - /docs/intro/pricing/rates
  - /intro/pricing/rates
---

The cost of using cloud.gov is built on three components:

- [**Access package**](#access-package)
- [**Resource usage quota**](#resource-usage-quota)
- [**Managed services**](#managed-services)

These are the only things you will be billed for, so once we have an [interagency agreement (IAA)]({{< relref "overview/pricing/start-using-cloudgov.md" >}}) in place, you can predict exactly what upcoming invoices for your system will include.

The kind of system you have is going to determine what kind of access package you buy, so it’s important to understand what a system is. Simply put, a system is everything you need to deliver a product. Refer to our terminology list for [more information about systems]({{< relref "overview/pricing/pricing-terminology.md#system" >}}). Once you fill out the [initial interest form](https://docs.google.com/forms/d/e/1FAIpQLSevZfuJ_4KE-MZlm9gttYfsXQp0PJL7OR6k6LbZ9XnFn-oA6g/viewform), the cloud.gov team will work with you to figure out what makes sense to include in your system.

## Access package

The basic unit of purchase for cloud.gov is the access package. What package you choose depends on what kinds of applications you want to host. The access package sets an annual fee, and it defines the capabilities you have, including whether your resource usage quota will be capped and what managed services you can use. [Find out more about what’s included in all access packages.]({{< relref "overview/pricing/whats-included.md" >}})

These are the packages we offer:

- **Prototyping:** Deploying demo applications with a cloud.gov domain, not for production. $15K per year.

- **Open Data:** One [system]({{< relref "overview/pricing/pricing-terminology.md#system" >}}) with no confidentiality risk assessed, with custom domain support included. $10K per year.

- **FISMA Low:** One public-facing FISMA Low [system]({{< relref "overview/pricing/pricing-terminology.md#system" >}}), with custom domain support included. $20K per year.

- **FISMA Moderate:** One public-facing FISMA Moderate [system]({{< relref "overview/pricing/pricing-terminology.md#system" >}}), with custom domain support included. $90K per year.

- **[Sandbox]({{< relref "overview/pricing/free-limited-sandbox.md" >}}):** A way to try cloud.gov for free (with limitations), not for production. Free.

## Resource usage quota

Along with the access package you select, you will need to set a quota for your resource usage. The quota is the memory, in MB of RAM, you reserve for your applications. Unused memory is not refunded, and it does not ‘roll over’ month to month.

Most packages are $0.0033 per MB reserved per day, with no limit except the quota you set. Open Data packages have a 2 GB of RAM per month limit. Resource usage for a sandbox package is free, but it is capped at 1 GB of RAM per month.

[Find more about quota billing and limits.]({{< relref "overview/pricing/quotas.md" >}})

## Managed services

[Managed services]({{< relref "docs/apps/managed-services.md" >}}) are services that cloud.gov can spin up quickly and run on your behalf (databases, storage, caching, etc.). You can see the services and plans offered for each service by [running `cf marketplace`]({{< relref "docs/apps/managed-services.md" >}}).

Currently, we don’t charge for managed services. We plan to start charging for them in the future to account for the resources they consume and our work to provide them. The pricing for each service will be different, and they will be severable. We will ensure users of these services are aware of the rates when they are set, and they will not be charged before then.

This pricing will _only_ be for services created through cloud.gov. Any additional services offered by TTS that are not part of cloud.gov are billed separately, so speak with your 18F Finance point of contact for more information. You can also use external services not managed by cloud.gov or a TTS team at no additional charge.

## What support is included

The cloud.gov team supports the cloud.gov platform’s functionality and performance. All access packages include this support.

The cloud.gov team also maintains the platform’s FedRAMP Moderate P-ATO and the controls covered by this authorization. Keeping our controls in place and our documentation up to date is also included in all access packages. This also means all our users benefit from our work on a single consistent environment, rather than requiring repeated effort by multiple teams at multiple agencies. The savings you gain from this continue throughout your use of cloud.gov

Our support does not include work on the applications you build.

## Changing purchases

cloud.gov is purchased via an [IAA with 18F]({{< relref "overview/pricing/start-using-cloudgov.md" >}}). Accommodating increased expenses (like a more comprehensive access package or larger resource quota) requires a new IAA. We will happily work with you to develop it.

<!--
TABLE IS NOT HELPFUL RIGHT NOW.

## Package comparison table

All three pricing components are factored into every access package. Use this table to compare packages and their costs.

| Package | What’s included? | Annual access package fee\* | Usage quota price | Managed services available |
| --- | --- | --- | --- | --- |
| **[Sandbox]({{< relref "overview/pricing/free-limited-sandbox.md" >}})** | Anyone with a U.S. federal government email address can try a limited free cloud.gov space. | Free | Free, **capped at 1GB/month** | Only free services |
| **Prototyping** | Suitable for many teams to deploy apps, though limited to the `*.app.cloud.gov` domain. Access control can be delegated to teams. No production data allowed. Usually purchased per agency/department. | $15K |  ~$99/GB/month | All\** |
| **Open Data** | One public-facing Open Data (no confidentiality risk assessed) [system]({{< relref "overview/pricing/pricing-terminology.md#system" >}}), including all the spaces needed and DNS support. | $10K | ~$99/GB/month, **capped at 2GB/month** | All\** (up to $2500/year) |
| **FISMA Low** | One public-facing FISMA Low [system]({{< relref "overview/pricing/pricing-terminology.md#system" >}}), including all the spaces needed and DNS support. | $20K | ~$99/GB/month | All\** |
| **FISMA Moderate** | One public-facing FISMA Moderate [system]({{< relref "overview/pricing/pricing-terminology.md#system" >}}), including all the spaces needed and DNS support. Additional support for FISMA Moderate data requirements. | $90K | ~$99/GB/month | All\** |

\*Access agreements are severable, and the access package fees are invoiced monthly.

\*\*We aren’t yet charging for paid services. See [managed services](#managed-services) for details.

Find out [more about this pricing model]({{< relref "overview/pricing/pricing-model.md" >}}) and [how we define these terms]({{< relref "overview/pricing/pricing-terminology.md" >}}).

-->


<!--
TODO
---

- Create buildpack page with list and compliance trade-offs
- Add examples
-->
