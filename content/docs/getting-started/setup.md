---
menu:
  docs:
    parent: getting-started
title: Setup
weight: -50
---

You can work with cloud.gov in two ways: the command line (CLI) with full features, and the web user interface (dashboard) with quick access to common tasks.

You need [an account]({{< relref "accounts.md" >}}) before you can get started with this.

## Set up the command line

1. [Install the Cloud Foundry CLI](https://docs.cloudfoundry.org/devguide/installcf/install-go-cli.html). (cloud.gov is based on Cloud Foundry.)
1. Confirm the installation by running

    ```bash
    cf -v
    ```
    
    This should return a version number.

1. Log in with a command as explained below:

{{% eastwest %}}
**If you log in using your agency's account system:** run `cf login -a api.cloud.gov --sso` -- then follow the link to get your one-time authentication code and enter it to log in.
    
**If you log in with a cloud.gov account that has its own password** (including `ORGNAME_deployer` accounts): run `cf login -a api.cloud.gov`
{{% /eastwest %}}

{{% govcloud %}}
**All accounts:** run `cf login -a api.fr.cloud.gov --sso` -- then follow the link to get your one-time authentication code and enter it to log in.
{{% /govcloud %}}


## Check out the dashboard

Visit your dashboard! It's probably a little empty since you probably haven't deployed any applications yet, but it's good to know it exists:

{{% eastwest %}}
[`https://dashboard.cloud.gov/`](https://dashboard.cloud.gov/)
{{% /eastwest %}}

{{% govcloud %}}
[`https://dashboard.fr.cloud.gov/`](https://dashboard.fr.cloud.gov/)
{{% /govcloud %}}

## Play around in your "sandbox"

Here's how to deploy a test app in your sandbox for practice. (Note that **if you log in immediately after your account or organization was created,** you may not see any orgs or spaces to which you have access. Your sandbox space may take up to **5 minutes** to provision.)

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
