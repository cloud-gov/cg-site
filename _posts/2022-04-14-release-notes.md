---
layout: post
date: April 14th 2022
title: "April 14th cloud.gov Change Log"
excerpt: The cloud.gov team is working on providing change logs so everyone can see new features and updates.
---

Happy April! The cloud.gov team is working on providing change logs so everyone can see new features and updates. Highlights this month include Cloud Foundry Deployment and bug fixes.

# Change Log

## Customer Facing

---

### CF-Deployment - v19.0.0 up from v18.0.0

* Changes will be below broken up by component :)

### Java Buildpack - v4.48.1 up from v4.48

It primarily bumps Apache Tomcat and Geode Tomcat session store, the latter of which fixes a critical NullPointerException bug.

## Platform Changes

---

### Credhub Release - v2.12.4 up from v2.12.1

Security Fixes
* Bump various dependencies.

### CF-CLI Release - v1.38.0 up from v1.37.0
This release contains the following versions of the CF CLI

Major version	Prior version	Current version
v8	8.1.0	8.3.0
v7	7.4.0	7.4.0
v6	6.53.0	6.53.0

### CFLinuxfs3 - v0.276.0 up from v0.274.0

USN-5320-1 USN-5320-1: Expat vulnerabilities and regression:

* CVE-2022-25236: xmlparse.c in Expat (aka libexpat) before 2.4.5 allows attackers to insert namespace-separator characters into namespace URIs.
* CVE-2022-25313: In Expat (aka libexpat) before 2.4.5, an attacker can trigger stack exhaustion in build_model via a large nesting depth in the DTD element.
* CVE-2022-25314: In Expat (aka libexpat) before 2.4.5, there is an integer overflow in copyString.
* CVE-2022-25315: In Expat (aka libexpat) before 2.4.5, there is an integer overflow in storeRawNames.
* CVE-2022-25236: xmlparse.c in Expat (aka libexpat) before 2.4.5 allows attackers to insert namespace-separator characters into namespace URIs.
* CVE-2022-25314: In Expat (aka libexpat) before 2.4.5, there is an integer overflow in copyString.
* CVE-2022-25315: In Expat (aka libexpat) before 2.4.5, there is an integer overflow in storeRawNames.
* CVE-2022-25313: In Expat (aka libexpat) before 2.4.5, an attacker can trigger stack exhaustion in build_model via a large nesting depth in the DTD element.
* https://launchpad.net/bugs/1963903: expat relax fix for CVE-2022-25236 and possible regressions

### Diego Release - v2.61.0 up from v2.59.0

* Addresses CVE-2022-23806 and CVE-2022-23772 by bumping golang package to include go 1.17.8, (#614)

### Garden-runc - v1.20.1 up from v1.20.0

* Addresses CVE-2022-23806 and CVE-2022-23772 by bumping golang package to include go 1.17.8, b953993

### Log-cache - v2.11.6 up from v2.11.5

* fix bug with large messages (#58)
* Pin Go back to go1.17.
Go 1.18 includes changes to memory management and we'd like to get more familiarity with these changes and their impact before bumping.

### Routing Release - v0.231.0 up from v0.229.0

Feature

* update gorouter for prometheus scraping by @Benjamintf1 in #258

Bug Fix

* Invalid seeded router group manifest values should no longer cause breaking changes by default by @ameowlia in #261
* Removed the x509ignoreCN property. Now that gorouter is built on golang 1.17, it no longer has any effect on gorouter behavior, and was only adding to confusion in the properties
* Resolve an issue with route-registrar using the same TTL as it's RegistrationInterval for tcp routes, leading to unnecessary churn of pruned + re-registered routes.
* Resolve an issue with Routing API where upserts to tcp routes were causing change events to be emitted when the only change was a bump in TTL. This led to an issue where tcp-router was constantly reloading haproxy with every route's heartbeat registration call.

### Shibboleth - v92 up from v88

* Java updates
* Tomcat updates

### UAA Customized - v46 up from v44

* Bug fixes for rendering of CSS


