---
menu:
  main:
    parent: apps
title: Deploying Static Sites
---

### Basics

Create `index.html`:

```
$ touch index.html
```

Add some markup:

```html
<html>
  <head>
    <title>Static Site</title>
  </head>
  <body>
    <p>Welcome to the static site!</p>
  </body>
</html>
```

Create a `manifest.yml` that uses the [`staticfile-buildpack`](https://github.com/cloudfoundry/staticfile-buildpack):

```yml
---
applications:
- name: my-static-site
  memory: 64M
  buildpack: https://github.com/cloudfoundry/staticfile-buildpack.git
  env:
    FORCE_HTTPS: true
```

If the static content is included in a different folder, you can add a `path` declaration. E.g., `path: dist` or `path: assets`.

Deploy:

```
$ cf push
```

### Jekyll

Deploying a Jekyll site requires a few things:

* Add or update your `Gemfile` to include the jekyll gem.

    ```ruby
    source 'https://rubygems.org'
    gem 'jekyll'
    ```

* Add the following lines to the top of your `.travis.yml` to pull Ruby and build the site.

    ```yaml
    language: ruby
    script: jekyll build ./_site
    ```

* Add a `Staticfile` pointing to the root of the built site as specified above. The [static buildpack](https://github.com/cloudfoundry/staticfile-buildpack) will interpret with file.

    ```yaml
    root: _site
    ```

* Update `manifest.yml` to use the [static buildpack](https://github.com/cloudfoundry/staticfile-buildpack).

    ```yaml
    buildpack: https://github.com/cloudfoundry/staticfile-buildpack.git
    ```

See [18F/notalone](https://github.com/18F/notalone) and [18F/18f.gsa.gov](https://github.com/18F/18f.gsa.gov) for working examples.

### Redirect all traffic

If a site moves to a different domain name, you can use a simple static site with a custom `nginx.conf`
file to redirect all traffic from the old domain to the new domain. Example `nginx.conf` site for `NEW_DOMAIN_NAME`:

```
worker_processes 1;
daemon off;

error_log <%= ENV["APP_ROOT"] %>/nginx/logs/error.log;
events { worker_connections 1024; }

http {
  server {
    listen <%= ENV["PORT"] %>;
    server_name localhost;
    return 301 $scheme://NEW_DOMAIN_NAME$request_uri;
  }
}
```

Deploy your application to `NEW_DOMAIN_NAME` and then `cf push` a simple static site with that `nginx.conf`
configuration to the old domain name. You can see a [full working example](https://github.com/18F/c2-redirect).

You can read more about [nginx customization](https://github.com/cloudfoundry/staticfile-buildpack#advanced-nginx-configuration).
