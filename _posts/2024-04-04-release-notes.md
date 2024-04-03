---
layout: post
date: April 4th 2024
title: "April 4th cloud.gov Change Log"
excerpt: The cloud.gov team is working on providing change logs so everyone can see new features and updates.
---

# Change Log 

## Customer Facing Changes
---

The audience for this section is developers who maintain applications on cloud.gov and may need to respond to stack or buildpack changes.

### CF-Deployment - v39.7.0 to v40.1.0

Changes below are broken down by component:


### binary-buildpack 1.1.9 to 1.1.10

* Rebuild Executables

### dotnet-core-buildpack 2.4.25 to 2.4.26

* Add dotnet-sdk 8.0.203, remove dotnet-sdk 8.0.202
* Add dotnet-aspnetcore 6.0.28, remove dotnet-aspnetcore 6.0.27
* Add dotnet-runtime 6.0.28, remove dotnet-runtime 6.0.27
* Add dotnet-sdk 6.0.420, remove dotnet-sdk 6.0.419
* Add dotnet-aspnetcore 7.0.17, remove dotnet-aspnetcore 7.0.16
* Add dotnet-runtime 7.0.17, remove dotnet-runtime 7.0.16
* Add dotnet-sdk 7.0.407, remove dotnet-sdk 7.0.406
* Add dotnet-aspnetcore 8.0.3, remove dotnet-aspnetcore 8.0.2
* Add dotnet-runtime 8.0.3, remove dotnet-runtime 8.0.2
* Add dotnet-sdk 8.0.202, remove dotnet-sdk 8.0.201

Packaged binaries:

* bower 1.8.14
* dotnet-aspnetcore 6.0.28
* dotnet-aspnetcore 7.0.17
* dotnet-aspnetcore 8.0.3
* dotnet-runtime 6.0.28
* dotnet-runtime 7.0.17
* dotnet-runtime 8.0.3
* dotnet-sdk 6.0.420
* dotnet-sdk 7.0.407
* dotnet-sdk 8.0.203
* libgdiplus 6.1
* libunwind 1.8.1
* node 20.11.1

Default binary versions:

* dotnet-runtime 6.0.x
* dotnet-aspnetcore 6.0.x
* dotnet-sdk 6.0.x
* bower 1.8.x


### php-buildpack 4.6.16 to 4.6.17

* Add php 8.3.4, remove php 8.3.1
* Add php 8.2.17, remove php 8.2.15
* Add composer 2.7.2, remove composer 2.7.1

Packaged binaries:

* appdynamics 23.11.0-839
* composer 2.7.2
* httpd 2.4.58
* newrelic 10.11.0.3
* nginx 1.24.0
* nginx 1.25.4
* php 8.1.26
* php 8.1.27
* php 8.2.16
* php 8.2.17
* php 8.3.3
* php 8.3.4
* python 2.7.18
* ruby 3.0.5

Default binary versions:

* php 8.1.27
* httpd 2.4.58
* newrelic 10.11.0.3
* nginx 1.25.4
* composer 2.7.2




### python-buildpack 1.8.21 to 1.8.22


* Add setuptools 69.2.0, remove setuptools 69.1.1

Packaged binaries:

* libffi 3.2.1
* libmemcache 1.0.18
* miniconda3-py39 24.1.2
* pip 24.0
* pipenv 2023.12.1
* python 3.8.18
* python 3.9.18
* python 3.10.13
* python 3.11.8
* python 3.12.2
* setuptools 69.2.0

Default binary versions:

* python 3.10.x



### r-buildpack 1.2.9 to 1.2.10

* Update r 4.2.3 dependencies:
  * forecast from 8.21.1 to 8.22.0

Packaged binaries:

* r 4.2.3
* r 4.3.2


### cflinuxfs4 1.82.0 to 1.86.0

Notably, this release addresses:

* `USN-6715-1` unixODBC vulnerability:
  * `CVE-2024-1013`: An out-of-bounds stack write flaw was found in unixODBC on 64-bit architectures where the caller has 4 bytes and callee writes 8 bytes. This issue may go unnoticed on little-endian architectures, while big-endian architectures can be broken.
* `USN-6719-1` util-linux vulnerability:
  * `CVE-2024-28085`: escape sequence Injection in wall
* `USN-6718-1` curl vulnerabilities:
  * `CVE-2024-2004`: Usage of disabled protocol
  * `CVE-2024-2398`: HTTP/2 push headers memory-leak
* `USN-6697-1` Bash vulnerability:
  * `CVE-2022-3715`: A flaw was found in the bash package, where a heap-buffer overflow can occur in valid parameter_transform. This issue may lead to memory problems.


## Platform Changes
---

This section is for the platform operators at `cloud.gov` to highlight changes to Cloud Foundry components, this is likely not of interest for developers using the platform.

### cf-networking 3.44.0 to 3.45.0

* Go dependency bumps
* Added config for staticcheck
* Removed references to consul from documentation


### cf-smoke-tests 42.0.137 to 42.0.140

* Bump golang, cf-cli and smoke_tests packages


### diego 2.95.0 to 2.97.0

* Bump to golang 1.21.8
* Golang package dependency bumps
  * Includes moving from docker v20 to docker v26
  * Includes moving from pgx v3 to pgx v5
* Remove references to Consul from boshrelease + documentation
* Many fixes to remove deprecated code and otherwise fix linter violations.
* Adds support for comma-delimited destinations in ASGs
  * See: [cloudfoundry/executor#96](https://github.com/cloudfoundry/executor/pull/96) and [cloudfoundry/bbs#94](https://github.com/cloudfoundry/bbs/pull/94)
* Bump bosh package blobs
  * Bumps `jq` to `1.7.1`
  * Bumps `tar`
* Bump go.mod dependencies


### garden-runc 1.50.0 to 1.51.0

* Adds `grootfs.routine_gc` property, which allows operators to configure garden to grootfs to clean up unused container image layers whenever new containers are created.
  * Previously, to achieve this, operators had to set `grootfs.reserved_space_for_other_jobs_in_mb` to the same value as the ephemeral disk, which is not always easy to obtain programatically.
* Bump go dependencies


### routing 0.293.0 to 0.294.0

* Bump haproxy to 2.8.7
* update templates to not refer to consul
* Default the routing_api.enabled_api_endpoints to mtls
* Update template test for mTLS routing api default
* Upgrade cf-cli-8-linux


### silk 3.44.0 to silk 3.45.0

* Fixes to stop using deprecated code in tests (net.Error.Temporary())
* Remove consul references from documentation
* Fix issues bumping the code.cloudfoundry.org/executor package
* Go package bumps


### uaa 77.2.0 to 77.4.0

* Bump to UAA v77.4.0
* Misc
  * Fixes a regression introduced in commit d10922a where we stopped reading the signatureAlgorithm from the properties file and only used the SHA1 default.
* Dependency Bumps
  * Add jwtClientAuthentication in Oauth provider examples
  * Bump github.com/cloudfoundry/bosh-utils from 0.0.452 to 0.0.453
  * Bump minitest from 5.22.2 to 5.22.3
  * Bump bigdecimal from 3.1.6 to 3.1.7
  * Bump nokogiri from 1.16.2 to 1.16.3
  * Bump github.com/onsi/gomega from 1.31.1 to 1.32.0 in /src/acceptance_tests



## Final Note

Enjoy the eclipse!   

Tune in next sprint for more cloud.gov release notes.









