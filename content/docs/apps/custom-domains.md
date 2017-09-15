---
menu:
  docs:
    parent: advanced
title: Custom domains
---
By default, your application will be accessible via a subdomain of `app.cloud.gov`. You can make your application accessible via your own domain by creating entries in your own DNS system and configuring cloud.gov.

### How to set up a custom domain
To make your app accessible via your custom domain name, use the [CDN service]({{< relref "docs/services/cdn-route.md" >}}).

#### Addressing federal requirements and recommendations
* IPv6: cloud.gov ensures all applications are accessible over IPv6. You don't have to take any action.
* HTTPS: cloud.gov ensures all applications are accessible only over HTTPS with [HTTP Strict Transport Security (HSTS) headers](https://https.cio.gov/hsts/) in accordance with the [HTTPS-Only Standard](https://https.cio.gov/). You don't have to take any action.
  * [HSTS preloading](https://https.cio.gov/guide/#options-for-hsts-compliance): cloud.gov can't set up HSTS preloading for your domain. You need to set that up on your own.
* DNSSEC: cloud.gov can't configure DNSSEC in your DNS system. If you need DNSSEC, you are responsible for configuring it in your DNS system.

### How domains and routes work in cloud.gov

A "route" is a domain with an optional subdomain and path that maps client requests to a particular application, such as:

* `myapp.app.cloud.gov`
* `myapp.app.cloud.gov/test`
* `app.example.gov`
* `example.gov`

[Cloud Foundry's Routes and Domains documentation](https://docs.cloudfoundry.org/devguide/deploy-apps/routes-domains.html) explains the overall model and terminology that cloud.gov uses.

