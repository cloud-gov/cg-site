---
menu:
  docs:
    parent: advanced
title: Continuous deployment
---

Setting up continuous deployment allows you to automatically upload your
changes to your desired environment.

Make sure that you've previously looked at the [Production Ready Guide]({{< relref "production-ready.md" >}}) and followed best practices.


## Continuous integration services

The first thing you need to do is ask an admin to setup a "deployer" user in your organization and give it permission to deploy to the desired space:

```
cf create-user ORGNAME_deployer RANDOM-PASSWORD
cf set-space-role ORGNAME_deployer ORG SPACE SpaceDeveloper
```

***

Depending on your CI system the setup is going to be a bit different. **For all cases you will need a `manifest.yml` file.**

### Travis

See [the Travis documentation](http://docs.travis-ci.com/user/deployment/cloudfoundry/), using `api: https://api.cloud.gov` and encrypting the password.

#### Using Conditional Deployments

A common pattern for team workflows is to use separate development and master branches, along with using a staging or QA deployment with the development branch, and a production deployment with the master branch. This can be achieved in Travis with [`on:`](https://docs.travis-ci.com/user/deployment#Conditional-Releases-with-on%3A) to specify a branch, and using unique manifests for each deployment.

```yaml
deploy:
- manifest: manifest-staging.yml
  # ...
  on:
    branch: develop
- manifest: manifest.yml
  # ...
  on:
    branch: master
```

Each manifest should at the very least define an unique `name`, but can also define an unique `host`. Also, it may be necessary to define unique services for each application to use. See [Cloning Applications]({{< relref "cloning.md" >}}) for more information.

#### Jekyll

To deploy a Jekyll site, add the following to your `.travis.yml`:

```yaml
language: ruby
rvm:
- 2.1
script: jekyll build ./_site
deploy:
  skip_cleanup: true
  # ...
```

#### Additional resources

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

***
