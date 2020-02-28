---
parent: getting-started
layout: docs
sidenav: true
title: Concepts
redirect_from:
  - /docs/intro/terminology/system-terminology
  - /intro/terminology/system-terminology
  - /overview/terminology/system-terminology
---

Here's an overview of key cloud.gov terms and concepts. cloud.gov uses Cloud Foundry terms, so the [Cloud Foundry glossary](http://docs.cloudfoundry.org/concepts/glossary.html) is a helpful reference too.

## Organizations

Your work inside cloud.gov takes place within [organizations](http://docs.cloudfoundry.org/concepts/roles.html#orgs), or "orgs" for short. Orgs group together users for management and present a shared perimeter for services, domains and quotas. When your account is created, it may already have permissions in an existing org.

### List available orgs

```sh
cf orgs
```

This only displays orgs where you've been assigned an org role, or those which contain a space where you've been assigned a space role.

### See details about a specific org

...including quotas, routing domains and which spaces it includes:

```sh
cf org ORGNAME
```

### Target an org

In order to work with spaces, you'll need to do this first:

```sh
cf target -o ORGNAME
```

## Spaces

Each org contains [spaces](http://docs.cloudfoundry.org/concepts/roles.html#spaces), which can contain applications. Applications in the same space share a location for app development, deployment, and maintenance.

### Naming convention

For orgs that contain production systems (or systems under development before release), we recommend setting up spaces to correspond to each environment, such as `development`, `staging`, and `production`. If you have a prototyping org that contains many prototypes, each space may correspond to a project (such as `test-bot` and `blog-experiment`).

### Space management

To [create a space](http://cli.cloudfoundry.org/en-US/cf/create-space.html):

```sh
cf create-space SPACENAME
```

**Note:**  To create a space within a given org, you must have the `OrgManager` role. You can see which users are managers for your org with:

```sh
cf org-users ORGNAME
```

## Target

The Cloud Foundry CLI keeps a global state of the [organization]({{ site.baseurl }}#organizations)+[space](#spaces) you're interacting with. This is known as the "target", and you can set it with:

```sh
cf target -o ORGNAME -s SPACENAME
```

## Buildpacks

All apps need to use a "buildpack" specific to their language, which sets up dependencies for their language stack. There are [standard buildpacks for most languages](https://docs.cloudfoundry.org/buildpacks/), and Cloud Foundry usually auto-detects and auto-applies the appropriate one when you deploy an app (one exception is that it doesn't auto-apply the special [binary buildpack](https://docs.cloudfoundry.org/buildpacks/binary/index.html)). We strongly encourage you to use the standard buildpacks. cloud.gov supports these standard buildpacks and provides security updates for them. (You'll need to redeploy or restage your application to pick up buildpack updates. You're also responsible for supporting and security-patching the application itself.)

In the rare case where Cloud Foundry doesn't correctly auto-detect the buildpack, or if you want to use a binary buildpack or [custom buildpack]({{ site.baseurl }}{% link _docs/deployment/custom-buildpacks.md %}), you can specify a buildpack in the [application manifest](http://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html) (as below) or with the `-b` flag. To reference a buildpack in a manifest, you may specifying using a name:

    buildpacks:
      - python_buildpack

Or with a URL:

    buildpacks:
      - https://github.com/cloudfoundry/ruby-buildpack.git

**Multiple languages:** If your application requires multiple languages, we recommend evaluating these strategies to simplify your application:

* Can you split your project into smaller applications that work together, so that you can use one language for each application and deploy each one separately?
* Can you initiate long-running processes or schedule periodic jobs from outside your application [using the Tasks capability](https://docs.cloudfoundry.org/devguide/using-tasks.html)?
* Can you [build your static assets using CI]({{ site.baseurl }}{% link _docs/deployment/assets.md %}#build-assets-on-ci) prior to pushing your application, so that only the final built assets are deployed on cloud.gov?

If none of these strategies will help you deploy single-language applications, you can [explicitly specify a set of buildpacks to run in sequence](https://docs.cloudfoundry.org/buildpacks/use-multiple-buildpacks.html), one for each language.

**Custom buildpacks:** If your application can't use a standard buildpack, you can use a [custom buildpack]({{ site.baseurl }}{% link _docs/deployment/custom-buildpacks.md %}). When you use a custom buildpack, you're responsible for keeping your buildpack up-to-date and patching vulnerabilities in it. See [this chart illustrating your responsibilities]({{ site.baseurl }}{% link _docs/technology/responsibilities.md %}) for more detail.
