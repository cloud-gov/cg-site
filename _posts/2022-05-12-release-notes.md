---
layout: post
date: May 12th 2022
title: "May 12th Cloud.gov Change Log"
excerpt: The Cloud.gov team is working on providing change logs so everyone can see new features and updates.
---

Happy May! The Cloud.gov team is working on providing change logs so everyone can see new features and updates. Highlights this month include Cloud Foundry Deployment and bug fixes.

# Change Log

## Customer Facing

---

### CF-Deployment - v20.2.0 up from v19.0.0

* Changes will be below broken up by component :)

### Binary Buildpack - v1.0.43 up from v1.0.42

* Update to libbuildpack

### Dotnet Core Buildpack - v2.3.41 up from 2.3.39

* Add node 16.14.2, remove node 16.14.0 for stack(s) cflinuxfs3
* Add dotnet-sdk 3.1.417
* Add dotnet-sdk 5.0.406
* Add dotnet-sdk 6.0.201
* Add dotnet-runtime 3.1.23
* Add dotnet-runtime 5.0.15
* Add dotnet-runtime 6.0.3
* Add dotnet-aspnetcore 3.1.23
* Add dotnet-aspnetcore 5.0.15
* Add dotnet-aspnetcore 6.0.3
* Add bower 1.8.14, remove bower 1.8.13
* Update .NET Buildpack dependencies lines to only keep 1 of each patch version (latest)

### Go Buildpack - v1.9.42 up from v.1.9.39

* Remove go 1.16 (EOL)
* Add go 1.18
* Add go 1.17.8, remove go 1.17.6
* Add go 1.17.7, remove go 1.17.5


### Java Buildpack - v4.48.3 up from v4.48.1

* OpenJDK JRE to 1.8.0_332
* OpenJDK JRE 11 to 11.0.15_10
* OpenJDK JRE 17 to 17.0.3_7
* Tomcat bump to 9.0.62
 
### Nginx Buildpack - v1.1.37 up from v1.1.35

* Remove noisy log output not needed once config is parsed
* Bump github.com/miekg/dns from 1.1.45 to 1.1.46

### R Buildpack - v1.1.28 up from v1.1.26

* Update libbuildpack
* Bump github.com/onsi/gomega from 1.18.1 to 1.19.0
* Add r 4.1.3, remove r 4.1.1

### NodeJS buildpack - v1.7.69 up from v1.7.67

* Add node 12.22.12, remove node 12.22.9 for stack(s) cflinuxfs3
* Add node 14.19.1, remove node 14.18.2 for stack(s) cflinuxfs3
* Add node 16.14.2, remove node 16.13.1 for stack(s) cflinuxfs3
* Add yarn 1.22.18, remove yarn 1.22.17 for stack(s) cflinuxfs3

### PHP Buildpack - v4.4.59 up from v4.4.56

* Add composer 2.3.4, remove composer 2.2.9 for stack(s) cflinuxfs3
* Add php 8.0.17, remove php 8.0.15 for stack(s) cflinuxfs3
* Add php 8.1.4, remove php 8.1.2 for stack(s) cflinuxfs3
* Add httpd 2.4.53, remove httpd 2.4.52 for stack(s) cflinuxfs3
* Add appdynamics 22.3.0-501, remove appdynamics 22.1.1-440
* Bump newrelic to 9.18.1.303

### Python Buildpack - v1.7.53 up from v1.7.49

* Add setuptools 62.0.0, remove setuptools 60.10.0 for stack(s) cflinuxfs3
* Add python 3.10.4, remove python 3.10.2 for stack(s) cflinuxfs3
* Add python 3.9.12, remove python 3.9.10 for stack(s) cflinuxfs3
* Add pipenv 2022.3.28, remove pipenv 2022.1.8 for stack(s) cflinuxfs3
* Add python 3.7.13, remove python 3.7.11 for stack(s) cflinuxfs3
* Add python 3.8.13, remove python 3.8.11 for stack(s) cflinuxfs3
* Add python 3.9.11, remove python 3.9.9 for stack(s) cflinuxfs3
* Add python 3.10.3, remove python 3.10.1 for stack(s) cflinuxfs3
* Add pip 22.0.4, remove pip 22.0.3 for stack(s) cflinuxfs3
* Rename dependency name from miniconda3 to miniconda3-py39
* Add miniconda3-py39 4.11.0, remove miniconda3-py39 4.10.3
* Deprecate Python 3.6.x and update all fixtures
* Remove the usage of pip-pop library

