---
layout: post
date: January 5 2023
title: "January 5th cloud.gov Change Log"
excerpt: The cloud.gov team is provides change logs so everyone can see new features and updates.
---

Happy New Year! The cloud.gov team provides this change log so everyone can see new features and updates.

# Change Log

## Customer Facing

---

### Noteworthy Changes and features

### dotnet-core-buildpack 2.4.5

* Deprecate .Net (aspnetcore, runtime and sdk) 3.x
* Add dotnet-aspnetcore 6.0.12, remove dotnet-aspnetcore 6.0.11 for stack(s) cflinuxfs4, cflinuxfs3
* Add dotnet-runtime 6.0.12, remove dotnet-runtime 6.0.11 for stack(s) cflinuxfs4, cflinuxfs3
* Add dotnet-sdk 6.0.404, remove dotnet-sdk 6.0.403 for stack(s) cflinuxfs4, cflinuxfs3
* Add dotnet-aspnetcore 7.0.1, remove dotnet-aspnetcore 7.0.0 for stack(s) cflinuxfs4, cflinuxfs3
* Add dotnet-runtime 7.0.1, remove dotnet-runtime 7.0.0 for stack(s) cflinuxfs4, cflinuxfs3
* Add dotnet-sdk 7.0.101, remove dotnet-sdk 7.0.100 for stack(s) cflinuxfs4, cflinuxfs3

### nodejs-buildpack v1.8.4

* Bumps default node version to 18

### php-buildpack v4.5.0

