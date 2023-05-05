---
layout: post
date: July 8th 2022
title: "July 8th cloud.gov Change Log"
excerpt: The cloud.gov team is working on providing change logs so everyone can see new features and updates.
---

Happy July! The cloud.gov team is working on providing change logs so everyone can see new features and updates. Highlights this month include buildpack updates, and bug fixes.

# Change Log

## Customer Facing

---

### Dotnet Core Buildpack - v2.3.43 up from 2.3.42

* Update default .NET SDK, ASPNetCore and Runtime default version in buildpack from 3.1.x to 6.0.x
* Add node 16.15.1, remove node 16.15.0 for stack(s) cflinuxfs3

### Go Buildpack - v1.9.47 up from v.1.9.46

* Add go 1.17.11, remove go 1.17.8 for stack(s) cflinuxfs3
* Add go 1.18.3, remove go 1.18 for stack(s) cflinuxfs3
 
### Nginx Buildpack - v1.1.39 up from v1.1.38

* Deprecate nginx 1.20.2 (End of life)
* Add nginx 1.22.0 for stack(s) cflinuxfs3
* Add openresty 1.21.4.1 for stack(s) cflinuxfs3
* Remove estimated deprecation dates. They were causing confusion to the users

### R Buildpack - v1.1.30 up from v1.1.29

* Deprecate R v 4.1.x due to End of Support

### NodeJS buildpack - v1.7.71 up from v1.7.70

* Add node 14.19.2, remove node 14.19.0 for stack(s) cflinuxfs3
* Add node 16.15.0, remove node 16.14.0 for stack(s) cflinuxfs3
* Add support for SeaLights Node.js agent integration.

### PHP Buildpack - v4.4.63 up from v4.4.61

* Add php 7.4.30, remove php 7.4.28 for stack(s) cflinuxfs3
* Add php 8.1.7, remove php 8.1.5 for stack(s) cflinuxfs3
* Add php 8.0.20, remove php 8.0.18 for stack(s) cflinuxfs3
* Add php 8.0.19, remove php 8.0.17 for stack(s) cflinuxfs3
* Add php 8.1.6, remove php 8.1.4 for stack(s) cflinuxfs3
* Add httpd 2.4.54, remove httpd 2.4.53 for stack(s) cflinuxfs3
* Add composer 2.3.7, remove composer 2.3.5 for stack(s) cflinuxfs3
* Deprecate Nginx 1.20.x (End of life)
* Add nginx 1.22.0 for stack(s) cflinuxfs3

### Python Buildpack - v1.7.55 up from v1.7.54

* Add python 3.10.5, remove python 3.10.3 for stack(s) cflinuxfs3
* Add python 3.9.13, remove python 3.9.11 for stack(s) cflinuxfs3
* Add pip 22.1.2, remove pip 22.0.4 for stack(s) cflinuxfs3
* Add pipenv 2022.6.7, remove pipenv 2022.5.2 for stack(s) cflinuxfs3
* Add miniconda3-py39 4.12.0, remove miniconda3-py39 4.11.0 for stack(s) cflinuxfs3
* Add setuptools 62.3.3, remove setuptools 62.1.0 for stack(s) cflinuxfs3

### Ruby Buildpack - v1.8.55 up from v1.8.54

* Add bundler 2.3.15, remove bundler 2.3.13 for stack(s) cflinuxfs3
* Add rubygems 3.3.15, remove rubygems 3.3.13 for stack(s) cflinuxfs3
* Add node 16.15.1, remove node 16.15.0 for stack(s) cflinuxfs3
* Add yarn 1.22.19, remove yarn 1.22.18 for stack(s) cflinuxfs3

## Platform Changes

---

### Capi Release - v1.130.0 up from v1.129.0

* CC API Version: 2.183.0 and 3.118.0
* Service Broker API Version: 2.15
* Bug fixes

### CF-Networking Release - v3.9.0 up from v3.6.0

* This release includes no new features/bugfixes (but silk-release) does!

