---
parent: services
layout: docs
sidenav: true
title: External domain service
name: "external-domain-service"
description: "Custom domains and TLS certificates with automatic renewal"
status: "Production Ready"
---

This service provides two different plans allowing you to use custom domains for your apps running on cloud.gov.

Both plans offer:
1. Custom domain support, so that your application can have your domain instead of the default `*.app.cloud.gov` domain.
1. HTTPS support via free TLS certificates with auto-renewal (using [Let's Encrypt](https://letsencrypt.org/)), so that user traffic is encrypted.

The domain-with-cdn plan also provides Content Distribution Network (CDN) caching (using [AWS CloudFront](https://aws.amazon.com/cloudfront/)), for
fast delivery of content to your users.

## Plans

Plan Name         | Plan Description                                                                      |
------------------|---------------------------------------------------------------------------------------|
`domain`          | (Coming soon) Custom domain with automatically renewing ssl certificate.              |
`domain-with-cdn` | Caching distributed CDN with custom domain and automatically renewing ssl certificate |

## Before you use the domain-with-cdn plan

### Compliance impact

When you use cloud.gov in general, your application inherits the compliance of the cloud.gov FedRAMP P-ATO, which inherits compliance from the AWS GovCloud FedRAMP P-ATO. This service is a little different. When you use this service, you opt into using an AWS service (CloudFront) that is not in the cloud.gov FedRAMP P-ATO boundary, but is in the AWS Commerical FedRAMP P-ATO boundary (see [Services in Scope](https://aws.amazon.com/compliance/services-in-scope/)).

You are responsible for obtaining appropriate authorization from your agency to use CloudFront for your system. The appropriate steps depend on your agency; they may include discussing this with your Authorizing Official and documenting it as part of your ATO (for example as part of [SC-12](https://nvd.nist.gov/800-53/Rev4/control/SC-12) or [SA-9](https://nvd.nist.gov/800-53/Rev4/control/SA-9)).

### Technical considerations

Before setting up this service, review [how the CDN works](#more-about-how-the-cdn-works)

## CNAME and ALIAS records

This service requires you to create a CNAME or ALIAS record, and these are slightly different. The exact difference is beyond the scope of this article,
but what is important to note is that if your domain is an `apex` domain, that is it has only one one dot (e.g. `example.gov`, `my-agency.gov`) you cannot use
ALIAS records, but not all DNS providers offer ALIAS records. These are limitations in the DNS specification, and not specific to this service. 


## Options

`domain` plan

Name      | Required   | Description                   | Default | Example                           |
----------|------------|-------------------------------|---------|-----------------------------------|
`domains` | *Required* | Your custom domain or domains | (None)  | `my-domain.gov,www.my-domain.gov` |

`domain-with-cdn` plan

Name      | Required   | Description                   | Default | Example                           |
----------|------------|-------------------------------|---------|-----------------------------------|
`domains` | *Required* | Your custom domain or domains | (None)  | `my-domain.gov,www.my-domain.gov` |


## How to create an instance of this service

1. For each of the domains you want to add to the service, create a DNS CNAME or ALIAS record in the form `_acme-challenge.${DOMAIN}` with a
   value `_acme-challenge.${DOMAIN}.external-domains-production.cloud.gov`. For example, if you wanted to set up a service for `www.example.gov` and `example.gov`,
   you'd start by creating the CNAME or ALIAS records for `_acme-challenge.www.example.gov` with value `_acme-challenge.www.example.gov.external-domains-production.cloud.gov`
   and a record for `_acme-challenge.example.gov` with value `_acme-challenge.example.gov.external-domains-production.cloud.gov`. These will be validated upon
   service creation, so be sure to set these up ahead of time.
2. Optional: Complete this step now only for sites that have not yet lauched, or for sites that can withstand downtime. For each of the domains you want to add to
   the service, create a DNS CNAME or ALIAS record in the form `${DOMAIN}.external-domains-production.cloud.gov`. For example, if you wanted to set up a service for 
   `www.example.gov` and `example.gov`, you'd create an ALIAS record for `www.example.gov` with value `www.example.gov.external-domains-production.cloud.gov` and an
   ALIAS record for `example.gov` with value `example.gov.external-domains-production.cloud.gov`
3. Create the service. For example, with `example.gov` and `www.example.gov`, run:
   ```
   $ cf create-service external-domain domain-with-cdn my-cdn -c '{"domains": "example.gov,www.example.gov"}'
    Creating service instance my-cdn in org my-org / space my-service as me...
    OK

    Create in progress. Use 'cf services' or 'cf service my-cdn' to check operation status.
   ``` 
4. Wait for the service instance to complete provisioning. The `domain-with-cdn` plan may take up to 2 hours to complete provisioning, the `domain` plan should
   complete within an hour. You can check the status by running `cf service <service instance name>`
5. If you didn't complete step 2 above, do so now.



## More about how the CDN works

### Caching

CloudFront [uses](http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html)
your application's `Cache-Control` or `Expires` HTTP headers to determine how
long to cache content. If your application does not provide these headers,
CloudFront will use a default timeout of **24 hours**. This can be
particularly confusing as different requests might be routed to different
CloudFront Edge endpoints.

While there is no mechanism for cloud.gov users to trigger a cache clear,
[cloud.gov support]({{ site.baseurl }}/docs/help/) can. Cache invalidation is not
instantaneous; Amazon recommends expecting a lag time of 10-15 minutes (more if there are
many distinct endpoints).

### Authentication

Cookies are passed through the CDN by default, meaning that cookie-based authentication will work as expected.

#### Header forwarding

CloudFront forwards a [limited set of headers](http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/RequestAndResponseBehaviorCustomOrigin.html#request-custom-headers-behavior) by default. 
