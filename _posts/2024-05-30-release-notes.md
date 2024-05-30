---
layout: post
date: May 30th 2024
title: "May 30th Cloud.gov Release Notes"
excerpt: The Cloud.gov team is working on providing release notes so everyone can see new features and updates.
---

# Release Notes

## Developer Impacting Changes

The audience for this section is developers who maintain applications on cloud.gov and may need to respond to stack or buildpack changes.

### CF-Deployment - v40.9.0 to v40.13.0

Changes below are broken down by component:

#### Binary Buildpack 1.1.12

* Updating github-config
* add codeowners [#173](https://github.com/cloudfoundry/binary-buildpack/pull/173)


#### DotNet Core Buildpack 2.4.28

* Add dotnet-aspnetcore 6.0.30, remove dotnet-aspnetcore 6.0.29
* Add dotnet-aspnetcore 7.0.19, remove dotnet-aspnetcore 7.0.18
* Add dotnet-aspnetcore 8.0.5, remove dotnet-aspnetcore 8.0.4 (#972)
* Add dotnet-runtime 6.0.30, remove dotnet-runtime 6.0.29
* Add dotnet-runtime 7.0.19, remove dotnet-runtime 7.0.18
* Add dotnet-runtime 8.0.5, remove dotnet-runtime 8.0.4
* Add dotnet-sdk 6.0.422, remove dotnet-sdk 6.0.421
* Add dotnet-sdk 7.0.409, remove dotnet-sdk 7.0.408
* Add dotnet-sdk 8.0.300, remove dotnet-sdk 8.0.204

#### Go Buildpack v1.10.19

* Updating github-config
* Add go 1.22.3, remove go 1.22.2
* Add go 1.21.10, remove go 1.21.9


#### Java Buildpack v4.70.0

This release contains support for Tomcat 10.1 in the form of a new version line, as well as some framework dependency bumps. It also contains the April Java patch releases for 8, 11, 17 & 21, as well as some framework dependency bumps.

The default version of Tomcat will remain at 9.x, but you can now specify 10.1.x to be used by the buildpack, in the same way as changing the JRE version.

```bash
cf set-env <tomcat-app> JBP_CONFIG_TOMCAT '{ tomcat: { version: 10.1.+ } }'
```

For a more detailed look at the changes in [4.70.0](https://github.com/cloudfoundry/java-buildpack/releases/tag/v4.70.0). The packaged version of the buildpack, suitable for use with create-buildpack and update-buildpack, can be found attached to this release.

#### Nginx Buildpack v1.2.14

* Add nginx 1.26.0, remove nginx 1.24.0
* Add nginx 1.25.5, remove nginx 1.25.4

#### NodeJS Buildpack v1.8.25

* Add node 18.20.3, remove node 18.19.1
* Add node 20.13.1, remove node 20.11.1

#### PHP Buildpack v4.6.19

* Add php 8.3.7, remove php 8.3.4
* Add composer 2.7.6, remove composer 2.7.5
* Add php 8.2.19, remove php 8.2.17
* Add composer 2.7.5, remove composer 2.7.4
* Update default nginx version
* Add nginx 1.25.5, remove nginx 1.25.4
* Add nginx 1.26.0 
* Rebuild php 8.2.18 
* Add composer 2.7.4, remove composer 2.7.3
* Add composer 2.7.3, remove composer 2.7.2

#### Python Buildpack v1.8.25

* Add miniconda3-py39 24.4.0, remove miniconda3-py39 24.1.2
* Add setuptools 70.0.0, remove setuptools 69.5.1

#### R Buildpack v1.2.12

* Remove R 3.6 (old version)
* Add r 4.4.0 with forecast 8.22.0, plumber 1.2.2, rserve 1.8.13, shiny 1.8.1.1

#### Ruby Buildpack v1.10.15

* Add jruby 9.4.7.0, remove jruby 9.4.6.0
* Add bundler 2.5.10, remove bundler 2.5.9
* Add rubygems 3.5.10, remove rubygems 3.5.9
* Add ruby 3.3.1
* Add ruby 3.2.4, remove ruby 3.2.2
* Add ruby 3.1.5, remove ruby 3.1.3

#### Staticfile Buildpack v1.6.13

* Add nginx 1.26.0, remove 1.24.0
* Add nginx 1.25.5, remove nginx 1.25.4


### Platform Changes

The following were also updated but are likely only of interest to a small subset of developers:

* app-autoscaler bumped to [13.1.1](https://github.com/cloudfoundry/app-autoscaler-release/releases/tag/v13.1.1)
* capi bumped to [1.182.0](https://github.com/cloudfoundry/capi-release/releases/tag/1.182.0)
* cflinuxfs4 bumped to [1.98.0](https://github.com/cloudfoundry/cflinuxfs4/releases/tag/1.98.0)
* diego bumped to [2.100.0](https://github.com/cloudfoundry/diego-release/releases/tag/v2.100.0)
* garden-runc bumped to [1.53.0](https://github.com/cloudfoundry/garden-runc-release/releases/tag/v1.53.0)
* routing bumped to [0.298.0](https://github.com/cloudfoundry/routing-release/releases/tag/v0.298.0)
