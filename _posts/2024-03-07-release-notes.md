---
layout: post
date: March 7th 2024
title: "March 7th cloud.gov Change Log"
excerpt: The cloud.gov team is working on providing change logs so everyone can see new features and updates.
---

# Change Log 

## Before digging into the changes...

* Reminder: Please contact support@cloud.gov to schedule your RDS upgrades if you have not already done so.

## Customer Facing Changes
---

The audience for this section is developers who maintain applications on cloud.gov and may need to respond to stack or buildpack changes.

### CF-Deployment - v38.1.0 to v39.3.0

Changes below are broken down by component:


### dotnet-core-buildpack 2.4.23 to 2.4.24

* Add dotnet-sdk 8.0.201, remove dotnet-sdk 8.0.200
* Add node 20.11.1, remove node 20.11.0
* Add support for BP_OPENSSL_ACTIVATE_LEGACY_PROVIDER, enables the new environment variable will load and active the legacy openssl provider
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
* dotnet-sdk 8.0.200
* libgdiplus 6.1
* libunwind 1.8.0
* node 20.11.1

Default binary versions:

* dotnet-runtime 6.0.x
* dotnet-aspnetcore 6.0.x
* dotnet-sdk 6.0.x
* bower 1.8.x


### php-buildpack 4.6.14 to 4.6.15

* Add composer 2.7.1, remove composer 2.6.6
* Add nginx 1.25.4, remove nginx 1.25.3
* Add php 8.2.15, remove php 8.2.13
* Add php 8.3.3, remove php 8.3.2


Packaged binaries:

* appdynamics 23.11.0-839
* composer 2.7.1
* httpd 2.4.58
* newrelic 10.11.0.3
* nginx 1.24.0
* nginx 1.25.4
* php 8.1.26
* php 8.1.27
* php 8.2.14
* php 8.2.15
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


### python-buildpack 1.8.18 to 1.8.20

* Add python 3.11.8, remove python 3.11.7
* Add python 3.12.2, remove python 3.12.1
* Add pip 24.0, remove pip 23.3.2
* Add pipenv 2023.12.1, remove pipenv 2023.11.15
* Add setuptools 69.1.0, remove setuptools 69.0.3

Packaged binaries:

* libffi 3.2.1
* libmemcache 1.0.18
* miniconda3-py39 23.11.0
* pip 24.0
* pipenv 2023.12.1
* python 3.8.18
* python 3.9.18
* python 3.10.13
* python 3.11.8
* python 3.12.2
* setuptools 69.1.0

Default binary versions:

* python 3.10.x


### CF CLI  1.60.0 up from 1.56.0

This release contains the following versions of the CF CLI:


