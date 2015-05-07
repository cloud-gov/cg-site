---
menu:
  main:
    parent: getting-started
title: Setup
weight: -100
---

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
cf api https://api.18f.gov
cf login
```

Once you log in for the first time, you'll probably want to change your password with:

```bash
cf passwd
```

## Public domain

This project is in the worldwide [public domain](https://github.com/18F/cloud-foundry-notes/blob/master/LICENSE.md). As stated in [CONTRIBUTING](https://github.com/18F/cloud-foundry-notes/blob/master/CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.
