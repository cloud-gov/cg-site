---
layout: post
date: "2017-08-22"
title: "Announcement: cloud.gov accounts will migrate to OMB MAX"
redirect_from:
  - /updates/2017-08-21-max-gov-migration-instructions/
---

## Note: This page is out of date as of Nov. 2017. cloud.gov is no longer migrating any users to OMB MAX.

cloud.gov is migrating all users with native cloud.gov accounts (not users with an agency single sign on provider) to use OMB MAX for authentication to the platform. This page is a guide to what will change and how you can prepare for this transition. **We will post future updates on timing at [{{ site.baseurl }}/updates/]({{ site.baseurl }}/updates/) and by email.**

## What’s changing?

Right now, there are two ways to log in to cloud.gov: either you use your agency’s credentials or a cloud.gov account. This change *only affects users with a cloud.gov account*.

Soon, we will switch these users to use OMB MAX to log in to cloud.gov. We’re making this change to make managing your account easier for you and your agency. We don't have a definitive deadline yet but we will give you __at least three weeks notice__ before we make the switch.

## What does this mean for me?

**If you already use your agency’s single sign-on (SSO) to log in to cloud.gov:** There is nothing further you need to do. Currently agencies using SSO are EPA, GSA, and FDIC. These customers will continue to log in as usual.

**If you use a cloud.gov account and already have a MAX account:** Double check that you can log in successfully to MAX using a PIV/CAC card or username and password with a Secure+ SMS 2-factor device.

**If you use a cloud.gov account to log in and don’t have a MAX account:** You need to create a MAX account with your PIV/CAC card or username and password with a Secure+ 2-factor device. Once we switch, you’ll be required to use that account to login to cloud.gov and all associated services. *You can create your account at any time.*

To create a MAX account:

* Go to [login.max.gov](https://login.max.gov), if you see your agency's logo, click it and sign in with your agency credentials.
* Go to [login.max.gov](https://login.max.gov), if you don't see your agency's logo, click the green Register Now button in the top right corner.
  * Register with a PIV/CAC card if you have one and a working card reader
  * Register with a username, password, and a Secure+ 2-factor device to your account if you don't have a card reader.

### What about contractors?

If you're a contractor with a federal agency email address, you should be able to self-register just like federal employees. If you're a contractors or working with cloud.gov without a government email address, you’ll need to ask your agency to [contact OMB MAX directly](https://max.gov/maxportal/home.action) to create your account for you.

## Prepare for the switch

You can create your account anytime and it only takes a few minutes. We encourage you to do it soon so you're prepared when we do switch.

After the switch, you won’t be able to login with your cloud.gov account. If you don’t make a MAX account before then, your apps, orgs, and spaces will not go away but you won’t be able to login to either the dashboard or the CLI. Once you create a MAX account, you’ll regain access.

## What is OMB MAX?

OMB MAX is a governmentwide collaboration platform with an authentication system agencies can use to log in to other shared services. MAX.gov also enables using a PIV/CAC card to log in to web services.

Though we currently use multi-factor authentication for all cloud.gov accounts, switching to MAX accounts enables agencies which require PIV/CAC cards for login to use cloud.gov more easily. MAX also makes it easier for agencies to meet their own compliance requirements for users of cloud.gov by implementing single sign-on with agency services. For most users, this will provide a better user experience by not having a separate login and second factor to keep track of for cloud.gov.

If you have questions about logging into cloud.gov, please [email us]({{ site.baseurl }}/docs/help/). For questions about MAX.gov and setting up your account, [contact OMB MAX directly](https://max.gov/maxportal/webPage/contactUs.action). We appreciate your patience and cooperation as we work to implement MAX authentication with cloud.gov.
