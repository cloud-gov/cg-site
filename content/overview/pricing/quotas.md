---
menu:
  overview:
    parent: pricing
title: Quotas
weight: -10
aliases:
  - /docs/intro/pricing/quotas
  - /intro/pricing/quotas
---

Cloud Foundry capacity is billed by quota. Quotas provide a not-to-exceed reservation of memory, compute, application routes and service instances. Quotas are associated with and billed to a project IAA number or equivalent billing tag. Quota capacity is a hard limit; unused capacity does not ‘roll over’ month to month.

## Quota Billing:

Quotas are billed by the amount of memory reserved and tallied daily. A monthly bill might include 9 days at 1 GB of RAM, 11 days at 2 GB of RAM and 10 days at 4 GB of RAM.

## Quota Limits:

Quotas limit the following resources:  

- Application routes.  
- Application memory.  
- Service instances.  
- Access to paid service plans.  

If a new application `push` would exceed your organization's quota, the request will fail with status code `400` and a message that describes the limit that would be exceeded.

**Example:**

  Creating app APPLICATION in org ORG / space SPACE as USER...
  FAILED
  Server error, status code: 400, error code: 100007, message: You have exceeded the instance memory limit for your organization's quota.

In this situation you have three options:

1. Delete existing resources with `cf delete`, `delete-service`, `delete-route` or similar.
2. Reconfigure individual existing [Application Quotas]({{< relref "docs/apps/limits.md" >}}) and redeploy.
3. Request a quota change by [asking support](/help/).
