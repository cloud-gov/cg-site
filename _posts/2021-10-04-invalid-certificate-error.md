---
layout: post
title: "Invalid certificate error"
date: October 4, 2021
excerpt: A recent update by Let's Encrypt may cause some client issues when accessing sites
---

### Bottom line up front

The expiration of a Certificate Authority's root certificate may be causing some issues when client applications attempt to access sites on cloud.gov and Federalist (as well as other sites on the Internet). The issue disproportionately affects users with older operating systems and/or browsers, and fixing the issue is outside of our control.

### More details

Cloud.gov uses Let's Encrypt to provision the TLS certificates on our platform. Let's Encrypt has their own root certificate (named `ISRG Root X1`), and a set of intermediate certificates (named `Let's Encrypt Authority X1`, `Let's Encrypt Authority X2`, `Let's Encrypt Authority X3`, and `Let's Encrypt Authority X4`). These intermediate certificates allow clients to build a trust chain to Let's Encrypt's root certificate `ISRG Root X1`. Additionally, these certificates are cross-signed to allow clients to build a trust chain to a different Certificate Authority's root certificate - IndenTrust's `DST Root CA X3`. Let's Encrypt has done this since 2016, and does so to maximize client compatibility. You can read more 
about Let's Encrypt's certificate heirarchy and the reasoning behind it [here](https://letsencrypt.org/2020/09/17/new-root-and-intermediates.html).

The core issue is that on September 30, 2021, the `DST Root CA X3` expired. For well-behaved clients with up-to-date trust stores, this causes not problems. For other clients, this can cause problems:
- A client with `DST Root CA X3` as a trust anchor but not `ISRG Root X1`, they will probably get a certificate validation error because `DST Root CA X3` expired earlier today.
- A client with **both** certs in their trust anchors may give up after constructing a chain to the expired `DST Root CA 3`, but most well-behaved clients will continue checking for a valid chain, and will find the chain to `ISRG Root X1`.

However, either client configuration is wholly outside cloud.gov's control and users will need to address this issue manually or get help from their respective IT departments.

Some additional information may be available on the [Let's Encrypt community forum](https://community.letsencrypt.org/t/help-thread-for-dst-root-ca-x3-expiration-september-2021/149190).

_this post was was modified October 8th, 2021. You can see the original content [here](https://github.com/cloud-gov/cg-site/blob/57a52327f052c3e4114c1b0caf4ae3a12beb5d25/_posts/2021-10-04-invalid-certificate-error.md)_
