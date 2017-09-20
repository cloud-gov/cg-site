---
menu:
  overview:
    parent: pricing
title: Packages and rates
weight: -15
aliases:
  - /docs/intro/pricing/rates
  - /intro/pricing/rates
  - /docs/intro/pricing/whats-included
  - /intro/pricing/whats-included
  - /overview/pricing/rates
  - /overview/pricing/whats-included

---

One team’s platform needs aren’t necessarily the same as another’s, so we aren’t offering one-size-fits-all pricing. We offer several packages, depending on what you need cloud.gov to do for you. And because the rates are set right when you start using cloud.gov, you’ll be able to budget for your system in advance.

## Pricing components

All packages are priced based on three components:

- [**Access package:**](#cloud-gov-access-packages) The basic unit of purchase. What package you choose depends on what kinds of applications you want to host.
- [**Resource usage quota:**]({{< relref "overview/pricing/quotas.md" >}}): The memory, in MB of RAM, you reserve for your applications. Assessed monthly and doesn’t roll over month-to-month.
- [**Managed services:**]({{< relref "overview/pricing/managed-services-cost.md" >}}) Services that cloud.gov can spin up quickly and run on your behalf. Currently free. See the services and plans offered for each service by [running `cf marketplace`]({{< relref "docs/apps/managed-services.md" >}}).

You can email [cloud-gov-inquiries@gsa.gov](mailto:cloud-gov-inquiries@gsa.gov) to work with the cloud.gov team on estimating your costs, or to start your purchase.

## cloud.gov access packages

### Prototyping

The [prototyping package]({{< relref "overview/pricing/prototyping.md" >}}) lets many teams build and deploy apps, with full access control. Prototyping packages cannot host production data; all apps are limited to the `*.app.cloud.gov` domain. Whole agencies or departments often purchase a single prototyping package.

**Annual fee:** $15K<br>
**Resource usage quota:** ~$100 per GB per month[*](#quota-pricing), up to any limit set by user<br>
**Managed services:** Full access

### Open data

Host one public-facing system with no confidentiality risk assessed. Open data packages include all the spaces you need and DNS support. This is the lightest production-level package.

**Annual fee:** $10K<br>
**Resource usage quota:** ~$100 per GB per month[*](#quota-pricing), up to 2GB<br>
**Managed services:** Full access

### FISMA Low

Host one public-facing system, authorized at the FISMA Low risk assessment level. This includes all the spaces you need and DNS support.

**Annual fee:** $20K<br>
**Resource usage quota:** ~$100 per GB per month[*](#quota-pricing), up to any limit set by user<br>
**Managed services:** Full access

### FISMA Moderate

Host one public-facing system, authorized at the FISMA Moderate risk assessment level. This includes all the spaces you need and DNS support, as well as additional support for FISMA Moderate data requirements.

**Annual fee:** $90K<br>
**Resource usage quota:** ~$100 per GB per month[*](#quota-pricing), up to any limit set by user<br>
**Managed services:** Full access

### Sandbox

Free of charge and without any paperwork, anyone with a government email address can use a [limited version of cloud.gov]({{< relref "overview/pricing/free-limited-sandbox.md" >}}). The use of sandboxes is [subject to some limitations]({{< relref "overview/pricing/free-limited-sandbox.md" >}}#sandbox-limitations). We may change those limits in the future, but we will let you know well in advance of any changes.

**Annual fee:** FREE<br>
**Resource usage quota:** Free, up to 1GB<br>
**Managed services:** Access to any free services

[Learn more about sandboxes.]({{< relref "overview/pricing/free-limited-sandbox.md" >}})

## Quota pricing

Quotas are priced at $0.0033 per MB reserved per day and assessed monthly. In practice, this works out to about $100 per GB per month:

`$0.0033 * 1024 MB * 30 days = $101.37 per GB per month`

The monthly cost will vary slightly from $94.62 per GB in a 28-day month to $104.76 per GB in a 31-day month.

See [details on quota costs, billing, and limits]({{< relref "overview/pricing/quotas.md" >}}) for more.

## Find the right package for your work

### Estimate your costs
This spreadsheet can help you estimate the total cost of cloud.gov across all access packages and quotas your team might need without having to figure out the math. Complete two steps, and it will generate an estimated annual cost for your review.

**cloud.gov cost estimator**

Formats: [.xlsx](/resources/cloudgov_cost_estimator.xlsx) | [.ods](/resources/cloudgov_cost_estimator.ods) <br />
*last updated: August 16, 2017*

<!-- The full URLs for the spreadsheet calculators are, respectively:
.xls format: https://cloud.gov/resources/cloudgov_cost_estimator.xlsx
.ods format: https://cloud.gov/resources/cloudgov_cost_estimator.ods
 -->

## What’s included

All paid cloud.gov access packages include the following:

- API access, CLI access, Web UI access
- Documentation/tutorial material (including continuing development)
- Web-based support during business hours (platform available 24/7, problems addressed as-possible).
- Allocation of underlying IaaS (AWS) instances
- OS security updates and regular hardening of OS image
- Regular updates to platform security
- Network security
- Regular scanning for infrastructure-level vulnerabilities/misconfiguration
- Support for [these technologies](http://docs.cloudfoundry.org/buildpacks/#system-buildpacks), through system buildpacks (which we also call standard buildpacks).
    - All system buildpacks receive regular security updates.
    - [Custom buildpacks]({{< relref "docs/apps/experimental/custom-buildpacks.md" >}}) can also be used for other languages/frameworks, but cloud.gov will have limited ability to assist with their usage, and there may be compliance implications.
- Self-service management of spaces and users within an organization
- Platform maintenance and managed service expansion overhead
- Support for customer-provided DNS for applications (including support for IPv6)

### Support for the platform and compliance

All packages include support for the cloud.gov platform’s functionality and performance.

We also maintain cloud.gov’s FedRAMP Moderate P-ATO and the controls covered by this authorization. All our users benefit from our work on a single consistent environment, rather than requiring repeated effort by multiple teams at multiple agencies. The savings you gain from this continue throughout your use of cloud.gov

Our support does not include work on the applications you build.

## Adding to your purchase

cloud.gov is purchased via an [IAA with 18F]({{< relref "overview/pricing/start-using-cloudgov.md" >}}). Accommodating increased expenses (like a more comprehensive access package or larger resource quota) requires a new IAA. We will happily work with you to develop it.


## Package comparison table

All three pricing components are factored into every access package. Use this table to compare packages and their costs.

| Package | What’s included? | Annual access package fee\* | Usage quota price | Managed services available |
| --- | --- | --- | --- | --- |
| **[Sandbox]({{< relref "overview/pricing/free-limited-sandbox.md" >}})** | Anyone with a U.S. federal government email address can try a limited free cloud.gov space. | Free | Free, **capped at 1GB/month** | Only free services |
| **[Prototyping]({{< relref "overview/pricing/prototyping.md" >}})** | Suitable for many teams to deploy apps, though limited to the `*.app.cloud.gov` domain. Access control can be delegated to teams. No production data allowed. Usually purchased per agency/department. | $15K |  ~$100/GB/month | All\** |
| **Open Data** | One Open Data (no confidentiality risk assessed) [system]({{< relref "overview/pricing/pricing-terminology.md#system" >}}), including all the spaces needed. | $10K | ~$100/GB/month, **capped at 2GB/month** | All\** |
| **FISMA Low** | One FISMA Low [system]({{< relref "overview/pricing/pricing-terminology.md#system" >}}), including all the spaces needed. | $20K | ~$100/GB/month | All\** |
| **FISMA Moderate** | One FISMA Moderate [system]({{< relref "overview/pricing/pricing-terminology.md#system" >}}), including all the spaces needed. | $90K | ~$100/GB/month | All\** |

\*Access agreements are severable, and the access package fees are invoiced monthly.

\*\*We aren’t yet charging for paid services. See [managed services]({{< relref "overview/pricing/managed-services-cost.md" >}}) for details.

Find out [more about this pricing model]({{< relref "overview/pricing/pricing-model.md" >}}) and [how we define these terms]({{< relref "overview/pricing/pricing-terminology.md" >}}).

