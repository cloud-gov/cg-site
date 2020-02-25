---
parent: runbook
layout: ops

layout: docs
sidenav: true
title: Rotating Secrets VII - SMTP
---

## Introduction
In order to send outbound mail there is a internal postfix mail relay.  Postfix
uses TLS certificates to secure the communications, and SASL to authenticate
the mail clients.

Rotation requires a small amount of downtime while the service is deployed
and restarted.

The secrets are all located in the `production-postfix.yml` file.  All operations
described here are to be done on the data in that file.

## Rotate TLS Certificates and SASL credential
The TLS certs from the
[Postfix Deployment Pipeline](https://github.com/18F/cg-deploy-postfix/blob/master/bosh/secrets.example.yml)
can be rotated using the `bosh int` command.

1. Delete the `postfix_ca`, `postfix_ssl`, and `cloudgov_pw` sections in the `production-postfix.yml` file.
1. `bosh int bosh/manifest.yml --vars-store /tmp/production-postfix.yml > /dev/null`
1. Make sure the `postfix_ca` and `postfix_ssl` sections, as well as `cloudgov_pw` were regenerated.

## Rotate DKIM key
This procedure is based on this document:  https://wiki.debian.org/opendkim

Log into a host that has opendkim installed on it.  You can `apt-get install opendkim opendkim-tools`
to get this going, or just log into something with the postfix release installed on it.

```
opendkim-genkey -D /tmp/ -d cloud.gov -s mail
```
This should generate `/tmp/mail.txt` and `/tmp/mail.private`.

Update DNS to have the TXT record in it.  The file is currently https://github.com/18F/cg-provision/blob/master/terraform/stacks/dns/stack.tf
and here is an example of how to do this: https://github.com/18F/cg-provision/pull/404/files

Update the encrypted `production-postfix.yml` file with the private key and the TXT record.

## Push changes out there

Run all planning and production pipelines:

* `terraform-provision`:  to put DNS changes out there
* `deploy-postfix`: plan and deploy this to get the certs/keys updated.

## Verification
Use the [Troubleshooting SMTP]({{ site.baseurl }}/docs/ops/runbook/troubleshooting-smtp/)
guide to verify the new username, password and certificates work as expected.
