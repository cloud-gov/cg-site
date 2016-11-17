---
menu:
  docs:
    parent: advanced
title: Plugins
---

CloudFoundry includes a framework for plugins.

Since CloudFoundry is written for performance in Go, these plugins do not function exactly the same as plugins do in other dynamically-compiled frameworks like Capistrano or Fab. Still, they provide a basic framework for extending the base functionality of the CloudFoundry CLI.

### Using Plugins

Plugins are installed locally onto your system using the `cf install-plugin` command. [Detailed instructions on using plugins](http://docs.cloudfoundry.org/devguide/installcf/use-cli-plugins.html) can be found at the CloudFoundry site, but there are two main means of fetching plugins:

1. You can download a compiled plugin binary from a remote site and install it from local disk.
2. You can specify a plugin-repo to pull compiled plugins from. The standard CloudFoundry directory is at [plugins.cloudfoundry.org](http://plugins.cloudfoundry.org/)

Please refer to the CloudFoundry documentation for detailed instructions on how to add plugins.

### 18F Plugins

This section will contain instructions on how to install any useful plugins from either the wider CloudFoundry community or specific to 18F, should there be a need for them. There currently aren't any though, because of the limitations of the current plugin architecture.

### Developing Plugins

The CloudFoundry CLI is written in Go and compiled down to an executable. This means that plugins aren’t able to be dynamically linked into the main CLI's code. Instead, plugins are also Go applications that inherit from a base interface and implement a few predefined commands. These applications then run as little localized servers essentially and get commands via RPC from the CF CLI. [The whole architecture is described in depth on the CloudFoundry site](https://github.com/cloudfoundry/cli/tree/master/plugin_examples). Any plugin you might right will have to implement two commands from the CF Plugin interface:

1. A `Run` command that is passed a `plugin.CliConnection` which can be used to invoke any methods within the core CF CLI from your plugin and is also passed arguments from invocation.
2. A `GetMetadata` command that returns information about the plugin for displaying help to command-line users.

Then you can compile your own plugin and install it. Plugins are able to call any of the commands already in the CLI. They also can read from stdin if you need them to be interactive. It is also possible to have a plugin implement multiple commands through dispatching within the `Run` method if that's preferable.

### What Plugins Can't Do

Plugins are only invoked when they are explicitly called within the CLI. In this sense, they resemble [Slack's outgoing webhooks](https://api.slack.com/outgoing-webhooks). There currently isn’t any support for plugins to register themselves to be called at specific points in the deployment cycle, as there is in other deployment mechanisms. The CloudFoundry team has [prioritized such features at the bottom of their list](https://github.com/cloudfoundry/cli/issues/123), and [this situation remains unchanged a year later](https://github.com/cloudfoundry/cli/issues/404).

For cases where we want to wrap an event like `cf push` with optional before and after actions, the CF team recommends that we should define our own separately named plugin. For example, we might want to have cf push using .gitignore if there is no .cfignore file. To do this with plugins, we’d have to define out our `18fpush` plugin that copies the .gitignore to .cfignore if not there, calls the regular push action and then undoes the copy. Every person deploying code would have to remember to call `cf 18fpush` instead of `cf push` for this to be effective.

Alternatively, we can just edit the CLI code itself so that it’ll contain the new behavior for all pushes. But this means we are adding some code for our specific needs that aren’t necessarily useful for the cloudfoundry CLI code. And it requires us to make sure our fork tracks changes to the main CLI repository. Neither of these cases are ideal, but they are the only options we have.
