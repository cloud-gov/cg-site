---
layout: post
date: February 8th 2024
title: "February 8th cloud.gov Change Log"
excerpt: The cloud.gov team is working on providing change logs so everyone can see new features and updates.
---

# Change Log - Punxsutawney Phil predicted an early spring, remember to also restage your applications regularly!

## Customer Facing Changes
---

The audience for this section is developers who maintain applications on cloud.gov and may need to respond to stack or buildpack changes.

### CF-Deployment - v37.0.0 to v37.3.0

Changes below are broken down by component:




### dotnet-core-buildpack 2.4.20 to 2.4.21

* Add dotnet-aspnetcore 6.0.26, remove dotnet-aspnetcore 6.0.25
* Add dotnet-runtime 6.0.26, remove dotnet-runtime 6.0.25
* Add dotnet-sdk 6.0.418, remove dotnet-sdk 6.0.417
* Add dotnet-aspnetcore 7.0.15, remove dotnet-aspnetcore 7.0.14
* Add dotnet-runtime 7.0.15, remove dotnet-runtime 7.0.14
* Add dotnet-sdk 7.0.405, remove dotnet-sdk 7.0.404
* Add dotnet-aspnetcore 8.0.1, remove dotnet-aspnetcore 8.0.0
* Add dotnet-runtime 8.0.1, remove dotnet-runtime 8.0.0
* Add dotnet-sdk 8.0.101, remove dotnet-sdk 8.0.100
* Add node 20.11.0, remove node 20.10.0


Packaged binaries:

* bower 1.8.14
* dotnet-aspnetcore 6.0.26
* dotnet-aspnetcore 7.0.15
* dotnet-aspnetcore 8.0.1
* dotnet-runtime 6.0.26
* dotnet-runtime 7.0.15
* dotnet-runtime 8.0.1
* dotnet-sdk 6.0.418
* dotnet-sdk 7.0.405
* dotnet-sdk 8.0.101
* libgdiplus 6.1
* libunwind 1.7.2
* node 20.11.0

Default binary versions:

* dotnet-runtime 6.0.x
* dotnet-aspnetcore 6.0.x
* dotnet-sdk 6.0.x
* bower 1.8.x





### java-buildpack 4.65.0 to 4.66.0

This release includes the following updates:

* This release contains the January Java patch releases for 1.8, 11, 17 & 21, as well as some framework dependency bumps. This includes an update to v2.0.0 of the new OpenTelemetry Java Agent.

