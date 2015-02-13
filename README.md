## Getting Started With Cloud Foundry

Interacting with Cloud Foundry is easiest through the command line interface. You can install the CF CLI using:

```
brew tap pivotal/tap
brew install cloudfoundry-cli
```

You will need a cloud foundry account before continuing. Please create an issue in the [DevOps issue tracker](https://github.com/18F/DevOps/issues) and assign it to @dlapiduz or @ozzyjohnson.

To login, run
```
cf api --skip-ssl-validation https://api.labs.18f.us
cf login
```

Once you're in, you'll probably want to change your password with
```
cf passwd
```

##Orgs
Cloud Foundry groups its users by organizations, or orgs for short. When your account is created, it will be given permissions to an org.

You can run
```
cf org ORGNAME
```
To see details about your org, including which spaces it includes.

##Spaces
Every application is scoped to a space. Applications in the same space share a location for app development, deployment, and maintenance. To create a space:
```
cf create-space SPACENAME
```

You will be deploying the app from a directory on your local machine. To target a space for deployment, run
```
cf target -s SPACENAME
```

Now all of you `cf` commands will target that space by default.

### Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.

