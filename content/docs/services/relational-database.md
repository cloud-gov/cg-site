---
menu:
  docs:
    parent: services
title: Relational databases (aws-rds)
description: "Persistent, relational databases using Amazon RDS"
aliases:
  - /docs/apps/databases
---

If your application uses relational databases for storage, you can use the AWS RDS service to create a database instance.

## Plans

Plan Name | Description | Price
--------- | ----------- | -----
`shared-psql`            | Shared PostgresSQL database for prototyping (no sensitive or production data) | Free
`medium-psql`            | Dedicated medium RDS PostgreSQL DB instance                                   | Will be paid per hour + storage
`medium-psql-redundant`  | Dedicated redundant medium RDS PostgreSQL DB instance                         | Will be paid per hour + storage
`large-psql`             | Dedicated large RDS PostgreSQL DB instance                                    | Will be paid per hour + storage
`large-psql-redundant`   | Dedicated redundant large RDS PostgreSQL DB instance                          | Will be paid per hour + storage
`shared-mysql`           | Shared MySQL database for prototyping (no sensitive or production data)       | Free
`medium-mysql`           | Dedicated medium RDS MySQL DB instance                                        | Will be paid per hour + storage
`medium-mysql-redundant` | Dedicated redundant medium RDS MySQL DB instance                              | Will be paid per hour + storage
`large-mysql`            | Dedicated large RDS MySQL DB instance                                         | Will be paid per hour + storage
`large-mysql-redundant`  | Dedicated redundant large RDS MySQL DB instance                               | Will be paid per hour + storage
`medium-oracle-se1`      | Dedicated medium RDS Oracle SE1 DB; available by request via [cloud.gov support](mailto:cloud-gov-support@gsa.gov) | Will be paid per hour + storage

Note: the `medium-oracle-se1` plan is only available by request because AWS is [deprecating](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Oracle.html#Oracle.Concepts.Deprecate.12101) Oracle SE1. AWS GovCloud expects to support [Oracle SE2](http://www.oracle.com/us/products/database/oracle-db-se2-brief-2680836.pdf) in July 2017; at that point, we'll add a corresponding service plan and make it available to all users without requesting access.

### Pricing
Shared instances are free. Simple and redundant instances will have pricing per hour and per GB per month. [Learn more about managed service pricing.]({{< relref "overview/pricing/managed-services-cost.md" >}})

## Options

Name | Required | Description | Default
--- | --- | --- | ---
`storage` |  | Number of GB available to the database instance | 10

## Create an instance

To create a service instance run the following command:

```sh
cf create-service aws-rds medium-psql my-db-service
```

If you want to specify the storage available to the instance:

```sh
cf create-service aws-rds medium-psql my-db-service -c '{"storage": 50}'
```

### Bind to an application

To use the service instance from your application, bind the service instance to the application. For an overview of this process and how to retrieve the credentials for the service instance from environment variables, see [Bind a Service Instance](https://docs.cloudfoundry.org/devguide/services/managing-services.html#bind) and the linked details at [Delivering Service Credentials to an Application](https://docs.cloudfoundry.org/devguide/services/application-binding.html).

In short, `cf bind-service` will provide a `DATABASE_URL` environment variable for your app, which is then picked up by the `restage`. Note that for a Rails app, `bind-service` will [overwrite your `database.yml`](http://docs.cloudfoundry.org/buildpacks/ruby/ruby-service-bindings.html#rails-applications-have-autoconfigured-database-yml).

The contents of the `DATABASE_URL` environment variable contain the credentials to access your database. Treat the contents of this and all other environment variables as sensitive.

## Access the data in the database

There are currently two ways to access the database directly.

1. [The `cg-migrate-db` plugin](#cg-migrate-db-plugin). It is a self contained
executable which will interactively assist with accessing the data in the
database. It supports accessing data from different types of databases.
1. [Manually accessing the database](#manually-access-a-database). This way
requires manually downloading the tool(s) needed to access the database. The
only type of database supported via this method is PostgreSQL.

### cg-migrate-db plugin
The easiest way to access the data in your database is via the `cg-migrate-db`
plugin.

Please check out the [repository](https://github.com/18F/cg-migrate-db)
for instructions on how to install the plugin, backup data, import data,
download a local copy of the data, and upload a local copy of the data.

### Manually access a database

The instructions below are for PostgreSQL, but should be similar for MySQL or others.

#### Using cf ssh

To access a service database, use the [cf-service-connect plugin](https://github.com/18F/cf-service-connect#readme).

### Export

#### Create backup

First, connect to an instance using the [cf-service-connect plugin](https://github.com/18F/cf-service-connect#readme):

```sh
$ cf connect-to-service --no-client ${APP_NAME} ${SERVICE_NAME}
...
Host: localhost
Port: ...
Username: ...
Password: ...
Name: ...
```

Without closing the SSH session managed by the cf-service-connect plugin, create the backup file using the parameters provided by the plugin:

```sh
$ pg_dump postgresql://${USERNAME}:${PASSWORD}@${HOST}/${PORT}/${NAME} -f backup.pg
```

### Download

> [Documentation for using scp and sftp](https://docs.cloudfoundry.org/devguide/deploy-apps/ssh-apps.html#other-ssh-access)

On your local host:

Get your app's GUID:

```sh
$ cf app {app name} --guid
```

Obtain a one-time authorization code:

```sh
$ cf ssh-code
```

Run `sftp` or `scp` to transfer files to/from an application instance.  You must specify port 2222 and supply the app GUID and instance number.  Use the one-time authorization from above as the password.  The username format is `cf:GUID/INSTANCE`.

For example, to connect to instance 0 of the application with GUID 0745e60b-c7f3-49a7-a6c2-878516a34796:

```
$ sftp -P 2222 cf:0745e60b-c7f3-49a7-a6c2-878516a34796/0@ssh.fr.cloud.gov
cf:0745e60b-c7f3-49a7-a6c2-878516a34796/0@ssh.fr.cloud.gov's password: ******
Connected to ssh.fr.cloud.gov.
sftp> get backup.pg
sftp> quit
```

### Restore to local database

Load the dump into your local database using the [pg_restore](https://www.postgresql.org/docs/current/static/app-pgrestore.html) tool. If objects exist in a
local copy of the database already, you might run into inconsistencies when doing a
`pg_restore`. This pg_restore invocation does not drop all of the objects in the database when loading the
dump.

```sh
$ pg_restore --clean --no-owner --no-acl --dbname={database name} backup.pg
```

## The broker in GitHub

You can find the broker here: [https://github.com/18F/aws-broker](https://github.com/18F/aws-broker).
