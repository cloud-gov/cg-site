---
layout: post
date: September 29th 2022
title: "September 29th cloud.gov Change Log"
excerpt: The cloud.gov team is working on providing change logs so everyone can see new features and updates.
---

Happy end of September ! The cloud.gov team is working on providing change logs so everyone can see new features and updates. Highlights this time include new stemcell and new version of cf-deployment.

# Change Log

## Customer Facing

---

### CF-Deployment - v21.11.0 up from v21.10.0

* Changes will be below broken up by component :)

### Binary buildpack - v1.0.46 up from v1.0.45

* Uncached buildpack SHA256: c783f83e8338b27dac50b0d727f5d97144637c242bb196862032b31c2e7f03c8
* Uncached buildpack SHA256: 356de9c16e950aafc26b38de344c9194f90a4504f659124b27f2e5240dcdcffa
* Uncached buildpack SHA256: 3cf7f7db4b583c70bf96a7f783c08927194397898c5ab45cc5b0719c4df542a6

### Dotnet core Buildpack -v 2.4.1 up form v2.4.0

* Bug fixes
* Add dotnet-sdk 3.1.423, remove dotnet-sdk 3.1.421 for stack(s) cflinuxfs3
* Add dotnet-sdk 6.0.401, remove dotnet-sdk 6.0.302 for stack(s) cflinuxfs4, cflinuxfs3
* Add dotnet-runtime 3.1.29, remove dotnet-runtime 3.1.27 for stack(s) cflinuxfs3
* Add dotnet-runtime 6.0.9, remove dotnet-runtime 6.0.7 for stack(s) cflinuxfs4, cflinuxfs3
* Add dotnet-aspnetcore 3.1.29, remove dotnet-aspnetcore 3.1.27 for stack(s) cflinuxfs3
* Add dotnet-aspnetcore 6.0.9, remove dotnet-aspnetcore 6.0.7 for stack(s) cflinuxfs4, cflinuxfs3
* Add node 16.17.0, remove node 16.16.0 for stack(s) cflinuxfs4, cflinuxfs3

### Go Buildpack - v1.9.50 up from v1.9.49

