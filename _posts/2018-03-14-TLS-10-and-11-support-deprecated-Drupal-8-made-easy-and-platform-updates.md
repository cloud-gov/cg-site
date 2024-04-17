---
layout: post
date: "2018-03-14"
title: "TLS 1.0 and 1.1 support removal, Drupal 8 made easy, and platform updates"
redirect_from:
  - /updates/2018-03-14-TLS-10-and-11-support-deprecated-Drupal-8-made-easy-and-platform-updates/
---

### Upcoming breaking change
- **We will remove support for TLS 1.0 and 1.1 connections to all applications on Cloud.gov on March 30, so that all connections must use TLS 1.2**. TLS 1.0 and 1.1 are outdated versions of the encryption protocol for HTTPS connections, and federal standards require federal systems to stop using them ([see FedRAMP TLS Requirements](https://www.fedramp.gov/assets/resources/documents/CSP_TLS_Requirements.pdf)). After this change, your applications will be inaccessible for anyone using a client device that requires TLS 1.1 or lower. We estimate this change will block less than 1 percent of traffic that reaches applications hosted on Cloud.gov today. It’s probably required for your applications by your own agency as well, but if you have any concerns or questions, please [contact us]({{ site.baseurl }}/docs/help/).

### Announcements

- **Join us at the [Cloud Foundry Summit](https://www.cloudfoundry.org/event/nasummit2018/)** on April 18-20 in Boston. Members of the Cloud.gov team will present at this gathering of people who use and run platforms—like Cloud.gov—that are based on the Cloud Foundry open source project. It includes [government-focused sessions](https://cfna18.sched.com/overview/type/Government+%26+Wild+Card) and training opportunities that may be useful to you and your team.

- **We invite research volunteers** to help us improve Cloud.gov. To participate, click on the embedded sign-up form at the bottom of the [home page](https://cloud.gov).


### Added

- **We’ve made a demo showing how easy it is to [deploy Drupal 8 to Cloud.gov](https://github.com/18F/cf-ex-drupal)**. 

- **We’ve provided [a guide]({{ site.baseurl }}/docs/compliance/auditing-activity/)** explaining how to generate audit logs for events such as role changes, service bindings, and 75+ other events.  

### Fixed

- **We’ve updated the [Overview for assessors]({{ site.baseurl }}/docs/compliance/for-assessors/) page** to clarify that logs are encrypted during transit and at rest.  


### Buildpack updates

- [PHP Buildpack 4.3.49](https://github.com/cloudfoundry/php-buildpack/releases/tag/v4.3.49)
  - Added PHP 7.1.14, 7.2.2, removed 7.1.12, 7.2.0
  - Upgraded Redis to 3.1.6
- [.NET Core Buildpack 2.0.2](https://github.com/cloudfoundry/dotnet-core-buildpack/releases/tag/v2.0.2)
  - Updated to allow manifest overrides  
- [Binary Buildpack 1.0.17](https://github.com/cloudfoundry/binary-buildpack/releases/tag/v1.0.17)
  - Now emits error message when no start command is given
- [NodeJS Buildpack 1.6.18](https://github.com/cloudfoundry/nodejs-buildpack/releases/tag/v1.6.18)
  - Added Node 6.13.0, removed Node 6.12.2
- [Go Buildpack 1.8.19](https://github.com/cloudfoundry/go-buildpack/releases/tag/v1.8.19)
  - Added Go 1.10
- [Python Buildpack 1.6.9](https://github.com/cloudfoundry/python-buildpack/releases/tag/v1.6.9)
  - Added Python 3.5.5, 3.4.8, removed 3.5.3, 3.4.6
- [Staticfile Buildpack 1.4.22](https://github.com/cloudfoundry/staticfile-buildpack/releases/tag/v1.4.22)
  - Enables custom 404 pages
  - Closes JSON bug with credentials
- [Ruby Buildpack 1.7.13](https://github.com/cloudfoundry/ruby-buildpack/releases/tag/v1.7.13)
  - Added Node 6.13.0, removed Node 6.12.3
  - Added RubyGems 2.7.6, removed 2.7.4
- [RootFS cflinuxfs2 1.188.0](https://github.com/cloudfoundry/cflinuxfs2/releases/tag/1.188.0)
  - USN-3577-1 cups vulnerabilities
  - USN-3569-1 libvorbis vulnerabilities 
  - USN-3554-1 curl vulnerabilities
- [Cloud Foundry Deployment 1.16.0](https://github.com/cloudfoundry/cf-deployment/releases/tag/v1.16.0)
  - Simplifies platform operations and maintenance, removes legacy properties 
- [Diego 2.0.0](https://github.com/cloudfoundry/diego-release/releases/tag/v2.0.0)
  - Upgraded to major version 2 release with better container scheduling, dependency management and all components now use mutual TLS
- [Stemcell 3541.9](https://github.com/cloudfoundry/bosh-linux-stemcell-builder/releases/tag/stable-3541.9)
  - USN-3594-1 Spectre variant 2 mitigation
  - USN-3582-2 Linux kernel vulnerabilities
