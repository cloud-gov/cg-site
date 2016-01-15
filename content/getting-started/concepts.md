---
menu:
  main:
    parent: getting-started
title: Concepts
---

Official glossary: http://docs.cloudfoundry.org/concepts/glossary.html

## Organizations

Cloud Foundry groups its users by [organizations](http://docs.cloudfoundry.org/concepts/roles.html#orgs), or "orgs" for short. Orgs group together users for management and present a shared perimeter for services, domains and quotas. When your account is created, it will be given permissions to an org and a personal space.

### Naming convention

Within 18F, the `ORGNAME` will correspond to a project/client, e.g. `cap` for GSA's [Common Acquisition Platform](https://18f.gsa.gov/dashboard/project/C2/), or `devops` for internal apps like [Hubot](https://github.com/18F/18f-bot).

### List available orgs

```bash
cf orgs
```

Only orgs where you've been assigned an org-role or those which contain a space where you've been assigned a space-role will appear.

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

Within 18F, the `SPACENAME` will correspond to an environment, e.g. `dev` or `prod`. If the org is more general (e.g. `devops`), the space may correspond to the name of the project (e.g. `hubot`).

### Management

To create a space:

```bash
cf create-space SPACENAME
```

**Note:**  To create a space within a given org you must have the `OrgManager` role. You can check to see which users and managers for your org with:

```bash
cf org-users ORGNAME
```

## Target

The Cloud Foundry CLI keeps a global state of whatever [organization]({{< relref "#organizations" >}})+[space]({{< relref "#spaces" >}}) you're interacting with. This is known as the "target", and is set via

```bash
cf target -o ORGNAME -s SPACENAME
```

## Buildpacks

All apps need to use a 'buildpack' specific to their language, which sets up dependencies for particular language stacks. There are standard buildpacks for most lanugages, and they will usually be auto-detected by CF. Using the standard buildpacks is strongly encouraged. In the rare case where the buildpack does not get detected correctly, or to use a custom buildpack, it can be specified in the manifest (as below) or with the `-b` flag. Use either the buildpack name:

    buildpack: python_buildpack
    
or a URL to reference it.

    buildpack: https://github.com/cloudfoundry/ruby-buildpack.git
    

### Buildpack Release Schedule

18F's selection of buildpacks may occasionally lag behind CF's by a month or more (except for security patches), in which case you may sometimes need to specify the URL in order to get a more up-to-date version. The buildpack release schedule looks like the following:

- The CF buildpack team develops on a branch and cuts buildpack releases.
- The CF release team cuts a release for CF with new buildpacks every ~2 weeks.
- 18F grabs those releases and deploys them as soon as we can (sometimes it takes a while).
