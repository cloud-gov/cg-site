---
title: Search on Pages Sites
permalink: /pages/documentation/search/
layout: docs
navigation: pages
sidenav: pages-documentation
---

It's easy to add search functionality to a site.

We recommend using [Search.gov][], a free site search and search analytics service for federal web sites. You will need to [register](https://search.usa.gov/signup) for Search.gov and follow their [instructions](https://search.gov/get-started/searchgov-for-cloudgov-pages.html) to integrate this service with your Pages site. For full details, visit [Search.gov][]. 

If you'd prefer another solution, you can configure a tool like [lunrjs](https://lunrjs.com/) that creates a search function run using the client browser. An example of this is at the [18F blog](https://18f.gsa.gov/blog/). This avoids any dependency on another service, but the search results are not as robust.

[Search.gov]: https://search.gov/

**Crawl/Index Pages sites**

Pages automatically handles search engine visibility for preview URLs via the Pages proxy. For traffic  served through a preview site, the Pages proxy automatically serves the appropriate HTTP robots header, `robots:none`. Preview URLs are not crawlable or indexable by design. Only webpages on the production domain are served with the `robots: all` directive, indicating to crawlers and bots such as search.gov to index the site and enable search capabilities. 

{% capture search_table_content %}
<tr>
    <th scope="row">1</th>
    <td><p> <strong>robots.txt in your Pages site</strong> <br> <br> Discourages robots from crawling the page or pages listed. Webpages that aren’t crawled generally can’t be indexed.</p></td>
    <td><code>User-agent: *</code><code>disallow: / directory</code></td>
    <td>N/A, crawling is allowed by default</td>
</tr>
<tr>
    <th scope="row">2</th>
    <td><p> <strong>X-Robots-Tag HTTP header (served by Pages via the Pages proxy)</strong> <br> <br> Encourages or discourages robots to read and index the content on this page or use it to find more links to crawl.</p></td>
    <td><code>robots: none</code>(this is automatically served to  visitors of all Pages preview builds) </td>
    <td><code> robots: all</code>(this is automatically served to visitors of custom/production domains)</td>
</tr>
<tr>
<th scope="row">3</th>
    <td><p> <strong>&lt;meta name="robots"&gt; in your Pages site webpage HTML</strong> <br> <br> Discourages robots from crawling the page or pages listed. Webpages that aren’t crawled generally can’t be indexed.</p></td>
    <td><code>content="noindex, nofollow”</code></td>
    <td>N/A, indexing is allowed by default</td>
</tr>
{% endcapture %}

{% include content-table.html
  caption="Search with Pages"
  header1="Priority"
  header2="Method to manage robot behavior"
  header3="How to <u>prevent</u> indexing/crawling"
  header4="How to <u>allow</u> indexing/crawling"
  content=search_table_content %}

If you want to disable crawling and indexing for specific pages of your production site, you can include the `noindex/nofollow` meta tag in the head of those pages, or include those folders in your robots.txt, if your site generates one.

**Conditionally set robots - Eleventy (11ty)** 

Take advantage of Pages-provided environment variables to enable environment-specific functionality. Hardcode the condition and meta tags to check the branch from the `process.env` environment variable. This differs from how it is dealt with on a Jekyll site, you are able to add specificity with `process.env.BRANCH`.
You can use this code sample 
```
{% unless process.env.BRANCH == "main" %}
  <meta name="robots" content="noindex, nofollow">
{% endunless %}
```
See additional documentation on [build environment variables](https://cloud.gov/pages/documentation/env-vars-on-pages-builds/).