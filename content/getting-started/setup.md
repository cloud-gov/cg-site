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
cf -v
```

As of this writing the current cf CLI version is `6.13.0-e68ce0f`.

### Log in

[Once you have an account]({{< relref "accounts.md" >}}), run

```bash
cf login -a api.cloud.gov
```

If you were given a password, you'll probably want to change it with:

```bash
cf passwd
```

If for some reason you cannot reset your password with `cf passwd` you can also use the
[web-based reset feature](https://login.cloud.gov/forgot_password).

## Playing around

If you want to practice deploying, run the following before continuing:


```bash
cf target -o sandbox -s <USERNAME>
```

Your `USERNAME` is probably the part of your email before the `@`, e.g. `FIRSTNAME.LASTNAME`. When you're done, please `cf delete <APPNAME>`.
