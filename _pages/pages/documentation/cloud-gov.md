---
title: Pages and cloud.gov
permalink: /pages/documentation/cloud-gov/
layout: docs
navigation: pages
sidenav: pages-documentation
---

As mentioned elsewhere, Pages is built on top of the [cloud.gov platform-as-a-service]({{ site.baseurl }}) (PaaS). cloud.gov takes care of the vast majority of the systems functionality that enables Pages, especially by maintaining a FedRAMP authorization. cloud.gov also provides security, logging, authentication, cryptographic protection, monitoring, and provisioning services that Pages consumes. Federalist's [compliance memo]({{site.baseurl}}/assets/pages/documents/pages-compliance-memo.pdf) & [extension letter]({{site.baseurl}}/assets/pages/documents/Federalist-ATO-Extension-Letter.pdf) explains the technical relationship in detail.

## How Pages and cloud.gov collaborate

cloud.gov provides a general platform for sites with embedded compliance, but because it allows some flexibility, every system on cloud.gov must do some individual work to complete required compliance work. By narrowing focus to a more specific scope of customer needs, Pages can manage all needed compliance work for partners, enabling sites to launch quickly.

cloud.gov, in turn, can refer potential customers to Pages and enable them to save time and money when their needs are met by Pages. Pages has extended the impact of cloud.gov by launching and managing nearly 100 government sites with great efficiency.

## When you should use cloud.gov

Sometimes, customer needs may justify using both a cloud.gov system and Pages site, especially when showing data visualizations sourced from an API. Working together, a API server and Pages site can provide all of the functionality of a web server with a much smaller attack surface. You should consider using cloud.gov with Pages when you need to receive/store information from site users in a custom system, or when you want your Pages site to work together with an API.

If your site involves content that shouldn't be public, or primarily involves complex user interactions, it may be better to directly leverage cloud.gov. You can find detailed contact help at [their site]({{ site.baseurl }}/docs/help/).
