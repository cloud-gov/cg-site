---
menu:
  docs:
    parent: advanced
title: Using SSH
---

You can use SSH to inspect how your app is operating, transfer files via SCP, or interact directly with your bound services. [More information about one-off tasks.]({{< relref "docs/getting-started/one-off-tasks.md" >}})

You can get a shell via the [`cf
ssh`](https://docs.cloudfoundry.org/devguide/deploy-apps/ssh-apps.html#ssh-command)
command, which lets you securely log in to an application instance where you can
perform debugging, environment inspection, and other tasks.

Your application environment is not completely set up when you log in. You'll probably need
to [configure your session to match your application's
environment](https://docs.cloudfoundry.org/devguide/deploy-apps/ssh-apps.html#ssh-env)
in order to debug your application.

You can interact directly with the services bound to your application via [port forwarding](https://docs.cloudfoundry.org/devguide/deploy-apps/ssh-services.html) (described under ["Configure Your SSH Tunnel"](https://docs.cloudfoundry.org/devguide/deploy-apps/ssh-services.html#ssh-tunnel)). This allows you to access those services using native clients on your local machine. The [Service Connect plugin](https://github.com/18F/cf-service-connect#readme) makes this even easier.

### Error messages

* `cf ssh` uses port 2222. If your network blocks port 2222, you may receive an error message such as `Error opening SSH connection` or `psql: could not connect to server: Connection refused`.
* Running `python` within an SSH session results in `ImportError: No module named site`.  
  * To resolve this, configure your SSH session environment with these two commands:

```bash
export DEPS_DIR=/home/vcap/deps
for f in /home/vcap/profile.d/*.sh; do source "$f"; done
```

## How to disable SSH access

SSH access is enabled by default. Space Developers can disable SSH access to individual applications, and Space Managers can disable SSH access to all apps running within a space. See [Enabling and Disabling SSH Access](https://docs.cloudfoundry.org/devguide/deploy-apps/ssh-apps.html#enable-disable-ssh) for the commands. Disabling SSH for production spaces will probably be necessary for you to meet your customer responsibilities for AC-17 under NIST 800-53 requirements.

## SSH version information 

Application containers use the SSH-2.0 protocol. The SSH service uses the [Cloud Foundry SSH implementation](https://github.com/cloudfoundry/diego-ssh). For more on how Cloud Foundry implements SSH, refer to Cloud Foundry's documentation on [Understanding Application SSH](https://docs.cloudfoundry.org/concepts/diego/ssh-conceptual.html).


