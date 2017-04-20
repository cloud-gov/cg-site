---
menu:
  docs:
    parent: getting-started
title: Set up cloud.gov and log in
weight: -50
---

If you have set up your [access to cloud.gov]({{< relref "accounts.md" >}}), you can log into cloud.gov in the following ways -- dashboard (web interface) and command line.

## Log into the dashboard (web interface)

cloud.gov has a dashboard that gives you easy web-based access to common tasks.

Your dashboard is probably empty right now since you probably haven't deployed any applications yet, but it's good to try logging in and looking at it as your first step, since you'll use it in the future.

Two notes before you log in:

* When you log in for the first time, cloud.gov will create a [sandbox space]({{< relref "overview/pricing/free-limited-sandbox.md" >}}) for you, but it may take up to **5 minutes** for cloud.gov to complete its automatic creation of your sandbox space. If you get stuck, ask a teammate or [support]({{< relref "docs/help.md" >}}).

Now try logging in:

{{% govcloud %}}
[`https://dashboard.fr.cloud.gov/`](https://dashboard.fr.cloud.gov/)

**Tip:** The `fr.` in this URL (and other cloud.gov URLs) indicates the GovCloud environment.
{{% /govcloud %}}

## Set up the command line

cloud.gov is based on the Cloud Foundry open source project, so cloud.gov uses the Cloud Foundry command line interface (CLI) to give you full access to cloud.gov.

1. Install the Cloud Foundry CLI using the installer for your system: [Windows](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html#windows), [Mac OS X](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html#mac), or [Linux](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html#linux).
  - If your organization restricts the use of the installer, you can [download the CLI binary and install it manually](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html#bin).
1. Confirm the installation by running `cf -v` -- this should return a version number.

1. Log in with a command as explained below. Just like with the dashboard instructions, the **GovCloud environment** is the main environment for new accounts and teams.

{{% govcloud %}}
**For all accounts in the GovCloud environment:**

Run `cf login -a api.fr.cloud.gov --sso` 

Then it'll say `One Time Code ( Get one at `[`https://login.fr.cloud.gov/passcode`](https://login.fr.cloud.gov/passcode)` )` -- visit that link in your browser to get your code, copy and paste the code into the command line (no typing indicators will show), and enter it.
{{% /govcloud %}}

## Play around in your "sandbox"

Here's how to deploy a test app in your sandbox for practice, using the CLI.

Start with the following `cf target` command:

```bash
cf target -o <ORG> -s <SPACE>
```

Your `<ORG>` is a Cloud Foundry _organization_ named "sandbox-&lt;agencypart&gt;", where &lt;agencypart&gt; is whatever comes right before `.gov` or `.mil` in your
e-mail address. For example, this may be `sandbox-gsa` or `sandbox-epa`. In most cases, your `<SPACE>` is the part of your email before the `@`, e.g. `firstname.lastname`. Cloud Foundry _spaces_ let applications run independently within an organization.  

For example:

```bash
cf target -o sandbox-gsa -s harry.truman
```

Run your version of that command, and then follow [your first deploy]({{< relref "your-first-deploy.md" >}}).

## Quick reference

<!-- If you change this section title, update /layouts/header.html as well, since this anchor is linked from the cloud.gov header -->

Here's a summary of how to log into cloud.gov. (See above for details.)

Command line interface:

{{% govcloud %}}

Everyone: `cf login -a api.fr.cloud.gov --sso` 

{{% /govcloud %}}

Dashboard (web interface):

{{% govcloud %}}
[`https://dashboard.fr.cloud.gov/`](https://dashboard.fr.cloud.gov/)
{{% /govcloud %}}
