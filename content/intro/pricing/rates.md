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

<table>
  <tr>
    <th width="25%">Sandbox</th>
    <th width="25%">Prototyping</th>
    <th width="25%">FISMA Low</th>
    <th width="25%">FISMA Moderate</th>
  </tr>
  <tr>
    <td valign="top">
      For any .gov or .mil account to try out cloud.gov, no paperwork required. All managed services are available.
    </td>
    <td valign="top">
      Sandbox usage caps can be raised. Suitable for many teams to deploy apps, though limited to the apps.cloud.gov domain. Low ability to delegate access control to teams. No production data allowed. Usually purchased per agency/department. 
    </td>
    <td valign="top">
      Up to <em>3</em> public-facing FISMA Low systems, including all the spaces needed and DNS support.
    </td>
    <td valign="top">
      <em>1</em> public-facing system, including all the spaces needed and DNS support. Additional support for FISMA Moderate data requirements.
    </td>
  </tr>
  <tr>
    <th>Free</th>
    <th>$15K / year</th>
    <th>$60K / year</th>
    <th>$90K / year</th>
  </tr>
</table>

Access package fees are charged yearly and are non-severable. 

[Find more about what's included in the access package.]({{< relref "intro/pricing/whats-included.md" >}})

---

### Resource usage

You will be charged for resources as a factor of the memory your applications consume. 

- Sandbox: Resource usage is capped to 1 GB.
- All other packages: $0.0033 per MB reserved per hour (~$99/GB/month)

Resource usage fees are charged per quarter, tallied monthly, and severable.

We require a specific quota to be set in advance. This helps you control the maximum amount that your team will spend, and helps us avoid over-provisioning resources that won't be used. The quota can be raised on demand. 

[Find more about resource usage and quotas.]({{< relref "intro/pricing/quotas.md" >}})

---

### Managed services

Managed services are those which cloud.gov will spin up instantly and run on your behalf. You pay for the resources they consume and our efforts to provide them as a service.

The pricing for each service is different and they are billed by the service instance. You can see the rate for each type of service instance offered by running `cf marketplace`. (We'll include this information directly here in future.) 

**Note:** *We are still determining the rates for some services. We will ensure users of those services are aware of the rates when they are set, and they will not be charged before then.*

Managed services are billed per quarter, tallied monthly, and serverable.

---

This pricing includes _only_ services created through cloud.gov. If you are using additional public or private services offered by 18F Infrastructure, they are priced and billed separately - speak with your 18F Finance point of contact for more information.

<!-- 
TODO
---

- Create buildpack page with list and compliance trade-offs
- Link to terminology page
- Add examples
-->
