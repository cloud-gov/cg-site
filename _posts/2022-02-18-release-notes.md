---
layout: post
date: February 17, 2022
title: "February 18th cloud.gov Change Log"
excerpt: The cloud.gov team is working on providing change logs so everyone can see new features and updates.
---

The cloud.gov team is working on providing change logs so everyone can see new features and updates. Highlights this month include changes to several of the platform buildpacks.

# Change Log

## Customer Facing

---

### Stratos - v4.4.0 from v3

* newest version of the cloud.gov dashboard
* improved look and feel
* improved browser compatibility
* new deploy from UI functionality

## Platform Changes

---

### Logsearch - 211.1.61 from 211.1.55

* minor changes

### Prometheus - 27.0.0 from 26.6.0

* for credhub exporter the spec credhub_exporter.log_format has been renamed to credhub_exporter.log_stream
* adds support for stemcell jammy jellyfish
* consul_exporter to v0.8.0
* credhub_exporter to 0.5.1 - Thx @psycofdj
* flant-statusmap-panel to v0.4.2- Thx @romain-dartigues
* grafana to v7.5.15
* prometheus to v2.33.3
* redis_exporter to v1.35.1
* stackdriver_exporter to v0.12.0

### Shibboleth - 88 from 86

* update for vendoring JDK

### Bosh DNS 1.31.0 from 1.30.0

* Update golang to 1.17

### UAA - 75.15.0 from 75.14.0

* Update to UAA v75.15.0
* Add group mapping mode AS_SCOPES for OIDC IdPs (cloudfoundry/uaa#1737)
* Spring Boot Major Upgrade 2.4.13 to 2.6.3 (cloudfoundry/uaa#1725) (cloudfoundry/uaa#1779)
* Junit tests fix (cloudfoundry/uaa#1764)
* Retry in junit run (cloudfoundry/uaa#1773)
* Simplify HTTP method matching (cloudfoundry/uaa#1789)
* XercesImpl update 2.12.2 (cloudfoundry/uaa#1786), see CVE
* Spring Boot 2.6.3 (cloudfoundry/uaa#1725) (cloudfoundry/uaa#1779) , see changelog
* Spring Framework 5.3.15
* Tomcat 9.0.58, see Security Fixes
* Upgrade Bellsoft JDK to version 11.0.14+9
* Gradle 6.9.2
* ThymeleafVersion 3.0.15 (cloudfoundry/uaa#1787)
