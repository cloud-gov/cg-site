---
permalink: /pages/
layout: wide
navigation: pages
title: cloud.gov Pages
redirect_from:
  - /pages/federalist-migration/

how_it_works:
  - name: Build
    image: /assets/images/pages/build-on-blue.svg
    image_alt: Hand building a website
    description: Use our templates or develop your own and publish your web page right away.
    link: /assets/documents/coe-success.pdf
    link_text: See how the Centers of Excellence (CoEs) used Pages to get new pages up quickly
  - name: Launch
    image: /assets/images/pages/launch-on-blue.svg
    image_alt: Hand launching a secure website with cloud.gov
    description: You focus on the content, we'll worry about the security, compliance, and deployment.
    link: /assets/documents/afwerx-success.pdf
    link_text: Learn how DoD leveraged the Pages platform to build their own template designs
  - name: Manage
    image: /assets/images/pages/manage-on-blue.svg
    image_alt: Hand using faders to manage website deployments
    description: Use our intuitive interface to control the process from start to finish.
    link: /assets/documents/doi-success.pdf
    link_text: Learn how DOI used a Pages template to host their data projects

case_studies:
  - name: AFWERX
    thumbnail: /assets/images/pages/afwerx-success-Thumbnail.png
    thumbnail_alt: AFWERX Success Story Thumbnail
    read_me_for: Challenges with government compliance, and cultural challenges switching to Cloud solutions
    link: /assets/documents/afwerx-success.pdf
  - name: Centers of Excellence
    thumbnail: /assets/images/pages/coe-success-Thumbnail.png
    thumbnail_alt: Centers of Excellence  Success Story Thumbnail
    read_me_for: Enhanced functionality, hands-on support, and modern design
    link: /assets/documents/coe-success.pdf
  - name: Department of the Interior
    thumbnail: /assets/images/pages/doi-success-Thumbnail.png
    thumbnail_alt: Department of Interior  Success Story Thumbnail
    read_me_for: How Pages adds value to my work as a content strategist
    link: /assets/documents/doi-success.pdf
agencies_using:
  - name: Department of Education
    seal: /assets/images/pages/500px-Education.png
  - name: Department of Homeland Security
    seal: /assets/images/pages/500px-DHS.png
  - name: Department of the Interior
    seal: /assets/images/pages/500px-DOI.png
  - name: Department of the Treasury
    seal: /assets/images/pages/500px-treasury.png
  - name: General Services Administration
    seal: /assets/images/pages/500px-GSA.png
  - name: National Science Foundation
    seal: /assets/images/pages/500px-NSF.png
  - name: Office of Personnel Management
    seal: /assets/images/pages/500px-OPM.png
  - name: Department of Defense
    seal: /assets/images/pages/DODc.gif
example_sites:
  - name: Performance.gov
    link: https://performance.gov
    screenshot: /assets/images/pages/performance.gov.png
  - name: Privacy and Civil Liberties Oversight Board
    link: https://www.pclob.gov
    screenshot: /assets/images/pages/pclob.gov.png
  - name: FedRAMP
    link: https://fedramp.gov
    screenshot: /assets/images/pages/fedramp.gov.png
  - name: CIO.gov
    link: https://cio.gov
    screenshot: /assets/images/pages/cio.gov.png
fact_sheets:
  - name: Pages proposal
    thumbnail: /assets/images/pages/Pages-Proposal-Thumbnail.png
    thumbnail_alt: Pages proposal fact sheet PDF document thumbnail
    pdfs:
      - link: /assets/documents/Pages-Proposal.pdf
        description: A two-page overview about Pages for stakeholder briefings
  - name: Pages basic diagram
    thumbnail: /assets/images/pages/how-pages-works-diagram-Thumbnail.png
    thumbnail_alt: Pages basic diagram fact sheet PDF document thumbnail
    pdfs:
      - link: /assets/documents/how-pages-works-diagram.pdf
        description: An outline of how all of Pages' parts work together.
  - name: Compliance memo & extension
    thumbnail: /assets/images/pages/pages-compliance-memo-Thumbnail.jpg
    thumbnail_alt: Compliance memo & extension fact sheet PDF document thumbnail
    pdfs:
      - link: /assets/documents/pages-compliance-memo.pdf
        description: Details about Pages' compliance and Authority to Operate.
      - link: /assets/documents/Federalist-ATO-Extension-Letter.pdf
        description: Pages's compliance and Authority to Operate extension.
