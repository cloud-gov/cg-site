---
layout: post
date: October 29, 2021
title: "October 29th Cloud.gov Change Log" 
excerpt: The Cloud.gov team is working on providing change logs so everyone can see new features and updates.
---

# Change Log
## Customer Facing
---

There were no customer-facing changes this sprint.

## Platform Changes
---

### AIDE -- 16 up from 15

* Remove post-deployment report from AIDE post-deploy to reduce false-alarms caused by timing issues

### FISMA -- 57 up from 54

* disable rsync explicitly - previously, rsync ran based on a condition that would never be true
* remove dangling systemd-timesyncd files
* update IPv6 rules
* other minor updates

### Logsearch - 211.1.38 up from 211.1.26

* add acceptance test validating the number of recently-indexed logs

### Secureproxy - 52 up from 51

* change nginx client_temp_path to a more appropriate location

### Shibboleth - 82 up from 70

* upgrade tomcat to 8.5.65
* upgrade shibboleth to 3.4.8
* upgrade TOTP plugin
