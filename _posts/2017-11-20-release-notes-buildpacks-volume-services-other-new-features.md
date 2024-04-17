---
layout: post
date: "2017-11-20"
title: "Cloud.gov monthly update: Buildpack notifications, volume services, and other new features"
redirect_from:
  - /updates/2017-11-20-release-notes-buildpacks-volume-services-other-new-features/
---


We’ve been hard at work shipping out new features to help you make your apps better, more secure, and improve your experience developing and deploying them. There’s a lot more in here than usual. We hope you see some features and additions in here that you’ve been waiting for. As always, get in touch with us if you have any questions or feedback about these features. See you next month.

### Added

* Part of keeping your app on Cloud.gov secure is [using the latest version of your app’s buildpack]({{ site.baseurl }}/docs/apps/app-maintenance). In addition to keeping you updated in these release notes, we’ll now send you an email notification when a new version of your buildpack is available.
* We have experimental support for [volume services]({{ site.baseurl }}/docs/apps/experimental/experimental). Since a Cloud.gov app normally has a short-lived file system, this enables you to build an app that requires persistent file storage. [Contact us if you’d like to try this]({{ site.baseurl }}/docs/apps/experimental/experimental).
* One of our engineers gave us the ability to make [Mermaid diagrams](https://mermaidjs.github.io/) on the Cloud.gov website, and we almost got carried away creating visualizations of different parts of the platform. Here are a couple we think will help you out:
  * [A comparison of how apps with custom domains and those with the default \*.app.Cloud.gov domain are served to users]({{ site.baseurl }}/docs/apps/custom-domains#comparison-of-default-domains-and-custom-domains).
  * [How to incorporate a CI/CD workflow into your app]({{ site.baseurl }}/docs/apps/continuous-deployment#configure-your-service).
* [The Cloud.gov dashboard](https://dashboard.fr.cloud.gov/) now lets you [manage environment variables](https://docs.cloudfoundry.org/devguide/deploy-apps/environment-variable.html) for your apps. To see it in action, go to an app page in the dashboard and try viewing, adding, or editing an environment variable. You can also see all the environment variables set by the system from the same view. Change variables with caution, as environment variables will be lost if your app is recreated. We recommend storing non-sensitive configuration variables in your application manifest and sensitive variables in user-provided services.
  
  Thanks to our antipodal compatriots with the [Australian Government Digital Transformation Agency](https://www.dta.gov.au/what-we-do/platforms/cloud/) for this code contribution.

!["Screenshot of the environment variable editing view on the dashboard in which a user-defined environment variable with the name 'app_version' has been assigned the value '1.0.1'"]({{site.baseurl}}/assets/dashboard-envs.png)

### Updates

Make sure to use the latest version of the Cloud Foundry CLI. The most recent updates contain new commands and bug fixes. You can [download the latest binary for Windows, Mac, or Linux from GitHub](https://github.com/cloudfoundry/cli/releases).

### Announcement

* We will not, as we previously announced, be [switching users with Cloud.gov accounts to sign in with MAX.gov]({{ site.baseurl }}/updates/2017-08-21-max-gov-migration-instructions).
* Cloud.gov removed the insecure 3DES cipher from all (including customers) CloudFront CDN distributions ahead of the 120 day deadline. Learn more about this from [the Department of Homeland Security](https://cyber.dhs.gov/#ii-required-actions).

### Coming soon

#### Sandbox apps will expire after 90 days

We plan to automatically delete apps in [sandbox spaces]({{ site.baseurl }}/docs/pricing/free-limited-sandbox#sandbox-limitations) after 90 days. We’ll send email notifications before this happens. If you’re developing something you need to keep long-term, we recommend moving it to a prototyping space. If you’d like to [start the process of purchasing a prototyping package]({{ site.baseurl }}/docs/pricing/prototyping), get in touch with us.

#### Additional TIC compliance support

To support agency implementations of Trusted Internet Connection (TIC) requirements, we’ve published [documentation about complying with TIC for apps on Cloud.gov]({{ site.baseurl }}/docs/compliance/meeting-tic-requirements). To support a wider range of agency TIC needs, we’ve also built a way to [support restricting users to trusted IP ranges]({{ site.baseurl }}/docs/apps/experimental/restricting-users-to-trusted-ip-ranges). We’re waiting to fully implement it until after it’s passed FedRAMP review, but in the meantime, let us know if you have questions or want to use it.

### Platform releases

We upgraded the Cloud Foundry deployment to [v278](https://github.com/cloudfoundry/cf-release/releases/tag/v278).

You should [restage your application]({{ site.baseurl }}/docs/apps/app-maintenance) to [incorporate fixes in the base filesystem](https://docs.cloudfoundry.org/devguide/deploy-apps/stacks.html#cli-commands) and ensure you’re running the most recent language version supported by your [buildpack](https://docs.cloudfoundry.org/buildpacks/).

#### Additional upgrades
* [Diego v1.29.2](https://github.com/cloudfoundry/diego-release/releases/tag/v1.29.2)
* [Stemcell v3468.5](https://bosh.io/stemcells/bosh-aws-xen-hvm-ubuntu-trusty-go_agent)
* Buildpacks:
  * [Staticfile v1.4.18](https://github.com/cloudfoundry/staticfile-buildpack/releases/tag/v1.4.18)
  * [Java v4.6](https://github.com/cloudfoundry/java-buildpack/releases/tag/v4.6)
  * [Ruby v1.7.5](https://github.com/cloudfoundry/ruby-buildpack/releases/tag/v1.7.5)
  * [NodeJS v1.6.10](https://github.com/cloudfoundry/nodejs-buildpack/releases/tag/v1.6.10)
  * [Go v1.8.13](https://github.com/cloudfoundry/go-buildpack/releases/tag/v1.8.13)
  * [Python v1.6.1](https://github.com/cloudfoundry/python-buildpack/releases/tag/v1.6.1)
  * [PHP v4.3.43](https://github.com/cloudfoundry/php-buildpack/releases/tag/v4.3.43)
  * [.NET-core v1.0.30](https://github.com/cloudfoundry/dotnet-core-buildpack/releases/tag/v1.0.30)
  * [Binary v1.0.15](https://github.com/cloudfoundry/binary-buildpack/releases/tag/v1.0.15)
