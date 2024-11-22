---
layout: post
date: "2016-11-30"
title: "Platform Release Notes"
redirect_from:
  - /updates/2016-11-30-release-notes/
---

Curious what’s new that you might find helpful as a cloud.gov application developer? Here are highlights from our platform updates over the past two weeks.
<!--more-->

### Added
- The [dashboard](https://dashboard.fr.cloud.gov) now allows restarting of apps from the app page.

### Changed
- We upgraded Cloud Foundry (the underlying open source project that powers cloud.gov) to [Release v247](https://github.com/cloudfoundry/cf-release/releases/tag/v247), which includes updates to buildpacks and improvements for internal components. 

### Fixed
- **Dashboard**: We fixed an [issue](https://github.com/18F/cg-dashboard/issues/672) that prevented creating service instances on the marketplace page.

### Security
The base filesystem used for running your application has been updated to address several security vulnerabilities. You can [restage your application](http://cli.cloudfoundry.org/en-US/cf/restage.html) to ensure you [incorporate fixes in the base filesystem](https://docs.cloudfoundry.org/devguide/deploy-apps/stacks.html#cli-commands) and are running the most recent language version supported by your [buildpack](https://docs.cloudfoundry.org/buildpacks/).

- [USN-3116-1: DBus vulnerabilities](https://www.ubuntu.com/usn/usn-3116-1/). The associated CVE is CVE-2015-0245
- [USN-3117-1: GD library vulnerabilities](https://www.ubuntu.com/usn/usn-3117-1/). The associated CVEs are CVE-2016-6911, CVE-2016-7568, CVE-2016-8670
- [USN-3119-1: Bind vulnerability](https://www.ubuntu.com/usn/usn-3119-1/). The associated CVE is CVE-2016-8864
- [USN-3123-1: curl vulnerabilities](https://www.ubuntu.com/usn/usn-3123-1/). The associated CVEs are CVE-2016-7141, CVE-2016-7167, CVE-2016-8615, CVE-2016-8616, CVE-2016-8617, CVE-2016-8618, CVE-2016-8619, CVE-2016-8620, CVE-2016-8621, CVE-2016-8622, CVE-2016-8623, CVE-2016-8624
