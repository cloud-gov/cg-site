---
menu:
  docs:
    parent: services
title: CDN service
name: "cdn-route"
description: "Custom routes with HTTPS certificates using Amazon CloudFront"
status: "Production Ready"
---

Once your application is ready to move to production, you'll want a custom domain instead of the default cloud.gov one. The CDN service provides three key elements to support production applications: a custom domain, Content Distribution Network (CDN) caching, and TLS certificates with auto renewal.

## Plans

Plan Name | Description | Price
--------- | ----------- | -----
`cdn-route` | A CDN distribution with custom domain and free TLS certificate with auto renewal | Free

## Options

Name | Required | Description | Default
--- | --- | --- | ---
`domain` | *Required* | Your custom domain (or domains separated by commas) |
`origin` | *Optional* | *Leave blank for cloud.gov tenant applications.* For services/applications that are not cloud.gov tenant applications ([more info](#external-services-and-applications)): the origin root URL of the application |
`path` | *Optional* | The path for the application within the main domain supplied | `""`
`insecure_origin` | *Optional* | Read the application over HTTP instead of HTTPS | `false`

## How to create an instance

First, create a private domain in your organization:

```bash
cf create-domain <my-org> my.example.gov
```

To create a service instance, run the following command:

```bash
cf create-service cdn-route cdn-route my-cdn-route \
    -c '{"domain": "my.example.gov"}'
```

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

## How to update an instance

To update a service instance, run the following command:

```bash
cf update-service my-cdn-route -c '{"domain": "my.example.gov"}'
```

*Replace `my-cdn-route` with the service instance name.*

Similarly to instance creation, after the record is updated, wait up to
30 minutes for the CloudFront distribution to be updated and the DNS changes
to propagate. In addition, you may have to clear your browser's cache if it
shows the old content after the DNS changes propagate.

### When to update the DNS

You only need to add a CNAME entry when the `domain`
field is updated. Refer to ["How to set up DNS"](#how-to-set-up-dns) for guidance.

## External services and applications

To create a custom domain for a service or application that is not a cloud.gov tenant application (such as a public S3 bucket), pass the `origin` option:

```bash
cf create-service cdn-route cdn-route my-cdn-route \
    -c '{"domain": "my.example.gov", "origin": "my-app.external-example.gov"}'
```

There's no need to create a private domain for externally managed services and applications.

### The broker in GitHub

You can find the broker here: [https://github.com/18F/cf-cdn-service-broker](https://github.com/18F/cf-cdn-service-broker).
