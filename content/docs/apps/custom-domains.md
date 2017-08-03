---
menu:
  docs:
    parent: advanced
title: Custom domains
---

### How to set up a custom domain
By default, your application receives a `*.app.cloud.gov` route. To put your app on your project's custom domain name, use the [CDN service]({{< relref "docs/services/cdn-route.md" >}}).

This supports IPv6. For all custom domains, we recommend incorporating [HTTPS-Only Standard guidance](https://https.cio.gov/), including [HSTS](https://https.cio.gov/hsts/) and [preloading](https://https.cio.gov/guide/#options-for-hsts-compliance). If your application requires DNSSEC, you are responsible for ensuring your custom domain is DNSSEC-enabled before following these instructions.

### Background knowledge

[Cloud Foundry's Routes and Domains documentation](https://docs.cloudfoundry.org/devguide/deploy-apps/routes-domains.html) explains the overall model and terminology that cloud.gov uses.

In short, a "route" is a path that can be mapped to an application, such as:

* `myapp.app.cloud.gov`
* `myapp.app.cloud.gov/test`
* `example.gov`
