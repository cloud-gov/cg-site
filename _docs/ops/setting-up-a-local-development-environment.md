---
parent: deploying-cloudgov
layout: ops
layout: docs
sidenav: true
title: Setting up a local development environment
linktitle: Local Development
---

This guide is useful for setting up a local development environment for cloud.gov platform operations and includes a number of command-line tools used in the development and maintenance of the cloud.gov system.

This guide assumes you are using a standard GSA-provided Mac OS development asset for specifying commands and packages.

## Setting up a local development environment

### Pre-install for brand new machines

- Install `brew`
  - Note: If this is a new GSA-provided laptop, it likely does not come with `brew` installed. Install `brew` and other tools via the 18F platform scripts from the [18F laptop repo](https://github.com/18F/laptop) (or manually if you have strong preferences about the laptop script)
  - `bash <(curl -s https://raw.githubusercontent.com/18F/laptop/master/laptop)`

### Install open-source CloudFoundry

- Install [CloudFoundry for Mac per CF docs](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html#pkg-mac):
  - `brew tap cloudfoundry/tap`
  - `brew install cf-cli`
  - `brew install cloudfoundry/tap/bosh-cli`
  - `brew install openssl`
- An existing cloud.gov teammate will [make your cloud.gov admin account]({{ site.baseurl }}/docs/ops/managing-users/#creating-admins)
  - They will use the `create-cf-admin` script from `cg-scripts` with your GSA email address
- Verify cloud.gov account setup and CloudFoundry installation via the CLI
  - `cf login -a api.fr.cloud.gov --sso`
  - `cf orgs`
    - As a cloud.gov team member, you should have a very giant list of organizations
    - If you have none or one (e.g. sandbox) org, contact your facilitator

### Install Bosh

- Install the [Bosh CLI using their instructions for MacOS](https://bosh.io/docs/cli-v2-install/#using-homebrew-on-macos)
  - `brew install cloudfoundry/tap/bosh-cli`
  - Verify the installation using
    - `bosh -v`

### Install Concource & Fly

- Install the Concourse `fly` CLI
  - Download the `fly` binary zip for MacOS from https://concourse-ci.org/
  - Extract the binary and move it to `/usr/local/bin/fly` so it's in your path
    - `cd ~/Downloads`
    - `mv fly /usr/local/bin/fly`
  - Verify using `fly -h`

### Install Terraform

- Install Terraform and other tools per [cg-provision](https://github.com/18F/cg-provision)
  - `brew install terraform`
  - `brew install awscli`
  - `brew install jq`
  - Verify Terraform installed and is in your path
    - Run `terraform` and helper text should display
  - Verify AWS CLI installed and is in your path
    - Run `aws` and helper text should display

### Install cloud.gov dev scripts

- Install cloud.gov dev scripts by cloning the [`cg-scripts` repo](https://github.com/18F/cg-scripts/)
  - `git clone https://github.com/18F/cg-scripts.git`
  - Note: may also be done via Github Desktop
