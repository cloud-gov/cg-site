---
layout: post
date: December 14, 2021
title: "Buildpack Updates to Mitigate log4shell exploit" 
excerpt: Critical new updates have been released for the Java and PHP buildpacks and customers should restage their apps immediately.
---

In response to the [recently announced exploit targeting vulnerable versions of the log4j logging utility](https://github.com/advisories/GHSA-jfh8-c2jp-5v3q), the Cloud Foundry community today released patched versions of both the Java and PHP buildpacks. Customers are advised to immediately restage their applications to pick up these changes, which mitigate this new exploit. The new buildpack versions are:

* Java buildpack - [version 4.44](https://github.com/cloudfoundry/java-buildpack/releases/tag/v4.44)
* PHP buildpack - [version 4.4.52](https://github.com/cloudfoundry/php-buildpack/releases/tag/v4.4.52)

 The cloud.gov team immediately worked to make these new buildpack releases available to customers. Application owners can restage their applications [following the directions contained in the Cloud Foundry documentation](https://docs.cloudfoundry.org/devguide/deploy-apps/start-restart-restage.html#restage). After restaging, you can verify the version of buildpack being used by your application by inspecting the app details using `cf app {application-name}`.

Customers with additional questions or experiencing issues can reach out to support at [support@cloud.gov](mailto:support@cloud.gov).



