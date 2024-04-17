---
layout: post
date: March 16th 2023
title: "March 16th Cloud.gov Change Log"
excerpt: The Cloud.gov team is working on providing change logs so everyone can see new features and updates. Happy March Madness!
---

# Change Log

## Customer Facing Changes
---
### Binary Buildpack - v1.1.3 up from v1.1.2
* Updating github-config
  * Uncached buildpack SHA256: 5523f4077d792b386671421f31899f409ea8ce5b8ae781cb4f84358cd138b5fd
  * Uncached buildpack SHA256: 5dd66be045a50d1e4f1dc12e317e85add9fbe74734b3f9882a8a02578b66809f
  * Uncached buildpack SHA256: 50836f839547c13d6ef435d87ce8e2b4863fdfe32343a26514d321cc8455d177
  * Uncached buildpack SHA256: 1f72560521b626e5012934f39f62d31192f6bf8c3b6ec5a91f5216ff1e36b5ae

### CFLinuxfs3 - 0.356.0 up from 0.352.0
* USN-5923-1 USN-5923-1: LibTIFF vulnerabilities
* USN-5767-3 USN-5767-3: Python vulnerability
* USN-5921-1 USN-5921-1: rsync vulnerabilities
* USN-5871-2 USN-5871-2: Git regression
* USN-5900-1 USN-5900-1: tar vulnerability
* USN-5891-1 USN-5891-1: curl vulnerabilities
* USN-5870-1 USN-5870-1: apr-util vulnerability
* USN-5871-1 USN-5871-1: Git vulnerabilities
* USN-5855-1 USN-5855-1: ImageMagick vulnerabilities

### CFLinuxfs4 - 0.72.0 up from 0.64.0
* USN-5923-1 USN-5923-1: LibTIFF vulnerabilities
* USN-5921-1 USN-5921-1: rsync vulnerabilities
* USN-5908-1 USN-5908-1: Sudo vulnerability
* USN-5900-1 USN-5900-1: tar vulnerability
* USN-5901-1 USN-5901-1: GnuTLS vulnerability
* USN-5891-1 USN-5891-1: curl vulnerabilities
* USN-5885-1 USN-5885-1: APR vulnerability

### Dotnet-Core-Buildpack - 2.4.8 up from 2.4.7
* Add dotnet-runtime 6.0.14, remove dotnet-runtime 6.0.13 (#748)
* Add dotnet-aspnetcore 6.0.14, remove dotnet-aspnetcore 6.0.13 (#747)
* Add dotnet-runtime 7.0.3, remove dotnet-runtime 7.0.2 (#746)
* Add dotnet-aspnetcore 7.0.3, remove dotnet-aspnetcore 7.0.2 (#745)
* Add dotnet-sdk 7.0.200, remove dotnet-sdk 7.0.102 (#744)
* Add dotnet-sdk 6.0.406, remove dotnet-sdk 6.0.405 (#742)
* Add node 18.14.2, remove node 18.14.0 (#743)
    for stack(s) cflinuxfs3, cflinuxfs4
* Update libbuildpack-dynatrace (#691)
* Removes compatibility table that only exists for brats tests and replaces it with simpler logic

### Go-Buildpack 1.10.6 up from 1.10.4
* Add go 1.20.1
for stack(s) cflinuxfs3, cflinuxfs4

### Nginx-Buildpack 1.2.1 up from 1.2.0
* Bump github.com/Dynatrace/libbuildpack-dynatrace from 1.5.1 to 1.5.2 (#186)
* Updating github-config

### NodeJS Buildpack v1.8.6 up from v1.8.5
* Add node 18.14.1, remove node 18.12.1 for stack(s) cflinuxfs4, cflinuxfs3
* Add node 16.19.1, remove node 16.18.1 for stack(s) cflinuxfs3, cflinuxfs4
* Add node 14.21.3, remove node 14.21.1 for stack(s) cflinuxfs3, cflinuxfs4
* Update Node 16.x deprecation date (Nodejs update on SSL deprecation) ref

### PHP buildpack v4.6.0 up fron v4.5.0
* Add composer 2.5.4, remove composer 2.5.2 for stack(s) cflinuxfs4, cflinuxfs3
* Bump newrelic to 10.6.0.318
* Add appdynamics 23.2.0-684, remove appdynamics 22.12.1-677 for stack(s) cflinuxfs4, cflinuxfs3
* Add cflinuxfs4 stack support

## Platform Changes
---
### Cf-cli release - v1.44 up from v1.41
| Major version |Prior version |	Current version
| -----| -----| -----|
| v8	| 8.5.0	| 8.6.0
|v7	| 7.5.0	| 7.6.0
|v6	| 6.53.0 | 6.53.0

### CF-Networking - v3.23.0 up from v3.22.0
* Bump to go 1.20.1
* Update healthchecker to 0.4.0
* Increase startup delay default to 30 seconds PR

### Diego Release - v2.72.0 up from v2.71.0
* Envoy bump to 1.25.1
* Metric tags can be updated for running containers
* Support for configurable entrypoints in buildpackapplifecycle (cloudfoundry/buildpackapplifecycle#58)

### Garden-Runc 1.25.0 up from 1.23.0
* Bump runc version to 1.1.4
* Bump containerd version to 1.6.19
* Fix #233
* Remove xfs-progs blob from release by @winkingturtle-vmw in #243
* Build iptables with musl and disable sharing by @winkingturtle-vmw in #251
* Build containerd from guardian by @winkingturtle-vmw in #253
* Bring back xfsprogs by @winkingturtle-vmw in #254
* Bump to go 1.20
* Update healthchecker to 0.4.0
* Increase startup delay default to 30 seconds PR

### Loggregator-Agent 7.1.0 up from 7.0.0
* Add app-id and drain url in the error message
* Sanitize ProcID in syslog messages so messages with utf-8 in the source_type are not dropped

### Nats 56 up from 54
* Built with go 1.19.4

### Prometheus 28.0.0 up from 27.2.2
* prometheus features can be enabled using spec prometheus.enable_features (#455, thanks @chitoku-k )
* cloudfoundry and bosh dashboards are fixed for Grafana 9 (fixes #453, #456, thanks @psycofdj)
* bump cf_exporter to v1.0.0 and rework job config (#457, #458, thanks @benjaminguttmann-avtq @psycofdj )
* ops-file manifests/operators/enable-cf-api-v3.yml has been deleted, use of v3 API is implied in new version of exporter
* nginx is aware of hosts file changes (#454, thanks @dark5un)
* various bumps (thanks @benjaminguttmann-avtq)
  * Stackdriver Exporter to v0.13.0
  * Redis Exporter to v1.48.0
  * Memcached Exporter to 0.11.2
  * InfluxDB Exporter to v0.11.3
  * HAProxy Exporter to v0.15.0
  * Graphite Exporter to 0.13.3
  * Grafana to 9.4.3
  * Prometheus to v2.42.0

### Routing 0.259.0 up from 0.257.0
* Update healthchecker to 0.4.0
* Increase startup delay default to 30 seconds PR
* Upgrade golang to 1.20.1
* No changes from last version.
* Fixing CI so that artifacts are generated correctly for github release.


