---
title: Migration Guide
permalink: /pages/documentation/migration-guide/
layout: docs
navigation: pages
sidenav: pages-documentation

---

Welcome to your migrating journey onto Pages! This process may be difficult. We generally cannot provide support for migration work beyond general guidance under a standard Pages agreement, but if you are in a situation where you need some guidance, you can [contact us](mailto:inquiries@cloud.gov) to learn more about our additional support packages.

## Before you start

Get a sense of how big your migration is before you start. How many pages does your site have? This will help you estimate how long it will reasonably take to migrate your content.

- To find this out, try searching with the query “site:[your domain]” and seeing how many pages are found
- Example: “site:18f.gsa.gov” shows that there are about 722 pages on 18F’s website
  - Note that blog tag pages or others may show up as individual pages, skewing the count

## Pages’ role

Pages is a backend hosting service that enables lots of flexibility with the look and feel of a hosted website. Pages is opinionated about the back end hosting of a site, so your code needs to be in a form that Pages can host, this can be static HTML/CSS/JS files or [supported site engines]({{site.baseurl}}/pages/documentation/supported-site-engines).

In general, we expect getting your site up as static files to be the quickest option, but static html can be very difficult to edit and maintain. Even though it takes more effort to initially convert your site content to a new format, using a site generator, such as Jekyll or Hugo, can ease the long-term maintenance burden of your site. For example, Jekyll and Hugo use templates to manage common content, so adding an item to a global menu can be done in one file instead of many.

## Planning the move

You should plan to move everything from your existing site into a format that Pages can publish, though. For larger sites, getting an export of the source of your old site might be essential.

Working with your current hosting provider, list out your options for exporting, which could include:
- Access to the source code
- Access to an export of the site
- Scraping your current site. (most difficult)

Ideally, to align with how most site generators work, the export will have your content in one set of files and the frontend html/css look/feel in another set of files.

## Building a Timeline

You should create a timeline for the site migration. This may be an opportunity to restructure how your content is organized or redesign the look and feel of the site. Think about how much time/work these additional tasks require.

You should plan a stopgap measure into your migration timeline. This could be a basic Pages setup with a landing page that provides information to key stakeholders or notifies visitors that work is in progress.

For these pages you can simply fork them on Github and reword the content in order to have it based on your website, or create your own static page to note the work in process. 18F can help you with your stopgap measure if you have a signed IAA.

## Testing the plan

Test your migration concept by first making one page and learning how to work with Pages. Try using setting up layouts and content separately. Once the first page is live on a prototype site, you can migrate other pages, but focus on completing one first so that you have a good sense of the effort required.

You should create a staging branch in your Github repo and create a pull request from that branch to your main branch. Then, migrate to the staging branch and push to main once you’ve confirmed everything is working correctly in staging. This will help you keep track of changes and provide and easy way to identify what is causing issues. You should push to main everyday.
- You may want to consider creating separate staging branches for content and for settings

Reserve time for the go live process. Plan few days before live launch to do a soft launch for stakeholders at a different URL.

## The migration team

Who you need in your migration team is based on the work involved in your specific migration. Generally, a migration PM is probably not necessary unless you are managing against a timeline.

- Basic migrations will probably only need front end developers if you can pull a good export of content. If you can't, you may need staff to help convert content.
- If you are also doing a site redesign and/or restricting content then you may need to bring on user experience designers, visual designers, content designers or more.
- If you are planning on bringing on extra developers for the migration, talk about the technologies you plan to use before bringing on contractors.

Your team will need the following access to get started:
- Access to Pages for each GitHub account involved in the migration
- The ability to create and/or edit the GitHub repo that Pages will be building

You are able to start working while IAA is being signed.

## Additional info

If your site has over 1 GB of files to serve you should look into another way to store those files. Github is not intended to store large amounts of files. More details are available in the [large file handling guide](/pages/documentation/large-file-handling/).
