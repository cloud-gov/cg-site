---
layout: post
date: "2017-06-01"
title: "Platform Release Notes: June 1, 2017"
redirect_from:
  - /updates/2017-06-01-release-notes/
---

Curious what’s new that you might find helpful as a cloud.gov application developer? Here are highlights from our platform updates over the past week and a half.
<!--more-->

### Fixed
- TLS certificates (for custom domains) provided by the [CDN Route service]({{ site.baseurl }}/docs/services/cdn-route) are now automatically obtained with [less risk of rate-limiting](https://cloudgov.statuspage.io/incidents/z49pkl4ms21j).
- We improved monitoring and reliability for the [Redis]({{ site.baseurl }}/docs/services/redis) and [Elasticsearch](https://github.com/cloud-gov/cg-site/blob/6418e8e933f887896a102d8575f1c7af468d1d2f/content/docs/services/elasticsearch24.md) services, enabling them to automatically restart if non-responsive.

### Removed
- cloud.gov documentation no longer provides instructions for using the deprecated East/West environment, because all customer applications have migrated to the GovCloud environment.

### Platform releases
cloud.gov now includes the following releases and upgrades. You will need to [restage your application](http://cli.cloudfoundry.org/en-US/cf/restage.html) to [incorporate fixes in the base filesystem](https://docs.cloudfoundry.org/devguide/deploy-apps/stacks.html#cli-commands) and ensure you’re running the most recent language version supported by your buildpack.

We upgraded the Cloud Foundry deployment to [v262](https://github.com/cloudfoundry/cf-release/releases/tag/v262). This upgrade addresses this security vulnerability:
[CVE-2017-4991: UAA password reset vulnerability](https://cloudfoundry.org/cve-2017-4991/)

#### Additional upgrades
- [PHP buildpack 4.3.33](https://github.com/cloudfoundry/php-buildpack/releases/tag/v4.3.33)
- [.NET Core Buildpack 1.0.18](https://github.com/cloudfoundry/dotnet-core-buildpack/releases/tag/v1.0.18)
- [Binary Buildpack 1.0.12](https://github.com/cloudfoundry/binary-buildpack/releases/tag/v1.0.12)
- [NodeJS Buildpack 1.5.34](https://github.com/cloudfoundry/nodejs-buildpack/releases/tag/v1.5.34)
- [Go Buildpack 1.8.2](https://github.com/cloudfoundry/go-buildpack/releases/tag/v1.8.2)
- [Staticfile Buildpack 1.4.6](https://github.com/cloudfoundry/staticfile-buildpack/releases/tag/v1.4.6)
- [Ruby Buildpack 1.6.39](https://github.com/cloudfoundry/ruby-buildpack/releases/tag/v1.6.39)
- [Diego 1.16.1](https://github.com/cloudfoundry/diego-release/releases/tag/v1.16.1)
- Stemcell 3312.26
- [RootFS cflinuxfs2 1.123.0](https://github.com/cloudfoundry/cflinuxfs2/releases/tag/1.123.0), which address vulnerabilities described in these security notices:
  - [USN-3271-1: Libxslt vulnerabilities](https://www.ubuntu.com/usn/USN-3271-1/)
  - [USN-3274-1: ICU vulnerabilities](https://www.ubuntu.com/usn/USN-3274-1/)
  - [USN-3276-1: shadow vulnerabilities](https://www.ubuntu.com/usn/USN-3276-1/)
  - [USN-3276-2: shadow regression](https://www.ubuntu.com/usn/USN-3276-2/)
  - [USN-3282-1: FreeType vulnerabilities](https://www.ubuntu.com/usn/USN-3282-1/)
  - [USN-3283-1: rtmpdump vulnerabilities](https://www.ubuntu.com/usn/USN-3283-1/)
  - [USN-3287-1: Git vulnerability](https://www.ubuntu.com/usn/USN-3287-1/)
  - [USN-3294-1: Bash vulnerabilities](https://ubuntu.com/security/notices/USN-3294-1)
  - [USN-3295-1: JasPer vulnerabilities](https://www.ubuntu.com/usn/USN-3295-1/)