### Ruby Buildpack - v1.8.53 up from v1.8.51

* Deprecate Ruby 2.6. Update fixtures.
* Add rubygems 3.3.11, remove rubygems 3.3.8 for stack(s) cflinuxfs3
* Add bundler 2.3.11, remove bundler 2.3.8 for stack(s) cflinuxfs3
* Add jruby 9.3.4.0, remove jruby 9.3.3.0 for stack(s) cflinuxfs3
* Add node 16.14.2, remove node 16.14.0 for stack(s) cflinuxfs3
* Add yarn 1.22.18, remove yarn 1.22.17 for stack(s) cflinuxfs3
* Add ruby 3.1.1

## Platform Changes

---

### Capi Release - v1.128.0 up from v1.27.0

* CC API Version: 2.181.0 and 3.116.0
* Service Broker API Version: 2.15
* Bug fixes

### CF-Networking Release - v3.5.0 up from v2.43.0

* cf-networking + silk-release now support dynamically updating ASG data for app containers without needing a restart

### Silk Release - v3.5.0 up from v2.43.0

* silk-cni now supports the outbound_connections.dry_run property to enable logging of outbound connection rate limiting events without actually denying traffic.
* vxlan-policy-agent emits an app log when it updates security groups
* Bug fixes

### CFLinuxfs3 - v0.290.0 up from v0.276.0

USN-5391-1 USN-5391-1: libsepol vulnerabilities:

* CVE-2021-36084: The CIL compiler in SELinux 3.2 has a use-after-free in __cil_verify_classperms (called from __cil_verify_classpermission and __cil_pre_verify_helper).
* CVE-2021-36085: The CIL compiler in SELinux 3.2 has a use-after-free in __cil_verify_classperms (called from __verify_map_perm_classperms and hashtab_map).
* CVE-2021-36086: The CIL compiler in SELinux 3.2 has a use-after-free in cil_reset_classpermission (called from cil_reset_classperms_set and cil_reset_classperms_list).
* CVE-2021-36087: The CIL compiler in SELinux 3.2 has a heap-based buffer over-read in ebitmap_match_any (called indirectly from cil_check_neverallow). This occurs because there is sometimes a lack of checks for invalid statements in an optional block.
* CVE-2021-36086: The CIL compiler in SELinux 3.2 has a use-after-free in cil_reset_classpermission (called from cil_reset_classperms_set and cil_reset_classperms_list).
* CVE-2021-36085: The CIL compiler in SELinux 3.2 has a use-after-free in __cil_verify_classperms (called from __verify_map_perm_classperms and hashtab_map).
* CVE-2021-36084: The CIL compiler in SELinux 3.2 has a use-after-free in __cil_verify_classperms (called from __cil_verify_classpermission and __cil_pre_verify_helper).
* CVE-2021-36087: The CIL compiler in SELinux 3.2 has a heap-based buffer over-read in ebitmap_match_any (called indirectly from cil_check_neverallow). This occurs because there is sometimes a lack of checks for invalid statements in an optional block.
* Addresses USN-5376-3 USN-5376-3: Git regression

USN-5380-1 USN-5380-1: Bash vulnerability:

* CVE-2019-18276: An issue was discovered in disable_priv_mode in shell.c in GNU Bash through 5.0 patch 11. By default, if Bash is run with its effective UID not equal to its real UID, it will drop privileges by setting its effective UID to its real UID. However, it does so incorrectly. On Linux and other systems that support "saved UID" functionality, the saved UID is not dropped. An attacker with command execution in the shell can use "enable -f" for runtime loading of a new builtin, which can be a shared object that calls setuid() and therefore regains privileges. However, binaries running with an effective UID of 0 are unaffected.

USN-5379-1 USN-5379-1: klibc vulnerabilities:

