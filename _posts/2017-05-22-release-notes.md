---
layout: post
date: "2017-05-22"
title: "Platform Release Notes: May 22, 2017"
redirect_from:
  - /updates/2017-05-22-release-notes/
---

Curious what’s new that you might find helpful as a cloud.gov application developer? Here are highlights from our platform updates over the past two weeks.
<!--more-->

### Volunteers needed
The cloud.gov team is looking to make the cloud.gov platform easier to evaluate and use, and we’re recruiting volunteers to help us do that. If you’re interested, let us know at [inquiries@cloud.gov](mailto:inquiries@cloud.gov). We’ll ask you a few questions and ask you to walk us through using some aspect of the platform via screenshare.

### Added
- We’ve published a cost estimator spreadsheet (in [XLSX]({{ site.baseurl }}/resources/cloudgov_cost_estimator.xlsx) and [ODS]({{ site.baseurl }}/resources/cloudgov_cost_estimator.ods) formats) that your team can use to get a sense of how much cloud.gov will cost for your organization. If you’re interested in switching from a sandbox to a paid cloud.gov package, or if you want to expand your use of the platform to additional applications, use the estimator to get a sense of what the access package and usage quota fees will be across all your cloud.gov systems.
- The Defense Information Systems Agency (DISA) has issued a [provisional authorization for Department of Defense teams]({{ site.baseurl }}/docs/security/fedramp-tracker#how-this-p-ato-helps-your-team) to use cloud.gov’s FedRAMP P-ATO for systems at the DISA level 2 impact level. This is a followup to the P-ATO; Level 2 is equivalent to FedRAMP Moderate.
- The latest version of the PHP buildpack supports PHP 7.1.4 and 7.0.18.

### Fixed
We’ve improved our automated process for updating the part of cloud.gov that routes traffic to your application. Previously, you might have seen occasional 502 errors in your application when we made updates.

### Removed
The latest version of the PHP buildpack removes support for PHP 7.1.2 and 7.0.16. If your applications rely on one of these versions, **update your application** to use a supported version of PHP.

### Platform releases
We upgraded the Cloud Foundry deployment to [v258](https://github.com/cloudfoundry/cf-release/releases/tag/v258). This upgrade addresses these security vulnerabilities:
- [CVE-2017-4972: Blind SQL Injection in UAA](https://www.cloudfoundry.org/cve-2017-4972/)
- [CVE-2017-4973: Privilege Escalation in UAA](https://www.cloudfoundry.org/cve-2017-4973/)

**[Restage your application](http://cli.cloudfoundry.org/en-US/cf/restage.html)** to [incorporate fixes in the base filesystem](https://docs.cloudfoundry.org/devguide/deploy-apps/stacks.html#cli-commands) and ensure you’re running the most recent language version supported by your buildpack.

#### Additional upgrades
- [PHP buildpack 4.3.31](https://github.com/cloudfoundry/php-buildpack/releases/tag/v4.3.31)
- [Go buildpack 1.8.1](https://github.com/cloudfoundry/go-buildpack/releases/tag/v1.8.1)
- [Python buildpack 1.5.18](https://github.com/cloudfoundry/python-buildpack/releases/tag/v1.5.18)
- [Staticfile buildpack 1.4.5](https://github.com/cloudfoundry/staticfile-buildpack/releases/tag/v1.4.5)
- [Java buildpack 3.16](https://github.com/cloudfoundry/java-buildpack/releases/tag/v3.16)
- [RootFS cflinuxfs2 1.119.0](https://github.com/cloudfoundry/cflinuxfs2/releases/tag/1.119.0), which address vulnerabilities described in these security notices:
  - [USN-3271-1: Libxslt vulnerabilities](https://www.ubuntu.com/usn/USN-3271-1/)
  - [USN-3274-1: ICU vulnerabilities](https://www.ubuntu.com/usn/USN-3274-1/)
  - [USN-3276-1: shadow vulnerabilities](https://www.ubuntu.com/usn/USN-3276-1/)
  - [USN-3282-1: FreeType vulnerabilities](https://www.ubuntu.com/usn/USN-3282-1/)
  - [USN-3283-1: rtmpdump vulnerabilities](https://www.ubuntu.com/usn/USN-3283-1/)
- [Diego 1.15.3](https://github.com/cloudfoundry/diego-release/releases/tag/v1.15.3)
- Stemcell 3312.24, which address vulnerabilities described in this security notice:
  - [USN-3265-2: Linux kernel (Xenial HWE) vulnerabilities](https://www.ubuntu.com/usn/usn-3265-2/)

### See also

If you’re interested in details about recent dashboard updates, you can also see the [dashboard release notes](https://github.com/18F/cg-dashboard/releases).
