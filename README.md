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
wget 'https://cli.run.pivotal.io/stable?release=linux64-binary&source=github' -O cf.tgz
tar -zxvf cf.tgz
sudo mv cf /usr/local/bin
```

Confirm the installation:

```bash
cf --version
```

As of this writing the current cf CLI version is `6.10.0-b78bf10`.
	
## Setting up your account

You will need a Cloud Foundry account before continuing. Please create an issue in the [DevOps issue tracker](https://github.com/18F/DevOps/issues) and assign it to [@dlapiduz](https://github.com/dlapiduz) or [@ozzyjohnson](https://github.com/ozzyjohnson).

To login, run:

```bash
cf api --skip-ssl-validation https://api.cf.18f.us
cf login
```

Once you're in, you'll probably want to change your password with:

```bash
cf passwd
```

## Orgs

Cloud Foundry groups its users by organizations, or orgs for short. Orgs group together users for management and present a shared perimiter for services, domains and quotas. When your account is created, it will be given permissions to an org and a personal space.

#### Management:

To list available orgs:

```bash
cf orgs
```

Only orgs where you've been assigned an org-role or those which contain a space where you've been assinged a space-role will appear.

To see details about a specific org, including quotas, routing domains and which spaces it includes:

```bash
cf org ORGNAME
```

In order to work with spaces you'll need to first target an org:

```bash
cf target -o ORGNAME
```

You can also target an org and space within at once:

```bash
cf target -o ORGNAME -s SPACENAME
```

## Spaces

Every application is scoped to a "space". Applications in the same space share a location for app development, deployment, and maintenance.

#### Management:

To create a space:

```bash
cf create-space SPACENAME
```

**Note:**  To create a space within a given org you must have the `OrgManager` role. You can check to see which users and managers for your org with:

```bash
cf org-users ORGNAME
```

#### Deployment:

You will be deploying the app from a directory on your local machine. To target a space for deployment:

```bash
cf target -s SPACENAME
```

From now on, all of your `cf` commands will target that space by default.

### Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.
