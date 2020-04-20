---
layout: post
date: "2016-12-28"
title: "Platform Release Notes"
redirect_from:
  - /updates/2016-12-28-release-notes/
---

Curious what’s new that you might find helpful as a cloud.gov application developer? Here are highlights from our platform updates over the past two weeks.
<!--more-->

### Added
- You can now create [S3 service keys]({{ site.baseurl }}/docs/services/s3#get-s3-bucket-credentials) to get direct access to your cloud.gov S3 buckets.

### Changed
- We upgraded Cloud Foundry (the underlying open source project that powers cloud.gov) to [Release v250](https://github.com/cloudfoundry/cf-release/releases/tag/v250), which includes updates to buildpacks and improvements for internal components.

### Security
The Cloud Foundry upgrade included updates for the base filesystem used for running your application, addressing several security vulnerabilities in that filesystem. You can [restage your application](https://cli.cloudfoundry.org/en-US/cf/restage.html) to ensure you [incorporate fixes in the base filesystem](https://docs.cloudfoundry.org/devguide/deploy-apps/stacks.html#cli-commands) and are running the most recent language version supported by your [buildpack](https://docs.cloudfoundry.org/buildpacks/).

- [USN-3156-1: APT vulnerability](https://www.ubuntu.com/usn/USN-3156-1/). The associated CVE is [CVE-2016-1252](http://people.ubuntu.com/~ubuntu-security/cve/CVE-2016-1252).
