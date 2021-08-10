---
title: Using Pages
permalink: /pages/documentation/
layout: docs
navigation: pages
sidenav: pages-documentation
redirect_from:
  - /pages/support/

---

## Getting started
After we execute an Inter-Agency Agreement (IAA), and you are a live customer, we will onboard you into our support process. Our goal is to provide you with support responses within one business day though we aspire to be faster in our responses. As a reminder, Pages agreements do not include labor hours, but we always want to make sure the platform is working and responsive to your needs as we consider new features.

In general, when helping out with support requests, it is always helpful for users to include:

- Full repository URL (like https://github.com/&lt;organization&gt;/&lt;repository&gt;)
- The custom domain being used, if any
- The name of the branch that is experiencing problems
- Full build logs for the failing build

When these points of information are not included, we often end up having to track them down, which slows down the debugging process. We may also ask you to add Pages staff to your repo with `write` privileges so that we can more quickly debug.

If questions exist regarding launch please email support after checking the launch checklist. 


## Getting authorized

Before you start using Pages, the Pages team needs to authorize you to use Pages, either for a live site or for testing during the sales process. This will happen as part of business development conversations with the Pages team or upon agreement execution.

## Adding a new site

When logging into Pages you will see a list of your existing sites along with a button to add a new site.


![Pages Sitelist Screenshot]({{site.baseurl}}/assets/pages/images/federalist-sitelist.png)


To add a new site, click the `+ Add Site` button and you will be prompted to either:
1. Create a site from existing Github repository by entering the repository URL
2. Choose an existing template from [available templates]({{site.baseurl}}/pages/documentation/templates/) by clicking 'Use this template' under a template.


![Pages Sitelist Screenshot]({{site.baseurl}}/assets/pages/images/federalist-makesite2.png)

After you pick a template or an existing repository to add to Pages, your new site will be built and added to your list of websites. If you don't see the new site in your list of websites, refresh the page. Sometimes there is a slight delay as your website finishes building.

## Content strategy

The first step to building a new site is to map a strategy for the site's content. 18F provides several resources to assist with this process.

The [18F method cards](https://methods.18f.gov/) are an overview of several different approaches for researching user needs and designing a website. This is often the best place to start for new projects.

The Pages team also provides a [content guide specifically for Pages websites]({{site.baseurl}}/pages/content-guide/). This guide will help you "convey what your team does, using language and tone that a general audience will understand, or how to think about what to write in each section of your new website."

## Managing site settings
![Pages Settings Screenshot]({{site.baseurl}}/assets/pages/images/federalist-settings.png)

The settings option for a site lets you adjust how Pages handles the site. These settings are for advanced functionality and most people will not need to change them.

### Basic settings

- **Live Site Branch** This is the branch of the site's repository that is built and hosted as the production version of the site. Other branches are considered drafts. Changing this value will rebuild the site using a different branch.

- **Repository Settings** Pages supports both public and private repositories. You can connect your private repository with Pages; however, we may ask that you share that repository with us so we'd be able to access it to better assist you. Ultimately, feel free to maintain your repositories as public and/or private.

- **Custom Domains** Enter domain (including https://; without a trailing slash) to host your website on a custom domain. For example, `https://example.gov`. When this setting is defined during the launch process, Pages will build your site so that links and images are loaded at the custom domain, and so that relative links are set according to the custom domain. For more about setting a custom domain, see the "[launch checklist]({{site.baseurl}}{% link _pages/pages/documentation/before-you-launch.md %})" section.

- **Demo Site** Pages allows you to specify a different branch and domain for a "demo site" that can be used to publicly preview your content at a URL of your choice, such as "preview.login.gov." Launch of a demo URL works just like a live URL from a security standpoint.

### Advanced settings

- **Site Engine** This controls if and how Pages builds your site. Currently, the following options are supported:
  - **Hugo** - builds your site with [Hugo](https://gohugo.io/)
  - **Jekyll** - builds your site with [Jekyll](http://jekyllrb.com)
  - **Node.js** - runs a [Node](https://nodejs.org) script
  - **Static HTML** - serves pre-generated content

If using one of the Pages provided templates, this should always be "**Jekyll**". The site engine should not be altered once your site is live. Contact the Pages team for additional support. 

- **Custom configuration (site and preview)** For advanced Jekyll users, you can append different settings to your `_config.yml` configuration during build. This configuration is stored in Pages, so you may use it to store settings that you don't want to commit to your GitHub repository. Pages automatically adds a `branch` attribute with the name of the rendered branch, accessible in templates as `site.branch`.
