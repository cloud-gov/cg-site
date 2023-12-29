---
layout: post
date: December 29th 2023
title: "December 29th cloud.gov Change Log"
excerpt: The cloud.gov team is working on providing change logs so everyone can see new features and updates.
---

# Change Log - Goodbye 2023, looking foward to the New Year!

## Customer Facing Changes
---

The audience for this section is developers who maintain applications on cloud.gov and may need to respond to stack or buildpack changes.

### CF-Deployment - v35.3.0 to v34.2.0

* Changes below are broken down by component

### dotnet-core-buildpack 2.4.17 to 2.4.18

* Add node 20.10.0, remove node 18.18.0
* Add dotnet-sdk 8.0.100
* Add dotnet-runtime 8.0.0
* Add dotnet-aspnetcore 8.0.0
* Add dotnet-sdk 7.0.404, remove dotnet-sdk 7.0.401
* Add dotnet-runtime 7.0.14, remove dotnet-runtime 7.0.11
* Add dotnet-aspnetcore 7.0.14, remove dotnet-aspnetcore 7.0.11
* Add dotnet-sdk 6.0.417, remove dotnet-sdk 6.0.414
* Add dotnet-runtime 6.0.25, remove dotnet-runtime 6.0.22
* Add dotnet-aspnetcore 6.0.25, remove dotnet-aspnetcore 6.0.22

Packaged binaries:

* bower	1.8.14	
* dotnet-aspnetcore	6.0.25	
* dotnet-aspnetcore	7.0.14	
* dotnet-aspnetcore	8.0.0	
* dotnet-runtime	6.0.25	
* dotnet-runtime	7.0.14	
* dotnet-runtime	8.0.0	
* dotnet-sdk	6.0.417	
* dotnet-sdk	7.0.404	
* dotnet-sdk	8.0.100	
* libgdiplus	6.1
* libunwind	1.7.2
* node	20.10.0

Default binary versions:

* dotnet-runtime 6.0.x
* dotnet-aspnetcore 6.0.x
* dotnet-sdk 6.0.x
* bower 1.8.x

### PHP-Buildpack 4.6.12 to 4.6.13

* Add php 8.1.26, remove php 8.1.24
* Add php 8.2.13, remove php 8.2.11

Packaged binaries:

* appdynamics 23.7.1-751
* composer 2.6.5
* httpd 2.4.58
* newrelic 10.11.0.3
* nginx 1.24.0
* nginx 1.25.3
* php 8.1.26
* php 8.1.25
* php 8.2.13
* php 8.2.12
* python 2.7.18
* ruby 3.0.5

Default binary versions:

* php 8.1.25
* httpd 2.4.58
* newrelic 10.11.0.3
* nginx 1.25.3
* composer 2.6.5


### CF CLI  1.56.0 up from 1.53.0

This release contains the following versions of the CF CLI:


