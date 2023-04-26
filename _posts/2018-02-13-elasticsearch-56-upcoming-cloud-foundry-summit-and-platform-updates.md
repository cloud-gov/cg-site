---
layout: post
date: "2018-02-13"
title: "Elasticsearch 5.6, upcoming Cloud Foundry Summit, and platform updates"
redirect_from:
  - /updates/2018-02-13-elasticsearch-56-upcoming-cloud-foundry-summit-and-platform-updates/
---

!["FEC case study illustration"]({{site.baseurl}}/assets/"fec-case-study-illo.svg")
### Announcements

- **In this featured [FEC Case Study]({{ site.baseurl }}/overview/customer-stories/fec/)**, find out how cloud.gov helps the agency ensure their applications are available, secure, and resilient. Want us to feature your agency? Drop us a line at [inquiries@cloud.gov](mailto:inquiries@cloud.gov?subject="Case%20Study").  
- **Join us at the [Cloud Foundry Summit](https://www.cloudfoundry.org/event/nasummit2018/)** on April 18-20 in Boston, MA. Members of the cloud.gov team will present at this gathering of people who use and run platforms—like cloud.gov—that are based on the Cloud Foundry open source project. It includes [government-focused sessions](https://cfna18.sched.com/overview/type/Government+%26+Wild+Card) and training opportunities that may be useful to you and your team.

### Added

- Elasticsearch version 5.6 is now available. This includes [performance improvements and new features](https://www.elastic.co/blog/elasticsearch-5-0-0-released). We recommend upgrading from version 2.4 to 5.6, but we don’t have near-term plans to end support for 2.4.  
- If your application involves multiple languages, and it’s not practical to split it into smaller applications, cloud.gov now has [improved support for multiple buildpacks]({{ site.baseurl }}/docs/apps/experimental/custom-buildpacks/#experimental-multi-buildpack-support)  

### Fixed

- [Upgrade to the latest version of the CF CLI tool v6.34.1](https://github.com/cloudfoundry/cli/releases/tag/v6.34.1) for improvements and bug fixes.  
- [If you deploy Docker containers]({{ site.baseurl }}/docs/apps/experimental/docker/), it’s now possible to push Docker images from an Azure container registry.  


### Buildpack updates

- [PHP Buildpack v4.3.46 &rarr; 4.3.48](https://github.com/cloudfoundry/php-buildpack/releases/tag/v4.3.48)
  - Added PHP 7.2.1
- [.NET Core Buildpack 1.0.25 &rarr; 2.0.1](https://github.com/cloudfoundry/dotnet-core-buildpack/releases/tag/v2.0.1)
  - .NET Core now defaults to 2.x
- [NodeJS Buildpack  1.6.13 &rarr; 1.6.15](https://github.com/cloudfoundry/nodejs-buildpack/releases/tag/v1.6.15)
  - Default NodeJS is now 6.x
  - Added 9.3.0
- [Python Buildpack 1.6.4 &rarr; 1.6.7](https://github.com/cloudfoundry/python-buildpack/releases/tag/v1.6.7)
- [Staticfile Buildpack 1.4.20 &rarr; 1.4.21](https://github.com/cloudfoundry/staticfile-buildpack/releases/tag/v1.4.21)
- [Java Buildpack 4.7.1 &rarr; 4.8](https://github.com/cloudfoundry/java-buildpack/releases/tag/v4.8)
  - Upgraded to openjdk JRE 1.8.0_162
- [Ruby Buildpack 1.7.8 &rarr; 1.7.11](https://github.com/cloudfoundry/ruby-buildpack/releases/tag/v1.7.11)
  - This resolves a bug with Rails `asset:precompile`.
  - Default Ruby is now 2.4
  - Removed Ruby 2.1


### Platform updates

  - [Stemcell v3468.15 &rarr; 3468.21](https://bosh.io/stemcells/bosh-aws-xen-hvm-ubuntu-trusty-go_agent)
  - CloudFoundry v283 &rarr; [Cloud Foundry Deployment cf-deployment v1.9.0]( https://github.com/cloudfoundry/cf-deployment/releases/tag/v1.9.0)
  - [Diego v1.32.0 &rarr; 1.34.0](https://github.com/cloudfoundry/diego-release/releases/tag/v1.34.0)
  - [RootFS cflinuxfs2 v1.176.0 &rarr; 1.187.0](https://github.com/cloudfoundry/stacks/releases/tag/1.187.0)