* Deprecate PHP 7.4.x
* Remove CAAPM Agent not supported by PHP 8 (#746)
* Update default PHP Version to 8.1.13
* Add appdynamics 22.12.0-667, remove appdynamics 22.10.0-627 for stack(s) cflinuxfs3
* Add nginx 1.23.3, remove nginx 1.23.2 for stack(s) cflinuxfs3
* Add php 8.0.26, remove php 8.0.24 for stack(s) cflinuxfs3
* Add php 8.1.13, remove php 8.1.11 for stack(s) cflinuxfs

### python-buildpack v1.8.3 from v1.8.1

* Add python 3.11.0 for stack(s) cflinuxfs3, cflinuxfs4
* Add python 3.8.15, remove python 3.8.13 for stack(s) cflinuxfs3, cflinuxfs4
* Add python 3.9.15, remove python 3.9.13 for stack(s) cflinuxfs4, cflinuxfs3
* Add python 3.10.8, remove python 3.10.6 for stack(s) cflinuxfs3, cflinuxfs4
* Add python 3.7.15, remove python 3.7.13 for stack(s) cflinuxfs4, cflinuxfs3
* Add pip 22.3.1, remove pip 22.2.2 for stack(s) cflinuxfs4, cflinuxfs3
* Add setuptools 65.5.1, remove setuptools 65.4.0 for stack(s) cflinuxfs4, cflinuxfs3
* Add pipenv 2022.11.5, remove pipenv 2022.9.24 for stack(s) cflinuxfs4, cflinuxfs3
* Distinguish Vendored and Unvendored installs in logs
* Log used 'pip install' command before executing it for debugging
* Print pip's version when using python's pip module To be able to debug problems when using pip it's handy to know which version of pip is actually being used

### r-buildpack v1.1.36

* Rebuild r 4.2.2 for stack(s) cflinuxfs3 with dependencies for stack cflinuxfs3: forecast 8.19, plumber 1.2.1, rserve 1.8.11, shiny 1.7.3

### ruby-buildpack v1.9.0 from v1.8.60

* Add support for cflinuxfs4 stack
* Update default ruby version to 3.1
* Remove deprecated bundler 1.x version line (#650)
* supply: remove ruby.exe symlinking
    * This seems to be from a heroku era effort to support windows.
* openjdk8: update dependency
* Remove EOL'd jruby 9.2 (#612)
* Add jruby 9.4.0.0 for stack(s) cflinuxfs3
* Add ruby 2.7.7, remove ruby 2.7.5 for stack(s) cflinuxfs3
* Add ruby 3.1.3, remove ruby 3.1.1 for stack(s) cflinuxfs3
* Add bundler 2.3.26, remove bundler 2.3.25 for stack(s) cflinuxfs3
* Add rubygems 3.3.26, remove rubygems 3.3.25 for stack(s) cflinuxfs3
* Test fixtures: Updates rails5 Gemfile.lock to resolve C compilation issues
* Test fixtures: Removes integration tests for Rails 4 has been out of support since Aug. 2019

### staticfile-buildpack v1.5.36

* Handle comma separated X-Forwarded-Proto

## Platform Changes

---

### CAPI - 1.143.0 up from 1.141.0

Highlights

* Support for asynchronous service binding creation in Space Manifests
* CC API Version: 2.195.0 and 3.130.0
* Use Clang compiled Ruby on Jammy
* Diego client tries all bbs domain IPs

Service Broker API Version: 2.15

CAPI Release

* Timeout for async service bindings in manifests (#281)
* Dependency bumps
* bump Golang to go1.19.4
* Bump ruby-release to get a Clang compiled Ruby on Jammy (#279)
* Make puma max threads configurable (#282)
* Ensure that the drain log dir exists (#284)

Cloud Controller

* Reverts “Diego client tries all bbs domain IPs” (cloudfoundry/cloud_controller_ng#3113)
* Reverts regression regarding communication with BBS introduced in 1.142.0 (cloudfoundry/cloud_controller_ng#3109)
* Optimize service plan visibility queries (cloudfoundry/cloud_controller_ng#3055)
* Add user_guid to request logs (cloudfoundry/cloud_controller_ng#3087)
* Loggregator: add flag to deprecate v4 bindings endpoint (cloudfoundry/cloud_controller_ng#3100)
* Add ca for syslog bindings (cloudfoundry/cloud_controller_ng#3098)
* Support for asynchronous service binding creating in Space Manifests (cloudfoundry/cloud_controller_ng#3058)
* Catch AppStart errors in deployment create action (cloudfoundry/cloud_controller_ng#3074)
* Diego client tries all bbs domain IPs (cloudfoundry/cloud_controller_ng#3048)
* Let Sequel check if single records exist (cloudfoundry/cloud_controller_ng#3082)
* Use more efficient 'select' in place of 'select_map' (cloudfoundry/cloud_controller_ng#3070)
* Index service_instances.service_plan_id (cloudfoundry/cloud_controller_ng#3065)
* Remove more inefficient counting (cloudfoundry/cloud_controller_ng#3067)
* Finalize only deployments with 'STATUS_VALUE' 'ACTIVE' (cloudfoundry/cloud_controller_ng#3073)
* Puma Threads & Local Port (cloudfoundry/cloud_controller_ng#3063)
* Re-add db table request_counts (cloudfoundry/cloud_controller_ng#3076)

### Diego 2.71.0 up from 2.70.0

* Removed legacy code relating to consul in diego components. This was long ago replaced by locket.
* Added helpful logging to cacheddownloader for when it retries/fails downloads. Thanks @vlast3k!
* Bumped ginkgo dependencies
* Bumps golang to 1.19.4
* ✨ Built with go 1.19.4

### garden-runc 1.22.7 up from 1.22.5

* Bundler update to fix deprecation warnings.
* Golang was bumped to v1.19.4
* The garden job now has an HTTP-based healthchecker process that will restart garden if it detects that it has stopped responding to HTTP requests. It will do this for up to 10 consecutive failures before stopping.
* grootfs was bumped with new golang dependencies.

### loggregator-release v107.0.0 from v106.7.5

Remove RecentLogsHandler from Traffic Controller. Traffic Controller has been providing recent logs as a fallback for environments/tools which had not moved to retrieving recent logs directly from Log Cache. With this change older versions of the cf CLI v6 will no longer be able to retrieve recent logs from Cloud Foundry.

We are making this change as Log Cache has been the correct way of retrieving these logs for many years and the legacy support was causing issues with the splitting out of Log Cache from Dopplers.

What's Changed

* Remove RecentLogsHandler by @rroberts2222 in #486
* Bump golang.org/x/net from 0.3.0 to 0.4.0 in /src by @dependabot in #487
* Delete unused manifests & scripts, clean up README by @rroberts2222 in #488
* fix go module path by @Benjamintf1 in #490

### loggregator-agent-release v6.5.6 from v6.5.5

* fix scraping with non-positive intervals to preserve non-scraping behavior by @Benjamintf1 in #174
* updated some dependencies.

### nats v54 from v53

* Golang bumped to 1.19.4
* Ruby for internal testing bumped to v3

### routing v0.252.0 from v0.251.0

* Improve random source for least connection pool to be thread safe. Thanks Daniel Lynch!
