---
parent: management
layout: docs
sidenav: true
redirect_from: 
    - /docs/apps/one-off-tasks/
title: Running one-off tasks
---

This table shows a handful of common operations, with the recommended way to perform them.

What are you trying to do? | Documentation
--- | ---
Inspect an app instance to figure out what's wrong | [`cf ssh`]({{ site.baseurl }}{% link _docs/management/using-ssh.md %})
Work with one of your service instances | [`cf ssh` with port forwarding]({{ site.baseurl }}{% link _docs/management/using-ssh.md %})
Run a non-interactive process that does a task (such as generating a report, cleaning up garbage, mailing people, processing some data, etc.) | [Cloud Foundry Tasks](https://docs.cloudfoundry.org/devguide/using-tasks.html)
Alternative way to run a non-interactive process that does a task (may be suitable if you want full control over the task app lifecycle) | [Deploy an app that performs a task](#deploy-an-app-that-performs-a-task)

## Run periodic scheduled tasks

If you'd like to run a periodic scheduled task (similar to a cron job), you should find a cron-like library in the programming language that you're working with, and implement the task using that library. You may run this as part of an existing application or as a separate application. 

If you use [continuous deployment]({{ site.baseurl }}{% link _docs/management/continuous-deployment.md %}), you can use a timer as an input to a task or pipeline that runs a [Cloud Foundry Task](https://docs.cloudfoundry.org/devguide/using-tasks.html). You can see [a demonstration of this approach](https://github.com/cloud-gov/cf-ci-triggered-task) using the Travis CI/CD platform here. Note - this same approach can be easily adapted to other common CI/CD platforms like Jenkins, CircleCI and GitHub Actions.

## Deploy an app that performs a task

### Know before you deploy

* This requires a "complete" [application manifest](http://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html) (which needs to include all of your service bindings, etc.) &mdash; if you don't have one yet, generate one from an existing app:

    ```sh
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

    ```sh
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

1. Deploy the one-off app, and view the output. When deploying the one-off tasks, it's important to disable health-checks and
   routes in order to prevent deployment issues during the buildpack phase and
   having multiple applications with the same mapped route respectively. For
   more information on these options, see the [`--no-route`][cf-no-route] and
   [`--health-check-type`][cf-health-check] documentation. In order to keep
   changes to your copied manifest at a minimum, you can provide these
   configuration options directly on the command-line:
```sh
cf push -f task_manifest.yml --health-check-type none --no-route
cf logs --recent task-runner
```
1. If needed, use [`cf ssh`]({{ site.baseurl }}{% link _docs/management/using-ssh.md %}) to collect any artifacts.
1. Run `cf delete task-runner` to clean it up. **If you don't do this, your app may automatically run itself again in the future.** cloud.gov sometimes automatically restarts apps as part of routine operations (such as platform updates), which can include restarting this kind of app if it hasn't been deleted.

[cf-no-route]: https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html#no-route "CloudFoundry Documentation about --no-route"
[cf-health-check]: https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html#health-check-type "CloudFoundry Documentation about --health-check-type"

You can find an example application [demonstrating this approach here](https://github.com/cloud-gov/cg-task-example).