---
menu:
  main:
    parent: getting-started
title: Running one off tasks
weight: 100
---

There are a couple ways to run one off tasks in Cloud Foundry. The easiest one is running CF SSH.

## CF SSH

`cf-ssh` is a shared ssh session with an application container that you can connect to. This allows you to debug the environment and your application without disturbing a running container.

Our `cf-ssh` is customized to our Cloud Foundry installation so please **do not use the community version**.

### Install `cf-ssh`

1. Download `cf-ssh` for your environment https://github.com/18F/cloud-foundry-scripts/releases/
1. Move it somewhere in your `$PATH`

### Usage

1. If you don't have an [application manifest](http://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html) yet, generate one from an existing app with `cf create-app-manifest <APP_NAME>`.
1. In your project folder, run `cf-ssh <APP_NAME> -f <PATH_TO_MANIFEST>`.
    * If you want to receive more feedback about what `cf-ssh` is doing please run it with the `--verbose` flag.

The process takes between 2 to 10 minutes to start the session since it is compiling your application in the background.
