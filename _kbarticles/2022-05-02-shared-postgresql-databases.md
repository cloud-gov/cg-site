---
layout: post
title: "Creating shared PostgreSQL databases for your applications"
date: May 2, 2022
excerpt: How to create and managed shared PostgreSQL databases for your applications
---

The cloud.gov team [recently deprecated the shared database instance plans]({{ site.baseurl }}{% link _posts/2022-04-25-deprecation-notice.md %}) of our platform.

One of the major benefits of the shared database instance plans was the ability to very quickly create new
databases, facilitating rapid application development. Unlike dedicated instance plans, which each provision a
separate RDS database instance and take a while to create, shared instance plans re-used the same RDS database instance and created new databases within the same instance, which completes almost instantly.

This article will cover how to replicate the behavior of the deprecated shared instance plans using an 
open-source service broker known as [`postgres-tinsmith`](https://github.com/markdboyd/cf-postgres-tinsmith).

## Deploying and configuring `postgres-tinsmith`

Follow [the instructions in the repo README](https://github.com/markdboyd/cf-postgres-tinsmith) to create and configure the `postgres-tinsmith` service broker.

## Creating and using a database

Once `postgres-tinsmith` is deployed and configured, create a database:

```shell
cf create-service postgres shared <shared-db-name>
```

Then, update the `manifest.yml` for your application to include a binding for your database service. An 
example `manifest.yml` bound to the previously created database might look like (ensure you use the `<shared-db-name>` created above):

```yaml
---
applications:
- name: postgres-example-app
  instances: 1
  memory:  64M
  disk: 64M
  buildpack: nodejs_buildpack 
  services:
   - <shared-db-name>
```

After a `cf push`, your service should now be bound to your application. 

Running `cf env <application>` (e.g. `cf env postgres-example-app`) should show that information about the 
bound `<shared-db-name>` shows up in the `VCAP_SERVICES` environment variable. See the [CloudFoundry 
documentation for more information about `VCAP_SERVICES`](https://docs.cloudfoundry.org/devguide/deploy-apps/environment-variable.html#VCAP-SERVICES).

Make sure that your application properly reads and implements the credentials for the shared database from 
the `VCAP_SERVICES` environment variable.
