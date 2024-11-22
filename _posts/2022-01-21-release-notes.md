---
layout: post
date: January 21, 2022
title: "January 21st cloud.gov Change Log"
excerpt: The cloud.gov team is working on providing change logs so everyone can see new features and updates.
---

# Happy New Year!

The cloud.gov team is working on providing change logs so everyone can see new features and updates. Some highlights include cf-deployment v17.1, S3 Broker and Log4J Fixes.

# Change Log
## Customer Facing
---

### java-buildpack - 4.47* up from 4.46*
* Bump java-buildpack to 4.47*

This release focuses on dependency updates, primarily that fix the latest Apache Log4j2 vulnerability, CVE-2021-45105, in dependencies used by the Java buildpack.

In particular, the following dependencies have been updated to include Log4j 2.17.0 and have been patched in this release:

* AppDynamics Java Agent (21.11.3)
* New Relic Java Agent (7.4.3)

### php-buildpack - 4.4.55* up from 4.4.53*
* Bump php-buildpack to 4.4.55*
  * Bump appdynamics agent to 22.1.0
  * Rebuild php 8.0.14 to update modules for stack(s) cflinuxfs3
  * Rebuild php 7.4.27 to update modules for stack(s) cflinuxfs3
  * Add composer 2.2.4, remove composer 2.2.3 for stack(s) cflinuxfs3

## Platform Changes
---
### Snort - 570 up from 567
* Just the usual snort updates

### Logsearch - 211.1.46 up from 211.1.39
* Bump logsearch to v211.1.46
