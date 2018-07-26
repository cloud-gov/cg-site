---
menu:
  docs:
    parent: experimental
title: Communicating with private external services
---

You can set up all, or just a subset, of your applications to be able communicate privately and securely with external services in your agency infrastructure or with other cloud providers.

## How it works

Normally, any application deployed to cloud.gov gets placed onto one, or in the case of multiple instances, many servers or cells. These cells are shared by all applications using containers for resource separation, allocation, and security. This also means they share the internal routes of egress and firewalling to offered services, like databases.

cloud.gov has the ability to work with you to establish an isolated set of servers, or cells, where only your Organization can place applications that need access to services that you control on other networks. Your applications will still be accessible from the Internet and can still connect to any of our offered internal services, just like any other applications on the platform, but they will have additional access to services on your networks. These networks will be connected with a Virtual Private Network (VPN) using industry standard Internet Protocol Security (IPSec) protocol. We can work with you to establish the number of required isolated servers to handle your workload of applications that would need this type of access to your networks and services.

{{< diagrams id-prefix="colocated-diagram" >}}
graph LR;
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
  isolated-app-->database
  normal-app-->database
  isolated-app-->cg-vpn-endpoint
  cg-vpn-endpoint-->customer-vpn-endpoint
  customer-vpn-endpoint-->private-service
{{< /diagrams >}}

### Contact support to configure private service access

_Note: As of July 2018, this feature is not yet available, pending FedRAMP approval. If you want to configure this feature, create a ticket and our team will let you know our estimated timeline for approval._

Create a [support ticket](mailto:cloud-gov-support@gsa.gov?body=CHANGEME) requesting more information about how to proceed.
