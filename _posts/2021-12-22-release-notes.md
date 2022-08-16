---
layout: post
date: December 22, 2021
title: "December 22th cloud.gov Change Log" 
excerpt: The cloud.gov team is working on providing change logs so everyone can see new features and updates.
---

# Happy Holidays!

The cloud.gov team is working on providing change logs so everyone can see new features and updates. Some highlights include cf-deployment v17.1, S3 Broker and Log4J Fixes. 

# Change Log
## Customer Facing
---
### AWS S3 Broker
* Service Instance Sharing is now available for the S3 service instances
Find more out here: https://docs.cloudfoundry.org/devguide/services/sharing-instances.html

### Binary Buildpack - v1.0.42 up from v1.0.40
* Merge pull request #72 from cloudfoundry/dependabot/go_modules/develop/github.com/onsi/gomega-1.17.0
* Bump github.com/onsi/gomega from 1.14.0 to 1.17.0
* Bump github.com/onsi/gomega from 1.14.0 to 1.17.0
* Bumps github.com/onsi/gomega from 1.14.0 to 1.17.0.

### Dotnet Core Buildpack - 2.3.37 up from 2.3.36
* Add dotnet-sdk 3.1.415
* Add dotnet-sdk 5.0.403
* Add dotnet-runtime 5.0.12
* Add dotnet-runtime 3.1.21
* Add dotnet-aspnetcore 3.1.21
* Add dotnet-aspnetcore 5.0.12
* Add libunwind 1.6.2, remove libunwind 1.5
* Add libgdiplus 6.1, remove libgdiplus 6.0
* Add node 14.18.2, remove node 14.18.1
* Add bower 1.8.13, remove bower 1.8.12
* Update libbuildpack
* Readme: Update packager install instructions
* Fix default bower version

