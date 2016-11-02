---
menu:
  docs:
    parent: getting-started
title: Setup
weight: -50
---

## Setting up the command line
As a user, nearly all of your interactions with Cloud Foundry will be through the command line. To get it set up:

1. [Get an account]({{< relref "accounts.md" >}}).
1. [Install the CLI](https://docs.cloudfoundry.org/devguide/installcf/install-go-cli.html).
1. Confirm the installation by running

    ```bash
    cf -v
    ```

1. **If you log in using your agency's account system**, log in by running

    ```bash
    cf login -a api.cloud.gov --sso
    ```

    Then follow the link to get your one-time authentication code and enter it to log in.

    **Or if you log in with a cloud.gov account that has its own password** (including `ORGNAME_deployer` accounts), log in by running

    ```bash
    cf login -a api.cloud.gov
    ```

## Play around in a "sandbox"

If you want to practice deploying, run the following `cf target` command before continuing:

```bash
cf target -o <ORG> -s <SPACE>
```

Your `ORG` is a Cloud Foundry _organization_ named "sandbox-&lt;agencypart&gt;", where &lt;agencypart&gt; is whatever comes right before `.gov` or `.mil` in your
e-mail address. For example, `sandbox-gsa` or `sandbox-epa`. Your `SPACE` is probably the part of your email before the `@`, e.g. `firstname.lastname`. Cloud Foundry _spaces_ let applications run independently within an organization.  

For example:

```bash
cf target -o sandbox-gsa -s harry.truman
```
**If you log in immediately after your account or organization was created,** you may not see any orgs or spaces to which you have access. Your sandbox space may take up to **5 minutes** to provision.

**Be tidy**: When you're done, please `cf delete <APPNAME>`. See the walkthrough for [your first deploy]({{< relref "your-first-deploy.md" >}}).