### Silk Release - v3.9.0 up from v3.6.0

* Telemetry emits more sophisticated metrics (average, max, min) for IPTablesRulesCount
* Telemetry emission/logging happens on a configurable basis (default to 10 minutes)
* Fixed a bug where Dynamic ASGs did not process ASG rules properly if the ports string contained spaces in the list of ports/port ranges.
* Added support to netmon that allows data to be exported for telemetry purposes. Writes to a telemetry.log file. Can be enabled/disabled via the telemetry_enabled property (disabled by default)
* Resolved a bug with dynamic ASGs when iptables logging was enabled that resulted in rules being flushed from running containers

### CFLinuxfs3 - v0.308.0 up from v0.301.0

USN-5495-1 USN-5495-1: curl vulnerabilities:

* CVE-2022-32205: Set-Cookie denial of service
* CVE-2022-32206: HTTP compression denial of service
* CVE-2022-32207: Unpreserved file permissions
* CVE-2022-32208: FTP-KRB bad message verification
* CVE-2022-32207: Unpreserved file permissions
* CVE-2022-32206: HTTP compression denial of service
* CVE-2022-32205: Set-Cookie denial of service
* CVE-2022-32208: FTP-KRB bad message verification

USN-5488-1 USN-5488-1: OpenSSL vulnerability:

* CVE-2022-2068: In addition to the c_rehash shell command injection identified in CVE-2022-1292, further circumstances where the c_rehash script does not properly sanitise shell metacharacters to prevent command injection were found by code review. When the CVE-2022-1292 was fixed it was not discovered that there are other places in the script where the file names of certificates being hashed were possibly passed to a command executed through the shell. This script is distributed by some operating systems in a manner where it is automatically executed. On such operating systems, an attacker could execute arbitrary commands with the privileges of the script. Use of the c_rehash script is considered obsolete and should be replaced by the OpenSSL rehash command line tool. Fixed in OpenSSL 3.0.4 (Affected 3.0.0,3.0.1,3.0.2,3.0.3). Fixed in OpenSSL 1.1.1p (Affected 1.1.1-1.1.1o). Fixed in OpenSSL 1.0.2zf (Affected 1.0.2-1.0.2ze).

USN-5472-1 USN-5472-1: FFmpeg vulnerabilities:

