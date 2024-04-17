---
layout: post
date: February 23rd 2024
title: "February 23rd Cloud.gov Change Log"
excerpt: The Cloud.gov team is working on providing change logs so everyone can see new features and updates.
---

# Change Log 

## Before digging into the changes...

* Reminder: Please contact support@Cloud.gov to schedule your RDS upgrades if you have not already done so.
* On February 29th at 9AM ET we'll be performing RDS upgrades on our own databases, we're all in the same boat!  In lower environments we've seen a ~5 minute unavailability while the RDS instances upgrade and expect similar results for production.  The scheduled maintenance can be followed at [https://cloudgov.statuspage.io/incidents/kk7t7lrm2jln](https://cloudgov.statuspage.io/incidents/kk7t7lrm2jln) 
* The default amount of memory for staging applications has been increased from 1GB to 2GB to attempt to mitigate staging OOM issues.  This is a temporary solution while we work to identify the underlying issue.


## Customer Facing Changes
---

The audience for this section is developers who maintain applications on Cloud.gov and may need to respond to stack or buildpack changes.

### CF-Deployment - v37.4.0 to v38.1.0

Changes below are broken down by component:


### dotnet-core-buildpack 2.4.21 to 2.4.23

* Add dotnet-aspnetcore 6.0.27, remove dotnet-aspnetcore 6.0.26
* Add dotnet-runtime 6.0.27, remove dotnet-runtime 6.0.26
* Add dotnet-sdk 6.0.419, remove dotnet-sdk 6.0.418
* Add dotnet-aspnetcore 7.0.16, remove dotnet-aspnetcore 7.0.15
* Add dotnet-runtime 7.0.16, remove dotnet-runtime 7.0.15
* Add dotnet-sdk 7.0.406, remove dotnet-sdk 7.0.405
* Add dotnet-aspnetcore 8.0.2, remove dotnet-aspnetcore 8.0.1
* Add dotnet-runtime 8.0.2, remove dotnet-runtime 8.0.1
* Add dotnet-sdk 8.0.200, remove dotnet-sdk 8.0.101


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
* node 20.11.0

Default binary versions:

* dotnet-runtime 6.0.x
* dotnet-aspnetcore 6.0.x
* dotnet-sdk 6.0.x
* bower 1.8.x


### nginx-buildpack 1.2.10 to 1.2.11

* Add openresty 1.25.3.1
* Remove older versions of openresty so we keep 2 versions

Packaged binaries:

* nginx 1.24.0
* nginx 1.25.3
* openresty 1.21.4.2
* openresty 1.25.3.1

### nodejs-buildpack 1.8.21 to 1.8.22

* Add python 3.11.8, remove python 3.11.7
* Add node 20.11.0, remove node 20.9.0
* Add new parameters for sealights hook

Packaged binaries:

* node 18.18.2
* node 18.19.0
* node 20.10.0
* node 20.11.0
* python 3.11.8
* yarn 1.22.19

Default binary versions:

* node 18.x
* python 3.11.x




### ruby-buildpack 1.10.8 to 1.10.9

* Add ruby 3.2.3, remove ruby 3.2.1
* Add rubygems 3.5.6, remove rubygems 3.5.4
* Add bundler 2.5.6, remove bundler 2.5.4

Packaged binaries:

* bundler 2.5.6
* jruby 9.4.5.0
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


### staticfile-buildpack 1.6.9 to 1.6.10

* Update Dynatrace tests to enable it on envs w/o preinstalled fs3 B

Packaged binaries:

* nginx 1.24.0
* nginx 1.25.3

Default binary versions:

* nginx 1.25.x


### CFLinuxfs4 - 1.72.0 up from 1.68.0 

Notably, this release addresses:


