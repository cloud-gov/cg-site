---
menu:
  docs:
    parent: services
title: CDN service
name: "cdn-route"
description: "Custom domains, CDN caching, and TLS certificates with automatic renewal"
status: "Production Ready"
---

This service provides three key elements to support production applications:

1. Custom domain support, so that your application can have your domain instead of the default `*.app.cloud.gov` domain.
2. Content Distribution Network (CDN) caching (using [AWS CloudFront](https://aws.amazon.com/cloudfront/)), for fast delivery of content to your users.
3. HTTPS support via free TLS certificates with auto-renewal (using [Let's Encrypt](https://letsencrypt.org/)), so that user traffic is encrypted.

## Plans

Plan Name | Description | Price
--------- | ----------- | -----
`cdn-route` | Custom domains, CDN caching, and TLS certificates with automatic renewal | Free

## Options

Name | Required | Description | Default
--- | --- | --- | ---
`domain` | *Required* | Your custom domain (or domains separated by commas) |
`origin` | *Optional* | *Don't put this in your command for cloud.gov tenant applications.* For services/applications that are not cloud.gov tenant applications ([more info](#external-services-and-applications)): the origin root URL of the application |
`path` | *Optional* | The path for the application within the main domain supplied | `""`
`insecure_origin` | *Optional* | Read the application over HTTP instead of HTTPS | `false`
`cookies` | *Optional* | Forward cookies to the origin | `true`

## How to create an instance of this service

*Use these instructions for cloud.gov tenant applications. If you're creating a custom domain for something else (such as a public S3 bucket), see [external services and applications](#external-services-and-applications).*

Before you begin, note that once you create a CDN service instance, you can't update or delete it until it has been successfully configured (so if you make a mistake that prevents it from being successfully configured, you'll need to ask support to manually delete the service instance). We consider this a bug and plan to make mistakes easier to fix, but for now, consider checking your commands with a teammate to help you avoid typos and mistakes.

First, target the space your application is running in:

```bash
cf target -o <org> -s <space>
```

Create a private domain in your organization (replace `<org>` with your org name, and replace `my.example.gov` with your domain):

```bash
cf create-domain <org> my.example.gov
```

Then, to create a `cdn-route` service instance, run the following command (replace `my-cdn-route` with a name for your service instance, and replace `my.example.gov` with your domain):

```bash
cf create-service cdn-route cdn-route my-cdn-route \
    -c '{"domain": "my.example.gov"}'
```

(The command includes `cdn-route cdn-route` because `cdn-route` is the name of the service *and* the name of the service plan.)

If you have more than one domain, you can pass a comma-delimited list to the `domain` parameter (just keep in mind that the broker will wait until all domains are CNAME'd, as explained in the next step):

```bash
cf create-service cdn-route cdn-route my-cdn-route \
    -c '{"domain": "my.example.gov,www.my.example.gov"}'
```

The maximum number of domains that can be associated with a single cdn-route service instance is 100.

### How to set up DNS

Once you create the service instance, you need to retrieve the instructions to set up your DNS. Run the following command, replacing `my-cdn-route` with the service instance name you used in the previous step.

```bash
$ cf service my-cdn-route

Last Operation
Status: create in progress
Message: Provisioning in progress; CNAME domain "my.example.gov" to "d3kajwa62y9xrp.cloudfront.net."
```

In this case, you need to create a CNAME record in your DNS server pointing `my.example.gov` to `d3kajwa62y9xrp.cloudfront.net.`.

After the record is created, wait up to 30 minutes for the CloudFront distribution to be provisioned and the DNS changes to propagate. Then visit your custom domain and see whether you have a valid certificate (in other words, that visiting your site in a modern browser doesn't give you a certificate warning).

### CDN Configuration Options

[Forwarding cookies to your origin](http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Cookies.html) can be disabled by setting the `cookies` parameter to `false`.

```bash
cf create-service cdn-route cdn-route my-cdn-route \
    -c '{"domain": "my.example.gov", "cookies": false}'
```

### Troubleshooting

If nothing has changed when you visit your custom domain:

* If you're setting up a domain for a cloud.gov tenant application, make sure you're using the [instructions above](#how-to-create-an-instance-of-this-service), updated in February 2017.
* Make sure you've waited at least 30 minutes.
* Check your DNS setup to make sure you completed the CNAME record creation.

If you get the following error message when you try to update or delete a service instance: `"Server error, status code: 409, error code: 60016, message: An operation for service instance [name] is in progress.` -- this happens because you can't do anything to a service instance while it's in a pending state. A CDN service instance stays pending until it detects the CNAME or ALIAS record. If this causes a problem for you, you can ask support to manually delete the pending instance.

## How to update a service instance

To update a service instance, run the following command (replace `my-cdn-route` with your service instance name, and replace `my.example.gov` with your domain):

```bash
cf update-service my-cdn-route -c '{"domain": "my.example.gov"}'
```

Similarly to instance creation, after the record is updated, wait up to
30 minutes for the CloudFront distribution to be updated and the DNS changes
to propagate. In addition, you may have to clear your browser's cache if it
shows the old content after the DNS changes propagate.

### When to update the DNS

You only need to add a CNAME entry when you update the `domain`
field. If you do, follow ["How to set up DNS"](#how-to-set-up-dns) again.

### Deleting a service instance

After you delete an existing service instance, you may need to wait up to 30 minutes for the changes to complete and propagate.

## External services and applications

To create a custom domain for a service or application that is not a cloud.gov tenant application (such as a public S3 bucket), put in the `origin` option:

```bash
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
[cloud.gov support](/help/) can. Note however, that cache invalidation is not
instantaneous; Amazon recommends expecting a lag time of 10-15 minutes (more if there are
many distinct endpoints.)

### Authentication

As noted above, cookies are passed through the CDN by default, meaning that
cookie-based authentication will work as expected. Other headers, such as HTTP
auth, are stripped by default. If you need a different configuration, contact [cloud.gov support](/help/).

## The broker in GitHub

You can find the broker here: [https://github.com/18F/cf-cdn-service-broker](https://github.com/18F/cf-cdn-service-broker).
