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
openssl genrsa -out smtp.fr.cloud.gov.ca.key 2048
openssl req -x509 -new -nodes -key smtp.fr.cloud.gov.ca.key -days 365 -out smtp.fr.cloud.gov.ca.pem \
-subj "/C=US/ST=DC/L=Washington/O=GSA/OU=TTS-18F/CN=smtp.fr.cloud.gov/emailAddress=cloud-gov-operations@gsa.gov"

# Generate Certificate Private Key
openssl genrsa -out smtp.fr.cloud.gov.key 2048

# Generate Certificate Signing Request
openssl req -new -key smtp.fr.cloud.gov.key -out smtp.fr.cloud.gov.csr \
-subj "/C=US/ST=DC/L=Washington/O=GSA/OU=TTS-18F/CN=smtp.fr.cloud.gov/emailAddress=cloud-gov-operations@gsa.gov"

openssl x509 -req -in smtp.fr.cloud.gov.csr -CA smtp.fr.cloud.gov.ca.pem -CAkey smtp.fr.cloud.gov.ca.key \
-CAcreateserial -out smtp.fr.cloud.gov.crt -days 365
```

## Rotate SASL Credentials
Rotate the SASL credentials from the
[Postfix Deployment Pipeline](https://github.com/18F/cg-deploy-postfix/blob/master/secrets.example.yml)
by generating a new password as needed and place under `postfix_sasl_users`:

```sh
openssl rand 48 -base64
```

## Verification
Use the [Troubleshooting SMTP](https://cloud.gov/docs/ops/runbook/troubleshooting-smtp/)
guide to verify the new username, password and certificates work as expected.