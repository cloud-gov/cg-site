---
parent: getting-started
layout: docs
sidenav: true
title: Your first deploy
weight: -30
---

Practice deploying a simple "hello world" application using the cloud.gov command line interface (CLI).

## Get ready

First, [set up your command line interface (CLI)]({{ site.baseurl }}{% link _docs/getting-started/setup.md %}) (if you haven't already).

Log in:

  1. Enter **`cf login -a api.fr.cloud.gov --sso`**
  1. It'll say `One Time Code ( Get one at `[`https://login.fr.cloud.gov/passcode`](https://login.fr.cloud.gov/passcode)` )` -- visit this login link in your browser.
  1. If you use a cloud.gov account, you may need to log in using your email address, password, and multi-factor authentication token. (EPA, FDIC, GSA, and NSF: use your agency button.)
  1. After you log in, the page will display your 10-character Temporary Authentication Code.
  1. Copy and paste that 10-character code into the command line (no typing indicators will show), and enter it.

## Target your "sandbox"

If you have a federal email address, when you log in for the first time, cloud.gov will start automatically creating a [sandbox space]({{ site.baseurl }}{% link _docs/pricing/free-limited-sandbox.md %}) for you. You might need to wait up to 5 minutes before it becomes available.

Here's how to deploy a test app in your sandbox using the CLI.

Enter the following `cf target` command:

```sh
cf target -o <ORG> -s <SPACE>
```

Your `<ORG>` is a Cloud Foundry _organization_ named "sandbox-&lt;agencypart&gt;", where &lt;agencypart&gt; is whatever comes right before `.gov` or `.mil` in your
e-mail address. For example, this may be `sandbox-gsa` or `sandbox-epa`. In most cases, your `<SPACE>` is the part of your email before the `@`, e.g. `firstname.lastname`. To get a list of your available organizations, type `cf orgs`.

For example:

```sh
cf target -o sandbox-gsa -s harry.truman
```

## Deploy a test application

1. Get code for "hello world" applications ([repository](https://github.com/18F/cf-hello-worlds)):
   * **Using git:** `git clone https://github.com/18F/cf-hello-worlds.git`
   * **Download:** [`https://github.com/18F/cf-hello-worlds/archive/master.zip`](https://github.com/18F/cf-hello-worlds/archive/master.zip)
1. Move into that directory, for example: `cd cf-hello-worlds`
1. Look at the collection of tiny apps, and `cd` into the directory for the language/framework you feel most comfortable with. For example: `cd python-flask`
1. Deploy the application, where `APPNAME` should be something unique like `FRAMEWORK-YOURNAME` (e.g. `python-truman`). By default, your `APPNAME` will become part of the route to make your application publicly reachable, usually `https://APPNAME.app.cloud.gov/` or similar, and route names must be unique across the platform.

    ```sh
    cf push APPNAME
    ```
1. You'll see a series of messages noting the stages of creating the app. When complete, it'll say "App started" and give information about your app. Use the `urls` line (`urls: [ROUTENAME].app.cloud.gov`) to visit your app on the web.
1. Try editing the app locally (without committing) and run `cf push <APPNAME>` again to see your changes. The changes will be reflected even without being committed to Git. cloud.gov is not Git-aware – it simply deploys whatever is contained in the directory that you `push` from. You can set up [continuous deployment]({{ site.baseurl }}{% link _docs/management/continuous-deployment.md %}) from a Git repository.
1. Visit the dashboard ([`https://dashboard.fr.cloud.gov/`](https://dashboard.fr.cloud.gov/)) to see your options for managing your application via your browser.
1. If you're done, you can delete your app by running `cf delete <APPNAME>` (it's up to you whether to keep it running for more experiments or delete it).

## Next steps

Next, check out [Concepts]({{ site.baseurl }}{% link _docs/getting-started/concepts.md %}) for an overview of cloud.gov terms and architecture.

Then, head over to [**deployment instructions and architecture principles**]({{ site.baseurl }}{% link _docs/deployment/deployment.md %}) for an introduction to deploying your own applications on cloud.gov.

## Good to know

Check out [Status](https://cloudgov.statuspage.io/), which tells you about cloud.gov service disruptions. You can use "Subscribe to Updates" in the upper right corner to get email or SMS notifications about platform problems that may affect cloud.gov users.

cloud.gov is based on Cloud Foundry, so in general, the [the Cloud Foundry documentation](http://docs.cloudfoundry.org) and other Cloud Foundry resources mostly apply to cloud.gov. For example, you can also try deploying the [sample apps maintained by the Cloud Foundry community](https://github.com/cloudfoundry-samples).
