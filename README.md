## Getting Started With Cloud Foundry

Cloud Foundry is an open source Platform-as-a-Service (PaaS) system for managing the deployment of apps, services, and background tasks. 18F is evaluating it for use in our development and production systems.

## Installing the CLI

Interacting with Cloud Foundry is easiest through the `cf` command line interface.

On **OS X**, install with:

```
brew tap pivotal/tap
brew install cloudfoundry-cli
```

On **Linux**, download and uncompress the binary, and move it somewhere in your `$PATH`:

```bash
wget https://cli.run.pivotal.io/stable?release=linux64-binary&source=github -O cf.tgz
tar -zxvf cf.tgz
sudo mv cf /usr/local/bin
```

## Setting up your account

You will need a Cloud Foundry account before continuing. Please create an issue in the [DevOps issue tracker](https://github.com/18F/DevOps/issues) and assign it to [@dlapiduz](https://github.com/dlapiduz) or [@ozzyjohnson](https://github.com/ozzyjohnson).

To login, run:

```bash
cf api --skip-ssl-validation https://api.labs.18f.us
cf login
```

Once you're in, you'll probably want to change your password with:

```
cf passwd
```

## Orgs

Cloud Foundry groups its users by organizations, or orgs for short. When your account is created, it will be given permissions to an org.

To see details about your org, including which "spaces" it includes:

```bash
cf org ORGNAME
```

## Spaces

Every application is scoped to a "space". Applications in the same space share a location for app development, deployment, and maintenance.

To create a space:

```bash
cf create-space SPACENAME
```

You will be deploying the app from a directory on your local machine. To target a space for deployment:

```
cf target -s SPACENAME
```

From now on, all of your `cf` commands will target that space by default.

### Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.
