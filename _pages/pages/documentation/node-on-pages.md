---
title: Node on Pages
permalink: /pages/documentation/node-on-pages/
layout: docs
navigation: pages
sidenav: pages-documentation

---

Pages supports using node and npm to build your entire site OR to build parts of your site before the build engine starts its work.
This is helpful for doing things like compiling a site's assets, or employing a build tool such as [Fractal](https://github.com/frctl/fractal). To use node exclusively, be sure to set your site engine to ‘node.js’ in your site settings. If you want to use node alongside a different language, such as Jekyll or Hugo, do NOT change the site engine, Pages will detect the presence of a package.json file and will run the `federalist` or `pages` npm script.

## The Pages NPM script

Before running any other generator, the Pages build engine will check for a package.json file. If it finds one, it will [install npm dependencies](#installing-npm-dependencies). Additionally, if the package.json provides a script named `federalist` or `pages`, the build engine will run this script. This enables Pages users to add Javascript dependencies to their site, and run a script to prepare the site for the build engine. If **Node.js** is the configured **Site Engine**, no other steps are run.

## Installing NPM dependencies

Pages will install dependencies from NPM on your behalf, you **should not** include a call to `npm install` from your `federalist` or `pages` npm script or anywhere else. In particular, Pages runs `npm ci` which means:
- Your project must have a package-lock.json file
- The dependencies in package-lock.json must match those in package.json

Note that this process is skipped if [build dependency caching]({{ site.baseurl }}/pages/documentation/cache-dependencies) is enabled.

See [npm-ci](https://docs.npmjs.com/cli/ci) and [npm-install](https://docs.npmjs.com/cli/install) for more details.

## Specifying a Node version

Pages only supports active and maintenance LTS (Long Term Support) [Node releases](https://github.com/nodejs/release#release-schedule), the default version is currently v18.x (hydrogen).

You can specify a different version than the default by providing a file named `.nvmrc` at the root of your repository containing the desired version of Node. However, if an unsupported version is specified, the build will fail with a helpful error message. 

### Examples
If the current active and maintenance LTS release versions are 20 and 18:

| .nvmrc | node version used |
|:------:|:-----------------:|
| none | `18` (latest) |
| `18.19.0` | `18.19.0` |
| `21.x` | fail |
| `16.x` | fail |

See [.nvmrc](https://github.com/nvm-sh/nvm#nvmrc) for details on how to specify node versions.

## Excluding node modules

When Pages [installs dependencies](#installing-npm-dependencies) from npm, it creates a directory named `node_modules` where it saves the installed dependency files. When using Node alongside Jekyll or Hugo, these dependency files may be built into a site if the build is not configured to ignore them. This can cause the time it takes to upload a site to increase significantly.

For example, to ignore the node modules for a Jekyll site, add the following to the site's `_config.yml`:

```jekyll
exclude:
  - node_modules
```

After adding that, jekyll will ignore the `node_modules` directory when building the site.

## Examples
### Use Webpack to pre-process javascript

```json
{
  "name": "Webpack example",
  "version": "1.0.0",
  "description": "An example Pages site using webpack",
  "main": "index.js",
  "scripts": {
    "build": "`npm bin`/webpack",
    "federalist": "npm run build",
    "start": "`npm bin`/webpack-dev-server"
  },
  "author": "Jonathan Hooper",
  "license": "ISC",
  "dependencies": {
    "webpack": "^1.14.0"
  },
  ...
}
```

### Use Gatsby to generate a static site

```json
{
  "name": "pages-gatsby-uswds-template",
  "description": "Description A template for Pages that uses Gatsby and USWDS 2.0",
  "license": "CC0-1.0",
  "version": "0.1.0",
  "author": "davemcorwin",
  "scripts": {
    "develop": "gatsby develop",
    "start": "npm run develop",
    "build": "gatsby build",
    "serve": "gatsby serve",
    "federalist": "npm run build"
  },
  "dependencies": {
    "gatsby": "^2.0.33",
    "react": "^16.5.1",
    "react-dom": "^16.5.1"
  },
  ...
}
```

### Use Node to build an Eleventy site
```
{
  "name": "pages-eleventy-template",
  "version": "1.0.0",
  "description": "An example Pages site using eleventy",
  "scripts": {
    "dev": "eleventy --serve",
    "build": "eleventy",
    "federalist": "npm run build",
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@11ty/eleventy": "^0.11.0"
  }
}
```