* CVE-2020-20446: FFmpeg 4.2 is affected by a Divide By Zero issue via libavcodec/aacpsy.c, which allows a remote malicious user to cause a Denial of Service.
* CVE-2020-20453: FFmpeg 4.2 is affected by a Divide By Zero issue via libavcodec/aaccoder, which allows a remote malicious user to cause a Denial of Service
* CVE-2020-20450: FFmpeg 4.2 is affected by null pointer dereference passed as argument to libavformat/aviobuf.c, which could cause a Denial of Service.
* CVE-2020-21041: Buffer Overflow vulnerability exists in FFmpeg 4.1 via apng_do_inverse_blend in libavcodec/pngenc.c, which could let a remote malicious user cause a Denial of Service
* CVE-2020-21688: A heap-use-after-free in the av_freep function in libavutil/mem.c of FFmpeg 4.2 allows attackers to execute arbitrary code.
* CVE-2020-21697: A heap-use-after-free in the mpeg_mux_write_packet function in libavformat/mpegenc.c of FFmpeg 4.2 allows to cause a denial of service (DOS) via a crafted avi file.
* CVE-2020-22015: Buffer Overflow vulnerability in FFmpeg 4.2 in mov_write_video_tag due to the out of bounds in libavformat/movenc.c, which could let a remote malicious user obtain sensitive information, cause a Denial of Service, or execute arbitrary code.
* CVE-2020-22016: A heap-based Buffer Overflow vulnerability in FFmpeg 4.2 at libavcodec/get_bits.h when writing .mov files, which might lead to memory corruption and other potential consequences.
* CVE-2020-22022: A heap-based Buffer Overflow vulnerability exists in FFmpeg 4.2 in filter_frame at libavfilter/vf_fieldorder.c, which might lead to memory corruption and other potential consequences.
* CVE-2020-22031: A Heap-based Buffer Overflow vulnerability exists in FFmpeg 4.2 at libavfilter/vf_w3fdif.c in filter16_complex_low, which might lead to memory corruption and other potential consequences.
* CVE-2020-22042: A Denial of Service vulnerability exists in FFmpeg 4.2 due to a memory leak is affected by: memory leak in the link_filter_inouts function in libavfilter/graphparser.c.
* CVE-2020-22021: Buffer Overflow vulnerability in FFmpeg 4.2 at filter_edges function in libavfilter/vf_yadif.c, which could let a remote malicious user cause a Denial of Service.
* CVE-2020-22033: A heap-based Buffer Overflow Vulnerability exists FFmpeg 4.2 at libavfilter/vf_vmafmotion.c in convolution_y_8bit, which could let a remote malicious user cause a Denial of Service.
* CVE-2020-22035: A heap-based Buffer Overflow vulnerability exists in FFmpeg 4.2 in get_block_row at libavfilter/vf_bm3d.c, which might lead to memory corruption and other potential consequences.
* CVE-2020-22037: A Denial of Service vulnerability exists in FFmpeg 4.2 due to a memory leak in avcodec_alloc_context3 at options.c.
* CVE-2020-35965: decode_frame in libavcodec/exr.c in FFmpeg 4.3.1 has an out-of-bounds write because of errors in calculations of when to perform memset zero operations.
* CVE-2021-38114: libavcodec/dnxhddec.c in FFmpeg 4.4 does not check the return value of the init_vlc function, a similar issue to CVE-2013-0868.
* CVE-2021-38171: adts_decode_extradata in libavformat/adtsenc.c in FFmpeg 4.4 does not check the init_get_bits return value, which is a necessary step because the second argument to init_get_bits can be crafted.
* CVE-2022-1475: An integer overflow vulnerability was found in FFmpeg versions before 4.4.2 and before 5.0.1 in g729_parse() in llibavcodec/g729_parser.c when processing a specially crafted file.
* CVE-2020-22035: A heap-based Buffer Overflow vulnerability exists in FFmpeg 4.2 in get_block_row at libavfilter/vf_bm3d.c, which might lead to memory corruption and other potential consequences.
* CVE-2020-22042: A Denial of Service vulnerability exists in FFmpeg 4.2 due to a memory leak is affected by: memory leak in the link_filter_inouts function in libavfilter/graphparser.c.
* CVE-2020-21697: A heap-use-after-free in the mpeg_mux_write_packet function in libavformat/mpegenc.c of FFmpeg 4.2 allows to cause a denial of service (DOS) via a crafted avi file.
* CVE-2020-22016: A heap-based Buffer Overflow vulnerability in FFmpeg 4.2 at libavcodec/get_bits.h when writing .mov files, which might lead to memory corruption and other potential consequences.
* CVE-2020-20450: FFmpeg 4.2 is affected by null pointer dereference passed as argument to libavformat/aviobuf.c, which could cause a Denial of Service.
* CVE-2020-22032: A heap-based Buffer Overflow vulnerability exists FFmpeg 4.2 at libavfilter/vf_edgedetect.c in gaussian_blur, which might lead to memory corruption and other potential consequences.
* CVE-2020-22017: A heap-based Buffer Overflow vulnerability exists in FFmpeg 4.2 at ff_fill_rectangle in libavfilter/drawutils.c, which might lead to memory corruption and other potential consequences.
* CVE-2020-22026: Buffer Overflow vulnerability exists in FFmpeg 4.2 in the config_input function at libavfilter/af_tremolo.c, which could let a remote malicious user cause a Denial of Service.
* CVE-2020-22037: A Denial of Service vulnerability exists in FFmpeg 4.2 due to a memory leak in avcodec_alloc_context3 at options.c.
* CVE-2020-20445: FFmpeg 4.2 is affected by a Divide By Zero issue via libavcodec/lpc.h, which allows a remote malicious user to cause a Denial of Service.
* CVE-2020-22020: Buffer Overflow vulnerability in FFmpeg 4.2 in the build_diff_map function in libavfilter/vf_fieldmatch.c, which could let a remote malicious user cause a Denial of Service.
* CVE-2020-22027: A heap-based Buffer Overflow vulnerability exits in FFmpeg 4.2 in deflate16 at libavfilter/vf_neighbor.c, which might lead to memory corruption and other potential consequences.
* CVE-2020-22034: A heap-based Buffer Overflow vulnerability exists FFmpeg 4.2 at libavfilter/vf_floodfill.c, which might lead to memory corruption and other potential consequences.
* CVE-2020-22028: Buffer Overflow vulnerability exists in FFmpeg 4.2 in filter_vertically_8 at libavfilter/vf_avgblur.c, which could cause a remote Denial of Service.
* CVE-2020-22025: A heap-based Buffer Overflow vulnerability exists in gaussian_blur at libavfilter/vf_edgedetect.c, which might lead to memory corruption and other potential consequences.
* CVE-2020-21041: Buffer Overflow vulnerability exists in FFmpeg 4.1 via apng_do_inverse_blend in libavcodec/pngenc.c, which could let a remote malicious user cause a Denial of Service
* CVE-2020-22019: Buffer Overflow vulnerability in FFmpeg 4.2 at convolution_y_10bit in libavfilter/vf_vmafmotion.c, which could let a remote malicious user cause a Denial of Service.
* CVE-2021-38114: libavcodec/dnxhddec.c in FFmpeg 4.4 does not check the return value of the init_vlc function, a similar issue to CVE-2013-0868.
* CVE-2020-22036: A heap-based Buffer Overflow vulnerability exists in FFmpeg 4.2 in filter_intra at libavfilter/vf_bwdif.c, which might lead to memory corruption and other potential consequences.
* CVE-2020-22033: A heap-based Buffer Overflow Vulnerability exists FFmpeg 4.2 at libavfilter/vf_vmafmotion.c in convolution_y_8bit, which could let a remote malicious user cause a Denial of Service.
* CVE-2020-22031: A Heap-based Buffer Overflow vulnerability exists in FFmpeg 4.2 at libavfilter/vf_w3fdif.c in filter16_complex_low, which might lead to memory corruption and other potential consequences.
* CVE-2020-22021: Buffer Overflow vulnerability in FFmpeg 4.2 at filter_edges function in libavfilter/vf_yadif.c, which could let a remote malicious user cause a Denial of Service.
* CVE-2020-22023: A heap-based Buffer Overflow vulnerabililty exists in FFmpeg 4.2 in filter_frame at libavfilter/vf_bitplanenoise.c, which might lead to memory corruption and other potential consequences.
* CVE-2020-35965: decode_frame in libavcodec/exr.c in FFmpeg 4.3.1 has an out-of-bounds write because of errors in calculations of when to perform memset zero operations.
* CVE-2020-20446: FFmpeg 4.2 is affected by a Divide By Zero issue via libavcodec/aacpsy.c, which allows a remote malicious user to cause a Denial of Service.
* CVE-2020-21688: A heap-use-after-free in the av_freep function in libavutil/mem.c of FFmpeg 4.2 allows attackers to execute arbitrary code.
CVE-2020-20453: FFmpeg 4.2 is affected by a Divide By Zero issue via libavcodec/aaccoder, which allows a remote malicious user to cause a Denial of Service
* CVE-2020-22015: Buffer Overflow vulnerability in FFmpeg 4.2 in mov_write_video_tag due to the out of bounds in libavformat/movenc.c, which could let a remote malicious user obtain sensitive information, cause a Denial of Service, or execute arbitrary code.
* CVE-2020-22029: A heap-based Buffer Overflow vulnerability exists in FFmpeg 4.2 at libavfilter/vf_colorconstancy.c: in slice_get_derivative, which crossfade_samples_fltp, which might lead to memory corruption and other potential consequences.
* CVE-2020-22030: A heap-based Buffer Overflow vulnerability exists in FFmpeg 4.2 at libavfilter/af_afade.c in crossfade_samples_fltp, which might lead to memory corruption and other potential consequences.
* CVE-2021-38171: adts_decode_extradata in libavformat/adtsenc.c in FFmpeg 4.4 does not check the init_get_bits return value, which is a necessary step because the second argument to init_get_bits can be crafted.
* CVE-2022-1475: An integer overflow vulnerability was found in FFmpeg versions before 4.4.2 and before 5.0.1 in g729_parse() in llibavcodec/g729_parser.c when processing a specially crafted file.
* CVE-2020-22022: A heap-based Buffer Overflow vulnerability exists in FFmpeg 4.2 in filter_frame at libavfilter/vf_fieldorder.c, which might lead to memory corruption and other potential consequences.
* CVE-2021-38291: FFmpeg version (git commit de8e6e67e7523e48bb27ac224a0b446df05e1640) suffers from a an assertion failure at src/libavutil/mathematics.c.

