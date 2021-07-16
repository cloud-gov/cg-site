---
title: Cloud.gov Setup
permalink: /pages/documentation/cloud-gov-setup/
layout: docs
navigation: pages
sidenav: pages-documentation
redirect_from:
  - /pages/how-federalist-works/cloud-gov-setup/
---

## Configuring Federalist in cloud.gov's GovCloud environment

Federalist is built to be deployed to the [GovCloud]({{ site.baseurl }}/docs/apps/govcloud/) region in [cloud.gov]({{ site.baseurl }}/docs/). This guide is targeted at anyone who wishes to deploy the entire Federalist system to cloud.gov from the ground up, or anyone who wishes to get a better grasp of how the system is architected by looking at how it is deployed.

Before reading this guide, it may be helpful to refer to [How Federalist Works]({{site.baseurl}}/pages/documentation/how-federalist-works/) to understand what components make up the Federalist architecture and how they are interrelated.

A Federalist deploy comprises of the following steps:

- Creating a GitHub OAuth Application
- Creating user-provided-services
- Provisioning AWS resources
- Deploying application components
    - federalist web
    - federalist builder
    - federalist build containers
- Federalist External Domain

### Creating a GitHub OAuth Application

Federalist requires a GitHub OAuth application in order to work. The OAuth
application should be setup under the GitHub organization that is deploying Federalist (e.g., the 18F org for any instance of Federalist used by 18F).

Adding an application is done within an organization's settings. Navigate to
`Settings > Developer Settings > OAuth Applications`. Fill out all of the
necessary fields. Make sure that the authorization URL is set to Federalist's
OAuth authorization URL, e.g. `https://federalist.18f.gov/auth`.

When the application is created, save the client and secret keys to add to the
`federalist-<environment>-env` user provided service as described below.

### Creating user-provided-services

