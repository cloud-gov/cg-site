---
layout: post
title: "Reducing iteration time by using a custom PostgreSQL broker"
date: May 5, 2022
excerpt: How to use postgres-tinsmith service broker to quickly create PostgreSQL databases from a shared RDS instance
---

The cloud.gov team [recently deprecated shared database instance plans]({{ site.baseurl }}{% link _posts/2022-04-25-deprecation-notice.md %}).

Unlike dedicated instance plans, which each provision a separate RDS database instance and take a
while to create, shared instance plans re-used the same RDS database instance and created new
databases within the same instance, which completed almost instantly.

You can replicate the behavior of the deprecated shared instance plans using an 
open-source service broker known as [`postgres-tinsmith`](https://github.com/blacksmith-community/cf-postgres-tinsmith).

Please note that while this approach has been tested manually, the `postgres-tinsmith` repo is not
actively maintained by the cloud.gov team, so this documentation is provided as a **proof-of-concept only and does not offer any guarantees of production-readiness**.

## 1. Create a dedicated RDS service

View our available dedicated RDS instance plans for PostgreSQL:

```shell
cf marketplace -e aws-rds
```

Create a PostgreSQL service using one of the dedicated instance plans. For example:

```shell
cf create-service aws-rds micro-psql <dedicated-db-name>
```

## 2. Deploy and configure `postgres-tinsmith`

Follow [the instructions in the repo README](https://github.com/blacksmith-community/cf-postgres-tinsmith) to create and configure the `postgres-tinsmith` service broker.

Make sure to use the `<dedicated-db-name>` created in step 1 as the database service name to bind to
`postgres-tinsmith`.

## 3. Create a database

Once `postgres-tinsmith` is deployed and configured, create a database using the new `shared` plan of the
`postgres` service:

```shell
cf create-service postgres shared <db-name>
```

## 4. Bind database to your application

```shell
cf bind-service <application-name> <db-name>
cf restage <application-name>
```

Alternately, you can [bind the database service to your application using a `manifest.yml` file](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest-attributes.html#services-block).

### Verifying your bound database service

Running `cf env <application>` (e.g. `cf env postgres-example-app`) should show information about the 
bound `<db-name>` in the `VCAP_SERVICES` environment variable. See the [CloudFoundry 
documentation for more information about `VCAP_SERVICES`](https://docs.cloudfoundry.org/devguide/deploy-apps/environment-variable.html#VCAP-SERVICES).

## 5. Use the database in your application

Make sure that your application properly reads and implements the credentials for the database from 
the `VCAP_SERVICES` environment variable.
