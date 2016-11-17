---
menu:
  docs:
    parent: advanced
title: Application limits
---

As a Cloud Foundry user you’re free to divide your [organization's quota]({{< relref "overview/pricing/quotas.md" >}}) capacity amongst your applications as you see fit by way of application limits. Application limits are specified in your application manifest or as `cf push` command line options.

## Application Limit Options:

`memory: / -m`

The application memory limit. This setting has a dual-purpose as your application compute limit is derived from its memory limit. This relationship is explained in detail below.

`disk_quota / -k`

The maximum amount of disk space available to your app.

`instances: / -i`

Sets the number of application instances to launch. Each additional instance receives the same memory and disk reservation. An application with a manifest specifying `memory: 256M` and `instances: 4` would reserve 1GB (256M x 4) total.

## Application Limit Options : Memory Share equals Compute Share

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


## Application Limit Options : Sizing

- The environment default of 512MB `memory:` is sufficient for most applications. Static sites and utility applications such as schedulers or loaders may require less. Use `cf app APPNAME` to check your application's current memory and compute utilization.

		requested state: started
		instances: 1/1
		usage: 128M x 1 instances
		urls:
		last uploaded: Wed Jul 22 20:09:56 UTC 2015

		     state     since                    cpu    memory          disk          
		#0   running   2015-07-30 05:58:11 PM   0.0%   94.6M of 128M   80.4M of 128M      


- Any application which exceeds its memory limit will be automatically restarted. Use `cf events APPNAME` to look for 'out of memory' crashes.

		... description   
		... index: 0, reason: CRASHED, exit_description: out of memory, exit_status: 255