USN-5473-1 USN-5473-1: ca-certificates update:

* https://launchpad.net/bugs/1976631: Update to 20211016 bundle

USN-5464-1 USN-5464-1: E2fsprogs vulnerability:

* CVE-2022-1304: An out-of-bounds read/write vulnerability was found in e2fsprogs 1.46.5. This issue leads to a segmentation fault and possibly arbitrary code execution via a specially crafted filesystem.

USN-5462-1 USN-5462-1: Ruby vulnerabilities:

* CVE-2022-28739: There is a buffer over-read in Ruby before 2.6.10, 2.7.x before 2.7.6, 3.x before 3.0.4, and 3.1.x before 3.1.2. It occurs in String-to-Float conversion, including Kernel#Float and String#to_f.
* CVE-2022-28739: There is a buffer over-read in Ruby before 2.6.10, 2.7.x before 2.7.6, 3.x before 3.0.4, and 3.1.x before 3.1.2. It occurs in String-to-Float conversion, including Kernel#Float and String#to_f.
* CVE-2022-28738: A double free was found in the Regexp compiler in Ruby 3.x before 3.0.4 and 3.1.x before 3.1.2. If a victim attempts to create a Regexp from untrusted user input, an attacker may be able to write to unexpected memory locations.

USN-5456-1 USN-5456-1: ImageMagick vulnerability:

