---
layout: post
date: March 4th 2022
title: "March 4th cloud.gov Change Log"
excerpt: The cloud.gov team is working on providing change logs so everyone can see new features and updates.
---

Happy Women's History Month! The cloud.gov team is working on providing change logs so everyone can see new features and updates. Highlights this month include Cloud Foundry Deployment and AWS RDS Broker updates.

# Change Log

## Customer Facing

---

### CF-Deployment - v18.0.0 up from v17.1.0

* Changes will be below broken up by component :)

### AWS Broker (RDS)

* Users can now set backup retention periods. Maximum period is 35 days and Default/Minimum is 14 days. 
* More Info here: https://cloud.gov/docs/services/relational-database/#setting-optional-parameters

### Dot Net Core Buildpack - v2.3.39 up from v2.3.37

* Add .NET Core 6 support
* Add dotnet-sdk 5.0.405
* Add dotnet-aspnetcore 6.0.2
* Add dotnet-sdk 6.0.102
* Add dotnet-aspnetcore 5.0.14
* Add dotnet-runtime 6.0.2
* Add dotnet-runtime 5.0.14
* Remove node 14.x.x
* Add node 16.14.0

Remove old .NET runtimes and SDKs
  * dotnet-sdk 3.1.412, 3.1.413, 3.1.414
  * dotnet-sdk 5.0.400, 5.0.401, 5.0.402
  * dotnet-runtime 3.1.18, 3.1.19, 3.1.20
  * dotnet-runtime 5.0.9, 5.0.10, 5.0.11
  * dotnet-aspnetcore 3.1.18, 3.1.19, 3.1.20
  * dotnet-aspnetcore 5.0.9, 5.0.10, 5.0.11

### Go Buildpack - v1.9.39 up from v1.9.38

* Add go 1.17.6, remove go 1.17.4
* Add go 1.16.13, remove go 1.16.11
* Update libbuildpack
* Test fixtures: Update ruby app

### Nginx Buildpack - v1.1.35 up from v1.1.33

* Add nginx 1.21.6, remove nginx 1.21.5
* Bump github.com/onsi/gomega to 1.18.1

### NodeJS Buildpack - v1.7.67 up from v1.7.65

* Add node 12.22.10, remove node 12.22.8
* Add node 12.22.9, remove node 12.22.7
* Add node 14.19.0, remove node 14.18.1
* Add node 16.14.0, remove node 16.13.0

### Python Buildpack - v1.7.49 up from v1.7.48

* Add setuptools 60.2.0, remove setuptools 59.5.0

### R Buildpack - v1.1.26 up from v1.1.25

