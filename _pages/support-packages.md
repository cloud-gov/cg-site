---
title: Support Packages
layout: page
sidenav: false
bg-color-class: bg-accent-warm-light
---

<div class="usa-content">
  <section class="usa-section">
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
  <section class="usa-section">
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
  <section class="usa-section">
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
  <section class="usa-section">
    <div class="grid-row grid-gap">
      <div class="tablet:grid-col-9 usa-prose">
        <h2>FAQ</h2>
      </div>
    </div>
    <div class="grid-row grid-gap">
      <div class="tablet:grid-col-9 usa-prose">
        <ol class="column-single">
          <li class="font-serif-lg">
            <h3>What happens to the money that is not used within the fiscal year or period of performance?</h3>
            <p class="font-body-md">
              Any money that is not used will be returned to the agency through the "deobligation" process.
            </p>
          </li>
          <li class="font-serif-lg">
            <h3>
              If an agency does not use all the allocated support hours, can they reduce paid support hours for future years?
            </h3>
            <p class="font-body-md">
              Yes, we see support hours as a good way for an agency to get started with the platform. Once your team is comfortable with the platform, you should reduce the number of paid support hours.
            </p>
          </li>
          <li class="font-serif-lg">
            <h3>Is there a way to roll over unused hours to the next fiscal year?</h3>
            <p class="font-body-md">
              Rolling hours over may be possible, depending on the agency's authority and funds. For example, some money can cross fiscal years ("no-year money") while other funds must be used within a set time frame ("3-year money").
            </p>
          </li>
          <li class="font-serif-lg">
            <h3>What are the limits of the paid support packages?</h3>
            <p class="font-body-md">
              We will not do direct development on the agency's application. We will only help, analyze, and assist.
            </p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</div>
