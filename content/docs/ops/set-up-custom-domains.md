---
menu:
  docs:
    parent: operations
title: How to set up custom domains for users
linktitle: Custom domains for users
---

This is the operations side of the [user instructions for setting up custom domains]({{< relref "docs/apps/custom-domains.md" >}}).

## Manual Method

### Creating the [Load Balancer (ELB)](http://aws.amazon.com/elasticloadbalancing/)
There needs to be one ELB pointing to Cloud Foundry per TLS certificate.

**WARNING: Please [create a ticket](https://github.com/18f/infrastructure/issues/new) in the Infrastructure repo with the name of every new ELB so it is added to BOSH.**

* If domains under the cert already point to apps on Cloud Foundry (e.g. `18f.gov`), you're all set.
* If not, follow the [ELB instructions]({{< relref "docs/ops/elb.md" >}}).

### Creating the [Hosted Zone](http://docs.aws.amazon.com/Route53/latest/DeveloperGuide/AboutHZWorkingWith.html).

* If it already exists in [Route 53](https://console.aws.amazon.com/route53/home?region=us-east-1#hosted-zones:), you're good.
* If not, follow [these instructions](https://github.com/18F/https#set-up-the-domain).

### Creating the [Record Set](http://docs.aws.amazon.com/Route53/latest/DeveloperGuide/rrsets-working-with.html).
1. Click on the Domain Name of the Hosted Zone.
1. Click "Create Record Set".
1. For `Alias`, select `Yes`.
1. For `Alias Target`, type the name of your ELB and select it from the list.

### Creating the Cloud Foundry Domain Association

Before you can create Cloud Foundry applications under the new domain, you must associate the domain to an organization. There are two options for registration, private and shared.

#### Private / Shared Domain Association

**Private:**

Private registration enables a single organization to create routes for or under the specified domain. Organizations and private domains are a 1 to 1 relationship. A single domain cannot be privately registered to multiple organizations.

**Shared:**

Shared registrations enable **all** organizations to create routes under the shared domain.

#### Listing Domain Associations

To list all registrations for the currently targeted organization.

	$ cf domains

	Getting domains in org ORGANIZATION as USER...
	name           status
	cf.domain.tld  shared
	domain.tld     shared
	domain.com     owned

Private registrations appear with the status `owned` while shared registrations show just that, `shared`.

#### Private Domain Registration

To create a private registration.

	cf create-domain ORG DOMAIN

[API](http://apidocs.cloudfoundry.org/206/private_domains/create_a_private_domain_owned_by_the_given_organization.html)

#### Shared Domain Registration

To create a shared registration.

	cf create-shared-domain ORG DOMAIN

[API](http://apidocs.cloudfoundry.org/206/shared_domains/create_a_shared_domain.html)
