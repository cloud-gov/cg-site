---
layout: post
date: December 12th 2023
title: "December 12th Cloud.gov Change Log"
excerpt: The Cloud.gov team is working on providing change logs so everyone can see new features and updates.
---

# Change Log - Enjoy the season and gather with family and friends! 

## Customer Facing Changes
---

The audience for this section is developers who maintain applications on Cloud.gov and may need to respond to stack or buildpack changes.

### CF-Deployment - v33.10.0 to v34.2.0

* Changes below are broken down by component


### Go-Buildpack 1.10.13 to 1.10.14

* Add go 1.21.4, remove go 1.21.3 
* Add go 1.20.11, remove go 1.20.10 
* Add go 1.21.3, remove go 1.21.2 
* Add go 1.20.10, remove go 1.20.9 

Packaged binaries:

 * dep	0.5.4
 * glide	0.13.3
 * go	1.20.11
 * go	1.21.4
 * godep	80

Default binary versions:
* 1.20.x

### Nginx-Buildpack 1.2.7 to 1.2.8

* Add nginx 1.25.3, remove nginx 1.25.2 

Packaged binaries:

* nginx 1.24.0
* nginx 1.25.3
* openresty 1.19.9.1
* openresty 1.21.4.2

Default binary versions:

* 1.25.x

### Nodejs-Buildpack 1.8.19 to 1.8.20

