---
parent: deployment
layout: docs
sidenav: true
title: Languages and frameworks
weight: 29
redirect_from:
- /docs/apps/django
- /docs/apps/flask
- /docs/apps/rails
- /docs/apps/node
- /docs/apps/meteor
- /docs/apps/frameworks/
---

cloud.gov uses [buildpacks]({{ site.baseurl }}{% link _docs/getting-started/concepts.md %}#buildpacks) to support a variety of programming languages and frameworks.

## Supported languages and frameworks

### Fully maintained language support

cloud.gov supports applications written in Go, Java, Node.js, .NET Core, PHP, Python, R, and Ruby. cloud.gov also supports applications that rely on a static binary that uses the 64-bit Linux kernel ABI, or that consist of static HTML, CSS, and Javascript assets. See the [Cloud Foundry system (supported) buildpacks list](http://docs.cloudfoundry.org/buildpacks/#system-buildpacks) for details.

### Other languages

You can use a custom buildpack to use other languages. See [custom buildpacks]({{ site.baseurl }}{% link _docs/deployment/custom-buildpacks.md %}) for more information about this feature. Cloud Foundry has a list of [community buildpacks](http://docs.cloudfoundry.org/buildpacks/#community-buildpacks) that you can use as custom buildpacks, along with [documentation for building your own custom buildpacks](http://docs.cloudfoundry.org/buildpacks/developing-buildpacks.html).

### Not supported

cloud.gov cannot run applications that use .NET Framework, or application binaries that require access to Microsoft Windows kernel or system APIs.

If you're interested in running applications that require .NET Framework or Windows, email [inquiries@cloud.gov](mailto:inquiries@cloud.gov?body=What%27s%20your%20name%3F%0A%0AWhat%20agency%20or%20office%20do%20you%20work%20for%3F%0A%0AWhat%27s%20your%20job%20title%20or%20role%3F%0A%0ATell%20us%20a%20little%20about%20your%20project%20or%20your%20questions%20about%20cloud.gov%3A%0A%0AIf%20you%27d%20like%20us%20to%20call%20you%2C%20what%27s%20your%20phone%20number%20and%20when%20might%20be%20a%20good%20time%3F%0A%0AHow%20did%20you%20first%20hear%20about%20cloud.gov%3F), so that our team can learn about your needs and update you when this is available.

## Sample applications to deploy

You can deploy example applications in many languages and frameworks:

* [Hello worlds](https://github.com/18F/cf-hello-worlds): Code for simple apps in several frameworks. Try deploying them and using them to build your own. Included: Java, Clojure, .NET Core, NodeJS, PHP, Flask (Python), Padrino (Ruby), Sinatra (Ruby).
* [Drupal 7](https://github.com/18F/cf-ex-drupal): Running Drupal on cloud.gov is fully supported. We provide the backend databases (MySQL or Postgres) and asset storage (AWS S3 buckets) so Drupal is _cloud-ready_.
* [Drupal 8](https://github.com/18F/cf-ex-drupal8) demonstrates use of [Composer](https://getcomposer.org/) for development, and includes S3 integration.
* [Cloud Foundry community sample applications](https://github.com/cloudfoundry-samples): This GitHub organization has seventy examples (and counting) of languages, frameworks and tools that can be adapted to run on cloud.gov.

## Customer example applications

Several cloud.gov customers have their code available as open source for review and reuse, including:

* [ATF eRegulations](https://github.com/18F/atf-eregs): Python Django application that uses PostgreSQL.
* [College Scorecard API](https://github.com/RTICWDT/open-data-maker/): Ruby application with an Elasticsearch backend.
* [Federal Election Commission API](https://github.com/fecgov/openFEC): Python application with PostgreSQL and Elasticsearch backends.
* [Federalist](https://github.com/18F/federalist): NodeJS and Docker workers in cloud.gov with S3 and RDS backends.
* [NSF Beta Drupal](https://github.com/18F/nsf): Drupal 8 with setup for Docker local development, and cloud.gov staging/live environments.
* [Forest Service e-Permitting](https://github.com/18F/fs-permit-platform): Permitting service in NodeJS with PostgreSQL.
