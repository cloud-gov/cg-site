+++
date = "2017-02-27"
title = "Platform Release Notes: February 27, 2017"
+++

Curious what’s new that you might find helpful as a cloud.gov application developer? Here are highlights from our platform updates over the past two weeks.

<!--more-->

### Added
If you have an email address that ends in .gov, .mil, or .fed.us, you can now create your own cloud.gov account. Previously, anyone who wanted to use cloud.gov had to send us an email requesting an invite. Now, you can generate an invite just by entering your government email address at https://account.fr.cloud.gov/signup.

### Changed
- You can now configure broker instances that pass the original host to your application. This lets you set up relative redirects with your own domain name rather than with `*.app.cloud.gov`.
- The way you accept a cloud.gov invitation now requires one small extra step. Some government agencies use software that verifies URLs in incoming emails. This change prevents that software from causing invitations sent via email to expire before they could be used. Now, the URL in the email serves you a page with a `Redeem your invitation` button. You have to click the button to accept the invitation.

### Fixed
Your services now appear consistently in the web-based dashboard. Previously, the UI continued to act as if it was loading them without ever actually serving them to you.

### See also
- **Dashboard releases:** If you’re interested in details about recent dashboard updates, you can also see the [dashboard release notes](https://github.com/18F/cg-dashboard/releases).

- **Reminder to migrate apps to the new environment:** Now that cloud.gov is FedRAMP Authorized in our new environment, Amazon Web Services (AWS) GovCloud, we’re phasing out our original environment, AWS East/West. Apps on East/West need to migrate to the new environment by March 15th. We strongly suggest you start as soon as you can to allow for any unforeseen complications. For instructions on migrating, getting a list of all your apps, and accessing support, see [our GovCloud migration guidance]({{< relref="docs/apps/govcloud.md#migration" >}}).
