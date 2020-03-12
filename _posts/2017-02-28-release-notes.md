---
layout: post
date: "2017-02-28"
title: "Platform Release Notes: February 28, 2017"
redirect_from:
  - /updates/2017-02-28-release-notes/
---

Curious what’s new that you might find helpful as a cloud.gov application developer? Here are highlights from our platform updates over the past two weeks.

<!--more-->

### Added
People who have a federal government email address can create a free sandbox space using https://account.fr.cloud.gov/signup. Previously, they had to send an email requesting an invite.

### Changed
- You can configure CDN instances that pass the original host to your application. This lets you set up relative redirects with your own domain name rather than with `*.app.cloud.gov`. Related, the [commands for creating a new CDN service instance]({{ site.baseurl }}/docs/services/cdn-route#how-to-create-an-instance-of-this-service) have changed slightly.
- To accept a cloud.gov invitation, you have to click a button after visiting the link in the invitation email. This prevents invitations from expiring before use. Some government agencies use services that scan URLs in incoming emails by automatically clicking them, which caused earlier invites to expire before they could be used.

### Fixed
Available services appear consistently in the [cloud.gov dashboard](https://dashboard.fr.cloud.gov). Previously, the UI sometimes acted as though it was loading them without ever serving them to you.

### See also
If you’re interested in details about recent dashboard updates, you can also see the [dashboard release notes](https://github.com/18F/cg-dashboard/releases).
