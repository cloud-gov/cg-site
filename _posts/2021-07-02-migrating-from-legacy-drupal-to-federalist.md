---
layout: post
title: "Migrating from Legacy Drupal to Federalist"
date: July 2, 2021
excerpt: "With the end of life dates for Drupal versions 7 and 8 fast approaching, this tech talk will discuss strategies for migrating from legacy versions of Drupal to the Federalist platform."
---

**Note - this blog post includes content originally presented during a cloud.gov / Federalist tech talk on June 17th, 2021.**

Drupal is a commonly used content management system (CMS) in the Federal government. Many existing Drupal sites are still using older, outdated versions of the CMS and site owners may be facing challenges with upgrading to the latest version. In addition, because Drupal is a multi-tiered web application, it has multiple components that must be managed and maintained, adding to complexity and support costs.

With the [end of life dates for Drupal versions 7 and 8 fast approaching](https://www.drupal.org/psa-2020-06-24){:target="_blank"}, Drupal site owners should understand the options they have for migrating to new, simplified, more modern web platforms. This post will discuss migrating from Drupal to the Federalist platform, and will run through a simple example of how such a migration can be accomplished.

This post will demonstrate how to use some of the commonly available Drupal migration tools to export content from a legacy Drupal site and import the content to a new Federalist starter template. We will discuss some of the issues that Drupal site owners should evaluate when considering a migration to a new platform.

## Drupal 7 / 8 end of life

The end of life date for both Drupal 7 and 8 is fast approaching. Drupal 8 wil reach it's scheduled end of life on November 2, 2021. Drupal 7 wil reach it's scheduled end of life on November 28, 2022 (after being extended for a period of about 1 year).

As the challenges and work required to upgrade to the latest version of Drupal are considered by agencies, other platform options may also be evaluated. One potential option for current Drupal users is the [Federalist platform](https://federalist.18f.gov/){:target="_blank"} (soon to be renamed to [cloud.gov Pages](https://federalist.18f.gov/cloud-gov-pages/)){:target="_blank"}.

## What is Federalist?

Federalist is a publishing platform for modern government websites. In a matter of hours, you can publish a website that’s 21st Century IDEA Act and 508-compliant, comes with a built-in Authority to Operate (ATO), and hosted on a secure and FedRAMP-authorized cloud infrastructure.

Federalist provides the following useful features out of the box:

* Github integration
* Battle-hardened infrastructure (S3, Cloudfront)
* Free, auto-renewed SSL certificates
* Robust ATO
* USWDS Starter kits with built-in integrations with Search.gov and GSA Digital Analytics Program.
* Helpful support

## When is Federalist right for you?

If your agency is considering migrating away from Drupal, Federalist might be a good choice for you if:

* You are managing an informational site, with frequent updates and changes
* You are using Github (or are able to), and want more control over versioning of your website
* You need to support both technical and non-technical content creators / reviewers / editors
* You need a highly-performant site
* You have limited capacity to manage infrastructure 
* You need a simplified ATO process*

## When is Federalist not right for you?

Federalist does have some limitations, so depending on your agency's specific use of Drupal, Federalist may not be a good fit. If you need to do the following, Federalist may not be a viable migration target from Drupal:

* You need to authenticate users, and manage user accounts
* You need to show different content to different users (user authorization)
* You need a server (or something that as the characteristics of a server)
* You have other unique requirements (e.g., software licensing)

## Getting from Drupal to Federalist

Migrating from Drupal to Federalist will be different for each agency using Drupal, based on how your current Drupal website is configured and managed. Generally speaking, the following steps encompass the process of moving from Drupal to the Federalist platform:

* Review / audit existing content
* Identify appropriate migration tool (lots of options)
* Modify and update content (as needed)
* Identify static site generator
* Choose a starter template or design system
* Bring content into Federalist site framework
* Publish to Federalist (push to GitHub)

## Issues and Considerations

Before migrating, there are a number of factors you should take into consideration.

* You may need to conduct a content inventory so you'll know what materials you currently have, and what you need to migrate over
* Check your list of current enabled modules, to see if any provide functionality critical to your site 
    - Modules can provide added functionality that you want to make sure you have accounted for.
    - Some modules (ex: paragraphs) can add extra markup. Make sure you have accounted for this.
* Plan for taxonomic structure (11ty / netlify / static CMSs almost all have tagging structure)
* Update any in-content links to new links
* Migrating users, permissions, etc.
* Working out a new workflow for publishing
* Form submits (does your site use them currently)

## Find out more 

The cloud.gov and Federalist team is ready to help you as you evaluate your options for current Drupal 7 and 8 websites. 

In addition, the following resources are also available for agencies:

* [Federalist](https://federalist.18f.gov/){:target="_blank"}
* Static site generators
    - [Tome](https://tome.fyi/){:target="_blank"}
    - [Netlify](ttps://www.netlify.com/){:target="_blank"} 
    - [Hugo](https://gohugo.io/){:target="_blank"} 
    - [Gatsby](https://www.gatsbyjs.com/){:target="_blank"} 
* Drupal export / migration tools:
    - [Markdown Exporter](https://www.drupal.org/project/markdown_exporter){:target="_blank"} 
    - [Migrate Git](https://www.drupal.org/project/migrate_git){:target="_blank"}

Questions or inquiries can be sent to [federalist-inquiries@gsa.gov](federalist-inquiries@gsa.gov).