---
title: Build environment variables
permalink: /pages/documentation/env-vars-on-pages-builds/
layout: docs
navigation: pages
sidenav: pages-documentation
---

At the time your site is built, a number of special environment variables are exposed. You can access these environment variables with your build engine to customize your build (for instance, to add some special text to your site to show which branch has been built).


## Default environment variables

When Pages builds your site it makes available the following environment variables:

Name|Description
---|---
BRANCH|Github branch being built
OWNER|Owner of Github repository
REPOSITORY|Github repository
SITE_PREFIX|Path of s3 bucket in which your site will be deployed
BASEURL|Path for deployed site

## Adding custom environment variables

Additional environment variables can be added to your builds by:
1. Visit your site's Site Settings -> Environment Variables
2. Click "Add a new environment variable"
3. Enter the name and value
4. Click "Add" to save

You can remove environment variables by clicking the "X" button next to the desired environment variable in the Current Environment Variables table.

Certain environment variable names are reserved for Pages use and will be ignored. Warnings for any ignored environment variables will be present in the build logs. See above for an up-to-date list.

Pages is a **FISMA Low** system, do NOT store variables for systems that are Moderate or High, and only expose variables if it is safe to do so. You assume the risk if the values you add contain, or allow access to information that is not suitable for this categorization. See [FISMA Security Categorization](https://csrc.nist.gov/projects/risk-management/fisma-background) for more information on FISMA information categorization.

![Image of environment variable settings]({{site.baseurl}}/assets/pages/images/env-vars.png)
