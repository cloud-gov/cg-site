---
menu:
  main:
    parent: pricing
title: Rates
weight: 10
---

## cloud.gov fees are broken into three components:

- Access package
- Usage
- Managed services

### 1. cloud.gov Access Package

All access packages include the following: 

- API access, CLI access, Web UI access
- Documentation/tutorial material (including continuing development)
- Web-based support during business hours (platform available 24/7, problems addressed as-possible).
- Allocation of underlying IaaS (AWS) instances 
- OS security updates and regular hardening of OS image
- Regular updates to platform security
- Network security
- ATO-ready documentation of system components (compliance-masonry form)
- Regular scanning for infrastructure-level vulnerabilities/misconfiguration
- Regular security updates for supported [buildpacks](#)
- Self-service management of spaces and users within an organization
- Platform maintenance and managed service expansion overhead

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
      For any .gov or .mil account to try out cloud.gov, no paperwork required. All managed services are available but usage is capped to control our costs.
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

* Access Package fees are charged yearly and non-severable.

---

### 2. cloud.gov Usage

Resources such as memory, storage and CPU are allocated as needed to run your applications. You will be charged for the resources your applications consume, as a factor of the memory used.

<em>Charged at $0.0033 per MB reserved per hour (<b>~$99 / GB / month</b>), billed per quarter, tallied monthly, severable.</em>

---

### 3. cloud.gov Managed Services

Managed services are those which cloud.gov will spin up instantly and run on your behalf. You pay for the resources they consume and our efforts to provide them as a service.

The price of each service is different and they are billed by the service instance. You can see the price of each service in the [marketplace](#) (coming soon).

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