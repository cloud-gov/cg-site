---
menu:
  docs:
    parent: advanced
title: Set org, space, and app limits
---

Org Managers are free to configure your org's [quota]({{< relref "docs/pricing/quotas.md" >}}) capacity among your spaces and applications as you see fit. This enables Org Managers to limit usage and corresponding costs.

## Org

To view your [org quota]({{< relref "docs/pricing/quotas.md" >}}):

1. List the details about your org: `cf org <org>`
2. Find your quota name from the `quota:` property.
3. View your quota: `cf quota <quota>`

To change your org quota, [ask support](/help/). You can request an increase in number of [application routes]({{< relref "docs/apps/custom-domains.md" >}}) or [service instances]({{< relref "docs/apps/managed-services.md" >}}) with no cost impact. Increasing or decreasing org memory quota changes your usage costs.

### Tracking quota usage

You can use the following `cf` CLI plugins to help identify the right quota to set for your org. They are available from the _CF-Community_ plugin site: `cf add-plugin-repo CF-Community https://plugins.cloudfoundry.org/`

- The [Usage Report plugin](https://github.com/krujos/usagereport-plugin) gives you a report of how your quota is used across visible organizations and spaces. To install: `cf install-plugin 'Usage Report' -r CF-Community`

- The [Statistics plugin](https://github.com/swisscom/cf-statistics-plugin) gives you real-time visibility of the actual memory usage for each application instance compared to the memory limit. To install: `cf install-plugin Statistics -r CF-Community`

You can use these two in combination to get a good sense of where you can lower instance memory limits to make room for more instances elsewhere in your org or just reduce your quota to reduce costs. 

## Space

Org Managers can [create and modify space quota plans](https://docs.cloudfoundry.org/adminguide/quota-plans.html#space) to limit the resources used by spaces. See the CF CLI documentation for [`create-space-quota`](http://cli.cloudfoundry.org/en-US/cf/create-space-quota.html) to create the quota plan, and create a space with that quota plan using [`create-space`](http://cli.cloudfoundry.org/en-US/cf/create-space.html) (which has the option `[-q SPACE_QUOTA]`).

## App

Space Developers can specify application limits in your [application manifest](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html) or as `cf push` command line options.

### Application limit options

`memory: / -m`

The application memory limit. This setting has a dual-purpose, as your application compute limit is derived from its memory limit. This relationship is explained in detail below.

`disk_quota / -k`

The maximum amount of disk space available to your app.

`instances: / -i`

Sets the number of application instances to launch. Each additional instance receives the same memory and disk reservation. An application with a manifest specifying `memory: 256M` and `instances: 4` would reserve 1GB (256M x 4) total.

### Application limit options: memory share equals compute share

As noted above, your application's compute limit is derived from its memory limit. Each application receives a compute share equal to its relative share of memory.

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


### Application limit options: sizing

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
