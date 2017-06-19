+++
date = "2017-06-20"
title = "Platform Release Notes: June 20, 2017"
+++

Curious what’s new that you might find helpful as a cloud.gov application developer? Here are highlights from our platform updates over the past week and a half.
<!--more-->

### Changed

- [Static IP addresses for communicating with external apps]({{< relref "docs/apps/static-egress.md" >}}): Outbound traffic from cloud.gov now comes from specific IP addresses to help customers open up a connection between cloud.gov and outside data centers.
- We verified that all tenants were migrated from East/West into GovCloud! Thank you to all our customers for their patience and cooperation in making this move successful.
- Make sure you upgrade your Cloud Foundry CLI to [the latest version](https://github.com/cloudfoundry/cli/releases).

### Platform releases

cloud.gov now includes the following releases and upgrades. You will need to [restage your application](http://cli.cloudfoundry.org/en-US/cf/restage.html) to [incorporate fixes in the base filesystem](https://docs.cloudfoundry.org/devguide/deploy-apps/stacks.html#cli-commands) and ensure you’re running the most recent language version supported by your buildpack.

We upgraded the Cloud Foundry deployment to [v263](https://github.com/cloudfoundry/cf-release/releases/tag/v263). This upgrade addresses this security vulnerability: [CVE-2017-4994: Forwarded Headers in UAA](https://www.cloudfoundry.org/cve-2017-4994/).

#### Additional upgrades
- [RootFS cflinuxfs2 1.129.0](https://github.com/cloudfoundry/cflinuxfs2-rootfs-release/releases/tag/v1.129.0), which address vulnerabilities described in these security notices: 
  - [USN-3309-1: Libtasn1 vulnerability](https://www.ubuntu.com/usn/USN-3309-1/)
  - [USN-3304-1: Sudo vulnerability](https://www.ubuntu.com/usn/USN-3304-1/)
  - [USN-3212-2: LibTIFF regression](https://www.ubuntu.com/usn/USN-3212-2/)
  - [USN-3302-1: ImageMagick vulnerabilities](https://www.ubuntu.com/usn/USN-3302-1/)
- [Diego 1.18.0](https://github.com/cloudfoundry/diego-release/releases/tag/v1.18.0)
- Stemcell 3312.28
