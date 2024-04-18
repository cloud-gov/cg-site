---
layout: post
date: April 18th 2024
title: "April 18th cloud.gov Change Log"
excerpt: The cloud.gov team is working on providing change logs so everyone can see new features and updates.
---

# Change Log 

## Customer Facing Changes
---

The audience for this section is developers who maintain applications on cloud.gov and may need to respond to stack or buildpack changes.

No buildpacks were updated this sprint.  The changes to the platform are also pretty light this time around, but more are coming soon!

### CF-Deployment - v40.1.0 to v40.3.0

Changes below are broken down by component:


#### cflinuxfs4 1.86.0 to 1.87.0

There were no CVEs patched for, the changes were only to packages.


## Platform Changes
---

This section is for the platform operators at `cloud.gov` to highlight changes to Cloud Foundry components, this is likely not of interest for developers using the platform.


### aide 21 to 22

* Documentation only change

### bpm 1.2.17 to 1.2.18

* Updates golang package golang-1-linux to 1.22.2

### capi 1.175.0 to 1.176.0

#### CAPI Release

* Dependency Bumps
   * Bump Golang to go1.22.1

#### Cloud Controller

* Print output of blobstore benchmark again
* Enhance local dev setup having a valid 'bits_path'
* Update lock information logging to happen on info and to happen only once per state switch
* Set warning header for outdated CF CLIs

Dependencies

* Bump debug from 1.9.1 to 1.9.2
* Bump parallel_tests from 4.5.1 to 4.6.0
* Bump rubocop-rails from 2.23.1 to 2.24.1

Cloud Controller Database Migrations

* None


### cf-smoke-tests 42.0.140 to 42.0.141

* Bump golang, cf-cli and smoke_tests packages


### routing 0.294.0 to 0.29.0

* Reverting the removal of the deprecated BuildNameToCertificate() call
* Bumps to golang 1.21.9 + golang.org/x/net 0.23.0 to patch `CVE-2023-45288`

### secureproxy 64 to 66

* Tuning and documentation changes


### shibboleth 120 to 121

* Documentation changes


### syslog 12.2.3 to 12.2.4

* Bump dependencies
* Bump packaged Golang to go1.21.9


### uaa-customized 56 to 57

* Documentation changes


## Final Note

Tune in next sprint for more cloud.gov release notes.

