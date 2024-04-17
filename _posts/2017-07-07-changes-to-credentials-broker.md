---
layout: post
date: "2017-07-07"
title: "New instructions for service account and identity provider services"
redirect_from:
  - /updates/2017-07-07-changes-to-credentials-broker/
---

If you use the [Cloud.gov identity provider]({{ site.baseurl }}/docs/services/cloud-gov-identity-provider)
or [Cloud.gov service account]({{ site.baseurl }}/docs/services/cloud-gov-service-account) services, check out their new instructions for obtaining credentials from new instances of these services.

We've updated these services to give you credentials directly (using "service keys"), without needing to use temporary links from [Toaster (formerly Fugacious)](https://fugacious.18f.gov/). This simplifies how you set up these services, and it enables you to access the service credentials any time you need to.

**Previously:** You provisioned a service instance to create a service account or identity provider, then accessed the credentials using a temporary link from Toaster (Fugacious).

**Now:** Now you provision a service instance, then bind it to a service key to create a service account or identity provider. You access credentials for that service key directly from the Cloud.gov command line (CF CLI). If you want another service account or identity provider for the same space, you can bind it to another service key.

Existing service accounts and identity providers will continue to work as normal (your existing credentials for existing service instances continue to work, so your deployments and authentication won’t be disrupted).

To switch to using this new method for getting credentials, delete your service instances and create new ones.

