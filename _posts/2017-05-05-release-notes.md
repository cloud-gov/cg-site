---
layout: post
date: "2017-05-05"
title: "Platform Release Notes: May 5, 2017"
redirect_from:
  - /updates/2017-05-05-release-notes/
---

Curious what’s new that you might find helpful as a cloud.gov application developer? Here are highlights from our platform updates over the past five weeks.

<!--more-->

### Changed
- [logs.fr.cloud.gov](https://logs.fr.cloud.gov), where you can view and search your logs on the web, has been upgraded to a newer version of Kibana (the open source project that powers the log viewer). The new version includes bug fixes and provides a slightly different look. For help navigating the new interface, [start with our logs documentation]({{ site.baseurl }}/docs/apps/logs/#web-based-logs-with-historic-log-data). The [Kibana user guide](https://www.elastic.co/guide/en/kibana/current/index.html) provides more information about the most recent version.
- You can now [migrate to the cloud.gov CDN broker]({{ site.baseurl }}/docs/services/cdn-route/#how-to-set-up-dns) with zero downtime. You can create a TXT record to be validated by Let’s Encrypt before you migrate, whereas before you needed to start by pointing your domain at the cloud.gov CDN to create a certificate.
- cloud.gov’s web-based [dashboard](https://dashboard.fr.cloud.gov/) now provides more useful information if you have an empty org or space. For example, if you’re the only user in your organization, the dashboard gives you more information about inviting new users.

### Deprecated
Python 3.3 has been deprecated with an anticipated end-of-life (EOL) in October 2017. The latest Python buildpacks no longer include 3.3.

### Removed
[Ruby 2.1 is now at EOL.](https://www.ruby-lang.org/en/news/2017/04/01/support-of-ruby-2-1-has-ended/) If your app relies on Ruby 2.1 it will stop working following your next push. You should upgrade as soon as possible.

### Production releases
We upgraded the Cloud Foundry deployment to [v257](https://github.com/cloudfoundry/cf-release/releases/tag/v257). This addresses several security vulnerabilities. You should [restage your application](http://cli.cloudfoundry.org/en-US/cf/restage.html) to [incorporate fixes in the base filesystem](https://docs.cloudfoundry.org/devguide/deploy-apps/stacks.html#cli-commands) and ensure you’re running the most recent language version supported by your buildpack.

#### Additional upgrades
- [PHP buildpack 4.3.30](https://github.com/cloudfoundry/php-buildpack/releases/tag/v4.3.30)
- [.NET Core buildpack 1.0.15](https://github.com/cloudfoundry/dotnet-core-buildpack/releases/tag/v1.0.15)
- [NodeJS buildpack 1.5.32](https://github.com/cloudfoundry/nodejs-buildpack/releases/tag/v1.5.32)
- [Go buildpack 1.8.0](https://github.com/cloudfoundry/go-buildpack/releases/tag/v1.8.0)
- [Python buildpack 1.5.17](https://github.com/cloudfoundry/python-buildpack/releases/tag/v1.5.17)
- [Staticfile buildpack 1.4.4](https://github.com/cloudfoundry/staticfile-buildpack/releases/tag/v1.4.4)
- [Ruby buildpack 1.6.37](https://github.com/cloudfoundry/ruby-buildpack/releases/tag/v1.6.37)
- [Diego 1.14.1](https://github.com/cloudfoundry/diego-release/releases/tag/v1.14.1)
- [RootFS cflinuxfs2 1.115.0](https://github.com/cloudfoundry/cflinuxfs2/releases/tag/1.115.0), which address vulnerabilities described in these security notices:
    - [USN-3246-1: Eject vulnerability](https://www.ubuntu.com/usn/usn-3246-1/)
    - [USN-3259-1: Bind vulnerabilities](https://www.ubuntu.com/usn/usn-3259-1/)
    - [USN-3263-1: FreeType vulnerability](https://www.ubuntu.com/usn/usn-3263-1/)    
- Stemcell 3312.23, which address vulnerabilities described in these security notices:
  - [USN-3249-2: Linux kernel (Xenial HWE) vulnerability](hhttps://www.ubuntu.com/usn/usn-3249-2/)
  - [USN-3256-1: Linux kernel vulnerability](https://www.ubuntu.com/usn/usn-3256-1/)

### See also

If you’re interested in details about recent dashboard updates, you can also see the [dashboard release notes](https://github.com/18F/cg-dashboard/releases).
