---
title: Included with Pages
permalink: /pages/documentation/included-with-pages/
layout: docs
navigation: pages
sidenav: pages-documentation

---

* An automatic deployment mechanism for static site assets and [supported site engines]({{site.baseurl}}/pages/documentation/supported-site-engines).
* Web-based configuration and access to preview builds.
* Premade templates for your sites, in addition to the many sites you can copy in creating your site. All templates now have Netlify CMS support built in, allowing content creators to make site changes without requiring extensive html, CSS, or YAML experience.
* Automatically adds additional request headers to improve site security.
  * `Strict-Transport-Security max-age=31536000; preload;`
  * `X-Frame-Options "SAMEORIGIN";`
* Easy on-boarding or off-boarding: Pages can deploy content from existing GitHub repositories used with other tools. Your Pages site will also be easy to port to another deployment mechanism if that's ever needed.
* Content delivery network support for your desired URL, with custom 404 page (see [customization]({{site.baseurl}}/pages/documentation/customization/)).
* A user community across agencies and vendors using Pages.
* A permanent team to maintain and patch Pages as needed.
* GSA's previous work to build [cloud.gov]({{ site.baseurl }}), a robust and secure platform as a service, recognized with a FedRAMP Moderate (DISA Level 2) PATO, that ensures Pages' underlying technology is secure, performant, and scalable.

## Not included with Pages

### Large file hosting
GitHub isn't generally set up to host more than a gigabyte of file content and Pages' build container can't accommodate extremely large repositories in the build process. Instead, you should store very large files separately and link to them from your Pages site.

### Code editing tools
While it is possible to edit files directly in Github, in practice, this is cumbersome and limited. A local development environment will improve your efficiency when editing code, provide faster feedback for frequent changes, and enable a better debugging experience. Static site engines, such as Node.js based, Hugo, or Jekyll, require you to have a local environment to ensure that the dependencies of your project are managed properly.
