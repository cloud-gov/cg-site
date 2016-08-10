---
menu:
  main:
    parent: pricing
title: Rates
weight: 10
---

cloud.gov fees are broken into three components:

- Access package
- Resource usage
- Managed services

Find out [more about this pricing model]({{< relref "intro/pricing/pricing-model.md" >}}) and [how we define these terms]({{< relref "intro/terminology/pricing-terminology.md" >}})

### Access Package

Packages are selected based on the kinds of applications to be hosted. [Find more about what's included in all access packages.]({{< relref "intro/pricing/whats-included.md" >}})

| Package | What's included? | Base annual fee\* | Usage charges? |
| --- | --- | --- | --- |
| **Sandbox** | Any user with a `.gov` or `.mil` email address can try out cloud.gov, no paperwork required. All managed services are available. Resource usage is capped, though it can be raised. | Free | No |
| **Prototyping** | Suitable for many teams to deploy apps, though limited to the `*.apps.cloud.gov` domain. Access control can be delegated to teams. No production data allowed. Usually purchased per agency/department. | $15K | No\** |
| **FISMA Low** | One public-facing FISMA Low system, including all the spaces needed and DNS support. | $20K | No\** |
| **FISMA Moderate** | One public-facing FISMA Moderate system, including all the spaces needed and DNS support. Additional support for FISMA Moderate data requirements. | $90K | No\** |

\*Access package fees are charged yearly and are non-severable.

\*\*See the [managed services](#managed-services) section for details.

---

### Resource usage

You will be charged for resource usage as a factor of the memory, in MB of RAM, your applications consume.

- Sandbox: Resource usage is capped to 1 GB of RAM per month.
- All other packages: $0.0033 per MB reserved per day (usually this results in $99/GB/month)

Resource usage fees are charged per quarter, tallied monthly, and severable.

We require your resource usage quota to **be set in advance**. This helps you control the maximum amount that your team will spend, and helps us avoid over-provisioning resources that won't be used.

[Find more about setting quotas and resource usage.]({{< relref "intro/pricing/quotas.md" >}})

---

### Managed services

[Managed services]({{< relref "apps/managed-services.md" >}}) are those which cloud.gov will spin up instantly and run on your behalf (databases, storage, caching, etc.). You can see the services and plans offered for each by [running `cf marketplace`]({{< relref "apps/managed-services.md#list-services" >}}). *We'll include more details on this page in the future.*

While we aren't currently charging for these, we plan to charge for them in the future, to account for the resources they consume and our efforts to provide them as a service. The pricing for each service will be different and will be billed by the service instance, billed per quarter, tallied monthly, and severable. We will ensure users of those services are aware of the rates when they are set, and they will not be charged before then.

This pricing will _only_ be for services created through cloud.gov. If you are using additional public or private services offered by 18F Infrastructure, they are priced and billed separately - speak with your 18F Finance point of contact for more information. External databases, SMTP servers, etc. that are _not_ managed by 18F/cloud.gov can also be used, with no additional fee.

<!--
TODO
---

- Create buildpack page with list and compliance trade-offs
- Link to terminology page
- Add examples
-->
