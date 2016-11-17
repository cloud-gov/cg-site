---
menu:
  overview:
    parent: pricing
title: Rates
weight: 10
aliases:
  - /docs/intro/pricing/rates
  - /intro/pricing/rates
---

cloud.gov fees are broken into three components:

- Access package
- Resource usage
- Managed services

Find out [more about this pricing model]({{< relref "overview/pricing/pricing-model.md" >}}) and [how we define these terms]({{< relref "overview/terminology/pricing-terminology.md" >}})

## Access Package

Packages are selected based on the kinds of applications to be hosted. [Find more about what's included in all access packages.]({{< relref "overview/pricing/whats-included.md" >}})

| Package | What's included? | Base annual fee\* | Application resource usage | Managed services available |
| --- | --- | --- | --- | --- |
| **Sandbox** | Any user with a `.gov` or `.mil` email address can try out cloud.gov, no paperwork required. **Application resource usage is capped at 1GB.** | Free | Free | Only free services |
| **Prototyping** | Suitable for many teams to deploy apps, though limited to the `*.apps.cloud.gov` domain. Access control can be delegated to teams. No production data allowed. Usually purchased per agency/department. | $15K |  ~$99/GB/month | All\** |
| **Open Data** | One public-facing Open Data (no confidentiality risk assessed) system, including all the spaces needed and DNS support. **This account is limited to 2GB of memory usage per month.** | $10K | ~$99/GB/month | All\** (up to $2500/year) |
| **FISMA Low** | One public-facing FISMA Low system, including all the spaces needed and DNS support. | $20K | ~$99/GB/month | All\** |
| **FISMA Moderate** | One public-facing FISMA Moderate system, including all the spaces needed and DNS support. Additional support for FISMA Moderate data requirements. | $90K | ~$99/GB/month | All\** |

\*Access agreements are severable, and the access package fees are invoiced monthly.

\*\*We aren't yet charging for paid services. See the [managed services](#managed-services) section for details.

## Resource usage

You will be charged for the **quota** you set for your resource usage. This is only based on the memory, in MB of RAM, your reserve for your applications.

- Sandbox: Resource usage is capped to 1 GB of RAM per month.
- All other packages: $0.0033 per MB reserved per day (usually this results in $99/GB/month)

Quotas are monitored daily and are invoiced monthly. Unused quotas are not refunded, and they do not 'roll over' month to month.

We require your resource usage quota to **be set in advance**. This helps you control the maximum amount that your team will spend, and helps us avoid over-provisioning resources that won't be used.

[Find more about setting quotas and resource usage.]({{< relref "overview/pricing/quotas.md" >}})

## Managed services

[Managed services]({{< relref "docs/apps/managed-services.md" >}}) are those which cloud.gov will spin up quickly and run on your behalf (databases, storage, caching, etc.). You can see the services and plans offered for each by [running `cf marketplace`]({{< relref "docs/apps/managed-services.md" >}}).

While we aren't currently charging for these, we plan to charge for them in the future, to account for the resources they consume and our efforts to provide them as a service. The pricing for each service will be different. 18F provided services will be billed by the service instance, invoiced per month, and will be severable. We will ensure users of those services are aware of the rates when they are set, and they will not be charged before then.

This pricing will _only_ be for services created through cloud.gov. If you are using additional public or private services offered by 18F Infrastructure, they are priced and billed separately - speak with your 18F Finance point of contact for more information. External databases, SMTP servers, etc. that are _not_ managed by 18F/cloud.gov can also be used, with no additional fee.

<!--
TODO
---

- Create buildpack page with list and compliance trade-offs
- Link to terminology page
- Add examples
-->
