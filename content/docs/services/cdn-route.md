---
menu:
  docs:
    parent: services
title: CDN service
name: "cdn-route"
description: "Custom domains, CDN caching, and TLS certificates using Amazon CloudFront"
status: "Production Ready"
---

Once your application is ready to move to production, you'll want a custom domain instead of the default cloud.gov one. The CDN Route service provides three key elements to support production applications: a custom domain, Content Distribution Network (CDN) caching, and TLS certificates with auto renewal.

## Plans

Plan Name | Description | Price
--------- | ----------- | -----
`cdn-route` | Custom domains, CDN caching, and TLS certificate with auto renewal | Free

## Options

Name | Required | Description | Default
--- | --- | --- | ---
`domain` | <i class="fa fa-check" aria-hidden="true"></i> | Your custom domain (or domains separated by commas) |
`origin` | <i class="fa fa-check" aria-hidden="true"></i> | The origin root URL of the application |
`path` |  | The path for the application within the main URL supplied | `""`
`insecure_origin` |  | Read the application over HTTP instead of HTTPS | `false`

## How to create an instance

To create a service instance, run the following command:

```bash
cf create-service cdn-route cdn-route my-cdn-route \
    -c '{"domain": "my.domain.gov", "origin": "my-app.app.cloud.gov"}'
```

### How to set up DNS

Once you create the service instance, you need to retrieve the instructions to set up your DNS. Run the following command, replacing `my-cdn-route` with the service instance name you used in the previous step.

```bash
$ cf service my-cdn-route

Last Operation
Status: create in progress
Message: Provisioning in progress; CNAME domain "my.domain.gov" to "d3kajwa62y9xrp.cloudfront.net."
```

In this case, you need to create a CNAME record in your DNS server pointing `my.domain.gov` to `d3kajwa62y9xrp.cloudfront.net.`.

After the record is created, wait up to 30 minutes for the CloudFront distribution to be provisioned and the DNS changes to propagate. Then visit your custom domain and see whether you have a valid certificate (in other words, that visiting your site in a modern browser doesn't give you a certificate warning).

## How to update an instance

To update a service instance, run the following command:

```bash
cf update-service my-cdn-route \
    -c '{"domain": "my.domain.gov", "origin": "my-app.app.cloud.gov"}'
```

*Replace `my-cdn-route` with the service instance name.*

Unlike the `create-service` command which needs both `domain` **and** `origin`
fields, the `update-service` requires at least `domain` **or** `origin`.

Similarly to instance creation, after the record is updated, wait up to
30 minutes for the CloudFront distribution to be updated and the DNS changes
to propagate. In addition, you may have to clear your browser's cache if it
shows the old content after the DNS changes propagate.

### When to update the DNS

You only need to add a CNAME entry when the `domain`
field is updated. Refer to ["How to set up DNS"](#how-to-set-up-dns) for guidance.

### The broker in GitHub

You can find the broker here: [https://github.com/18F/cf-cdn-service-broker](https://github.com/18F/cf-cdn-service-broker).
