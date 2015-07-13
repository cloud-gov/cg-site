---
date: 2015-07-10T14:32:59-04:00
menu:
  main:
    parent: apps
title: Deploying Multi-language Projects
weight: 10
---

CloudFoundry is capable of deploying, multi-language projects by using a special [buildpack](https://github.com/ddollar/heroku-buildpack-multi). In short, this buildpack applies any buildpacks listed in `.buildpacks` file.

## Preparing and app for a multi-buildpack deploy

### 1. Update the application manifest
The application manifest should link to [this buildpack](https://github.com/ddollar/heroku-buildpack-multi.git) as in the example below.

```yml
memory: 512m
applications:
- name: complexapp
  buildpack: https://github.com/ddollar/heroku-buildpack-multi.git
```

The buildpack can also be set by using the `-b` flag on the `cf push` command; however, we recommend changing the manifest to avoid oversights while deploying.

### 2. Add a `.buildpacks` file
The `.buildpacks` file contains all the buildpacks needed to install/run the app. The example below is for an app that uses a Flask backend and a BackboneJS front-end.

```yml
https://github.com/cloudfoundry/python-buildpack
https://github.com/cloudfoundry/nodejs-buildpack
```

## Debugging
Multi-buildpacks deploys can be difficult to debug because [heroku-buildpack-multi](https://github.com/ddollar/heroku-buildpack-multi.git) hides the error logs. For more verbose output use [ozzyjohnson/heroku-buildpack-multi](https://github.com/ozzyjohnson/heroku-buildpack-multi).


