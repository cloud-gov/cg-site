---
layout: post
date: January 25th 2024
title: "January 25th cloud.gov Change Log"
excerpt: The cloud.gov team is working on providing change logs so everyone can see new features and updates.
---

# Change Log - Hello 2024, all the buildpacks were updated!

## Customer Facing Changes
---

The audience for this section is developers who maintain applications on cloud.gov and may need to respond to stack or buildpack changes.

### CF-Deployment - v35.3.0 to v37.0.0

Changes below are broken down by component:

### binary-buildpack 1.1.8 to 1.1.9

* Updates `github-config` from 1.1.8 to 1.1.9

### dotnet-core-buildpack 2.4.18 to 2.4.20

* Bump github.com/Sealights/libbuildpack-sealights from 1.3.0 to 1.4.0

Packaged binaries:

* bower 1.8.14
* dotnet-aspnetcore 6.0.25
* dotnet-aspnetcore 7.0.14
* dotnet-aspnetcore 8.0.0
* dotnet-runtime 6.0.25
* dotnet-runtime 7.0.14
* dotnet-runtime 8.0.0
* dotnet-sdk 6.0.417
* dotnet-sdk 7.0.404
* dotnet-sdk 8.0.100
* libgdiplus 6.1
* libunwind 1.7.2
* node 20.10.0

Default binary versions:

* dotnet-runtime 6.0.x
* dotnet-aspnetcore 6.0.x
* dotnet-sdk 6.0.x
* bower 1.8.x

### go-buildpack 1.10.14 to 1.10.15

* Add go 1.20.12, remove go 1.20.11
* Add go 1.21.5, remove go 1.21.4

Packaged binaries:

* dep 0.5.4
* glide 0.13.3
* go 1.20.12
* go 1.21.5
* godep 80

Default binary versions:

* go 1.20.x

### java-buildpack 4.63.1 to 4.65.0

This release includes the following updates:

* Java 21 support - to use Java 21, you can set the config environment variable:
  * `JBP_CONFIG_OPEN_JDK_JRE '{ jre: { version: 21.+ }}'`
* Some agent framework dependency bumps, including:
  * A bug fix in Java CFEnv when specifying a custom port for AMQPS connections, see this issue for more information.
  * New major version 6.x of the Contrast Security agent which supports Java 21
