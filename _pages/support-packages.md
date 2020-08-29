---
title: Support Packages
layout: default
sidenav: false
---
<div class="usa-content bg-accent-warm-light">
   <section class="grid-container usa-section">
      <div class="grid-row grid-gap">
         <div class="tablet:grid-col-9">
            <p class="text-uppercase margin-bottom-0">{{ page.title }}</p>
            <h1 class="margin-top-1 font-sans-3xl">
               Help your team on a broader range of issues with dedicated engineering resources to resolving technical issues.
            </h1>
            <p class="usa-intro">
               <a href="{{site.mailto}}">Contact us</a> if you’re interested in learning more. We can schedule time to discuss this further with your team.
            </p>
         </div>
      </div>
   </section>
   <section class="grid-container usa-section">
      <div class="grid-row products-pricing">
         {% for product in site.data.support-packages %}
         <div class="desktop:grid-col">
            <div class="intro">
               {% asset "{{ product.image }}" class="square-15" %}
               <h2>{{ product.package_name }}</h2>
            </div>
            <table class="usa-table usa-table--borderless">
               <tbody>
                  <tr>
                     <td class="intro-info">
                        {{ product.description }}
                     </td>
                  </tr>
                  <tr>
                     <td class="intro-info">
                        {{ product.price }}
                     </td>
                  </tr>
                  <tr>
                     <td class="small-info">
                        {{ product.hours }}
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
         {% endfor %}
      </div>
   </section>
   <section class="grid-container usa-section">
      <div class="grid-row grid-gap">
         <div class="tablet:grid-col-9 pricing-calculations usa-prose">
            <a href="#estimate-your-monthly-cost"></a>
            <h2 id="estimate-your-monthly-cost">Easy to get started</h2>
            <p class="font-body-md">
               Since these support packages are billed as labor, we can add these packages
               to your existing agreement with only a minor modification to the IAA.
            </p>
         </div>
      </div>
   </section>
   <section class="usa-section grid-container">
      <div class="grid-row grid-gap">
         <div class="tablet:grid-col-9 usa-prose">
            <h2>FAQ</h2>
         </div>
      </div>
      <div class="grid-row grid-gap">
         <div class="tablet:grid-col-9 usa-prose">
            <ol class="column-single">
               <li class="font-serif-lg">
                  <h3>Would unspent monies be deobligated at the end of the FY/PoP?</h3>
                  <p class="font-body-md">Yes, unspent monies need to be deobligated.</p>
               </li>
               <li class="font-serif-lg">
                  <h3>If agencies have unused hours, would agencies reduce support hours for subsequent years?</h3>
                  <p class="font-body-md">
                     If customers reduce their support needs, that is success from our perspective.
                     We want to make sure agencies are empowered to solve problems on their own and use us only as needed.
                  </p>
               </li>
               <li class="font-serif-lg">
                  <h3>Is there a way to roll over unused hours to the next FY?</h3>
                  <p class="font-body-md">
                    This depends on the agency and what type of money (“no-year”, “3-year”) the agency is using.
                  </p>
               </li>
               <li class="font-serif-lg">
                  <h3>What boundaries exist that we won't cross?</h3>
                  <p class="font-body-md">
                    We will not do direct development on the agency's application. We will only help, analyze, and assist.
                  </p>
               </li>
            </ol>
         </div>
      </div>
   </section>
</div>
