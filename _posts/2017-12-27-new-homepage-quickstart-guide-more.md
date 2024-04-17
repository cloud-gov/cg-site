---
layout: post
date: "2017-12-27"
title: "A new homepage, quickstart guide, and more"
redirect_from:
  - /updates/2017-12-27-new-homepage-quickstart-guide-more/
---

We’ve been hard at work making Cloud.gov work for you. We’re constantly optimizing the platform so it’s secure and meets your expectations.

Here are some highlights from our platform updates in the last month.

### Added

* We updated our homepage! Now you can find more helpful resources and links to customer testimonials from the homepage. [Check it out]({{ site.baseurl }}/) and let us know what you think.
* If you’re new to Cloud.gov and haven’t launched an app yet, [check out our new quickstart guide]({{ site.baseurl }}/quickstart/). There, you’ll learn the basics of launching an app on Cloud.gov and can even watch video from a recent workshop to help you get started.
* We have documentation about the security-related HTTP headers Cloud.gov sets by default. [Learn about these headers and how to change them]({{ site.baseurl }}/docs/apps/headers) for your app in the docs.
* If you need to get an ATO for a system on Cloud.gov, [we have a page]({{ site.baseurl }}/docs/compliance/ato-process) explaining terms and showing how your ATO can inherit from Cloud.gov’s.

### Announcements!

* As we announced earlier this month, we are going to start clearing the content of sandboxes 90 days after they were created. See [our previous update about this]({{ site.baseurl }}/updates/2017-12-08-starting-now-sandboxes-expire-after-90-days) for more information about what to expect. You can always contact us about upgrading to a prototyping or production plan.
* We’re looking for Cloud.gov customers to help us make the platform better by sharing their experiences with us. [Contact us if you’d like to participate](mailto:inquiries@cloud.gov).

We notify you when your [application needs restaging]({{ site.baseurl }}/docs/apps/app-maintenance). This process [incorporates fixes in the base filesystem](https://docs.cloudfoundry.org/devguide/deploy-apps/stacks.html#cli-commands) and ensures your applications are running the most recent language version supported by your [buildpack](https://docs.cloudfoundry.org/buildpacks/).

### Platform releases
We upgraded the Cloud Foundry deployment to [v283](https://github.com/cloudfoundry/cf-release/releases/tag/v283).

#### Additional upgrades
* [Diego v1.32.0](https://github.com/cloudfoundry/diego-release/releases/tag/v1.32.0)
* [Stemcell v3468.15](https://bosh.io/stemcells/bosh-aws-xen-hvm-ubuntu-trusty-go_agent)
* [RootFS cflinuxfs2 v 1.176.0](https://github.com/cloudfoundry/stacks/releases/tag/1.176.0)
* Buildpacks:
  * [staticfile: v1.4.20](https://github.com/cloudfoundry/staticfile-buildpack/releases/tag/v1.4.20)
  * [java: v4.7.1](https://github.com/cloudfoundry/java-buildpack/releases/tag/v4.7.1)
  * [ruby: v1.7.8](https://github.com/cloudfoundry/ruby-buildpack/releases/tag/v1.7.8)
  * [nodejs: v1.6.13](https://github.com/cloudfoundry/nodejs-buildpack/releases/tag/v1.6.13)
  * [go: v1.8.15](https://github.com/cloudfoundry/go-buildpack/releases/tag/v1.8.15)
  * [python: v1.6.4](https://github.com/cloudfoundry/python-buildpack/releases/tag/v1.6.4)
  * [php: v4.3.46](https://github.com/cloudfoundry/php-buildpack/releases/tag/v4.3.46)
  * [dotnet-core: v1.0.30](https://github.com/cloudfoundry/dotnet-core-buildpack/releases/tag/v1.0.30)
  * [binary: v1.0.15](https://github.com/cloudfoundry/binary-buildpack/releases/tag/v1.0.15)
