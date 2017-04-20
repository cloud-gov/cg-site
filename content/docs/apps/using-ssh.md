---
menu:
  docs:
    parent: advanced
title: Using SSH
---

Here's how to get a SSH shell in the environment where your app is running. You can use this to inspect how your app is operating, transfer files via SCP, or interact directly with your bound services. [More information about one-off tasks.]({{< relref "docs/getting-started/one-off-tasks.md" >}})

{{% govcloud %}}
### CF SSH

You can get a shell via the [`cf
ssh`](https://docs.cloudfoundry.org/devguide/deploy-apps/ssh-apps.html#ssh-command)
command, which lets you securely log in to an application instance where you can
perform debugging, environment inspection, and other tasks.

Your application environment is not completely setup when you log in. You'll probably need
to [configure your session to match your application's
environment](https://docs.cloudfoundry.org/devguide/deploy-apps/ssh-apps.html#ssh-env)
in order to debug your application.

You can interact directly with the services bound to your application via [port-forwarding](https://docs.cloudfoundry.org/devguide/deploy-apps/ssh-services.html). This allows you to access those services using native clients on your local machine. The [Service Connect plugin](https://github.com/18F/cf-service-connect#readme) makes this even easier.

`cf ssh` uses port 2222. If your network blocks port 2222, you may receive an error message such as `Error opening SSH connection`.

{{% /govcloud %}}
