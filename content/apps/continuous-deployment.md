---
menu:
  main:
    parent: apps
title: Continuous Deployment
weight: 10
---

Setting up continuous deployment allows you to automatically upload your
changes to your desired enivronment.

The first thing you need to do is setup a "deployer" user in your organization and give it permission to deploy to the desired space:

```
cf create-user ORGNAME_deployer RANDOM-PASSWORD
cf set-space-role ORGNAME_deployer ORG SPACE SpaceDeveloper
```

***

Depending on your CI system the setup is going to be a bit different.

### Travis

**THIS SOLUTION DOESN'T CURRENTLY WORK SINCE TRAVIS DOES NOT SUPPORT `--skip-ssl-validation` for CF**

Per [http://docs.travis-ci.com/user/deployment/cloudfoundry/](http://docs.travis-ci.com/user/deployment/cloudfoundry/) you need to add this section to your `.travis.yml` file:

```
deploy:
  edge: true
  provider: cloudfoundry
  username: DEPLOYER_USER
  password:
  api: https://api.cf.18f.us
  organization: ORG
  space: SPACE
```

Replace `DEPLOYER_USER`, `ORG`, and `SPACE` accordingly and run `travis encrypt --add deploy.password --skip-version-check` to enter your password.

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
    - cf login -a https://api.cf.18f.us -u DEPLOYER_USER -p $CF_PASS -o ORG -s SPACE --skip-ssl-validation

deployment:
  production:
    branch: master
    commands:
      - cf push
```

Replace `DEPLOYER_USER`, `ORG`, and `SPACE` accordingly and export the `CF_PASS` environment variable in the Circle interface to add your password.

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
        domain: cf.18f.us
        hostname: myapp
        skip_ssl: true
```

(make sure to change the "domain" and "hostname" as needed)

And setup the following environment variables in a "deploy target":

| Name    | Value              |
|---------|--------------------|
| CF_API  | `api.cf.18f.us`    |
| CF_USER | deployer username  |
| CF_PASS | deployer password  |
| CF_ORG  | target organization|
| CF_SPACE| target space       |



You can also add the `alt_appname` attribute to do [Blue-Green deploys](http://docs.pivotal.io/pivotalcf/devguide/deploy-apps/blue-green.html).

Example project: https://github.com/18F/cloud-foundry-notes/blob/master/wercker.yml.

***