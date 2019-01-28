---
menu:
  docs:
    parent: getting-started
title: Set up cloud.gov and log in
weight: -50
---

If you have [access to cloud.gov]({{< relref "accounts.md" >}}), here's how to log in.

## Log into the dashboard (web interface)

The dashboard gives you web-based access to common tasks: [**https://dashboard.fr.cloud.gov/**](https://dashboard.fr.cloud.gov/)


## Set up the command line

cloud.gov is based on the Cloud Foundry open source project, so cloud.gov uses the Cloud Foundry command line interface (CLI) to give you full access.

1. Install the Cloud Foundry CLI: [Windows](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html#windows), [Mac OS X](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html#mac), or [Linux](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html#linux). If you can't use the installer, you can [download the CLI binary and install it manually](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html#bin).
1. Log in:
  1. Enter **`cf login -a api.fr.cloud.gov --sso`**
  1. It'll say `One Time Code ( Get one at `[`https://login.fr.cloud.gov/passcode`](https://login.fr.cloud.gov/passcode)` )` -- visit this login link in your browser.
  1. If you use a cloud.gov account, you may need to log in using your email address, password, and multi-factor authentication token. (EPA, FDIC, GSA, and NSF: use your agency button.)
  1. After you log in, the page will display your 10-character Temporary Authentication Code.
  1. Copy and paste that 10-character code into the command line (no typing indicators will show), and enter it.

<!--**Tip:** The `fr.` in this URL (and other cloud.gov URLs) is short for FedRAMP.-->

## Take the next step

Now [try your first deploy of a test application]({{< relref "your-first-deploy.md" >}}).
