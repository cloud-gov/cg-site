---
layout: post
date: "2017-07-10"
title: "Platform Release Notes: July 10, 2017"
redirect_from:
  - /updates/2017-07-07-release-notes/
---

Curious what’s new that you might find helpful as a cloud.gov application developer? Here are highlights from our platform updates over the past six weeks.
<!--more-->

### Added
* Organization managers can now [add new teammates to your org]({{ site.baseurl }}/docs/apps/managing-teammates.md#give-roles-to-a-teammate) and manage user permissions right from the [dashboard](https://dashboard.fr.cloud.gov/).
* [cf-service-connect]({{ site.baseurl }}/docs/services/relational-database.md#manually-access-a-database) now supports Windows. [See how to install it here.](https://github.com/18F/cf-service-connect#local-installation)

### Changed

- When you make a new service account or identity provider service instance, you will now [get the credentials using a service key]({{ site.baseurl }}/updates/2017-07-07-changes-to-credentials-broker.md), instead of getting the credentials from a Toaster (formerly Fugacious) link. This doesn’t change existing service account and identity provider instances, but you can delete and recreate them to use this new method.
- [Static IP addresses for communicating with external apps]({{ site.baseurl }}/docs/apps/static-egress.md): Outbound traffic from cloud.gov now comes from specific IP addresses to help customers open up a connection between cloud.gov and outside data centers.
- We recommend you upgrade your Cloud Foundry CLI to [the latest version](https://github.com/cloudfoundry/cli/releases) to get the latest bug fixes.
- We improved the responsiveness of the dashboard to better reflect actions that happen on the backend.


### Platform releases

We upgraded the Cloud Foundry deployment to [v264](https://github.com/cloudfoundry/cf-release/releases/tag/v264). This upgrade addresses this security vulnerability: [CVE-2017-4994: Forwarded Headers in UAA](https://www.cloudfoundry.org/cve-2017-4994/).

You should [restage your application](http://cli.cloudfoundry.org/en-US/cf/restage.html) to [incorporate fixes in the base filesystem](https://docs.cloudfoundry.org/devguide/deploy-apps/stacks.html#cli-commands) and ensure you’re running the most recent language version supported by your [buildpack](https://docs.cloudfoundry.org/buildpacks/).

#### Additional upgrades
- [RootFS cflinuxfs2 1.133.0](https://github.com/cloudfoundry/cflinuxfs2/releases/tag/1.133.0), which address vulnerabilities described in these security notices:
  - [USN-3309-1: Libtasn1 vulnerability](https://www.ubuntu.com/usn/USN-3309-1/)
  - [USN-3304-1: Sudo vulnerability](https://www.ubuntu.com/usn/USN-3304-1/)
  - [USN-3212-2: LibTIFF regression](https://www.ubuntu.com/usn/USN-3212-2/)
  - [USN-3302-1: ImageMagick vulnerabilities](https://ubuntu.com/security/notices/USN-3302-1)
- [Diego 1.19.0](https://github.com/cloudfoundry/diego-release/releases/tag/v1.19.0)
- Stemcell 3312.29
- Buildpack updates:
  - [Java v3.17](https://github.com/cloudfoundry/java-buildpack/releases/tag/v3.17)
  - [Ruby v1.6.40](https://github.com/cloudfoundry/ruby-buildpack/releases/tag/v1.6.40)
  - [Go v1.8.4](https://github.com/cloudfoundry/go-buildpack/releases/tag/v1.8.4)
  - [NodeJS v 1.5.36](https://github.com/cloudfoundry/nodejs-buildpack/releases/tag/v1.5.36)
  - [Python v1.5.19](https://github.com/cloudfoundry/python-buildpack/releases/tag/v1.5.19)
  - [PHP v4.3.34](https://github.com/cloudfoundry/php-buildpack/releases/tag/v4.3.34)
  - [Binary v1.0.13](https://github.com/cloudfoundry/binary-buildpack/releases/tag/v1.0.13)
  - [.NET core v1.0.19](https://github.com/cloudfoundry/dotnet-core-buildpack/releases/tag/v1.0.19)

### See Also

If you’re interested in details about recent dashboard updates, you can also see the [dashboard release notes](https://github.com/18F/cg-dashboard/releases).
