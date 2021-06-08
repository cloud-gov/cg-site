---
layout: post
title: "Changes to the Staticfile and NGINX Buildpack"
date: May 26, 2021
excerpt: Certain versions of NGINX will be removed in upcoming releases of the Cloud Foundry Staticfile and NGINX buildpacks.
---

The first release of the Staticfile and NGINX buildpacks after July, 5 2021 will no longer include NGINX versions 1.18.x and 1.19.x. These NGINX versions will no longer be supported [upstream](https://nginx.org/en/download.html).

As this change may impact some cloud.gov users, application owners are encouraged to migrate their Staticfile and NGINX to supported versions of NGINX before that time. 

Customers that experience issues, or that have questions about this change, can send a request to [support@cloud.gov](support@cloud.gov).