* `USN-6622-1` USN-6622-1: OpenSSL vulnerabilities:

  * `CVE-2023-5678`: Issue summary: Generating excessively long X9.42 DH keys or checking excessively long X9.42 DH keys or parameters may be very slow. Impact summary: Applications that use the functions DH_generate_key() to generate an X9.42 DH key may experience long delays. Likewise, applications that use DH_check_pub_key(), DH_check_pub_key_ex() or EVP_PKEY_public_check() to check an X9.42 DH key or X9.42 DH parameters may experience long delays. Where the key or parameters that are being checked have been obtained from an untrusted source this may lead to a Denial of Service. While DH_check() performs all the necessary checks (as of CVE-2023-3817), DH_check_pub_key() doesn't make any of these checks, and is therefore vulnerable for excessively large P and Q parameters. Likewise, while DH_generate_key() performs a check for an excessively large P, it doesn't check for an excessively large Q. An application that calls DH_generate_key() or DH_check_pub_key() and supplies a key or parameters obtained from an untrusted source could be vulnerable to a Denial of Service attack. DH_generate_key() and DH_check_pub_key() are also called by a number of other OpenSSL functions. An application calling any of those other functions may similarly be affected. The other functions affected by this are DH_check_pub_key_ex(), EVP_PKEY_public_check(), and EVP_PKEY_generate(). Also vulnerable are the OpenSSL pkey command line application when using the "-pubcheck" option, as well as the OpenSSL genpkey command line application. The OpenSSL SSL/TLS implementation is not affected by this issue. The OpenSSL 3.0 and 3.1 FIPS providers are not affected by this issue.
  * `CVE-2023-6129`: Issue summary: The POLY1305 MAC (message authentication code) implementation contains a bug that might corrupt the internal state of applications running on PowerPC CPU based platforms if the CPU provides vector instructions. Impact summary: If an attacker can influence whether the POLY1305 MAC algorithm is used, the application state might be corrupted with various application dependent consequences. The POLY1305 MAC (message authentication code) implementation in OpenSSL for PowerPC CPUs restores the contents of vector registers in a different order than they are saved. Thus the contents of some of these vector registers are corrupted when returning to the caller. The vulnerable code is used only on newer PowerPC processors supporting the PowerISA 2.07 instructions. The consequences of this kind of internal application state corruption can be various - from no consequences, if the calling application does not depend on the contents of non-volatile XMM registers at all, to the worst consequences, where the attacker could get complete control of the application process. However unless the compiler uses the vector registers for storing pointers, the most likely consequence, if any, would be an incorrect result of some application dependent calculations or a crash leading to a denial of service. The POLY1305 MAC algorithm is most frequently used as part of the CHACHA20-POLY1305 AEAD (authenticated encryption with associated data) algorithm. The most common usage of this AEAD cipher is with TLS protocol versions 1.2 and 1.3. If this cipher is enabled on the server a malicious client can influence whether this AEAD cipher is used. This implies that TLS server applications using OpenSSL can be potentially impacted. However we are currently not aware of any concrete application that would be affected by this issue therefore we consider this a Low severity security issue.
  * `CVE-2023-6237`: Excessive time spent checking invalid RSA public keys
  * `CVE-2024-0727`: Issue summary: Processing a maliciously formatted PKCS12 file may lead OpenSSL to crash leading to a potential Denial of Service attack Impact summary: Applications loading files in the PKCS12 format from untrusted sources might terminate abruptly. A file in PKCS12 format can contain certificates and keys and may come from an untrusted source. The PKCS12 specification allows certain fields to be NULL, but OpenSSL does not correctly check for this case. This can lead to a NULL pointer dereference that results in OpenSSL crashing. If an application processes PKCS12 files from an untrusted source using the OpenSSL APIs then that application will be vulnerable to this issue. OpenSSL APIs that are vulnerable to this are: PKCS12_parse(), PKCS12_unpack_p7data(), PKCS12_unpack_p7encdata(), PKCS12_unpack_authsafes() and PKCS12_newpass(). We have also fixed a similar issue in SMIME_write_PKCS7(). However since this function is related to writing data we do not consider it security significant. The FIPS modules in 3.2, 3.1 and 3.0 are not affected by this issue.