### Go Buildpack - 1.9.38 up from 1.9.37
* bumped libbuildpack-dynatrace to v1.4.2 to make use of the bugfix for the networkzones parameter (#228)
* Add go 1.16.12, remove go 1.16.9
* Add go 1.16.11, remove go 1.16.8
* Add go 1.17.5, remove go 1.17.2
* Add go 1.17.4, remove go 1.17.1
* Update libbuildpack
* Removes Tracker reference in README

### Java Buildpack - 4.46 up from 4.43
This release focuses on dependency updates, primarily that fix the latest Apache Log4j2 vulnerability, CVE-2021-45046, in dependencies used by the Java buildpack.

* In particular, the following dependencies were known to be vulnerable to CVE-2021-45046 & have been patched in this release:
  * AppDynamics Java Agent
  * New Relic Java Agent
If you are using an online version of the Java buildpack you do not strictly need this update, as the online buildpack will always pick the latest version of dependencies.

### Nginx Buildpack - 1.1.33 up from 1.1.32
* Update libbuildpackk
* Add nginx 1.20.2, remove nginx 1.20.1
* Add nginx 1.21.4, remove nginx 1.21.3

### NodeJS Buildpack - 1.7.65 up from 1.7.63
* Add node 16.13.1, remove node 16.11.1
* Add node 14.18.2, remove node 14.18.0
* Update libbuildpack
* Readme: Update packager install instructions
* Bump github.com/onsi/gomega from 1.14.0 to 1.17.0
* Bumps github.com/onsi/gomega from 1.14.0 to 1.17.0.

### PHP Buildpack - 4.4.53 up from 4.4.49
* Add appdynamics agent 21.12.1.404, remove 21.12.0.401
Addresses CVE-2021-45046 (in addition to CVE-2021-44228 fixed in previous release 4.4.52)
* Update libbuildpack
* Update Pygments due to dependabot sec alert
* Fixed case of networkzone query parameter for Dynatrace OneAgent download

### Python Buildpack - 1.7.48 up from 1.7.47
* Update libbuildpack
* Add python 3.10.1
* Add python 3.9.9, remove python 3.9.6
* Bump miniconda3, remove miniconda37/38
* Add pipenv 2021.11.23, remove pipenv 2021.5.29
* Add pip 21.3.1, remove pip 21.3
* Update outdated fixtures
* Update default python version to 3.10.x
* Add setuptools 59.5.0, remove setuptools 58.2.0
* Refactor caching for miniconda
Old caching mechanism was very hacky and seemed to be the cause of miniconda test failures
(specifically tests which pushed twice, as the app would fail to start on the second push).
New approach uses CF's cache and conda's ability to set a package cache via CONDA_PKGS_DIRS.
* Updating github-config

### R Buildpack - 1.1.25 up from 1.1.23
* Update libbuildpack
* Add r 4.1.2, remove r 4.1.0

### Ruby Buildpack - 1.8.49 from 1.8.48
* Add ruby 3.0.3, remove ruby 3.0.1
* Add ruby 2.7.5, remove ruby 2.7.3
* Add ruby 2.6.9, remove ruby 2.6.7
* Add jruby 9.3.2.0, remove jruby 9.3.1.0
* Add jruby 9.2.20.1, remove jruby 9.2.19.0
* Add rubygems 3.2.33, remove rubygems 3.2.29
* Add bundler 2.2.33, remove bundler 2.2.29
* Add node 14.18.2, remove node 14.18.1
* Readme: Update packager install instructions
* Update libbuildpack

### Staticfile Buildpack 1.5.27 up from 1.5.26
* Update libbuildpack
* Add nginx 1.20.2
* Add nginx 1.21.4, remove nginx 1.21.3
for stack(s) cflinuxfs3


## Platform Changes
---

### BOSH DNS - v1.30.0 up from v1.29.0
* Bumped dependencies (Golang 1.16 vendored libraries)

### Bosh - 271.17.0 up from 271.16.0
What's Changed
* Aborts errand run if instance(s) are stopped 
* Fix config rollback behavior. by @camilalonart in #2340
* Fix Bosh recreating tags on each deployment #2341

### Bosh AWS CPI - 92 up from 91
* Adding missing m6i and r6i types to nvme families by @blyles in #121
* Fast AWS-native disk resize by @bgandon in #123

### CAPI - 1.123.0 up from 1.120.0
Highlights

Adds a new boolean property, cc.log_audit_events, that will write CC audit events to syslog when set to true. This feature is disabled by default.

CC API Version: 2.177.0 and 3.112.0

Service Broker API Version: 2.15

CAPI Release
* PR #210 Send upload start time as form field to cloud controller
* PR #211 Configure per-vm (in-memory rate limit setting)
* #212 Allow operators to limit how many concurrent service broker requests a user can make per broker
* #208, #2481 Allow operators to enable experimental optimized json encoding (performance improvment)

Cloud Controller
* #2563 Rate limit endpoints that interact with service brokers
* #2558 Update service and route bindings are updated when user provided service instance is updated
* #2564 Improve Service Credential Bindings performance
* #2562 Update manifest diff docs to use --data-binary flag
* #2572 Use Concurrent::Semaphore for broker rate limiter
* #2573 Skip window function for distinct queries
* #2583 Fix pollable job cleanup logger name
* #2586 Make PruneExcessAppRevisions job more memory efficient
* #2588 Fix blobstore errors for droplets from CF Docker apps
* #2580 Use permissions subqueries in service list fetchers
* #2590 Fix ServiceInstanceNameTooLong message
 
### CF Networking - 2.42.0 up from 2.40.0
Release Highlights
* Added IF EXISTS clause to DROP PROCEDURE on un-used stored procedure in v0066 migration. Foundations that do not have the procedure in question will experience a MySQL error causing the deployment to fail.
* Tested with silk-release v2.42.0

### CFLinuxfs3 - 0.270.0 up from 0.264.0
CVES:

USN-5144-1 USN-5144-1: OpenEXR vulnerability:
* CVE-2021-3933: openexr: Integer-overflow in Imf_3_1::bytesPerDeepLineTable

USN-5150-1 USN-5150-1: OpenEXR vulnerability:
* CVE-2021-3941: Divide-by-zero in Imf_3_1::RGBtoXYZ

USN-5179-1 USN-5179-1: BusyBox vulnerabilities:
* CVE-2021-28831: decompress_gunzip.c in BusyBox through 1.32.1 mishandles the error bit on the huft_build result pointer, with a resultant invalid free or segmentation fault, via malformed gzip data.
* CVE-2021-42374: An out-of-bounds heap read in Busybox's unlzma applet leads to information leak and denial of service when crafted LZMA-compressed input is decompressed. This can be triggered by any applet/format that
* CVE-2021-42381: A use-after-free in Busybox's awk applet leads to denial of service and possibly code execution when processing a crafted awk pattern in the hash_init function
* CVE-2021-42386: A use-after-free in Busybox's awk applet leads to denial of service and possibly code execution when processing a crafted awk pattern in the nvalloc function
* CVE-2021-28831: decompress_gunzip.c in BusyBox through 1.32.1 mishandles the error bit on the huft_build result pointer, with a resultant invalid free or segmentation fault, via malformed gzip data.
* CVE-2021-42378: A use-after-free in Busybox's awk applet leads to denial of service and possibly code execution when processing a crafted awk pattern in the getvar_i function
* CVE-2021-42386: A use-after-free in Busybox's awk applet leads to denial of service and possibly code execution when processing a crafted awk pattern in the nvalloc function
* CVE-2021-42385: A use-after-free in Busybox's awk applet leads to denial of service and possibly code execution when processing a crafted awk pattern in the evaluate function
* CVE-2021-42382: A use-after-free in Busybox's awk applet leads to denial of service and possibly code execution when processing a crafted awk pattern in the getvar_s function
* CVE-2021-42384: A use-after-free in Busybox's awk applet leads to denial of service and possibly code execution when processing a crafted awk pattern in the handle_special function
* CVE-2021-42379: A use-after-free in Busybox's awk applet leads to denial of service and possibly code execution when processing a crafted awk pattern in the next_input_file function
* CVE-2021-42374: An out-of-bounds heap read in Busybox's unlzma applet leads to information leak and denial of service when crafted LZMA-compressed input is decompressed. This can be triggered by any applet/format that
* CVE-2021-42380: A use-after-free in Busybox's awk applet leads to denial of service and possibly code execution when processing a crafted awk pattern in the clrvar function
* CVE-2021-42381: A use-after-free in Busybox's awk applet leads to denial of service and possibly code execution when processing a crafted awk pattern in the hash_init function

USN-5189-1 USN-5189-1: GLib vulnerability:
* CVE-2021-3800: glib2: Possible privilege escalation thourgh pkexec and aliases

### Diego Release - 2.55.0 up from 2.53.1
Changes
* Containers can communicate over TLS using application internal route (#587)
* Bumps golang x/crypto and x/net pkgs (#605)
* Only use passwd auth if NATS requires it (#610)
* bump diego-ssh uaa-go-client (#596)
* Rep: Bump task result file size max to 50k (#601)
* Executor: (BugFix) Envoy 1.19 should use original TCP connection pool, so that it can accept more than 1024 downstream connections (#604)

Resources
* Download release v2.55.0 from bosh.io.
* Verified with cloudfoundry/cf-deployment @ 91641085d9ecd3df125dafa3c5ba61ffafb3d825.

Dependencies
* Bump Golang to go1.17.5 (#611)


### Log Cache - 2.11.5 up from 2.11.4
* bump-golang to v0.94.0

### Loggregator - 106.6.2 up from 106.6.1
Changelog
* Bump Golang to v0.94.0

### Logsearch - 211.1.39 up from 211.1.38
* bump Log4J versions

### Metrics Discovery - 3.0.7 up from 3.0.6
* bump-golang to v0.93.0
* Only use passwd auth if NATS requires it (#14)

### Routing - 0.228.0 up from 0.226.0
New Features
* Only use password auth if NATS requires it; with the introduction of nats-tls, the use of password authentication is no longer needed. Instead we can rely on mTLS for trust. 🎉 🎉 Thanks @domdom82 for the PR! 🎉 🎉 🎉

Bugfixes
* Update golang to address CVE-2021-44716: Limit growth of header canonicalization cache on incoming HTTP/2 requests.
* TCP router correctly health-checks and restarts HAproxy as necessary. (#245)

### Snort - 567 up from 553
* Just the usual snort updates

### Syslog - 11.7.7 up from 11.7.6
* bump-golang to v0.94.0

### UAA - 75.13.0 up from 75.9.0
* Bump to UAA v75.13.0, which:
Addresses CVE with Log4j library and its prior incomplete fix by bumping to log4j2 2.17.0
* Upgrades Newrelic to version 7.4.3
