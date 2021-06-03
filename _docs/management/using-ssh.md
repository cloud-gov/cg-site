---
parent: management
layout: docs
sidenav: true
redirect_from: 
    - /docs/apps/using-ssh/
title: Using SSH
---

You can use SSH to inspect how your app is operating, transfer files via SCP, or interact directly with your bound services. [More information about one-off tasks.]({{ site.baseurl }}{% link _docs/management/one-off-tasks.md %})

You can get a shell via the [`cf
ssh`](https://docs.cloudfoundry.org/devguide/deploy-apps/ssh-apps.html#ssh-command)
command, which lets you securely log in to an application instance where you can
perform debugging, environment inspection, and other tasks.

### Application debugging tips

**Configure your shell**: If you're trying to debug your app, you'll need to [configure your session to match your application's environment](https://docs.cloudfoundry.org/devguide/deploy-apps/ssh-apps.html#ssh-env) by running `/tmp/lifecycle/shell`.

**Interact with services**: You can interact directly with the services bound to your application via [port forwarding](https://docs.cloudfoundry.org/devguide/deploy-apps/ssh-services.html) (described under ["Configure Your SSH Tunnel"](https://docs.cloudfoundry.org/devguide/deploy-apps/ssh-services.html#ssh-tunnel)). This allows you to access those services using native clients on your local machine. The [Service Connect plugin](https://github.com/18F/cf-service-connect#readme) makes this even easier.

**Connect to a crashing app**: You may be trying to determine why your application keeps crashing, but it doesn't stay up long enough for an SSH session. This happens because Cloud Foundry detects when an application fails the "health check" (typically by connecting to a TCP port), then recreates the container and runs the start command again. To determine _why_ your start command is failing, you can override the _start command_ and the _health check_ with:

> `cf push -u process -c "sleep 600" ... [your other push options]`

This overrides the port health check with the `process` check, and sets the start command to just `sleep`. That will give you 10 minutes to `cf ssh` and inspect your container.

## How to disable SSH access

SSH access is enabled by default. Space Developers can disable SSH access to individual applications, and Space Managers can disable SSH access to all apps running within a space. See [Enabling and Disabling SSH Access](https://docs.cloudfoundry.org/devguide/deploy-apps/ssh-apps.html#enable-disable-ssh) for the commands.

You should [disable SSH access for production applications]({{ site.baseurl }}{% link _docs/deployment/production-ready.md %}#prevent-non-auditable-changes-to-production-apps) to ensure you can audit changes to those applications.

## SSH version information 

Application containers use the SSH-2.0 protocol. The SSH service uses the [Cloud Foundry SSH implementation](https://github.com/cloudfoundry/diego-ssh). For more on how Cloud Foundry implements SSH, refer to Cloud Foundry's documentation on [Understanding Application SSH](https://docs.cloudfoundry.org/concepts/diego/ssh-conceptual.html).

## Troubleshooting SSH issues

If you are having trouble connecting to your application via SSH, [please refer to this knowledge base article]({{ site.baseurl }}/knowledge-base/2021-05-17-troubleshooting-ssh-connections/).
