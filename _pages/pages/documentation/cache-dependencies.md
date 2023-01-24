---
title: Caching Build Dependencies
permalink: /pages/documentation/cache-dependencies/
layout: docs
navigation: pages
sidenav: pages-documentation
---

Each time your website is being built, it needs access to many node or Ruby libraries. By default, we cache these libraries between each run to reduce total build time. Users can disable this feature if it creates any issues with their build.

## Configuration

Caching of node and Ruby dependencies is enabled by default. To disable it, add the following property to your `pages.json` file:

```json
{
    "cache": false
}
```

## Technical Details

For both node and Ruby dependencies, the caching process runs these same steps:
- Checks for the presence of a dependency lock file
- Creates a cache key using the `md5` hash of the lock file
- Checks to see if there is an existing cache folder matching the cache key name:
    - If the matching cache exists, download it to the location of the dependency folder
    - If it doesn't, upload the cache folder at the end of this build

For Ruby, the lock file is `Gemfile.lock` and the dependecy folder is whatever is returned by `rvm gemdir`. For node, the lock file is `package-lock.json` and the dependency folder is `node_modules`. In the case of node, we also skip running `npm ci` after downloading a cache folder.
