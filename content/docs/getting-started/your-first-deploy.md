---
menu:
  docs:
    parent: getting-started
title: Your first deploy
weight: -30
---

To get used to cloud.gov, practice by deploying a simple "hello world" application using the cloud.gov command line interface (CLI).

1. First, [go through account setup]({{< relref "setup.md" >}}) (if you haven't already), so that you're logged into the cloud.gov CLI and have targeted your sandbox.
1. Visit [this collection of "hello world" applications (tiny sample applications)](https://github.com/18F/cf-hello-worlds) and use **Clone or download** to make a copy on your computer. (This is easiest if you have [git](https://git-scm.com/downloads) installed on your computer.) For example, if you use `git` on the command line, enter `git clone https://github.com/18F/cf-hello-worlds.git`
1. Move into that directory, for example: `cd cf-hello-worlds`
1. Deploy the application, where `APPNAME` should be something unique like `FRAMEWORK-YOURNAME` (e.g. `nodejs-aidan`). By default on cloud.gov, `APPNAME` is used to construct a route to make your application reachable at https://APPNAME.app.cloud.gov/. Route names must be unique across the platform.


    ```bash
    cf push <APPNAME>
    ```

1. Try editing the app locally (without committing) and run `cf push <APPNAME>` again to see your changes. The changes will be reflected in Cloud Foundry even without being committed to Git. Cloud Foundry is not Git-aware – it simply deploys whatever is contained in the directory that you `push` from. That being said, you _can_ set up [continuous deployment]({{< relref "docs/apps/continuous-deployment.md" >}}) from a Git repository.

1. If you're done, you can delete it by running `cf delete <APPNAME>`

Tip: cloud.gov is an instance of Cloud Foundry, so in general, the [the Cloud Foundry documentation](http://docs.cloudfoundry.org) and other Cloud Foundry resources online are mostly applicable to cloud.gov.

Next, take a look at the [Concepts]({{< relref "concepts.md" >}}) page. Once you're ready to deploy your own application, head over to the [general deployment tips]({{< relref "docs/apps/deployment.md" >}}).
