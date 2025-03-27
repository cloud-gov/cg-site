---
layout: post
date: "2016-12-14"
title: "Platform Release Notes"
redirect_from:
  - /updates/2016-12-14-release-notes/
---

Curious what’s new that you might find helpful as a cloud.gov application developer? Here are highlights from our platform updates over the past two weeks.
<!--more-->

### Added
- New [dashboard](https://dashboard.fr.cloud.gov) features:
  - On an application page, you can now edit the number of application instances, instance memory, and disk quota.
  - Org and space level views now include a quick overview of the health of application instances.

### Changed
- We upgraded Cloud Foundry (the underlying open source project that powers cloud.gov) to [Release v249](https://github.com/cloudfoundry/cf-release/releases/tag/v249) (see also [Release v248](https://github.com/cloudfoundry/cf-release/releases/tag/v248)), which includes updates to buildpacks and improvements for internal components.
- Changes in Cloud Foundry require an upgrade to the latest version of the command line interface (CLI) client (`cf`) in order for `cf logs` to work properly. Please upgrade your local version to the [latest version](https://github.com/cloudfoundry/cli/releases/latest) ([installation instructions](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html)).

### Fixed
- The latest Cloud Foundry command line interface client ([available here](https://github.com/cloudfoundry/cli/releases/latest)) addresses an issue where inspecting application logs returned errors.
- We updated the cloud.gov account creation form to include previously-missing information about password requirements.

### Security
The Cloud Foundry upgrade included updates for the base filesystem used for running your application, addressing several security vulnerabilities in that filesystem. You can [restage your application](https://cli.cloudfoundry.org/en-US/cf/restage.html) to ensure you [incorporate fixes in the base filesystem](https://docs.cloudfoundry.org/devguide/deploy-apps/stacks.html#cli-commands) and are running the most recent language version supported by your [buildpack](https://docs.cloudfoundry.org/buildpacks/).

- [CVE-2016-6659: UAA Privilege Escalation](https://pivotal.io/security/cve-2016-6659).
- [CVE-2016-6816: Apache Tomcat Information Disclosure, UAA Tomcat updated to 8.0.39](https://tomcat.apache.org/security-9.html).
- USN-3142-1: ImageMagick vulnerabilities. The associated CVEs are CVE-2016-7799, CVE-2016-7906, CVE-2016-8677, CVE-2016-8862, CVE-2016-9556.
- USN-3139-1: Vim vulnerability. The associated CVE is CVE-2016-1248.
- USN-3134-1: Python vulnerabilities. The associated CVEs are CVE-2016-0772, CVE-2016-1000110, CVE-2016-5636, CVE-2016-5699.
- USN-3132-1: tar vulnerability. The associated CVE is CVE-2016-6321.
- USN-3131-1: ImageMagick vulnerabilities. The associated CVEs are CVE-2014-8354, CVE-2014-8355, CVE-2014-8562, CVE-2014-8716, CVE-2014-9805, CVE-2014-9806, CVE-2014-9807, CVE-2014-9808, CVE-2014-9809, CVE-2014-9810, CVE-2014-9811, CVE-2014-9812, CVE-2014-9813, CVE-2014-9814, CVE-2014-9815, CVE-2014-9816, CVE-2014-9817, CVE-2014-9818, CVE-2014-9819, CVE-2014-9820, CVE-2014-9821, CVE-2014-9822, CVE-2014-9823, CVE-2014-9826, CVE-2014-9828, CVE-2014-9829, CVE-2014-9830, CVE-2014-9831, CVE-2014-9833, CVE-2014-9834, CVE-2014-9835, CVE-2014-9836, CVE-2014-9837, CVE-2014-9838, CVE-2014-9839, CVE-2014-9840, CVE-2014-9841, CVE-2014-9843, CVE-2014-9844, CVE-2014-9845, CVE-2014-9846, CVE-2014-9847, CVE-2014-9848, CVE-2014-9849, CVE-2014-9850, CVE-2014-9851, CVE-2014-9853, CVE-2014-9854, CVE-2014-9907, CVE-2015-8894, CVE-2015-8895, CVE-2015-8896, CVE-2015-8897, CVE-2015-8898, CVE-2015-8900, CVE-2015-8901, CVE-2015-8902, CVE-2015-8903, CVE-2015-8957, CVE-2015-8958, CVE-2015-8959, CVE-2016-4562, CVE-2016-4563, CVE-2016-4564, CVE-2016-5010, CVE-2016-5687, CVE-2016-5688, CVE-2016-5689, CVE-2016-5690, CVE-2016-5691, CVE-2016-5841, CVE-2016-5842, CVE-2016-6491, CVE-2016-6823, CVE-2016-7101, CVE-2016-7513, CVE-2016-7514, CVE-2016-7515, CVE-2016-7516, CVE-2016-7517, CVE-2016-7518, CVE-2016-7519, CVE-2016-7520, CVE-2016-7521, CVE-2016-7522, CVE-2016-7523, CVE-2016-7524, CVE-2016-7525, CVE-2016-7526, CVE-2016-7527, CVE-2016-7528, CVE-2016-7529, CVE-2016-7530, CVE-2016-7531, CVE-2016-7532, CVE-2016-7533, CVE-2016-7534, CVE-2016-7535, CVE-2016-7536, CVE-2016-7537, CVE-2016-7538, CVE-2016-7539, CVE-2016-7540.