* For a more detailed look at the changes in `4.65.0`, please take a look at the [commit log](https://github.com/cloudfoundry/java-buildpack/compare/v4.65.0...v4.66.0). The packaged version of the buildpack, suitable for use with create-buildpack and update-buildpack, can be found attached to this release.



### python-buildpack 1.8.18 to 1.8.19

* add codeowners file, no changes to binary versions

Packaged binaries:

* libffi 3.2.1
* libmemcache 1.0.18
* miniconda3-py39 23.11.0
* pip 23.3.2
* pipenv 2023.11.15
* python 3.8.18
* python 3.9.18
* python 3.10.13
* python 3.11.7
* python 3.12.1
* setuptools 69.0.3

Default binary versions:

* python 3.10.x






### CFLinuxfs4 - 1.68.0 up from 1.66.0 

Notably, this release addresses:


* USN-6592-1 USN-6592-1: libssh vulnerabilities:

   * `CVE-2023-6004`: A flaw was found in libssh. By utilizing the ProxyCommand or ProxyJump feature, users can exploit unchecked hostname syntax on the client. This issue may allow an attacker to inject malicious code into the command of the features mentioned through the hostname parameter.
   * `CVE-2023-6918`: A flaw was found in the libssh implements abstract layer for message digest (MD) operations implemented by different supported crypto backends. The return values from these were not properly checked, which could cause low-memory situations failures, NULL dereferences, crashes, or usage of the uninitialized memory as an input for the KDF. In this case, non-matching keys will result in decryption/integrity failures, terminating the connection.

* USN-6593-1 USN-6593-1: GnuTLS vulnerabilities:

   * `CVE-2024-0553`: A vulnerability was found in GnuTLS. The response times to malformed ciphertexts in RSA-PSK ClientKeyExchange differ from response times of ciphertexts with correct PKCS#1 v1.5 padding. This issue may allow a remote attacker to perform a timing side-channel attack in the RSA-PSK key exchange, potentially leading to the leakage of sensitive data. CVE-2024-0553 is designated as an incomplete resolution for CVE-2023-5981.
   * `CVE-2024-0567`: A vulnerability was found in GnuTLS, where a cockpit (which uses gnuTLS) rejects a certificate chain with distributed trust. This issue occurs when validating a certificate chain with cockpit-certificate-ensure. This flaw allows an unauthenticated, remote client or attacker to initiate a denial of service attack.


## Platform Changes
---

This section is for the platform operators at `cloud.gov` to highlight changes to Cloud Foundry components, this is likely not of interest for developers using the platform.





### bosh-dns 1.36.12 to 1.37.1

* Allow setting different log levels for log
* Updates golang package golang-1-linux to 1.22.0
* Updates golang package golang-1-windows to 1.22.0


### Bpm 1.2.13 to 1.2.14

* Fixed CVEs:
    * CVE-2024-21626: runc: file descriptor leak



### CAPI v1.169.0 to v1.171.0

* CC API Version: 2.222.0 and 3.157.0
* Service Broker API Version: 2.15

CAPI Release

* Introduce new config attribute for Puma
* Add dedicated config file for cc local workers
* Add config attribute to override max_con for rotate-cc-database-key errand
* Add config option to disable statsd metrics on api vms
* Add public TLS endpoint for blobstore
* Create bumping_ruby_packaging.md
* Add cpu weight config options

* Dependency Bumps
  * Bump rubocop from 1.60.1 to 1.60.2
  * Bump Ruby to version 3.2.3
  * Bump rubocop from 1.59.0 to 1.60.0
  * Bump rubocop-rspec from 2.25.0 to 2.26.1

Cloud Controller

* Switch to using digest-xxhash
* Add deserialization spec for 'ActiveSupport::Duration'
* Enable new cops Capybara/RedundantWithinField and FactoryBot/ExcessiveCreateList
* Add annotations removal to prune_completed_tasks. Encapsulated the database activity into a transaction. Task labels were not getting deleted causing issues with foreign key violations.
* Switch to "using" Zeitwerk Rails autoloader
* Remove distinct for service plan list queries
* Make MIN/MAX_CPU_PROXY values that are used for capping the cpu weight configurable
* Dependency Bumps
  * Bump rubocop from 1.60.0 to 1.60.2
  * bump rspec-rails from 6.1.0 to 6.1.1
  * bump mock_redis from 0.43.0 to 0.44.0
  * bump newrelic_rpm from 9.7.0 to 9.7.1
  * bump Ruby version to 3.2.3
  * Upgrade to Rails 7.1

cc-uploader

* Dependency Bumps
  * Bump github.com/onsi/gomega from 1.30.0 to 1.31.1
  * Bump github.com/onsi/ginkgo/v2 from 2.14.0 to 2.15.0


tps

* Dependency Bumps
  * Bump github.com/onsi/gomega from 1.30.0 to 1.31.1
  * Bump github.com/onsi/ginkgo/v2 from 2.14.0 to 2.15.0

Cloud Controller Database Migrations

* None



### CF-Networking 3.40.0 to 3.41.0

* Bump to go 1.21.6, go dependency bumps
* Add GOVERSION env var to example apps


### CF-Smoketests 42.0.126 to 42.0.128

* Bump golang, cf-cli and smoke_tests packages




### Diego 2.88.0 to 2.92.0


* Buildpack path cache hash has 16 bytes
* The `dockerapplifecycle` now supports workloads using the OCI image format.
* Set Content-Digest header when uploading droplets to support environment that don't have md5 available
* Fix BBS Port issues
* Make max_containers configurable
* Add xxhash as a dependency
* Use major/minor versions of Go, instead of specific versions
* Make jitter interval configurable. Add new config parameter: JitterFactor



### Garden-runc from 1.47.0 to 1.48.0

* ***runc + container have been bumped to address CVE-2024-21626***
* Many updates to get garden-runc-release's CI configuration working in the wg-app-platform-runtime-ci repo
* Many golang package dependency bumps



### Routing 0.287.0 to 0.289.0

* A new reserved port 7070 had been added 
* Before deploying, please double-check your reserved ports settings for any clashes with port 7070, especially the `router.prometheus.port property`.
* Add route_services_internal_server_port property
* Add cipher-suites for TLS 1.3 and auto-generate the list from now on
* Operators can now configure to prefer AZ-local backends before proxying to backends in other availability zones
* Protect against data race when ReverseProxy modifies response headers
* Fix ability to start gorouter with the default config


### Silk 3.40.0 to 3.41.0

* Go package dependency bumps


### Statsd-injector 1.11.37 to 1.11.38

* Bump dependencies
* Bump packaged Golang to go1.21.6

### Syslog 12.2.1 to 12.2.2

* Bump dependencies
* Bump packaged Golang to go1.21.6

### UAA 76.30.0 to 76.31.0

* Bump to UAA v76.31.0
* Upgrade Newrelic to version 8.8.1
* Upgrade Bellsoft JDK to version 17.0.10+13
* Dependencies:
    * Bump minitest from 5.20.0 to 5.21.1
    * Bump github.com/cloudfoundry/bosh-utils from 0.0.423 to 0.0.424 in /src/acceptance_tests
    * Bump concurrent-ruby from 1.2.2 to 1.2.3
    * Bump activesupport from 7.1.2 to 7.1.3
    * Bump github.com/onsi/gomega from 1.30.0 to 1.31.0 in /src/acceptance_tests
    * Bump bigdecimal from 3.1.5 to 3.1.6
    * Bump minitest from 5.21.1 to 5.21.2
    * Bump github.com/cloudfoundry/bosh-utils from 0.0.424 to 0.0.425 in /src/acceptance_tests

## Final Note

Remember to regularly restage your applications to pull in updates to buildpacks and stack which are often patched for CVEs!
