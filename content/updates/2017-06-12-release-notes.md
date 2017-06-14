+++
date = "2017-06-12"
title = "Platform Release Notes: June 12, 2017"
+++

Curious what’s new that you might find helpful as a cloud.gov application developer? Here are highlights from our platform updates over the past week and a half.
<!--more-->

### Changed

- [Static IP addresses for communicating with external apps](https://cloud.gov/docs/apps/static-egress/#cloud-gov-egress-addresses): Outbound traffic from cloud.gov now comes from specific IP addresses to help customers open up a connection between cloud.gov and outside data centers.
- We verified that all tenants were migrated from East/West into GovCloud! Thank you to all our customers for their patience and cooperation in making this move successful.
- Make sure you upgrade your CloudFoundry CLI to [the latest version](https://github.com/cloudfoundry/cli/releases).

### Fixed

- Clarified documentation about deployer accounts: Previously actions from space-deployer service accounts displayed in logs as `devops@gsa.gov`. Now they display as the more specific and less confusing `service-account@gsa.gov`. [We've updated the documentation to reflect this](https://cloud.gov/docs/services/cloud-gov-service-account/).

### Platform releases

cloud.gov now includes the following releases and upgrades. You will need to [restage your application](http://cli.cloudfoundry.org/en-US/cf/restage.html) to incorporate fixes and ensure you’re running the most recent language version supported by your buildpack.

We upgraded the Cloud Foundry deployment to [v263](https://github.com/cloudfoundry/cf-release/releases/tag/v263).

#### Additional upgrades
- [RootFS cflinuxfs2 1.129.0](https://github.com/cloudfoundry/cflinuxfs2-rootfs-release/releases/tag/v1.129.0)
- [Diego 1.18.0](https://github.com/cloudfoundry/diego-release/releases/tag/v1.18.0)
- Stemcell 3312.28
- 31 CVEs remediated
