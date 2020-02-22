---
parent: management
layout: docs
sidenav: true
redirect_from: 
    - /docs/apps/plugins/
title: CF CLI plugins
---

Cloud Foundry includes a framework for plugins for the `cf` command-line interface, so that you can use and build additional command-line features for managing your orgs, spaces, and applications.

### Using Plugins

You install plugins locally on your system using the `cf install-plugin` command. [Detailed instructions on using plugins](https://docs.cloudfoundry.org/devguide/installcf/use-cli-plugins.html) can be found at the Cloud Foundry site, but there are two main means of fetching plugins:

1. You can download a compiled plugin binary from a remote site and install it from local disk.
2. You can specify a plugin-repo to pull compiled plugins from. The standard Cloud Foundry directory is at [plugins.cloudfoundry.org](https://plugins.cloudfoundry.org/).

### Developing Plugins

The Cloud Foundry CLI is written in Go and compiled down to an executable. This means that plugins aren’t able to be dynamically linked into the main CLI's code. Instead, plugins are also Go applications that inherit from a base interface and implement a few predefined commands. These applications then run as little localized servers essentially and get commands via RPC from the CF CLI. [The whole architecture is described in depth on the Cloud Foundry site](https://github.com/cloudfoundry/cli/tree/master/plugin/plugin_examples). Any plugin you might write will have to implement two commands from the CF Plugin interface:

1. A `Run` command that is passed a `plugin.CliConnection` which can be used to invoke any methods within the core CF CLI from your plugin and is also passed arguments from invocation.
2. A `GetMetadata` command that returns information about the plugin for displaying help to command-line users.

Then you can compile your own plugin and install it. Plugins are able to call any of the commands already in the CLI. They also can read from stdin if you need them to be interactive. It is also possible to have a plugin implement multiple commands through dispatching within the `Run` method if that's preferable.

### What plugins can't do

Plugins are only invoked when they are explicitly called within the CLI. In this sense, they resemble [Slack's outgoing webhooks](https://api.slack.com/outgoing-webhooks). There currently isn’t any support for plugins to register themselves to be called at specific points in the deployment cycle, as there is in other deployment mechanisms.

For cases where you want to wrap an event like `cf push` with optional before and after actions, the CF team recommends that you define your own separately named plugin. For example, you might want to have `cf push` using .gitignore if there is no .cfignore file. To do this with plugins, you’d have to define out your `mypush` plugin that copies the .gitignore to .cfignore if not there, calls the regular push action and then undoes the copy. Every person deploying code would have to install the plugin and remember to call `cf mypush` instead of `cf push` for this to be effective.
