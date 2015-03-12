# Getting Started With Cloud Foundry

Cloud Foundry is an open source Platform-as-a-Service (PaaS) system for managing the deployment of apps, services, and background tasks. 18F is evaluating it for use in our development and production systems.

## Installing the CLI

Interacting with Cloud Foundry is easiest through the `cf` command line interface.

### OSX

```bash
brew tap pivotal/tap
brew install cloudfoundry-cli
```

### Linux

Download and uncompress the binary, and move it somewhere in your `$PATH`:

```bash
wget 'https://cli.run.pivotal.io/stable?release=linux64-binary&source=github' -O cf.tgz
tar -zxvf cf.tgz
sudo mv cf /usr/local/bin
```

### Confirm the installation

```bash
cf --version
```

As of this writing the current cf CLI version is `6.10.0-b78bf10`.

## Setting up your account

You will need a Cloud Foundry account before continuing. Please [create an issue in the DevOps issue tracker](https://github.com/18F/DevOps/issues/new) and assign it to [@dlapiduz](https://github.com/dlapiduz) or [@ozzyjohnson](https://github.com/ozzyjohnson).

### Log in

```bash
cf api --skip-ssl-validation https://api.cf.18f.us
cf login
```

Once you log in for the first time, you'll probably want to change your password with:

```bash
cf passwd
```

## [Orgs](http://docs.cloudfoundry.org/concepts/roles.html#orgs)

Cloud Foundry groups its users by organizations, or "orgs" for short. Orgs group together users for management and present a shared perimeter for services, domains and quotas. When your account is created, it will be given permissions to an org and a personal space.

### Naming convention

Within 18F, the `ORGNAME` will correspond to a project/client, e.g. `cap` for GSA's [Common Acquisition Platform](https://18f.gsa.gov/dashboard/project/C2/), or `devops` for internal apps like [Hubot](https://github.com/18F/18f-bot).

### List available orgs

```bash
cf orgs
```

Only orgs where you've been assigned an org-role or those which contain a space where you've been assigned a space-role will appear.

### See details about a specific org

...including quotas, routing domains and which spaces it includes:

```bash
cf org ORGNAME
```

### Target an org

In order to work with spaces, you'll need to do this first:

```bash
cf target -o ORGNAME
```

## [Spaces](http://docs.cloudfoundry.org/concepts/roles.html#spaces)

Every application is scoped to a "space". Applications in the same space share a location for app development, deployment, and maintenance.

### Naming convention

Within 18F, the `SPACENAME` will correspond to a an application+environment, e.g. `c2-dev`, or `foia-hub-prod`.

### Management

To create a space:

```bash
cf create-space SPACENAME
```

**Note:**  To create a space within a given org you must have the `OrgManager` role. You can check to see which users and managers for your org with:

```bash
cf org-users ORGNAME
```

### Deployment

You will be deploying the app from a directory on your local machine.

#### Target a space

```bash
cf target -s SPACENAME
```

From now on, all of your `cf` commands will target that space by default.

#### Target an org and space at once

```bash
cf target -o ORGNAME -s SPACENAME
```

## Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.
