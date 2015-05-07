---
menu:
  main:
    parent: getting-started
title: Setup
weight: -100
---

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

## Playing around

If you want to practice deploying, run the following before continuing:


```bash
cf target -o sandbox -s <USERNAME>
```

Your `USERNAME` is probably the part of your email before the `@`, e.g. `FIRSTNAME.LASTNAME`. When you're done, please `cf delete <APPNAME>`.
