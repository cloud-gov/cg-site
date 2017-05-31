+++
date = "2017-05-31"
title = "Platform Release Notes: May 31, 2017"
+++

Curious what’s new that you might find helpful as a cloud.gov application developer? Here are highlights from our platform updates over the past week and a half.
<!--more-->

### Changed
- cloud.gov document now covers only managing apps in the GovCloud environment. This follows the migration of all apps that had been in the East/West environment into GovCloud.
- Different organizations in cloud.gov are now handled within separate accounts for purposes of encryption calls. Previously, all apps hosted on cloud.gov were handled through a single account with the encryption provider, and rate-limiting was causing TLS certificates to expire. Using separate accounts resolves this issue.
- We have implemented regular kubernetes “liveness” probes of services used by applications. Previously, services were checked generally but not whether they were responding properly application-by-application. The regular monitoring means non-responsive services will automatically restart.

### Platform releases
We upgraded the Cloud Foundry deployment to [v262](https://github.com/cloudfoundry/cf-release/releases/tag/v262). This upgrade addresses this security vulnerability:
[CVE-2017-4991: UAA password reset vulnerability](https://cloudfoundry.org/cve-2017-4991/)

**[Restage your application](http://cli.cloudfoundry.org/en-US/cf/restage.html)** to [incorporate fixes in the base filesystem](https://docs.cloudfoundry.org/devguide/deploy-apps/stacks.html#cli-commands) and ensure you’re running the most recent language version supported by your buildpack.

#### Additional upgrades
- [PHP buildpack 4.3.33](https://github.com/cloudfoundry/php-buildpack/releases/tag/v4.3.33)
- [.NET Core Buildpack 1.0.18](https://github.com/cloudfoundry/dotnet-core-buildpack/releases/tag/v1.0.18)
- [Binary Buildpack 1.0.12](https://github.com/cloudfoundry/binary-buildpack/releases/tag/v1.0.12)
- [NodeJS Buildpack 1.5.34](https://github.com/cloudfoundry/nodejs-buildpack/releases/tag/v1.5.34)
- [Go Buildpack 1.8.2](https://github.com/cloudfoundry/go-buildpack/releases/tag/v1.8.2)
- [Staticfile Buildpack 1.4.6](https://github.com/cloudfoundry/staticfile-buildpack/releases/tag/v1.4.6)
- [Ruby Buildpack 1.6.39](https://github.com/cloudfoundry/ruby-buildpack/releases/tag/v1.6.39)
- [Diego 1.16.1](https://github.com/cloudfoundry/diego-release/releases/tag/v1.16.1)
Stemcell 3312.26
- [RootFS cflinuxfs2 1.123.0](https://github.com/cloudfoundry/cflinuxfs2/releases/tag/1.123.0), which address vulnerabilities described in these security notices:
  - [USN-3271-1: Libxslt vulnerabilities](https://www.ubuntu.com/usn/USN-3271-1/)
  - [USN-3274-1: ICU vulnerabilities](https://www.ubuntu.com/usn/USN-3274-1/)
  - [USN-3276-1: shadow vulnerabilities](https://www.ubuntu.com/usn/USN-3276-1/)
  - [USN-3276-2: shadow regression](https://www.ubuntu.com/usn/USN-3276-2/)
  - [USN-3282-1: FreeType vulnerabilities](https://www.ubuntu.com/usn/USN-3282-1/)
  - [USN-3283-1: rtmpdump vulnerabilities](https://www.ubuntu.com/usn/USN-3283-1/)
  - [USN-3287-1: Git vulnerability](https://www.ubuntu.com/usn/USN-3287-1/)
  - [USN-3294-1: Bash vulnerabilities](https://www.ubuntu.com/usn/USN-3294-1/)
  - [USN-3295-1: JasPer vulnerabilities](https://www.ubuntu.com/usn/USN-3295-1/)

### See also

If you’re interested in details about recent dashboard updates, you can also see the [dashboard release notes](https://github.com/18F/cg-dashboard/releases).
