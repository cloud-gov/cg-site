+++
date = "2017-03-13"
title = "Platform Release Notes: March 13, 2017"
+++

Curious what’s new that you might find helpful as a cloud.gov application developer? Here are highlights from our platform updates over the past two weeks.

<!--more-->

Here are highlights from our platform updates over the past two weeks.

### Added
- The dashboard now alerts you when errors occur fetching data from the cloud.gov API. This will make it easier to verify that the problem is missing data rather than something else.
- cloud.gov now exposes logs on port 443. Some government systems block access to other ports where logs were exposed, which was making it harder for users to debug.

### Removed

We removed the console, a previously deprecated forerunner to the dashboard. console.cloud.gov now redirects to the dashboard.

### Security

We upgraded the Cloud Foundry deployment to [v252](https://github.com/cloudfoundry/cf-release/releases/tag/v252). The base filesystem used for running your application has been updated to address several security vulnerabilities. You should [restage your application](http://cli.cloudfoundry.org/en-US/cf/restage.html) to [incorporate fixes in the base filesystem](https://docs.cloudfoundry.org/devguide/deploy-apps/stacks.html#cli-commands) and ensure you’re running the most recent language version supported by your [buildpack](https://docs.cloudfoundry.org/buildpacks/).

[USN-3193-1](https://www.ubuntu.com/usn/USN-3193-1/): Nettle vulnerability. The associated CVE is [2016-6489](http://people.ubuntu.com/~ubuntu-security/cve/CVE-2016-6489).

We have also upgraded the following buildpacks to versions newer than the subcomponents included in CF v252:

- staticfile_buildpack - 1.3.17
- java_buildpack - 3.13
- ruby_buildpack - 1.6.34
- nodejs_buildpack - 1.5.29
- go_buildpack - 1.7.18
- python_buildpack - 1.5.15
- php_buildpack - 4.3.27
- binary_buildpack - 1.0.9

These upgrades address 118 CVEs.

### See also

If you’re interested in details about recent dashboard updates, you can also see the [dashboard release notes](https://github.com/18F/cg-dashboard/releases).
