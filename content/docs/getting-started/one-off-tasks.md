---
menu:
  docs:
    parent: advanced
title: Running one-off tasks
aliases:
- /getting-started/cf-ssh/
---

This table shows a handful of common operations, with the recommended way to perform them in GovCloud.

What are you trying to do? | GovCloud
--- | --- | ---
Inspect an app instance to figure out what's wrong | [`cf ssh`]({{< relref "docs/apps/using-ssh.md" >}})
Work with one of your service instances | [`cf ssh` with port forwarding]({{< relref "docs/apps/using-ssh.md" >}})
Run a non-interactive process that does a task (such as generating a report, cleaning up garbage, mailing people, processing some data, etc.) | [Cloud Foundry Tasks](https://docs.cloudfoundry.org/devguide/using-tasks.html)

## Deploy a short-lived app

### Know before you deploy

* This requires a "complete" [application manifest](http://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html) (which needs to include all of your service bindings, etc.) &mdash; if you don't have one yet, generate one from an existing app:

    ```bash
    cf create-app-manifest <APP_NAME> -p manifest.yml
    ```

* This will spin up an instance of your environment uploading your **local** code.
    * Note that this may not be in sync with your live app.
    * You can leverage this fact to include files that your one-off task might need, such as a data file for importing.

### How to deploy

The idea here is that we are going to deploy a new application, but running the
one-off task, rather than starting a server or whatever it would normally do.
Note that this will not work for any command that is interactive.

1. Make a copy of your application manifest:

    ```bash
    cp manifest.yml task_manifest.yml
    ```

1. Modify the `task_manifest.yml`:
    * Change the `name` value to be `task-runner` (or something descriptive).
    * Remove the following attributes, if present:
        * `domain`
        * `domains`
        * `host`
        * `hosts`
        * `instances`
        * `random-route`
    * Set the [`command`](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html#start-commands) attribute to be the following:

        ```yaml
        command: (<your command> && echo SUCCESS || echo FAIL) && sleep infinity
        ```

1. Deploy the one-off app, and view the output:

   When deploying the one-off tasks, it's important to disable health-checks and
   routes in order to prevent deployment issues during the buildpack phase and
   having multiple applications with the same mapped route respectively. For
   more information on these options, see the [`--no-route`][cf-no-route] and
   [`--health-check-type`][cf-health-check] documentation. In order to keep
   changes to your copied manifest at a minimum, you can provide these
   configuration options directly on the command-line.

    ```bash
    cf push -f task_manifest.yml --health-check-type none --no-route
    cf logs --recent task-runner
    ```
1. If needed, use [`cf files`][] to collect any artifacts.
1. Run `cf delete task-runner` to clean it up. **If you don't do this, your short-lived app may automatically run itself again in the future.** cloud.gov sometimes automatically restarts apps as part of routine operations (such as platform updates), which can include restarting this kind of app if it hasn't been deleted.

[`cf files`]: http://cli.cloudfoundry.org/en-US/cf/files.html

[cf-no-route]: https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html#no-route "CloudFoundry Documentation about --no-route"
[cf-health-check]: https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html#health-check-type "CloudFoundry Documentation about --health-check-type"
