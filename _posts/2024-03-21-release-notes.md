---
layout: post
date: March 21st 2024
title: March 21st cloud.gov Change Log
excerpt: The cloud.gov team is working on providing change logs so everyone can see new features and updates.
---

# Change Log 

## Before digging into the changes...

* Reminder: Please contact support@cloud.gov to schedule your RDS upgrades if you have not already done so. 
* The default amount of memory for staging applications has been increased from 1GB to 2GB to attempt to mitigate staging OOM issues.   Once we verify the recently deployed stemcells with the fix, we will be dropping it back down to 1 GB during upgrades next week. 
* As mentioned above there is a fix for the Out of Memory issue, which is live in production. The release 1.404 contains this fix: 
	
    >  The linux kernel has been changed from the HWE line of kernels back to the LTS line of kernels. Changing from the current 6.5 to 5.15. This is an attempt to mitigate [issue 318](https://github.com/cloudfoundry/bosh-linux-stemcell-builder/issues/318) where we see cgroups with memory limits hitting OOM errors when they previously did not under the 6.2 kernel versions


## Customer Facing Changes
---

The audience for this section is developers who maintain applications on cloud.gov and may need to respond to stack or buildpack changes.

### CF-Deployment - v38.1.0 to v39.7.0

Changes below are broken down by component, note that `v39.7.0` was a stemcell update from `v1.404` to `v1.406` of the Jammy Stemcell, the rest listed below are for `v39.6.0`:

#### dotnet-core-buildpack 2.4.23 to 2.4.25

* Add dotnet-sdk 8.0.203, remove dotnet-sdk 8.0.202 ([#947](https://github.com/cloudfoundry/dotnet-core-buildpack/pull/947))
* Add dotnet-aspnetcore 6.0.28, remove dotnet-aspnetcore 6.0.27
* Add dotnet-runtime 6.0.28, remove dotnet-runtime 6.0.27 ([#940](https://github.com/cloudfoundry/dotnet-core-buildpack/pull/940))
* Add dotnet-sdk 6.0.420, remove dotnet-sdk 6.0.419 ([#939](https://github.com/cloudfoundry/dotnet-core-buildpack/pull/939))
* Add dotnet-aspnetcore 7.0.17, remove dotnet-aspnetcore 7.0.16 ([#942](https://github.com/cloudfoundry/dotnet-core-buildpack/pull/942))
* Add dotnet-runtime 7.0.17, remove dotnet-runtime 7.0.16 ([#945](https://github.com/cloudfoundry/dotnet-core-buildpack/pull/945))
* Add dotnet-sdk 7.0.407, remove dotnet-sdk 7.0.406 ([#941](https://github.com/cloudfoundry/dotnet-core-buildpack/pull/941))
* Add dotnet-aspnetcore 8.0.3, remove dotnet-aspnetcore 8.0.2 ([#937](https://github.com/cloudfoundry/dotnet-core-buildpack/pull/937))
* Add dotnet-runtime 8.0.3, remove dotnet-runtime 8.0.2 ([#943](https://github.com/cloudfoundry/dotnet-core-buildpack/pull/943))
* Add dotnet-sdk 8.0.202, remove dotnet-sdk 8.0.201 ([#938](https://github.com/cloudfoundry/dotnet-core-buildpack/pull/938))
* Add libunwind 1.8.1, remove libunwind 1.8.0 ([#925](https://github.com/cloudfoundry/dotnet-core-buildpack/pull/925))
* Add node 20.11.1, remove node 20.11.0  
* Add dotnet-sdk 8.0.201, remove dotnet-sdk 8.0.200  
* Add support for BP_OPENSSL_ACTIVATE_LEGACY_PROVIDER ([#921](https://github.com/cloudfoundry/dotnet-core-buildpack/pull/921)) 
* Enables the new environment variable will load and active the legacy openssl provider
* Remove `use_legacy_openssl` buildpack.yml setting in favour of the environment variable


Packaged binaries:

* bower 1.8.14
* dotnet-aspnetcore 6.0.27
* dotnet-aspnetcore 7.0.16
* dotnet-aspnetcore 8.0.2
* dotnet-runtime 6.0.27
* dotnet-runtime 7.0.16
* dotnet-runtime 8.0.2
* dotnet-sdk 6.0.419
* dotnet-sdk 7.0.406
* dotnet-sdk 8.0.201
* libgdiplus 6.1
* libunwind 1.8.1
* node 20.11.1

Default binary versions:

* dotnet-runtime 6.0.x
* dotnet-aspnetcore 6.0.x
* dotnet-sdk 6.0.x
* bower 1.8.x

#### go-buildpack 1.10.16 to 1.10.17

* Add go 1.22.1, remove go 1.22.0 
* Add go 1.21.8, remove go 1.21.7 
* Deprecate Go 1.20.x (EOL) ([#424](https://github.com/cloudfoundry/go-buildpack/pull/424))

Packaged binaries:

* dep 0.5.4
* glide 0.13.3
* go 1.21.8
* go 1.22.1
* godep 80

Default binary versions:

* go 1.21.x

#### java-buildpack 4.66.0 to 4.67.0
For a more detailed look at the changes in 4.67.0, please take a look at the [commit log](https://github.com/cloudfoundry/java-buildpack/compare/v4.66.0...v4.67.0). The packaged version of the buildpack, suitable for use with create-buildpack and update-buildpack, can be found attached to this release.

| Dependency                       | Version          | CVEs                                                                               | Release Notes                                                                                                                                |
| -------------------------------- | ---------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| AppDynamics Agent                | `24.2.0_35552`   |                                                                                    | 
| Azure Application Insights Agent | `3.5.0`          |                                                                                    | [Release Notes](https://github.com/Microsoft/ApplicationInsights-Java/releases)                                                              |
| CA Introscope APM Framework      | `24.2.1_7`       |                                                                                    |                                                                                                                                              |
| Client Certificate Mapper        | `2.0.1`          | Included inline above                                                              | Included inline above                                                                                                                        |
| Container Security Provider      | `1.20.0_RELEASE` | Included inline above                                                              | Included inline above                                                                                                                        |
| Contrast Security Agent          | `6.2.1`          |                                                                                    | [Release Notes](https://docs.contrastsecurity.com/en/java-agent-release-notes.html)                                                          |
| Datadog APM Javaagent            | `1.31.0`         |                                                                                    | [Release Notes](https://github.com/DataDog/dd-trace-java/releases)                                                                           |
| Elastic APM Agent                | `1.48.0`         |                                                                                    | [Release Notes](https://www.elastic.co/guide/en/apm/agent/java/current/release-notes.html)                                                   |
| Gemalto Luna Security Provider   | `7.4.0`          |                                                                                    | [Release Notes](https://www.thalesdocs.com/gphsm/luna/7/docs/network/Content/CRN/Luna/CRN_Luna.htm)                                          |
| Geode Tomcat Session Store       | `1.14.9`         |                                                                                    |                                                                                                                                              |
| Google Stackdriver Profiler      | `0.1.0`          |                                                                                    | [Release Notes](https://cloud.google.com/profiler/docs/release-notes)                                                                        |
| Groovy                           | `2.5.23`         |                                                                                    | [Release Notes](http://www.groovy-lang.org/releases.html)                                                                                    |
| JaCoCo Agent                     | `0.8.11`         |                                                                                    | [Release Notes](https://github.com/jacoco/jacoco/releases)                                                                                   |
| Java CFEnv                       | `3.1.5`          |                                                                                    | [Release Notes](https://github.com/pivotal-cf/java-cfenv/releases)                                                                           |
| Java Memory Assistant Agent      | `0.5.0`          |                                                                                    |                                                                                                                                              |
| Java Memory Assistant Clean Up   | `0.1.0`          |                                                                                    |                                                                                                                                              |
| JProfiler Profiler               | `13.0.7`         |                                                                                    | [ChangeLog](https://www.ej-technologies.com/download/jprofiler/changelog.html)                                                               |
| JRebel Agent                     | `2024.1.1`       |                                                                                    | [ChangeLog](https://www.jrebel.com/products/jrebel/changelog)                                                                                |
| jvmkill Agent                    | `1.17.0_RELEASE` | Included inline above                                                              | Included inline above                                                                                                                        |
| MariaDB JDBC Driver              | `2.7.9`          |                                                                                    | [Release Notes](https://mariadb.com/kb/en/mariadb-connector-j-2-7-9-release-notes/)                                                          |
| Memory Calculator                | `3.13.0_RELEASE` | Included inline above                                                              | Included inline above                                                                                                                        |
| Metric Writer                    | `3.5.0_RELEASE`  | Included inline above                                                              | Included inline above                                                                                                                        |
| New Relic Agent                  | `8.9.1`          |                                                                                    | [Release Notes](https://docs.newrelic.com/docs/release-notes/agent-release-notes/java-release-notes/)                                        |
| Open Telemetry Agent             | `2.1.0`          |                                                                                    | [Release Notes](https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases)                                               |
| OpenJDK JRE 11                   | `11.0.22_12`     | [Risk Matrix](https://www.oracle.com/security-alerts/cpujan2024.html#AppendixJAVA) | [Release Notes](https://docs.bell-sw.com/liberica-jdk/11.0.22b12/general/release-notes/)                                                     |
| OpenJDK JRE 17                   | `17.0.10_13`     | [Risk Matrix](https://www.oracle.com/security-alerts/cpujan2024.html#AppendixJAVA) | [Release Notes](https://docs.bell-sw.com/liberica-jdk/17.0.10b13/general/release-notes/)                                                     |
| OpenJDK JRE 21                   | `21.0.2_14`      | [Risk Matrix](https://www.oracle.com/security-alerts/cpujan2024.html#AppendixJAVA) | [Release Notes](https://docs.bell-sw.com/liberica-jdk/21.0.2b14/general/release-notes/)                                                      |
| OpenJDK JRE 8                    | `1.8.0_402`      | [Risk Matrix](https://www.oracle.com/security-alerts/cpujan2024.html#AppendixJAVA) | [Release Notes](https://docs.bell-sw.com/liberica-jdk/8u402b7/general/release-notes/)                                                        |
| PostgreSQL JDBC Driver           | `42.7.2`         |                                                                                    | [Release Notes](https://jdbc.postgresql.org/changelogs/2024-02-21-42.7.2-release/) |
| Redis Session Store              | `1.3.6_RELEASE`  | Included inline above                                                              | Included inline above                                                                                                                        |
| Riverbed Appinternals Agent      | `11.8.5_BL527`   |                                                                                    |                                                                                                                                              |
| SeaLights Agent                  | `4.0.2459`       |                                                                                    |                                                                                                                                              |
| SkyWalking                       | `8.16.0`         |                                                                                    | [ChangeLog](https://github.com/apache/skywalking/tree/master/changes)                                                                        |
| Splunk OpenTelemetry Java Agent  | `1.30.3`         |                                                                                    | [Release Notes](https://github.com/signalfx/splunk-otel-java/releases)                                                                       |
| Spring Auto-reconfiguration      | `2.12.0_RELEASE` | Included inline above                                                              | Included inline above                                                                                                                        |
| Spring Boot CLI                  | `2.7.18`         |                                                                                    |                                                                                                                                              |
| Spring Boot Container Customizer | `2.6.0_RELEASE`  | Included inline above                                                              | Included inline above                                                                                                                        |
| Takipi Agent                     | `4.73.3`         |                                                                                    | [Release Notes](https://doc.overops.com/docs/whats-new)                                                                                      |
| Tomcat                           | `9.0.86`         | [Security](https://tomcat.apache.org/security-9.html)                              | [ChangeLog](https://tomcat.apache.org/tomcat-9.0-doc/changelog.html)                                                                         |
| Tomcat Access Logging Support    | `3.4.0_RELEASE`  | Included inline above                                                              | Included inline above                                                                                                                        |
| Tomcat Lifecycle Support         | `3.4.0_RELEASE`  | Included inline above                                                              | Included inline above                                                                                                                        |
| Tomcat Logging Support           | `3.4.0_RELEASE`  | Included inline above                                                              | Included inline above                                                                                                                        |
| YourKit Profiler                 | `2023.9.109`     |                                                                                    | [Release Notes](https://www.yourkit.com/changes/2023.9/yjp_2023_9.jsp)                                                                      |


#### nginx-buildpack 1.2.11 to 1.2.12

* Add nginx 1.25.4, remove nginx 1.25.3 ([#267](https://github.com/cloudfoundry/nginx-buildpack/pull/267))  

Packaged binaries:

* nginx 1.24.0
* nginx 1.25.4
* openresty 1.21.4.2
* openresty 1.25.3.1

Default binary versions:

* nginx 1.25.x

#### php-buildpack 4.6.15 to 4.6.16

* Add php 8.2.16, remove php 8.2.14 

Packaged binaries:

* appdynamics 23.11.0-839
* composer 2.7.1
* httpd 2.4.58
* newrelic 10.11.0.3
* nginx 1.24.0
* nginx 1.25.4
* php 8.1.26
* php 8.1.27
* php 8.2.15
* php 8.2.16
* php 8.3.1
* php 8.3.3
* python 2.7.18
* ruby 3.0.5

Default binary versions:

* php 8.1.27
* httpd 2.4.58
* newrelic 10.11.0.3
* nginx 1.25.4
* composer 2.7.1


#### python-buildpack 1.8.20 to 1.8.21

* Add setuptools 69.1.1, remove setuptools 69.1.0 
* Add miniconda3-py39 24.1.2, remove miniconda3-py39 23.11.0 

Packaged binaries:

* libffi 3.2.1
* libmemcache 1.0.18
* miniconda3-py39 24.1.2
* pip 24.0
* pipenv 2023.12.1
* python 3.8.18
* python 3.9.18
* python 3.10.13
* python 3.11.8
* python 3.12.2
* setuptools 69.1.1

Default binary versions:

* python 3.10.x

#### r-buildpack 1.2.8 to 1.2.9

* Rebuild executables

Packaged binaries:

* r 3.6.3
* r 4.2.3
* r 4.3.2

#### ruby-buildpack 1.10.9 to 1.10.10

* Add jruby 9.4.6.0, remove jruby 9.4.5.0 ([#906](https://github.com/cloudfoundry/ruby-buildpack/pull/906))  
* Add node 20.11.1, remove node 20.11.0 ([#905](https://github.com/cloudfoundry/ruby-buildpack/pull/905))  

Packaged binaries:

* bundler 2.5.6
* jruby 9.4.6.0
* node 20.11.0
* openjdk1.8-latest 1.8.0
* ruby 3.1.3
* ruby 3.1.4
* ruby 3.2.2
* ruby 3.2.3
* ruby 3.3.0
* rubygems 3.5.6
* yarn 1.22.21

Default binary versions:

* ruby 3.2.x

#### staticfile-buildpack 1.6.10 to 1.6.11

* Add nginx 1.25.4, remove nginx 1.25.3 ([#408](https://github.com/cloudfoundry/staticfile-buildpack/pull/408))  

Packaged binaries:

* nginx 1.24.0
* nginx 1.25.4

Default binary versions:

* nginx 1.25.x

### CFLinuxfs4 - v1.82.0 up from v1.79.0 

Notably, this release addresses:
* [USN-6694-1](https://ubuntu.com/security/notices/USN-6694-1) Expat vulnerabilities:
   * [CVE-2024-28757](https://ubuntu.com/security/CVE-2024-28757):  libexpat through 2.6.1 allows an XML Entity Expansion attack when there is isolated use of external parsers (created via XML_ExternalEntityParserCreate).
   * [CVE-2023-52425](https://ubuntu.com/security/CVE-2023-52425):  libexpat through 2.5.0 allows a denial of service (resource consumption) because many full reparsings are required in the case of a large token for which multiple buffer fills are needed.

* [USN-6677-1](https://ubuntu.com/security/notices/USN-6677-1) libde265 vulnerabilities:

   * [CVE-2023-49468](https://ubuntu.com/security/CVE-2023-49468): Libde265 v1.0.14 was discovered to contain a global buffer overflow vulnerability in the read_coding_unit function at slice.cc.
   * [CVE-2023-49465](https://ubuntu.com/security/CVE-2023-49465): Libde265 v1.0.14 was discovered to contain a heap-buffer-overflow vulnerability in the derive_spatial_luma_vector_prediction function at motion.cc.
   * [CVE-2023-27102](https://ubuntu.com/security/CVE-2023-27102): Libde265 v1.0.11 was discovered to contain a segmentation violation via the function decoder_context::process_slice_segment_header at decctx.cc.
   * [CVE-2023-49467](https://ubuntu.com/security/CVE-2023-49467): Libde265 v1.0.14 was discovered to contain a heap-buffer-overflow vulnerability in the derive_combined_bipredictive_merging_candidates function at motion.cc.
   * [CVE-2023-27103](https://ubuntu.com/security/CVE-2023-27103): Libde265 v1.0.11 was discovered to contain a heap buffer overflow via the function derive_collocated_motion_vectors at motion.cc.
   * [CVE-2023-47471](https://ubuntu.com/security/CVE-2023-47471): Buffer Overflow vulnerability in strukturag libde265 v1.10.12 allows a local attacker to cause a denial of service via the slice_segment_header function in the slice.cc component.
   * [CVE-2023-43887](https://ubuntu.com/security/CVE-2023-43887): Libde265 v1.0.12 was discovered to contain multiple buffer overflows via the num_tile_columns and num_tile_row parameters in the function pic_parameter_set::dump.

## Platform Changes
---

This section is for the platform operators at `cloud.gov` to highlight changes to Cloud Foundry components, this is likely not of interest for developers using the platform.

### bpm 1.2.16 to 1.2.17

* Updates golang package golang-1-linux to 1.22.1


### CAPI v1.173.0 to v1.175.0

#### Cloud Controller
* Expose process CPU Entitlement in stats ([cloudfoundry/cloud_controller_ng#3641](https://github.com/cloudfoundry/cloud_controller_ng/pull/3641))

* Dependency Bumps
   * bump webmock from 3.21.2 to 3.23.0 ([cloudfoundry/cloud_controller_ng#3649](https://github.com/cloudfoundry/cloud_controller_ng/pull/3649), [cloudfoundry/cloud_controller_ng#3654](https://github.com/cloudfoundry/cloud_controller_ng/pull/3654))
   * bump listen from 3.8.0 to 3.9.0 ([cloudfoundry/cloud_controller_ng#3653](https://github.com/cloudfoundry/cloud_controller_ng/pull/3653))
   * bump googleapis-common-protos from 1.4.0 to 1.5.0 ([cloudfoundry/cloud_controller_ng#3655](https://github.com/cloudfoundry/cloud_controller_ng/pull/3655))

Cloud Controller Database Migrations
   * [20240222131500_change_delayed_jobs_reserve_index.rb](https://github.com/sap-contributions/cloud_controller_ng/blob/a6febf66cf9cf7c86b27b917df9b111b874b6972/db/migrations/20240222131500_change_delayed_jobs_reserve_index.rb)
   * [20240219113000_add_routes_space_id_index.rb](https://github.com/sap-contributions/cloud_controller_ng/blob/a6febf66cf9cf7c86b27b917df9b111b874b6972/db/migrations/20240219113000_add_routes_space_id_index.rb)

#### log-cache 3.0.10 to 3.0.11

* Bump dependencies
* Bump packaged Golang to go 1.21.8

#### loggregator-agent 7.7.5 to 8.0.2

* Bump dependencies
* Bump to [go1.21.8](https://groups.google.com/g/golang-announce/c/5pwGVUPoMbg/m/46oA5yPABQAJ)


### routing 0.292.0 to 0.293.0

* [Add toggle to allow empty Content-Length headers](https://github.com/cloudfoundry/routing-release/commit/7f8762673e3b7dd564dc368855d053bd3703f895)
* [fix: Enable syslog forwarding for gorouter](https://github.com/cloudfoundry/routing-release/commit/550c9b2271154c620b43f65037d6558a0437ae9f)
* [fix: Don't retry more often than endpoints available](https://github.com/cloudfoundry/routing-release/commit/112f971405f85990f79509812afacec67771a5a2)
* [Add an option to enable concurrent reads and responses in HTTP/1](https://github.com/cloudfoundry/routing-release/commit/be5ea2fb059574f213b8d0739b0ce0f78be68bdb)

### statsd-injector 1.11.38 to 1.11.39

* Bump dependencies
* Bump to [go1.21.8](https://groups.google.com/g/golang-announce/c/5pwGVUPoMbg/m/46oA5yPABQAJ)

### syslog 11.8.17 to 12.2.3

* Bump dependencies
* Bump packaged Golang to go1.21.8


### uaa 77.1.0 to 77.2.0

* Bump to [UAA v77.2.0](https://github.com/cloudfoundry/uaa/releases/tag/v77.2.0)

#### Misc

* doc: clarify use of multiple URLs in uaa.ldap.url by [@peterhaochen47](https://github.com/peterhaochen47) in [#810](https://github.com/cloudfoundry/uaa-release/pull/810)
* Revert "remove: gomega github ignore removed" by [@hsinn0](https://github.com/hsinn0) in [#811](https://github.com/cloudfoundry/uaa-release/pull/811)

#### Dependency Bumps

* Bump rspec-support from 3.13.0 to 3.13.1 by [@dependabot](https://github.com/dependabot) in [#809](https://github.com/cloudfoundry/uaa-release/pull/809)
* Bump drb from 2.2.0 to 2.2.1 by [@dependabot](https://github.com/dependabot) in [#812](https://github.com/cloudfoundry/uaa-release/pull/812)
* Bump github.com/cloudfoundry/bosh-utils from 0.0.446 to 0.0.447 in /src/acceptance_tests by [@dependabot](https://github.com/dependabot) in [#814](https://github.com/cloudfoundry/uaa-release/pull/814)
* Bump github.com/cloudfoundry/bosh-utils from 0.0.447 to 0.0.448 in /src/acceptance_tests by [@dependabot](https://github.com/dependabot) in [#817](https://github.com/cloudfoundry/uaa-release/pull/817)
* Bump i18n from 1.14.1 to 1.14.3 by [@dependabot](https://github.com/dependabot) in [#816](https://github.com/cloudfoundry/uaa-release/pull/816)
* Bump github.com/cloudfoundry/bosh-utils from 0.0.448 to 0.0.449 in /src/acceptance_tests by [@dependabot](https://github.com/dependabot) in [#819](https://github.com/cloudfoundry/uaa-release/pull/819)
* Bump i18n from 1.14.3 to 1.14.4 by [@dependabot](https://github.com/dependabot) in [#820](https://github.com/cloudfoundry/uaa-release/pull/820)


#### Known Issues

* During the upgrade to this version from UAA v76 or below with canary deployment (where briefly both new and old UAA servers could be running), UAA delete user endpoint might respond with an error even though the user deletion is successful. Mitigation: Delete users after the canary deployment finishes. But if you do run into this issue, you can ignore the error and check whether the user has been successfully deleted after the canary deployment finishes.

**Full UAA Changelog**: [v77.1.0...v77.2.0](https://github.com/cloudfoundry/uaa-release/compare/v77.1.0...v77.2.0)


## Final Note

Tune in next sprint for new release notes!