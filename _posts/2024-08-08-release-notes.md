---
layout: post
date: August 8th 2024
title: "August 8th Cloud.gov Release Notes"
excerpt: The Cloud.gov team is working on providing release notes so everyone can see new features and updates.
---

# Release Notes

## Developer Impacting Changes

The audience for this section is developers who maintain applications on cloud.gov and may need to respond to stack or buildpack changes.

### CF-Deployment - v41.3.0 to v42.1.0

Changes below are broken down by component:

#### Binary Buildpack 1.1.13

* remove references to the windows2016 stack

#### Java Buildpack v4.71.0

* This release contains dependency updates.


#### NodeJS Buildpack v1.8.27

* Add node 22.5.0, remove node 22.4.1
* Add node 18.20.4, remove node 18.20.2
* Add node 22.4.1
* Add node 20.15.1, remove node 20.13.1

#### R Buildpack v1.2.13

* Add r 4.4.1 with dependencies for stack cflinuxfs4: forecast 8.23.0, plumber 1.2.2, rserve 1.8.13, shiny 1.8.1.1
* Rebuild r 4.3.3 with dependencies for stack cflinuxfs4: forecast 8.23.0, plumber 1.2.2, rserve 1.8.13, shiny 1.8.1.1
* Rebuild r 4.2.3 with dependencies for stack cflinuxfs4: forecast 8.23.0, plumber 1.2.2, rserve 1.8.13, shiny 1.8.1.1 
* Remove 4.4.0 to keep buildpack under 1GB


### Platform Changes

The following were also updated but are likely only of interest to a small subset of developers:

* app-autoscaler bumped to [14.1.1](https://github.com/cloudfoundry/app-autoscaler-release/releases/tag/v14.1.1)
* capi bumped to [1.188.0](https://github.com/cloudfoundry/capi-release/releases/tag/1.188.0)
* diego bumped to [2.101.0](https://github.com/cloudfoundry/diego-release/releases/tag/v2.101.0)
* garden-runc bumped to [1.54.0](https://github.com/cloudfoundry/garden-runc-release/releases/tag/v1.54.0)
