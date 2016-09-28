---
menu:
  main:
    parent: experimental
title: Multi-Language Projects
---

# Supported methods

If you're setting up a multi-language project that might need `cf-buildpack-multi`, here are alternative supported ways to do that:

* Split your project into smaller applications, so that you can use a supported buildpack for each application.
* To run multiple long-running processes, run them as separate applications.
* To build static assets on cloud.gov, [build assets on CI]({{< relref "assets.md#build-assets-on-ci" >}}).

# buildpack-multi

[**This uses an experimental feature.**]({{< relref "apps/experimental/experimental.md" >}})

CloudFoundry is capable of deploying multi-language projects by using a special buildpack, [`cf-buildpack-multi`](https://bitbucket.org/cf-utilities/cf-buildpack-multi). This buildpack applies any buildpacks listed in the `.buildpacks` file. `cf-buildpack-multi` is a [custom buildpack]({{< relref "apps/experimental/custom-buildpacks.md" >}}). 



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
Multi-buildpacks deploys can be difficult to debug because [`cf-buildpack-multi`](https://bitbucket.org/cf-utilities/cf-buildpack-multi) hides the error logs.
