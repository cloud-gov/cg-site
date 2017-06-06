---
menu:
  docs:
    parent: advanced
title: Communicating with external services
---

If your cloud.gov-hosted application needs access to an external service it must be Internet accessible. All traffic from cloud.gov applications will transit the public Internet.

## Securing communications with external services

### IP filtering

All traffic from cloud.gov will originate from these IP addresses:

* `52.222.122.97/32`
* `52.222.123.172/32`

If the external service supports it, you can allow access from these IP addresses to ensure that requests are originating from a cloud.gov-hosted application.

### Application layer authentication

Filtering by IP address will only ensure that traffic is originating from a cloud.gov application, but it provides no guarantee that it is from your application. Applications from other agencies and [sandbox accounts]({{< relref "overview/pricing/free-limited-sandbox.md" >}}) will also originate from the same addresses.

To ensure only your application can communicate with the external service, the service should implement additional authentication in addition to IP filtering.