* A new version of the [Client Certificate Mapper](https://github.com/cloudfoundry/java-buildpack-client-certificate-mapper) which supports the change in Servlet API from `javax.*` to `jakarta.*` packages for its relevant Servlet classes.
* A fix for the Client Certificate Mapper when used with older Spring Boot versions.
* A new Framework is available in this release, Open Telemetry. (thanks @tylerbenson)
* FIPS support in the Dynatrace framework.

For a full set of release notes which include the package dependencies, please refer to [the notes here](https://github.com/cloudfoundry/java-buildpack/releases/tag/v4.65.0).

### nginx-buildpack 1.2.8 to 1.2.10

* Better logging when listen {{port}} validation fails
* Updating github-config

Packaged binaries:

* nginx 1.24.0
* nginx 1.25.3
* openresty 1.19.9.1
* openresty 1.21.4.2

Default binary versions:

* nginx 1.25.x

### nodejs-buildpack 1.8.20 to 1.8.21

* Add node 18.19.0, remove node 18.18.0
* Add node 20.10.0, remove node 20.8.1
* Add python 3.11.7, remove python 3.11.6

Packaged binaries:

* node 18.18.2
* node 18.19.0
* node 20.9.0
* node 20.10.0
* python 3.11.7
* yarn 1.22.19

Default binary versions:

* node 18.x
* python 3.11.x

### php-buildpack 4.6.13 to 4.6.14

* Deprecate PHP 8.0.x (EOL)
* Add php 8.3.1
* Add php 8.1.27, remove php 8.1.25
* Add php 8.2.14, remove php 8.2.12
* Add composer 2.6.6, remove composer 2.6.5
* Add appdynamics 23.11.0-839, remove appdynamics 23.7.1-751


Packaged binaries:

* appdynamics 23.11.0-839
* composer 2.6.6
* httpd 2.4.58
* newrelic 10.11.0.3
* nginx 1.24.0
* nginx 1.25.3
* php 8.1.26
* php 8.1.27
* php 8.2.13
* php 8.2.14
* php 8.3.1
* python 2.7.18
* ruby 3.0.5

Default binary versions:

* php 8.1.27
* httpd 2.4.58
* newrelic 10.11.0.3
* nginx 1.25.3
* composer 2.6.6


### python-buildpack 1.8.16 to 1.8.18

* Add setuptools 69.0.3, remove setuptools 69.0.2
* Add python 3.12.1, remove python 3.12.0
* Add python 3.11.7, remove python 3.11.6
* Add miniconda3-py39 23.11.0, remove miniconda3-py39 23.10.0
* Add pip 23.3.2, remove pip 23.3.1

Packaged binaries:

* libffi 3.2.1
* libmemcache 1.0.18
* miniconda3-py39 23.11.0
* pip 23.3.2
* pipenv 2023.11.15
* python 3.8.18
* python 3.9.18
* python 3.10.13
* python 3.11.7
* python 3.12.1
* setuptools 69.0.3

Default binary versions:

* python 3.10.x

### r-buildpack 1.2.7 to 1.2.8

* Update r 4.2.3 dependencies:
  * rserve from 1.8.11 to 1.8.13

Packaged binaries:

* r 4.2.3
* r 4.3.2



### ruby-buildpack 1.10.6 to 1.10.8

* Deprecate JRuby 9.3.x
* Add ruby 3.3.0
* Add rubygems 3.5.4, remove rubygems 3.4.22
* Add bundler 2.5.4, remove bundler 2.4.22
* Add node 20.11.0, remove node 20.10.0

Packaged binaries:

* bundler 2.5.4
* jruby 9.4.5.0
* node 20.11.0
* openjdk1.8-latest 1.8.0
* ruby 3.1.3
* ruby 3.1.4
* ruby 3.2.1
* ruby 3.2.2
* ruby 3.3.0
* rubygems 3.5.4
* yarn 1.22.21

Default binary versions:

* ruby 3.2.x

### staticfile-buildpack 1.6.8 to 1.6.9

* Updating github-config

Packaged binaries:

* nginx 1.24.0
* nginx 1.25.3

Default binary versions:

* nginx 1.25.x



### CF CLI  1.59.0 up from 1.56.0

This release contains the following versions of the CF CLI:


| Major Version | Prior Version | Current Version |
| --------------|---------------|-----------------|
| v8 | 8.7.6 | [8.7.6](https://github.com/cloudfoundry/cli/releases/tag/v8.7.6) |
| v7 | 7.7.6 | [7.7.6](https://github.com/cloudfoundry/cli/releases/tag/v7.7.6) |
| v6 | 6.53.0 | [6.53.0](https://github.com/cloudfoundry/cli/releases/tag/v6.53.0) |




### CFLinuxfs4 - 1.66.0 up from 1.61.0 

Notably, this release addresses:

* `USN-6588-1` USN-6588-1: PAM vulnerability:
   * `CVE-2024-22365`: pam_namespace local denial of service


* `USN-6541-1 USN-6541-1`: GNU C Library vulnerabilities:
    * `CVE-2023-4813`: A flaw was found in glibc. In an uncommon situation, the gaih_inet function may use memory that has been freed, resulting in an application crash. This issue is only exploitable when the getaddrinfo function is called and the hosts database in /etc/nsswitch.conf is configured with SUCCESS=continue or SUCCESS=merge.
    * `CVE-2023-4806`: A flaw was found in glibc. In an extremely rare situation, the getaddrinfo function may access memory that has been freed, resulting in an application crash. This issue is only exploitable when a NSS module implements only the nss_gethostbyname2_r and nss_getcanonname_r hooks without implementing the nss*_gethostbyname3_r hook. The resolved name should return a large number of IPv6 and IPv4, and the call to the getaddrinfo function should have the AF_INET6 address family with AI_CANONNAME, AI_ALL and AI_V4MAPPED as flags.
    * `CVE-2023-5156`: A flaw was found in the GNU C Library. A recent fix for CVE-2023-4806 introduced the potential for a memory leak, which may result in an application crash.
    * `CVE-2023-4806`: A flaw was found in glibc. In an extremely rare situation, the getaddrinfo function may access memory that has been freed, resulting in an application crash. This issue is only exploitable when a NSS module implements only the nss_gethostbyname2_r and nss_getcanonname_r hooks without implementing the nss*_gethostbyname3_r hook. The resolved name should return a large number of IPv6 and IPv4, and the call to the getaddrinfo function should have the AF_INET6 address family with AI_CANONNAME, AI_ALL and AI_V4MAPPED as flags.
    * `CVE-2023-4813`: A flaw was found in glibc. In an uncommon situation, the gaih_inet function may use memory that has been freed, resulting in an application crash. This issue is only exploitable when the getaddrinfo function is called and the hosts database in /etc/nsswitch.conf is configured with SUCCESS=continue or SUCCESS=merge.
    * `CVE-2023-5156`: A flaw was found in the GNU C Library. A recent fix for CVE-2023-4806 introduced the potential for a memory leak, which may result in an application crash.

* `USN-6581-1` USN-6581-1: GNU binutils vulnerabilities:

    * `CVE-2022-45703`: Heap buffer overflow vulnerability in binutils readelf before 2.40 via function display_debug_section in file readelf.c.
    * `CVE-2022-47011`: An issue was discovered function parse_stab_struct_fields in stabs.c in Binutils 2.34 thru 2.38, allows attackers to cause a denial of service due to memory leaks.
    * `CVE-2022-47008`: An issue was discovered function make_tempdir, and make_tempname in bucomm.c in Binutils 2.34 thru 2.38, allows attackers to cause a denial of service due to memory leaks.
    * `CVE-2022-47011`: An issue was discovered function parse_stab_struct_fields in stabs.c in Binutils 2.34 thru 2.38, allows attackers to cause a denial of service due to memory leaks.
    * `CVE-2022-47007`: An issue was discovered function stab_demangle_v3_arg in stabs.c in Binutils 2.34 thru 2.38, allows attackers to cause a denial of service due to memory leaks.
    * `CVE-2022-47010`: An issue was discovered function pr_function_type in prdbg.c in Binutils 2.34 thru 2.38, allows attackers to cause a denial of service due to memory leaks.
    * `CVE-2022-45703`: Heap buffer overflow vulnerability in binutils readelf before 2.40 via function display_debug_section in file readelf.c.
    * `CVE-2022-44840`: Heap buffer overflow vulnerability in binutils readelf before 2.40 via function find_section_in_set in file readelf.c.

* `USN-6541-2` USN-6541-2: GNU C Library regression:

    * `CVE-2023-4806`: A flaw was found in glibc. In an extremely rare situation, the getaddrinfo function may access memory that has been freed, resulting in an application crash. This issue is only exploitable when a NSS module implements only the nss_gethostbyname2_r and nss_getcanonname_r hooks without implementing the nss*_gethostbyname3_r hook. The resolved name should return a large number of IPv6 and IPv4, and the call to the getaddrinfo function should have the AF_INET6 address family with AI_CANONNAME, AI_ALL and AI_V4MAPPED as flags.
    * `CVE-2023-4813`: A flaw was found in glibc. In an uncommon situation, the gaih_inet function may use memory that has been freed, resulting in an application crash. This issue is only exploitable when the getaddrinfo function is called and the hosts database in /etc/nsswitch.conf is configured with SUCCESS=continue or SUCCESS=merge.
    * `CVE-2023-4806`: A flaw was found in glibc. In an extremely rare situation, the getaddrinfo function may access memory that has been freed, resulting in an application crash. This issue is only exploitable when a NSS module implements only the nss_gethostbyname2_r and nss_getcanonname_r hooks without implementing the nss*_gethostbyname3_r hook. The resolved name should return a large number of IPv6 and IPv4, and the call to the getaddrinfo function should have the AF_INET6 address family with AI_CANONNAME, AI_ALL and AI_V4MAPPED as flags.
    * `CVE-2023-5156`: A flaw was found in the GNU C Library. A recent fix for CVE-2023-4806 introduced the potential for a memory leak, which may result in an application crash.
    * https://launchpad.net/bugs/2047155: "Could not create socket" with apt update when update libc6 to 2.35-0ubuntu3.5 and using nscd

* `USN-6566-1` USN-6566-1: SQLite vulnerabilities:

    * `CVE-2022-46908`: SQLite through 3.40.0, when relying on --safe for execution of an untrusted CLI script, does not properly implement the azProhibitedFunctions protection mechanism, and instead allows UDF functions such as WRITEFILE.
    * `CVE-2023-7104`: A vulnerability was found in SQLite SQLite3 up to 3.43.0 and classified as critical. This issue affects the function sessionReadRecord of the file ext/session/sqlite3session.c of the component make alltest Handler. The manipulation leads to heap-based buffer overflow. It is recommended to apply a patch to fix this issue. The associated identifier of this vulnerability is VDB-248999.
    * `CVE-2022-46908`: SQLite through 3.40.0, when relying on --safe for execution of an untrusted CLI script, does not properly implement the azProhibitedFunctions protection mechanism, and instead allows UDF functions such as WRITEFILE.
    * `CVE-2023-7104`: A vulnerability was found in SQLite SQLite3 up to 3.43.0 and classified as critical. This issue affects the function sessionReadRecord of the file ext/session/sqlite3session.c of the component make alltest Handler. The manipulation leads to heap-based buffer overflow. It is recommended to apply a patch to fix this issue. The associated identifier of this vulnerability is VDB-248999.

* `USN-6565-1` USN-6565-1: OpenSSH vulnerabilities:

    * `CVE-2021-41617`: sshd in OpenSSH 6.2 through 8.x before 8.8, when certain non-default configurations are used, allows privilege escalation because supplemental groups are not initialized as expected. Helper programs for AuthorizedKeysCommand and AuthorizedPrincipalsCommand may run with privileges associated with group memberships of the sshd process, if the configuration specifies running the command as a different user.
    * `CVE-2023-51384`: In ssh-agent in OpenSSH before 9.6, certain destination constraints can be incompletely applied. When destination constraints are specified during addition of PKCS#11-hosted private keys, these constraints are only applied to the first key, even if a PKCS#11 token returns multiple keys.
    * `CVE-2023-51385`: In ssh in OpenSSH before 9.6, OS command injection might occur if a user name or host name has shell metacharacters, and this name is referenced by an expansion token in certain situations. For example, an untrusted Git repository can have a submodule with shell metacharacters in a user name or host name.
    * `CVE-2021-41617`: sshd in OpenSSH 6.2 through 8.x before 8.8, when certain non-default configurations are used, allows privilege escalation because supplemental groups are not initialized as expected. Helper programs for AuthorizedKeysCommand and AuthorizedPrincipalsCommand may run with privileges associated with group memberships of the sshd process, if the configuration specifies running the command as a different user.
    * `CVE-2023-51384`: In ssh-agent in OpenSSH before 9.6, certain destination constraints can be incompletely applied. When destination constraints are specified during addition of PKCS#11-hosted private keys, these constraints are only applied to the first key, even if a PKCS#11 token returns multiple keys.
    * `CVE-2023-51385`: In ssh in OpenSSH before 9.6, OS command injection might occur if a user name or host name has shell metacharacters, and this name is referenced by an expansion token in certain situations. For example, an untrusted Git repository can have a submodule with shell metacharacters in a user name or host name.


* `USN-6561-1` USN-6561-1: libssh vulnerability:

    * `CVE-2023-48795`: Prefix truncation attack on BPP: By manipulating sequence numbers during the handshake, an attacker can remove the initial messages on the secure channel without causing a MAC failure.

* `USN-6560-1` USN-6560-1: OpenSSH vulnerabilities:

    * `CVE-2023-48795`: Prefix truncation attack on BPP: By manipulating sequence numbers during the handshake, an attacker can remove the initial messages on the secure channel without causing a MAC failure.
    * `CVE-2023-28531`: ssh-add in OpenSSH before 9.3 adds smartcard keys to ssh-agent without the intended per-hop destination constraints. The earliest affected version is 8.9.
    * `CVE-2023-48795`: Prefix truncation attack on BPP: By manipulating sequence numbers during the handshake, an attacker can remove the initial messages on the secure channel without causing a MAC failure.
    * `CVE-2023-28531`: ssh-add in OpenSSH before 9.3 adds smartcard keys to ssh-agent without the intended per-hop destination constraints. The earliest affected version is 8.9.

* `USN-6558-1` USN-6558-1: audiofile vulnerabilities:

    * `CVE-2018-13440`: The audiofile Audio File Library 0.3.6 has a NULL pointer dereference bug in ModuleState::setup in modules/ModuleState.cpp, which allows an attacker to cause a denial of service via a crafted caf file, as demonstrated by sfconvert.
    * `CVE-2018-17095`: An issue has been discovered in mpruett Audio File Library (aka audiofile) 0.3.6, 0.3.5, 0.3.4, 0.3.3, 0.3.2, 0.3.1, 0.3.0. A heap-based buffer overflow in Expand3To4Module::run has occurred when running sfconvert.
    * `CVE-2019-13147`: In Audio File Library (aka audiofile) 0.3.6, there exists one NULL pointer dereference bug in ulaw2linear_buf in G711.cpp in libmodules.a that allows an attacker to cause a denial of service via a crafted file.
    * `CVE-2022-24599`: In autofile Audio File Library 0.3.6, there exists one memory leak vulnerability in printfileinfo, in printinfo.c, which allows an attacker to leak sensitive information via a crafted file. The printfileinfo function calls the copyrightstring function to get data, however, it dosn't use zero bytes to truncate the data.
    * `CVE-2018-17095`: An issue has been discovered in mpruett Audio File Library (aka audiofile) 0.3.6, 0.3.5, 0.3.4, 0.3.3, 0.3.2, 0.3.1, 0.3.0. A heap-based buffer overflow in Expand3To4Module::run has occurred when running sfconvert.
    * `CVE-2019-13147`: In Audio File Library (aka audiofile) 0.3.6, there exists one NULL pointer dereference bug in ulaw2linear_buf in G711.cpp in libmodules.a that allows an attacker to cause a denial of service via a crafted file.
    * `CVE-2018-13440`: The audiofile Audio File Library 0.3.6 has a NULL pointer dereference bug in ModuleState::setup in modules/ModuleState.cpp, which allows an attacker to cause a denial of service via a crafted caf file, as demonstrated by sfconvert.
    * `CVE-2022-24599`: In autofile Audio File Library 0.3.6, there exists one memory leak vulnerability in printfileinfo, in printinfo.c, which allows an attacker to leak sensitive information via a crafted file. The printfileinfo function calls the copyrightstring function to get data, however, it dosn't use zero bytes to truncate the data.

* `USN-6557-1` USN-6557-1: Vim vulnerabilities:

    * `CVE-2022-1725`: NULL Pointer Dereference in GitHub repository vim/vim prior to 8.2.4959.
    * `CVE-2022-1771`: Uncontrolled Recursion in GitHub repository vim/vim prior to 8.2.4975.
    * `CVE-2022-1886`: Heap-based Buffer Overflow in GitHub repository vim/vim prior to 8.2.
    * `CVE-2022-1897`: Out-of-bounds Write in GitHub repository vim/vim prior to 8.2.
    * `CVE-2022-2000`: Out-of-bounds Write in GitHub repository vim/vim prior to 8.2.
    * `CVE-2022-2042`: Use After Free in GitHub repository vim/vim prior to 8.2.
    * `CVE-2023-48231`: Vim is an open source command line text editor. When closing a window, vim may try to access already freed window structure. Exploitation beyond crashing the application has not been shown to be viable. This issue has been addressed in commit 25aabc2b which has been included in release version 9.0.2106. Users are advised to upgrade. There are no known workarounds for this vulnerability.
    * `CVE-2023-48232`: Vim is an open source command line text editor. A floating point exception may occur when calculating the line offset for overlong lines and smooth scrolling is enabled and the cpo-settings include the 'n' flag. This may happen when a window border is present and when the wrapped line continues on the next physical line directly in the window border because the 'cpo' setting includes the 'n' flag. Only users with non-default settings are affected and the exception should only result in a crash. This issue has been addressed in commit cb0b99f0 which has been included in release version 9.0.2107. Users are advised to upgrade. There are no known workarounds for this vulnerability.
    * `CVE-2023-48236`: Vim is an open source command line text editor. When using the z= command, the user may overflow the count with values larger than MAX_INT. Impact is low, user interaction is required and a crash may not even happen in all situations. This vulnerability has been addressed in commit 73b2d379 which has been included in release version 9.0.2111. Users are advised to upgrade. There are no known workarounds for this vulnerability.
    * `CVE-2023-48237`: Vim is an open source command line text editor. In affected versions when shifting lines in operator pending mode and using a very large value, it may be possible to overflow the size of integer. Impact is low, user interaction is required and a crash may not even happen in all situations. This issue has been addressed in commit 6bf131888 which has been included in version 9.0.2112. Users are advised to upgrade. There are no known workarounds for this vulnerability.
    * `CVE-2023-48706`: Vim is a UNIX editor that, prior to version 9.0.2121, has a heap-use-after-free vulnerability. When executing a :s command for the very first time and using a sub-replace-special atom inside the substitution part, it is possible that the recursive :s call causes free-ing of memory which may later then be accessed by the initial :s command. The user must intentionally execute the payload and the whole process is a bit tricky to do since it seems to work only reliably for the very first :s command. It may also cause a crash of Vim. Version 9.0.2121 contains a fix for this issue.
    * `CVE-2023-48706`: Vim is a UNIX editor that, prior to version 9.0.2121, has a heap-use-after-free vulnerability. When executing a :s command for the very first time and using a sub-replace-special atom inside the substitution part, it is possible that the recursive :s call causes free-ing of memory which may later then be accessed by the initial :s command. The user must intentionally execute the payload and the whole process is a bit tricky to do since it seems to work only reliably for the very first :s command. It may also cause a crash of Vim. Version 9.0.2121 contains a fix for this issue.
    * `CVE-2023-48234`: Vim is an open source command line text editor. When getting the count for a normal mode z command, it may overflow for large counts given. Impact is low, user interaction is required and a crash may not even happen in all situations. This issue has been addressed in commit 58f9befca1 which has been included in release version 9.0.2109. Users are advised to upgrade. There are no known workarounds for this vulnerability.
    * `CVE-2023-48231`: Vim is an open source command line text editor. When closing a window, vim may try to access already freed window structure. Exploitation beyond crashing the application has not been shown to be viable. This issue has been addressed in commit 25aabc2b which has been included in release version 9.0.2106. Users are advised to upgrade. There are no known workarounds for this vulnerability.
    * `CVE-2023-46246`: Vim is an improved version of the good old UNIX editor Vi. Heap-use-after-free in memory allocated in the function ga_grow_inner in in the file src/alloc.c at line 748, which is freed in the file src/ex_docmd.c in the function do_cmdline at line 1010 and then used again in src/cmdhist.c at line 759. When using the :history command, it's possible that the provided argument overflows the accepted value. Causing an Integer Overflow and potentially later an use-after-free. This vulnerability has been patched in version 9.0.2068.
    * `CVE-2023-48235`: Vim is an open source command line text editor. When parsing relative ex addresses one may unintentionally cause an overflow. Ironically this happens in the existing overflow check, because the line number becomes negative and LONG_MAX - lnum will cause the overflow. Impact is low, user interaction is required and a crash may not even happen in all situations. This issue has been addressed in commit 060623e which has been included in release version 9.0.2110. Users are advised to upgrade. There are no known workarounds for this vulnerability.
    * `CVE-2022-1725`: NULL Pointer Dereference in GitHub repository vim/vim prior to 8.2.4959.
    * `CVE-2023-48232`: Vim is an open source command line text editor. A floating point exception may occur when calculating the line offset for overlong lines and smooth scrolling is enabled and the cpo-settings include the 'n' flag. This may happen when a window border is present and when the wrapped line continues on the next physical line directly in the window border because the 'cpo' setting includes the 'n' flag. Only users with non-default settings are affected and the exception should only result in a crash. This issue has been addressed in commit cb0b99f0 which has been included in release version 9.0.2107. Users are advised to upgrade. There are no known workarounds for this vulnerability.
    * `CVE-2022-2042`: Use After Free in GitHub repository vim/vim prior to 8.2.
    * `CVE-2022-2000`: Out-of-bounds Write in GitHub repository vim/vim prior to 8.2.
    * `CVE-2022-1886`: Heap-based Buffer Overflow in GitHub repository vim/vim prior to 8.2.
    * `CVE-2023-48233`: Vim is an open source command line text editor. If the count after the :s command is larger than what fits into a (signed) long variable, abort with e_value_too_large. Impact is low, user interaction is required and a crash may not even happen in all situations. This issue has been addressed in commit ac6378773 which has been included in release version 9.0.2108. Users are advised to upgrade. There are no known workarounds for this vulnerability.
    * `CVE-2023-48236`: Vim is an open source command line text editor. When using the z= command, the user may overflow the count with values larger than MAX_INT. Impact is low, user interaction is required and a crash may not even happen in all situations. This vulnerability has been addressed in commit 73b2d379 which has been included in release version 9.0.2111. Users are advised to upgrade. There are no known workarounds for this vulnerability.
    * `CVE-2022-1771`: Uncontrolled Recursion in GitHub repository vim/vim prior to 8.2.4975.
    * `CVE-2022-1897`: Out-of-bounds Write in GitHub repository vim/vim prior to 8.2.
    * `CVE-2023-48237`: Vim is an open source command line text editor. In affected versions when shifting lines in operator pending mode and using a very large value, it may be possible to overflow the size of integer. Impact is low, user interaction is required and a crash may not even happen in all situations. This issue has been addressed in commit 6bf131888 which has been included in version 9.0.2112. Users are advised to upgrade. There are no known workarounds for this vulnerability.

* `USN-6544-1` USN-6544-1: GNU binutils vulnerabilities:

    * `CVE-2022-38533`: In GNU Binutils before 2.40, there is a heap-buffer-overflow in the error function bfd_getl32 when called from the strip_main function in strip-new via a crafted file.
    * `CVE-2021-46174`: Heap-based Buffer Overflow in function bfd_getl32 in Binutils objdump 3.37.
    * `CVE-2022-35205`: An issue was discovered in Binutils readelf 2.38.50, reachable assertion failure in function display_debug_names allows attackers to cause a denial of service.
    * `CVE-2022-35205`: An issue was discovered in Binutils readelf 2.38.50, reachable assertion failure in function display_debug_names allows attackers to cause a denial of service.
    * `CVE-2020-19726`: An issue was discovered in binutils libbfd.c 2.36 relating to the auxiliary symbol data allows attackers to read or write to system memory or cause a denial of service.
    * `CVE-2021-46174`: Heap-based Buffer Overflow in function bfd_getl32 in Binutils objdump 3.37.
    * `CVE-2022-38533`: In GNU Binutils before 2.40, there is a heap-buffer-overflow in the error function bfd_getl32 when called from the strip_main function in strip-new via a crafted file.
    * `CVE-2022-4285`: An illegal memory access flaw was found in the binutils package. Parsing an ELF file containing corrupt symbol version information may result in a denial of service. This issue is the result of an incomplete fix for CVE-2020-16599.

* `USN-6543-1` USN-6543-1: GNU Tar vulnerability:
    * `CVE-2023-39804`: [A stack overflow vulnerability exists in GNU Tar up to including v1.34. The bug exists in the function xattr_decoder() in xheader.c, where alloca() is used and it may overflow the stack if a sufficiently long xattr key is used. The vulnerability can be triggered when extracting a tar/pax archive that contains such a long xattr key.]

## Platform Changes
---

This section is for the platform operators at `cloud.gov` to highlight changes to Cloud Foundry components, this is likely not of interest for developers using the platform.




### bosh-dns 1.36.11 to 1.36.12

* Updates golang package golang-1-linux to 1.21.6
* Updates golang package golang-1-windows to 1.21.6


### Bpm 1.2.12 to 1.2.13

* Updates golang package golang-1-linux to 1.21.6



### CAPI - v1.167.0 to v1.169.0

* CC API Version: 2.220.0 and 3.155.0
* Service Broker API Version: 2.15

CAPI Release

* Add legacy_md5_buildpack_paths_enabled param
* Fix rubocop configuration warning
* Add experimental jemalloc support

* Dependency Bumps
  * Bump Golang to go1.21.6
  * Bump Redis to 7.2.4
  * Bump rubocop from 1.59.0 to 1.60.0
  * Bump rubocop-rspec from 2.25.0 to 2.26.1

Cloud Controller

* Fix regression of clean up degenerate deployments
* Add process readiness changed controller and event
* Add tags to task logs
* Use xxhash64 instead of MD5 when calculating buildpack paths
* Fix the annotation migration for mysql
* Ensure uniqueness of labels and annotations 
* Dependency Bumps
  * Bump sequel from 5.75.0 to 5.76.0
  * Bump newrelic_rpm from 9.6.0 to 9.7.0
  * Bump puma from 6.4.1 to 6.4.2
  * Bump rubocop from 1.59.0 to 1.60.0
  * Bump rubocop-rspec from 2.25.0 to 2.26.1

cc-uploader

* Dependency Bumps
  * Bump github.com/onsi/ginkgo/v2 from 2.13.2 to 2.14.0


tps

* Watch for readiness health check changes
* Dependency Bumps
  * Bump github.com/onsi/ginkgo/v2 from 2.13.2 to 2.14.03

Cloud Controller Database Migrations

* `20240102150000_add_annotation_label_uniqueness.rb`


### cf-networking 3.39.0 to 3.40.0

* Bump to go 1.21.5, go dependency bumps


### CF-Smoketests 42.0.118 to 42.0.126

* Bump golang, cf-cli and smoke_tests packages


### Diego 2.87.0 to 2.88.0


* Reverted max_containers changes
* Bumps golang.org/x/crypto/ssh to v0.17.0 to address `CVE-2023-48795`.



### Log-cache 3.0.9 to 3.0.10

* Bump dependencies
* Bump packaged Golang to go1.21.6

### Loggregator-agent 7.7.3 to 8.0.1

* Bump packaged Golang to go1.21.6
* Bump dependencies
* Forwarder Agent: otelcolclient specifies that loggregator counters are monotonic in OTLP translation
* Loggregator Agent: if disabled, do not register ingress for Forwarder Agent or scraping with Prom Scraper


### Nats 56.14.0 to 56.15.0 

* Bump Golang to 1.21.6


### Prometheus 29.7.0 to 30.0.0

* Ubuntu Jammy is now used by default
    * removed ops file `/manifests/operators/use-jammy-stemcell.yml`
* various version bumps
    * Bump BPM to 1.2.12
    * Bump Consul-Exporter to 0.11.0
    * Bump Credhub-Exporter to 0.34.0
    * Bump Elasticsearch-Exporter to 1.7.0
    * Bump Grafana to 10.2.3
    * Bump Memcached-Exporter to 0.14.2
    * Bump MySQLD Exporter to 0.15.1
    * Bump Nginx to 1.25.3
    * Bump Postgres to 48
    * Bump Redis-Exporter to v1.56.0



### Routing 0.285.0 to 0.287.0

* Route-Registrar now supports specifying a nats server CA via the `nats.tls.ca_cert` property if it is not present via a BOSH link.
* The deprecated `/varz` and `/healthz` endpoints for gorouter on port 8080 have been removed
* The `/routes` endpoint on gorouter's port 8080 has been moved to port 8082, and is available only on localhost
* TLS certificates for gorouter + tcp_router's health endpoints are now required to deploy. Fortunately this is provided automatically in cf-deployment
* Changes
    * Fix a nil panic in gorouter
    * Adds availability zone info to endpoint data in gorouter
    * Speed up gorouter's route registry
    * Also more performance improvements to gorouter's route registry
    * Adds an always-on TLS capable healthcheck endpoint for gorouter on port 8443
    * Adds an always-on TLS capable healthcheck endpoint for tcp_router on port 443
    * Operators can now toggle off the non-tls healthcheck endpoint for gorouter via router.status.enable_nontls_health_checks
    * Operators can now toggle off the non-tls healthcheck endpoint for tcp_router via tcp_router.enable_nontls_health_checks

### Silk 3.39.0 to 3.40.0

* Bug fix: silk-datastore-syncer: fix assignment to entry in nil map in Metadata field. 
* Bug fix: Deduplicate Iptables Rules with Dynamic ASG's



### UAA 76.27.0 to 76.30.0

* Upgrade Tomcat to version 9.0.85
* Bump github.com/cloudfoundry/bosh-utils from 0.0.418 to 0.0.419 in /src/acceptance_tests
* Bump github.com/cloudfoundry/bosh-utils from 0.0.419 to 0.0.420 in /src/acceptance_tests
* Bump go directive version + bosh releases used in acceptance test manifest
* Bump nokogiri from 1.15.5 to 1.16.0
* Bump github.com/cloudfoundry/bosh-utils from 0.0.420 to 0.0.421 in /src/acceptance_tests by
* Bump github.com/cloudfoundry/bosh-utils from 0.0.421 to 0.0.423 in /src/acceptance_tests by
* Bump bigdecimal from 3.1.4 to 3.1.5 
* Bump golang.org/x/crypto from 0.16.0 to 0.17.0 in /src/acceptance_tests 

## Final Note

Hope you are sticking to your New Year's wishes!
