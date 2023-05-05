---
layout: post
date: May 1st 2023
title: "May 1st cloud.gov Change Log"
excerpt: The cloud.gov team is working on providing change logs so everyone can see new features and updates.
---

# Change Log

## Customer Facing Changes
---

### `cflinuxfs3` Retirement

`cflinuxfs4` is now the default for all new applications.  For existing applications, app maintainers should use `cf push APP_NAME -s cflinuxfs4` or the CF Stack Auditor plugin.  Additional details can be found at [https://cloud.gov/2023/04/27/cflinuxfs3-deprecation-update/](https://cloud.gov/2023/04/27/cflinuxfs3-deprecation-update/)

### Binary Buildpack - v1.1.4 up from v1.1.3
* Update libbuildpack
  * Uncached buildpack SHA256: bd2bb05de690ef0cbe6efbf9e1c66b6085dc8efa3ebc186d7202b9e9d54ebd28
  * Uncached buildpack SHA256: 988d1392de4cffbe26d2be4e9a4487a26f7b16b1b5a27fba98e07266d1883562
  * Uncached buildpack SHA256: c8689ae3a2b3471f16fbdcac65581690bf9aa5f0d8103cb20d00d93f74837e6e
  * Uncached buildpack SHA256: 97d7643f51d1b9a7f64d3135d264b03168a5e644f7b31531351f94a951d7a4f5

* tests: replace ruby webserver with a simple netcat program, cflinuxfs4 1.x does not come with ruby on the stack


### CFLinuxfs3 - 0.362.0 up from 0.356.0
* USN-6028-1 USN-6028-1: libxml2 vulnerabilities
* USN-6005-1 USN-6005-1: Sudo vulnerabilities
* USN-5995-1 USN-5995-1: Vim vulnerabilities
* USN-5964-1 USN-5964-1: curl vulnerabilities
* USN-5963-1 USN-5963-1: Vim vulnerabilities
* USN-5960-1 USN-5960-1: Python vulnerability:
* USN-5952-1 USN-5952-1: OpenJPEG vulnerabilities
* USN-5928-1 USN-5928-1: systemd vulnerabilities



### CFLinuxfs4 - 1.5.0 up from 0.72.0

This release removes Ruby and Python from the stack. These dependencies were previously installed to support the PHP and Java buildpacks which are written in those languages. Those buildpacks have now been released with versions that bring their own Ruby or Python dependency and therefore these are now being removed from the stack. 

* USN-6005-1 USN-6005-1: Sudo vulnerabilities
* USN-5995-1 USN-5995-1: Vim vulnerabilities
* USN-5855-3 USN-5855-3: ImageMagick regression
* USN-5964-1 USN-5964-1: curl vulnerabilities
* USN-5963-1 USN-5963-1: Vim vulnerabilities
* USN-5960-1 USN-5960-1: Python vulnerability
* USN-5855-2 USN-5855-2: ImageMagick vulnerabilities
* USN-5928-1 USN-5928-1: systemd vulnerabilities


### Dotnet-Core-Buildpack - 2.4.10 up from 2.4.8

* Update libbuildpack
* Bump github.com/onsi/gomega from 1.27.2 to 1.27.6
* Bumps github.com/onsi/gomega from 1.27.2 to 1.27.6.
* Add node 18.15.0, remove node 18.14.2 (#755) for stack(s) cflinuxfs4, cflinuxfs3
* Add dotnet-aspnetcore 6.0.15, remove dotnet-aspnetcore 6.0.14 (#763) for stack(s) cflinuxfs4, cflinuxfs3
* Add dotnet-runtime 6.0.15, remove dotnet-runtime 6.0.14 (#762) for stack(s) cflinuxfs4, cflinuxfs3
* Add dotnet-sdk 6.0.407, remove dotnet-sdk 6.0.406 (#761) for stack(s) cflinuxfs4, cflinuxfs3
* Add dotnet-sdk 7.0.202, remove dotnet-sdk 7.0.200 (#760) (#750) for stack(s) cflinuxfs4, cflinuxfs3
* Add dotnet-aspnetcore 7.0.4, remove dotnet-aspnetcore 7.0.3 (#759) for stack(s) cflinuxfs4, cflinuxfs3
* Add dotnet-runtime 7.0.4, remove dotnet-runtime 7.0.3 (#758) for stack(s) cflinuxfs4, cflinuxfs3

### Go-Buildpack 1.10.8 up from 1.10.6
* Bump github.com/cloudfoundry/switchblade from 0.2.0 to 0.3.0
* Add go 1.19.8, remove go 1.19.6 for stack(s) cflinuxfs4, cflinuxfs3
* Add go 1.20.3, remove go 1.20.1 for stack(s) cflinuxfs3, cflinuxfs4
* Bump libbuildpack to pull in retry with exponential backoff.
* Deprecate go1.18

### Java-Buildpack 4.57 up from 4.56
* This release fixes a bug with the Container Security Provider library, in which a race condition could result in mismatched private-key and certificate pairs when Diego rotated these credentials for the container. [See this issue for more details](https://github.com/cloudfoundry/java-buildpack-security-provider/issues/8).
* This release also contains the following:
  * The Azul Zing JRE contained a bug when generating the Java Opts, fixed with #1008 (thanks to @schelini)
  * Update to the geode_store dependency (thanks to @BenjaminPerryRoss)
For a more detailed look at the changes in 4.57, please take a look at the [commit log](https://github.com/cloudfoundry/java-buildpack/compare/v4.56...v4.57). The packaged version of the buildpack, suitable for use with create-buildpack and update-buildpack, can be found attached to this release.


### Nginx-Buildpack 1.2.2 up from 1.2.1
* Add nginx 1.23.4, remove nginx 1.23.3 for stack(s) cflinuxfs3, cflinuxfs4 (https://www.pivotaltracker.com/story/show/184817118)
* Update libbuildpack
* Bump github.com/miekg/dns from 1.1.52 to 1.1.53
* Bump github.com/onsi/gomega from 1.26.0 to 1.27.5

### NodeJS Buildpack v1.8.9 up from v1.8.6
* Add node 16.20.0, remove node 16.19.0 for stack(s) cflinuxfs4, cflinuxfs3
* Don't run yarn check which creates a duplicate cache. Instead, we can add the --check-files flag to the yarn install command and get the same outcome.
* Bring our own Python for node-gyp
* Add node 18.15.0, remove node 18.13.0 for stack(s) cflinuxfs4, cflinuxfs3
* Uncached buildpack SHA256: adde57eaf1aa543c2a12565a0a211dfddb8d591333d47ab0eeb744f1afe6ced3
* Uncached buildpack SHA256: c964c655974ec1e5b85d88d317372f9fd2276727538a175d5067c040f89c480c



### PHP buildpack v4.6.4 up from v4.6.0
* update go modules
* bump default nginx version
* Add nginx 1.23.4, remove nginx 1.23.3 (#857) for stack(s) cflinuxfs4, cflinuxfs3
* Install bootstrapped Ruby into php-buildpack specific location (#855)
* Add composer 2.5.5, remove composer 2.5.4 for stack(s) cflinuxfs4, cflinuxfs3
* BYO Ruby (Required by the buildpack)
* Add httpd 2.4.56, remove httpd 2.4.55 (#845) for stack(s) cflinuxfs3, cflinuxfs4 (https://www.pivotaltracker.com/story/show/184641061)


### Python buildpack v1.8.9 up from v1.8.8
* Add python 3.10.11, remove python 3.10.10 for stack(s) cflinuxfs3, cflinuxfs4
* Add python 3.11.3, remove python 3.11.2 for stack(s) cflinuxfs4, cflinuxfs3
* Add setuptools 67.6.1, remove setuptools 67.4.0 for stack(s) cflinuxfs4, cflinuxfs3
* Add pipenv 2023.3.20, remove pipenv 2023.2.18 for stack(s) cflinuxfs4, cflinuxfs3
* Fix problem with AppDynamics hook (now it supports user-provided services)

### R buildpack v1.2.1 up from v1.2.0
* Update libbuildpack

### Ruby buildpack v1.10.1 up from v1.9.4
* Add bundler 2.4.11, remove bundler 2.4.10 for stack(s) cflinuxfs4, cflinuxfs3 (#784)
* Add rubygems 3.4.11, remove rubygems 3.4.10 for stack(s) cflinuxfs4, cflinuxfs3 (#783)
* Add ruby 3.1.4, remove ruby 3.1.2 for stack(s) cflinuxfs4, cflinuxfs3 (#782)
* Add ruby 3.2.2, remove ruby 3.2.0 for stack(s) cflinuxfs4, cflinuxfs3 (#776)
* Add ruby 3.0.6, remove ruby 3.0.4 for stack(s) cflinuxfs3 (#775)
* Remove support for Ruby 2.7 (#773)
* Bump github.com/onsi/gomega from 1.27.4 to 1.27.5 (#768)
* Add rubygems 3.4.10, remove rubygems 3.4.8 (#769) for stack(s) cflinuxfs4, cflinuxfs3
* Add bundler 2.4.10, remove bundler 2.4.8 (#770) for stack(s) cflinuxfs4, cflinuxfs3


### Staticfile buildpack v1.6.2 up from v1.6.1
* Add nginx 1.23.4, remove nginx 1.23.3 for stack(s) cflinuxfs3, cflinuxfs4 (https://www.pivotaltracker.com/story/show/184817130)
* Update libbuildpack
* Bump github.com/onsi/gomega from 1.27.5 to 1.27.6


## Platform Changes
---

### CAPI - v1.150.0 up from v1.480.0

* CC API Version: 2.201.0 and 3.136.0
* CAPI Release
  * Bump Ruby to 3.2.2
  * Ensure Post Backup Unlock always restarts local workers #289
  * Use bosh link for cloud_controller_worker stacks #299
* Dependency Bumps
  * Bump Ruby to 3.2.2
  * bump rubocop from 1.48.1 to 1.49.0 in /spec
  * bump Golang to go1.20.3
* Cloud Controller
  * Add generic Korifi error cloudfoundry/cloud_controller_ng#3205
  * Add db indexes for better performance cloudfoundry/cloud_controller_ng#3108



### Garden-Runc 1.27.0 up from 1.25.0
* Bump ginkgo to v2 and lager to v3
* Built with go 1.20.3
* Bump runc version to 1.1.4
* Bump containerd version to 1.6.19

### Log-Cache 3.0.1 up from 3.0.0
* Bump dependencies


### Loggregator 107.0.3 up from 107.0.2
* Upgrade to go 1.20.2
* Bump dependencies
* Remove unused metron_endpoint.dropsonde_port property in #534

### Loggregator-Agent 7.2.0 up from 7.1.0
* Bump golang.org/x/net from 0.8.0 to 0.9.0 in /src by @dependabot in #283
* Add mtls options to aggregate drains. by @Benjamintf1 in #276
* switch gorilla with chi by @Benjamintf1 in #285
* Upgrade to go 1.20.2

### Node-exporter 5.1.0 up from 5.0.0
* bump Node-Exporter to v1.5.0
* Deprecate node_exporter.collector.filesystem.ignored_mount_points in favor of node_exporter.collector.filesystem.mount_points_exclude
* Deprecate node_exporter.collector.filesystem.ignored_fs_types in favor of node_exporter.collector.filesystem.fs_types_exclude

### UAA 76.10.0 up from 76.8.0
* Features
  * Bump to UAA v76.10.0
  * add support for TLSv1.3 by @adam-jian-zhang in #539
  * Add 2 new options signingAlg and signingCert to JWT token policy.
* Dependency bumps
  * Upgrade Newrelic to version 8.1.0
  * Upgrade Tomcat to version 9.0.74
  * Upgrade Bellsoft JDK to version 11.0.19+7
  * Bump github.com/cloudfoundry/bosh-utils from 0.0.360 to 0.0.361 in /src/acceptance_tests by @dependabot in #564
  * Bump rspec-core from 3.12.1 to 3.12.2 by @dependabot in #567
  * Bump rspec-expectations from 3.12.2 to 3.12.3 by @dependabot in #568


