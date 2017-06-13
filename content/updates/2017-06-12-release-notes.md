+++
date = "2017-06-12"
title = "Platform Release Notes: June 12, 2017"
+++

Curious what’s new that you might find helpful as a cloud.gov application developer? Here are highlights from our platform updates over the past week and a half.
<!--more-->

### Changed

- [Fixed IP addresses for communicating with external apps](https://cloud.gov/docs/apps/static-egress/#cloud-gov-egress-addresses): Our customers often want cloud.gov apps that can talk to the outside and we now have an enabler to make that happen in a more secure way. Outbound traffic from cloud.gov comes from specific IP addresses to help customers open up a connection between cloud.gov and something hosted elsewhere.
- We finished migrating all tenants from East/West into GovCloud! Thank you to all our customers for their patience and cooperation in making this move successful.

### Fixed

- Clarified documentation about deployer accounts: Previously actions from space-deployer service accounts displayed in logs as `devops@gsa.gov`. Now they display as the more specific and less confusing `service-account@gsa.gov`. [We've updated the documentation to reflect this](https://cloud.gov/docs/services/cloud-gov-service-account/).

### Platform releases

- [RootFS cflinuxfs2 1.129.0](https://github.com/cloudfoundry/cflinuxfs2-rootfs-release/releases/tag/v1.129.0)
- [CloudFoundry v263](https://github.com/cloudfoundry/cf-release/releases/tag/v263)
- [Diego 1.18.0](https://github.com/cloudfoundry/diego-release/releases/tag/v1.18.0)
- Stemcell 3312.28
- 31 CVEs remediated
