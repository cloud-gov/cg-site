---
menu:
  main:
    parent: pricing
title: Quotas
weight: -10
---

Cloud Foundry capacity is billed by quota. Quotas provide a not to exceed reservation of memory, compute, application routes and service instances. Quotas are associated with and billed to a project IAA number or equivalent billing tag. Quota capacity is a hard limit, unused capacity does not ‘roll over’ month to month.

##### Quota Billing:

Quotas are billed by the unit and tallied daily. A monthly bill might include 9 days at 1 unit, 11 days at 2 units and 10 days at 4 units.

##### Quota Units:

Each unit provides.

- 10 application routes.
- 3.75GB of RAM.
- 1 vCPU of compute.
- 6 service instances.

###### Routes:

Hostname and domain pairs where an application that exposes a listening port can be reached.

###### RAM:

The amount of RAM available to your applications.

###### vCPU:

Derived from RAM. The share of CPU time available to your applications.

###### Service Instances:

The number of service instances available to your organization. In the near future, service instances will be billed separately based on the service plan chosen and daily usage.

###### Quota Limits:

If a new application `push` would exceed your organization's quota the request will fail with status code `400` and a message describing the limit that would be exceeded.

**Example:**

	Creating app APPLICATION in org ORG / space SPACE as USER...
	FAILED
	Server error, status code: 400, error code: 100007, message: You have exceeded the instance memory limit for your organization's quota.

In this situation you have three options:

1. Delete existing resources with `cf delete`, `delete-service`, `delete-route` or similar.
2. Reconfigure individual existing [Application Quotas]({{< relref "apps/quotas.md" >}}) and redeploy.
3. Request a quota change by an administrator via a [DevOps issue](https://github.com/18F/DevOps/issues).



