---
layout: post
title: "Fixing certificate validation errors from AWS CLI when using the cg-egress-proxy"
date: November 4, 2022
excerpt: How to fix certificate errors if you are using the AWS CLI from an application protected by the cg-egress-proxy
---

If you are using the [`cg-egress-proxy`](https://github.com/GSA/cg-egress-proxy) to restrict the egress traffic for your application, you may experience certificate validation errors which prevent you from [interacting with brokered AWS services using the CLI](https://cloud.gov/docs/services/s3/#interacting-with-your-s3-bucket-from-outside-cloudgov).

The cause of the issue is that AWS CLI is overriding certificates that cloud.gov provides and preventing the AWS CLI from being able to validate TLS connections, thus causing CLI commands to fail.

To force the AWS CLI to use the system CA cert stores, you can add this environment variable:

```shell
AWS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
```

Environment variables can be set for your application by using a [manifest](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest-attributes.html#env-block), the [`cf set-env` CLI command](https://cli.cloudfoundry.org/en-US/v7/set-env.html), or in the [`.profile` file for your application](https://docs.cloudfoundry.org/devguide/deploy-apps/deploy-app.html#profile). For applications running custom Docker images, you could also set this environment variable in the [`Dockerfile` for your image](https://docs.docker.com/engine/reference/builder/).