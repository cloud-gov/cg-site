+++
date = "2017-06-12"
title = "Platform Release Notes: June 12, 2017"
+++

Curious what’s new that you might find helpful as a cloud.gov application developer? Here are highlights from our platform updates over the past week and a half.
<!--more-->

### Changed

- [Static IP addresses for communicating with external apps](docs/apps/static-egress/): Outbound traffic from cloud.gov now comes from specific IP addresses to help customers open up a connection between cloud.gov and outside data centers.
- We verified that all tenants were migrated from East/West into GovCloud! Thank you to all our customers for their patience and cooperation in making this move successful.
- Make sure you upgrade your CloudFoundry CLI to [the latest version](https://github.com/cloudfoundry/cli/releases).

### Platform releases

cloud.gov now includes the following releases and upgrades. You will need to [restage your application](http://cli.cloudfoundry.org/en-US/cf/restage.html) to [incorporate fixes in the base filesystem](https://docs.cloudfoundry.org/devguide/deploy-apps/stacks.html#cli-commands) and ensure you’re running the most recent language version supported by your buildpack.

We upgraded the Cloud Foundry deployment to [v263](https://github.com/cloudfoundry/cf-release/releases/tag/v263).

#### Additional upgrades
- [RootFS cflinuxfs2 1.129.0](https://github.com/cloudfoundry/cflinuxfs2-rootfs-release/releases/tag/v1.129.0)
  - [USN-3309-1 Ubuntu Security Notice USN-3309-1](https://www.ubuntu.com/usn/USN-3309-1/)
    * [CVE-2017-6891](http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-6891.html): Two errors in the "asn1_find_node()" function (lib/parser_aux.c) within GnuTLS libtasn1 version 4.10 can be exploited to cause a stacked-based buffer overflow by tricking a user into processing a specially crafted assignments file via the e.g. asn1Coding utility.

- [Diego 1.18.0](https://github.com/cloudfoundry/diego-release/releases/tag/v1.18.0)
- Stemcell 3312.28
- Other CVEs remediated
  - [USN-3304-1: Sudo vulnerability](https://www.ubuntu.com/usn/USN-3304-1/)
    * [CVE-2017-1000367](http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-1000367.html): misparse of /proc/pid/stat leads to tty confusion attack

  - CF platform upgrade
    * [CVE-2017-4994](http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-4994.html): Forwarded Headers in UAA
  - [USN-3212-2 Ubuntu Security Notice USN-3212-2](https://www.ubuntu.com/usn/USN-3212-2/)
  - [USN-3302-1 Ubuntu Security Notice USN-3302-1](https://www.ubuntu.com/usn/USN-3302-1/)
    * [CVE-2017-7606](http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-7606.html): coders/rle.c in ImageMagick 7.0.5-4 has an "outside the range of representable values of type unsigned char" undefined behavior issue, which might allow remote attackers to cause a denial of service (application crash) or possibly have unspecified other impact via a crafted image.
    * [CVE-2017-7619](http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-7619.html): In ImageMagick 7.0.4-9, an infinite loop can occur because of a floating-point rounding error in some of the color algorithms. This affects ModulateHSL, ModulateHCL, ModulateHCLp, ModulateHSB, ModulateHSI, ModulateHSV, ModulateHWB, ModulateLCHab, and ModulateLCHuv.
    * [CVE-2017-7941](http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-7941.html): The ReadSGIImage function in sgi.c in ImageMagick 7.0.5-4 allows remote attackers to consume an amount of available memory via a crafted file.
    * [CVE-2017-7942](http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-7942.html): The ReadAVSImage function in avs.c in ImageMagick 7.0.5-4 allows remote attackers to consume an amount of available memory via a crafted file.
    * [CVE-2017-7943](http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-7943.html): The ReadSVGImage function in svg.c in ImageMagick 7.0.5-4 allows remote attackers to consume an amount of available memory via a crafted file.
    * [CVE-2017-8343](http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-8343.html): In ImageMagick 7.0.5-5, the ReadAAIImage function in aai.c allows attackers to cause a denial of service (memory leak) via a crafted file.
    * [CVE-2017-8344](http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-8344.html): In ImageMagick 7.0.5-5, the ReadPCXImage function in pcx.c allows attackers to cause a denial of service (memory leak) via a crafted file.
    * [CVE-2017-8345](http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-8345.html): In ImageMagick 7.0.5-5, the ReadMNGImage function in png.c allows attackers to cause a denial of service (memory leak) via a crafted file.
    * [CVE-2017-8346](http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-8346.html): In ImageMagick 7.0.5-5, the ReadDCMImage function in dcm.c allows attackers to cause a denial of service (memory leak) via a crafted file.
    * [CVE-2017-8347](http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-8347.html): In ImageMagick 7.0.5-5, the ReadEXRImage function in exr.c allows attackers to cause a denial of service (memory leak) via a crafted file.
    * [CVE-2017-8348](http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-8348.html): In ImageMagick 7.0.5-5, the ReadMATImage function in mat.c allows attackers to cause a denial of service (memory leak) via a crafted file.
    * [CVE-2017-8349](http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-8349.html): In ImageMagick 7.0.5-5, the ReadSFWImage function in sfw.c allows attackers to cause a denial of service (memory leak) via a crafted file.
    * [CVE-2017-8350](http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-8350.html): In ImageMagick 7.0.5-5, the ReadJNGImage function in png.c allows attackers to cause a denial of service (memory leak) via a crafted file.
    * [CVE-2017-8351](http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-8351.html): In ImageMagick 7.0.5-5, the ReadPCDImage function in pcd.c allows attackers to cause a denial of service (memory leak) via a crafted file.
    * [CVE-2017-8352](http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-8352.html): In ImageMagick 7.0.5-5, the ReadXWDImage function in xwd.c allows attackers to cause a denial of service (memory leak) via a crafted file.
    * [CVE-2017-8353](http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-8353.html): In ImageMagick 7.0.5-5, the ReadPICTImage function in pict.c allows attackers to cause a denial of service (memory leak) via a crafted file.
    * [CVE-2017-8354](http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-8354.html): In ImageMagick 7.0.5-5, the ReadBMPImage function in bmp.c allows attackers to cause a denial of service (memory leak) via a crafted file.
    * [CVE-2017-8355](http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-8355.html): In ImageMagick 7.0.5-5, the ReadMTVImage function in mtv.c allows attackers to cause a denial of service (memory leak) via a crafted file.
    * [CVE-2017-8356](http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-8356.html): In ImageMagick 7.0.5-5, the ReadSUNImage function in sun.c allows attackers to cause a denial of service (memory leak) via a crafted file.
    * [CVE-2017-8357](http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-8357.html): In ImageMagick 7.0.5-5, the ReadEPTImage function in ept.c allows attackers to cause a denial of service (memory leak) via a crafted file.
    * [CVE-2017-8765](http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-8365.html): The function named ReadICONImage in coders\icon.c in ImageMagick 7.0.5-5 has a memory leak vulnerability which can cause memory exhaustion via a crafted ICON file.
    * [CVE-2017-8830](http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-8830.html): In ImageMagick 7.0.5-6, the ReadBMPImage function in bmp.c:1379 allows attackers to cause a denial of service (memory leak) via a crafted file.
    * [CVE-2017-9098](http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-9098.html): ImageMagick before 7.0.5-2 and GraphicsMagick before 1.3.24 use uninitialized memory in the RLE decoder, allowing an attacker to leak sensitive information from process memory space, as demonstrated by remote attacks against ImageMagick code in a long-running server process that converts image data on behalf of multiple users. This is caused by a missing initialization step in the ReadRLEImage function in coders/rle.c.
    * [CVE-2017-9141](http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-9141.html): In ImageMagick 7.0.5-7 Q16, a crafted file could trigger an assertion failure in the ResetImageProfileIterator function in MagickCore/profile.c because of missing checks in the ReadDDSImage function in coders/dds.c.
    * [CVE-2017-9142](http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-9142.html): In ImageMagick 7.0.5-7 Q16, a crafted file could trigger an assertion failure in the WriteBlob function in MagickCore/blob.c because of missing checks in the ReadOneJNGImage function in coders/png.c.
    * [CVE-2017-9143](http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-9142.html): In ImageMagick 7.0.5-5, the ReadARTImage function in coders/art.c allows attackers to cause a denial of service (memory leak) via a crafted .art file.
    * [CVE-2017-9144](http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-9144.html): In ImageMagick 7.0.5-5, a crafted RLE image can trigger a crash because of incorrect EOF handling in coders/rle.c.
