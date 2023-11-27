---
layout: post
date: November 27th 2023
title: "November 27th cloud.gov Change Log"
excerpt: The cloud.gov team is working on providing change logs so everyone can see new features and updates.
---

# Change Log - Enjoy the Turkey Day leftovers!

## Customer Facing Changes
---

The audience for this section is developers who maintain applications on cloud.gov and may need to respond to stack or buildpack changes.

### CF-Deployment - v33.4.0 to v33.10.0

* Changes below are broken down by component

### CFLinuxfs4 - 1.51.0 up from 1.49.0

Notably, this bump addresses:

* `USN-6467-2`: Kerberos vulnerability: CVE-2023-36054: lib/kadm5/kadm_rpc_xdr.c in MIT Kerberos 5 (aka krb5) before 1.20.2 and 1.21.x before 1.21.1 frees an uninitialized pointer. A remote authenticated user can trigger a kadmind crash. This occurs because _xdr_kadm5_principal_ent_rec does not validate the relationship between n_key_data and the key_data array count.
* `USN-6477-1`: procps-ng vulnerability: CVE-2023-4016: Under some circumstances, this weakness allows a user who has access to run the “ps” utility on a machine, the ability to write almost unlimited amounts of unfiltered data into the process heap.


### Java-Buildpack 4.63.1 up from 4.63.0
* This release includes some agent framework dependency bumps, including a bug fix in Java CFEnv when using DB2, see [this issue](https://github.com/pivotal-cf/java-cfenv/issues/231) for more information.

* For a more detailed look at the changes in 4.63.1, please take a look at the [commit log](https://github.com/cloudfoundry/java-buildpack/compare/v4.63.0...v4.63.1). The packaged version of the buildpack, suitable for use with create-buildpack and update-buildpack, can be found attached to this release.



### CF CLI  1.53.0 up from 1.50.0

This release contains the following versions of the CF CLI:


| Major Version | Prior Version | Current Version |
| --------------|---------------|-----------------|
| v8 | 8.7.5 | [8.7.5](https://github.com/cloudfoundry/cli/releases/tag/v8.7.5) |
| v7 | 7.7.5 | [7.7.5](https://github.com/cloudfoundry/cli/releases/tag/v7.7.5) |
| v6 | 6.53.0 | [6.53.0](https://github.com/cloudfoundry/cli/releases/tag/v6.53.0) |



## Platform Changes
---

This section is for the platform operators at `cloud.gov` to highlight changes to Cloud Foundry components, this is likely not of interest for developers using the platform.


### BOSH DNS - v1.36.10 from 1.36.9

* Updates golang package golang-1-linux to 1.21.4
* Updates golang package golang-1-windows to 1.21.4

### BPM -  1.2.11 from 1.2.9

* Updates golang package golang-1-linux to 1.21.4
* Fixed CVEs:
  * [CVE-2023-39325](https://github.com/advisories/GHSA-4374-p667-p6c8): rapid stream resets can cause excessive work ([CVE-2023-44487](https://github.com/advisories/GHSA-qppj-fm5r-hxr3))

### CAPI - v1.165.0 up from v1.164.0

* CC API Version: 2.216.0 and 3.151.0
* Service Broker API Version: 2.15
* CAPI Release
  * Bump golang from 1.21.3 to 1.21.4
  * Bump redis from 7.2.2 to 7.2.3
* Cloud Controller
  * Enable CF API to present routable field for app processes [cloudfoundry/cloud_controller_ng#3500](https://github.com/cloudfoundry/cloud_controller_ng/pull/3500)
  * Remove copilot [cloudfoundry/cloud_controller_ng#3355](https://github.com/cloudfoundry/cloud_controller_ng/pull/3355)
  * Prevent parallel test failures in request_spec [cloudfoundry/cloud_controller_ng#3505](https://github.com/cloudfoundry/cloud_controller_ng/pull/3505)
  * Update diego sync to not fetch every bit of every object, only completely fetch objects that need syncing [cloudfoundry/cloud_controller_ng#3503](https://github.com/cloudfoundry/cloud_controller_ng/pull/3503)
  * Introduce single source of truth for audit events [cloudfoundry/cloud_controller_ng#3504](https://github.com/cloudfoundry/cloud_controller_ng/pull/3504)
  * v3 should allow to update docker registry credentials [cloudfoundry/cloud_controller_ng#3467](https://github.com/cloudfoundry/cloud_controller_ng/pull/3467)
  * Require cloud_controller.read access(or equivalent) to access list endpoints [cloudfoundry/cloud_controller_ng#3450](https://github.com/cloudfoundry/cloud_controller_ng/pull/3450)
  * Fetch service plan visibilities with eager loading [cloudfoundry/cloud_controller_ng#3507](https://github.com/cloudfoundry/cloud_controller_ng/pull/3507)
* Dependency Bumps
  * Bump prometheus-client from 4.2.1 to 4.2.2
  * Bump sequel from 5.73.0 to 5.74.0
  * Bump mock_redis from 0.38.0 to 0.39.0
* cc-uploader
  * Bump github.com/onsi/ginkgo/v2 from 2.13.0 to 2.13.1
  * Bump github.com/onsi/gomega from 1.29.0 to 1.30.0
* tps
  * Bump github.com/onsi/ginkgo/v2 from 2.13.0 to 2.13.1
  * Bump github.com/onsi/gomega from 1.29.0 to 1.30.0
* Cloud Controller Database Migrations
  * [20231113105256_add_service_plan_id_index.rb](https://github.com/cloudfoundry/cloud_controller_ng/blob/e0a82e324a1b9fb959f8f05dcbfcd39dc8d1b74a/db/migrations/20231113105256_add_service_plan_id_index.rb)



### CF-Networking 3.38.0 up from 3.35.0
* Bump golang to 1.21.4
* The `policy-server-internal` job's healthcheck endpoint is now available only via localhost.
* Go package dependency bumps

### Diego 2.85.0 up from 2.84.0
* Bump garden Grootfs, Guardian, and idmapper
* Bump golang to 1.21.4

### Garden-Runc 1.44.0 up from 1.43.0
* Change user for grootfs test
* Bump golang to 1.21.4

### log-cache 3.0.8 up from 3.0.7
* Bump dependencies
* Bump Golang to v1.20.11

### loggregator-agent 7.7.1 up 7.6.4 from 
* Added `warn_on_invalid_drains` property to Syslog Agent to allow warnings for invalid drains to be suppressed.
* Bump dependencies.
* Added `warn_on_invalid_drains` property to Windows Syslog Agent to allow warnings for invalid drains to be suppressed.
* Bump to go1.20.11
* Bump dependencies.

### metrics-discovery 3.2.20 up from 3.2.18
* Bump to go1.20.11
* Bump dependencies

### nats 56.12.0 up from 56.11.0
* Bump Golang to 1.21.4

### node-exporter 5.5.0 up from 5.4.0
* add missing collectors to boshrelease by @Houlistonm in [#17](https://github.com/bosh-prometheus/node-exporter-boshrelease/pull/17)

### prometheus 29.6.0 up grom 29.5.0
* add retro_compat.disable property by @mchabane in [#484](https://github.com/bosh-prometheus/prometheus-boshrelease/pull/484)
* various bumps:
  * Bump Credhub-Exporter to v0.32.0
  * Bump Grafana to v9.5.13
  * Bump Grafana Worldmap Panel to v1.0.6
  * Bump Postgres-Exporter to 0.14.0
  * Bump Bosh-Exporter to v3.6.1
  * Bump CF-Exporter to v1.2.3
  * Bump Firehose-Exporter to v7.1.2
  * Bump Redis-Exporter to v1.55.0
  * Bump Prometheus to 2.47.0
  * Bump Statsd-Exporter to 0.25.0

### Routing 0.284.0 up from 0.283.0
* Upgrade to Golang 1.21.4
* Bump dependencies

### silk 3.38.0 up from 3.35.0
* Remove unused property [rep_listen_addr_admin](https://github.com/cloudfoundry/silk-release/commit/ee98f5a9d1e1f7c82a3c8055b0e5aacf087538f8)
* Bump golang to 1.21.4
* Go package dependency bumps

### statsd-injector 1.11.36 up from 1.11.35
* Bump dependencies
* Bump packaged Golang to go1.20.11


### UAA 76.25.0 up from 76.24.0
* Bump github.com/onsi/gomega from 1.28.1 to 1.29.0 in /src/acceptance_tests by @dependabot in [#694](https://github.com/cloudfoundry/uaa-release/pull/694)
* Bump rake from 13.0.6 to 13.1.0 by @dependabot in [#698](https://github.com/cloudfoundry/uaa-release/pull/698)
* Bump github.com/cloudfoundry/bosh-utils from 0.0.408 to 0.0.409 in /src/acceptance_tests by @dependabot in [#695](https://github.com/cloudfoundry/uaa-release/pull/695)
* Bump racc from 1.7.1 to 1.7.2 by @dependabot in [#700](https://github.com/cloudfoundry/uaa-release/pull/700)


### Final Note

You may want to throw out the stuffing at this point.
