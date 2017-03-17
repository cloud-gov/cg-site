---
menu:
  docs:
    parent: getting-started
title: Your first deploy
weight: -30
---

To get used to cloud.gov, practice by deploying a simple "hello world" application using the cloud.gov command line interface (CLI).

1. First, [go through account setup]({{< relref "setup.md" >}}) (if you haven't already), so that you're logged into the cloud.gov CLI and have targeted your sandbox.
1. Visit [this collection of "hello world" applications (tiny sample applications)](https://github.com/18F/cf-hello-worlds) and use **Clone or download** to make a copy on your computer. You can download the zip file provided there, or if you use [`git`](https://git-scm.com/) on the command line, you can enter `git clone https://github.com/18F/cf-hello-worlds.git`
1. Move into that directory, for example: `cd cf-hello-worlds`
1. Look at the collection of tiny apps, and `cd` into the directory for the language/framework you feel most comfortable with. For example: `cd python-flask`
1. Deploy the application, where `APPNAME` should be something unique like `FRAMEWORK-YOURNAME` (e.g. `nodejs-aidan`). By default on cloud.gov, `APPNAME` is used to construct a route to make your application reachable at https://APPNAME.app.cloud.gov/. Route names must be unique across the platform.


    ```bash
    cf push <APPNAME>
    ```
1. Visit it at https://APPNAME.app.cloud.gov/
1. Try editing the app locally (without committing) and run `cf push <APPNAME>` again to see your changes. The changes will be reflected even without being committed to Git. cloud.gov is not Git-aware – it simply deploys whatever is contained in the directory that you `push` from. You can set up [continuous deployment]({{< relref "docs/apps/continuous-deployment.md" >}}) from a Git repository.
1. Visit the dashboard ([`https://dashboard.fr.cloud.gov/`](https://dashboard.fr.cloud.gov/)) to see your options for managing your application via your browser.
1. If you're done, you can delete your app by running `cf delete <APPNAME>`

## Good to know

Check out [**Status**](https://cloudgov.statuspage.io/), which tells you about cloud.gov service disruptions. You can use **Subscribe to Updates** in the upper right corner to get email or SMS notifications about platform problems that may affect cloud.gov users.

cloud.gov is based on Cloud Foundry, so in general, the [the Cloud Foundry documentation](http://docs.cloudfoundry.org) and other Cloud Foundry resources mostly apply to cloud.gov. For example, you can also try deploying the [sample apps maintained by the Cloud Foundry community](https://github.com/cloudfoundry-samples).

## Next steps

Next, take a look at the [Concepts]({{< relref "concepts.md" >}}) page. Once you're ready to deploy your own application, head over to the [general deployment tips]({{< relref "docs/apps/deployment.md" >}}).
