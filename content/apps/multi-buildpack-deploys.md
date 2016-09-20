---
date: 2015-07-10T14:32:59-04:00
menu:
  main:
    parent: advanced
title: Multi-Language Projects
---

CloudFoundry is capable of deploying multi-language projects by using a special [buildpack](https://bitbucket.org/cf-utilities/cf-buildpack-multi). In short, this buildpack applies any buildpacks listed in the `.buildpacks` file.

Instead of using buildpack-multi, consider splitting your application into smaller components. If you are using buildpack-multi to run multiple long-running processes, you should run them as separate cloud.gov applications instead. If you're investigating multi-buildpack deploys to build static assets on cloud.gov, you can avoid this issue by [building assets on CI]({{< relref "assets.md#build-assets-on-ci" >}}).

## Preparing an app for a multi-buildpack deploy

### 1. Update the application manifest
The application manifest should link to [this buildpack](https://bitbucket.org/cf-utilities/cf-buildpack-multi) as in the example below.

```yml
memory: 512m
applications:
- name: complexapp
  buildpack: https://bitbucket.org/cf-utilities/cf-buildpack-multi
```

The buildpack can also be set by using the `-b` flag on the `cf push` command; however, we recommend changing the manifest to avoid oversights while deploying.

### 2. Add a `.buildpacks` file
The `.buildpacks` file contains all the buildpacks needed to install/run the app. The example below is for an app that uses a Flask backend and a BackboneJS front-end.

```yml
https://github.com/cloudfoundry/python-buildpack
https://github.com/cloudfoundry/nodejs-buildpack
```

## Debugging
Multi-buildpacks deploys can be difficult to debug because [cf-buildpack-multi](https://bitbucket.org/cf-utilities/cf-buildpack-multi) hides the error logs. For more verbose output use [ozzyjohnson/heroku-buildpack-multi](https://github.com/ozzyjohnson/heroku-buildpack-multi).