* CVE-2021-31870: An issue was discovered in klibc before 2.0.9. Multiplication in the calloc() function may result in an integer overflow and a subsequent heap buffer overflow.
* CVE-2021-31871: An issue was discovered in klibc before 2.0.9. An integer overflow in the cpio command may result in a NULL pointer dereference on 64-bit systems.
* CVE-2021-31872: An issue was discovered in klibc before 2.0.9. Multiple possible integer overflows in the cpio command on 32-bit systems may result in a buffer overflow or other security impact.
* CVE-2021-31873: An issue was discovered in klibc before 2.0.9. Additions in the malloc() function may result in an integer overflow and a subsequent heap buffer overflow.
* CVE-2021-31870: An issue was discovered in klibc before 2.0.9. Multiplication in the calloc() function may result in an integer overflow and a subsequent heap buffer overflow.
* CVE-2021-31872: An issue was discovered in klibc before 2.0.9. Multiple possible integer overflows in the cpio command on 32-bit systems may result in a buffer overflow or other security impact.
* CVE-2021-31873: An issue was discovered in klibc before 2.0.9. Additions in the malloc() function may result in an integer overflow and a subsequent heap buffer overflow.
* CVE-2021-31871: An issue was discovered in klibc before 2.0.9. An integer overflow in the cpio command may result in a NULL pointer dereference on 64-bit systems.

USN-5378-2 USN-5378-2: XZ Utils vulnerability:

* CVE-2022-1271: arbitrary file overwrite with crafted file names

USN-5378-1 USN-5378-1: Gzip vulnerability:

* CVE-2022-1271: arbitrary file overwrite with crafted file names

USN-5376-1 USN-5376-1: Git vulnerability:

* CVE-2022-24765: On multi-user machines, Git users might find themselves unexpectedly in a Git worktree, e.g. when there is a scratch space (/scratch/) intended for all users and another user created a repository in /scratch/.git. Merely having a Git-aware prompt that runs git status (or git diff) and navigating to a directory which is supposedly not a Git worktree, or opening such a directory in an editor or IDE such as VS Code or Atom, will potentially run commands defined by that other user via /scratch/.git/config.

USN-5331-2 USN-5331-2: tcpdump vulnerabilities:

* CVE-2018-16301: The command-line argument parser in tcpdump before 4.99.0 has a buffer overflow in tcpdump.c:read_infile(). To trigger this vulnerability the attacker needs to create a 4GB file on the local filesystem and to specify the file name as the value of the -F command-line argument of tcpdump.
* CVE-2020-8037: The ppp decapsulator in tcpdump 4.9.3 can be convinced to allocate a large amount of memory.
* CVE-2018-16301: The command-line argument parser in tcpdump before 4.99.0 has a buffer overflow in tcpdump.c:read_infile(). To trigger this vulnerability the attacker needs to create a 4GB file on the local filesystem and to specify the file name as the value of the -F command-line argument of tcpdump.
* CVE-2020-8037: The ppp decapsulator in tcpdump 4.9.3 can be convinced to allocate a large amount of memory.

USN-5366-1 USN-5366-1: FriBidi vulnerabilities:

* CVE-2022-25308: fribidi: Stack based buffer overflow
* CVE-2022-25309: fribidi: Heap-buffer-overflow in fribidi_cap_rtl_to_unicode
* CVE-2022-25310: fribidi: SEGV in fribidi_remove_bidi_marks
* CVE-2022-25310: fribidi: SEGV in fribidi_remove_bidi_marks
* CVE-2022-25308: fribidi: Stack based buffer overflow
* CVE-2022-25309: fribidi: Heap-buffer-overflow in fribidi_cap_rtl_to_unicode

USN-5359-1 USN-5359-1: rsync vulnerability:

* CVE-2018-25032: zlib before 1.2.12 allows memory corruption when deflating (i.e., when compressing) if the input has many distant matches.

USN-5355-1 USN-5355-1: zlib vulnerability:

* CVE-2018-25032: zlib 1.2.11 allows memory corruption when deflating (i.e., when compressing) if the input has many distant matches.

USN-5342-1 USN-5342-1: Python vulnerabilities:

