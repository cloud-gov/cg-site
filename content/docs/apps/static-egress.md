---
menu:
  docs:
    parent: advanced
title: Communicating with external services
---

If your cloud.gov-hosted application needs access to an external service, that service must be accessible over the internet. All traffic from cloud.gov applications will transit the internet.

## Securing communications with external services

You can set up your cloud.gov application to communicate with any external service available over the internet. To ensure only your application can communicate with the external service, the service should provide application-level authentication.

If the external service also requires IP filtering, you can allow access from the [cloud.gov egress addresses](#cloud-gov-egress-addresses).

**Note:** Filtering by IP address will only ensure that traffic is originating from a cloud.gov application, but it provides no guarantee that it is from your application. Applications from other agencies and [sandbox accounts]({{< relref "overview/pricing/free-limited-sandbox.md" >}}) will also originate from the same addresses.


## cloud.gov egress addresses

All traffic from cloud.gov-hosted applications will originate from these IP addresses:

* `52.222.122.97/32`
* `52.222.123.172/32`

