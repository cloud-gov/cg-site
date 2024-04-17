---
layout: post
date: October 15, 2021
title: "October 15th Cloud.gov Change Log" 
excerpt: It’s a new fiscal year! The Cloud.gov team is working on providing change logs so everyone can see new features and updates.
---

# Happy New Fiscal Year!

It’s a new fiscal year! The Cloud.gov team is working on providing change logs so everyone can see new features and updates.

# Change Log
## Customer Facing
---

### AWS Broker - AWS Elasticsearch (Opensearch)

* Advanced Options is now available for new and existing instances, this allows developers to change two values for that cluster: `indices.fielddata.cache.size` and `indices.query.bool.max_clause_count`

Find more at [AWS Elasticsearch Broker Docs](https://cloud.gov/docs/services/aws-elasticsearch/#advanced-options)

### Staticfile Buildpack - 1.5.26 up from 1.5.25
* Add Configurable HTTP/2 Support

Note: Cloud.gov has not enabled HTTP/2 for the platform yet

### Secure Proxy - 51 up from 50
* Added HTTPS support to allow use of HTTPS in gorouters
* Cloud.gov has transitioned AWS Load Balancers to send all traffic via HTTPS

### Go Buildpack - 1.9.36 up from 1.9.35
* Add go 1.16.8, remove go 1.16.6
* Add go 1.17.1
* Bump libbuildpack-dynatrace to v1.4.1

### Nginx Buildpack - 1.1.32 up from 1.1.31
* Add nginx 1.21.3, remove nginx 1.21.1

### NodeJS Buildpack - 1.7.62 up from 1.7.61
* Update default node version to 16.x
* Add yarn 1.22.15, remove yarn 1.22.10
* Add node 14.18.0, remove node 14.17.5
* Add node 16.10.0, remove node 16.7.0

### PHP Buildpack - 4.4.46 up from 4.4.45
* Change default php version to 7.4.23
* Add php 7.4.24, remove php 7.4.21
* Add php 8.0.11, remove php 8.0.8
* Add php 7.3.31, remove php 7.3.29
* Add httpd 2.4.49, remove httpd 2.4.48
* Add composer 2.1.8, remove composer 2.1.6
* Add nginx 1.21.3, remove nginx 1.21.1

### Python Buildpack - 1.7.46 up from 1.7.45
* Add setuptools 58.1.0, remove setuptools 57.4.0
* Add python 3.9.7, remove python 3.9.5
* Add python 3.8.12, remove python 3.8.10

### R Buildpack - 1.1.22 up from 1.1.21
* Rebuild r 4.1.1
* Rebuild r 3.6.3

### Ruby Buildpack - 1.8.47 from 1.8.46 
* Auto merge pull request 339
* Add yarn 1.22.12, remove yarn 1.22.10
* Add node 14.18.0, remove node 14.17.5
* Add bundler 2.2.28, remove bundler 2.2.26
* Add rubygems 3.2.28, remove rubygems 3.2.26

## Platform Changes
---
### BPM - 1.1.14 up from 1.1.13
What's Changed
* Customize shutdown signal to send SIGINT to Postgres by @bgandon
* Update golang dependencies

### CAPI - 1.119.0 up from 1.118.0
Highlights
* CC API Version: 2.173.0 and 3.108.0
* Service Broker API Version: 2.15

CAPI Release
* CAPI Release PR #202 Ensure that job is unmonitored before monitoring it again

Cloud Controller
* Cloud Controller PR #2521 Enforce service name uniqueness in shared services in spaces
* Cloud Controller PR #2532 Simplify roles query for performance


### CF CLI - 1.34.0 up from 1.33.0
This release contains the following versions of the CF CLI


Major Version | Prior Version | Current Version
--------------|---------------|-----------------
v8 | - | 8.0.0
v7 | 7.3.0 | 7.3.0
v6 | 6.53.0 | 6.53.0

### CF Networking - 2.39.0 up from 2.38.0
Release Highlights
* Go 1.16 has GO111Module on by default. This release converts silk-release to be compatible with those changes
* Updates the policy-server to use the ANSI_QUOTES sql_mode when making connections to help with MySQL 8 compatibility
* Added support service-discovery-controller to use NATS + TLS (Thanks @46bit!)
* Tested with silk-release v2.39.0

Security Fixes
* Bumped golang to v1.16.8 to address CVE-2021-39293


### CFLinuxfs3 - 0.262.0 up from 0.259.0
CVES:
* USN-5079-3 USN-5079-3: curl vulnerabilities:
  * https://launchpad.net/bugs/1944120: Regression in USN-5079-1
* USN-5089-1 USN-5089-1: ca-certificates update:
  * https://launchpad.net/bugs/1944481: Distrust "DST Root CA X3"
* USN-5102-1 USN-5102-1: Mercurial vulnerabilities:
  * CVE-2019-3902: A flaw was found in Mercurial before 4.9. It was possible to use symlinks and subrepositories to defeat Mercurial's path-checking logic and write files outside a repository.
  * CVE-2018-17983: cext/manifest.c in Mercurial before 4.7.2 has an out-of-bounds read during parsing of a malformed manifest entry.



### Log Cache - 2.11.4 up from 2.11.2
* Adds mTLS to nozzle metrics endpoint to ensure Prom Scraper can collect metrics from nozzle
* log-cache-nozzle metrics config is optional. If it is not configured metrics will not be scraped by prom scraper.
* Allow for running garbage collection as part of cache pruning process
* Run GC after a configurable number of cache prunes
* Change default truncation interval from 500ms to 1s
* bump-golang to v0.87.0

### Prometheus - 26.6.0 up from 26.5.0
Features
* Add ops file to monitor BOSH Director metrics #420
* Switch stemcell from Xenial to Bionic #419
* Add new improved CF Dashboards (v2) #423 (thanks @thehandsomezebra)
  * Apps: Latency
  * Apps: System
  * CF: BBS
  * CF: Cell Summary
  * CF: Cells Capacity
  * CF: Cloud Controller
  * CF: KPIs
  * CF: LRPs & Tasks
  * CF: Route Emitter
  * CF: Space Summary
* Add links to other v2 dashboards
  * Component Metrics v2
  * Metron Agent v2
  * Doppler Server v2

### Routing - 0.225.0 up from 0.224.0
Release Highlights
* Improved health checking for gorouter- monit will now restart the gorouter process if the gorouter stops responding to http requests on its health port
* Switched from vendoring golang-1-linux to golang-1.16-linux to keep us pinned at Go 1.16 for the time being
* Go 1.16 has GO111Module on by default. This release converts routing-release to be compatible with those changes
* As a result of the conversion to a Go module release, we updated and moved away from having many of our external dependencies in a submodule to a vendored package.
* Security Fix: Update golang to resolve CVE-2021-39293 where specially crafted inputs could cause panics/fatal errors in archive/zip

### Silk - 2.39.0 up from 2.38.0
Release Highlights
* Adds a new experimental feature to rate limit outbound connections in containers (Thanks for the PR @IvanHristov98!)
* Go 1.16 has GO111Module on by default. This release converts silk-release to be compatible with those changes
* Updates silk to use the ANSI_QUOTES sql_mode when making connections to help with MySQL 8 compatibility
* Tested with cf-networking-release v2.38.0

Security Fixes
* Bumped golang to v1.16.8 to address CVE-2021-39293

### UAA - 75.8.0 up from 75.7.0
Features
* Support logout for OpenId proxy mode
* Client creation endpoint with two secrets

Bug Fixes
* Add Vendor specific statements to retrieve authorities for user
* Postgresql: add lower index for user db

