---
menu:
  docs:
    parent: services
title: Relational Databases (aws-rds)
aliases:
  - /docs/apps/databases
---

If your application uses relational databases for storage, you can use the cloud.gov AWS RDS service to create a database instance.

## Plans

Plan Name | Description | Price
--------- | ----------- | -----
`shared-psql`            | Shared infrastructure for Postgres DB               | Free
`medium-psql`            | Dedicated Medium RDS Postgres DB Instance           | $0.115 / hr + storage
`medium-psql-redundant`  | Dedicated Redundant Medium RDS Postgres DB Instance | $0.230 / hr + storage
`large-psql`             | Dedicated Large RDS Postgres DB Instance            | $0.230 / hr + storage
`large-psql-redundant`   | Dedicated Redundant Large RDS Postgres DB Instance  | $0.470 / hr + storage
`shared-mysql`           | Shared infrastructure for MySQL DB                  | Free
`medium-mysql`           | Dedicated Medium RDS MySQL DB Instance              | $0.110 / hr + storage
`medium-mysql-redundant` | Dedicated Redundant Medium RDS MySQL DB Instance    | $0.220 / hr + storage
`large-mysql`            | Dedicated Large RDS MySQL DB Instance               | $0.220 / hr + storage
`large-mysql-redundant`  | Dedicated Redundant Large RDS MySQL DB Instance     | $0.440 / hr + storage

### Storage Pricing:

- Shared Instance: Free
- Simple Instance: $0.138 per GB per month
- Redundant Instance: $0.276 per GB per month

## Options

Name | Required | Description | Default
--- | --- | --- | ---
`storage` |  | Number of GB available to the database instance | 10

## Create an instance

To create a service instance run the following command:

```bash
cf create-service aws-rds medium-psql my-db-service
```

If you want to specify the storage available to the instance:

```bash
cf create-service aws-rds medium-psql my-db-service -c '{"storage": 50}'
```

### Bind to an application

`cf bind-service` will provide a `DATABASE_URL` environment variable for your app, which is then picked up by the `restage`. Note that for a Rails app, `bind-service` will [overwrite your `database.yml`](http://docs.cloudfoundry.org/buildpacks/ruby/ruby-service-bindings.html#rails-applications-have-autoconfigured-database-yml). The full documentation for managing service instances is [here](https://docs.cloudfoundry.org/devguide/services/managing-services.html).

The contents of the `DATABASE_URL` environment variable contain the credentials to access your database. Treat the contents of this and all other environment variables as sensitive.

## Access the data in the database

There are currently two ways to access the database.

1. [The `cg-migrate-db` plugin](#cg-migrate-db-plugin). It is a self contained
executable which will interactively assist with accessing the data in the
database. It supports accessing data from different types of databases.
1. [Manually accessing the database](#manually-access-a-database). This way
requires manually downloading the tool(s) needed to access the database. The
only type of database supported via this method is Postgres.

### cg-migrate-db plugin
The easiest way to access the data in your database is via the `cg-migrate-db`
plugin.

Please check out the [repository](https://github.com/18F/cg-migrate-db)
for instructions on how to install the plugin, backup data, import data,
download a local copy of the data, and upload a local copy of the data.

It also includes a [how-to](https://github.com/18F/cg-migrate-db#1-migrating-from-ew-to-govcloud-in-4-steps)
for migrating data from one environment to another. (e.g. from East-West to
GovCloud)

### Manually access a database

The instructions below are for PostgreSQL, but should be similar for MySQL or others.

{{% eastwest %}}
### Using cf-ssh

To access a service database, use the [cf-ssh]({{< relref "docs/getting-started/one-off-tasks.md#cf-ssh" >}}) CLI to start an instance that is bound to the service and download the `psql` binary to that instance:

```sh
cf-ssh APP_NAME
curl https://s3.amazonaws.com/18f-cf-cli/psql-9.4.4-ubuntu-14.04.tar.gz | tar xvz
./psql/bin/psql $DATABASE_URL
```

You should now have an open `psql` terminal connected to the service database.
{{% /eastwest %}}

{{% govcloud %}}
#### Using cf ssh

To access a service database, use the [cf ssh]({{< relref "docs/getting-started/one-off-tasks.md#cf-ssh" >}}) CLI command to login to an instance that is bound to the service and download the `psql` binary to that instance:

```sh
cf ssh APP_NAME
curl https://s3.amazonaws.com/18f-cf-cli/psql-9.4.4-ubuntu-14.04.tar.gz | tar xvz
./psql/bin/psql $DATABASE_URL
```

You should now have an open `psql` terminal connected to the service database.
{{% /govcloud %}}

### Export

#### Create backup

{{% eastwest %}}
#### Using cf-ssh

First, spin up a host to connect to the database:

```sh
$ cf-ssh {app name}
```

When it finishes, you'll be in a tmux connection and you must install the Postgresql tools:

```sh
$ curl https://s3.amazonaws.com/18f-cf-cli/psql-9.4.4-ubuntu-14.04.tar.gz > psql.tgz
$ tar xzvf psql.tgz
```

Now you can create the export file:

```sh
$ psql/bin/pg_dump --format=custom $DATABASE_URL > backup.pg
```

Leave the ssh connection open.
{{% /eastwest %}}

{{% govcloud %}}
#### Using cf ssh

First, connect to an instance:

```sh
$ cf ssh {app name}
```

Next, install the Postgresql tools:

```sh
$ curl https://s3.amazonaws.com/18f-cf-cli/psql-9.4.4-ubuntu-14.04.tar.gz > psql.tgz
$ tar xzvf psql.tgz
```

Now you can create the export file:

```sh
$ psql/bin/pg_dump --format=custom $DATABASE_URL > backup.pg
```
{{% /govcloud %}}

### Download

{{% eastwest %}}
On your local host:

```sh
$ cf files {app name} app/backup.pg | tail -n +4 > backup.pg
```

> [Documentation for `cf files`](http://cli.cloudfoundry.org/en-US/cf/files.html)

Now you may close the ssh connection to cloud.gov, back in tmux:

```sh
$ exit
```
{{% /eastwest %}}

{{% govcloud %}}
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
{{% /govcloud %}}

### Restore to local database

Load the dump into your local database using the [pg_restore](https://www.postgresql.org/docs/current/static/app-pgrestore.html) tool. If objects exist in a
local copy of the database already, you might run into inconsistencies when doing a
`pg_restore`. This Pg_restore invocation does not drop all of the objects in the database when loading the
dump.

```sh
$ pg_restore --clean --no-owner --no-acl --dbname={database name} backup.pg
```

## The broker in GitHub

You can find the broker here: [https://github.com/18F/aws-broker](https://github.com/18F/aws-broker).
