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

Once you fill out the [initial interest form](https://docs.google.com/forms/d/e/1FAIpQLSevZfuJ_4KE-MZlm9gttYfsXQp0PJL7OR6k6LbZ9XnFn-oA6g/viewform), the cloud.gov team will work with you to figure out what package makes the most sense for your work.

## cloud.gov access packages

### Prototyping

Our most basic paid package lets many teams build and deploy apps, with access control delegated to teams. Prototyping accounts cannot host production data; all apps are limited to the `*.app.cloud.gov` domain. Whole agencies or departments often purchase a single prototyping package.

**Annual fee:** $15K<br>
**Resource usage quota:** ~$99 per GB per month[*](#quota-pricing), up to any limit set by user<br>
**Managed services:** Full access

Interested in a prototyping account? [Fill out our initial interest form.](https://docs.google.com/forms/d/e/1FAIpQLSevZfuJ_4KE-MZlm9gttYfsXQp0PJL7OR6k6LbZ9XnFn-oA6g/viewform)

### Open data

Host one public-facing system with no confidentiality risk assessed. Open data accounts include all the spaces you need and DNS support. This is the lightest production-level package.

**Annual fee:** $10K<br>
**Resource usage quota:** ~$99 per GB per month[*](#quota-pricing), up to 2GB<br>
**Managed services:** Full access

Interested in an open data account? [Fill out our initial interest form.](https://docs.google.com/forms/d/e/1FAIpQLSevZfuJ_4KE-MZlm9gttYfsXQp0PJL7OR6k6LbZ9XnFn-oA6g/viewform)

### FISMA Low

Host one public-facing system, authorized at the FISMA Low risk assessment level. This includes all the spaces you need and DNS support.

**Annual fee:** $20K<br>
**Resource usage quota:** ~$99 per GB per month[*](#quota-pricing), up to any limit set by user<br>
**Managed services:** Full access

Interested in a FISMA Low account? [Fill out our initial interest form.](https://docs.google.com/forms/d/e/1FAIpQLSevZfuJ_4KE-MZlm9gttYfsXQp0PJL7OR6k6LbZ9XnFn-oA6g/viewform)

### FISMA Moderate

Host one public-facing system, authorized at the FISMA Moderate risk assessment level. This includes all the spaces you need and DNS support, as well as additional support for FISMA Moderate data requirements.

**Annual fee:** $90K<br>
**Resource usage quota:** ~$99 per GB per month[*](#quota-pricing), up to any limit set by user<br>
**Managed services:** Full access

Interested in a FISMA Moderate account? [Fill out our initial interest form.](https://docs.google.com/forms/d/e/1FAIpQLSevZfuJ_4KE-MZlm9gttYfsXQp0PJL7OR6k6LbZ9XnFn-oA6g/viewform)

### Sandbox

Free of charge and without any paperwork, anyone with a government email address can use a [limited version of cloud.gov]({{< relref "overview/pricing/free-limited-sandbox.md" >}}). The use of sandboxes is [subject to some limitations]({{< relref "overview/pricing/free-limited-sandbox.md" >}}#sandbox-limitations). We may change those limits in the future, but we will let you know well in advance of any changes.

**Annual fee:** FREE<br>
**Resource usage quota:** Free, up to 1GB<br>
**Managed services:** Access to any free services

[Learn more about sandboxes.]({{< relref "overview/pricing/free-limited-sandbox.md" >}})

## Quota pricing

Quotas are priced at $0.0033 per MB reserved per day and assessed monthly. In practice, this works out to $99 per GB per month, based on a 30-day month:

`$0.0033 * 1000 MB * 30 days = $99 per GB per month`

The monthly cost will vary slightly from $92.40 per GB in a 28-day month to $102.30 per GB in a 31-day month.

See [details on quota costs, billing, and limits]({{< relref "overview/pricing/quotas.md" >}}) for more.

## Find the right package for your work

Fill out our initial interest form to let us know what kind of work you’re doing and how you think you might use cloud.gov. We’ll set up a conversation to explore your goals and how we can help.

[<button class="action action-primary usa-button usa-button-primary">Tell us what you’re working on</button>](https://docs.google.com/forms/d/e/1FAIpQLSevZfuJ_4KE-MZlm9gttYfsXQp0PJL7OR6k6LbZ9XnFn-oA6g/viewform)

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

<!--
Table may not be helpful right now, but I don't want to lose it.

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
