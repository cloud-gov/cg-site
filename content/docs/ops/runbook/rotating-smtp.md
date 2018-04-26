---
menu:
  docs:
    parent: runbook
layout: ops

title: Rotating Secrets VII - SMTP
---

## Introduction
In order to send outbound mail there is a internal postfix mail relay.  Postfix
uses TLS certificates to secure the communications, and SASL to authenticate
the mail clients.

Rotation requires a small amount of downtime while the service is deployed
and restarted.

## Rotate TLS Certificates
The following keys from the
[Postfix Deployment Pipeline](https://github.com/18F/cg-deploy-postfix/blob/master/secrets.example.yml)
can be rotated using the `openssl` command line:

1. `postfix_tls_cert`: `smtp.fr.cloud.gov.crt`
2. `postfix_tls_key`: `smtp.fr.cloud.gov.key`

```sh
# Generate CA
SMTP_STATIC_IP=XXX.XXX.XXX.XXX

cat <<EOF > /tmp/gencert.yml
variables:
- name: postfix_ca
  type: certificate
  options:
    is_ca: true
    common_name: postfix_ca
- name: postfix_ssl
  type: certificate
  options:
    ca: postfix_ca
    common_name: ${SMTP_STATIC_IP}
    alternative_names: [ ${SMTP_STATIC_IP}, "smtp.fr.cloud.gov" ]
EOF

# generate the certs/keys/etc
bosh int /tmp/gencert.yml --vars-store /tmp/cert-out.yml

# extract the crt file (contains both the CA cert and the cert for the service)
bosh int /tmp/cert-out.yml --path /postfix_ssl/certificate > smtp.fr.cloud.gov.crt
bosh int /tmp/cert-out.yml --path /postfix_ssl/ca >> smtp.fr.cloud.gov.crt

# extract the key file
bosh int /tmp/cert-out.yml --path /postfix_ssl/private_key > smtp.fr.cloud.gov.key
```

## Rotate SASL Credentials
Rotate the SASL credentials from the
[Postfix Deployment Pipeline](https://github.com/18F/cg-deploy-postfix/blob/master/secrets.example.yml)
by generating a new password as needed and place under `postfix_sasl_users`:

```sh
openssl rand 48 -base64
```

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

Run all planning and production pipelines:
  * `terraform-provision`:  to put the DNS changes out there
  * `deploy-postfix`: plan and deploy this to get the certs/keys updated.

## Verification
Use the [Troubleshooting SMTP](https://cloud.gov/docs/ops/runbook/troubleshooting-smtp/)
guide to verify the new username, password and certificates work as expected.
