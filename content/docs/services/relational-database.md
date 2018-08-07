---
menu:
  docs:
    parent: services
title: Relational databases (RDS)
description: "Persistent, relational databases using Amazon RDS"
aliases:
  - /docs/apps/databases
---

If your application uses relational databases for storage, you can use the AWS RDS service to create a database instance.

## Plans

Plan Name | Description | Software Version | Price
--------- | ----------- | ------- | -----
`shared-psql`            | Shared PostgreSQL database for prototyping (no sensitive or production data) | 9.4.7 | Free
`medium-psql`            | Dedicated medium RDS PostgreSQL DB instance                                  | 9.6.3 |  Will be paid per hour + storage
`medium-psql-redundant`  | Dedicated redundant medium RDS PostgreSQL DB instance                        | 9.6.3 | Will be paid per hour + storage
`large-psql`             | Dedicated large RDS PostgreSQL DB instance                                   | 9.6.3 | Will be paid per hour + storage
`large-psql-redundant`   | Dedicated redundant large RDS PostgreSQL DB instance                         | 9.6.3 | Will be paid per hour + storage
`shared-mysql`           | Shared MySQL database for prototyping (no sensitive or production data)      | 5.6.27 | Free
`medium-mysql`           | Dedicated medium RDS MySQL DB instance                                       | 5.7.21 | Will be paid per hour + storage
`medium-mysql-redundant` | Dedicated redundant medium RDS MySQL DB instance                             | 5.7.21 | Will be paid per hour + storage
`large-mysql`            | Dedicated large RDS MySQL DB instance                                        | 5.7.21 | Will be paid per hour + storage
`large-mysql-redundant`  | Dedicated redundant large RDS MySQL DB instance                              | 5.7.21 | Will be paid per hour + storage
`medium-oracle-se2`      | Dedicated medium RDS Oracle SE2 DB | 12.0.1.2.v11 | Will be paid per hour + storage

### Pricing
Shared instances are free. Simple and redundant instances will have pricing per hour and per GB per month. [Learn more about managed service pricing.]({{< relref "overview/pricing/managed-services-cost.md" >}})

Shared instances are available in [sandbox spaces]({{< relref "overview/pricing/free-limited-sandbox.md#sandbox-limitations" >}}).

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

### Instance creation time

Dedicated RDS instance provisioning can take anywhere between 5 minutes and 60
minutes. During instance provisioning, the results of `cf services` or `cf service SERVICE_NAME` will show status as `created`, as in the following example:

```
> cf services
name                 service   plan                bound apps   last operation
test-oracle          aws-rds   medium-oracle-se2                create succeeded
```

**The `last operation` value of `create succeeed` may lead you to think the database is ready to use. This is misleading.** Instead, the _last operation_ indicates the API call to create the database has succeeded, not that provisioning has completed. To determine if a database is ready to use, test if you can create a `service key`. For example, `test-oracle` is not yet ready in this case:

```
cf create-service-key test-oracle test-oracle-ok
Creating service key test-oracle-oke for service instance test-oracle as peter.burkholder@gsa.gov...
FAILED
Server error, status code: 502, error code: 10001, message: Service broker error: There was an error binding the database instance to the application. Error: Instance not available yet. Please wait and try again..
```

If the response is `OK` instead of `FAILED` then your database is ready to use.

The cloud.gov team aims to provide clearer status indicators in a future release of our service broker.

### Bind to an application

To use the service instance from your application, bind the service instance to the application. For an overview of this process and how to retrieve the credentials for the service instance from environment variables, see [Bind a Service Instance](https://docs.cloudfoundry.org/devguide/services/managing-services.html#bind) and the linked details at [Delivering Service Credentials to an Application](https://docs.cloudfoundry.org/devguide/services/application-binding.html).

In short, `cf bind-service` will provide a `DATABASE_URL` environment variable for your app, which is then picked up by the `restage`.

The contents of the `DATABASE_URL` environment variable contain the credentials to access your database. Treat the contents of this and all other environment variables as sensitive.

## Access the data in the database

There are currently two ways to access the database directly.

1. [The `cg-migrate-db` plugin](#cg-migrate-db-plugin). It is a self contained
executable which will interactively assist with accessing the data in the
database. It supports accessing data from different types of databases.
1. [Manually accessing the database](#manually-access-a-database). This way
requires manually downloading the tool(s) needed to access the database.

### cg-migrate-db plugin
You can access the data in your database via the `cg-migrate-db`
plugin. See the [repository](https://github.com/18F/cg-migrate-db)
for instructions on how to install the plugin, backup data, import data,
download a local copy of the data, and upload a local copy of the data.

### Manually access a database

#### Using cf ssh

To access a service database, use the [cf-service-connect plugin](https://github.com/18F/cf-service-connect#readme).

### Export

#### Create backup

The instructions below are for PostgreSQL, but should be similar for MySQL or others.

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
$ pg_dump postgresql://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${NAME} -f backup.pg
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

```sh
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

## Backups

For shared plans (`shared-psql` and `shared-mysql`), RDS does not back up your data. For dedicated plans, RDS automatically retains daily backups for 14 days, and you can [email support](mailto:cloud-gov-support@gsa.gov) to access that backup if you need to. You can also create manual backups using the [export process](#export) described above. In general, you are responsible for making sure that your backup procedures are adequate for your needs; see CP-9 in the cloud.gov SSP.

## Encryption

Every RDS instance configured through cloud.gov is [encrypted at rest](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html). We use the industry standard AES-256 encryption algorithm to encrypt your data on the server that hosts your RDS instance. The RDS then handles authenticating access and decrypting your data, with minimal performance impact and without requiring you to modify your applications.

## Rotating credentials

You can rotate credentials by creating a new instance and [deleting the existing instance](https://cli.cloudfoundry.org/en-US/cf/delete-service.html). If this is not an option, email [cloud.gov support](mailto:cloud-gov-support@gsa.gov) to request rotating the credentials manually.

## Version information

The software versions listed in the table above are for new instances of those plans.

New instances of dedicated RDS plans use the latest database version available from AWS RDS GovCloud (US) at the time. New instances of shared plans may use older database versions.

The PostgreSQL and MySQL plans are configured to automatically upgrade currently-running dedicated instances to the most recent compatible [minor version](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_UpgradeDBInstance.Upgrading.html) available via AWS RDS GovCloud (US).

For Oracle plans, minor upgrades are not automatic. To upgrade an existing Oracle database instance, contact [support](mailto:cloud-gov-support@gsa.gov) and schedule a maintenance window for the upgrade to take place.

## The broker in GitHub

You can find the broker here: [https://github.com/18F/aws-broker](https://github.com/18F/aws-broker).
