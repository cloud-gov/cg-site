---
parent: services
layout: docs
sidenav: true
title: Custom domain service (deprecated)
name: "custom-domain"
description: "Custom domains and TLS certificates with automatic renewal"
status: "Production Ready"
---
## Deprecated
Note - this service has been deprecated. No new instances can be created on this broker, but existing instances will continue to work.
For new services, please use the [external domain service]({{ site.baseurl }}{% link _docs/services/external-domain-service.md %}).

This service provides:

1. [Custom domain]({{ site.baseurl }}{% link _docs/management/custom-domains.md %}) support, so that your application can have your domain instead of the default `*.app.cloud.gov` domain.
1. HTTPS support via free TLS certificates with auto-renewal (using [Let's Encrypt](https://letsencrypt.org/)), so that user traffic is encrypted.

If you need CDN caching for your applications, use the [CDN service]({{ site.baseurl }}{% link _docs/services/cdn-route.md %}) instead.

## Plans

Plan Name | Description | 
--------- | ----------- | -----
`custom-domain` | Custom domains and TLS certificates with automatic renewal | 

*Not available in [sandbox spaces]({{ site.baseurl }}{% link _docs/pricing/free-limited-sandbox.md %}#sandbox-limitations) or [prototyping orgs]({{ site.baseurl }}{% link _pages/pricing.md %}#limitations).*

## Options

Name | Required | Description | Default
--- | --- | --- | ---
`domains` | *Required* | Your custom domain or domains |

## How to create an instance of this service

Before you begin, note that once you initiate creation of a custom domain service instance, you can't update or delete it until it has been created successfully. Typos in the service creation parameters can cause creation to get stuck in a pending state. If you need to implement DNSSEC, see [DNSSEC support](#dnssec-support).

First, target the space your application is running in:

```sh
cf target -o <org> -s <space>
```

Create a private domain in your organization (replace `<org>` with your org name, and replace `my.example.gov` with your domain):

```sh
cf create-domain <org> my.example.gov
```

Then, to create a `custom-domain` service instance, run the following command (replace `my-domain` with a name for your service instance, and replace `my.example.gov` with your domain):

```sh
cf create-service custom-domain custom-domain my-domain \
    -c '{"domains": ["my.example.gov"]}'
```

(The command includes `custom-domain custom-domain` because `custom-domain` is the name of the service *and* the name of the service plan.)

If you have more than one domain, you can pass a comma-delimited list to the `domains` parameter (just keep in mind that the broker will wait until all domains are CNAME'd, as explained in the next step):

```sh
cf create-service custom-domain custom-domain my-custom-domain \
    -c '{"domains": ["my.example.gov", "www.my.example.gov"]}'
```

### How to set up DNS

**Note:** If you are creating a new site on cloud.gov or you are migrating an existing site to cloud.gov that can tolerate a small amount of downtime during the migration, you can skip the first step and proceed directly to [Create CNAME record(s)](#step-2-create-cname-record-s)

#### Step 1: Create TXT record(s)

Once you create the service instance, you need to retrieve the instructions to set up your DNS. Run the following command, replacing `my-domain` with the service instance name you used in the previous step.

```sh
$ cf service my-domain

Last Operation
Status: create in progress
Message: Provisioning in progress; CNAME or ALIAS domain(s) my.example.gov to production-domains-0-792003535.us-gov-west-1.elb.amazonaws.com or create TXT record(s):
name: _acme-challenge.my.example.gov., value: ngd2suc9gwUnH3btm7N6hSU7sBbNp-qYtSPYyny325E, ttl: 120

```
Create the TXT record(s) as instructed by the broker. The existence of these records will be validated by [Let's Encrypt](https://letsencrypt.org/) when issuing your certificate and will not affect your site.

After the records have been created wait up to 1 hour for the certificate to be provisioned. Your certificate has been provisioned when the `cf service my-domain` command reports the status as `create succeeded`.

```
Last Operation
Status: create succeeded
Message: Service instance provisioned; domain(s) my.example.gov
```

#### Step 2: Create CNAME record(s) <a name="step-2-create-cname-record-s"></a>

Once the TXT records have been validated, or if you've decided to skip that step, you need to point your custom domain at the origin. Run `cf service my-domain` with the service instance name you choose.

```
Last Operation
Status: create succeeded
Message: Service instance provisioned; domain(s) my.example.gov
```

The output will include the domain the broker has created for you. In this case, you need to create a CNAME record in your DNS server pointing `my.example.gov` to `production-domains-0-792003535.us-gov-west-1.elb.amazonaws.com.`.

After the record is created, wait up to one hour for the DNS changes to propagate. Then visit your custom domain and see whether you have a valid certificate (in other words, that visiting your site in a modern browser doesn't give you a certificate warning).

If you've waited more than two hours without a valid certificate appearing, [contact support]({{ site.baseurl }}/docs/help) to check for problems.

#### Step 3: Map the route to your application

You need to map [the domain you created](#how-to-create-an-instance-of-this-service) to your application.

You can do that by adding the domain(s) to your application [`manifest.yml` file](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html) under the
[`routes`](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html#routes) section:

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
* If your custom domain uses DNSSEC, [verify your DNSSEC configuration](https://www.icann.org/resources/pages/tools-2012-02-25-en).

If you get the following error message when you try to update or delete a service instance: `"Server error, status code: 409, error code: 60016, message: An operation for service instance [name] is in progress.`

* This happens because you can't do anything to a service instance while it's in a pending state. A custom domain service instance stays pending until it detects the CNAME or ALIAS record.
* If this causes a problem for you, you can ask support to manually delete the pending instance.

#### When to update DNS records

You only need to add a CNAME entry when you update the `domain`
field. If you do, follow ["How to set up DNS"](#how-to-set-up-dns) again.

Ensure that you remove previous attempts at updating DNS records when
creating/recreating the service.


### DNSSEC support

If you plan to use a domain with DNSSEC, you need to [verify your DNSSEC configuration](https://www.icann.org/resources/pages/tools-2012-02-25-en) before starting the steps above, because invalid DNSSEC configuration will cause creation to get stuck.

However, custom domains using the custom domain broker will not fully validate DNSSEC (between your CNAME record and the cloud.gov origin). This is because the AWS load balancer service does not currently support DNSSEC. For a complete implementation of DNSSEC, we recommend instead running a proxy server within your boundary that forwards to your application in cloud.gov, or using an alternative service that supports DNSSEC. For implementation advice to help you meet your compliance needs, contact [cloud.gov support]({{ site.baseurl }}/docs/help/).

Alternatively, you may be able to make the case for an alternative implementation without DNSSEC. As described in the [HTTPS-Only Standard](https://https.cio.gov/faq/#how-does-https-protect-against-dns-spoofing), a properly implemented solution using HTTPS-only and HSTS can meet the same requirements around preventing DNS spoofing that DNSSEC is intended to implement. cloud.gov enforces HTTPS for all applications and enables HSTS by default; we recommend configuring HSTS preload as well.

See our [compliance guide for federal standards and recommendations for domain names]({{ site.baseurl }}{% link _docs/compliance/domain-standards.md %}) for more details.

## Certificate validity and renewal

Let's Encrypt TLS certificates are valid for 90 days.  The broker will automatically renew your certificate every 60 days.  This process is usually immedate but can take several days to complete.  If your certificate is expiring within the next 21 days and has not been renewed automatically, contact [cloud.gov support]({{ site.baseurl }}/docs/help/).

## The broker in GitHub

You can find the broker here: [https://github.com/18F/cf-domain-broker-alb](https://github.com/18F/cf-domain-broker-alb).