* Deprecate Go 1.17 (#285)
* Add go 1.19.1for stack(s) cflinuxfs3
* Add go 1.18.6, remove go 1.18.4 for stack(s) cflinuxfs3
* Adds --stack flag for integration tests

### Java Buildpack - v4.52 up from v4.50

* Deprecation of Spring Cloud Connectors & Spring Auto Reconfiguration - this feature is now disabled by default
* See release notes for latest versions of depenancies - https://github.com/cloudfoundry/java-buildpack/releases/tag/v4.52

### Nginx Buildpack - v1.1.43 up from v1.1.42

* Update libbuildpack
* nginx	1.22.0	cflinuxfs3
* nginx	1.23.1	cflinuxfs3
* openresty	1.13.6.2	cflinuxfs3
* openresty	1.15.8.3	cflinuxfs3
* openresty	1.17.8.2	cflinuxfs3
* openresty	1.19.9.1	cflinuxfs3
* openresty	1.21.4.1	cflinuxfs3
* Default binary is now nginx 1.23.x
* Uncached buildpack SHA256: 4f3acdd173c641d69e65ee46b28eee41660539110fe0729a53d60db4a4c170c7

### Nodejs Buildpcak - v1.8.0 up from v1.7.73

* node	14.19.3	cflinuxfs3
* node	14.20.0	cflinuxfs3
* node	16.16.0	cflinuxfs3
* node	16.17.0	cflinuxfs3
* node	18.7.0	cflinuxfs3
* node	18.9.0	cflinuxfs3
* yarn	1.22.19	cflinuxfs3
* Default binary is now node 16.x

### Php Buildpack - v4.4.66 up from v4.4.65

* Add php 8.0.23, remove php 8.0.21
* Add php 8.1.10, remove php 8.1.8
* Add composer 2.4.1, remove composer 2.3.10
* See release notes for packaed binaries and releases - https://github.com/cloudfoundry/php-buildpack/releases/tag/v4.4.66

### Python Buildpack - v1.7.59 up from v1.7.57

* Add pipenv 2022.9.24, remove pipenv 2022.9.21 for stack(s) cflinuxfs3
* Add setuptools 65.4.0, remove setuptools 65.3.0 for stack(s) cflinuxfs3
* Remove deprecated functions in Go code - https://github.com/cloudfoundry/python-buildpack/pull/608
* Default binary is now python 3.10.x

### R Buildpack - v1.1.33 up from v1.1.32

* Rebuild r 4.2.1
* r	3.6.2	cflinuxfs3	forecast, plumber, rserve, shiny
* r	3.6.3	cflinuxfs3	forecast, plumber, rserve, shiny
* r	4.2.0	cflinuxfs3	forecast, plumber, rserve, shiny
* r	4.2.1	cflinuxfs3	forecast, plumber, rserve, shiny

### Ruby Buildpack - v1.8.58 up from v1.8.57

* Add bundler 2.3.22, remove bundler 2.3.21
* Add rubygems 3.3.22, remove rubygems 3.3.19
* Add bundler 2.3.21, remove bundler 2.3.19
* Add jruby 9.3.7.0, remove jruby 9.3.6.0
* Add node 16.17.0
* bundler	1.17.3	cflinuxfs3
* bundler	2.3.22	cflinuxfs3
* jruby	9.2.21.0	cflinuxfs3
* jruby	9.3.7.0	cflinuxfs3
* node	16.16.0	cflinuxfs3
* node	16.17.0	cflinuxfs3
* openjdk1.8-latest	1.8.0	cflinuxfs3
* ruby	2.7.5	cflinuxfs3
* ruby	2.7.6	cflinuxfs3
* ruby	3.0.3	cflinuxfs3
* ruby	3.0.4	cflinuxfs3
* ruby	3.1.1	cflinuxfs3
* ruby	3.1.2	cflinuxfs3
* rubygems	3.3.22	cflinuxfs3
* yarn	1.22.19	cflinuxfs3
* Default binary is now ruby 2.7.x

## Platform Changes

---

### Capi - v1.139.0 up from 1.136.0

* Mainly bug fixes

### Cflinuxfs3 - v0.326.0 up from v0.320.0

* Patched for USN-5631-1 USN-5631-1: libjpeg-turbo vulnerabilities:

### Diego - v2.66.3 up from v2.66.2

* Mainly bug fixes

### Garden - v1.22.2 up from v1.22.1

* gdn is now statically compiled
* Various minor bumps

### Loggregator - v106.7.0 up from v106.6.9

* Switch from grpc-throughputlb package to default gRPC load balancing
* Add ReadHeaderTimeouts to all servers
* Fix some golangci-lint warnings
* Bump golang to 1.18.6
* Bump dependencies

### Metrics-discovery - v3.2.0 up from v3.2.0

* Add ReadHeaderTimeout to all servers 
* Bump dependencies
* Bump to golang 1.18.6

### Nats - v51 up form v50

* Built with golang 1.19.1

### Routing - v0.239.0 up from v0.238.0

* Bumped Golang to 1.18.6 to mitigate CVE-2022-27664

### Statsd injector - v1.11.22 up from v1.11.21

* Bump dependencies
* Bump to golang 1.18.6

### Stemcell - v1.107 up from v1.97

* BOSH Agent Version: 2.468.0
* Patched for USN-5585-1: Jupyter Notebook vulnerabilities
* Patched for USN-5575-1: Libxslt vulnerabilities
* Patched for USN-5600-1: Linux kernel (HWE) vulnerabilities
* Patched for USN-5603-1: Linux kernel (Raspberry Pi) vulnerabilities
* Patched for USN-5592-1: Linux kernel vulnerabilities
* Patched for USN-5591-3: Linux kernel vulnerability
* Patched for USN-5591-4: Linux kernel (AWS) vulnerability
* Patched for USN-5598-1: Linux kernel (Oracle) vulnerability
* Patched for USN-5523-2: LibTIFF vulnerabilities
* Patched for USN-5612-1: Intel Microcode vulnerability
* Patched for USN-5608-1: DPDK vulnerability
* Patched for USN-5583-1: systemd vulnerability
* Patched for USN-5583-2: systemd regression
* Patched for USN-5571-1: PostgreSQL vulnerability
* Patched for USN-5584-1: Schroot vulnerability
* Patched for USN-5578-1: Open VM Tools vulnerability
* Patched for USN-5587-1: curl vulnerability
* Patched for USN-5573-1: rsync vulnerability
* Patched for USN-5570-1: zlib vulnerability
* Patched for USN-5581-1: Firefox vulnerabilities
* Patched for USN-5606-1: poppler vulnerability
