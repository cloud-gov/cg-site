---
layout: post
title: "Managing buildpack changes"
date: May 20, 2021
excerpt: If your application's behavior changes unexpectedly without code changes, it might be related to a new buildpack release
---

If you notice strange behavior in your application, or if builds / deployments are not working properly and no coding changes were made, one possible cause could be changes to the [buildpack](https://cloud.gov/docs/getting-started/concepts/#buildpacks) used by your application.

Some things to check:

* You can check which buildpack and version your app is using by running `cf app APP_NAME`
* You can check the latest version of Cloud.gov system buildpacks by running: `cf buildpacks`
* You can check the latest buildpack release version by checking the releases page in the appropriate buildpack GitHub repository: `https://github.com/cloudfoundry/{BUILDPACK-TYPE}-buildpack/releases`

New buildpack versions are released often to update components and address security vulnerabilities. When a new buildpack is available (either via a reference to a buildpack URL or a system buildpack), it will be picked up and used by your application when you do a `cf restage`.

Buildpack changes can sometimes cause unexpected behavior because of changes in a runtime, component, or dependency. You should carefully read the release notes for new buildpack releases to ensure that changes don't adversely impact your application. If you suspect that a buildpack update may be causing issues with your application, you can validate it by using an earlier version of a buildpack to see if a new release includes a breaking change.

To use a specific version of a buildpack, you can do a `cf push` with the `--buildpack` or `-b` option and reference a specific release. For example: `cf push APP_NAME -b https://github.com/cloudfoundry/java-buildpack.git#v3.3.0`. 

It may help to experiment by doing `cf push` with a prior release to see if this resolves the issue. If it does, you can modify your application to ensure it works properly with the latest buildpack release.