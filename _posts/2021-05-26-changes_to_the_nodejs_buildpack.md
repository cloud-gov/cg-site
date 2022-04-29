---
layout: post
title: "Changes to the Node.js Buildpack"
date: May 26, 2021
excerpt: Certain versions of the Node.js runtime will be removed in upcoming releases of the Cloud Foundry Node.js buildpack.
---

The first release of the [Cloud Foundry Node.js buildpack](https://docs.cloudfoundry.org/buildpacks/node/node-tips.html#buildpack) after June 21, 2021 will no longer include Node versions 15.x.x. These Node.js versions will no longer be supported [upstream](https://github.com/nodejs/Release). 

As this change may impact some cloud.gov users, application owners are encouraged to migrate their Node.js apps to supported versions of Node.js before that time. _*Note: If no version is specified in your app's `package.json` file, the current default version resolves to Node v10.x._

Customers that experience issues, or that have questions about this change, can send a request to [support@cloud.gov](support@cloud.gov).
