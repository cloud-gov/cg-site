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

In your project folder run `cf-ssh APP-NAME` replacing `APP-NAME` with the app name.
Currently, `cf-ssh` requires a `manifest.yml` file. Please create one before running it. You can also use the `-f` flag to specify a manifest file.

The process takes between 2 to 10 minutes to start the session since it is compiling your application in the background. If you want to receive more feedback about what `cf-ssh` is doing please run it with the `--verbose` flag.
