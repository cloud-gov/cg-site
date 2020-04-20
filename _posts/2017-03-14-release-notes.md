---
layout: post
date: "2017-03-14"
title: "Platform Release Notes: March 14, 2017"
redirect_from:
  - /updates/2017-03-14-release-notes/
---

Curious what’s new that you might find helpful as a cloud.gov application developer? Here are highlights from our platform updates over the past two weeks.

<!--more-->

### Added
The [cloud.gov dashboard](https://dashboard.fr.cloud.gov) now alerts you when it’s unable to fetch recent data. This can help you when you’re troubleshooting problems with your application.

### Changed

[`cf logs`]({{ site.baseurl }}/docs/apps/logs/) now accesses logs over port 443 instead of the previous port 4443, to increase the number of people who can use `cf logs` without errors. In many workplaces port 4443 is blocked, which leads `cf logs` to return an error.

### Security

We upgraded the Cloud Foundry deployment to [v252](https://github.com/cloudfoundry/cf-release/releases/tag/v252). We have also upgraded the following buildpacks to versions newer than the buildpacks included in CF v252:

- [staticfile-buildpack 1.3.17](https://github.com/cloudfoundry/staticfile-buildpack/releases/tag/v1.3.17)
- [java-buildpack 3.13](https://github.com/cloudfoundry/java-buildpack/releases/tag/v3.13)
- [ruby-buildpack 1.6.34](https://github.com/cloudfoundry/ruby-buildpack/releases/tag/v1.6.34)
- [nodejs-buildpack 1.5.29](https://github.com/cloudfoundry/nodejs-buildpack/releases/tag/v1.5.29)
- [go-buildpack 1.7.18](https://github.com/cloudfoundry/go-buildpack/releases/tag/v1.7.18)
- [python-buildpack 1.5.15](https://github.com/cloudfoundry/python-buildpack/releases/tag/v1.5.15)
- [php-buildpack 4.3.27](https://github.com/cloudfoundry/php-buildpack/releases/tag/v4.3.27)
- [binary-buildpack 1.0.9](https://github.com/cloudfoundry/binary-buildpack/releases/tag/v1.0.9)

As part of the Cloud Foundry upgrade, the base filesystem used for running your application has been updated to address several security vulnerabilities. You should [restage your application](http://cli.cloudfoundry.org/en-US/cf/restage.html) to [incorporate fixes in the base filesystem](https://docs.cloudfoundry.org/devguide/deploy-apps/stacks.html#cli-commands) and ensure you’re running the most recent language version supported by your [buildpack](https://docs.cloudfoundry.org/buildpacks/).

- [USN-3142-2: ImageMagick Regression](https://www.ubuntu.com/usn/USN-3142-2/)
- [USN-3181-1: OpenSSL vulnerabilities](https://www.ubuntu.com/usn/USN-3181-1/)
- [USN-3183-1: GnuTLS vulnerabilities](https://www.ubuntu.com/usn/USN-3183-1/)
- [USN-3185-1: libXpm vulnerability](https://www.ubuntu.com/usn/USN-3185-1/)
- [USN-3193-1: Nettle vulnerability](https://www.ubuntu.com/usn/USN-3193-1/)
- [USN-3205-1: tcpdump vulnerabilities](https://www.ubuntu.com/usn/USN-3205-1/)
- [USN-3212-1: LibTIFF vulnerabilities](https://www.ubuntu.com/usn/USN-3212-1/)

### See also

If you’re interested in details about recent dashboard updates, you can also see the [dashboard release notes](https://github.com/18F/cg-dashboard/releases).
