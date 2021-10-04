---
layout: post
title: "Invalid certificate error"
date: October 10, 2021
excerpt: A recent update by Lets Encrypt may cause some client issues when accessing sites
---

## Bottom line up front

A [recent change by certificate provider Let's Encrypt](https://letsencrypt.org/2020/09/17/new-root-and-intermediates.html) may be causing some issues when client applications attempt to access sites on cloud.gov and Federalist (as well as other sites on the Internet). The issue disproportionately affects users with older operating systems and/or browsers, and fixing the issue is outside of our control.

## More details

Let's Encrypt is used to issue certificates for the domains on our platform, whether they are a custom domain added to your app through our external domain service](https://cloud.gov/docs/services/external-domain-service/) or one of the default domains used for test and staging apps. The certificates serve a trust chain given to us by Lets Encrypt. Clients can use the first cert in the chain to build a full chain up to "DST Root CA X3", which expired 30 September 2021, or the second cert in the chain to build a full chain up to "ISRG Root X1".

If a client (e.g. the web browser on an older system) has "DST Root CA X3" as a trust anchor but not "ISRG Root X1", they will probably get a certificate validation error because "DST Root CA X3" expired earlier today.

If they have **both** certs in their trust anchors, it's possible they'll get an error, as "DST Root CA X3" is expired, and the client may give up after constructing a bad chain, but most well-behaved clients will continue checking for a valid chain and find it. However, either client configuration is wholly outside cloud.gov's control and users will need to address this issue manually or get help from their respective IT departments.

Some additional information may be available on the [Let's Encrypt community forum](https://community.letsencrypt.org/t/help-thread-for-dst-root-ca-x3-expiration-september-2021/149190).