---
parent: apps
layout: docs
sidenav: true
redirect_from: 
    - /docs/apps/static/
title: Deploying static sites
---

To push static content to the web, use the Staticfile buildpack. Examples of static content are front-end JavaScript apps and static HTML content.

To set up a "hello world" demo or a more complex static site, see the [Cloud Foundry Staticfile buildpack documentation](https://docs.cloudfoundry.org/buildpacks/staticfile/index.html). It includes ["hello world" instructions](https://docs.cloudfoundry.org/buildpacks/staticfile/index.html#sample) and a full list of configuration options, including how to set up basic authentication and configure nginx (the underlying web server).

### Builds

If you are using a static site generator (e.g. [Jekyll](#jekyll) or [Hugo](http://gohugo.io/)) and/or it requires dependencies to be installed at deploy-time, you should set up [continuous deployment]({{ site.baseurl }}{% link _docs/management/continuous-deployment.md %}). This way, the build happens in your Continuous Integration (CI) system rather than during the deploy itself within Cloud Foundry. This helps to make your deployments more reliable, have a smaller footprint, and reduce downtime.

### Jekyll

Deploying a [Jekyll](http://jekyllrb.com/) site requires a few things:

* Add or update your `Gemfile` to include the `jekyll` gem.

    ```ruby
    source 'https://rubygems.org'
    gem 'jekyll'
    ```

* Add a `Staticfile` pointing to the root of the built site, as specified in the [Cloud Foundry Staticfile buildpack documentation](https://docs.cloudfoundry.org/buildpacks/staticfile/index.html#config-process).

    ```yaml
    root: _site
    ```

See [18F/notalone](https://github.com/18F/notalone) for an example.

### Redirect all traffic

If a site moves to a different domain name, you can use [cf-redirect](https://github.com/18F/cf-redirect) to redirect all traffic from the old domain to the new domain.

You can read more about nginx customization at the [Staticfile Buildpack documentation](http://docs.cloudfoundry.org/buildpacks/staticfile/).
