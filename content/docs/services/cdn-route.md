---
menu:
  docs:
    parent: services
title: CDN Service
name: "cdn-route"
description: "Custom routes with HTTPS certificates using Amazon CloudFront"
status: "Production Ready"
---

Once your application is ready to move to production you will want a custom URL for it instead of the default cloud.gov one. The CDN Route service provides 3 key elements to support production applications: custom URL, Content Distribution Network (CDN) caching, and free TLS certificates with auto renewal.

## Plans

Plan Name | Description | Price
--------- | ----------- | -----
`cdn-route` | A CDN distribution with custom URL and free TLS certificate with auto renewal | Free

## Options

Name | Required | Description | Default
--- | --- | --- | ---
`domain` | <i class="fa fa-check" aria-hidden="true"></i> | Your custom domain (or domains separated by commas) |
`origin` | <i class="fa fa-check" aria-hidden="true"></i> | The origin root URL of the application |
`path` |  | The path for the application within the main URL supplied | `""`
`insecure_origin` |  | Read the application over HTTP instead of HTTPS | `false`

## How to create an instance

To create a service instance run the following command:

```bash
cf create-service cdn-route cdn-route my-cdn-route \
    -c '{"domain": "my.domain.gov", "origin": "my-app.apps.cloud.gov"}'
```

### How to set up DNS

Once you created the service instance you need to retrieve the instructions to set up your DNS. To do that you need to run the following command, replacing `my-cdn-route` with the service instance name you used in the previous step.

```bash
$ cf service my-cdn-route

Last Operation
Status: create in progress
Message: Provisioning in progress; CNAME domain "my.domain.gov" to "d3kajwa62y9xrp.cloudfront.net."
```

In this case, you need to create a CNAME record in your DNS server pointing `my.domain.gov` to `d3kajwa62y9xrp.cloudfront.net.`.

After the record is created, wait up to 30 minutes for the CloudFront distribution to be provisioned and the DNS changes to propagate. Then visit your custom URL, and see that you have a valid certificate (i.e. that visiting your site in a modern browser doesn't give you a certificate warning).


### The broker in GitHub

You can find the broker here: [https://github.com/18F/cf-cdn-service-broker](https://github.com/18F/cf-cdn-service-broker).
