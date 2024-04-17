---
layout: post
date: "2017-03-27"
title: "Platform Release Notes: March 27, 2017"
redirect_from:
  - /updates/2017-03-27-release-notes/
---

Curious what’s new that you might find helpful as a Cloud.gov application developer? Here are highlights from our platform updates over the past two weeks.

<!--more-->

### Added
When you create a [Cloud.gov identity provider service instance]({{ site.baseurl }}/docs/services/cloud-gov-identity-provider/), you can now add scopes from a whitelist of approved scopes. This makes it easier to enable specific permissions and access for additional types of users in your applications.

### Changed
We recommend updating to the [latest version (6.25)](https://github.com/cloudfoundry/cli/releases/tag/v6.25.0) of the Cloud Foundry command line interface (CLI). This can prevent errors when using the cf CLI. You can check your currently-installed version using `cf -v`

### Fixed
The Cloud.gov dashboard’s loading icon no longer displays after pages finish loading. Before, they would continue indefinitely.

### Deprecated
- On March 15th, we deprecated support for building and deployment on the Cloud.gov East/West environment. This is in preparation for an upcoming shutdown of that environment. We are supporting a few customers in the process of migrating from East/West to GovCloud, but in all other cases we now support the GovCloud environment exclusively.
- The latest Go buildpack deprecates support for Go 1.6. The next Go release will remove support for 1.6.

### Removed
The latest Go buildpack no longer supports Go 1.5.

### Security
We upgraded the Cloud Foundry deployment to [v254](https://github.com/cloudfoundry/cf-release/releases/tag/v254). We have also upgraded the following buildpacks to versions newer than the buildpacks included in CF v254:

- [php buildpack 4.3.29](https://github.com/cloudfoundry/php-buildpack/releases/tag/v4.3.29)
- [.NET Core buildpack 1.0.13](https://github.com/cloudfoundry/dotnet-core-buildpack/releases/tag/v1.0.13)

As part of the Cloud Foundry upgrade, the base filesystem used for running your application has been updated to address several security vulnerabilities. You should [restage your application](http://cli.cloudfoundry.org/en-US/cf/restage.html) to [incorporate fixes in the base filesystem](https://docs.cloudfoundry.org/devguide/deploy-apps/stacks.html#cli-commands) and ensure you’re running the most recent language version supported by your [buildpack](https://docs.cloudfoundry.org/buildpacks/).

- [USN-3183-2: GnuTLS vulnerability](https://www.ubuntu.com/usn/usn-3183-2/)
- [USN-3189-2: Linux kernel (Xenial HWE) vulnerabilities](https://www.ubuntu.com/usn/usn-3189-2/)
- [USN-3213-1: GD library vulnerabilities](https://www.ubuntu.com/usn/USN-3213-1/)
- [USN-3220-2: Linux kernel (Xenial HWE) vulnerability](https://www.ubuntu.com/usn/usn-3220-2/)
- [USN-3222-1: ImageMagick vulnerabilities](https://www.ubuntu.com/usn/USN-3222-1/)
- [USN-3225-1: libarchive vulnerabilities](https://www.ubuntu.com/usn/USN-3225-1/)
- [USN-3227-1: ICU vulnerabilities](https://www.ubuntu.com/usn/USN-3227-1/)
- [USN-3232-1: ImageMagick vulnerabilities](https://www.ubuntu.com/usn/USN-3232-1/)
- [USN-3235-1: libxml2 vulnerabilities](https://www.ubuntu.com/usn/USN-3235-1/)
- [USN-3237-1: FreeType vulnerability](https://www.ubuntu.com/usn/usn-3237-1/)
- [USN-3239-1: GNU C Library vulnerabilities](https://www.ubuntu.com/usn/usn-3239-1/)

### See also

If you’re interested in details about recent dashboard updates, you can also see the [dashboard release notes](https://github.com/18F/cg-dashboard/releases).
