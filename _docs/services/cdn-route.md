---
parent: services
layout: docs
sidenav: true
title: CDN service (deprecated)
name: "cdn-route"
description: "Custom domains, CDN caching, and TLS certificates with automatic renewal"
status: "Production Ready"
---

## Deprecated
Note - this service has been deprecated. No new instances can be created on this broker, but existing instances will continue to work.
For new services, please use the [external domain service]({{ site.baseurl }}{% link _docs/services/external-domain-service.md %}).

This service provides:

1. [Custom domain]({{ site.baseurl }}/docs/management/custom-domains/) support, so that your application can have your domain instead of the default `*.app.cloud.gov` domain.
1. HTTPS support via free TLS certificates with auto-renewal (using [Let's Encrypt](https://letsencrypt.org/)), so that user traffic is encrypted.
1. Content Distribution Network (CDN) caching (using [AWS CloudFront](https://aws.amazon.com/cloudfront/)), for fast delivery of content to your users.

This cloud.gov feature has unique [compliance impact](#compliance-impact) considerations. If you don't need CDN caching, use the [external domain service]({{ site.baseurl }}{% link _docs/services/external-domain-service.md %}) instead.

## Plans

Plan Name | Description | 
--------- | ----------- | -----
`cdn-route` | Custom domains, CDN caching, and TLS certificates with automatic renewal | 

*Not available in [sandbox spaces]({{ site.baseurl }}/docs/pricing/free-limited-sandbox/#sandbox-limitations) or [prototyping orgs]({{ site.baseurl }}/docs/pricing/prototyping#limitations).*

## Options

Name | Required | Description | Default
--- | --- | --- | ---
`domain` | *Required* | Your custom domain (or domains separated by commas) |
`origin` | *Optional* | *Don't put this in your command for cloud.gov tenant applications.* For services/applications that are not cloud.gov tenant applications ([more info](#external-services-and-applications)): the origin root URL of the application |
`path` | *Optional* | The path for the application within the main domain supplied | `""`
`insecure_origin` | *Optional* | Read the application over HTTP instead of HTTPS | `false`
`cookies` | *Optional* | Forward cookies to the origin | `true`

## Before you use this service

This service is similar to the [custom domain service]({{ site.baseurl }}/docs/services/custom-domains), but with an additional feature: CDN caching support using [AWS CloudFront](https://aws.amazon.com/cloudfront/).

### Compliance impact

When you use cloud.gov in general, your application inherits the compliance of the cloud.gov FedRAMP P-ATO, which inherits compliance from the AWS GovCloud FedRAMP P-ATO. This service is a little different. When you use this service, you opt into using an AWS service (CloudFront) that is not in the cloud.gov FedRAMP P-ATO boundary, but is in the AWS Commerical FedRAMP P-ATO boundary (see [Services in Scope](https://aws.amazon.com/compliance/services-in-scope/)).

You are responsible for obtaining appropriate authorization from your agency to use CloudFront for your system. The appropriate steps depend on your agency; they may include discussing this with your Authorizing Official and documenting it as part of your ATO (for example as part of [SC-12](https://nvd.nist.gov/800-53/Rev4/control/SC-12) or [SA-9](https://nvd.nist.gov/800-53/Rev4/control/SA-9)).

### Technical considerations

Before setting up this service, review [how the CDN works](#more-about-how-the-cdn-works).

## How to create an instance of this service

*Use these instructions for cloud.gov tenant applications. If you're creating a custom domain for something else (such as a public S3 bucket), see [external services and applications](#external-services-and-applications).*

Before you begin, note that once you initiate creation of a CDN service instance, you can't update or delete it until it has been created successfully. Typos in the service creation parameters can cause creation to get stuck in a pending state. If you need to implement DNSSEC, see [DNSSEC support](#dnssec-support).

First, target the space your application is running in:

```sh
cf target -o <org> -s <space>
```

Create a private domain in your organization (replace `<org>` with your org name, and replace `my.example.gov` with your domain):

```sh
cf create-domain <org> my.example.gov
```

Then, to create a `cdn-route` service instance, run the following command (replace `my-cdn-route` with a name for your service instance, and replace `my.example.gov` with your domain):

```sh
cf create-service cdn-route cdn-route my-cdn-route \
    -c '{"domain": "my.example.gov"}'
```

(The command includes `cdn-route cdn-route` because `cdn-route` is the name of the service *and* the name of the service plan.)

If you have more than one domain, you can pass a comma-delimited list to the `domain` parameter (just keep in mind that the broker will wait until all domains are CNAME'd, as explained in the next step):

```sh
cf create-service cdn-route cdn-route my-cdn-route \
    -c '{"domain": "my.example.gov,www.my.example.gov"}'
```

The maximum number of domains that can be associated with a single cdn-route service instance is 100.

### How to set up DNS

**Note:** Due to changes in how CloudFront processes requests, we currently only offer certificate provisioning via DNS challenges. This means that users can no longer skip step 1 below.
We are investigating ways to bring this feature back. If you are unable to use DNS challenges, please [reach out to us]({{ site.baseurl }}/docs/help/).



#### Step 1: Create TXT record(s)

Once you create the service instance, you need to retrieve the instructions to set up your DNS. Run the following command, replacing `my-cdn-route` with the service instance name you used in the previous step.

```sh
$ cf service my-cdn-route

Last Operation
Status: create in progress
Message: Provisioning in progress [my.example.gov => cdn-broker-origin.fr.cloud.gov]; CNAME or ALIAS domain my.example.gov to d3nrs0916m1mk2.cloudfront.net or create TXT record(s):
name: _acme-my.example.gov., value: ngd2suc9gwUnH3btm7N6hSU7sBbNp-qYtSPYyny325E, ttl: 120

```
Create the TXT record(s) in your DNS, using the values provided by the broker. The existence of these records will be validated by [Let's Encrypt](https://letsencrypt.org/) when issuing your certificate and will not affect your site.

After the records have been created wait up to 1 hour for the certificate to be provisioned. Your certificate has been provisioned when the `cf service my-cdn-route` command reports the status as `create succeeded`.

```
Last Operation
Status: create succeeded
Message: Service instance provisioned [my.example.gov => cdn-broker-origin.fr.cloud.gov]; CDN domain d3nrs0916m1mk2.cloudfront.net
```

#### Step 2: Create CNAME record(s)

Once the TXT records have been validated, you need to point your custom domain at the CDN. Run `cf service my-cdn-route` with the service instance name you choose.

```
Last Operation
Status: create succeeded
Message: Service instance provisioned [my.example.gov => cdn-broker-origin.fr.cloud.gov]; CDN domain d3nrs0916m1mk2.cloudfront.net
```

The output will include the CDN domain the broker has created for you. In this case, you need to create a CNAME record in your DNS server pointing `my.example.gov` to `d3nrs0916m1mk2.cloudfront.net.`.

After the record is created, wait up to one hour for the CloudFront distribution to be provisioned and the DNS changes to propagate. Then visit your custom domain and see whether you have a valid certificate (in other words, that visiting your site in a modern browser doesn't give you a certificate warning).

If you've waited more than two hours without a valid certificate appearing, [contact support]({{ site.baseurl }}/docs/help) to check for problems.



#### Step 3: Map the route to your application

You need to map [the domain you created](#how-to-create-an-instance-of-this-service) to your application.

You can do that by adding the domain(s) to your application [`manifest.yml` file](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html) under the
[`routes`](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest-attributes.html#routes) section:

```yaml
...
routes:
- route: my.example.gov
```

Then deploy your application with your updated manifest.

*Alternate option:* If you don't want to put the route in your manifest, you can manually add it to your application:

```sh
cf map-route APPNAME my.example.gov
```

### Troubleshooting

If nothing has changed when you visit your custom domain:

* Make sure you've waited at least 30 minutes.
* Check your DNS setup to make sure you completed the CNAME record creation.
* If your custom domain uses DNSSEC, [verify your DNSSEC configuration](https://www.icann.org/resources/pages/dnssec-2012-02-25-en).

If you get the following error message when you try to update or delete a service instance: `"Server error, status code: 409, error code: 60016, message: An operation for service instance [name] is in progress.`

* This happens because you can't do anything to a service instance while it's in a pending state. A CDN service instance stays pending until it detects the CNAME or ALIAS record.
* If this causes a problem for you, you can ask support to manually delete the pending instance.

If a `cf create-service` command times out due to certificate rate limiting, and shows in a `failed` state:
* Use `cf update-service` to restart the certificate attempts.
* Let's Encrypt has a [rate limit of 20 certificates per registered domain per week](https://letsencrypt.org/docs/rate-limits/). This can happen if you're working with many subdomains for the same domain name.

After you create your CDN route service, your TXT record must be created within 7 days.
* If your record was not made within the timeframe, contact cloud.gov, they will change the status of service so that you can delete the old service and make a new service.

## How to update a service instance

To update a service instance, run the following command (replace `my-cdn-route` with your service instance name, and replace `my.example.gov` with your domain):

```sh
cf update-service my-cdn-route -c '{"domain": "my.example.gov"}'
```

Similarly to instance creation, after the record is updated, wait up to
30 minutes for the CloudFront distribution to be updated and the DNS changes
to propagate. In addition, you may have to clear your browser's cache if it
shows the old content after the DNS changes propagate.

### When to update DNS records

You only need to add a CNAME entry when you update the `domain`
field. If you do, follow ["How to set up DNS"](#how-to-set-up-dns) again.

Ensure that you remove previous attempts at updating DNS records when
creating/recreating the service.

### Deleting a service instance

After you delete an existing service instance, you may need to wait up to 30 minutes for the changes to complete and propagate.

## External services and applications

To create a custom domain for a service or application that is not a cloud.gov tenant application (such as a public S3 bucket), put in the `origin` option:

```sh
cf create-service cdn-route cdn-route my-cdn-route \
    -c '{"domain": "my.example.gov", "origin": "my-app.external-example.gov"}'
```

Unlike creating custom domains for cloud.gov tenant applications, you don't need to run the `cf create-domain` command first -- there's no need to create a private domain for externally-managed services and applications.

Then [set up DNS](#how-to-set-up-dns).

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

Cookies are passed through the CDN by default, meaning that
cookie-based authentication will work as expected. If you don't want to [forward cookies to your origin](http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Cookies.html), you can disable this by setting the `cookies` parameter to `false`:

```sh
cf create-service cdn-route cdn-route my-cdn-route \
    -c '{"domain": "my.example.gov", "cookies": false}'
```

#### Header forwarding

CloudFront forwards a [limited set of headers](http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/RequestAndResponseBehaviorCustomOrigin.html#request-custom-headers-behavior) by default. If you want extra headers forwarded to your origin, you should add another parameter. This example forwards both the `User-Agent` and `Referer` headers:

```bash
$ cf create-service cdn-route cdn-route my-cdn-route \
    -c '{"domain": "my.domain.gov", "headers": ["User-Agent", "Referer"]}'
```

CloudFront can forward up to 10 custom headers. Because this broker automatically forwards the `Host` header when not using a [custom origin](#external-services-and-applications), you can whitelist up to nine headers by default; if using a custom origin, you can whitelist up to 10 headers. If you want to exceed this limit or forward all headers, you can use a wildcard:

```bash
$ cf create-service cdn-route cdn-route my-cdn-route \
    -c '{"domain": "my.domain.gov", "headers": ["*"]}'
```

When making requests to the origin, CloudFront's caching mechanism associates HTTP requests with their response. The more variation within the forwarded request, the fewer cache hits and the less effective the cache. Limiting the headers forwarded is therefore key to cache performance. Caching is completely disabled when using a wildcard.

### DNSSEC support

If you plan to use a domain with DNSSEC, you need to [verify your DNSSEC configuration](https://www.icann.org/resources/pages/tools-2012-02-25-en) before starting the steps above, because invalid DNSSEC configuration will cause creation to get stuck.

However, custom domains using the CDN broker will not fully validate DNSSEC (between your CNAME record and cloudfront.net). This is because the AWS CloudFront service does not currently support DNSSEC. For a complete implementation of DNSSEC, we recommend instead running a proxy server within your boundary that forwards to your application in cloud.gov, or using an alternative CDN that supports DNSSEC. For implementation advice to help you meet your compliance needs, contact [cloud.gov support]({{ site.baseurl }}/docs/help/).

Alternatively, you may be able to make the case for an alternative implementation without DNSSEC. As described in the [HTTPS-Only Standard](https://https.cio.gov/faq/#how-does-https-protect-against-dns-spoofing), a properly implemented solution using HTTPS-only and HSTS can meet the same requirements around preventing DNS spoofing that DNSSEC is intended to implement. cloud.gov enforces HTTPS for all applications and enables HSTS by default; we recommend configuring HSTS preload as well.

See our [compliance guide for federal standards and recommendations for domain names]({{ site.baseurl }}/docs/compliance/domain-standards/) for more details.

## Certificate validity and renewal

Let's Encrypt TLS certificates are valid for 90 days.  The broker will automatically renew your certificate every 60 days.  This process is usually immediate but can take several days to complete.  If your certificate is expiring within the next 21 days and has not been renewed automatically, contact [cloud.gov support]({{ site.baseurl }}/docs/help/).

## The broker in GitHub

You can find the broker here: [https://github.com/18F/cf-cdn-service-broker](https://github.com/18F/cf-cdn-service-broker).