* Rebuild r 4.1.2
for stack(s) cflinuxfs3
with dependencies for stack cflinuxfs3: forecast 8.16, plumber 1.1.0, rserve 1.8.10, shiny 1.7.1
(https://www.pivotaltracker.com/story/show/180851850)

* Rebuild r 3.6.3
for stack(s) cflinuxfs3
with dependencies for stack cflinuxfs3: forecast 8.16, plumber 1.1.0, rserve 1.8.10, shiny 1.7.1
(https://www.pivotaltracker.com/story/show/180851852)

* Update libbuildpack

### Staticfile Buildpack - v1.5.29 up from v1.5.27

* Add nginx 1.21.6, remove nginx 1.21.5


## Platform Changes

---

### BPM Release - v1.1.16 up from v1.1.15

* Updated to runc v1.10.0

### CAPI Release - v1.126.0 up from v1.123.0
CAPI Release
* #215 Put libpq/bin directory on PATH

Cloud Controller
* cloudfoundry/cloud_controller_ng#2594 Document that v3 Route host can be a wildcard (*)
* cloudfoundry/cloud_controller_ng#2595 Add sequel_pg gem
* cloudfoundry/cloud_controller_ng#2601 app/models/runtime/role.rb defines SPACE_OR_ORGANIZATION_NOT_SPECIFIED
* cloudfoundry/cloud_controller_ng#2652: Create wrappers for regexes instead of singleton * methods
* cloudfoundry/cloud_controller_ng#2638: /v3/domains performance improvements
* cloudfoundry/cloud_controller_ng#2636: Do not delete bindings in case of bind errors during * apply_manifest, treat failed key creation and failed bindings as non-existent
* cloudfoundry/cloud_controller_ng#2628: Remove errant experimental tags from v3 docs
* cloudfoundry/cloud_controller_ng#2598: Upgrade to rails 6.1
* cloudfoundry/cloud_controller_ng#2624: /v3/security_groups and /v3/space_quotas performance * improvements
* cloudfoundry/cloud_controller_ng@bc031e2: Improve error raised when service broker update * fails sequel validation check
* cloudfoundry/cloud_controller_ng#2581: Use subquery for window function (distinct queries)
* cloudfoundry/cloud_controller_ng#2657 Throw an error on sb bind when in binding status is * delete_failed or delete_in_progess
* cloudfoundry/cloud_controller_ng#2664 Improve performance when roles are queried by admin * user
* cloudfoundry/cloud_controller_ng#2670 Don't filter out quota metrics

Dependency Bumps
* express from 4.17.1 to 4.17.2 cloudfoundry/cloud_controller_ng#2600
* honeycomb-beeline from 2.7.1 to 2.8.0 cloudfoundry/cloud_controller_ng#2605
* bump urijs from 1.19.6 to 1.19.7 in /docs/v3
* bump path-parse from 1.0.6 to 1.0.7 in /docs/v3
* bump hosted-git-info from 2.8.8 to 2.8.9 in /docs/v3
* bump sequel from 5.51.0 to 5.53.0
* bump pg from 1.2.3 to 1.3.1
* bump cf-uaa-lib from 3.14.3 to 4.0.1
* bump sinatra from 2.0.8.1 to 2.1.0
* bump i18n to version 1.9.1
* bump newrelic_rpm from 8.2.0 to 8.4.0
* bump fog-local from 0.6.0 to 0.8.0
* bump multi_json from 1.12.2 to 1.15.0
* bump nokogiri from 1.12.5 to 1.13.1
* bump listen from 3.7.0 to 3.7.1
* bump honeycomb-beeline from 2.8.0 to 2.8.1
* bump oj from 3.13.10 to 3.13.11 (#2613)
* bump google-protobuf from 3.17.3 to 3.19.2
* bump spring from 3.1.1 to 4.0.0
* Bump Golang from 1.17.6 to 1.17.7
* Bump rspec from 3.10.0 to 3.11.0
* Bump lodash from 4.17.19 to 4.17.21 in /docs/v3
* Bump copy-props from 2.0.4 to 2.0.5 in /docs/v3

BBS
* cloudfoundry/bbs@f246cdd Update LRP instance when internal routes were changed
* cloudfoundry/bbs@83003cf Update readme with latest steps to generate ruby protobuf files
* cloudfoundry/bbs@e56feb1 Fix instructions for building ruby protobuf files* 

### CF Networking Release - v3.0.0 up from v2.42.0

Release Highlights
* ✨ [New Feature] cf-networking + silk-release now support dynamically updating ASG data for app containers without needing a restart! 
* A new job policy-server-asg-syncer queries CAPI for ASG data periodically and updates the policy-server database
* A new endpoint on policy-server-internal is exposed to allow vxlan-policy-agent to query for ASG data
* When disabled, everything behaves as it did previously.  - To disable, set the disable property of policy-server-asg-syncer to true
* 🐛 [Bug Fix] The log-level parameter for policy-server, and policy-server-internal is now propagated from bosh release to agent properly.

Compatibility Notes
* It is recommended to use this in conjunction with capi-release v1.126.0 or later for improved performance on the /v3/security_groups APIs.
* Tested with silk-release v3.0.0

### cflinuxfs3 - 0.274.0 up from 0.270.0

USN-5199-1 USN-5199-1: Python vulnerabilities:
* CVE-2021-3733: [Denial of service when identifying crafted invalid RFCs]
* CVE-2021-3737: [client can enter an infinite loop on a 100 Continue response from the server]
* CVE-2021-3737: [client can enter an infinite loop on a 100 Continue response from the server]
* CVE-2021-3733: [Denial of service when identifying crafted invalid RFCs]

USN-5235-1 USN-5235-1: Ruby vulnerabilities:

* CVE-2021-41816: [Buffer Overrun in CGI.escape_html]
* CVE-2021-41817: Date.parse in the date gem through 3.2.0 for Ruby allows ReDoS (regular * expression Denial of Service) via a long string. The fixed versions are 3.2.1, 3.1.2, 3.0.2, * and 2.0.1.
* CVE-2021-41819: CGI::Cookie.parse in Ruby through 2.6.8 mishandles security prefixes in * cookie names. This also affects the CGI gem through 0.3.0 for Ruby.
* CVE-2021-41816: [Buffer Overrun in CGI.escape_html]
* CVE-2021-41819: CGI::Cookie.parse in Ruby through 2.6.8 mishandles security prefixes in * cookie names. This also affects the CGI gem through 0.3.0 for Ruby.
* CVE-2021-41817: Date.parse in the date gem through 3.2.0 for Ruby allows ReDoS (regular expression Denial of Service) via a long string. The fixed versions are 3.2.1, 3.1.2, 3.0.2, and 2.0.1.

USN-5254-1 USN-5254-1: shadow vulnerabilities:

* CVE-2017-12424: In shadow before 4.5, the newusers tool could be made to manipulate internal data structures in ways unintended by the authors. Malformed input may lead to crashes (with a buffer overflow or other memory corruption) or other unspecified behaviors. This crosses a privilege boundary in, for example, certain web-hosting environments in which a Control Panel allows an unprivileged user account to create subaccounts.
* CVE-2018-7169: An issue was discovered in shadow 4.5. newgidmap (in shadow-utils) is setuid and allows an unprivileged user to be placed in a user namespace where setgroups(2) is permitted. This allows an attacker to remove themselves from a supplementary group, which may allow access to certain filesystem paths if the administrator has used "group blacklisting" (e.g., chmod g-rwx) to restrict access to paths. This flaw effectively reverts a security feature in the kernel (in particular, the /proc/self/setgroups knob) to prevent this sort of privilege escalation.
* CVE-2018-7169: An issue was discovered in shadow 4.5. newgidmap (in shadow-utils) is setuid and allows an unprivileged user to be placed in a user namespace where setgroups(2) is permitted. This allows an attacker to remove themselves from a supplementary group, which may allow access to certain filesystem paths if the administrator has used "group blacklisting" (e.g., chmod g-rwx) to restrict access to paths. This flaw effectively reverts a security feature in the kernel (in particular, the /proc/self/setgroups knob) to prevent this sort of privilege escalation.
* CVE-2017-12424: In shadow before 4.5, the newusers tool could be made to manipulate internal data structures in ways unintended by the authors. Malformed input may lead to crashes (with a buffer overflow or other memory corruption) or other unspecified behaviors. This crosses a privilege boundary in, for example, certain web-hosting environments in which a Control Panel allows an unprivileged user account to create subaccounts.

USN-5288-1 USN-5288-1: Expat vulnerabilities:

* CVE-2022-22823: build_model in xmlparse.c in Expat (aka libexpat) before 2.4.3 has an integer overflow.
* CVE-2021-45960: In Expat (aka libexpat) before 2.4.3, a left shift by 29 (or more) places in the storeAtts function in xmlparse.c can lead to realloc misbehavior (e.g., allocating too few bytes, or only freeing memory).
* CVE-2022-25235: xmltok_impl.c in Expat (aka libexpat) before 2.4.5 lacks certain validation of encoding, such as checks for whether a UTF-8 character is valid in a certain context.
* CVE-2022-25236: xmlparse.c in Expat (aka libexpat) before 2.4.5 allows attackers to insert namespace-separator characters into namespace URIs.
* CVE-2022-22825: lookup in xmlparse.c in Expat (aka libexpat) before 2.4.3 has an integer overflow.
* CVE-2022-22827: storeAtts in xmlparse.c in Expat (aka libexpat) before 2.4.3 has an integer overflow.
* CVE-2022-22826: nextScaffoldPart in xmlparse.c in Expat (aka libexpat) before 2.4.3 has an integer overflow.
* CVE-2021-46143: In doProlog in xmlparse.c in Expat (aka libexpat) before 2.4.3, an integer overflow exists for m_groupSize.
* CVE-2022-23990: Expat (aka libexpat) before 2.4.4 has an integer overflow in the doProlog function.
* CVE-2022-22824: defineAttribute in xmlparse.c in Expat (aka libexpat) before 2.4.3 has an integer overflow.
* CVE-2022-23852: Expat (aka libexpat) before 2.4.4 has a signed integer overflow in XML_GetBuffer, for configurations with a nonzero XML_CONTEXT_BYTES.
* CVE-2022-22822: addBinding in xmlparse.c in Expat (aka libexpat) before 2.4.3 has an integer overflow.

### Credhub Release - 2.12.0 up from 2.11.2

Security Fixes
* Bump various dependencies.

Bug Fixes
* Fixes an issue where CredHub experiences downtime during certificate rotation process by making CredHub properly load concatenated mTLS CA certificates.

Features
* CredHub is now compatible with Postgres 13, 14.

### Diego Release - v2.59.0 up from v2.55.0

Changes
* C2C certificate is regenerated when internal routes are updated (#588)
* Addresses CVE-2021-43816 by bumping containerd to v1.5.9 @jrussett (#612)
* Route emitter's healthcheck_address no longer accepts leading zeros @ameowlia @geofffranks (#616)
* Deprecate start and evacuate_running endpoints @moleske (#617)
* Ensure containers can eventually communicate over TLS using application internal route even if synchronous communication fails

### Loggregator Agent Release - v6.3.8 up from v6.3.6

* Fix counter aggregation (#75)
  * Forwarder agent respects source-IDs for counter aggregation
  * treat delta 0 total 0 metrics as total metrics instead of delta
* skip config files with invalid ports
  * allows optionally configuring prom scraping for releases
* bump-golang to v0.95.0

### Metrics Discovery Release - v3.0.8 up from v3.0.7

* skip config files with invalid ports
  * allows optionally configuring prom scraping for releases
* update go-loggregator

### Nats Release - v43 up from v40

Release Highlight
* Optionally exclude password authentication for nats-tls. Thank you @domdom82 for submitting this PR!
* 🐛 Bug-Fix: A new healthcheck for the nats-tls job alleviates the constant stream of log messages caused by incomplete TLS handshakes from health checks (fixes #32). Thank you @peterellisjones for the PR!
  * ⚠️ This requires two new properties to be provided to allow the health check to access nats via TLS, listed below.
* Improvement: Operators are now able to set nats.net and nats.cluster_host to adjust the listening address of the nats and nats-tls jobs for use in multi-homed environments. Thanks @psycofdj!
* Bug Fix: Operators can force-disable nats authentication via the nats.auth_required property, rather than removing credentials. This helps alleviate Authorization Violation errors seen in cases such as routing-release #259. Thanks @b1tamara and @Mrizwanshaik!

### Routing Release - 0.229.0 up from 0.228.0

* ➕ Improvement: Request URLs are now included in Gorouter's route-service-connection-failed log messages. Thanks for the improvement @plowin! 🎉
* ➕ Improvement: Gorouter's endpoint_dial_timeout is now configurable. It affects the time to establish a TCP connection with backends (http or websocket), but prior to any TLS negotiation.
* 🐛 Bug Fix: A bug in Gorouter was resolved that caused incorrect counts when calculating backend-connection limits for app endpoints
* 🐛 Bug Fix: Gorouter now honors the router.min_tls_version and router.max_tls_version properties when making requests to route-services
* 🐛 Bug Fix: Resolves an issue introduced in routing-release v0.227.0 where the b3_spanid header was incorrectly being set to 16 bytes. It now is set to 8-bytes. Thanks @stijnvet for the fix! 🎉

### Silk Release - 2.43.0 up from 2.42.0
* Bump to golang 1.17!
* Tested with cf-networking-release v2.43.0
* [Breaking] Added template tests to validate IPs do not contain leading zeros per golang 1.17's new IP parsing standards

### Statsd Injector Release - v1.11.18 up from v1.11.17

* bump-golang to v0.94.0(1.17.5)
