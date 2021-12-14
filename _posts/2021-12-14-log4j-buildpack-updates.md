---
layout: post
date: December 14, 2021
title: "log4j Customer responsibility: Restage Java and PHP applications to Mitigate log4shell exploit" 
excerpt: Critical new updates have been released for the Java and PHP buildpacks and customers should restage their apps immediately.
---

Late last week, a serious new vulnerability referred to as "log4shell" was disclosed [targeting vulnerable versions of the popular log4j logging utility](https://nvd.nist.gov/vuln/detail/CVE-2021-44228). 

In response, the cloud.gov team has -- since last Friday -- applied a series of mitigations and updates to the platform, as described in our [most recent statuspage updates](https://cloudgov.statuspage.io/incidents/hc60k5316r34). These actions have secured our platform and afforded some protection to our customers without any need for customer intervention.

Today the Cloud Foundry community released patched versions of both the Java and PHP buildpacks, which are vulnerable to this new exploit. Upon their release, the cloud.gov team worked to make these new buildpacks available to customers immediately. 

Customers now need to take additional steps to further mitigate this vulnerability, and are advised to immediately restage their applications to pick up these new buildpack changes. The new buildpack versions are:

* Java buildpack - [version 4.44](https://github.com/cloudfoundry/java-buildpack/releases/tag/v4.44)
* PHP buildpack - [version 4.4.52](https://github.com/cloudfoundry/php-buildpack/releases/tag/v4.4.52)

Application owners can restage their applications [following the directions contained in the Cloud Foundry documentation](https://docs.cloudfoundry.org/devguide/deploy-apps/start-restart-restage.html#restage). After restaging, you can verify the version of buildpack being used by your application by inspecting the app details using `cf app {application-name}`.

In addition, CISA has released official guidance on this exploit, which [you can review here](https://www.cisa.gov/uscert/apache-log4j-vulnerability-guidance). 

Customers with additional questions or experiencing issues can reach out to support at [support@cloud.gov](mailto:support@cloud.gov).




