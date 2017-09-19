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

### Use case 1: A public-facing website with unrestricted access by the public

[diagram goes here; see [source](https://docs.google.com/drawings/d/1YHiCD2hkydmBizi1UPgkWmRBCdO34YzXY6HDA_ueV4U/edit)]

Requests from the public accessing an application hosted on cloud.gov do not traverse an agency boundary, so TIC traversal is not relevant for that kind of traffic.

Any traffic that is going from an agency-authorized boundary (eg physical network of an agency building, or collective virtual boundary for all networked agency buildings) to one that it is not under your agency’s control (e.g. the open internet, or cloud.gov) is probably already routed over a TIC connection to the outside world.

For requests originating from your agency’s TIC egress bound for cloud.gov, our TLS implementation plays the role of the orange "encrypted tunnel" in Figure 14. You access both api.fr.cloud.gov and yourapp.app.cloud.gov exclusively over HTTPS. Your browser will always default to HTTPS based on the inclusion of the cloud.gov domain in [the HSTS preload list](https://hstspreload.org/). (If you try to directly access those domains via HTTP, you will be 301 redirected over to HTTPS; the tunnel is always present.)

cloud.gov's TLS endpoint is not restricted, but rather accessible over the open internet. When an administrator wants to interact with the deployed application (either through the application itself or through the cloud.gov API) it's your agency’s responsibility to make sure that traffic goes over a TIC connection before it reaches its destination on cloud.gov. For example, you may not want users to be able to manipulate applications on cloud.gov from their home connection or via a wifi access point in the local coffee shop.

Your agency can accomplish this by establishing an operational requirement that all administrative access to cloud.gov services and your applications happens via the agency network. 

This operational requirement can be enforced further for cloud.gov services by [requiring users from your domain to access only from network locations that will require traversal of a TIC connection]({{< relref "docs/orgs/restricting-users-to-trusted-ip-ranges.md" >}}).

For connections directly through the "front door" of deployed applications, such as administrator access on a Wordpress site, enforcement will require using application logic, route-services, etc. to restrict that access in an application-appropriate way.

### Use case 2: A controlled-access website with remote users

[diagram goes here; see [source](https://docs.google.com/drawings/d/1YHiCD2hkydmBizi1UPgkWmRBCdO34YzXY6HDA_ueV4U/edit)]

For remote workers or partners outside the normal agency network boundary, requiring use of a VPN will ensure that cloud.gov-bound traffic is routed over the agency network and TIC (shown in Figure 15).


