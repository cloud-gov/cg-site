---
layout: post
title: Faster build times on cloud.gov Pages
date: February 21, 2023
excerpt: We advertise that cloud.gov Pages, previously known as Federalist, can “securely deploy a website from your repository in minutes.” Getting your content on the web quickly, seeing fast previews, and even seeing errors early are all important to good maintenance of a website
---

We advertise that [cloud.gov Pages](https://cloud.gov/pages), previously known as Federalist, can “securely deploy a website from your repository in minutes.” Getting your content on the web quickly, seeing fast previews, and even seeing errors early are all important to good maintenance of a website. But as sites become larger and more complex, this can be a difficult task. We’ve made two recent changes to cloud.gov Pages to make website deployment faster so you can focus on your code, design, and content.

## Differential publishing

Static site generators, like those frequently used with cloud.gov Pages, generate each website page in advance. We then copy each page to our hosting service so it can appear online. If we want to save time, we can choose to only copy the page if we can tell that it changed from the previous build.

Starting in late 2020, cloud.gov Pages was publishing every file individually. We did this because a new feature for [adding headers](https://cloud.gov/pages/documentation/custom-headers/) prevented us from quickly comparing whether files had changed. This past October, we made a change to return to only publishing changed files if sites weren’t using the header feature.

Sites like [digital.gov](https://digital.gov/), with over 20,000 files, had been taking seventeen minutes on each build! Now their builds update about one-third of the total files and have brought the build times down to seven or eight minutes. Across our whole portfolio, production sites deployment saw 25% faster builds, saving 1 minute 40 seconds on average.

<div class="border bg-white padding-2 margin-bottom-2 margin-top-1 radius-md padding-bottom-0 maxw-tablet">

<h4 class="margin-0">Median Build Times for Digital.gov by Month</h4>
<p class="margin-top-1 font-sans-2xs text-base margin-bottom--3">Digital.gov was taking seventeen minutes to build on cloud.gov Pages with most of the time spent uploading new files. After the October release of the differential publishing, build times were reduced to about seven or eight minutes.</p>

<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: D3.js v3 + https://designsystem.digital.gov/components/data-visualizations/ -->
<svg version="1.1" id="LineChart" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
 viewBox="0 0 1020.29 660.46" style="enable-background:new 0 0 1020.29 660.46; margin-top:-50px;" xml:space="preserve" aria-hidden="true">
<style type="text/css">
.line-st0{fill:none;stroke:#71767a;stroke-miterlimit:10;}
.line-st0-light{fill:none;stroke:#dfe1e2;stroke-miterlimit:10;}
.line-st2{font-size:27px;}
.line-st4{fill:none;stroke:#005EA2;stroke-width:5;stroke-linecap:round;stroke-miterlimit:10;}
.line-st5{fill:none;stroke:#005EA2;stroke-width:6;stroke-linecap:round;stroke-miterlimit:10;}
.line-st7{fill:#005EA2;}
.line-st8{font-size:24px;}
.font-svg-main{font-size:26px;}
</style>
<g id="Roosevelts">
<g>
  <line class="line-st0" x1="69.45" y1="574.89" x2="971.08" y2="574.89"/>
</g>
<g>
  <g>
    <text transform="matrix(1 0 0 1 41.5112 586.7432)" class="line-st1 line-st2">0</text>
    <text transform="matrix(1 0 0 1 41.5112 468.05)" class="line-st1 line-st2">5</text>
    <text transform="matrix(1 0 0 1 27.6606 351.21)" class="line-st1 line-st2">10</text>
    <text transform="matrix(1 0 0 1 27.6606 234.37)" class="line-st1 line-st2">15</text>
    <text transform="matrix(1 0 0 1 27.6606 119.375)" class="line-st1 line-st2">20</text>
  </g>
  <line class="line-st0" x1="69.45" y1="574.89" x2="69.45" y2="107.53" stroke-width='1px' vector-effect="non-scaling-stroke"/>
  <g>
    <g>
      <line class="line-st0" x1="69.45" y1="574.89" x2="971.08" y2="574.89" stroke-width='1px' vector-effect="non-scaling-stroke"/>
      <line class="line-st0-light" x1="69.45" y1="458.05" x2="971.08" y2="458.05" stroke-width='1px' vector-effect="non-scaling-stroke"/>
      <line class="line-st0-light" x1="69.45" y1="341.21" x2="971.08" y2="341.21" stroke-width='1px' vector-effect="non-scaling-stroke"/>
      <line class="line-st0-light" x1="69.45" y1="224.37" x2="971.08" y2="224.37" stroke-width='1px' vector-effect="non-scaling-stroke"/>
      <line class="line-st0-light" x1="69.45" y1="107.53" x2="971.08" y2="107.53" stroke-width='1px' vector-effect="non-scaling-stroke"/>
    </g>
    <g>
    </g>
  </g>
</g>
<g>
  <g>
    <g>
        <line class="line-st4" x1="133.85" y1="221.05" x2="228.48" y2="205.61"></line>
        <line class="line-st4" x1="228.48" y1="205.61" x2="326.27" y2="182.82"></line>
        <line class="line-st4" x1="326.27" y1="182.82" x2="424.06" y2="175.89"></line>
        <line class="line-st4" x1="424.06" y1="175.89" x2="518.6" y2="174.94"></line>
        <line class="line-st4" x1="518.69" y1="174.94" x2="616.47" y2="375.95"></line>
        <line class="line-st4" x1="616.47" y1="375.95" x2="711.11" y2="408.16"></line>
        <line class="line-st4" x1="711.11" y1="408.16" x2="808.89" y2="408.65"></line>
        <line class="line-st4" x1="808.89" y1="408.65" x2="906.68" y2="416.77"></line>
    </g>
  </g>
</g>
<g>
  <g>
    <g>
        <circle class="line-st7" cx="133.85" cy="221.05" r="8"></circle>
        <circle class="line-st7" cx="228.48" cy="205.61" r="8"></circle>
        <circle class="line-st7" cx="326.27" cy="182.82" r="8"></circle>
        <circle class="line-st7" cx="424.06" cy="175.89" r="8"></circle>
        <circle class="line-st7" cx="518.69" cy="174.94" r="8"></circle>
        <circle class="line-st7" cx="616.47" cy="375.95" r="8"></circle>
        <circle class="line-st7" cx="711.11" cy="408.16" r="8"></circle>
        <circle class="line-st7" cx="808.89" cy="408.65" r="8"></circle>
        <circle class="line-st7" cx="906.68" cy="416.77" r="8"></circle>
    </g>
  </g>
</g>
<g>
  <text class="font-svg-main" transform="matrix(1 0 0 1 113.85 613.895)">Jun</text>
  <text class="font-svg-main" transform="matrix(1 0 0 1 208.48 613.895)">Jul</text>
  <text class="font-svg-main" transform="matrix(1 0 0 1 306.27 613.895)">Aug</text>
  <text class="font-svg-main" transform="matrix(1 0 0 1 404.06 613.895)">Sep</text>
  <text class="font-svg-main" transform="matrix(1 0 0 1 498.69 613.895)">Oct</text>
  <text class="font-svg-main" transform="matrix(1 0 0 1 596.47 613.895)">Nov</text>
  <text class="font-svg-main" transform="matrix(1 0 0 1 691.11 613.895)">Dec</text>
  <text class="font-svg-main" transform="matrix(1 0 0 1 788.89 613.895)">Jan</text>
  <text class="font-svg-main" transform="matrix(1 0 0 1 886.68 613.895)">Feb</text>
</g>
</g>
</svg>

  <table class="usa-sr-only" aria-describedby="source_line">
    <caption>Median Build Times for Digital.gov by Month</caption>
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">June</th>
        <th scope="col">July</th>
        <th scope="col">August</th>
        <th scope="col">September</th>
        <th scope="col">October</th>
        <th scope="col">November</th>
        <th scope="col">December</th>
        <th scope="col">January</th>
        <th scope="col">February</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Median build times in minutes</th>
        <td>15.1</td>
        <td>15.8</td>
        <td>16.8</td>
        <td>17.1</td>
        <td>17.1</td>
        <td>8.5</td>
        <td>7.1</td>
        <td>7.1</td>
        <td>6.8</td>
      </tr>
    </tbody>
  </table>
  <p id="source_line">Source: internal cloud.gov Pages analytic data</p>
</div>

## Caching build dependencies

Sites were installing all required custom software dependencies on each build. This process commonly takes about two or three minutes. We replaced this step with a new opt-out caching strategy:
- If your dependencies didn’t change from the previous build, we’ll re-download the prior package from a secure cache. This takes about fifteen seconds
- If your dependencies did change, which doesn’t happen often, we’ll re-install them.
- Because downloading dependencies from a cache can create some errors, we have an [option to opt-out](https://cloud.gov/pages/documentation/cache-dependencies/#configuration). 

We just recently added this change, so we’re still waiting to see the full metrics on how it’s improved build time. But many sites using the popular [Jekyll framework](https://jekyllrb.com/) have seen their build time reduced by about three minutes. You can see the effect of both of these changes in our median build time since June of last year:

<div class="border bg-white padding-2 margin-bottom-2 margin-top-1 radius-md padding-bottom-0 maxw-tablet">

<h4 class="margin-0">Median Build Times for cloud.gov Pages Sites by Month</h4>
<p class="margin-top-1 font-sans-2xs text-base margin-bottom--3">Sites were taking about six minutes to build in mid-2022. Publishing improvements in October helped reduce the time by about two minutes. Caching improvements in January reduced the build time by about another minute.</p>

<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: D3.js v3 + https://designsystem.digital.gov/components/data-visualizations/ -->
<svg version="1.1" id="LineChart" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
 viewBox="0 0 1020.29 660.46" style="enable-background:new 0 0 1020.29 660.46; margin-top:-50px;" xml:space="preserve" aria-hidden="true">
<style type="text/css">
.line-st0{fill:none;stroke:#71767a;stroke-miterlimit:10;}
.line-st0-light{fill:none;stroke:#dfe1e2;stroke-miterlimit:10;}
.line-st2{font-size:27px;}
.line-st4{fill:none;stroke:#005EA2;stroke-width:5;stroke-linecap:round;stroke-miterlimit:10;}
.line-st5{fill:none;stroke:#005EA2;stroke-width:6;stroke-linecap:round;stroke-miterlimit:10;}
.line-st7{fill:#005EA2;}
.line-st8{font-size:24px;}
.font-svg-main{font-size:26px;}
</style>
<g id="Roosevelts">
<g>
  <line class="line-st0" x1="69.45" y1="574.89" x2="971.08" y2="574.89"/>
</g>
<g>
  <g>
    <text transform="matrix(1 0 0 1 41.5112 586.7432)" class="line-st1 line-st2">0</text>
    <text transform="matrix(1 0 0 1 41.5112 451.36)" class="line-st1 line-st2">2</text>
    <text transform="matrix(1 0 0 1 41.5112 317.83)" class="line-st1 line-st2">4</text>
    <text transform="matrix(1 0 0 1 41.5112 184.30)" class="line-st1 line-st2">6</text>
  </g>
  <line class="line-st0" x1="69.45" y1="574.89" x2="69.45" y2="107.53" stroke-width='1px' vector-effect="non-scaling-stroke"/>
  <g>
    <g>
      <line class="line-st0-light" x1="69.45" y1="441.36" x2="971.08" y2="441.36" stroke-width='1px' vector-effect="non-scaling-stroke"/>
      <line class="line-st0-light" x1="69.45" y1="307.83" x2="971.08" y2="307.83" stroke-width='1px' vector-effect="non-scaling-stroke"/>
      <line class="line-st0-light" x1="69.45" y1="174.30" x2="971.08" y2="174.30" stroke-width='1px' vector-effect="non-scaling-stroke"/>
    </g>
    <g>
    </g>
  </g>
</g>
<g>
  <g>
    <g>
        <line class="line-st4" x1="133.85" y1="227.86" x2="228.48" y2="184.3"></line>
        <line class="line-st4" x1="228.48" y1="184.3" x2="326.27" y2="206.07"></line>
        <line class="line-st4" x1="326.27" y1="206.07" x2="424.06" y2="193.71"></line>
        <line class="line-st4" x1="424.06" y1="193.71" x2="518.6" y2="202.15"></line>
        <line class="line-st4" x1="518.69" y1="202.15" x2="616.47" y2="275.73"></line>
        <line class="line-st4" x1="616.47" y1="275.73" x2="711.11" y2="339.38"></line>
        <line class="line-st4" x1="711.11" y1="339.38" x2="808.89" y2="352"></line>
        <line class="line-st4" x1="808.89" y1="352" x2="906.68" y2="397.07"></line>
    </g>
  </g>
</g>
<g>
  <g>
    <g>
        <circle class="line-st7" cx="133.85" cy="227.86" r="8"></circle>
        <circle class="line-st7" cx="228.48" cy="184.3" r="8"></circle>
        <circle class="line-st7" cx="326.27" cy="206.07" r="8"></circle>
        <circle class="line-st7" cx="424.06" cy="193.71" r="8"></circle>
        <circle class="line-st7" cx="518.69" cy="202.15" r="8"></circle>
        <circle class="line-st7" cx="616.47" cy="275.73" r="8"></circle>
        <circle class="line-st7" cx="711.11" cy="339.38" r="8"></circle>
        <circle class="line-st7" cx="808.89" cy="352" r="8"></circle>
        <circle class="line-st7" cx="906.68" cy="397.07" r="8"></circle>
    </g>
  </g>
</g>
<g>
  <text class="font-svg-main" transform="matrix(1 0 0 1 113.85 613.895)">Jun</text>
  <text class="font-svg-main" transform="matrix(1 0 0 1 208.48 613.895)">Jul</text>
  <text class="font-svg-main" transform="matrix(1 0 0 1 306.27 613.895)">Aug</text>
  <text class="font-svg-main" transform="matrix(1 0 0 1 404.06 613.895)">Sep</text>
  <text class="font-svg-main" transform="matrix(1 0 0 1 498.69 613.895)">Oct</text>
  <text class="font-svg-main" transform="matrix(1 0 0 1 596.47 613.895)">Nov</text>
  <text class="font-svg-main" transform="matrix(1 0 0 1 691.11 613.895)">Dec</text>
  <text class="font-svg-main" transform="matrix(1 0 0 1 788.89 613.895)">Jan</text>
  <text class="font-svg-main" transform="matrix(1 0 0 1 886.68 613.895)">Feb</text>
</g>
</g>
</svg>

  <table class="usa-sr-only" aria-describedby="source_line">
    <caption>Median Build Times for cloud.gov Pages Sites by Month</caption>
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">June</th>
        <th scope="col">July</th>
        <th scope="col">August</th>
        <th scope="col">September</th>
        <th scope="col">October</th>
        <th scope="col">November</th>
        <th scope="col">December</th>
        <th scope="col">January</th>
        <th scope="col">February</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Median build times in minutes</th>
        <td>5.2</td>
        <td>5.9</td>
        <td>5.5</td>
        <td>5.7</td>
        <td>5.6</td>
        <td>4.5</td>
        <td>3.5</td>
        <td>3.3</td>
        <td>2.7</td>
      </tr>
    </tbody>
  </table>
  <p id="source_line">Source: internal cloud.gov Pages analytic data</p>
</div>

Please [let us know](mailto:inquiries@cloud.gov) if these new features have helped you out or you’d like to try [cloud.gov Pages](https://cloud.gov/pages).
