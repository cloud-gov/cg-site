---
title: Pricing
layout: page
sidenav: false
bg-color-class: bg-accent-warm-light
redirect_from:
- /docs/pricing/pricing-model/
---
<div class="usa-content">
  <section class="usa-section">
    <div class="grid-row grid-gap">
      <div class="tablet:grid-col-9">
        <p class="text-uppercase margin-bottom-0">Pricing</p>
        <h1 class="margin-top-1 font-sans-3xl">
          Deliver great services with compliance and infrastructure automated behind the scenes.
        </h1>
        <p class="usa-intro">
          <a href="{{site.mailto}}">Contact us</a> for answers to your questions and help with an estimate, or to start an Interagency Agreement purchase.
        </p>
      </div>
    </div>
  </section>
  <section class="usa-section">
    <div class="grid-row products-pricing">
      {% for product in site.data.pricing %}
      <div class="desktop:grid-col">
        <div class="intro">
          <img src="{{site.baseurl}}/assets/img/{{ product.image }}" alt="pricing plan icon" class="square-15"/>
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
                {{ product.memory }}
              </td>
            </tr>
            <tr>
              <td class="small-info">
                {{ product.production }}
              </td>
            </tr>
            <tr>
              <td class="small-info">
                {{ product.domain_names }}
              </td>
            </tr>
            <tr>
              <td>
                <span class="font-sans-2xs">{{ product.sign_up }}</span>
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
      <div class="tablet:grid-col-7 pricing-calculations usa-prose">
        <a href="#estimate-your-monthly-cost"></a>
        <h2 id="estimate-your-monthly-cost">Estimate your monthly cost</h2>
        <p>
          Monthly costs are based on the package fee (i.e., Prototyping, FISMA Low, FISMA Moderate) plus memory usage. Memory quota cost is based on the amount of memory (RAM) that you reserve for your system (<sup>$</sup>130/GB RAM per month).
        </p>
        <p class="footnote">
          Most cloud.gov customers typically reserve 4–8 GB of memory to cover multiple applications across development, staging, and production environments.
        </p>
        <h3>Example</h3>
        <p>
          Suppose you have a FISMA Low app that requires 1 GB of memory. You will need 1 instance in dev, 1 instance in staging, and 2 in production.
        </p>
      </div>
    </div>
    <div class="grid-row grid-gap">
      <div class="diagram tablet:grid-col margin-y-5">
        <img src={{site.baseurl}}/assets/images/pricing-example-FY20.png alt="Illustration of sample app running in dev, staging, and production environments" />
      </div>
    </div>
    <div class="grid-row grid-gap">
      <div class="tablet:grid-col-6 pricing-calculations usa-prose">
        <h4>
          Access Fee
        </h4>
        <p class="pricing-line-item">
          FISMA Low <span><sup>$</sup>2070</span>
        </p>
        <h4>
          Memory Quota Cost
        </h4>
        <p class="pricing-line-item">
          [ 1 GB + 2 GB + 1 GB ] x <sup>$</sup>130 <span><sup>$</sup>520</span>
        </p>
        <p class="pricing-total">
          Total monthly cost <span><sup>$</sup>2590</span>
        </p>
      </div>
    </div>
  </section>
  <section class="usa-section">
    <div class="grid-row grid-gap">
      <div class="tablet:grid-col-7 usa-prose">
        <h2>All use of cloud.gov includes:</h2>
        <h3>Standard Services</h3>
      </div>
    </div>
    <div class="grid-row grid-gap">
      <div class="tablet:grid-col-6 usa-prose">
        <ul class="column-single">
          <li>
            FedRAMP JAB-authorized hosting
          </li>
          <li>
            Self-service provisioning of services
          </li>
          <li>
            Self-service management of spaces and user access
          </li>
          <li>
            Self-service deployment of apps
          </li>
          <li>
            Basic technical and compliance support (during business hours)
          </li>
          <li>
            Documentation/tutorial material
          </li>
          <li>
            Continuous platform-level scanning and security updates
          </li>
          <li>
            Single-sign-on with your SAML identity provider
          </li>
          <li>
            Access to premium add-on services
          </li>
          <li>
            CDN route service (supporting caching, custom domains, and auto-renewing TLS certificates)
          </li>
        </ul>
      </div>
    </div>
  </section>
  <section class="usa-section">
    <div class="grid-row grid-gap">
      <div class="tablet:grid-col-7 usa-prose">
        <h3>Additional charges</h3>
      </div>
    </div>
    <div class="grid-row grid-gap">
      <div class="tablet:grid-col-6 usa-prose">
        <ul class="column-single">
          <li>
            S3 object store -  5TB included<br><i>  $100/month per additional terabyte</i>
          </li>
          <li>
            Postgres, MySQL, Oracle database - 1TB included<br><i>$300/month per additional terabyte</i>
          </li>
          <li>
            Elasticsearch RESTful search and analytics<br><i>$200/month per node for medium (each medium instance has 5-7 nodes provisioned), $400/month per node for large (each large instance has 5-7 nodes provisioned), $600 for extra-large (each extra-large instance has 5-7 nodes provisioned), and 6 medium nodes included for FISMA Moderate</i>
          </li>
          <li>
            Elasticache (Redis) in-memory data store - 10 nodes included<br><i>$200/month per 10 nodes block</i>
          </li>
        </ul>
      </div>
    </div>
  </section>
  <section class="usa-section">
    <div class="grid-row grid-gap">
      <div class="tablet:grid-col-7 usa-prose">
        <h2>Additional information:</h2>
        <ul class="column-single">
          <li>
            We can provision high-performance instances of Postgres, MySQL, and Oracle databases. <a href="mailto:inquiries@cloud.gov">Contact us</a> for more information.
          </li>
          <li>
            You’re responsible for operating and securing your own code and are responsible for complying with your agency’s requirements, which typically includes getting an ATO for your system.
          </li>
        </ul>
      </div>
    </div>
  </section>
</div>
