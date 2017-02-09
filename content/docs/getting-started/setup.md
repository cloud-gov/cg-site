---
menu:
  docs:
    parent: getting-started
title: Set up cloud.gov and log in
weight: -50
---

First get [an account]({{< relref "accounts.md" >}}), and then you can log into cloud.gov in the following ways -- command line and dashboard (web interface).

## Set up the command line

cloud.gov is based on the Cloud Foundry open source project, so cloud.gov uses the Cloud Foundry command line interface (CLI) to give you full access to cloud.gov.

1. Install the Cloud Foundry CLI using the installer for your system: [Windows](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html#windows), [Mac OS X](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html#mac), or [Linux](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html#linux).
  - If your organization restricts the use of the installer, you can [download the CLI binary and install it manually](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html#bin).
1. Confirm the installation by running `cf -v` -- this should return a version number.
1. Run `cf login -a api.fr.cloud.gov --sso` 
1. Open the link from the command line in a browser, and copy the code back into the command line (no typing indicators will show for security)

## Check out the dashboard

cloud.gov also has a dashboard that gives you easy web-based access to common tasks.  The dashboard can be found at [`https://dashboard.fr.cloud.gov/`](https://dashboard.fr.cloud.gov/).  Since no applications are deployed yet, the list of applications will be empty.  Proceed to the next step to deploy a application!

## Play around in your "sandbox"

Here's how to deploy a test app in your sandbox for practice, using the CLI. (Note that **if you log in immediately after your account or organization was created,** you may not see any orgs or spaces to which you have access. Your sandbox space may take up to **5 minutes** to provision.)

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
