---
menu:
  docs:
    parent: advanced
title: Communicating with external services
---

If your cloud.gov-hosted application needs access to an external service, that service must be accessible over the internet. All traffic from cloud.gov applications will transit the internet.

## Securing communications with external services

You can set up your cloud.gov application to communicate with any external service available over the internet. To ensure only your application can communicate with the external service, the service should be configured to authenticate each client using client-specific credentials.

Authentication options:

* **cloud.gov client application connecting to external services:** If your application on cloud.gov needs to be a client of an existing server application outside of cloud.gov, your application on cloud.gov can have a TLS certificate that the server application validates, or you can use application-level authentication (such as Authorization headers). In addition, you can configure outside services to accept connections from the cloud.gov egress address range (below). You can connect to those external services using HTTPS or TCP.
* **cloud.gov server application accepting external client connections:** If you have a server application on cloud.gov that needs to secure connections from a client application outside of cloud.gov, your server application can limit inbound IP ranges using a [user-provided service instance](https://docs.cloudfoundry.org/devguide/services/user-provided.html) of a [route service](https://docs.cloudfoundry.org/devguide/services/route-binding.html) and set up application-level client authentication, such as Authorization headers. (In the current cloud.gov architecture, your server application on cloud.gov cannot use protocol-level authentication, such as a TLS certificate, to authenticate with a client application outside of cloud.gov.)

## Restricting network exposure of an external service 

Some service providers filter clients based on IP ranges to minimize the surface area of their service on the open internet. If your service provider requires this, you can provide the cloud.gov egress addresses below to the people who handle network security for the service. 

**Note:** Filtering by IP address **alone** will only ensure that traffic is originating from a cloud.gov application. It provides no guarantee that the traffic is from _your_ application. Applications from other agencies and [sandbox accounts]({{< relref "overview/pricing/free-limited-sandbox.md" >}}) will also originate from the same addresses.


### cloud.gov egress ranges
All traffic from cloud.gov-hosted applications originates from these IP ranges:

* `52.222.122.97/32`
* `52.222.123.172/32`


