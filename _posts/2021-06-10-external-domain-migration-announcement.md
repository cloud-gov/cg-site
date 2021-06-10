---
layout: post
title: "Migrate to the external-domain service"
date: June 10, 2021
excerpt: Customers need to take action to migrate from the cdn-service and custom-domain service to the external-domain service
---

## Who is this for?

This post is for all users of the cdn-route or custom-domain services.

## Background

The custom-domain and cdn-route services leverage Let's Encrypt to provision certificates on our users' behalf.
Several months ago, Let's Encrypt announced that they're deprecating their v1 API. To work with their new API, we've written a replacement
to the cdn-route and custom-domain services, the external-domain service. We now need to migrate your service instances
to the new service to ensure their certificates can continue renewing without issue. To accomplish this, we've written internal tooling to
migrate instances automatically without service interruption, but it does require some action on your part to intiate the migration.

## What you need to do

The new external-domain service uses a different method of validation with Let's Encrypt, which relies on specific DNS records being created on
your part. To begin the migration, we need you to create 2 DNS CNAME records for each domain on your custom-domain or cdn-route instances. The first
CNAME should created for the record `_acme-challenge.$DOMAIN` and should have the value `_acme-challenge.$DOMAIN.external-domains-production.cloud.gov`.
In other words, if you have a custom-domain service created for `directorate.agency.gov`, you'd want to create a CNAME record
`_acme-challenge.directorate.agency.gov` with value `_acme-challenge.directorate.agency.gov.external-domains-production.cloud.gov`. The second CNAME
should be for `$DOMAIN` and should point to `$DOMAIN.external-domains-production.cloud.gov`. Using the `directorate.agency.gov` example above, this 
would be `directorate.agency.cloud.gov.external-domains-production.cloud.gov`.
Note that the second change here changes how users get to your site.  We've made every effort to validate we're prepared for this change, but
you're encouraged to validate that `$DOMAIN.external-domains-production.cloud.gov` currently resolves before making this change. You can do this
by directly comparing the outputs of `nslookup $DOMAIN` and `nslookup $DOMAIN.external-domains-production.cloud.gov`, or by modifying your `hosts` file
to point `$DOMAIN` to one of the IP addresses `$DOMAIN.external-domains-production.cloud.gov` currently resolves to
