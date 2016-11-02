---
menu:
  docs:
    parent: apps
title: Deploying Meteor
---

## About Meteor

[Meteor](https://www.meteor.com/) is a Javascript framework that makes it very easy to synchronize data between the client and server. Moreover it's also very easy to share code between client and server.

Meteor includes nearly everything you need to get a web application up and running:

- Javascript server framework
- Javascript client framework
- MongoDB for persistence
- Asset pipeline (automagically include and minify CSS, JS, etc)

## Hello world

### Install Meteor locally

See https://www.meteor.com/install. On OSX or Linux you can just run this in the terminal:

```bash
curl https://install.meteor.com/ | sh
```

### Create a boilerplate app

```
$ meteor create hello
$ cd hello
$ meteor
# this starts the Meteor server
# view the local site in a browser to ensure everything works
# press ctrl-c to exit the server when you are done
```

### Adding the manifest.yml

Create at the root of your application a file called `manifest.yml` and add:

```yaml
---
applications:
- name: hello-meteor
  memory: 128M
  instances: 1
  domain: 18f.gov
  buildpack: https://github.com/18F/cf-meteor-buildpack.git
  env:
    FORCE_HTTPS: true
```

You should customize the application name.

### Deploy

Simply run

```bash
cf push
```

## With a database

To truly take advantage of Meteor's data syncing, you should set up a database collection using MongoDB.

### Make a Todo list

Follow this [tutorial](https://www.meteor.com/tutorials/blaze/creating-an-app). Make sure everything works fine locally.

### Set up a Cloud Foundry Mongo Instance

Peruse the Marketplace for available services:

```
$ cf marketplace
# You should see `mongodb-new`
```

Create the service:

```bash
cf create-service mongodb-new hello-meteor-mongo
```

Bind the service:

```bash
cf bind-service hello-meteor hello-meteor-mongo
```

Restage:

```bash
cf restage hello-meteor
```