* CVE-2021-3426: There's a flaw in Python 3's pydoc. A local or adjacent attacker who discovers or is able to convince another local or adjacent user to start a pydoc server could access the server and use it to disclose sensitive information belonging to the other user that they would not normally be able to access. The highest risk of this flaw is to data confidentiality. This flaw affects Python versions before 3.8.9, Python versions before 3.9.3 and Python versions before 3.10.0a7.
* CVE-2021-4189: [ftplib should not use the host from the PASV response]
* CVE-2022-0391: A flaw was found in Python, specifically within the urllib.parse module. This module helps break Uniform Resource Locator (URL) strings into components. The issue involves how the urlparse method does not sanitize input and allows characters like '\r' and '\n' in the URL path. This flaw allows an attacker to input a crafted URL, leading to injection attacks. This flaw affects Python versions prior to 3.10.0b1, 3.9.5, 3.8.11, 3.7.11 and 3.6.14.
* CVE-2022-0391: A flaw was found in Python, specifically within the urllib.parse module. This module helps break Uniform Resource Locator (URL) strings into components. The issue involves how the urlparse method does not sanitize input and allows characters like '\r' and '\n' in the URL path. This flaw allows an attacker to input a crafted URL, leading to injection attacks. This flaw affects Python versions prior to 3.10.0b1, 3.9.5, 3.8.11, 3.7.11 and 3.6.14.
* CVE-2021-3426: There's a flaw in Python 3's pydoc. A local or adjacent attacker who discovers or is able to convince another local or adjacent user to start a pydoc server could access the server and use it to disclose sensitive information belonging to the other user that they would not normally be able to access. The highest risk of this flaw is to data confidentiality. This flaw affects Python versions before 3.8.9, Python versions before 3.9.3 and Python versions before 3.10.0a7.
* CVE-2021-4189: [ftplib should not use the host from the PASV response]

USN-5329-1 USN-5329-1: tar vulnerability:

* CVE-2021-20193: A flaw was found in the src/list.c of tar 1.33 and earlier. This flaw allows an attacker who can submit a crafted input file to tar to cause uncontrolled consumption of memory. The highest threat from this vulnerability is to system availability.

USN-5328-1 USN-5328-1: OpenSSL vulnerability:

* CVE-2022-0778: Infinite loop in BN_mod_sqrt() reachable when parsing certificates

USN-5324-1 USN-5324-1: libxml2 vulnerability:

* CVE-2022-23308: valid.c in libxml2 before 2.9.13 has a use-after-free of ID and IDREF attributes.

### Diego Release - v2.63.0 up from v2.61.0

* Pass log config in container spec to garden, so that vxlan-policy-agent can send app logs
* Addresses CVE-2022-23806 and CVE-2022-23772 by bumping golang package to include go 1.17.8, (#614)
* Bug fixes

### Garden-runc - v1.20.4 up from v1.20.1

* Pass log config in container spec to network plugin, so that they can write to container output
* Bumps more dependencies to address CVE-2021-21284 and prevent older CVEs from showing up in security scans
* Change to use golang 1.17.8
* Bumps a large number of golang dependencies for garden products to help produce cleaner security scans. 
* Bumps the bundled busybox version from 1.27.2 to 1.35.0.
* Fixes an issue (#216) when deploying bosh-lite environments using garden with bosh create-env in an environment with ruby 2.7+

### Loggregator - v106.6.5 up from v106.6.2

* Now uses go 1.18.1
* As part of bumping to Go 1.18 certificates that are signed with the SHA-1 hash function will no longer be accepted.
* Removed GODEBUG=x509ignoreCN flag

### Metrics Discovery Release - v3.0.13 up from v3.0.8

* Switch to go 1.18.1
* Now includes debug metrics
* Bug fixes

### Routing Release - v0.232.0 up from v0.231.0

* Fixing issue #250: Return a 503 not a 404 when all instances down
* Fixing issue cloudfoundry/gorouter#315

### Statsd-injector Release - v1.11.19 up from v1.11.18

* Bump go-loggregator to v8 by @ctlong in #11
* Bump to go 1.18.1
* As part of bumping to Go 1.18 certificates that are signed with the SHA-1 hash function will no longer be accepted.

### Log-cache Release - v2.11.11 up form v2.11.6

* Bump to go 1.18.1
* As part of bumping to Go 1.18 certificates that are signed with the SHA-1 hash function will no longer be accepted.
* Bug fixes
