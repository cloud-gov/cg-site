---
menu:
  docs:
    parent: advanced
aliases:
  - /docs/apps/experimental/private-egress/
title: Connect to your private network
---

You can set up all or a subset of your applications to communicate securely with an external network. This enables your cloud.gov applications to access services hosted in your agency infrastructure or with other cloud providers.

By default, cloud.gov runs your application instances on a pool of hosts shared by all cloud.gov customers. Application instances run in containers that isolate them from each other, but the hosts are all running in the same network segment. If you open your private external service network for access by cloud.gov applications, you will also permit network access by other cloud.gov customers.

To prevent network access by other cloud.gov customers, you can request that cloud.gov establish a dedicated set of hosts for your organization. Applications run by other cloud.gov customers will not run on these hosts. Your applications will still be accessible from the internet and can still connect to any of our offered internal services. cloud.gov will work with you to give these dedicated hosts additional access to your private networks.

*You can alternatively [secure communication for a single application and service at a time]({{< relref "docs/apps/static-egress" >}}).*

## How it works

cloud.gov will establish a dedicated pool of hosts for your cloud.gov applications sufficient to handle the workload you anticipate running there. This dedicated pool of hosts will be in a dedicated network segment.

cloud.gov support will work with you to establish a Virtual Private Network (VPN) between the dedicated network segment and your network using the industry-standard Internet Protocol Security (IPSec) protocol.

{{< diagrams id-prefix="network-diagram" >}}
graph TB;
  client[Client]

subgraph AWS GovCloud
    elb[Elastic Load Balancer]
    cg-vpn-endpoint["cloud.gov VPN Endpoint <br /> (AWS Site to Site VPN)"]
  subgraph cloud.gov Responsibility
    router[Router]
    subgraph Dedicated Segment
      subgraph Dedicated Hosts
        isolated-app[Isolated Applications]
      end
    end
    subgraph Shared Segment
      subgraph Shared Hosts
        normal-app[Default Applications]
      end
    end
    subgraph cloud.gov Services
      database[Shared Database]
    end
  end
end

  subgraph Customer Responsibility
    customer-vpn-endpoint[Customer VPN Endpoint]
    dlp["Data Loss Prevention Solution"]
    subgraph Private Network
      private-service[Private Service]
    end
  end


  client--internet-->elb
  elb-->router
  router-->isolated-app
  router-->normal-app
  isolated-app--shared network rules-->database
  normal-app--shared network rules-->database
  isolated-app--dedicated network rules-->cg-vpn-endpoint
  cg-vpn-endpoint-- "IPsec (via internet)" ---customer-vpn-endpoint
  customer-vpn-endpoint---dlp
  dlp-->private-service
  {{< /diagrams >}}

To use this service, you must have an internet-routable IP address to use as the IPsec endpoint for the connection. If you have a firewall in place between the internet and your endpoint, then you will have to open both ingress and egress on UDP port 500 and ESP (IP Protocol 50) to enable the connection. If you are also using NAT behind your firewall, you will also have to enable UDP port 4500.

To be compatible with this feature, your IPsec endpoint must support IKEv1 key exchange along with AES128 encryption, SHA256 hashing, and Diffie Hellman Group 14 (MODP 2048) for Perfect Forward Secrecy (PFS). You should opt for AES256 encryption whenever possible. Your IPsec endpoint can be either a software or hardware device. Here is a list of compatible options we are prepared to support (in addition to open source IPsec endpoints such as strongSWAN and OpenSwan):

<!-- List from https://docs.aws.amazon.com/AmazonVPC/latest/NetworkAdminGuide/Introduction.html#DevicesTested -->

- Check Point Security Gateway running R77.10 (or later) software
- Cisco ASA running Cisco ASA 8.2 (or later) software
- Cisco IOS running Cisco IOS 12.4 (or later) software
- Dell SonicWALL running SonicOS 5.9 (or later) software
- Fortinet Fortigate 40+ Series running FortiOS 4.0 (or later) software
- Juniper J-Series running JunOS 9.5 (or later) software
- Juniper SRX running JunOS 11.0 (or later) software
- Juniper SSG running ScreenOS 6.1, or 6.2 (or later) software
- Juniper ISG running ScreenOS 6.1, or 6.2 (or later) software
- Netgate pfSense running OS 2.2.5 (or later) software.
- Palo Alto Networks PANOS 4.1.2 (or later) software
- Yamaha RT107e, RTX1200, RTX1210, RTX1500, RTX3000 and SRT100 routers
- Microsoft Windows Server 2008 R2 (or later) software
- Microsoft Windows Server 2012 R2 (or later) software
- Zyxel Zywall Series 4.20 (or later) software for statically routed VPN connections, or 4.30 (or later) software for dynamically routed VPN connections

### How to get a dedicated pool of cloud.gov hosts connected to your organization

Your Org Admin should request a dedicated pool of hosts for your applications  by creating a [support ticket](mailto:cloud-gov-support@gsa.gov?subject=Private%20Egress%20Request). In your request, please provide the following:

 - Public IP address of your endpoint
 - The CIDR(s) of the private network(s) you would like to connect
 - The type of endpoint you are using (e.g. Openswan or Palo Alto PANOS Firewall)
 - Approximate number of applications that will be making use of this service

We will provide you with details for the connection including:

 - Egress IPs for traffic originating in your dedicated pool
 - Configuration details for the endpoint encryption, including a Pre-Shared Key (PSK)
 - The CIDR of the dedicated subnet so you can setup routing across your endpoint
 - More information on how to deploy your applications to your isolated segment of the platform

The connection will be initiated and maintained from your network. You should monitor and check the health of the connection from your side. If at any point the connection is closed, your cloud.gov applications will not be able to access your private network until you reestablish the connection.
