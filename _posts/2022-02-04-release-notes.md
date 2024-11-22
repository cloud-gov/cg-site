---
layout: post
date: February 4, 2022
title: "February 4th cloud.gov Change Log"
excerpt: The cloud.gov team is working on providing change logs so everyone can see new features and updates.
---

The cloud.gov team is working on providing change logs so everyone can see new features and updates. Highlights this month include changes to several of the platform buildpacks.

# Change Log
## Customer Facing
---

### Java Buildpack v4.48 - up from v4.47

This release focuses on dependency updates, primarily the latest Java/OpenJDK quarterly updates.

Other notable changes:

* We have bumped the Apache SkyWalking version to 8.8.0. This is the latest supported version at the time of publishing. Please be aware of this change if you are using the Apache SkyWalking agent as this is a major version increase.
* [#926](https://github.com/cloudfoundry/java-buildpack/pull/926) resolves a classpath problem when using the Luna Security Provider on Java 9+.
* This release pulls in new versions of App Dynamic and New Relic that include patches for CVE-2021-44832.

### Ruby Buildpack v1.8.50 - up from v1.8.49

* Add rubygems 3.3.4, remove rubygems 3.2.33
* Add bundler 2.3.4, remove bundler 2.2.33

## Platform Changes
---

No changes this month.