| Major Version | Prior Version | Current Version |
| --------------|---------------|-----------------|
| v8 | 8.7.6 | [8.7.6](https://github.com/cloudfoundry/cli/releases/tag/v8.7.6) |
| v7 | 7.7.6 | [7.7.6](https://github.com/cloudfoundry/cli/releases/tag/v7.7.6) |
| v6 | 6.53.0 | [6.53.0](https://github.com/cloudfoundry/cli/releases/tag/v6.53.0) |




### CFLinuxfs4 - 1.61.0 up from 1.54.0 

Notably, this release addresses:

* `USN-6535-1 USN-6535-1`: curl vulnerabilities:
    * `CVE-2023-46218`: cookie mixed case PSL bypass
    * `CVE-2023-46219`: HSTS long file name clears contents
    * `CVE-2023-46219`: HSTS long file name clears contents
    * `CVE-2023-46218`: cookie mixed case PSL bypass

* `USN-6541-1 USN-6541-1`: GNU C Library vulnerabilities:
    * `CVE-2023-4813`: A flaw was found in glibc. In an uncommon situation, the gaih_inet function may use memory that has been freed, resulting in an application crash. This issue is only exploitable when the getaddrinfo function is called and the hosts database in /etc/nsswitch.conf is configured with SUCCESS=continue or SUCCESS=merge.
    * `CVE-2023-4806`: A flaw was found in glibc. In an extremely rare situation, the getaddrinfo function may access memory that has been freed, resulting in an application crash. This issue is only exploitable when a NSS module implements only the nss_gethostbyname2_r and nss_getcanonname_r hooks without implementing the nss*_gethostbyname3_r hook. The resolved name should return a large number of IPv6 and IPv4, and the call to the getaddrinfo function should have the AF_INET6 address family with AI_CANONNAME, AI_ALL and AI_V4MAPPED as flags.
    * `CVE-2023-5156`: A flaw was found in the GNU C Library. A recent fix for CVE-2023-4806 introduced the potential for a memory leak, which may result in an application crash.
    * `CVE-2023-4806`: A flaw was found in glibc. In an extremely rare situation, the getaddrinfo function may access memory that has been freed, resulting in an application crash. This issue is only exploitable when a NSS module implements only the nss_gethostbyname2_r and nss_getcanonname_r hooks without implementing the nss*_gethostbyname3_r hook. The resolved name should return a large number of IPv6 and IPv4, and the call to the getaddrinfo function should have the AF_INET6 address family with AI_CANONNAME, AI_ALL and AI_V4MAPPED as flags.
    * `CVE-2023-4813`: A flaw was found in glibc. In an uncommon situation, the gaih_inet function may use memory that has been freed, resulting in an application crash. This issue is only exploitable when the getaddrinfo function is called and the hosts database in /etc/nsswitch.conf is configured with SUCCESS=continue or SUCCESS=merge.
    * `CVE-2023-5156`: A flaw was found in the GNU C Library. A recent fix for CVE-2023-4806 introduced the potential for a memory leak, which may result in an application crash.

## Platform Changes
---

This section is for the platform operators at `cloud.gov` to highlight changes to Cloud Foundry components, this is likely not of interest for developers using the platform.


### Metrics-discovery 

The usage of this release has been deprecated.

### Bpm 1.2.11 to 1.2.12

* Updates golang package golang-1-linux to 1.21.5


### CAPI - v1.166.0 to v1.167.0

* CC API Version: 2.218.0 and 3.153.0
* Service Broker API Version: 2.15

CAPI Release

* Increase default max nginx upload size to 2GB

* Dependency Bumps
  * Bump rubocop to v1.59.0
  * Bump Golang to go1.21.5 

Cloud Controller

* Adapt Periodic Puma Metrics 
* Expose puma stats as prometheus metrics 
* Use sub query for user visibility filter
* Fix: Polling stopped after failed service instance update last operation fetch
* Fix missing statsd config error on workers
* Remove unused statsd clients
* Improve draining (for Puma)
* Dependency Bumps
  * Bump rubocop from 1.57.2 to 1.58.0
  * Bump openssl to v3.2.0
  * Bump json_pure from 2.6.3 to 2.7.1
  * Bump fog-google from 1.22.0 to 1.23.0
  * Bump sequel from 5.74.0 to 5.75.0
  * Bump oj from 3.16.1 to 3.16.2
  * Bump solargraph from 0.49.0 to 0.50.0
  * Bump debug from 1.8.0 to 1.9.0
  * Bump addressable from 2.8.5 to 2.8.6
  * Bump rubocop from 1.58.0 to 1.59.0

cc-uploader

* Dependency Bumps
  * Bump github.com/onsi/ginkgo/v2 from 2.13.1 to 2.13.2
  * Bump actions/setup-go from 4 to 5
  * Bump code.cloudfoundry.org/lager/v3 from 3.0.2 to 3.0.3

tps

* Dependency Bumps
  * Bump github.com/onsi/ginkgo/v2 from 2.13.1 to 2.13.2
  * Bump actions/setup-go from 4 to 5
  * Bump code.cloudfoundry.org/lager/v3 from 3.0.2 to 3.0.3

Cloud Controller Database Migrations

* None

### cf-networking 3.38.0 to 3.39.0

* Bump to go 1.21.5


### CF-Smoketests 42.0.117 to 42.0.118

* Bump golang, cf-cli and smoke_tests packages


### Diego 2.85.0 to 2.87.0

* BBS [Run migration and save migration version in single transaction](https://github.com/cloudfoundry/bbs/pull/76)
* Rep [Make max_containers configurable](https://github.com/cloudfoundry/diego-release/pull/868)
* Executor [Ignore EntryNotFound and AlreadyClosed errors when cleaning up cache](https://github.com/cloudfoundry/executor/pull/89)
* Route-emitter [Add AZ to registry message](https://github.com/cloudfoundry/route-emitter/pull/29)
* Rep [Send AZ in StartActualLRP/EvacuateRunningActualLRP requests to BBS](https://github.com/cloudfoundry/rep/pull/48)




### Garden-Runc 1.45.0 to 1.47.0

* Lots of refactoring including the ability to run the test suite in parallel!


### Log-cache 3.0.8 to 3.0.9

* Bump dependencies
* Bump packaged Golang to go1.20.12

### Loggregator-agent 7.7.2 to 7.7.3

* Bump packaged Golang to v1.20.12
* Forwarder Agent removes `__v1_type` tag when forwarding metrics to OTel Collector, fixing an issue where metrics emitted as v1 envelopes were being dropped by the prometheusexporter

### Nats 56.12.0 to 56.14.0 

* Bug fix: nats has logs again!
* Bug fix: don't run the nats migrator for the nats job when the nats job is disabled


### Prometheus 29.6.0 to 29.7.0

* add `retro_compat.enable_delta`
* Various bumps:
  * Bump Collectd-Exporter to 0.6.0
  * Bump Credhub-Exporter to v0.33.0
  * Bump Graphite-Exporter to 0.15.0
  * Bump Grafana to v9.5.15
  * Bump InfluxDB-Exporter to 0.11.5
  * Bump Memcached-Exporter to 0.14.1
  * Bump Postgres-Exporter to 0.15.0
  * Bump Prometheus2 to 2.48.1
  * Bump Pushgateway to 1.6.2
  * Bump Statsd-Exporter to 0.26.0


### Routing 0.284.0 to 0.285.0

* A new `localhost:8082` endpoint has been added for retrieving the routing table on gorouter. This is in preparation of removing non-TLS LB-health check endpoints from the public `:8080` listener for increased security. `/var/vcap/jobs/gorouter/bin/retrieve-local-routes` is updated and still the official way to retrieve the local routing table on a gorouter. The port this listens on can be configured via the `router.status.routes.port` property.
* A new TLS-enabled endpoint for LB health checks has been added on `:8443`. This can be configured via the `router.status.tls.port`, `router.status.tls.certificate` and `router.status.tls.key properties`.
* routing-api has been updated to work towards supporting a TLS-only CF deployment.
* gorouter's proxy package received some test enhancements for increased test stability.
* gorouter's `pool.Endpoint.Equals()` received a performance improvement
* Route-registrar will now fail if it configured to talk to NATS without using TLS. This can be toggled via the `nats.fail_if_using_nats_without_tls` property.

***A Note to Other CF Platform Operators***

If you have any custom releases bound to port 8443 on gorouters, this release will cause you issues with the health check.

### Silk 3.38.0 to 3.39.0

* Bump to go 1.21.5

### Statsd-injector 1.11.36 to 1.11.37

* Bump packaged Golang to go1.20.12


### UAA 76.26.0 to 76.27.0

* Bump `github.com/cloudfoundry/bosh-utils` from 0.0.414 to 0.0.416 in `/src/acceptance_tests`
* Fix pre-start.erb for Jammy FIPS stemcell

## Final Note

Wishing you all success and happiness in the new year!
