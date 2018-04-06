---
menu:
  docs:
    parent: apps
title: Languages and frameworks
weight: 29
aliases:
- /docs/apps/django
- /docs/apps/flask
- /docs/apps/rails
- /docs/apps/node
- /docs/apps/meteor
---

cloud.gov uses [buildpacks]({{< relref "docs/getting-started/concepts.md#buildpacks" >}}) to support a variety of programming languages and frameworks.

## Supported languages and frameworks

cloud.gov supports applications written in Go, Java, Node.js, .NET Core, PHP, Python, and Ruby. cloud.gov also supports applications that rely on a static binary that uses the 64-bit Linux kernel ABI, or that consist of static HTML, CSS, and Javascript assets. See the [Cloud Foundry system (supported) buildpacks list](http://docs.cloudfoundry.org/buildpacks/#system-buildpacks) for details.

## Generic Examples

You can deploy example applications in many languages and frameworks:

* [Hello worlds](https://github.com/18F/cf-hello-worlds): This repository includes CloudFoundry apps in several frameworks that only have one page displaying "_Hello World from &lt;language&gt;_". Included are: Java, Clojure, .NET Core, NodeJS, PHP, Flask (Python), Padrino (Ruby), and Sinatra (Ruby).  They provide the simplest possible example from which you can build.
* [Drupal](https://github.com/18F/cf-ex-drupal): Running Drupal on cloud.gov is fully supported. We provide the backend databases (MySQL or Postgres) and asset storage (AWS S3 buckets) so Drupal is _cloud-ready_. This repository includes examples in Drupal 7 and Drupal 8. The [Drupal 8 example](https://github.com/18F/cf-ex-drupal/tree/master/drupal-8) demonstrates use of [Composer](https://getcomposer.org/) for development, and includes S3 integration.
* [Cloud Foundry community sample applications](https://github.com/cloudfoundry-samples): This GitHub organization has seventy examples (and counting) of languages, frameworks and tools that can be adapted to run on cloud.gov.

## Customer Examples

Several cloud.gov customers have their code available as open-source, including:

* [College Scorecard Data API](https://github.com/18F/open-data-maker) A ruby application with an Elasticsearch backend
* [Federal Election Commission API](https://github.com/18F/open-data-maker): Python application with PostgreSQL and Elasticsearch backends.
* [Federalist](https://github.com/18F/federalist): NodeJS and Docker workers in cloud.gov with S3 and RDS backends.


## Other languages

You can use a custom buildpack to support other languages. See [custom buildpacks]({{< relref "docs/apps/custom-buildpacks.md" >}}) for more information about this feature.

Cloud Foundry has a list of [community buildpacks](http://docs.cloudfoundry.org/buildpacks/#community-buildpacks) that you can use as custom buildpacks, along with [documentation for building your own custom buildpacks](http://docs.cloudfoundry.org/buildpacks/developing-buildpacks.html).

## Cannot run

cloud.gov cannot run applications that use .NET Framework, or application binaries that require access to Microsoft Windows kernel or system APIs.
