---
parent: policies
layout: ops
layout: docs
sidenav: true
title: Continuous Integration
---

The cloud.gov team conducts continuous integration of cloud.gov on a real-time basis; as new updates are available, they are automatically pulled and promoted through our environments.

## Overview

The cloud.gov team maintains 3 core environments:

* Development
* Staging
* Production

Within each of these environments contains incremental version upgrades and configuration modifications to the cloud.gov platform. Changes are automatically promoted through each environment after a series of tests, starting with development. Once integration, smoke, and acceptance tests pass in development for a given change, the change is promoted through to our staging environment. Similar steps repeat the process, and upon success a change is then promoted to our production environment.

Customer workloads run exclusively in our production environment.

## Development

The development environment for the cloud.gov platform is where we test branch new changes. Each of these changes is automatically picked up through our [open-source continuous thing-doer, Concourse](https://concourse-ci.org/). Concourse listens for changes on BOSH releases, Github repositories, BOSH stemcells, and internal files we use to configure the platform.

Every time there is a change to any of the resources we watch, Concourse will automatically trigger a new build, firing off our automation steps. This means every time there is a CVE fix pushed, new version released, or other general update, the cloud.gov development environment automatically sees the change and tries to immediately deploy it.

In this environment, the cloud.gov operations team also tests new configurations, new features, and new releases in a safe environment, away from our production workloads. Any feature delivered to customers will first be tested, verified, and validated in our development environment.

We have a comprehensive set of tests for each of the platform components we deploy, and those are automatically triggered as the next set of steps after a successful deployment. These tests ensure the new change does not encompass a breaking change which requires manual operator intervention. Upon the successful testing of a change, the change is automatically promoted to our staging environment.

## Staging

Once Concourse has successfully run our test cases in the development environment, it then promoted the change through to our staging environment. Concourse's Job functionality provides a feature called Steps. Steps can take input, operate on it, and then provide it as optional output. For each change the cloud.gov team consumes from either our own repositories or other upstream source code we consume, we require each Job to have passed previous Steps in previous Jobs. This means that changes incoming to our staging environment are required to pass in our development environment. This provides a safety net to ensure that incoming changes to the cloud.gov platform do not skip environments.

Our staging environment closely mimics our production environment; we have realistic-scale workloads and configurations which closely mimic our production environment. Any incoming change to our staging environment require in-place upgrades and non-breaking changes in order to be both deployed and tested successfully.

Staging also runs integration, smoke, and acceptance tests against every incoming change from our development environment, before pushing it out to our production environment.

## Production

This is where all customer workloads live. All the same rules apply to our production environment: changes must first pass multiple testing steps, a deployment, and then acceptance tests. By the time a change reaches our production environment, changes have been comprehenesively tested in development and staging before being available to customers.