| Major Version | Prior Version | Current Version |
| --------------|---------------|-----------------|
| v8 | 8.7.7 | [8.7.8](https://github.com/cloudfoundry/cli/releases/tag/v8.7.8) |
| v7 | 7.7.7 | [7.7.8](https://github.com/cloudfoundry/cli/releases/tag/v7.7.8) |
| v6 | 6.53.0 | [6.53.0](https://github.com/cloudfoundry/cli/releases/tag/v6.53.0) |


### CFLinuxfs4 - 1.79.0 up from 1.72.0 

Notably, this release addresses:


* `USN-6666-1` libuv vulnerability:
  * `CVE-2024-24806`: libuv is a multi-platform support library with a focus on asynchronous I/O. The uv_getaddrinfo function in src/unix/getaddrinfo.c (and its windows counterpart src/win/getaddrinfo.c), truncates hostnames to 256 characters before calling getaddrinfo. This behavior can be exploited to create addresses like 0x00007f000001, which are considered valid by getaddrinfo and could allow an attacker to craft payloads that resolve to unintended IP addresses, bypassing developer checks. The vulnerability arises due to how the hostname_ascii variable (with a length of 256 bytes) is handled in uv_getaddrinfo and subsequently in uv__idna_toascii. When the hostname exceeds 256 characters, it gets truncated without a terminating null byte. As a result attackers may be able to access internal APIs or for websites (similar to MySpace) that allows users to have username.example.com pages. Internal services that crawl or cache these user pages can be exposed to SSRF attacks if a malicious user chooses a long vulnerable username. This issue has been addressed in release version 1.48.0. Users are advised to upgrade. There are no known workarounds for this vulnerability. USN-6665-1 Unbound vulnerabilities:
  * `CVE-2023-50868`: The Closest Encloser Proof aspect of the DNS protocol (in RFC 5155 when RFC 9276 guidance is skipped) allows remote attackers to cause a denial of service (CPU consumption for SHA-1 computations) via DNSSEC responses in a random subdomain attack, aka the "NSEC3" issue. The RFC 5155 specification implies that an algorithm must perform thousands of iterations of a hash function in certain situations. 
  * `CVE-2023-50387`: Certain DNSSEC aspects of the DNS protocol (in RFC 4033, 4034, 4035, 6840, and related RFCs) allow remote attackers to cause a denial of service (CPU consumption) via one or more DNSSEC responses, aka the "KeyTrap" issue. One of the concerns is that, when there is a zone with many DNSKEY and RRSIG records, the protocol specification implies that an algorithm must evaluate all combinations of DNSKEY and RRSIG records. 
* `USN-6644-2 USN-6644-2`: LibTIFF vulnerabilities:
  * `CVE-2023-52356`: A segment fault (SEGV) flaw was found in libtiff that could be triggered by passing a crafted tiff file to the TIFFReadRGBATileExt() API. This flaw allows a remote attacker to cause a heap-buffer overflow, leading to a denial of service.
  * `CVE-2023-6228`: An issue was found in the tiffcp utility distributed by the libtiff package where a crafted TIFF file on processing may cause a heap-based buffer overflow leads to an application crash.
  * `CVE-2023-6277`: An out-of-memory flaw was found in libtiff. Passing a crafted tiff file to TIFFOpen() API may allow a remote attacker to cause a denial of service via a craft input with size smaller than 379 KB.
* `USN-6664-1` USN-6664-1: less vulnerability:
  * `CVE-2022-48624`: close_altfile in filename.c in less before 606 omits shell_quote calls for LESSCLOSE.
* `USN-6663-1` USN-6663-1: OpenSSL update:
  * `https://launchpad.net/bugs/2054090`: Implicit rejection of PKCS#1 v1.5 RSA
* `USN-6659-1` USN-6659-1: libde265 vulnerabilities:
  * `CVE-2022-43249`: Libde265 v1.0.8 was discovered to contain a heap-buffer-overflow vulnerability via put_epel_hv_fallback<unsigned short> in fallback-motion.cc. This vulnerability allows attackers to cause a Denial of Service (DoS) via a crafted video file.
  * `CVE-2023-25221`: Libde265 v1.0.10 was discovered to contain a heap-buffer-overflow vulnerability in the derive_spatial_luma_vector_prediction function in motion.cc.
  * `CVE-2022-43245`: Libde265 v1.0.8 was discovered to contain a segmentation violation via apply_sao_internal<unsigned short> in sao.cc. This vulnerability allows attackers to cause a Denial of Service (DoS) via a crafted video file.
  * `CVE-2023-24754`: libde265 v1.0.10 was discovered to contain a NULL pointer dereference in the ff_hevc_put_weighted_pred_avg_8_sse function at sse-motion.cc. This vulnerability allows attackers to cause a Denial of Service (DoS) via a crafted input file.
  * `CVE-2023-24758`: libde265 v1.0.10 was discovered to contain a NULL pointer dereference in the ff_hevc_put_weighted_pred_avg_8_sse function at sse-motion.cc. This vulnerability allows attackers to cause a Denial of Service (DoS) via a crafted input file.
  * `CVE-2022-47665`: Libde265 1.0.9 has a heap buffer overflow vulnerability in de265_image::set_SliceAddrRS(int, int, int)
  * `CVE-2023-24752`: libde265 v1.0.10 was discovered to contain a NULL pointer dereference in the ff_hevc_put_hevc_epel_pixels_8_sse function at sse-motion.cc. This vulnerability allows attackers to cause a Denial of Service (DoS) via a crafted input file.
  * `CVE-2022-43244`: Libde265 v1.0.8 was discovered to contain a heap-buffer-overflow vulnerability via put_qpel_fallback<unsigned short> in fallback-motion.cc. This vulnerability allows attackers to cause a Denial of Service (DoS) via a crafted video file.
  * `CVE-2023-24756`: libde265 v1.0.10 was discovered to contain a NULL pointer dereference in the ff_hevc_put_unweighted_pred_8_sse function at sse-motion.cc. This vulnerability allows attackers to cause a Denial of Service (DoS) via a crafted input file.
  * `CVE-2023-24751`: libde265 v1.0.10 was discovered to contain a NULL pointer dereference in the mc_chroma function at motion.cc. This vulnerability allows attackers to cause a Denial of Service (DoS) via a crafted input file.
  * `CVE-2022-43250`: Libde265 v1.0.8 was discovered to contain a heap-buffer-overflow vulnerability via put_qpel_0_0_fallback_16 in fallback-motion.cc. This vulnerability allows attackers to cause a Denial of Service (DoS) via a crafted video file.
  * `CVE-2023-24757`: libde265 v1.0.10 was discovered to contain a NULL pointer dereference in the put_unweighted_pred_16_fallback function at fallback-motion.cc. This vulnerability allows attackers to cause a Denial of Service (DoS) via a crafted input file.
  * `CVE-2023-24755`: libde265 v1.0.10 was discovered to contain a NULL pointer dereference in the put_weighted_pred_8_fallback function at fallback-motion.cc. This vulnerability allows attackers to cause a Denial of Service (DoS) via a crafted input file.
* `USN-6658-1` USN-6658-1: libxml2 vulnerability:
  * `CVE-2024-25062`: An issue was discovered in libxml2 before 2.11.7 and 2.12.x before 2.12.5. When using the XML Reader interface with DTD validation and XInclude expansion enabled, processing crafted XML documents can lead to an xmlValidatePopElement use-after-free.
* `USN-6655-1` USN-6655-1: GNU binutils vulnerabilities:
  * `CVE-2022-47695`: An issue was discovered Binutils objdump before 2.39.3 allows attackers to cause a denial of service or other unspecified impacts via function bfd_mach_o_get_synthetic_symtab in match-o.c.
  * `CVE-2022-48063`: GNU Binutils before 2.40 was discovered to contain an excessive memory consumption vulnerability via the function load_separate_debug_files at dwarf2.c. The attacker could supply a crafted ELF file and cause a DNS attack.
  * `CVE-2022-48065`: GNU Binutils before 2.40 was discovered to contain a memory leak vulnerability var the function find_abstract_instance in dwarf2.c.
* `USN-6640-1` USN-6640-1: shadow vulnerability:
  * `CVE-2023-4641`: A flaw was found in shadow-utils. When asking for a new password, shadow-utils asks the password twice. If the password fails on the second attempt, shadow-utils fails in cleaning the buffer used to store the first entry. This may allow an attacker with enough access to retrieve the password from the memory.

## Platform Changes
---

This section is for the platform operators at `cloud.gov` to highlight changes to Cloud Foundry components, this is likely not of interest for developers using the platform.

### bosh-dns 1.37.2 to 1.37.3

* Updates golang package golang-1-linux to 1.22.1
* Updates golang package golang-1-windows to 1.22.1



### CAPI v1.172.0 to v1.173.0

* CC API Version: 2.222.0 and 3.158.0
* Service Broker API Version: 2.15

CAPI Release

* Add jemalloc package to missing job specs

* Dependency Bumps
  * Bump rspec from 3.12.0 to 3.13.0 in /spec
  * Bump Golang to go1.22.0

Cloud Controller

* Add DISTINCT for service plan list queries - ***Note*** This is a bug we reported
* Fix flakey space_delete_spec
* Replace dataset.map().flatten.map() with optimized SQL query
* Improve performance of decorators
* Limit the lsof result by greping for the process id.
* Remove some outdated stuff from the v3 docs
* Don't fetch kpack_lifecycle_data
* Improve deletion of apps

* Dependency Bumps
  * bump webmock from 3.20.0 to 3.21.2
  * bump parallel_tests from 4.5.0 to 4.5.1
  * bump pg from 1.5.4 to 1.5.5
  * bump redis from 5.0.8 to 5.1.0 -
  * bump mysql2 from 0.5.5 to 0.5.6



cc-uploader

* Dependency Bumps
  * None

tps

* Dependency Bumps
  * None

Cloud Controller Database Migrations

* `20240115163000_add_delete_cascade_to_foreign_keys.rb`




### CF-Networking 3.42.0 to 3.43.0

* Removes deprecated and unused/unworking istio code from the release.
* Go package dependency bumps


### CF-Smoketests 42.0.133 to 42.0.134

* Bump golang, cf-cli and smoke_tests packages


### Diego 2.93.0 to 2.95.0


* Now uses `DesiredLRPSchedulingInfo` instead of the entire `DesiredLRP` when only the scheduling info is needed, resulting in a 95% decrease in time spent for relevant calls.
* Fix bosh job spec description for `container_max_cpu_shares`
* dockerapplifecycle: Add OCI image spec index type to Accept header
* vizzini: Remove CPUWeight test
* bbs: Remove cpu_weight limits
* guardian: Add tests for unkillable containers


### Garden-runc from 1.49.0 to 1.50.0

* Adds `grootfs.routine_gc` property, which allows operators to configure garden to grootfs to clean up unused container image layers whenever new containers are created.
  * Previously, to achieve this, operators had to set `grootfs.reserved_space_for_other_jobs_in_mb` to the same value as the ephemeral disk, which is not always easy to obtain programatically.
* Bump go dependencies



### Routing 0.291.0 to 0.292.0

* Dependency updates
* Adds support for Partitioned cookies to gorouter to allow for sticky sessions in embedded contexts.

### Silk 3.42.0 to 3.43.0

* Go package dependency bumps



## Final Note

There is a new article about [displaying dynamic content on Pages static sites](https://cloud.gov/pages/knowledge-base/website-api/) which is worth a read!  

Tune in next sprint for more cloud.gov release notes.