* `USN-6627-1` USN-6627-1: libde265 vulnerabilities:

  * `CVE-2021-35452`: An Incorrect Access Control vulnerability exists in libde265 v1.0.8 due to a SEGV in slice.cc.
  * `CVE-2021-36408`: An issue was discovered in libde265 v1.0.8.There is a Heap-use-after-free in intrapred.h when decoding file using dec265.
  * `CVE-2021-36409`: There is an Assertion `scaling_list_pred_matrix_id_delta==1' failed at sps.cc:925 in libde265 v1.0.8 when decoding file, which allows attackers to cause a Denial of Service (DoS) by running the application with a crafted file or possibly have unspecified other impact.
  * `CVE-2021-36410`: A stack-buffer-overflow exists in libde265 v1.0.8 via fallback-motion.cc in function put_epel_hv_fallback when running program dec265.
  * `CVE-2021-36411`: An issue has been found in libde265 v1.0.8 due to incorrect access control. A SEGV caused by a READ memory access in function derive_boundaryStrength of deblock.cc has occurred. The vulnerability causes a segmentation fault and application crash, which leads to remote denial of service.
  * `CVE-2022-1253`: Heap-based Buffer Overflow in GitHub repository strukturag/libde265 prior to and including 1.0.8. The fix is established in commit 8e89fe0e175d2870c39486fdd09250b230ec10b8 but does not yet belong to an official release.
  * `CVE-2022-43235`: Libde265 v1.0.8 was discovered to contain a heap-buffer-overflow vulnerability via ff_hevc_put_hevc_epel_pixels_8_sse in sse-motion.cc. This vulnerability allows attackers to cause a Denial of Service (DoS) via a crafted video file.
  * `CVE-2022-43236`: Libde265 v1.0.8 was discovered to contain a stack-buffer-overflow vulnerability via put_qpel_fallback<unsigned short> in fallback-motion.cc. This vulnerability allows attackers to cause a Denial of Service (DoS) via a crafted video file.
  * `CVE-2022-43237`: Libde265 v1.0.8 was discovered to contain a stack-buffer-overflow vulnerability via void put_epel_hv_fallback<unsigned short> in fallback-motion.cc. This vulnerability allows attackers to cause a Denial of Service (DoS) via a crafted video file.
  * `CVE-2022-43238`: Libde265 v1.0.8 was discovered to contain an unknown crash via ff_hevc_put_hevc_qpel_h_3_v_3_sse in sse-motion.cc. This vulnerability allows attackers to cause a Denial of Service (DoS) via a crafted video file.
  * `CVE-2022-43239`: Libde265 v1.0.8 was discovered to contain a heap-buffer-overflow vulnerability via mc_chroma<unsigned short> in motion.cc. This vulnerability allows attackers to cause a Denial of Service (DoS) via a crafted video file.
  * `CVE-2022-43240`: Libde265 v1.0.8 was discovered to contain a heap-buffer-overflow vulnerability via ff_hevc_put_hevc_qpel_h_2_v_1_sse in sse-motion.cc. This vulnerability allows attackers to cause a Denial of Service (DoS) via a crafted video file.
  * `CVE-2022-43241`: Libde265 v1.0.8 was discovered to contain an unknown crash via ff_hevc_put_hevc_qpel_v_3_8_sse in sse-motion.cc. This vulnerability allows attackers to cause a Denial of Service (DoS) via a crafted video file.
  * `CVE-2022-43242`: Libde265 v1.0.8 was discovered to contain a heap-buffer-overflow vulnerability via mc_luma<unsigned char> in motion.cc. This vulnerability allows attackers to cause a Denial of Service (DoS) via a crafted video file.
  * `CVE-2022-43243`: Libde265 v1.0.8 was discovered to contain a heap-buffer-overflow vulnerability via ff_hevc_put_weighted_pred_avg_8_sse in sse-motion.cc. This vulnerability allows attackers to cause a Denial of Service (DoS) via a crafted video file.
  * `CVE-2022-43248`: Libde265 v1.0.8 was discovered to contain a heap-buffer-overflow vulnerability via put_weighted_pred_avg_16_fallback in fallback-motion.cc. This vulnerability allows attackers to cause a Denial of Service (DoS) via a crafted video file.
  * `CVE-2022-43252`: Libde265 v1.0.8 was discovered to contain a heap-buffer-overflow vulnerability via put_epel_16_fallback in fallback-motion.cc. This vulnerability allows attackers to cause a Denial of Service (DoS) via a crafted video file.
  * `CVE-2022-43253`: Libde265 v1.0.8 was discovered to contain a heap-buffer-overflow vulnerability via put_unweighted_pred_16_fallback in fallback-motion.cc. This vulnerability allows attackers to cause a Denial of Service (DoS) via a crafted video file.

## Platform Changes
---

This section is for the platform operators at `cloud.gov` to highlight changes to Cloud Foundry components, this is likely not of interest for developers using the platform.


### bosh-dns 1.37.1 to 1.37.2

* Updates golang package golang-1-linux to 1.22.0
* Updates golang package golang-1-windows to 1.22.0


### Bpm 1.2.14 to 1.2.16

* Updates golang package golang-1-linux to 1.22.0


### CAPI v1.171.0 to v1.172.0

* CC API Version: 2.222.0 and 3.158.0
* Service Broker API Version: 2.15

CAPI Release

* Add jemalloc package to missing job specs

* Dependency Bumps
  * Bump rspec from 3.12.0 to 3.13.0 in /spec
  * Bump Golang to go1.22.0

Cloud Controller

* Remove `distinct` when fetching security groups
* Put service key binding/instance creation and job creation in one transaction
* Remove dead code (cloudfoundry/cloud_controller_ng#3627) @philippthun
* Use single SQL statement to fetch additional data in decorators
* Set `work_mem` for annotation/label migration
* Dependency Bumps
  * Bump sequel from 5.76.0 to 5.77.0
  * Bump rspec from 3.12.0 to 3.13.0
  * Bump nokogiri from 1.16.0 to 1.16.2
  * Bump hmarr/debug-action from 2 to 3
  * Bump nokogiri from 1.15.3 to 1.16.2 in /docs/v3

cc-uploader

* Dependency Bumps
  * None

tps

* Dependency Bumps
  * None

Cloud Controller Database Migrations

* None


### CF-Networking 3.41.0 to 3.42.0

* Bump healthchecker package


### CF-Smoketests 42.0.128 to 42.0.133

* Bump golang, cf-cli and smoke_tests packages


### Diego 2.92.0 to 2.93.0


* Add CPU Entitlement gauge metric & Deprecate CPU Entitlement counter metric
* Bump docker to 20.10.27 to address GHSA-jq35-85cj-fj4p
* golang-1.21-linux (1.21.7)



### Garden-runc from 1.48.0 to 1.49.0

* guardian is a little more helpful when logging messages about containers that could not be killed, even after sending multiple SIGKILLs. In situations such as this, the only recourse is to reboot the VM, if the container processes are stuck in an unkillable state in the kernel. In addition to making this error stand out more, we've added a new metric for `UnkillableContainers` that guardian emits. When nonzero, there is a container that cannot be killed. See the [CloudFoundry docs for Component metrics](https://docs.cloudfoundry.org/running/all_metrics.html#garden-linux) for more info.
* Golang package dependency bumps
* Bumped to Golang 1.21.7



### Routing 0.289.0 to 0.291.0

* Bugfix: Mitigates issue when operators set `router.route_service_internal_server_port`. Previously, this configuration parameter was not passed through to the Gorouter configuration.
* Adds opt-in support for NTLM + other challenge-response based authentication using Authorization: Negotiate flows by automatically enabling sticky sessions for those requests.
* Golang bump to 1.21.7
* Go package dependency bumps


### Silk 3.41.0 to 3.42.0

* Go package dependency bumps



### UAA 76.31.0 to 77.0.0

Breaking Changes:

* Remove: new relic
* Remove: configs for the removed MFA feature
* Please read UAA [v77.0.0 release notes](https://github.com/cloudfoundry/uaa/releases/tag/v77.0.0) for the server-level breaking changes
  * ***Remove UAA's ability to act as a SAML identity provider***
    * feat: clean up unused DB table service_provider used by UAA-as-SAML-IDP
  * ***Remove: deprecated native MFA feature***
  * Please note that upgrading to this release will clean up all persisted data related to the removed features mentioned above, so please proceed with caution.

Dependency Bumps:

* Bump github.com/cloudfoundry/bosh-utils from 0.0.425 to 0.0.426 in /src/acceptance_tests
* Bump github.com/onsi/gomega from 1.31.0 to 1.31.1 in /src/acceptance_tests
* Ignore gomega bump in uaa v74.5.x branch.
* Bump github.com/cloudfoundry/bosh-utils from 0.0.426 to 0.0.427 in /src/acceptance_tests
* Bump diff-lcs from 1.5.0 to 1.5.1
* Bump github.com/cloudfoundry/bosh-utils from 0.0.427 to 0.0.428 in /src/acceptance_tests
* Bump nokogiri from 1.16.0 to 1.16.2
* Bump rspec from 3.12.0 to 3.13.0
* Bump minitest from 5.21.2 to 5.22.0
* Bump github.com/cloudfoundry/bosh-utils from 0.0.428 to 0.0.430 in /src/acceptance_tests
* Bump minitest from 5.22.0 to 5.22.1
* Revert "Bump github.com/cloudfoundry/bosh-utils in /src/acceptance tests"

Misc:

* Fix bosh release tests by @bruce-ricard in #762

## Final Note

Tune in next sprint for new release notes!
