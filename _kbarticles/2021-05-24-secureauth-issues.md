---
layout: post
title: "Trouble Logging in to cloud.gov"
date: May 20, 2021
excerpt: If you see an error while logging into cloud.gov, these tips can help you troubleshoot
---

## If you are using GSA's single sign on integration (SecureAuth)

When logging in to cloud.gov, you may encounter an error message that includes reference to `InResponseToField`. For example, something like:

```
InResponseToField of the Response doesn’t correspond to sent message {code}
```

This is typically caused by SecureAuth having an old certificate or session cookie in your browser, and is not related to the cloud.gov platform. 

Things you can check:

* You can verify this issue is affecting your login by opening a private or incognito session in your browser and retry logging in. 

* You can try clearing all cache and cookies, restart your browser, and retry logging in.

If these steps don't work, [GSA also has a tool that can clear these items](https://secureauth.gsa.gov/secureauth2/cleancert.aspx). Note - if you are a Mac user, this site will only work in Safari.

## If you are using the cloud.gov identity provider (IDP)

For users that log in with the cloud.gov IDP, if a user hasn't logged in in 90 days their account will be deactivated for security purposes. You should receive an email notice when a deactivation is imminent, and you may experience receiving SAML errors when logging in (even after a password reset).

Some things you can try:

* Clear your browser cookies and cache, and try again.
* If you think you have logged in during the previous 90 days, you can try a [password reset](https://cloud.gov/docs/getting-started/accounts/).
* If you think your account may have been deactivated, you can check your spam folder in the event that the notice was inadvertently routed there.

If your account was deactivated because of inactivity, your org manager must request a reactivation of your user account. Have your org manager send a request to [support@cloud.gov](mailto:support@cloud.gov) with the name and email address for the account that needs to be reactivated.
