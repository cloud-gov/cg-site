---
layout: post
date: "2017-07-18"
title: "Platform Release Notes: July 18, 2017"
redirect_from:
  - /updates/2017-07-18-release-notes/
---

Curious what’s new that you might find helpful as a cloud.gov user? Here are highlights from our platform updates over the past two weeks.
<!--more-->

### Added
* If you need to access multiple S3 buckets using the same credentials — for example to copy files between buckets — you can use the `additional_instances` option when binding. Read the docs to [learn more about how this works]({{ site.baseurl }}/docs/services/s3.md#using-s3-from-your-application).
* cloud.gov supports Oracle SE1 for relational databases. This is by request only until AWS GovCloud eventually supports SE2. You can read more about [relational database plans and how to request access to the Oracle service plan]({{ site.baseurl }}/docs/services/relational-database.md).
* We created [a page explaining prototyping packages]({{ site.baseurl }}/docs/pricing/prototyping.md), how you might use them, and what they cost.

### Changed
* If you have .NET applications you’re interested in running on cloud.gov, the updated [.NET Core buildpack](https://docs.cloudfoundry.org/buildpacks/dotnet-core/index.html) supports [.NET Core 2 Preview (currently in alpha)](https://blogs.msdn.microsoft.com/dotnet/2017/06/28/announcing-net-core-2-0-preview-2/). It’s ready for you to prototype with your .NET applications.

### Platform releases
We upgraded the Cloud Foundry deployment to [v267](https://github.com/cloudfoundry/cf-release/releases/tag/v267).

You should [restage your application](http://cli.cloudfoundry.org/en-US/cf/restage.html) to [incorporate fixes in the base filesystem](https://docs.cloudfoundry.org/devguide/deploy-apps/stacks.html#cli-commands) and ensure you’re running the most recent language version supported by your [buildpack](https://docs.cloudfoundry.org/buildpacks/).

#### Additional upgrades
* [RootFS cflinuxfs2 1.138.0](https://github.com/cloudfoundry/cflinuxfs2/releases/tag/1.138.0), which addresses this security vulnerability:
  * [CVE-2017-11103](http://people.ubuntu.com/~ubuntu-security/cve/CVE-2017-11103), service impersonation attack only affecting applications using or embedding Heimdal code before 7.4.
* [Diego v1.22.0](https://github.com/cloudfoundry/diego-release/releases/tag/v1.22.0)
* Stemcell
* Buildpack updates:
  * [PHP v4.3.29](https://github.com/cloudfoundry/php-buildpack/releases/tag/v4.3.29)
  * [.NET Core v1.0.21](https://github.com/cloudfoundry/dotnet-core-buildpack/releases/tag/v1.0.21)
  * [NodeJS v1.6.2](https://github.com/cloudfoundry/nodejs-buildpack/releases/tag/v1.6.2), which remediates [CVE-2017-1000381 - c-ares NAPTR parser out of bounds access](https://ubuntu.com/security/CVE-2017-1000381.html)
  * [Python v1.5.20](https://github.com/cloudfoundry/python-buildpack/releases/tag/v1.5.20)
  * [Staticfile v1.4.10](https://github.com/cloudfoundry/staticfile-buildpack/releases/tag/v1.4.10)
  * [Ruby v1.6.43](https://github.com/cloudfoundry/ruby-buildpack/releases/tag/v1.6.43)

### See Also

If you’re interested in details about recent dashboard updates, you can also see the [dashboard release notes](https://github.com/18F/cg-dashboard/releases).
