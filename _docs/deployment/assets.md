---
parent: deployment
layout: docs
sidenav: true
redirect_from: 
    - /docs/apps/assets/
title: Building static assets
---

Applications with non-trivial static assets (Javascript and CSS files) often include a build step to bundle and minify files.

### Build assets on CI

For applications [deployed from a continuous integration service]({{ site.baseurl }}{% link _docs/management/continuous-deployment.md %}), building assets on CI is a natural fit. Before deploying to cloud.gov, the CI service runs the asset build process. Then the compiled assets are pushed to cloud.gov along with the application code. Here's a minimal example for Travis CI:

```yaml
# .travis.yml
deploy:
  provider: script
  skip_cleanup: true
  script: ./deploy.sh
```

```sh
# ./deploy.sh
npm run dist
cf push -f manifest.yml
```

If static assets are hosted on a CDN, the CI service can be configured to upload compiled assets to the CDN instead of pushing to cloud.gov.

This approach avoids the need to use multiple or custom buildpacks.

Examples in the wild:

* [eRegulations: Notice & Comment](https://github.com/eregs/notice-and-comment)

### Build assets on cloud.gov

If the application and build process are implemented in the same language, assets can be built directly on cloud.gov on application start. Here's a minimal example for a node.js application:

```yaml
# manifest.yml
command: npm run build && node app.js
```
