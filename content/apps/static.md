---
menu:
  main:
    parent: apps
title: Deploying Static Sites
weight: 10
---

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
  buildpack: https://github.com/cloudfoundry-incubator/staticfile-buildpack.git
  env:
    FORCE_HTTPS: true
```

Deploy:

```
$ cf push
```

### Continuous deployment with Travis-CI

Add your repo to Travis-CI.

Create a `.travis.yml` file with `edge` set to `true`:

```yml
edge: true
```

Run the Cloud Foundry set-up script:

```
$ travis setup cloudfoundry
```

Follow the prompts. When you're done, the script will have appended all the necessary markup to the `.travis.yml` file.

Once you merge a Pull Request, Travis will run and deploy the site.
