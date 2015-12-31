---
menu:
  main:
    parent: pricing
title: Rates
weight: 10
---

## cloud.gov is charged with 3 different components:

### 1. cloud.gov Access Package

The access package is the main fee charged by cloud.gov and it includes the following: 

- API access, CLI access, Web UI access
- Documentation/tutorial material (including continuing development)
- Web-based support during business hours (platform performing as expected and available 24/7, problems addressed as-possible).
- Allocation of underlying IaaS (AWS) instances 
- OS Security updates and Regular hardening of OS image
- Regular updates to platform security
- Network security
- ATO-ready documentation of system components (compliance-masonry form)
- Routine scanning for infrastructure-level vulnerabilities/misconfiguration
- Routine security updates for supported [buildpacks](#)
- Self-service management of spaces and users within an organization
- Platform maintenance and managed service expansion overhead

<table>
  <tr>
    <th>Sandbox</th>
    <th>Skunkworks</th>
    <th>FISMA Low</th>
    <th>FISMA Mod</th>
  </tr>
  <tr>
    <td>
      For .gov and .mil accounts to kick the tires. Capped usage, all managed services available, no paperwork required.
    </td>
    <td>
      All the gov-facing services you want on apps.cloud.gov, low separation between teams. Usually one per agency/department. Sandbox caps are removed.
    </td>
    <td>
      <em>3</em> public-facing systems, including all the environments needed to support each and DNS support.
    </td>
    <td>
      <em>1</em> public-facing system, including all the environments needed to support each and DNS support with the additional support required for FISMA Moderate payloads.
    </td>
  </tr>
  <tr>
    <th>Free</th>
    <th>$15K / year</th>
    <th>$60K / year</th>
    <th>$90K / year</th>
  </tr>
</table>

* Access Package fees are charged yearly and non severable.

---

### 2. cloud.gov Usage Rates

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