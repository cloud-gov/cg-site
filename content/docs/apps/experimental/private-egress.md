---
menu:
  docs:
    parent: experimental
title: Communicating with private external services
---

You can set up all, or just a subset, of your applications to be able to communicate privately and securely with external services in your agency infrastructure or with other cloud providers.

## How it works

Normally, any application deployed to cloud.gov gets placed onto one, or in the case of multiple instances, many servers or cells. These cells are shared by all applications using containers for resource separation, allocation, and security. This also means they share the internal routes of egress and firewalling to offered services, like databases.

cloud.gov has the ability to work with you to establish an isolated set of servers, or cells, where only your Organization can place applications that need access to services that you control on other networks. Your applications will still be accessible from the Internet and can still connect to any of our offered internal services, just like any other applications on the platform, but they will have additional access to services on your networks. These networks will be connected with a Virtual Private Network (VPN) using industry standard Internet Protocol Security (IPSec) protocol. We can work with you to establish the number of required isolated servers to handle your workload of applications that would need this type of access to your networks and services.

{{< diagrams id-prefix="colocated-diagram" >}}
graph TB;
  internet[Internet]

  subgraph cloud.gov
    router[Router]
    subgraph Customer Isolation Segment
      cg-vpn-endpoint[cloud.gov VPN Endpoint]
      subgraph Isolated Cell
        isolated-app[Isolated Application]
      end
    end
    subgraph Shared Segment
      subgraph Shared Cell
        normal-app[Normal tenant application]
      end
    end
    subgraph cloud.gov Services
      database[Shared Database]
    end
  end
  subgraph Customer Network
    customer-vpn-endpoint[Customer VPN Endpoint]
    subgraph Private Network
      private-service[Customer Service]
    end
  end

  internet--Web-->router
  router-->isolated-app
  router-->normal-app
  isolated-app--Shared Security Group-->database
  normal-app--Shared Security Group-->database
  isolated-app--Isolation Security Group---cg-vpn-endpoint
  cg-vpn-endpoint---customer-vpn-endpoint
  customer-vpn-endpoint---private-service
{{< /diagrams >}}

**NOTE**: At this time, only IKEv1 key exchance is supported, so make sure that your endpoint supports this.

To use this service, you must have an internet-routable IP address to use as the endpoint for the connection. If you have a firewall in place between the Internet and your endpoint, then you will have to open both ingress and egress on UDP 500, and TCP/IP Protocol 50, to make use of this service. If you are also using NAT behind your firewall, you will also have to enable UDP 4500.

### Contact support to configure private service access

_Note: As of July 2018, this feature is not yet available, pending FedRAMP approval. If you want to configure this feature, create a ticket and our team will let you know our estimated timeline for approval._

Create a [support ticket](mailto:cloud-gov-support@gsa.gov?subject=Private%20Egress%20Request) requesting that we proceed. In your request, please provide the following:

 - Public IP address of your endpoint
 - The CIDR(s) of the private network(s) you would like connectivity
 - The type of endpoint you are using. E.g. OpenSwan or Palo Alto PANOS Firewall
 - Approximate number of applications that will be making use of this service

We will provide you with details for the connection that includes:

 - Egress IPs from cloud.gov to expect your traffic
 - Configuration details for the endpoint encryption, including a Pre-Shared Key (PSK)
 - The CIDR of the isolated subnet so you can setup routing across your endpoint
 - More information on how to deploy your applications to your isolated segment of the platform

The connection will be initiated and maintained from your end. This might require that you monitor and healthcheck the connection from your side. If at any point the connection is closed, your applications will not be able to access your private network(s).
