---
title: Monorepos on Pages
permalink: /pages/documentation/monorepos-on-pages/
layout: docs
navigation: pages
sidenav: pages-documentation
---


Monorepos on Pages follow the same rules as any other Pages site; as long as Pages knows what command to run to build the site AND the contents are available in the `_site` folder in the project root, Pages will be happy.

## Using the `script-only` option

The following is an example of using Pages to build a site that is in a subfolder of a monorepo using the `script-only` option for a `node`-based site.

1. Like any other `script-only` site, create a `package.json` file in the project root with an entry in the `scripts` section with a key of `pages`.
```
// package.json
{
  ...
  "scripts": {
       "pages": "do some stuff here"
  },
  ...
}
```

2. When the `pages` script runs, change the working directory to the appropriate folder, install any dependencies, run any build steps, and revert the working directory.
```
// package.json
{
  ...
  "scripts": {
       "build:subproject1": "cd subproject1 && npm install && npm run build && cd ..",
       "pages": "npm run build:subproject1"
  },
  ...
}
```

3. Make the results of the build step available in the `_site` folder for Pages to deploy, these could be copied or linked to, here we use a symbolic link.
```
// package.json
{
  ...
  "scripts": {
       "build:subproject1": "cd subproject1 && npm install && npm run build && cd ..",
       "link:subproject1": "ln -sf ./subproject1/dist _site",
       "pages": "npm run build:subproject1 && npm run link:subproject1"
  },
  ...
}
```
