---
layout: post
date: "2017-08-31"
title: "cloud.gov platform release notes, plus join our workshop on September 28"
redirect_from:
  - /updates/2017-08-31-release-notes-plus-join-september-workshop/
---

Curious what’s new that you might find helpful as a cloud.gov user? Here are highlights from our platform updates over the past two weeks.

### Announcements

**cloud.gov Workshop:** [You’re invited to our free cloud.gov workshop on September 28th](https://www.digitalgov.gov/event/hands-on-workshop-with-cloud-gov/). If you’re evaluating cloud.gov or getting started with it, you will learn how to use cloud.gov to launch applications and get the power and advantages that come from using a Platform as a Service. Bring a laptop if you're coming in-person or join us online to learn how cloud.gov can work for you.

**cloud.gov authentication moving to OMB MAX:** If you use a cloud.gov account (not if you use EPA, FDIC, or GSA single sign-on login), [read our August 22 update about our plan to migrate your account’s authentication to OMB MAX]({{ site.baseurl }}/updates/2017-08-21-max-gov-migration-instructions/). We’ll notify you at least three weeks before we make the switch. You can create your MAX account any time. We encourage you to do it soon so you’re set well in advance.

### Added

* Inline messages provide guidance on what roles are required to add or modify users on the dashboard.

### Fixed

* In the dashboard, users who are already added to your spaces will not show up in the drop down list of users.
* Previously, users who were added to cloud.gov from a space page on the dashboard did not immediately appear in the list of users for that space

### In case you missed it

[Our latest quarterly newsletter is out]({{ site.baseurl }}/updates/2017-08-11-continuous-improvement-more-tools-help-use-cloud-gov/) and features stories about how two of our customers, FEC and FBI, used the platform. Do you know of an app on cloud.gov more people should be aware of? [Let us know](mailto:inquiries@cloud.gov) what the app is and we’ll reach out to learn more about it.

### Platform releases
We upgraded the Cloud Foundry deployment to [v271](https://github.com/cloudfoundry/cf-release/releases/tag/v271).

You should [restage your application]({{ site.baseurl }}/docs/apps/app-maintenance) to [incorporate fixes in the base filesystem](https://docs.cloudfoundry.org/devguide/deploy-apps/stacks.html#cli-commands) included with this release and ensure you’re running the most recent language version supported by your [buildpack](https://docs.cloudfoundry.org/buildpacks/).

#### Additional upgrades

* [RootFS cflinux2 v1.150.0](https://github.com/cloudfoundry/stacks/releases/tag/1.150.0)
* Remediates all 8 CVEs contained in USN-3398-1
* [Diego v1.25.1](https://github.com/cloudfoundry/diego-release/releases/tag/v1.25.1)
* Stemcell 3445.2
* Remediates USN-3392-2: Linux kernel (Xenial HWE) regression
* Buildpack updates
  - [PHP v4.3.40](https://github.com/cloudfoundry/php-buildpack/releases/tag/v4.3.40)
  - [.NET Core v1.0.24](https://github.com/cloudfoundry/dotnet-core-buildpack/releases/tag/v1.0.24)
  - [Binary v1.0.14](https://github.com/cloudfoundry/binary-buildpack/releases/tag/v1.0.14)
  - [NodeJS v1.6.6](https://github.com/cloudfoundry/nodejs-buildpack/releases/tag/v1.6.6)
  - [Python v1.5.24](https://github.com/cloudfoundry/python-buildpack/releases/tag/v1.5.24)
  - [Staticfile v1.4.13](https://github.com/cloudfoundry/staticfile-buildpack/releases/tag/v1.4.13)
  - [Ruby v1.6.47](https://github.com/cloudfoundry/ruby-buildpack/releases/tag/v1.6.47)
