---
layout: post
title: "Trouble Logging In to cloud.gov"
date: May 20, 2021
excerpt: If you see an error while logging into cloud.gov, these tips can help you troubleshoot
---

When logging in to cloud.gov, and using GSA's single sign on integration (SecureAuth), you may encounter an error message that includes reference to `InResponseToField`. For example, something like:

```
InResponseToField of the Response doesn’t correspond to sent message {code}
```

This is typically caused by SecureAuth having an old certificate or session cookie in your browser, and is not related to the cloud.gov platform. 

Things you can check:

* You can verify this issue is affecting your login by opening a private or incognito session in your browser and retry logging in. 

* You can try clearing all cache and cookies, restart your browser, and retry logging in.

If these steps don't work, [GSA also has a tool that can clear these items](https://secureauth.gsa.gov/secureauth2/cleancert.aspx). Note - if you are a Mac user, this site will only works in Safari.