Note: The federalist app components are built to be [deployed from CircleCI](https://circleci.com/docs/2.0/deployment_integrations/). The instructions for deploying federalist app components are described within their respective repositories.

Before deploying the federalist app componentsis it is necesaryto configure their  environment. The apps' manifests set their required environments. The manifest itself sets environment variables directly for non-secret configs. For secret configs it binds user-provided services.

The manifest specifies the following services which are provided by cloud.gov by cloud.gov service brokers.

In additional, there are user provided services used by federalist and federalist-bulder applications. 

1. `federalist-production-env` or `federalist-staging-env` depending on the environment. This user provided service should be created with the following values:
```yaml
FEDERALIST_SESSION_SECRET: <SECRET FOR THE SESSION STORE>
GITHUB_CLIENT_ID: <CLIENT ID FOR GITHUB AUTH>
GITHUB_CLIENT_SECRET: <CLIENT SECRET FOR GITHUB AUTH>
GITHUB_CLIENT_CALLBACK_URL: <OAUTH CALLBACK URL FOR GITHUB AUTH>
GITHUB_WEBHOOK_SECRET: <SECRET FOR SIGNING GITHUB WEBHOOKS>
GITHUB_WEBHOOK_URL: <URL FOR GITHUB WEBHOOKS TO CALLBACK TO>
```

2. A `federalist-deploy-user` instance created in each production and staging environment. This user provided service should be created with the following values:
```yaml
DEPLOY_USER_USERNAME: <DEPLOY USER USERNAME>
DEPLOY_USER_PASSWORD: <DEPLOY USER PASSWORD>
SERVICE_KEY_NAME: federalist-<env>-deployer-circle-key
```

3. `federalist-production-sqs-creds` or `federalist-staging-sqs-creds` instance created in each production and staging environment. This user provided service should be created with the following values:
```yaml
 access_key: "<AWS ACCESS KEY>"
 region": "<AWS REGION>"
 secret_key": "<AWS SECRET KEY"
 sqs_url": "<SQS QUEUE URL>"
```

4. `federalist-production-uev-key` or `federalist-staging-uev-key` instance created in each production and staging environment. This user provided service should be created with the following values:
```yaml
 key: "<Encryption key to decrypt user environment variables>"
 ```
The user provided service can be created with the [Cloud Foundry CLI](https://docs.cloudfoundry.org/devguide/services/user-provided.html#create).

Once the user provided services are created deploying is a simple as running `cf push`.

### Provisioning AWS resources

The next pieces of Federalist that need to be deployed will depend on certain AWS resources. That makes this a good time to provision the AWS resources that are needed:

- An RDS instance for the database
- An S3 bucket for storing the sites' files
- An SQS queue for build messages
- An IAM user for ECR

[How Federalist Works]({{site.baseurl}}/pages/documentation/how-federalist-works/) contains the details about how each of these should be configured.

#### Provisioning an RDS instance

The RDS instance can be provisioned with cloud.gov's RDS service broker and doesn't need any special configuration:

```shell
cf create-service aws-rds micro-psql federalist-production-rds
```

#### Provisioning an ECR instance

At this time cloud.gov does not have an ECR service broker.  The ECR instance will need to be configured elsewhere.
For information how Federalist manages its ECR service visit the [federalist-infra repository](https://github.com/18f/federalist-infra).

#### Provisioning an SQS queue
At this time cloud.gov does not have an SQS service broker. The SQS queue will need to be configured elsewhere.

### Deploy Federalist application components

#### Deploy federalist web

For information how to deploy this app visit the [federalist repository](https://github.com/18f/federalist).

##### Federalist External Domain

Federalist uses an [external domain service provided by cloud.gov]({{ site.baseurl }}/docs/services/external-domain-service/) which brokers a Cloudfront Distribution to route traffic from the public domain to the application. To create such a service, run the following while targeting the appropriate space in cloud.gov:

```shell
cf create-service external-domain domain-with-cdn federalist-route -c '{
  "domain": "federalist.18f.gov",
  "origin": "<URL WHERE FEDERALIST IS HOSTED>"
}'
```

Once this is done, running `cf service federalist-route` should give you a CloudFront domain name. Next, [open a PR against the DNS repo to add a CNAME record for federalist.18f.gov with the CloudFront URL](https://github.com/18F/dns/commit/403f67db920e629c73bd7e2c43fbb367514af8cf). Once the DNS changes propagate, Federalist should be available at [federalist.18f.gov](https://federalist.18f.gov).

By default, the CDN caches error responses, so you will also need to work with cloud.gov support to [change the mimimum error caching TTL to 0](http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/HTTPStatusCodes.html).

#### Deploy federalist-builder

For information how to deploy this app visit the [federalist-builder repository](https://github.com/18f/federalist-builder).

#### Deploying build containers

Federalist's "build containers" are cloud.gov apps running with the [federalist-garden-build](https://github.com/18f/federalist-garden-build) image.

For information on how to deploy this app visit the [federaist-garden-build repository](https://github.com/18f/federalist-garden-build).

## Updating a Federalist site's CloudFront to serve from S3

**Only to be used in proxy downtime situations (which has only happened once historically).**

1. Review initial “Default” cache behavior and origin.
[![Initial cache settings]({{site.baseurl}}/assets/pages/images/cloudfront-update-1.png)]({{site.baseurl}}/assets/pages/images/cloudfront-update-1.png)

2. Review the “origin path” for the existing *bucket-name*.app.cloud.gov origin
[![Current origin settings]({{site.baseurl}}/assets/pages/images/cloudfront-update-2.png)]({{site.baseurl}}/assets/pages/images/cloudfront-update-2.png)

3. Add a new S3 origin pointing directly to the site's [S3 website endpoint](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteEndpoints.html) and site’s origin path (found in step 2). (Note: you can skip this if the S3 origin already exists)
[![S3 origin settings]({{site.baseurl}}/assets/pages/images/cloudfront-update-3.png)]({{site.baseurl}}/assets/pages/images/cloudfront-update-3.png)

4. Modify “Default” cache behavior:
    1. Set the “Origin” to point to the new S3 Origin
    2. Set the “Viewer Protocol Policy” to *HTTP and HTTPS*
[![Use new origin]({{site.baseurl}}/assets/pages/images/cloudfront-update-4.png)]({{site.baseurl}}/assets/pages/images/cloudfront-update-4.png)

5. After downtime, modify default cache behavior back to the original state.
[![Initial cache settings]({{site.baseurl}}/assets/pages/images/cloudfront-update-1.png)]({{site.baseurl}}/assets/pages/images/cloudfront-update-1.png)
