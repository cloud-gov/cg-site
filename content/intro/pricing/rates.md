---
menu:
  main:
    parent: pricing
title: Rates
weight: 10
---

cloud.gov fees are broken into three components:

- Access package
- Usage
- Managed services

### 1. cloud.gov Access Package

Packages are selected based on the kinds of applications to be hosted.

<table>
  <tr>
    <th>Sandbox</th>
    <th>Skunkworks</th>
    <th>FISMA Low</th>
    <th>FISMA Mod</th>
  </tr>
  <tr>
    <td>
      For any .gov or .mil account to try out cloud.gov, no paperwork required. All managed services are available.
    </td>
    <td>
      Sandbox usage caps can be raised. Suitable for many teams to deploy apps, though limited to apps.cloud.gov. Low ability to delegate access control to teams. Usually purchased per agency/department. 
    </td>
    <td>
      Up to <em>3</em> public-facing FISMA Low systems, including all the spaces needed and DNS support.
    </td>
    <td>
      <em>1</em> public-facing system, including all the spaces needed and DNS support. Additional support for FISMA Moderate payload requirements.
    </td>
  </tr>
  <tr>
    <th>Free</th>
    <th>$15K / year</th>
    <th>$60K / year</th>
    <th>$90K / year</th>
  </tr>
</table>

Access Package fees are charged yearly and non-severable. [What's included?]({{< relref "intro/pricing/whats-included.md" >}})

---

### 2. cloud.gov Usage

Resources such as memory, storage and CPU are allocated as needed to run your applications. You will be charged for the resources as a factor of the memory your applications consume. 

- Sandbox: Resource usage is capped [at what? 1GB per-user?] to control our unrecovered costs.
- All other packages: $0.0033 per MB reserved per hour (~$99/GB/month)
 
We require a specific quota to be set in advance. This helps you control the maximum amount that your team will spend, and helps us avoid over-provisioning resources that won't be used. The quota can be raised on demand. [Find out more about quotas.]({{< relref "intro/pricing/org-quotas.md" >}})

Usage fees are charged per quarter, tallied monthly, and severable.

---

### 3. cloud.gov Managed Services

Managed services are those which cloud.gov will spin up instantly and run on your behalf. You pay for the resources they consume and our efforts to provide them as a service.

The price of each service is different and they are billed by the service instance. You can see the price of each service instances offered by running `cf marketplace`. (We'll include this information directly here soon.)

Services instances are billed per quarter, tallied monthly and serverable.

---

Note: This pricing includes any services created through cloud.gov. 18F Infrastructure might offer/bill additional IaaS services separately depending on your project needs.

<!-- 
TODO
---

- Create buildpack page with list and compliance trade-offs
- TCO statement (red/not-included stuff)
- Link to terminology page
- Add examples
 -->