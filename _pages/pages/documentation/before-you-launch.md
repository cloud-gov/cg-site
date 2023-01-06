---
title: Before you launch
permalink: /pages/documentation/before-you-launch/
layout: docs
navigation: pages
sidenav: pages-documentation
---

We've worked to make publishing a government site on Pages as simple as possible. Please note that while the entire process usually takes a couple days, it may take up to a week, so plan accordingly.

- [Requirements](#requirements)
- [Launch Process](#launch-process)
- [Launch Checklist](#launch-checklist)

## Requirements
- You must have an active, signed IAA with Pages. Sandbox accounts without IAAs will be unable to configure custom domains and preview urls are **not** suitable for production use.

- Your agency must accept the risk of launching a site on Pages. Be sure to follow your agency's procedures and guidelines for operating your site using Pages.

- You must understand [your responsibilities]({{ site.baseurl }}{% link _pages/pages/documentation/customer-responsibilities.md %}).

- Ensure you know how, or who to contact to make changes to the DNS configuration for your domain.

- If necessary, obtain a custom domain.

## Launch Process
1. Notify Pages support of your intent to launch along with your repository name/url and production-ready git branch via:
- email: `pages-support@cloud.gov`
- Slack: `#cg-pages`

2. Pages support will:
- initiate GSA IT-provided scans of the preview build and source code of your site to identify any vulnerabilites
- send you a brief site questionnaire that must be completed before continuing

3. Complete the site questionnaire and resolve all required vulnerabilities identified by the scans as identified by Pages Support (this may take several scans)

4. Complete the process of [adding your custom domain]({{ site.baseurl }}{% link _pages/pages/documentation/custom-domains.md %}). If you are migrating an existing site to Pages, make sure to review [minimizing downtime]({{ site.baseurl }}{% link _pages/pages/documentation/custom-domains.md %}#minimizing-downtime)

5. Your site will now be live!

6. A scan of your custom domain will be run by GSA IT just to verify the final configuration, then the Pages ISSO will share the Site Review document for your product owner to sign

6. Sign and return the Site Review document provided by the Pages ISSO


## Launch Checklist

1. Notify Pages support that you are ready to launch your site
2. Complete the site questionnaire provided to you by Pages support
3. Resolve any findings identified by vulnerability scans
4. [Configure your DNS]({{ site.baseurl }}{% link _pages/pages/documentation/custom-domains.md %}#configure-your-dns)
5. Notify Pages support
6. [Update your site settings]({{ site.baseurl }}{% link _pages/pages/documentation/custom-domains.md %}#update-your-site-settings)
7. Sign and return the Site Review document to the Pages ISSO