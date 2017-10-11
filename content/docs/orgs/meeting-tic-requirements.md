---
menu:
  docs:
    parent: orgs
title: Meeting TIC requirements with cloud.gov
---
It is your responsibility to identify and comply with relevant Trusted Internet Connetions (TIC) requirements as guided by your agency. To help you with compliance, here's guidance for interpreting [the TIC reference architecture v2.0](https://s3.amazonaws.com/sitesusa/wp-content/uploads/sites/482/2015/04/TIC_Ref_Arch_v2-0_2013.pdf) as it concerns cloud.gov.

## Formal statement of customer responsibility

The cloud.gov System Security Plan has a formal description of customer responsibility under CA-3 (3).

## Use-cases for accessing cloud.gov
The TIC reference architecture includes two use case examples on pages 63 and 64 that are relevant for federal agencies using cloud.gov. Here we describe how to interpret those use cases in the cloud.gov-specific context.

### Restricting administrator access to your application's deployment

{{< diagrams id-prefix="Restricting-access-to-cloud.gov-services" >}}
graph TB

subgraph Agency network
  A((Agency user))
  TIC
end

subgraph cloud.gov boundary
  APIRouter
  PRouter[App router] 
  subgraph Agency information system
    App
  end 
end

subgraph Internet
  PUser((Public user))
end

A -->TIC
PUser -->|"TLS (encrypted tunnel)"|PRouter
TIC -->|"TLS (encrypted tunnel)"| APIRouter[cloud.gov API]
APIRouter -->|Manage app| App
PRouter -->|Access app| App


{{< /diagrams >}}

Requests from the public accessing an application hosted on cloud.gov do not traverse an agency boundary, so TIC traversal is not relevant for that kind of traffic.

Any traffic that is going from an agency-authorized boundary (eg physical network of an agency building, or collective virtual boundary for all networked agency buildings) to one that it is not under your agency’s control (e.g. the open internet, or cloud.gov) is probably already routed over a TIC connection to the outside world.

For requests originating from your agency’s TIC egress bound for cloud.gov, our TLS implementation plays the role of the orange "encrypted tunnel" in Figure 14 of the TIC reference architecture. You access both api.fr.cloud.gov and yourapp.app.cloud.gov exclusively over HTTPS. Your browser will always default to HTTPS based on the inclusion of the cloud.gov domain in [the HSTS preload list](https://hstspreload.org/). (If you try to directly access those domains via HTTP, you will be 301 redirected over to HTTPS; the tunnel is always present.)

cloud.gov's TLS endpoint is not restricted, but rather accessible over the open internet. When an administrator wants to interact with the deployed application through the cloud.gov API, it's your agency’s responsibility to make sure that traffic goes over a TIC connection before it reaches its destination on cloud.gov. For example, you may not want users to be able to manipulate applications on cloud.gov from their home connection or via a wifi access point in the local coffee shop.

Your agency can accomplish this by establishing an operational requirement that all administrative access to cloud.gov services happens via the agency network. You can further enforce this requirement with a technical control: [Prevent users in your domain from using the cloud.gov API except from your agency's TIC egress range]({{< relref "docs/orgs/restricting-users-to-trusted-ip-ranges.md" >}}).

### Restricting usage of your application

You are responsible for restricting access directly through the "front door" of your deployed applications, such as administrator access on a Wordpress site, or all access in the case of an internal-only service. 

{{< diagrams id-prefix="Restricting-client-access-to-your-application" >}}
graph TB

subgraph Internet
  RUser((Remote worker))
  PUser((Public user))
end

subgraph Agency network
  AUser((Agency user))
  TIC
  VPN
end

subgraph cloud.gov boundary
  PRouter[App router] 
  subgraph Agency information system
    RouteService
    App
  end 
end

AUser -->TIC
RUser -->|VPN|VPN[VPN endpoint]
VPN --> TIC
PUser -->|"TLS (encrypted tunnel)"| PRouter[App router]
TIC -->|"TLS (encrypted tunnel)"| PRouter[App router]
PRouter -->|Access app| RouteService
RouteService[App logic or route service] --> App

{{< /diagrams >}}

For remote workers or partners outside the normal agency network boundary, you should require use of a VPN to ensure that cloud.gov-bound traffic is routed over the agency network and TIC (shown in Figure 15 of the TIC Reference architecture).

You should then reject requests to your app unless they come from your agency's TIC egress range. You can do this by modifying your application logic or deploying a [user-provided route-service](https://docs.cloudfoundry.org/services/route-services.html#user-provided) to act as a proxy. (You can create a simple route service by pushing an `nginx.conf` file with the desired configuration using the Staticfile buildpack.)




