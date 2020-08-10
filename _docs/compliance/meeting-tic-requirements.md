---
parent: compliance
layout: docs
sidenav: true
title: Meeting TIC requirements
redirect_from:
  - /docs/orgs/meeting-tic-requirements
---

Agencies hosting workloads on cloud.gov need to ensure compliance
with the [DHS CISA Trusted Internet
Connections](https://www.cisa.gov/trusted-internet-connections)
program.  In September 2019, OMB released [Memo
M-19-26](https://www.whitehouse.gov/wp-content/uploads/2019/09/M-19-26.pdf),
that specified new standards for TIC 3.0, and DHS CISA is currently
developing new guidance for workloads hosted in PaaS cloud environments.

We at cloud.gov are working with the TIC program office to ensure
our customers have a smooth path to cloud adoption. At this point
agencies are not expected to wait for the TIC PaaS Use Case before
hosting workloads in cloud environments.  OMB and CISA have
acknowledged that agencies are already utilizing PaaS, and they are
working to embed current best practices, including those already
in place at cloud.gov, into the forthcoming guidance.

If you need agency user or developer traffic to traverse a TIC
point, then some of the architectural guidance related to TIC 2.0
is provided below.

### Restricting developer and operator access to cloud.gov services

You can ensure that developer and operator access to cloud.gov
services traverses your agency's TIC so that you can monitor all
changes to your organizations, spaces, applications and services.
The diagram below shows how the traffic flows.

{% mermaid_diagram id-prefix="Figure-1.-Restricting-changes-to-agency-origin" %}
graph TB

subgraph Agency network
  A((Agency user))
  TIC
end

subgraph cloud.gov boundary
  IPFilter[TIC IP filter]
  APIRouter
  subgraph Agency information system
    App
  end
end

subgraph Internet
  B((Agency user))
end

A -->TIC
TIC -->|"TLS (encrypted tunnel)"| IPFilter
B -.->|"TLS (encrypted tunnel)"|IPFilter
IPFilter --> APIRouter[cloud.gov API]
APIRouter -->|Change app| App

{% endmermaid_diagram %}

Any traffic from an agency-authorized boundary (eg physical network of an agency building, or collective virtual boundary for all networked agency buildings) to one that it is not under your agency’s control (e.g. the open internet, or cloud.gov) is likely already routed over a TIC connection.

For requests originating from your agency’s TIC egress bound for cloud.gov, our TLS implementation plays the role of the orange "encrypted tunnel" in Figure 14 of the [TIC 2.0 reference architecture](https://www.doi.gov/sites/doi.gov/files/uploads/tic_ref_arch_v2-0_2013.pdf) [external link]. You will access both api.fr.cloud.gov and yourapp.app.cloud.gov exclusively over TLS because the cloud.gov domain is included in [the HSTS preload list](https://hstspreload.org/) for your browser. (If you try to directly access those domains via HTTP, your request will be 301 redirected over to HTTPS; it's not possible to get any other response without TLS.)

cloud.gov's TLS endpoint is not restricted, but rather accessible over the open internet. When an administrator wants to interact with the deployed application through the cloud.gov API, it's your agency’s responsibility to make sure that traffic goes over a TIC connection before it reaches its destination on cloud.gov. For example, you may not want users to be able to manipulate applications on cloud.gov from their home connection or via a wifi access point in the local coffee shop.

Your agency can accomplish this by establishing an operational requirement that all administrative access to cloud.gov services happens via the agency network. You can further enforce this requirement with a technical control: Prevent users in your domain from using the cloud.gov API except from your agency's TIC egress range. Requests from an IP origin that does not match the range we have on record for your TIC (the dotted/dashed line in the diagram) will be rejected.

### Restricting usage of your application

You may also need to restrict access through the "front door" of your deployed applications, such as administrator access to a Wordpress site, or public access to an internal-only service. The diagram below shows where you can implement this restriction.

{% mermaid_diagram id-prefix="Figure-2.-Restricting-client-access-to-your-application" %}
graph TB

subgraph Internet
  RUser((Agency user))
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

{% endmermaid_diagram %}

For remote workers or partners outside the normal agency network boundary, you can require use of a VPN to ensure that cloud.gov-bound traffic is routed over the agency network and TIC (shown in Figure 15 of the [TIC 2.0 Reference architecture](https://www.doi.gov/sites/doi.gov/files/uploads/tic_ref_arch_v2-0_2013.pdf) [external link]).

You can then reject requests to your app unless they come from your agency's TIC egress range. You can do this by modifying your application logic.
