---
layout: post
date: "2017-09-12"
title: "High availability Redis, our upcoming workshop, and more from cloud.gov"
redirect_from:
  - /updates/2017-09-12-high-availability-redis-upcoming-workshop-more-from-cloud-gov/
---

Curious what’s new that you might find helpful as a cloud.gov user? Here are highlights from our platform updates over the past two weeks.

### Announcements

**Reminder:** [Our workshop is coming up on September 28th](https://www.digitalgov.gov/event/hands-on-workshop-with-cloud-gov/). If you’re evaluating cloud.gov or getting started with it, you will learn how to use cloud.gov to launch applications and get the power and advantages that come from using a Platform as a Service. Bring a laptop if you're coming in-person or join us online to learn how cloud.gov can work for you. [Register now if you’d like to attend!](https://www.eventbrite.com/e/hands-on-workshop-with-cloudgov-registration-36963135734)

### Added
* [Redis 3.2]({{ site.baseurl }}/docs/services/redis), including both standard and high availability versions, are now available! If you use Redis, we encourage you to upgrade your application to use these beta version 3.2 services instead of the older alpha version 2.8 service.
* The [.NET Core buildpack](https://docs.cloudfoundry.org/buildpacks/dotnet-core/index.html#cli-tools) includes support for .NET Core 2.0. The[ 2.0 SDK is now the default](https://github.com/cloudfoundry/dotnet-core-buildpack/releases/tag/v1.0.25) for C# and Visual Basic apps. .NET Core 2.0 supports [.NET Standard 2.0](https://docs.microsoft.com/en-us/dotnet/api/?view=netstandard-2.0), more than doubling that set of APIs available for your .NET projects on cloud.gov.
* Updated documentation about how to [securely authenticate your communication with external services]({{ site.baseurl }}/docs/apps/static-egress).

### Deprecated
* Redis version 2.8 is no longer supported and will eventually be unavailable. Please migrate to version 3.2 as soon as possible and watch upcoming release notes for news about this service’s end of life.

### Fixed
* In the dashboard, org managers are now able to properly adjust user roles in their spaces.
* Some marketplace services cannot be configured via the dashboard. The dashboard now directs you to instructions for using the CLI to provision the service.

### Platform releases
We upgraded the Cloud Foundry deployment to [v272](https://github.com/cloudfoundry/cf-release/releases/tag/v272).

You should [restage your application]({{ site.baseurl }}/docs/apps/app-maintenance) to [incorporate fixes in the base filesystem](https://docs.cloudfoundry.org/devguide/deploy-apps/stacks.html#cli-commands) included with this release and ensure you’re running the most recent language version supported by your [buildpack](https://docs.cloudfoundry.org/buildpacks/).

#### Additional upgrades
* [Diego v1.25.3](https://github.com/cloudfoundry/diego-release/releases/tag/v1.25.3)
* [Stemcell v3445.7](https://bosh.io/stemcells/bosh-aws-xen-hvm-ubuntu-trusty-go_agent)
* Buildpacks:
  * [.NET Core v1.0.25](https://github.com/cloudfoundry/dotnet-core-buildpack/releases/tag/v1.0.25)
  * [Go v1.8.7](https://github.com/cloudfoundry/go-buildpack/releases/tag/v1.8.7)
  * [Staticfile v1.4.14](https://github.com/cloudfoundry/staticfile-buildpack/releases/tag/v1.4.14)
