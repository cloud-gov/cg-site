---
menu:
  overview:
    parent: pricing
title: What’s included
weight: 10
aliases:
  - /docs/intro/pricing/whats-included
  - /intro/pricing/whats-included
---

All cloud.gov access packages include the following:

- API access, CLI access, Web UI access
- Documentation/tutorial material (including continuing development)
- Web-based support during business hours (platform available 24/7, problems addressed as-possible).
- Allocation of underlying IaaS (AWS) instances
- OS security updates and regular hardening of OS image
- Regular updates to platform security
- Network security
- ATO-ready documentation of system components (compliance-masonry form)
- Regular scanning for infrastructure-level vulnerabilities/misconfiguration
- Regular security updates for supported buildpacks (run `cf buildpacks` for an up-to-date list and version info):
  + staticfile_buildpack
  + java_buildpack
  + ruby_buildpack
  + nodejs_buildpack
  + go_buildpack
  + python_buildpack
  + php_buildpack
  + dotnet_core_buildpack
  + binary_buildpack
- Self-service management of spaces and users within an organization
- Platform maintenance and managed service expansion overhead
- Support for customer-provided DNS for applications (including support for IPv6)

Note that the access package covers [both the AWS East/West and GovCloud environments]({{< relref "overview/pricing/rates.md#access-package" >}}), while that migration is in progress.

<!--
TODO
- TCO statement (red/not-included stuff)
-->
