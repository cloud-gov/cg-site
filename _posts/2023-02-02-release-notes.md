---
layout: post
date: February 2nd 2023
title: "February 2nd cloud.gov Change Log"
excerpt: The cloud.gov team is working on providing change logs so everyone can see new features and updates.
---

# Change Log

## Platform Changes
---
### Capi - v1.144.0 up from 1.143.0
* Remove cc_internal_api_user and cc_internal_api_password.
* Resolves the performance issues when using Digest module with Ruby 3 
* Performance improvements for /v3/audit_events endpoint 
* Canceling deployment is superseded by new deployment 

### CF-Networking - v3.19.0 up from v3.18.0
* Bumped Go to 1.19.5

### CFLinuxfs3 - 0.350.0 up from 0.348.0

### Dotnet-Core-Buildpack - 2.4.6 up from 2.4.5
* Add dotnet-sdk 7.0.102
* Add dotnet-sdk 6.0.405
* Add dotnet-aspnetcore 6.0.13
* Add dotnet-runtime 6.0.13
* Add dotnet-runtime 7.0.2
* Add dotnet-aspnetcore 7.0.2

### Garden-Runc 1.22.9 up from 1.22.7
* Add healthchecker bosh-package
* Add gats (integration) and gpats (performance) errands so that it can be run on any environment
* v1.22.8 was skipped due to CI failures
* Add experimental arm64 binary

### Go-Buildpack 1.10.3 up from 1.10.2
* Add go 1.18.10
* Add go 1.19.5

### Loggregator-Agent 7.1.0 up from 7.0.0
* Add app-id and drain url in the error message
* Sanitize ProcID in syslog messages so messages with utf-8 in the source_type are not dropped

### Nats 56 up from 54
* Built with go 1.19.4

### Nginx-Buildpack 1.1.46 up from 1.1.45
* Add nginx 1.23.3, remove nginx 1.23.2 for stack(s) cflinuxfs3

### Prometheus 27.2.2 up from 27.2.1
* This release breaks dashboards using pie charts
* Fixes an issue with setting grafana home dashboard
* Adds grafana configuration for id_token_attribute_name in generic oauth 

### Routing 0.255.0 up from 0.253.0
* Upgrade healthchecker in release. In order to limit the scope of packages brought in with the introduction of http healthchecker, we migrated the healthchecker package out of cf-networking-helpers into its own release.
* Built with go 1.19.5

### Silk 3.19.0 up from 3.18.0
* Bumped go to 1.19.5
