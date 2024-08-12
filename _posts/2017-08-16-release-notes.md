---
layout: post
date: "2017-08-16"
title: "Platform Release Notes: August 16, 2017"
redirect_from:
  - /updates/2017-08-16-release-notes/
---

Curious what’s new that you might find helpful as a cloud.gov user? Here are highlights from our platform updates over the past two weeks.

### Added

* Space managers can [add any member of your organization to a space from the dashboard]({{ site.baseurl }}/docs/apps/managing-teammates#space-users).
* Documentation for how to take [snapshots and restore backups of your ElasticSearch service data](https://github.com/cloud-gov/cg-site/blob/6418e8e933f887896a102d8575f1c7af468d1d2f/content/docs/services/elasticsearch24.md).
* All customers can now use [Oracle’s SE2 relational database]({{ site.baseurl }}/docs/services/relational-database).

### Changed

* On the dashboard, new error messages alert you when you try to remove someone from your organization who still has roles in your spaces.
<br/>![remove space user dashboard screen]({{ site.baseurl }}/img/remove-space-user.png)
* Visualization of platform uptime available from the [cloud.gov status page](https://cloudgov.statuspage.io/). You can see current and the previous 90 days uptime for customer applications, API, dashboard, and many other components of the cloud.gov platform.

### Platform releases
We upgraded the Cloud Foundry deployment to [v270](https://github.com/cloudfoundry/cf-release/releases/tag/v270), which remediates the following vulnerabilities:

* [USN-3378-2: Linux kernel (Xenial HWE) vulnerabilities](https://usn.ubuntu.com/usn/usn-3378-2/)
* [USN-3346-1: bind9 vulnerabilities](https://usn.ubuntu.com/usn/usn-3346-1/)
* [USN-3347-1: Libgcrypt vulnerabilities](https://usn.ubuntu.com/usn/usn-3347-1/)
* [USN-3349-1: NTP vulnerabilities](https://usn.ubuntu.com/usn/usn-3349-1/)
* [USN-3353-1: Heimdal vulnerability](https://usn.ubuntu.com/usn/usn-3353-1/)
* [USN-3356-1: Expat vulnerability](https://ubuntu.com/security/notices/USN-3356-1)
* [USN-3363-1: ImageMagick vulnerabilities](https://usn.ubuntu.com/usn/usn-3363-1/)
* [USN-3363-2: ImageMagick regression](https://usn.ubuntu.com/usn/usn-3363-2/)
* [USN-3364-2: Linux kernel (Xenial HWE) vulnerabilities](https://usn.ubuntu.com/usn/usn-3364-2/)
* [USN-3367-1: gdb vulnerabilities](https://usn.ubuntu.com/usn/usn-3367-1/)

Check out our new page on [application maintenance]({{ site.baseurl }}/docs/apps/app-maintenance). It explains how to restage your application and what else you should do to keep your app up to date and secure. Restaging will [incorporate fixes in the base filesystem](https://docs.cloudfoundry.org/devguide/deploy-apps/stacks.html#cli-commands) included with this release and ensure you’re running the most recent language version supported by your [buildpack](https://docs.cloudfoundry.org/buildpacks/).

#### Additional upgrades
* [RootFS cflinuxfs2 v1.146.0](https://github.com/cloudfoundry/stacks/releases/tag/1.146.0)
* [Diego v1.24.0](https://github.com/cloudfoundry/diego-release/releases/tag/v1.24.0)
* Stemcell 3431.13
* Buildpack updates
  * [PHP v4.3.39](https://github.com/cloudfoundry/php-buildpack/releases/tag/v4.3.39)
  * [.NET Core v1.0.23](https://github.com/cloudfoundry/dotnet-core-buildpack/releases/tag/v1.0.23)
  * [Binary v1.0.14](https://github.com/cloudfoundry/binary-buildpack/releases/tag/v1.0.14)
  * [NodeJS v1.6.4](https://github.com/cloudfoundry/nodejs-buildpack/releases/tag/v1.6.4)
  * [Go v1.8.6](https://github.com/cloudfoundry/go-buildpack/releases/tag/v1.8.6)
  * [Python v1.5.22](https://github.com/cloudfoundry/python-buildpack/releases/tag/v1.5.22)
  * [Staticfile v1.4.12](https://github.com/cloudfoundry/staticfile-buildpack/releases/tag/v1.4.12)
  * [Ruby v1.6.46](https://github.com/cloudfoundry/ruby-buildpack/releases/tag/v1.6.46)