---

<section class="usa-section">
  <div class="grid-container maxw-desktop">
    <div class="grid-row grid-gap">
      <div class="tablet:grid-col-7">
        <h1 class="font-heading-3xl">There’s no easier way to build, launch and manage government sites.</h1>
        <p class="usa-intro">
          Pages is a publishing platform for modern <a href="{{site.baseurl}}{% link _pages/pages/documentation/21st-century-idea.md %}">21st Century IDEA</a> websites.
        </p>
        <p class="padding-bottom-4">
          <a class="usa-button usa-button--big" href="https://pages.cloud.gov">Log in to dashboard</a>
        </p>
      </div>
      <div class="tablet:grid-col-4 tablet:grid-offset-1 usa-prose padding-5">
          <h3>Trusted and Scalable</h3>
          <ul class="margin-left-1">
            <li><b>134</b> production .gov sites</li>
            <li><b>9</b> federal agencies</li>
            <li><b>100+</b> million visitors per year</li>
            <li><b>400+</b> prototypes developed</li>
            <li><b>639+</b> updates per week</li>
          </ul>
      </div>
    </div>
  </div>
</section>

<section class="usa-graphic-list usa-section usa-section--dark">
<div class="grid-container maxw-desktop">
  <a name="How it works"></a>
  <div class="grid-row grid-gap">
    <h2>How it works.</h2>
  </div>
  <div class="grid-row grid-gap-lg">
    {% for item in page.how_it_works %}
      <div class="tablet:grid-col-4 margin-y-4">
        <div class="font-sans-sm text-heavy text-center"><span class="bg-primary display-inline-block padding-1 height-5 width-5 radius-pill">{{ forloop.index }}</span></div>
        <p class="font-sans-lg text-uppercase text-center">
          {{item.name}}
        </p>
        <img class="display-block margin-x-auto" src="{{site.baseurl}}{{item.image}}" alt="{{item.image_alt}}">
        <div class="padding-x-2">
          <p class="font-sans-xs line-height-sans-3">{{ item.description }}</p>
          <a class="display-block font-sans-3xs line-height-sans-4" href="{{site.baseurl}}{{item.link}}">{{ item.link_text }}</a>
        </div>
      </div>
    {% endfor %}
    </div>
  </div>
</section>

<section class="usa-section margin-y-8">
  <div class="grid-container maxw-desktop usa-prose">
      <h2>Launch your site in minutes.</h2>
      <a name="Customers"></a>
      <p>
        Pages uses a <a href="https://github.com/">public code hosting service</a> to load and store code for your site. If your code is already on GitHub, Pages can securely deploy a website from your repository in minutes.
      </p>
      <h3>Agencies using Pages</h3>
    <div class="grid-row grid-gap margin-bottom-3">
      {% for agency in page.agencies_using %}
      <div class="tablet:grid-col-3 text-center">
        <figure class="margin-0 padding-2">
          <img src="{{site.baseurl}}{{agency.seal}}" alt="Seal of the {{agency.name}}" height="64" width="64">
          <figcaption>{{agency.name}}</figcaption>
        </figure>
      </div>
      {% endfor %}
    </div>
    <a class="cg-arrow" href="{{site.baseurl}}/pages/success-stories/">See success stories of Pages-powered sites</a>
  </div>
</section>

<section class="usa-section margin-y-8">
  <div class="grid-container maxw-desktop">
    <h2>Customer Case Studies</h2>
    <a name="Case Studies"></a>
    <div class="grid-row grid-gap-lg">
      {% for study in page.case_studies %}
      <div class="tablet:grid-col-4 bar-top">
          <h3>{{study.name}}</h3>
          <a class="display-block border-1px border-base-lighter margin-y-2" href="{{site.baseurl}}{{study.link}}"><img class="display-block" src="{{site.baseurl}}{{study.thumbnail}}" alt="{{study.thumbnail_alt}}"></a>
          <p>
            <a href="{{site.baseurl}}{{study.link}}">{{ study.read_me_for }}</a>
          </p>
      </div>
      {% endfor %}
    </div>
  </div>
