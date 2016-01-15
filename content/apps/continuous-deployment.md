---
menu:
  main:
    parent: advanced
title: Continuous Deployment
---

Setting up continuous deployment allows you to automatically upload your
changes to your desired environment.

## Zero-downtime deployment

Use the [autopilot](https://github.com/concourse/autopilot) Cloud Foundry CLI plugin or the [`cf-blue-green`](https://github.com/18F/cf-blue-green) tool; see instructions in the respective repositories.

## Continuous integration services

The first thing you need to do is ask an admin to setup a "deployer" user in your organization and give it permission to deploy to the desired space:

```
cf create-user ORGNAME_deployer RANDOM-PASSWORD
cf set-space-role ORGNAME_deployer ORG SPACE SpaceDeveloper
```

***

Depending on your CI system the setup is going to be a bit different. **For all cases you will need a `manifest.yml` file.**

### Travis

Per [http://docs.travis-ci.com/user/deployment/cloudfoundry/](http://docs.travis-ci.com/user/deployment/cloudfoundry/) you need to add this section to your `.travis.yml` file:

```yaml
deploy:
  edge: true
  provider: cloudfoundry
  username: DEPLOYER_USER
  password:
  api: https://api.cloud.gov
  organization: ORG
  space: SPACE
```

You will also need to require `sudo` rights for your Travis build (now off by default) in your `.travis.yml`:

```yaml
sudo: required
```

Replace `DEPLOYER_USER`, `ORG`, and `SPACE` accordingly and run `travis encrypt --add deploy.password --skip-version-check` to enter the deployer's password.

#### Using Conditional Deployments

A common pattern for team workflows is to use separate development and master branches, along with using a staging or QA deployment with the development branch, and a production deployment with the master branch. This can be achieved in Travis with [`on:`](https://docs.travis-ci.com/user/deployment#Conditional-Releases-with-on%3A) to specify a branch, and using unique manifests for each deployment.

```yaml
deploy:
  - edge: true
    provider: cloudfoundry
    username: DEPLOYER_USER
    password:
    api: https://api.cloud.gov
    organization: ORG
    space: SPACE
    manifest: manifest-staging.yml
    on:
      branch: develop
  - edge: true
    provider: cloudfoundry
    username: DEPLOYER_USER
    password:
    api: https://api.cloud.gov
    organization: ORG
    space: SPACE
    manifest: manifest.yml
    on:
      branch: master
```

Each manifest should at the very least define an unique name, but can also define an unique host as well. Also, it may be necessary to define unique services for each application to use. See [Cloning Applications]({{< relref "cloning.md" >}}) for more information.


#### Jekyll Site

Deploying a Jekyll site requires a few changes to your `.travis.yml` and `manifest.yml` as well as the addition of a `Staticfile` and `Gemfile`. Add or update your Gemfile to include the jekyll gem.

**Gemfile**

```
source "https://rubygems.org"

gem "jekyll"
```

Add the following lines to the top of your `.travis.yml` to pull Ruby and build the site.

**.travis.yml:**

```yaml
language: ruby
rvm:
- 2.1
script: jekyll build ./_site
```

Add a Staticfile pointing to the root of the built site as specified above. The static buildpack will interpret with file.

**Staticfile**

```
root: _site
```

Update manifest.yml to use the static buildpack.

**manifest.yml**

```
buildpack: https://github.com/cloudfoundry/staticfile-buildpack.git
```

See [18F/notalone](https://github.com/18F/notalone) and [18F/18f.gsa.gov](https://github.com/18F/18f.gsa.gov) for working examples.

**Additional Resources:**

- [Jekyll - Continuous Integration](http://jekyllrb.com/docs/continuous-integration/)
- [Travis - Cloud Foundry Deployment](http://docs.travis-ci.com/user/deployment/cloudfoundry/)
- [Travis - The Lifecycle of a Travis CI Build](http://docs.travis-ci.com/user/build-lifecycle/)

***

### CircleCI

Add this items to your `circle.yml` file:

```
dependencies:
  pre:
    - wget http://go-cli.s3-website-us-east-1.amazonaws.com/releases/latest/cf-cli_amd64.deb -qO temp.deb
    - sudo dpkg -i temp.deb
    - cf -v

test:
  post:
    - cf login -a https://api.cloud.gov -u DEPLOYER_USER -p $CF_PASS -o ORG -s SPACE

deployment:
  production:
    branch: master
    commands:
      - cf push
```

Replace `DEPLOYER_USER`, `ORG`, and `SPACE` accordingly and export the `CF_PASS` environment variable in the Circle interface to add the deployer's password.

**Note**: if your `manifest.yml` describes more than one app you might want to specify which app to push in the `cf push` line.

***

### Wercker

On your `wercker.yml` file add:

```
steps:
  ...
  - dlapiduz/cloud-foundry-deploy
  ...
deploy:
  steps:
    - dlapiduz/cloud-foundry-deploy:
        api: $CF_API
        username: $CF_USER
        password: $CF_PASS
        organization: $CF_ORG
        space: $CF_SPACE
        appname: myapp
        domain: 18f.gov
        hostname: myapp
        skip_ssl: true
```

(make sure to change the "domain" and "hostname" as needed)

And setup the following environment variables in a "deploy target":

| Name    | Value              |
|---------|--------------------|
| CF_API  | `api.cloud.gov`      |
| CF_USER | deployer username  |
| CF_PASS | deployer password  |
| CF_ORG  | target organization|
| CF_SPACE| target space       |



You can also add the `alt_appname` attribute to do [Blue-Green deploys](http://docs.pivotal.io/pivotalcf/devguide/deploy-apps/blue-green.html).

Example project: https://github.com/18F/cloud-foundry-notes/blob/master/wercker.yml.

***
