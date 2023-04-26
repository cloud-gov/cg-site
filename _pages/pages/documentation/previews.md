---
title: Builds and Previews
permalink: /pages/documentation/previews/
layout: docs
navigation: pages
sidenav: pages-documentation

---

## Site previews 

_Every_ branch in a Pages-enabled GitHub repo is built by Pages with
a site preview.

Site preview links will auto-generate within pull requests. To see them, scroll to
the bottom of your pull request and click "show all checks", then click on
"details" to the right of the Pages check. The site preview is only
available after a build reports completion, usually within a few minutes.

![Pages preview screenshot]({{site.baseurl}}/assets/images/pages/federalist-preview.png)

You can also find links to site previews in the "GitHub Branches" page after
logging into Pages.

{% capture content %}
For security reasons, site previews are unavailable with pull requests from
forked repositories.
{% endcapture %}
{% include pages/components/alert--note.html content=content %}

## Builds and Logs
Build history and logs for every build are available in the Pages web application. Note: build logs will only be available for **180** days after the build completes.

![Build logs screenshot]({{site.baseurl}}/assets/images/pages/buildlogs.png)