</section>

<section class="usa-section bg-accent-warm-light">
  <div class="grid-container maxw-desktop">
    <div class="grid-row">
      <div class="tablet:grid-col">
        <p class="usa-intro tablet:grid-col-10">
          Want to talk about what Pages can do for your agency? Questions about compliance? Want to try it out for yourself?
        </p>
        <p><a class="usa-button usa-button--big" href="{{site.baseurl}}/pages/contact/">Get in touch</a></p>
      </div>
    </div>
  </div>
</section>

<section class="usa-section margin-y-8">
  <div class="grid-container maxw-desktop usa-prose">
    <div class="grid-row">
      <h2>Kickstart your website with one of our templates.</h2>
      <p>
        Our accessible, customizable templates let you spend more time on your content.
      </p>
    </div>
    <div class="grid-row grid-gap margin-bottom-2">
    {% for example_site in page.example_sites %}
      <div class="tablet:grid-col-6 padding-2 text-center">
        <a class="border border-base-lighter display-block margin-bottom-1" href="{{example_site.link}}"><img class="display-block" src="{{site.baseurl}}{{example_site.screenshot}}" alt="Screenshot of {{example_site.name}}"></a>
        <a href="{{example_site.link}}">{{example_site.name}}</a>
      </div>
    {% endfor %}
    </div>
    <div class="grid-row">
      <a class="cg-arrow" href="{{site.baseurl}}/pages/documentation/templates/">See all templates</a>
    </div>
  </div>
</section>

<section class="usa-section margin-y-8">
  <div class="grid-container maxw-desktop usa-prose">
    <div class="grid-row">
      <h2>Pages fact sheets</h2>
      <p>
        Need more details about Pages? Need help convincing your executive team? The Pages team has developed these resources to help. See more on the <a href="{{site.baseurl}}/pages/documentation/">Pages support site</a>.
      </p>
    </div>
    <div class="grid-row grid-gap">
      {% for sheet in page.fact_sheets %}
      <div class="tablet:grid-col-4 bar-top">
        <div class="padding-2">
          <a href="{{site.baseurl}}{{sheet.pdfs[0].link}}" class="display-block margin-bottom-2"><img class="border border-base-lighter display-block" src="{{site.baseurl}}{{sheet.thumbnail}}" alt="{{sheet.thumbnail_alt}}"></a>
          <h3>{{sheet.name}}</h3>
          {% for pdf in sheet.pdfs %}
          <p>
            {{pdf.description}}
          </p>
          <a class="cg-arrow" href="{{site.baseurl}}{{pdf.link}}">Download PDF</a>
          {% endfor %}
        </div>
      </div>
      {% endfor %}
    </div>
  </div>
</section>


<script>

  if (location.search === "?b") {
    document.querySelector('#main-content > .usa-section:first-child').classList.add('usa-section--dark');
    document.querySelector('#main-content > .usa-section:nth-child(2)').classList.remove('usa-section--dark');
    document.querySelectorAll('.bg-primary.radius-pill').forEach(function(el) {
      el.classList.add('text-white');
    });

    document.querySelectorAll('img[src*="-on-blue.svg"]').forEach(function(el) {
      el.src = el.src.replace(/-on-blue/, '-on-white');
    });


    document.querySelectorAll('#main-content > .usa-section:nth-child(2) a[href]:not(.anchorjs-link)').forEach(function(el) {
      el.classList.add('cg-arrow');
    });
  } else if (location.search === '?c') {
      document.querySelector('#main-content > .usa-section:first-child').classList.add('usa-section--dark');
      document.querySelector('#main-content > .usa-section:nth-child(2)').classList.remove('usa-section--dark');
      document.querySelector('#main-content > .usa-section:nth-child(2)').classList.add('usa-section--light');
      document.querySelectorAll('.bg-primary.radius-pill').forEach(function(el) {
        el.classList.add('text-white');
      });

      document.querySelectorAll('img[src*="-on-blue.svg"]').forEach(function(el) {
        el.src = el.src.replace(/-on-blue/, '-on-white');
      });

      document.querySelectorAll('#main-content > .usa-section:nth-child(2) a[href]:not(.anchorjs-link)').forEach(function(el) {
        el.classList.add('cg-arrow');
      });

  }

</script>
