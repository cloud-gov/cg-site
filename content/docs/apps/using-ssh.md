---
menu:
  docs:
    parent: advanced
title: Using SSH
---

Here's how to get a SSH shell in the environment where your app is running. You can use this to inspect how your app is operating, transfer files via SCP, or interact directly with your bound services. (To run one-off tasks, you can also [deploy a short-lived app]({{< relref "docs/getting-started/one-off-tasks.md" >}}).)

{{% govcloud %}}
### CF SSH

You can get a shell via the [`cf ssh`](https://docs.cloudfoundry.org/devguide/deploy-apps/ssh-apps.html#ssh-command) command, which lets you securely login to an application instance where you can perform debugging, environment inspection, and other tasks.

You can also interact directly with your the services bound to your application via [port-forwarding](https://docs.cloudfoundry.org/devguide/deploy-apps/ssh-services.html). This allows you to access those services using native clients on your local machine.
{{% /govcloud %}}

{{% eastwest %}}
### CF-SSH

You can get a shell via the `cf-ssh` command (note the dash). `cf-ssh` is a shared SSH session with an application container that you can connect to. This allows you to debug the environment and your application without disturbing a running container.

Our `cf-ssh` is customized to our Cloud Foundry installation, so please **do not use the community version of [`cf ssh`](https://docs.cloudfoundry.org/devguide/deploy-apps/ssh-apps.html)**. Also note that only one person can use `cf-ssh` for any particular app at any particular time.

#### Installation

1. [Download cloud.gov's `cf-ssh` for your environment](https://github.com/18F/cf-ssh/releases/) ([source](https://github.com/18F/cf-ssh/tree/18f)).
1. Run

    ```bash
    cd ~/Downloads
    chmod a+x cf-ssh
    if [ -w /usr/local/bin ]; then mv cf-ssh /usr/local/bin; else sudo mv cf-ssh /usr/local/bin; fi
    ```

#### Usage

1. In your project folder, run

    ```bash
    cf-ssh --verbose -f manifest.yml
    ```

1. The process takes between 2 to 10 minutes to start the session since it is compiling your application in the background. When it completes, you will see a command prompt.

1. If you need to collect any files on the remote machine, you can use [`cf files`][] from a separate terminal window (do *not* close your SSH session, as the machine will be destroyed upon exit). For example, if your project's name in your `manifest.yml` is `foo`, then `cf files foo-ssh app/` should list all the files in your SSH session's default working directory.

1. When done, run `exit`.

[`cf files`]: http://cli.cloudfoundry.org/en-US/cf/files.html
{{% /eastwest %}}
