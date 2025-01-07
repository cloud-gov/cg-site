---
layout: post
title: "Trouble Logging in to cloud.gov"
date: May 20, 2021
excerpt: If you see an error while logging into cloud.gov, these tips can help you troubleshoot
---

## If you are using your agency's single sign on integration

Check the following:

* You can verify this issue is affecting your login by opening a private or incognito session in your browser and retry logging in. 

* You can try clearing all cache and cookies, restart your browser, and retry logging in.

If these steps don't work, and your agency identity provider works for other 
services, open an issue with [support@cloud.gov].

## If you are using the cloud.gov identity provider (IDP)

For users that log in with the cloud.gov IDP, if a user hasn't logged in in 90 days their account will be deactivated for security purposes. You should receive an email notice when a deactivation is imminent, and you may experience receiving SAML errors when logging in (even after a password reset).

Some things you can try:

* Clear your browser cookies and cache, and try again.
* If you think you have logged in during the previous 90 days, you can try a [password reset](https://cloud.gov/docs/getting-started/accounts/).
* If you think your account may have been deactivated, you can check your spam folder in the event that the notice was inadvertently routed there.

If your account was deactivated because of inactivity, your org manager must request a reactivation of your user account. Have your org manager send a request to [support@cloud.gov](mailto:support@cloud.gov) with the name and email address for the account that needs to be reactivated.
