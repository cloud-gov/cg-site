---
layout: post
date: November 23rd 2022
title: "November 23rd Cloud.gov Change Log"
excerpt: The Cloud.gov team is working on providing change logs so everyone can see new features and updates.
---

Happy Thanksgiving Week! The Cloud.gov team is working on providing change logs so everyone can see new features and updates. Highlights this time include redis and disk quotas!

# Change Log

## Customer Facing

---
### Noteworthy Changes and features
#### AWS Elasticache Redis versions
The aws broker now supports newer and multiple redis versions. Default redis is now AWS Elasticache Redis 6.2. Older and other versions can be selected by following https://cloud.gov/docs/services/aws-elasticache/#setting-optional-parameters.

Versions supported:
* 5.0.6 - previous default
* 6.0
* 6.2 - default
* 7.0

#### Application Disk Quota
The maximum Disk Quota an application can use is now 7GB up from 6GB. Disk Quota is how much disk space an application instance will have access to. 

Note: Disk Quota is not same as your organization's memory quota. 

Find how to specify disk quota here: https://cloud.gov/docs/management/limits/#app

### Go Buildpack - v1.10.0 up from v1.9.50

* Add support for cflinuxfs4 stack
* Add go 1.19.2, remove go 1.19 for stack(s) cflinuxfs4, cflinuxfs3
* Update Go Buildpack dependencies to only keep 1 of each patch version (latest)

### Java Buildpack - v4.53 up from v4.52

I'm pleased to announce the release of the java-buildpack, version 4.53. It primarily includes new OpenJDK versions, which are based on the Oracle Java Quarterly Updates for Oct 2022.

This release also includes an enhancement to the Sealights framework, more field are supported for a User-Provided service (Thanks to @alonweiss-sl via #964)

🚨 Deprecation of Spring Cloud Connectors & Spring Auto Reconfiguration 🚨

This release reverts the change made in v4.51 which disabled the Spring Auto Reconfiguration framework by default. From this release, it will be enabled by default as per all versions < 4.51. This is to provide users with more time to migrate to the recommended alternative library, java-cfenv. The default of disabled will now happen in a release after March 2023, and the library will be completely removed in a release after March 2024. As before, you may post feedback/comments to this issue.


### Nginx Buildpack - v1.1.45 up from v1.1.44

* Add nginx 1.23.2, remove nginx 1.23.1 for stack(s) cflinuxfs3
* Add nginx 1.22.1, remove nginx 1.22.0 for stack(s) cflinuxfs3

### Nodejs Buildpcak - v1.8.3 up from v1.8.2

* Add node 18.12.1, remove node 18.9.0
    for stack(s) cflinuxfs3, cflinuxfs4
* Add node 14.21.1, remove node 14.20.0
    for stack(s) cflinuxfs3, cflinuxfs4
* Add node 16.18.1, remove node 16.17.1
    for stack(s) cflinuxfs3, cflinuxfs4
    (https://www.pivotaltracker.com/story/show/183724805)
* Bumps go.mod go version to 1.19

### Staticfile Buildpack - v1.5.35 up from v1.5.34

* Add nginx 1.23.2, remove nginx 1.23.1 for stack(s) cflinuxfs3
* Add nginx 1.22.1, remove nginx 1.22.0 for stack(s) cflinuxfs3

## Platform Changes

---

### Capi - v1.141.0 up from 1.140.0

Highlights

* v3/routes returns shared routes
* Cloud Controller processes large manifests with a hard limit of 1MB
* Various performance improvements (optimized DB queries)

CC API Version: 2.193.0 and 3.128.0

Service Broker API Version: 2.15

CAPI Release
Cloud Controller
* v3/routes additionally returns shared routes (cloudfoundry/cloud_controller_ng#3037)
* Enable CC to process large manifests (cloudfoundry/cloud_controller_ng#3034)
* Add support for multiple certs per syslog_drain_url (cloudfoundry/cloud_controller_ng#3028)
* Cut DB query complexity in permissions/visibility checks (cloudfoundry/cloud_controller_ng#3043)
* Misc db optimizations (cloudfoundry/cloud_controller_ng#3052)
* Use foreign keys more to avoid DB queries (cloudfoundry/cloud_controller_ng#3033)
* Check space/org permissions by id, not guid (cloudfoundry/cloud_controller_ng#3021)
* More readable checks to see if any row exists (cloudfoundry/cloud_controller_ng#3053)
* Clean up unused/unnecessary permissions methods (cloudfoundry/cloud_controller_ng#3038)
* Fix v3 upgrade guide for audit_events (cloudfoundry/cloud_controller_ng#3039)
* Fix two typos in API docs (cloudfoundry/cloud_controller_ng#3031)
* Fix roles table in service instance delete docs (cloudfoundry/cloud_controller_ng#3023)
* Allow dependabot to update github actions (cloudfoundry/cloud_controller_ng#3040)

### Cflinuxfs3 - v0.332.0 up from v0.331.0

Notably, this release addresses:

USN-5716-1 USN-5716-1: SQLite vulnerability:
* CVE-2022-35737: SQLite 1.0.12 through 3.39.x before 3.39.2 sometimes allows an array-bounds overflow if billions of bytes are used in a string argument to a C API.

### Log Cache - v2.12.3 up from v2.12.2

* Bump to go1.19.3
* Bump dependencies

### Loggregator - v106.7.3 up from v106.7.2

* Bump to go1.19.3
* Bump dependencies
* Fix: race condition in the v1 ingestor server tests by @ctlong in #468

### Metrics-discovery - v3.2.3 up from v3.2.2

* Bump to go1.19.3
* Bump dependencies

### Routing - v0.239.0 up from v0.238.0

* Gorouter's pre-start script now reserves ports used by other CF components when it increases the number of ephemeral ports available via /proc/sys/net/ipv4/ip_local_reserved_ports. This resolves issues when components fail to start up during deploys/monit restarts due to accidental port collisions with outbound traffic from the VM. Thanks @ameowlia !
* Routing-release no longer makes use of the deprecated uaa-go-client, and uses go-uaa instead
* The routing_utils/nats_client helper utility now supports saving + loading gorouter's routing tables! Thanks @domdom82 !
* Fixed a memory leak with gorouter that resulted in HTTP request objects being held open if a client canceled the connection before the App responded. Thanks @geofffranks !

### Stemcell - v1.145 up from v1.122

* BOSH Agent Version: 2.468.0
* Patched for USN-5715-1: LibRaw vulnerabilities
* Patched for USN-5689-1: Perl vulnerability
* Patched for USN-5227-3: Pillow vulnerability
* Patched for USN-5714-1: LibTIFF vulnerabilities
* Patched for USN-5691-1: Linux kernel vulnerabilities

