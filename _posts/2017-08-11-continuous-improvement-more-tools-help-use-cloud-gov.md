---
date: "2017-08-11"
title: "Quarterly update: Continuous improvement, more tools to help you use Cloud.gov"
redirect_from:
  - /updates/2017-08-11-continuous-improvement-more-tools-help-use-cloud-gov/
---

Every quarter we update you with the important news about new features and updates to the Cloud.gov platform. In this edition of the newsletter we have updates about the Cloud.gov dashboard and other features for our users as well as stories from our customers, and links to recent presentations about Cloud.gov.

### What’s new

#### Use the dashboard to invite new users to your team

Managing users in your organization and granting them the permissions they need should be a straightforward process so your team can get to work building your app on Cloud.gov. To make it easier for you and us, we built new features for inviting new users and giving them roles within your organization using the dashboard. With these changes, it's easy for even the least technical people on your team to invite new folks and manage their roles.

!["The user invitation screen with notification"]({{site.baseurl}}/assets/invite-users.png){:width=624,height=272}

#### Continuous improvement

Staying compliant with federal laws is crucial to us and to you, but compliant simply isn’t good enough, or fast enough, for us. That’s why [Cloud.gov is designed and operated to routinely provide apps the latest security updates]({{ site.baseurl }}/overview/overview/cloudgov-benefits/) within a day of their release. When there’s a major vulnerability in a component managed by Cloud.gov, our team makes these updates across the entire platform, so you don’t have to spend time doing it. For updates to the buildpack, operating system, or [any other component we manage]({{ site.baseurl }}/overview/technology/responsibilities/), all that’s typically required is a [restage of your apps]({{ site.baseurl }}/docs/apps/app-maintenance/#restaging-your-app), even as they scale and grow.

#### Improved support and documentation to help you use Cloud.gov

We want to make Cloud.gov a platform that can successfully support your team and mission. So, we improved our documentation and training to help you find and understand the information you need from the start. For example, we added and documented [support for Oracle SE2 databases]({{ site.baseurl }}/docs/services/relational-database/) and updated the demos for commonly used government applications like [Drupal](https://github.com/18F/cf-ex-drupal) and [WordPress](https://github.com/18f/cf-ex-wordpress).

We also added and documented smaller features like setting up [specific IP addresses to use]({{ site.baseurl }}/docs/apps/static-egress/) when communicating with Cloud.gov from apps outside the platform. This will help agencies wanting to use Cloud.gov for apps that need to communicate with a system that can’t currently be hosted by us or would be difficult to migrate.

#### Learn about Cloud.gov from the AWS Public Sector Summit

Cloud.gov recently presented at the AWS Public Sector Summit. We did two sessions, both have been posted to YouTube. The first, [Deliver your agency mission faster with Cloud.gov](https://www.youtube.com/watch?v=NGmDhWEfMuo&list=PLhr1KZpdzukePsKIUofhgp50b63-5yr1V&index=78), was about how your agency can use Cloud.gov to save time. For the second, we were joined by members of the FedRAMP team to talk more specifically about [Cloud.gov's moderate-level P-ATO and the FedRAMP process](https://www.youtube.com/watch?v=iXqbIxtiwQY&index=87&list=PLhr1KZpdzukePsKIUofhgp50b63-5yr1V).

### Interested in using Cloud.gov?

#### We can help you figure out whether the platform meets your needs.

Whether a legacy system or new development, we’d love to learn about your apps and websites. Email us at [inquiries@cloud.gov](mailto:inquiries@cloud.gov) and we will contact you to discuss Cloud.gov benefits, pricing, and any questions you might have.

#### Prototyping accounts benefit multiple teams

[Prototyping packages are a great way to get started on Cloud.gov with real applications]({{ site.baseurl }}/overview/pricing/prototyping/). If you’re thinking about launching a new product, migrating an existing system to the cloud, or want to benefit from the convenience of a platform as a service, you can test your applications and fully evaluate Cloud.gov with a prototyping package. $15,000 gets your development team unlimited access to a FedRAMP authorized environment to try experiments, launch new demos, and test as many applications as you need. Cloud.gov prototyping packages can’t host production data but once you’re ready, you’ll be able to easily transfer it to a production-ready system.

If you have leftover funds at the end of the fiscal year and need a prototyping account, you can buy one now, start right away and continue to use it for the next 12 months. Contact us right away at [inquiries@cloud.gov](mailto:inquiries@cloud.gov) to get started.

### Featured customers:

#### FBI: Crime Data Explorer

The Federal Bureau of Investigation (FBI) recently launched their new Crime Data Explorer (CDE) on Cloud.gov. 18F and the FBI partnered to make crime data more accessible to the American public. The CDE enables users to visualize national, state, and local crime trends and offers bulk datasets and an open API for more detailed views of the data. Check it out at: [https://crime-data-explorer.fr.cloud.gov/](https://crime-data-explorer.fr.cloud.gov/)

!["the fbi crime data explorer homepage" width="624" height="320"]({{site.baseurl}}/assets/ fbi-crime-data.png)

#### Federal Election Commission

The Federal Election Commission (FEC) recently relaunched their flagship website, fec.gov, with Cloud.gov. The FEC collects financial reports for all federal elections and discloses fundraising figures to the public. By hosting FEC.gov on Cloud.gov and moving its data to the cloud, the FEC anticipates saving 85% in hosting costs and is better prepared for peak traffic events. Read a case study about the FEC here: [{{ site.baseurl }}/overview/customer-stories/fec/]({{ site.baseurl }}/overview/customer-stories/fec/) and check out their new, Cloud.gov-hosted website at [https://www.fec.gov](https://www.fec.gov)

!["the new Cloud.gov hosted fec homepage" width="624" height="320"]({{site.baseurl}}/assets/ fec-screen.png)
