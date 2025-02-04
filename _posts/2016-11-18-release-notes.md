---
layout: post
date: "2016-11-18"
title: "Platform Release Notes"
redirect_from:
  - /updates/2016-11-18-release-notes/
---

Curious what’s new that you might find helpful as a cloud.gov application developer? Here are highlights from our platform updates over the past four weeks.
<!--more-->

### Added
- cloud.gov supports the [.NET Core buildpack](https://docs.cloudfoundry.org/buildpacks/dotnet-core/index.html) ([learn about buildpacks]({{ site.baseurl }}/docs/getting-started/concepts#buildpacks)).
- You can [invite](https://account.fr.cloud.gov/invite) teammates who aren’t in agencies with supported single-sign-on authentication (GSA, EPA, FDIC). After you invite them, they can log in by creating a cloud.gov account with multi-factor authentication.
- The [dashboard](https://dashboard.fr.cloud.gov) shows the current memory, disk usage and quota limits for apps.
- You can create [deployer accounts]({{ site.baseurl }}/docs/apps/continuous-deployment#govcloud-environment-deployer-account-broker) programmatically.
- For FDIC users: you can log into cloud.gov using your agency single-sign-on credentials.

### Changed
- We upgraded Cloud Foundry (the underlying open source project that powers cloud.gov) to [Release v246](https://github.com/cloudfoundry/cf-release/releases/tag/v246), which includes updates to buildpacks and improvements for internal components.

### Security
You can [restage](https://docs.cloudfoundry.org/devguide/deploy-apps/start-restart-restage.html#restage) your application to incorporate the latest security fixes and ensure you’re running the most recent language version supported.

- The PHP buildpack update addresses USN-3095-1 (assorted PHP vulnerabilities) with PHP 5.6.27 and 7.0.12. The associated CVEs are CVE-2016-7124, CVE-2016-7125, CVE-2016-7127, CVE-2016-7128, CVE-2016-7129, CVE-2016-7130, CVE-2016-7131, CVE-2016-7132, CVE-2016-7133, CVE-2016-7134, CVE-2016-7411, CVE-2016-7412, CVE-2016-7413, CVE-2016-7414, CVE-2016-7416, CVE-2016-7417, CVE-2016-7418
- The Node buildpack update addresses USN-3087-1 (assorted OpenSSL vulnerabilities) with node 6.8.1 and 6.9.0. The associated CVEs are CVE-2016-2177, CVE-2016-2178, CVE-2016-2179, CVE-2016-2180, CVE-2016-2181, CVE-2016-2182, CVE-2016-2183, CVE-2016-6302, CVE-2016-6303, CVE-2016-6304, CVE-2016-6306
