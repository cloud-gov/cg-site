---
menu:
  main:
    parent: apps
title: Quotas
weight: -10
---

#### Quotas:

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
2. Reconfigure existing [Application Quotas](#application-quotas) and redeploy.
3. Request a quota change by an administrator via a [DevOps issue](https://github.com/18F/DevOps/issues).

#### Application Quotas:

As a Cloud Foundry user you’re free to divide your organization's quota capacity amongst your applications as you see fit by way of application quotas. Application limits are specified in your application manifest or as `cf push` command line options.

###### Application Quota Options:

`memory: / -m`

The application memory limit. This setting has a dual-purpose as your application compute limit is derived from its memory limit. This relationship is explained in detail below.

`disk_quota / -k`

The maximum amount of disk space available to your app.

`instances: / -i`

Sets the number of application instances to launch. Each additional instance receives the same memory and disk reservation. An application with a manifest specifying `memory: 256M` and `instances: 4` would reserve 1GB (256M x 4) total.

###### Application Quota Options : Memory Share equals Compute Share

As noted above, your application's compute limit is derived from a its memory limit. Each application receives a compute share equal to its relative share of memory.

For example, with a 1 unit (3.75GB) quota:

- `memory: 1875`
	- Guaranteed at least 50% vCPU time.
	- Offered up to 100% vCPU time. 
	- Limited to 1.875GB of RAM.
- `memory: 375`
	- Guaranteed at least 10% vCPU time. 
	- Offered up to 100% vCPU time. 
	- Limited to 375MB of RAM.

**Guaranteed:**

Your application will receive at least this much vCPU time even if there are other applications competing for time.

**Offered:** 

Your application can use all available CPU time. If there are other applications competing for time, each application's guaranteed share determines how much time it will receive.

**Limited:**

The application cannot access more than the specified amount of memory.


###### Application Quota Options : Sizing

- The environment default of 512MB `memory:` is sufficient for most applications. Static sites and utility applications such as schedulers or loaders may require less. Use `cf app APPNAME` to check your application's current memory and compute utilization.

		requested state: started
		instances: 1/1
		usage: 128M x 1 instances
		urls: 
		last uploaded: Wed Jul 22 20:09:56 UTC 2015
		
		     state     since                    cpu    memory          disk          
		#0   running   2015-07-30 05:58:11 PM   0.0%   94.6M of 128M   80.4M of 128M      


- Any application which exceeds its memory quota will be automatically restarted. Use `cf events APPNAME` to look for 'out of memory' crashes.

		... description   
		... index: 0, reason: CRASHED, exit_description: out of memory, exit_status: 255 


