---
menu:
  docs:
    parent: advanced
title: Continuous deployment
---

Setting up continuous deployment allows you to automatically upload your
changes to your desired environment.

## Get ready

Before setting up continuous deployment:

1. Go through the [production-ready guide]({{< relref "production-ready.md" >}}) to ensure your application uses the [core best practices]({{< relref "production-ready.md#core-best-practices" >}}) and [zero-downtime deployment]({{< relref "production-ready.md#zero-downtime-deploy" >}}). This will help you use continuous deployment with reduced risk of errors and outages.
1. Set up continuous integration. This will protect you from deploying a broken application. You can use the same service for continuous integration and continuous deployment — see [the list of continuous integration services below]({{< relref "#continuous-integration-services" >}}) for suggestions.

## Provision deployment credentials

Continuous deployment systems require credentials for use in pushing new versions of your application code to cloud.gov. You should use a restricted set of credentials that can only access a particular target space, rather than credentials tied to a user who has more access, or who may lose access when leaving your team or project. This "least privilege" approach minimizes the harm that is possible if the credentials are compromised in any way.

To provision a deployer account with permission to deploy to a single space, [set up an instance of a cloud.gov service account]({{< relref "docs/services/cloud-gov-service-account.md" >}}).

## Continuous integration services

To set up any of these services, you will need to provide [a `manifest.yml` file](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html) that captures the intended deployment configuration for your application.

### Travis

See [the Travis documentation](http://docs.travis-ci.com/user/deployment/cloudfoundry/).

Use `api: https://api.fr.cloud.gov`

You must encrypt the password, and you must [**escape any symbol characters in the password**](https://docs.travis-ci.com/user/encryption-keys#Note-on-escaping-certain-symbols), to prevent possible situations where Travis could dump an error message that contains passwords or environment variables.

For more information about configuring Travis, see [Customizing the Build](https://docs.travis-ci.com/user/customizing-the-build/).

#### Using Conditional Deployments with Travis

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

#### Jekyll with Travis

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

For details, see [Jekyll's Continuous Integration guide](http://jekyllrb.com/docs/continuous-integration/).


### CircleCI

Add these items to your `circle.yml` file:

```yaml
dependencies:
  pre:
    - curl -v -L -o cf-cli_amd64.deb 'https://cli.run.pivotal.io/stable?release=debian64&source=github'
    - sudo dpkg -i cf-cli_amd64.deb
    - cf -v

test:
  post:
    - cf login -a https://api.fr.cloud.gov -u DEPLOYER_USER -p $CF_PASS -o ORG -s SPACE

deployment:
  production:
    branch: master
    commands:
      - cf push
```

Replace `DEPLOYER_USER`, `ORG`, and `SPACE` accordingly, and export the `CF_PASS` environment variable in the Circle interface to add the deployer's password.

**Note**: If your `manifest.yml` describes more than one app, you might want to specify which app to push in the `cf push` line.
