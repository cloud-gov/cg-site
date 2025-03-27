---
layout: post
date: "2017-02-01"
title: "Platform Release Notes: February 1, 2017"
redirect_from:
  - /updates/2017-02-01-release-notes/
---

Curious what’s new that you might find helpful as a cloud.gov application developer? Here are highlights from our platform updates over the past six weeks.
<!--more-->

### Added
- cloud.gov account holders in the GovCloud environment get automated notifications of expiring passwords, starting ten days before expiration.
- The dashboard provides a start button for stopped apps (on the app page).

### Changed
- The dashboard homepage shows a more detailed summary of all your orgs, spaces, and apps.

### Fixed
- In the dashboard on the app page’s route creation panel, available domains now appear instead of returning an error.

### Security
We upgraded the Cloud Foundry deployment to [v251](https://github.com/cloudfoundry/cf-release/releases/tag/v251). The base filesystem used for running your application has been updated to address several security vulnerabilities. You should [restage your application](http://cli.cloudfoundry.org/en-US/cf/restage.html) to [incorporate fixes in the base filesystem](https://docs.cloudfoundry.org/devguide/deploy-apps/stacks.html#cli-commands) and ensure you’re running the most recent language version supported by your buildpack.

- USN-3172-1: Bind vulnerabilities. The associated CVEs are CVE-2016-9131,  CVE-2016-9147,  CVE-2016-9444.

### See also

If you’re interested in details about recent dashboard updates, you can also see the [dashboard release notes](https://github.com/18F/cg-dashboard/releases).
