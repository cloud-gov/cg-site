---
menu:
  docs:
    parent: advanced
title: Custom domains
---

Here's how to put your app on your project's custom domain name. For context, [Cloud Foundry's Routes and Domains documentation](https://docs.cloudfoundry.org/devguide/deploy-apps/routes-domains.html) explains the overall model and terminology that cloud.gov uses.

There is a [Manual Method](#manual-method) and a [Managed Service Method](#managed-service-method). The latter is vastly preferred to the former, for the following reasons:

* It is (somewhat) self-service
* It will automatically create and renew the certificate

Both options support IPv6.

For all custom domains, we recommend incorporating [HTTPS-Only Standard guidance](https://https.cio.gov/), including [HSTS](https://https.cio.gov/hsts/) and [preloading](https://https.cio.gov/guide/#options-for-hsts-compliance).

If your application requires DNSSEC, you are responsible for ensuring your custom domain is DNSSEC-enabled before following these instructions.

If you need to set up an app on a domain managed by GSA TTS, you may also be interested in [18F/dns](https://github.com/18F/dns).

## Manual Method

Send a request to cloud.gov support (cloud-gov-support@gsa.gov for any customer, or [#cloud-gov-support](https://18f.slack.com/messages/cloud-gov-support) for 18F staff) to tell us you want to set up a custom domain. Include your domain and org name.

We'll configure your org to make your domain available for use with that org, and we'll tell you the entry to put in your DNS. Next you'll set up your application route, as explained in the next section.

### Application Routes

Use `cf domains` to list the domains that are available to you, to confirm that we configured your org correctly.

Use your application manifest.yml to identify the domain where the application route should be created.

For example, if you want to make your app available as a subdomain of your domain:

	---
	...
	- name: myapp
	  domain: domain.tld

That will create the route `myapp.domain.tld` for your application. Alternatively, you can specify a specific hostname for your app separate from the application name within CF. For example:

	---
	...
	- name: myapp
	  host: frontend
	  domain: domain.tld

That will create the route `frontend.domain.tld` for your application.

If you want to make your app available simply as a domain (without a subdomain), for example as `domain.tld`, put `.` under `host`.

#### Hostless Routes

Here's how to route a delegated domain (or subdomain) to a CF app, for example if you've been delegated `domain.tld` or `app.parent.tld`.

First send us a support request to ask us to make the domain available in your org.

Then, you can create the route and map it to your application, for example:

	cf map-route myapp domain.tld

Or:

	cf map-route myapp app.parent.tld

[API](http://apidocs.cloudfoundry.org/206/routes/associate_app_with_the_route.html)

## Managed Service Method

See the [CDN service page]({{< relref "docs/services/cdn-route.md" >}}) for instructions.
