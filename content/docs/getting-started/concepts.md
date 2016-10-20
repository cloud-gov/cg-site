---
menu:
  docs:
    parent: getting-started
title: Concepts
---

Here's an overview of key cloud.gov terms and concepts. cloud.gov uses Cloud Foundry terms, so the [Cloud Foundry glossary](http://docs.cloudfoundry.org/concepts/glossary.html) is a helpful reference too.

## Organizations

Cloud Foundry groups its users by [organizations](http://docs.cloudfoundry.org/concepts/roles.html#orgs), or "orgs" for short. Orgs group together users for management and present a shared perimeter for services, domains and quotas. When your account is created, it gets permissions to an org and a personal space.

### Naming convention

Within 18F, the `ORGNAME` corresponds to a project/client, e.g. `cap` for GSA's [Common Acquisition Platform](http://www.gsa.gov/portal/category/106839), or `devops` for internal apps such as [Hubot](https://github.com/18F/18f-bot).

### List available orgs

```bash
cf orgs
```

This only displays orgs where you've been assigned an org role, or those which contain a space where you've been assigned a space role.

### See details about a specific org

...including quotas, routing domains and which spaces it includes:

```bash
cf org ORGNAME
```

### Target an org

In order to work with spaces, you'll need to do this first:

```bash
cf target -o ORGNAME
```

## Spaces

Every application is scoped to a [space](http://docs.cloudfoundry.org/concepts/roles.html#spaces). Applications in the same space share a location for app development, deployment, and maintenance.

### Naming convention

Within 18F, the `SPACENAME` corresponds to an environment, e.g. `dev` or `prod`. If the org is more general (e.g. `devops`), the space may correspond to the name of the project (e.g. `hubot`).

### Management

To create a space:

```bash
cf create-space SPACENAME
```

**Note:**  To create a space within a given org, you must have the `OrgManager` role. You can see which users are managers for your org with:

```bash
cf org-users ORGNAME
```

## Target

The Cloud Foundry CLI keeps a global state of whatever [organization]({{< relref "#organizations" >}})+[space]({{< relref "#spaces" >}}) you're interacting with. This is known as the "target", and you can set it with:

```bash
cf target -o ORGNAME -s SPACENAME
```

## Buildpacks

All apps need to use a "buildpack" specific to their language, which sets up dependencies for their language stack. There are [standard buildpacks for most languages](https://docs.cloudfoundry.org/buildpacks/), and they will usually be auto-detected and auto-applied by Cloud Foundry when you deploy an app. We strongly encourage you to use the standard buildpacks. cloud.gov supports these standard buildpacks and provides security updates for them.

In the rare case where the buildpack does not get auto-detected correctly, or to use a [custom buildpack]({{< relref "docs/apps/experimental/custom-buildpacks.md">}}), you can specify a buildpack in the manifest (as below) or with the `-b` flag. To reference it, use either the buildpack name:

    buildpack: python_buildpack

Or a URL:

    buildpack: https://github.com/cloudfoundry/ruby-buildpack.git

**Multiple languages:** If your application involves multiple languages and seems to need multiple buildpacks, we recommend the following strategies:

* Split your project into smaller applications that work together, so that you can use one standard buildpack for each application.
* To run multiple long-running processes, run them as separate applications.
* To build static assets on cloud.gov, [build assets on CI]({{< relref "assets.md#build-assets-on-ci" >}}).

**Custom buildpacks:** If your application can't use a standard buildpack, you can use a [custom buildpack]({{< relref "docs/apps/experimental/custom-buildpacks.md">}}), which is an experimental feature. If you use a custom buildpack, ensure you understand [your responsibilities]({{< relref "overview/technology/responsibilities.md">}}), which include keeping your buildpack up-to-date and patching known vulnerabilities.

### Buildpack Release Schedule

18F's selection of buildpacks may occasionally lag behind CF's by a month or more (except for security patches), in which case you may need to specify the URL in order to get a more up-to-date version. The buildpack release schedule looks like the following:

- The CF buildpack team develops on a branch and cuts buildpack releases.
- The CF release team cuts a release for CF with new buildpacks every ~2 weeks.
- 18F grabs those releases and deploys them as soon as we can.
