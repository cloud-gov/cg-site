---
title: Before you launch
permalink: /pages/documentation/before-you-launch/
layout: docs
navigation: pages
sidenav: pages-documentation
redirect_from:
  - /pages/using-federalist/launch-checklist/
  - /pages/documentation/launch-checklist/
---

We've worked to make publishing a government site on Federalist as simple as possible. Please note that while the entire process usually takes a couple days, it may take up to a week, so plan accordingly.

- [Requirements](#requirements)
- [Launch Process](#launch-process)
- [Launch Checklist](#launch-checklist)

## Requirements
- You must have an active, signed IAA with Federalist. Sandbox accounts without IAAs will be unable to configure custom domains and preview urls are **not** suitable for production use.

- Your agency must accept the risk of launching a site on Federalist. This requirement varies by agency, some will accept Federalist's GSA Agency ATO while others may require additional documentation.

- You must understand [your responsibilities]({{ site.baseurl }}{% link _pages/pages/documentation/customer-responsibilities.md %}).

- Ensure you know how, or who to contact to make changes to the DNS configuration for your domain.

- If necessary, obtain a custom domain.

## Launch Process
1. Notify Federalist support of your intent to launch along with your repository name/url and production-ready git branch via:
- email: `federalist-support@gsa.gov`
- Slack: `#federalist-support`

2. Federalist support will:
- initiate GSA IT-provided scans of the preview build and source code of your site to identify any vulnerabilites
- send you a brief site questionnaire that must be completed before continuing

3. Complete the site questionnaire and resolve all required vulnerabilities identified by the scans as identified by Federalist Support (this may take several scans)

4. Complete the process of [adding your custom domain]({{ site.baseurl }}{% link _pages/pages/documentation/custom-domains.md %}). If you are migrating an existing site to Federalist, make sure to review [minimizing downtime]({{ site.baseurl }}{% link _pages/pages/documentation/custom-domains.md %}#minimizing-downtime)

5. Your site will now be live!

6. A scan of your custom domain will be run by GSA IT just to verify the final configuration, then the Federalist ISSO will share the Site Review document for your product owner to sign

6. Sign and return the Site Review document provided by the Federalist ISSO


## Launch Checklist

1. Notify Federalist support that you are ready to launch your site
2. Complete the site questionnaire provided to you by Federalist support
3. Resolve any findings identified by vulnerability scans
4. [Configure your DNS]({{ site.baseurl }}{% link _pages/pages/documentation/custom-domains.md %}#configure-your-dns)
5. Notify Federalist support
6. [Update your site settings]({{ site.baseurl }}{% link _pages/pages/documentation/custom-domains.md %}#update-your-site-settings)
7. Sign and return the Site Review document to the Federalist ISSO