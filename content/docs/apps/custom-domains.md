---
menu:
  docs:
    parent: advanced
title: Custom domains
---

To put your app on your project's custom domain name, use the [CDN service]({{< relref "docs/services/cdn-route.md" >}}).

This will automatically create and renew your HTTPS certificate, and it supports IPv6.

For all custom domains, we recommend incorporating [HTTPS-Only Standard guidance](https://https.cio.gov/), including [HSTS](https://https.cio.gov/hsts/) and [preloading](https://https.cio.gov/guide/#options-for-hsts-compliance).

If your application requires DNSSEC, you are responsible for ensuring your custom domain is DNSSEC-enabled before following these instructions.

For context, [Cloud Foundry's Routes and Domains documentation](https://docs.cloudfoundry.org/devguide/deploy-apps/routes-domains.html) explains the overall model and terminology that cloud.gov uses.

### GSA TTS

If you need to set up an app on a domain managed by GSA TTS, you may also be interested in [18F/dns](https://github.com/18F/dns).
