---
layout: post
date: November 18, 2021
title: "November 18th cloud.gov Change Log" 
excerpt: The cloud.gov team is working on providing change logs so everyone can see new features and updates.
---

# Happy almost Turkey Day!

The cloud.gov team is working on providing change logs so everyone can see new features and updates. Some highlights include cf-deployment v17 and Concourse v7. Additionally, if you use the [PHP buildpack](https://cloud.gov/2021/11/15/dhs-bod-22-01/) and have not restaged your application since November 10th, 2021, please do that. 

# Change Log
## Customer Facing
---
### Dotnet Core Buildpack 2.3.36 up from 2.3.34
* remove old version lines from manifest
* Rename vendored test to offline test for clarity
* Remove unused branch for now-deprecated .NET 1.x SDK.
* Remove cache test from running in cutless.Cached scenario
* Remove .NET 1.x restore functionality.
  * We previously dropped support for .NET 1.x so this branch is never executed.
* Rebuild node 14.18.0
* add eventually to multiple_projects_test
* Update brats version line to 3.1
* Remove dotnet 2.1.X line
* Resolves #404
  * Update fixtures to .NET Core 3.1 and use spec in tests
* Resolves #432
  * All fixtures have been reorganized and ported over to .NET Core 3.1
  * All tests have been ported over to use spec instead of ginkgo
  * Adds platform field to integration suite
  * Adds all README files, with placeholders for apps we're unsure about
  * Some fixtures and their corresponding tests have been removed because
  * they are no longer relevant or are redundant:
  * nancy_kestrel_msbuild_dotnet2 (removed, Nancy is no longer maintained)
  * runtimeconfig_with_comments (removed)
  * self_contained_3.0 (removed)
  * simple_2.2_source (replaced with a 3.0 source app)
  * source_2.1_float_runtime (removed)
  * source_prerender_node (removed, feature is deprecated in .NET Core 3.1)
* Add node 14.18.0, remove node 14.17.6
* Add dotnet-sdk 5.0.401
* Add dotnet-runtime 3.1.19
* Add dotnet-aspnetcore 3.1.19
* Add dotnet-aspnetcore 5.0.10
* Add dotnet-sdk 3.1.413
* Add dotnet-runtime 5.0.10
* Adds platform flag for integration suite
* Add dotnet-runtime 5.0.11
* Add dotnet-runtime 3.1.20
* Add dotnet-sdk 5.0.402
* Add dotnet-aspnetcore 3.1.20
* Add dotnet-aspnetcore 5.0.11
* Add dotnet-sdk 3.1.414
* Add node 14.18.1, remove node 14.18.0
* Propagates errors from global.json SDK install
Instead of ignoring the error and installing the default SDK, returns the error and stops staging. If the global.json is present, but
does not contain an SDK version, the existing behavior is maintained (uses default SDK).

### Go Buildpack - 1.9.37 up from 1.9.36
* Add go 1.16.9, remove go 1.16.7
* Add go 1.17.2, remove go 1.17

### Java Buildpack - 4.43 up from 4.42
This release focuses on bug fixes, including new Java quarterly updates for versions 8, 11, and 17.

* Relax escaping of values to enable limited access to the shell for AppDynamnics config (#911)
* Version matcher now prefers a specific match over a partial match (#907)
* Shell escape the value of Elastic APM custom properties (#908)
* Modify default Tomcat configuration to include HTTP/2 support (#906)
* Rename framework-seeker-security-provider.md (via @mureinik #910)
* Notable updated Dependencies
  * Java Quarterly Updates Oct 2021
  * Apache Tomcat 9.0.54 which resolves CVE-2021-42340

### NodeJS Buildpack - 1.7.63 up from 1.7.62
* Remove support for deprecated version 15.x
See #386
Node 15.x reached End of Line on 2021-06-01.
(https://github.com/nodejs/Release)
* Add yarn 1.22.17, remove yarn 1.22.15
* Add node 16.11.1, remove node 16.8.0
* Add node 12.22.7, remove node 12.22.5
* Add node 14.18.1, remove node 14.17.6

### PHP Buildpack - 4.4.49 up from 4.4.46
* Add php 7.3.32, remove php 7.3.30
* Change default PHP option to 7.4.25
* Add php 7.4.25, remove php 7.4.23
* Add php 8.0.12, remove php 8.0.10

### Python Buildpack - 1.7.47 up from 1.7.46
* Support independently-installed pip
  * Adds pip as a dependency to this buildpack. When BP_PIP_VERSION=latest, this
version will be used. When unset, python's own pip module will be used.
* Add pip 21.3
* Add setuptools 58.2.0, remove setuptools 58.1.0

### R Buildpack - 1.1.23 up from 1.1.22
* Rebuild r 4.1.1
* Rebuild r 3.6.3

### Ruby Buildpack - 1.8.48 from 1.8.467
* Add jruby 9.3.1.0
* Add yarn 1.22.17, remove yarn 1.22.12
* Add node 14.18.1, remove node 14.18.0
* Add bundler 2.2.29, remove bundler 2.2.28
* Add rubygems 3.2.29, remove rubygems 3.2.28

### Staticfile Buildpack 1.5.26 up from 1.5.25
* Add Configurable HTTP/2 Support (#254)


## Platform Changes
---

### AIDE - 17 up from 15/16
* Updated Aide to 0.17.3
* Adjusted Configurations for false positives

### Bosh 271.16.0 up from 271.14.0
What's Changed
* Optional Blobstore agent creds by @bgandon in #2327
* Improve description for director's job properties by @bgandon in #2326
* Leverage the new BPM shutdown_signal feature in Postgres jobs by @bgandon in #2334
systems with libyaml versions 02.0 > version < 0.2.5 would fail tests… by @nouseforaname in #2337
* Auto-bump nginx package from https://github.com/bosh-packages/nginx-release
  * nginx package version is now 1.21.4
* Update Contributing docs and running unit tests by @beyhan in #2335
* Use IO#readline_nonblock instead of IO#readline when reading output from CPI sub-processes. by @yatzek in #2336

### Bosh AWS CPI 91 up from 89
* Increase timeout for volume modification by @jsievers in #117
* Make agent credentials unnecessary for accessing a DAV blobstore with signed URLs enabled by @bgandon in #118
* Configurable timeout factor for IaaS-native disk resize by @bgandon in #119
* Allow metadata options to be set in cloud properties
* Added support for IMDSv2

### BPM - 1.1.15 up from 1.1.14
* Bumped go to 1.17

### CAPI - 1.120.0 up from 1.119.0
Highlights

CAPI 1.120.0 contains a change to the optional rate_limiter inside of ccng. Previously every request to the rate limiter would result in a database read and write, this lead to performance issues in large foundations. Now the optional rate_limiter will measure these requests in memory on the individual API VM. 

CC API Version: 2.174.0 and 3.109.0

Service Broker API Version: 2.15

CAPI Release
* PR #210 Send upload start time as form field to cloud controller
* PR #211 Configure per-vm (in-memory rate limit setting)

Cloud Controller
* PR #2527 Use window functions for paginated count
* PR #2529Fix 500 error when listing sidecars for a resource that doesn't exist
* *PR #2528 Remove un-needed joins
* PR #2542 Use upload start time to determine if a token has expired.
* PR #2535 Track request counts for rate limiting in memory

### CF Networking - 2.40.0 up from 2.39.0
Release Highlights
* Make a v66 migration to remove old stored procedure
* Tested with silk-release v2.40.0

### CFLinuxfs3 - 0.264.0 up from 0.262.0
CVES:

USN-5124-1 USN-5124-1: GNU binutils vulnerabilities:
* CVE-2021-3487: There's a flaw in the BFD library of binutils in versions before 2.36. An attacker who supplies a crafted file to an application linked with BFD, and using the DWARF functionality, could cause an impact to system availability by way of excessive memory consumption.
* CVE-2020-16592: A use after free issue exists in the Binary File Descriptor (BFD) library (aka libbfd) in GNU Binutils 2.34 in bfd_hash_lookup, as demonstrated in nm-new, that can cause a denial of service via a crafted file.

USN-5133-1 USN-5133-1: ICU vulnerability:
* CVE-2020-21913: International Components for Unicode (ICU-20850) v66.1 was discovered to contain a use after free bug in the pkg_createWithAssemblyCode function in the file tools/pkgdata/pkgdata.cpp.

### Clamav 29 up from 28
* Updated freshclam database location

### Concourse 7.3.2 up from 6.7.5
* Too much to say

### Diego Release 2.53.1 up from 2.53.0
Changes
* Bump to Go MySQL Driver v1.6.0 @mariash (#595)
* BBS: Implement max-retries when failing to connect to event streams (cloudfoundry/bbs#45)

Resources
* Download release v2.53.1 from bosh.io.
* Verified with cloudfoundry/cf-deployment @ 4f7398f7e413d072211a7944d212e75ef04f7a84.

Dependencies
* Bump Golang to go1.17.2 @cf-diego (#594)

### Fisma 58 up from 56/57
* Correcting AIDE false positives

### Garden-runc 1.9.31 up from 1.9.30
Changes:
* #205 Bump Go to v1.17

### Loggregator 106.6.1 up from 106.6.0
Changelog
* bump golang release to v0.88.0
* add variables to make ingress and egress buffer size configurable for loggregator

### Logsearch 211.1.39 up from 211.1.38
* bump Java Version

### Routing 0.226.0 up from 0.225.0
New Features
* The tcp-router now emits connection error metrics on a per app basis, to assist troubleshooting when apps start having connectivity issues
* The X-Cf-Router-Error header now contains more details for endpoint_failure errors, to indicate what type of failure occurred 🎉 🎉 🎉 Thanks @thomas-kaltenbach for the PR! 🎉 🎉 🎉
* Backend TLS handshake timeouts are now configurable via the tls_handshake_timeout_in_seconds property. 🎉 🎉 🎉 Thanks @ywei2017 for the PR! 🎉 🎉 🎉

X509 Subject Alt Name Requirements

The gorouter job will now fail to render its template on BOSH deploys if a tls_pem contains a cert_chain that does not have a SubjectAltName (SAN) extension on the certificate. This started being required in Golang 1.15, but we have been working around this using the golang.x509ignoreCN property. This property now defaults to false, so operators are made aware of any certs that need to be regenerated. When routing-release is built against golang 1.17, the golang.x509ignoreCN workaround will cease to function, and environments will need to have certs updated by then.

If encountered, the template rendering error will match: tls_pem[<cert index>].cert_chain must include a subjectAltName extension

For more information, see Golang 1.15's release notes

Bugfixes
* The gorouter template is now generated in a way that is compatible with BOSH Directors built with Ruby 3 (#225)
* Resolves an issue where a stale route for an app using route services with an out of date route-service URL could result in all requests going to the out-of-date route-service URL, and failing.
* Clarifies gorouter logs and routing tables to reflect http1 as the protocol when HTTP/2 is disabled, even if the route was registered indicating it supported HTTP/2.

### Snort 553 up from 551
* Just the usual snort updates

### Syslog 11.7.6 up from 11.7.5
* update blackbox to include performance fixes.

### UAA 79.9.0 up from 75.8.0
Features
* Update to UAA v75.9.0
* Validate id_token_hint in end_session_endpoint (cloudfoundry/uaa#1693)

Bug Fixes
* Increase randomness of authcode (cloudfoundry/uaa#1700)
* Bump xmlsec library 1.5.8 to 2.2.3 (cloudfoundry/uaa#1689)

Dependency bumps
* Upgrade Bellsoft JDK to version 11.0.13+8
* Spring boot 2.4.12
* K8s.io