* CVE-2022-28463: ImageMagick 7.1.0-27 is vulnerable to Buffer Overflow.

### Garden-runc - v1.20.7 up from v1.20.6

* garden-runc-release now supports Jammy Jellyfish
* Updated the packaged tar to be statically compiled with musl

### Metrics Discovery Release - v3.1.0 up from v3.0.13

* Don't report the value of the NATS_HOSTS environment variable on startup
* Use cloudfoundry/tlsconfig internal service defaults for NATS TLS connections
* The cf-add-metrics-discovery.yml and cf-add-metrics-discovery-windows.yml operations files have been removed. The metrics-discovery-registrar has been in the base manifest for cf-deployment since cf-deployment v13.0.0.
* The scrape config generator added in the removed operations file can now be deployed with add-scrape-config-generator.yml.

### Routing Release - v0.235.0 up from v0.233.0

* Gorouter healthchecker retries connection instead of monit (#275)
* Gorouter: the metrics package now uses lsof to monitor file descriptors on MacOS @domdom82 cloudfoundry/gorouter#312
* Bumped the lager dependency to resolve issues where the timeFormat flag was not honored, resulting in epoch timestamps vs human readable.
* Now tested with the bionic stemcell in CI

### Statsd-injector Release - v1.11.19 up from v1.11.18

* Bump go-loggregator to v8 by @ctlong in #11
* Bump to go 1.18.1
* As part of bumping to Go 1.18 certificates that are signed with the SHA-1 hash function will no longer be accepted.
