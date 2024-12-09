---
parent: management
layout: docs
sidenav: true
redirect_from:
    - /docs/apps/limits/
title: Set org, space, and app limits
---

Org Managers are free to configure your org's [quota]({{ site.baseurl }}{% link _docs/pricing/quotas.md %}) capacity among your spaces and applications as you see fit. This enables Org Managers to limit usage and corresponding costs.

## Org

See more about how to [manage your orgs' quotas]({{ site.baseurl }}{% link _docs/orgs-spaces/limits.md %}).

## Space

Org Managers can [create and modify space quota plans](https://docs.cloudfoundry.org/adminguide/quota-plans.html#space) to limit the resources used by spaces. See the CF CLI documentation for [`create-space-quota`](http://cli.cloudfoundry.org/en-US/cf/create-space-quota.html) to create the quota plan, and create a space with that quota plan using [`create-space`](http://cli.cloudfoundry.org/en-US/cf/create-space.html) (which has the option `[-q SPACE_QUOTA]`).

## App

Space Developers can specify application limits in your [application manifest](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html) or as `cf push` command line options.

### Application limit options

`memory: / -m`
- **Default:** `1GB`
- **Minimum:** `Based on the app's usage and runtime requirements`
- **Maximum:** `Based on organization's quota and its provisioned apps`

The application memory limit. This setting has a dual-purpose, as your application compute limit is derived from its memory limit. This relationship is explained in detail [here](https://docs.cloudfoundry.org/concepts/container-security.html#cpu).

`disk_quota / -k`
- **Default:** `2GB`
- **Minimum:** `Based on the app's source and dependencies disk size`
- **Maximum:** `7GB`

The maximum amount of disk space available to your app.

`instances: / -i`
- **Default:** `1`
- **Minimum:** `0`
- **Maximum:** `Based on organization's quota and its provisioned apps`

Sets the number of application instances to launch. Each additional instance receives the same memory and disk reservation. An application with a manifest specifying `memory: 256M` and `instances: 4` would reserve 1GB (256M x 4) total.

**Limited:**

The application cannot access more than the specified amount of memory.


### Application limit options: sizing

- The environment default of 512MB `memory:` is sufficient for most applications. Static sites and utility applications such as schedulers or loaders may require less. Use `cf app APPNAME` to check your application's current memory and compute utilization.

```shell
		requested state:   started
routes:            test-python-flask-triumphant-springhare-yq.app.cloud.gov
last uploaded:     Mon 09 Dec 15:51:15 EST 2024
stack:             cflinuxfs4
buildpacks:        
	name               version   detect output   buildpack name
	python_buildpack   1.8.30    python          python

type:           web
sidecars:       
instances:      1/1
memory usage:   256M
     state     since                  cpu    memory          disk           details
#0   running   2024-12-09T20:51:30Z   0.0%   30.3M of 256M   217.2M of 2G  
```

- Any application which exceeds its memory limit will be automatically restarted. Use `cf events APPNAME` to look for 'out of memory' crashes.

```shell
		... description
		... index: 0, reason: CRASHED, exit_description: out of memory, exit_status: 255
```
