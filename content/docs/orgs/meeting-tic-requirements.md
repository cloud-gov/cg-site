---
menu:
  docs:
    parent: orgs
title: Meeting TIC requirements with cloud.gov
---
It is your responsibility to identify and comply with relevant Trusted Internet Connetions (TIC) requirements as guided by your agency. To help you do this as a cloud.gov tenant, here is architectural information about cloud.gov.

## Formal statement of customer responsibility

The cloud.gov System Security Plan has a formal description of customer responsibility under CA-3 (3).

## Architecture examples
The [TIC reference architecture v2.0](https://s3.amazonaws.com/sitesusa/wp-content/uploads/sites/482/2015/04/TIC_Ref_Arch_v2-0_2013.pdf) includes two use case examples on pages 63 and 64 that are relevant for using cloud.gov Here are versions of those two diagrams with cloud.gov implementation information:

### Use case 1: A public-facing website with unrestricted access by the public

[diagram goes here]

A TIC is not required for the public accessing an application hosted on cloud.gov because it is not traffic traversing an agency boundary.

The orange "encrypted tunnel" securing the connection from your agency’s TIC egress to cloud.gov is our TLS implementation. You access both api.fr.cloud.gov and yourapp.app.cloud.gov exclusively over HTTPS. Your browser will always default to HTTPS based on the inclusion of the cloud.gov domain in [the HSTS preload list](https://hstspreload.org/). (If you try to directly access those domains via HTTP, you will be 301 redirected over to HTTPS. So the tunnel is always present.)

When an administrator wants to interact with the deployed application (either through the application itself or through the cloud.gov API) that traffic should go over a TIC connection before it even hits our endpoint. It's your agency’s responsibility to make sure that happens. Your agency can accomplish this with an operational requirement that all administrative access happens via the agency network. This operational requirement can be enforced by [requiring users from your domain to access cloud.gov services only from network locations that will require traversal of a TIC connection]({{< relref "docs/orgs/restricting-users-to-trusted-ip-ranges.md" >}}).

Any traffic that is going from an agency-authorized boundary (eg physical network of an agency building, or collective virtual boundary for all networked agency buildings) to one that it is not under your agency’s control (eg the open internet, or cloud.gov) is presumably already routed over a TIC connection to the outside world.

For remote workers/partners outside the normal agency network boundary, routing cloud.gov-bound traffic over the agency network and TIC happens by requiring use of a VPN (shown in Use Case 2).



### Use case 2: A controlled-access website with remote users

[diagram goes here]

For connections directly through the "front door" of deployed applications, such as administrator access on a Wordpress site, you'd have use application logic, route-services, an operational requirement, etc. to funnel that access in an application-appropriate way.
