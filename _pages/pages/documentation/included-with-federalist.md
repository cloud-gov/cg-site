---
title: Included with Federalist
permalink: /pages/documentation/included-with-federalist/
layout: docs
navigation: pages
sidenav: pages-documentation
redirect_from: 
  - /pages/using-federalist/included-with-federalist/

---

* An automatic deployment mechanism for static site assets and [supported site engines]({{site.baseurl}}/pages/documentation/supported-site-engines).
* Web-based configuration and access to preview builds.
* An agency Authority to Operate (ATO) for Federalist's hosting, leveraging the cloud.gov System Security Plan (SSP), with a short process to add new sites to the ATO documentation.
* Premade templates for your sites, in addition to the many sites you can copy in creating your site. All templates now have Netlify CMS support built in, allowing content creators to make site changes without requiring extensive html, CSS, or YAML experience.
* Automatically adds additional request headers to improve site security.
  * `Strict-Transport-Security max-age=31536000; preload;`
  * `X-Frame-Options "SAMEORIGIN";`
* Easy on-boarding or off-boarding: Federalist can deploy content from existing GitHub repositories used with other tools. Your Federalist site will also be easy to port to another deployment mechanism if that's ever needed.
* Content delivery network support for your desired URL, with custom 404 page (see [customization]({{site.baseurl}}/pages/documentation/customization/)).
* A user community across agencies and vendors using Federalist.
* A permanent team to maintain and patch Federalist as needed.
* GSA's previous work to build [cloud.gov]({{ site.baseurl }}), a robust and secure platform as a service, recognized with a FedRAMP Moderate (DISA Level 2) PATO, that ensures Federalist's underlying technology is secure, performant, and scalable.

## Not included with Federalist

### Large file hosting
GitHub isn't generally set up to host more than a gigabyte of file content and Federalist's build container can't accommodate extremely large repositories in the build process. Instead, you should store very large files separately and link to them from your Federalist site.

### Code editing tools
While it is possible to edit files directly in Github, in practice, this is cumbersome and limited. A local development environment will improve your efficiency when editing code, provide faster feedback for frequent changes, and enable a better debugging experience. Static site engines, such as Jekyll or Node-based tools, require you to have a local environment to ensure that the dependencies of your project are managed properly.
