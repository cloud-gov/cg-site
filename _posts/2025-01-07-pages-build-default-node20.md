---
layout: post
date: January 8th, 2025
title: "New cloud.gov Pages default Node.js version for site builds"
excerpt: Pages site builds will default to use Node.js version 20
---

The cloud.gov Pages team updated the default Node.js version for customer site builds from 18 to 20 on January, 8th 2025. We [currently support LTS Node.js versions](https://cloud.gov/pages/documentation/node-on-pages/#specifying-a-node-version:~:text=Pages%20only%20supports%20active%20and%20maintenance%20LTS%20(Long%20Term%20Support)%20Node%20releases%2C) 18, 20, and 22 for site builds. If you want to continue to use Node.js v18, be sure to pin it using [engines](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#engines) in your site’s package.json file or with a [.npmrc file](https://cloud.gov/pages/documentation/node-on-pages/#specifying-a-node-version). The Node.js team announced they [will end support for v18 midway through 2025](https://nodejs.org/en/about/previous-releases#nodejs-releases), so we encourage you to make sure your sites work with v20 or v22.

If you have any questions about updating your Node.js version or are experiencing any problems, please contact us at [pages-support@cloud.gov](mailto:pages-support@cloud.gov).
