---
layout: post
date: November 9th 2023
title: "November 9th Cloud.gov Change Log"
excerpt: The Cloud.gov team is working on providing change logs so everyone can see new features and updates.
---

# Change Log - Happy almost Turkey Day!

## Customer Facing Changes
---

### CF-Deployment - v33.1.0 to v33.4.0

* Changes below are broken down by component

### CFLinuxfs4 - 1.49.0 up from 1.46.0

Notably, this bump addresses:

* USN-6452-1 USN-6452-1: Vim vulnerabilities:
* USN-6450-1 USN-6450-1: OpenSSL vulnerabilities:


### Java-Buildpack 4.63.0 up from 4.62.0

This release includes the Java quarterly patch releases, as well as updates to the following frameworks/agents:

* AppDynamics
* Azure App Insights
* Datadog
* Elastic APM
* JRebel
* Java CfEnv
* Splunk Otel
* Tomcat

Working on adding Java 21 support by default, for the moment users can add 21 as a version line in the [config file](https://github.com/cloudfoundry/java-buildpack/blob/main/config/open_jdk_jre.yml) - since the binaries are already available, bundling the buildpack will then include this version.

For a more detailed look at the changes in 4.63.0, please take a look at the [commit log](https://github.com/cloudfoundry/java-buildpack/compare/v4.62.0...v4.63.0). The packaged version of the buildpack, suitable for use with create-buildpack and update-buildpack, can be found attached to this release.


### NodeJS Buildpack v1.8.19 up from v1.8.18
* Add node 20.9.0, remove node 20.8.0 for stack(s) cflinuxfs4, cflinuxfs3
* Uncached buildpack SHA256: 61cc8acec791d0b4014b252811d841ac5c569b3fd003b194135f248c4bbec260
* Uncached buildpack SHA256: cf9cab4597267890f03b746134e0af4c8af9bcfc4ba9c146148d9c978c23ff35


### CF CLI  1.50.0 up from 1.49.0

This release contains the following versions of the CF CLI


| Major Version | Prior Version | Current Version |
| --------------|---------------|-----------------|
| v8 | 8.7.3 | [8.7.4](https://github.com/cloudfoundry/cli/releases/tag/v8.7.4) |
| v7 | 7.7.3 | [7.7.4](https://github.com/cloudfoundry/cli/releases/tag/v7.7.4) |
| v6 | 6.53.0 | [6.53.0](https://github.com/cloudfoundry/cli/releases/tag/v6.53.0) |



## Platform Changes
---


### CAPI - v1.164.0 up from v1.163.0


* CC API Version: 2.215.0 and 3.150.0
* Service Broker API Version: 2.15
* CAPI Release
  * Bump rubocop from 1.56.4 to 1.57.2
  * Bump Redis from 7.2.1 to 7.2.2
  * Bump rubocop-rspec from 2.24.1 to 2.25.0
* Cloud Controller
  * Restructure runner spec [cloudfoundry/cloud_controller_ng#3462](https://github.com/cloudfoundry/cloud_controller_ng/pull/3462)
  * Throw different error when route binding status is delete_failed or delete_in_progess / Treat route binding in status create_failed as non-existent [cloudfoundry/cloud_controller_ng#3469](https://github.com/cloudfoundry/cloud_controller_ng/pull/3469)
  * Use consistent hash structure for process stats [cloudfoundry/cloud_controller_ng#3470](https://github.com/cloudfoundry/cloud_controller_ng/pull/3470)
  * Exclude the newly added Readme.md file when checking applied migrations [cloudfoundry/cloud_controller_ng#3475](https://github.com/cloudfoundry/cloud_controller_ng/pull/3475)
  * Connection should not fail in case of diego issues [cloudfoundry/cloud_controller_ng#3471](https://github.com/cloudfoundry/cloud_controller_ng/pull/3471)
  * Run the ensure_migrations_are_current rake task in a spec [cloudfoundry/cloud_controller_ng#3476](https://github.com/cloudfoundry/cloud_controller_ng/pull/3476)
  * Remove unneeded psych gem [cloudfoundry/cloud_controller_ng#3486](https://github.com/cloudfoundry/cloud_controller_ng/pull/3486)
  * replace --auto-correct with --autocorrect [cloudfoundry/cloud_controller_ng#3487](https://github.com/cloudfoundry/cloud_controller_ng/pull/3487)
  * Correct list of buildpack states in docs [cloudfoundry/cloud_controller_ng#3489](https://github.com/cloudfoundry/cloud_controller_ng/pull/3489)
  * Fix issue with rake spec creating 'cc_test_' database instead of 'cc_test' [cloudfoundry/cloud_controller_ng#3483](https://github.com/cloudfoundry/cloud_controller_ng/pull/3483)
  * Adds microsecond timestamp precision on the asg_latest_update table [cloudfoundry/cloud_controller_ng#3484](https://github.com/cloudfoundry/cloud_controller_ng/pull/3484)
  * Implement additional audit events [cloudfoundry/cloud_controller_ng#3490](https://github.com/cloudfoundry/cloud_controller_ng/pull/3490)
  * Update JDK for UAA development Docker container [cloudfoundry/cloud_controller_ng#3497](https://github.com/cloudfoundry/cloud_controller_ng/pull/3497)
* Dependency Bumps
  * Bump rubocop from 1.56.4 to 1.57.2
  * Bump honeycomb-beeline from 3.0.0 to 3.0.1
  * Bump cf-uaa-lib from 4.0.3 to 4.0.4
  * Bump redis from 5.0.7 to 5.0.8
  * Bump mock_redis from 0.37.0 to 0.38.0
  * Bump rubocop-rspec from 2.24.1 to 2.25.0
  * Bump rubocop-rails from 2.21.2 to 2.22.1
  * Bump rake from 13.0.6 to 13.1.0
  * Bump newrelic_rpm from 9.5.0 to 9.6.0
* cc-uploader
  * Bump golang.org/x/net from 0.14.0 to 0.17.0
  * Bump github.com/onsi/gomega from 1.28.0 to 1.29.0
* tps
  * Bump golang.org/x/net from 0.14.0 to 0.17.0
  * Bump github.com/onsi/gomega from 1.28.0 to 1.29.0
  * Bump google.golang.org/grpc from 1.57.0 to 1.57.1
* Cloud Controller Database Migrations
  * [20231016094900_microsecond_timestamp_msql_asg_update.rb](https://github.com/cloudfoundry/cloud_controller_ng/blob/84832ff9ad9b8e261c4b5516d069701d7b165330/db/migrations/20231016094900_microsecond_timestamp_msql_asg_update.rb)



### CF-Networking 3.35.0 up from 3.34.0
* Increase default value for `max_policies_per_app_source` from 50 to 150. 
* Bug fix: update the policy-server `last_updated` timestamp to have microsecond precision. Previously it had second level precision, this created a race condition when multiple c2c policies were updated at nearly the same time, but the vxlan-policy-agent would only pick up the first update. 

### Diego 2.84.0 up from 2.83.0
* Bumps envoy to [v1.28.0](https://github.com/envoyproxy/envoy/releases/tag/v1.28.0)
* BBS DesiredLRPHandler now sends Stop/Update LRP requests to rep in parallel
* Log rate limit metrics are no longer generated for tasks
* App Logs will now emit messages for when they run pre-start scripts and when they invoke the startup command, to make troubleshooting just that much easier


### Garden-Runc 1.43.0 up from 1.41.0
* The `garden-healthchecker` process was found to be too aggressive when evaluating and acting upon failed healthchecks. It has been removed.
* Built with go 1.21.3
* Bump golang dependencies
* Bump ruby testing dependencies

### Routing 0.283.0 up from 0.282.0
* Adds missing timings to non-http backend requests, e.g. websockets. ([cloudfoundry/gorouter#363](https://github.com/cloudfoundry/gorouter/pull/363)
* Adds ability for gorouter to verify mTLS Client Certificate metadata (#355)
* CI Enhancements and updates
* Package Dependency bumps

### Syslog v12.2.0 up from v12.1.10
* Features
  * Add a new, optional, structured data param key, `environment`, to `instance@47450`. This is useful for cases where log lines should be tagged with an operator provided string but need to vary from the director name.
Maintenance
  * Bump blackbox dependencies.


### UAA 76.24.0 up from 76.23.0
* New UAA
  * Bump to UAA [v76.24.0](https://github.com/cloudfoundry/uaa/releases/tag/v76.24.0)
  * The versions 76.22.0 and 76.23.0 contain a regression regarding the empty secret change. If you need to have an empty secret in your clients and you create them later via REST calls, use this version.
* Runtime
  * Upgrade Java version 11 -> 17 (Bellsoft JDK 17.0.9+11)
* Dependency Bumps
  * Bump github.com/cloudfoundry/bosh-utils from 0.0.406 to 0.0.407
  * Bump mini_portile2 from 2.8.4 to 2.8.5 by @dependabot
  * Bump github.com/onsi/gomega from 1.28.0 to 1.28.1 in /src/acceptance_tests by @dependabot
  * Bump github.com/cloudfoundry/bosh-utils from 0.0.407 to 0.0.408 in /src/acceptance_tests by @dependabot