* Updating github-config ([#673](https://github.com/cloudfoundry/nodejs-buildpack/pull/673))

Packaged binaries:

* node 18.18.0
* node 18.18.2
* node 20.8.1
* node 20.9.0
* python 3.11.6
* yarn 1.22.19

Default binary versions:

* python 3.11.x
* node 18.x



### PHP-Buildpack 4.6.11 to 4.6.12

* Add php 8.1.25, remove php 8.1.23
* Add php 8.2.12, remove php 8.2.10
* Add nginx 1.25.3, remove nginx 1.25.2
* Add httpd 2.4.58, remove httpd 2.4.57

Packaged binaries:

* appdynamics 23.7.1-751
* composer 2.6.5
* httpd 2.4.58
* newrelic 10.11.0.3
* nginx 1.24.0
* nginx 1.25.3
* php 8.1.24
* php 8.1.25
* php 8.2.11
* php 8.2.12
* python 2.7.18
* ruby 3.0.5

Default binary versions:

* php 8.1.25
* httpd 2.4.58
* newrelic 10.11.0.3
* nginx 1.25.3
* composer 2.6.5


### Python-Buildpack 1.8.15 to 1.8.16

* Add setuptools 69.0.0, remove setuptools 68.2.2
* Add pipenv 2023.11.15, remove pipenv 2023.10.3
* Add miniconda3-py39 23.10.0, remove miniconda3-py39 23.5.2
* Add pip 23.3.1, remove pip 23.2.1

Packaged binaries:

* libffi 3.2.1
* libmemcache 1.0.18
* miniconda3-py39 23.10.0
* pip 23.3.1
* pipenv 2023.11.15
* python 3.8.18
* python 3.9.18
* python 3.10.13
* python 3.11.6
* python 3.12.0
* setuptools 69.0.0

Default binary versions:

* 3.10.x



### r-Buildpack 1.2.6 to 1.2.7

* Add r 4.3.2, remove r 4.3.1 
* Update r 4.2.3 dependencies:
    * shiny from 1.7.5 to 1.8.0

Packaged binaries:

* 4.2.3 - Modules: forecast, plumber, rserve, shiny
* 4.3.2 - Modules: forecast, plumber, rserve, shiny




### Ruby-Buildpack 1.10.5 to 1.10.6

* Add jruby 9.4.5.0, remove jruby 9.4.3.0
* Add jruby 9.3.13.0, remove jruby 9.3.11.0
* Add yarn 1.22.21, remove yarn 1.22.19
* Add bundler 2.4.22, remove bundler 2.4.21
* Add rubygems 3.4.22, remove rubygems 3.4.21
* Add node 20.9.0, remove node 18.18.2

Packaged binaries:

* bundler 2.4.22
* jruby 9.3.13.0
* jruby 9.4.5.0
* node 20.9.0
* openjdk1.8-latest 1.8.0
* ruby 3.0.5
* ruby 3.0.6
* ruby 3.1.3
* ruby 3.1.4
* ruby 3.2.1
* ruby 3.2.2
* rubygems 3.4.22
* yarn 1.22.21

Default binary versions:

* 3.2.x


### Staticfile-Buildpack 1.6.7 to 1.6.8

* Add nginx 1.25.3, remove nginx 1.25.2

Packaged binaries:

* nginx 1.24.0
* nginx 1.25.3

Default binary versions:

* 1.25.x



### CFLinuxfs4 - 1.54.0 up from 1.51.0 

Notably, this bump addresses:

* `USN-6505-1` USN-6505-1: nghttp2 vulnerability: 
    * `CVE-2023-44487`: The HTTP/2 protocol allows a denial of service (server resource consumption) because request cancellation can reset many streams quickly, as exploited in the wild in August through October 2023.
* `USN-6499-1` USN-6499-1: GnuTLS vulnerability: 
    * `CVE-2023-5981`: [timing side-channel inside RSA-PSK key exchange]

 * `USN-6517-1` USN-6517-1: Perl vulnerabilities:

    * `CVE-2022-48522`: In Perl 5.34.0, function S_find_uninit_var in sv.c has a stack-based crash that can lead to remote code execution or local privilege escalation.
    * `CVE-2023-47038`: [A crafted regular expression when compiled by perl 5.30.0 through 5.38.0 can cause a one attacker controlled byte buffer overflow in a heap allocated buffer]
    * `CVE-2022-48522`: In Perl 5.34.0, function S_find_uninit_var in sv.c has a stack-based crash that can lead to remote code execution or local privilege escalation.
    * `CVE-2023-47038`: [A crafted regular expression when compiled by perl 5.30.0 through 5.38.0 can cause a one attacker controlled byte buffer overflow in a heap allocated buffer]

* USN-6512-1 USN-6512-1: LibTIFF vulnerabilities:
    * `CVE-2022-40090`: An issue was discovered in function TIFFReadDirectory libtiff before 4.4.0 allows attackers to cause a denial of service via crafted TIFF file.
    * `CVE-2023-3576`: A memory leak flaw was found in Libtiff's tiffcrop utility. This issue occurs when tiffcrop operates on a TIFF image file, allowing an attacker to pass a crafted TIFF image file to tiffcrop utility, which causes this memory leak issue, resulting an application crash, eventually leading to a denial of service.
    * `CVE-2023-3576`: A memory leak flaw was found in Libtiff's tiffcrop utility. This issue occurs when tiffcrop operates on a TIFF image file, allowing an attacker to pass a crafted TIFF image file to tiffcrop utility, which causes this memory leak issue, resulting an application crash, eventually leading to a denial of service.
    * `CVE-2022-40090`: An issue was discovered in function TIFFReadDirectory libtiff before 4.4.0 allows attackers to cause a denial of service via crafted TIFF file.


## Platform Changes
---

This section is for the platform operators at Cloud.gov to highlight changes to Cloud Foundry components, this is likely not of interest for developers using the platform.


### BOSH DNS - v1.36.10 to v1.36.11

* Updates golang package golang-1-linux to 1.21.5
* Updates golang package golang-1-windows to 1.21.5


### CAPI - v1.165.0 to v1.166.0

* CC API Version: 2.217.0 and 3.152.0
* Service Broker API Version: 2.15

CAPI Release

* Add config flag to disable prom_scraper
* Add statsd_host + statsd_port to cloud_controller_clock job
* Dependency Bumps
  * Bump postgres to v11.22

Cloud Controller

* Fix/Improve PumaRunner Setup and Configuration
* Prometheus on Thin
* Refactoring UAA client
* Remove unreachable rescue
* Enable Rails/EnvLocal rubocop
* Dependency Bumps
  * bump spring from 4.1.2 to 4.1.3
  * bump rspec-rails from 6.0.3 to 6.1.0
  * bump puma from 5.6.7 to 6.4.0
  * bump nokogiri from 1.15.4 to 1.15.5
  * bump rubocop-rails from 2.22.1 to 2.22.2
  * bump public_suffix from 5.0.3 to 5.0.4
  * bump spring from 4.1.1 to 4.1.2
  * bump mock_redis from 0.39.0 to 0.40.0

Cloud Controller Database Migrations

* None

### CF-Smoketests 42.0.113 to 42.0.117

* Bump golang, cf-cli and smoke_tests packages


### Garden-Runc 1.44.0 to 1.45.0

* Resolved an issue where container networking statistics could not be retrieved for apps running in containers that did not have a `bash` executable.
* Removed the garden-healthchecker package after it had been removed from the boshrelease in v1.43.0


### loggregator-agent 7.7.1 to 7.7.2

Experimental OTel Collector changes
 * Bump otel-collector to v0.89.0. See the [opentelemetry-collector](https://github.com/open-telemetry/opentelemetry-collector/releases/tag/v0.89.0) and [opentelemetry-collector-contrib](https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.89.0) release notes for more details.


### UAA 76.25.0 to 76.26.0

* Bump github.com/cloudfoundry/bosh-utils from 0.0.414 to 0.0.415 in /src/acceptance_tests

## Final Note

Remember to keep your eggnog refrigerated until consumed.
