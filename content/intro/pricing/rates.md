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

Packages are selected based on the kinds of applications to be hosted.

| Package | What's included? | Base annual fee | Usage charges? |
| --- | --- | --- | --- |
| **Sandbox** | Any user with a `.gov` or `.mil` email address can try out cloud.gov, no paperwork required. All managed services are available. Resource usage is capped, though it can be raised. | Free | No |
| **Prototyping** | Suitable for many teams to deploy apps, though limited to the `*.apps.cloud.gov` domain. Access control can be delegated to teams. No production data allowed. Usually purchased per agency/department. | $15K | Yes |
| **FISMA Low** | One public-facing FISMA Low system, including all the spaces needed and DNS support. | $20K | Yes |
| **FISMA Moderate** | One public-facing FISMA Moderate system, including all the spaces needed and DNS support. Additional support for FISMA Moderate data requirements. | $90K | Yes |

Access package fees are charged yearly and are non-severable.

[Find more about what's included in the access package.]({{< relref "intro/pricing/whats-included.md" >}})

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

Managed services are those which cloud.gov will spin up instantly and run on your behalf. You pay for the resources they consume and our efforts to provide them as a service.

The pricing for each service is different and they are billed by the service instance. You can see the rate for each type of service instance offered by running `cf marketplace`. (We'll include this information directly here in future.)

**Note:** *We are still determining the rates for some services. We will ensure users of those services are aware of the rates when they are set, and they will not be charged before then.*

Managed services are billed per quarter, tallied monthly, and severable.

---

This pricing includes _only_ services created through cloud.gov. If you are using additional public or private services offered by 18F Infrastructure, they are priced and billed separately - speak with your 18F Finance point of contact for more information.

<!--
TODO
---

- Create buildpack page with list and compliance trade-offs
- Link to terminology page
- Add examples
-->
