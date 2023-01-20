---
layout: post
date: January 19th 2022
title: "January 19th cloud.gov Change Log"
excerpt: The cloud.gov team is working on providing change logs so everyone can see new features and updates.
---

Happy New Year! The cloud.gov team is working on providing change logs so everyone can see new features and updates. Highlights this time include platform changes.

# Change Log

## Platform Changes

---

### Loggregator
Rolled back Loggregator to fix issue with application logs not showing up in the dashboard

### cf-networking - v3.18.0 up from v3.17.0

* Enable http-based healthchecking for bosh-dns-adapter

### cflinuxfs3 - v0.348.0 up from v0.346.0

Notably, this release addresses:

USN-5788-1 USN-5788-1: curl vulnerabilities:

* CVE-2022-43551: A vulnerability exists in curl <7.87.0 HSTS check that could be bypassed to trick it to keep using HTTP. Using its HSTS support, curl can be instructed to use HTTPS instead of using an insecure clear-text HTTP step even when HTTP is provided in the URL. However, the HSTS mechanism could be bypassed if the host name in the given URL first uses IDN characters that get replaced to ASCII counterparts as part of the IDN conversion. Like using the character UTF-8 U+3002 (IDEOGRAPHIC FULL STOP) instead of the common ASCII full stop (U+002E) .. Then in a subsequent request, it does not detect the HSTS state and makes a clear text transfer. Because it would store the info IDN encoded but look for it IDN decoded.

* CVE-2022-43552: HTTP Proxy deny use-after-free CVE-2022-43551: A vulnerability exists in curl <7.87.0 HSTS check that could be bypassed to trick it to keep using HTTP. Using its HSTS support, curl can be instructed to use HTTPS instead of using an insecure clear-text HTTP step even when HTTP is provided in the URL. However, the HSTS mechanism could be bypassed if the host name in the given URL first uses IDN characters that get replaced to ASCII counterparts as part of the IDN conversion. Like using the character UTF-8 U+3002 (IDEOGRAPHIC FULL STOP) instead of the common ASCII full stop (U+002E) .. Then in a subsequent request, it does not detect the HSTS state and makes a clear text transfer. Because it would store the info IDN encoded but look for it IDN decoded.

* CVE-2022-43552: HTTP Proxy deny use-after-free

### Loggregator-agent - v7.0.0 up from v6.5.6

* Allow application developers to set client certs and keys, as well as server cas, to be used for authentication in syslog-tls drains by @fhambrec, @dark5un in #177 / #119. Breaking change: requires new version of capi
* Add drain scope and url tags to syslog egress metrics by @skaur20 in #123, Breaking change: might effect metrics dashboards and calculations.

### Prometheus - v27.2.1 up from v27.1.0

* Bump Alertmanager to 0.25.0
* Bump Grafana to 8.5.15
* Fix issues with cadvisor cannot be compiled (thx @psycofdj )

Upgrades

* blackbox_exporter to 0.23.0
* cadivsor to 0.46.0
* consul_exporter to 0.9.0
* credhub_exporter to 0.18.0
* elasticsearch_exporter to 1.5.0
* grafana to v7.5.17
* graphite_exporter to 0.13.1
* haproxy_exporter to 0.14.0
* influxdb_exporter to 0.11.1
* prometheus to v2.41.0
* pushgateway to 1.5.1
* statsd_exporter to 0.23.0

### Routing - v0.253.0 up from v0.252.0

* Specs to make maxRetries configurable for endpoints and route-services by @domdom82 in #298


