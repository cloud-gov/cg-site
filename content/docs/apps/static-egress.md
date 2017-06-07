---
menu:
  docs:
    parent: advanced
title: Communicating with external services
---

If your cloud.gov-hosted application needs access to an external service, that service must be accessible over the internet. All traffic from cloud.gov applications will transit the internet.

## Securing communications with external services

You can set up your cloud.gov application to communicate with any external service available over the internet. To ensure only your application can communicate with the external service, the service should be configured to authenticate each client using client-specific credentials.

## Restricting network exposure of an external service 

Some service providers filter clients based on IP ranges to minimize the surface area of their service on the open internet. If your service provider requires this, you can provide the cloud.gov egress addresses to the people who handle network security for the service. All traffic from cloud.gov-hosted applications will originate from these IP ranges:

* `52.222.122.97/32`
* `52.222.123.172/32`

**Note:** Filtering by IP address **alone** will only ensure that traffic is originating from a cloud.gov application. It provides no guarantee that the traffic is from _your_ application. Applications from other agencies and [sandbox accounts]({{< relref "overview/pricing/free-limited-sandbox.md" >}}) will also originate from the same addresses.

