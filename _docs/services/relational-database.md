---
parent: services
layout: docs
sidenav: true
title: RDS - Relational databases
description: "Persistent, relational databases using Amazon RDS"
redirect_from:
  - /docs/apps/databases
---


If your application uses relational databases for storage, you can use the AWS RDS service to create a database instance. The `redundant` label in an RDS plan name indicates it is a [Multi-AZ (Availability Zone)](https://aws.amazon.com/rds/details/multi-az/) deployment.

## Plans

Plan Name                   | Description                                                                  | Software Version (default)     |
---                         | ---                                                                          | ---                    |
`micro-psql`                | Single-AZ RDS instance of PostgreSQL, minimum 1 core, minimum 1 GiB memory                                   | 15.x* |
`micro-psql-redundant`      |  Multi-AZ RDS instance of PostgreSQL, minimum 1 core, minimum 1 GiB memory                         | 15.x* |
`small-psql`                | Single-AZ RDS instance of PostgreSQL, minimum 1 core, minimum 2 GiB memor                                   | 15.x* |
`small-psql-redundant`      |  Multi-AZ RDS instance of PostgreSQL, minimum 1 core, minimum 2 GiB memor                         | 15.x* |
`medium-psql`               |  Single-AZ RDS instance of PostgreSQL, minimum 1 core, minimum 4 GiB memor                                  | 15.x* |
`medium-psql-redundant`     | Single-AZ RDS instance of PostgreSQL, minimum 1 core, minimum 4 GiB memory                        | 15.x* |
`medium-gp-psql`            | Single-AZ RDS instance of PostgreSQL, minimum 1 core, minimum 8 GiB memory                  | 15.x* |
`medium-gp-psql-redundant`  | Multi-AZ RDS instance of PostgreSQL, minimum 1 core, minimum 8 GiB memory        | 15.x* |
`large-gp-psql`             | Single-AZ RDS instance of PostgreSQL, minimum 1 core, minimum 8 GiB memory                   | 15.x* |
`large-gp-psql-redundant`   | Multi-AZ RDS instance of PostgreSQL, minimum 1 core, minimum 8 GiB memory         | 15.x* |
`xlarge-gp-psql`            | Single-AZ RDS instance of PostgreSQL, minimum 2 cores, minimum 16 GiB memory                 | 15.x* |
`xlarge-gp-psql-redundant`  | Multi-AZ RDS instance of PostgreSQL, minimum 2 cores, minimum 16 GiB memory        | 15.x* |
`small-mysql`               | Single-AZ RDS instance of MySQL, minimum 1 core, minimum 2 GiB memory                                        | 8.x.x* |
`small-mysql-redundant`     | Multi-AZ RDS instance of MySQL, minimum 1 core, minimum 2 GiB memory                              | 8.x.x* |
`medium-mysql`              | Single-AZ RDS instance of MySQL, minimum 2 cores, minimum 4 GiB memory                                       | 8.x.x* |
`medium-mysql-redundant`    | Multi-AZ RDS instance of MySQL, minimum 2 cores, minimum 4 GiB memory                             | 8.x.x* |
`medium-gp-mysql`           | Single-AZ RDS instance of MySQL, minimum 1 core, minimum 8 GiB memory                       | 8.x.x* |
`medium-gp-mysql-redundant` | Multi-AZ RDS instance of MySQL, minimum 1 core, minimum 8 GiB memory             | 8.x.x* |
`large-gp-mysql`            | Single-AZ RDS instance of MySQL, minimum 1 core, minimum 8 GiB memory                       | 8.x.x* |
`large-gp-mysql-redundant`  | Multi-AZ RDS instance of MySQL, minimum 1 core, minimum 8 GiB memorye              | 8.x.x* |
`xlarge-gp-mysql`           | Single-AZ RDS instance of MySQL, minimum 2 cores, minimum 16 GiB memory                      | 8.x.x* |
`xlarge-gp-mysql-redundant` | Multi-AZ RDS instance of MySQL, minimum 2 cores, minimum 16 GiB memory            | 8.x.x* |
`medium-oracle-se2`         | Single-AZ RDS instance of Oracle SE2, minimum 1 core, minimum 4 GiB memory                                           | AWS RDS Latest Default |

*Note: The actual database engine version used is the latest minor/patch version offered by AWS RDS for this major version*

*Only the `micro-psql` and `small-mysql` plans are available in [sandbox spaces]({{ site.baseurl }}{% link _docs/pricing/free-limited-sandbox.md %}#sandbox-limitations).*

You can always view an up-to-date version of this list directly in your command line as well with the following command (using `cf` CLI version 6):

```sh
cf marketplace -s aws-rds
```

Or, the following command (using `cf` CLI version 7 or later):

```sh
cf marketplace -e aws-rds
```

The dedicated plans listed above (marked "AWS RDS Latest") deploy the default version as advertised by AWS. If you need to determine the exact version of the RDS service deployed, see [this knowledge base article]({{ site.baseurl }}/knowledge-base/2021-05-20-getting-rds-version-information/).

*Additional Cost:* All databases have a limit of 1TB in storage. After 1TB, each additional terabyte will cost $300 per month.

## Choosing a database plan

For PostgreSQL and MySQL, we offer a range of database plans in different sizes (e.g. `micro-psql`, `small-psql`,
etc).

The primary differences between each database plan size are the available CPU cores and memory for databases
created with that plan. These parameters may be important to consider when choosing a plan for an application
that is heavily CPU-bound or memory-bound.

The maximum number of available database connections will also differ between each plan size, in proportion to
the available memory of that plan. Unfortunately, specifying the exact maximum number of database connections for
each plan size is difficult because [the maximum is calculated by AWS using a formula](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Limits.html#RDS_Limits.MaxConnections)
and not all of the inputs to the formula are known in advance to customers.

In general, the following guidance can be offered for the database plan sizes:

- `micro-*` plans: Good for prototyping and development
- `small-*` plans: Good for low-traffic applications
- `medium-*` plans: Good general purpose plan for applications
- `large-*` plans: Good for high-traffic applications
- `xlarge-*` plans: Good for very high-traffic applications

Once you have chosen a plan size, you should consider whether you need to run your database in [multiple availability zones](https://aws.amazon.com/rds/features/multi-az/),
which increases the availability and durability of your database.

For databases used for development or staging environments, redundancy may not be as critical. **But for databases used in production applications, you should always use a `*-redundant` database plan.**

## Create an instance

To create a service instance run the following command:

```sh
cf create-service aws-rds ${SERVICE_PLAN_NAME} ${SERVICE_NAME}
```

For example, if you wanted to create a new micro PostgreSQL instance called `my-service-db`, run the following command:

```sh
cf create-service aws-rds micro-psql my-service-db
```

### Setting optional parameters

There are several optional parameters that you can specify when creating a new instance:

Name               | Description                                                    | Default Value          |
---                | ---                                                            | ---                    |
`storage`          | Number of GB available to the database instance                | 10                     |
`enable_functions` | Boolean to enable functions on supported databases             | false                  |
`version`          | Specifies a supported major version in RDS (must be in quotes) | PostgreSQL: 15.X, MySQL 8.x.x |
`backup_retention_period` | Specifies a number of days to retain daily snapshots. | 14           |
`binary_log_format` | Specifies the format for [MySQL binary logging](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_LogAccess.MySQL.BinaryFormat.html). **Only supported for MySQL database plans**. Valid options: `ROW`, `STATEMENT`, `MIXED`. | ---           |
`enable_pg_cron` | Boolean to enable [`pg_cron` extension on PostgreSQL databases](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/PostgreSQL_pg_cron.html) (requires PostgreSQL 12.5 and above; see example below for details) | false           |

A couple of notes regarding the optional `version` parameter:

- It is currently only supported for dedicated MySQL and PostgreSQL instances; if you specify it for any other type of instance it is ignored.
- It only supports major version numbers (e.g. "8.0"); if you specify a minor/patch level version (e.g., "11.8" for PostgreSQL or "8.0.32" for MySQL), the command will fail.
- The version number must be provided in double quotes (`"`); this is because the value is treated as a string to account for different engine types and version schemes.

These are the current supported major versions for PostgreSQL:

- 10
- 11
- 12
- 13
- 14
- 15

These are the current supported major versions for MySQL:

- 8.0

The `backup_retention_period` can be no less than 14 days but extended up to 35 days.

#### Examples of optional parameters

If you want to specify the storage available (in gigabytes) to the instance:

```sh
cf create-service aws-rds \
    ${SERVICE_PLAN_NAME} \
    ${SERVICE_NAME} \
    -c '{"storage": 50}'
```

To enable functions in MySQL instances:

```sh
cf create-service aws-rds \
    ${MYSQL_SERVICE_PLAN_NAME} \
    ${SERVICE_NAME} \
    -c '{"enable_functions": true}'
```

To specify the binary log format for a MySQL instance:

```sh
cf create-service aws-rds \
    ${MYSQL_SERVICE_PLAN_NAME} \
    ${SERVICE_NAME} \
    -c '{"binary_log_format": "ROW"}'
```

To enable the `pg_cron` extension for a PostgreSQL instance:

```sh
cf create-service aws-rds \
    ${POSTGRESQL_SERVICE_PLAN_NAME} \
    ${SERVICE_NAME} \
    -c '{"enable_pg_cron": true}'
```

After running this command, you must [finish setting up pg_cron on your instance](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/PostgreSQL_pg_cron.html#PostgreSQL_pg_cron.enable). You can use [cf-service-connect](https://github.com/cloud-gov/cf-service-connect) to connect to your instance, or connect via an application. Note that you must target the `postgres` database. To do this via `cf-service-connect`, run `\c postgres` in the psql shell.

To specify a major version of a new instance, e.g., PostgreSQL version 11 (please note the double quotes (`"`) around the version number; they are required):

```sh
cf create-service aws-rds \
    micro-psql \
    my-test-service \
    -c '{"version": "11"}'
```

To extend the backup retention period for a database to 30 days:

```sh
cf create-service aws-rds \
    micro-psql \
    my-test-service \
    -c '{"backup_retention_period": 30}'
```

You can combine multiple optional parameters as long as the JSON is well-formed:

```sh
cf create-service aws-rds \
    small-mysql \
    my-test-service \
    -c '{"version": "8.0", "storage": 35}'
```

### Instance creation time

Dedicated RDS instance provisioning can take anywhere between 5 minutes and 60
minutes. During instance provisioning, the results of `cf services` or `cf service SERVICE_NAME` will show status as `create in progress`, as in the following example:

```
> cf services
name                 service   plan                bound apps   last operation
test-oracle          aws-rds   medium-oracle-se2                create in progress
```

Once the instance is ready for use, it will show `create succeeded` as below:

```
> cf services
name                 service   plan                bound apps   last operation
test-oracle          aws-rds   medium-oracle-se2                create succeeded
```

By default, when new spaces are created in your organization, an application security group (ASG) is applied that doesn't allow any outgoing traffic. You will need to [update egress traffic]({{ site.baseurl }}{% link _docs/management/space-egress.md %}) rules to allow for your app to reach the database.

## Update an instance

To update an existing service instance to a different plan run the following command:

```sh
cf update-service ${SERVICE_NAME} -p ${NEW_SERVICE_PLAN_NAME}
```

`${NEW_SERVICE_PLAN_NAME}` can be any of the *dedicated* service plans that are listed above.

There are a couple of caveats regarding this command with the `-p` flag:

- You can only update using plans with the same database engine as your existing service instance. This means that if your original service instance was using a PostgreSQL plan (e.g., `micro-psql`), you can only update to one of the other `psql`-based plans.
- You can **only** switch service plans with this command; you cannot do things like upgrade your database version.

You can update to larger or smaller plans depending on your specific needs, and you can switch between redundant and non-redundant plans.

**NOTE: All updates are applied immediately.  Performing an update in place like this will result in a brief period of downtime (seconds to minutes) while the service instance restarts as a part of the update.**

### Setting optional parameters

There are several optional parameters that you can specify when updating an existing instance:

Name               | Description                                     |
---                | ---                                             |
`storage`          | Number of GB available to the database instance |
`backup_retention_period` | Specifies a number of days to retain daily snapshots. |
`binary_log_format` | Specifies the format for [MySQL binary logging](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_LogAccess.MySQL.BinaryFormat.html). **Only supported for MySQL database plans**. Valid options: `ROW`, `STATEMENT`, `MIXED`. |
`enable_pg_cron` | Boolean to enable [`pg_cron` extension on PostgreSQL databases](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/PostgreSQL_pg_cron.html) (requires PostgreSQL 12.5 and above) | false           |

#### Examples of optional parameters

If you want to increase the storage available to the instance to be 50 GB:

```sh
cf update-service ${SERVICE_NAME} -c '{"storage": 50}'
```

Note that you can only update to a larger size. If you want to downgrade to a lesser size, please email [support][support] for assistance.

To update the binary log format for a MySQL instance:

```sh
cf update-service ${SERVICE_NAME} \
    -c '{"binary_log_format": "ROW"}'
```

To enable the `pg_cron` extension for a PostgreSQL instance:

```sh
cf update-service ${SERVICE_NAME} \
    -c '{"enable_pg_cron": true}'
```

To disable the `pg_cron` extension for a PostgreSQL instance:

```sh
cf update-service ${SERVICE_NAME} \
    -c '{"enable_pg_cron": false}'
```

Please note that you may need to request an instance reboot after making these changes in order for them to apply immediately. You can request a reboot of your RDS instance by emailing [support@cloud.gov][support].

#### A note about upgrading major versions

**You cannot update an existing instance to a new major version** with the `update-service` command.  If you'd like to update your existing database instance to a new major version, please email [support@cloud.gov][support] for assistance.

### Rotate your credentials

> **NOTE: Rotating your database credentials will likely incur some downtime for your application.** [While AWS documentation states that existing connections using your current password are not dropped](https://repost.aws/knowledge-center/reset-master-user-password-rds), depending on how your application handles database connections you could see errors
trying to establish new connections until the application is restaged with the new credentials.

To change the password of your database instance:

```shell
cf update-service ${SERVICE_NAME} \
    -c '{"rotate_credentials": true}'
```

Once that command has finished running, you need to unbind your database instance from your application and re-bind it so that the application receives the updated credentials. **Please note that you may want to wait about a minute between running `cf unbind-service` and `cf bind-service`** otherwise you may get an error indicating that the database is not ready.

```shell
cf unbind-service <application-name> ${SERVICE_NAME} # wait a minute or so after running this
cf bind-service <application-name> ${SERVICE_NAME}
```

You will also need to delete and recreate any service keys for your database instance to incorporate the new credentials into the keys:

```shell
cf delete-service-key ${SERVICE_NAME} <service-key-name>
cf create-service-key ${SERVICE_NAME} <service-key-name>
```

Lastly, you need to restage your application so that it uses the updated credentials (tip: you can use the `--strategy rolling` flag to ensure your application instances remain available to handle traffic):

```shell
cf restage <application-name> --strategy rolling
```

### Bind to an application

To use the service instance from your application, bind the service instance to the application. For an overview of this process and how to retrieve the credentials for the service instance from environment variables, see [Bind a Service Instance](https://docs.cloudfoundry.org/devguide/services/managing-services.html#bind) and the linked details at [Delivering Service Credentials to an Application](https://docs.cloudfoundry.org/devguide/services/application-binding.html).

In short, `cf bind-service` will provide a `DATABASE_URL` environment variable for your app, which is then picked up by the `restage`.

The contents of the `DATABASE_URL` environment variable contain the credentials to access your database. Treat the contents of this and all other environment variables as sensitive.

Please note: If you are binding a service instance to a new space, please review and adjust your space egress setting. By default, all newly made spaces have their space egress set to closed which means any requests to the open internet or our brokered services will be blocked. For an overview of space egress settings, see [Space Egress](https://cloud.gov/docs/management/space-egress/).

## Backups

*Please note that these instructions will change in the future as we expand our service offerings and provide more options for customers.*

RDS automatically retains daily backups for 14 days. These backups are AWS RDS storage volume snapshots, backing up the entire DB instance and not just individual databases. You can extend the length of retention up to 35 days by using the option detailed above. If you need to have a database restored using one of these backups, you can [email support@cloud.gov][support].  For non-emergency situations, please provide at least 48 hours advance notice.

If you have an emergency situation, such as data loss or a compromised system, please [email support@cloud.gov][support] immediately and inform us of the situation.

If you deleted your database instance and want to recover it, the recovery must be done within 14 days of the instance being deleted.  We can perform a restoration using the automated backups that are retained for that 14 day window after a database is removed.

When you do [contact support@cloud.gov][support] with a database backup or restoration request, please include the following information:

- Your organization name
- The space you are working within
- The name of the application(s) connected to the database service you need a restoration performed on
- Phone numbers and contact information if it's an urgent situation

**Please *do not* share any passwords or details of any exploit or compromise.**  We'll call you if necessary, and we'll never ask you for a password over the phone.

We'll confirm this information and remind you that a restoration may result in a brief period of downtime with database connectivity.  Once we receive confirmation from you to proceed, we'll perform the restore, which results in a new DB instance being created in AWS RDS.  cloud.gov support will take care of renaming the new instance and configuring it with the same VPC and security group as the old instance in AWS so that it can still be found by your bound application(s) once the restoration is complete.

When the restore process is completely finished, we'll notify you and ask you to confirm that your application(s) is still functioning properly and that the data is properly restored.  We'll also coordinate with you to determine when it would be appropriate to remove the old instance, particularly if it is needed for something such as a security audit or forensic analysis.

When we remove the old database instance, we will not retain snapshots or backups of it unless we're explicitly asked to do so.  We'll remind you of this when coordinating a specific date and time to remove the old instance.

You can also create manual backups using the [export process](#exporting-a-database) described below. In general, you are responsible for making sure that your backup procedures are adequate for your needs; see CP-9 in the cloud.gov SSP.

## Access the data in the database

To access a service database, use the [cf-service-connect plugin](https://github.com/18F/cf-service-connect#readme) or the new [cg-manage-rds](https://github.com/cloud-gov/cg-manage-rds) application and the corresponding CLI (command line interface) tools for the database service you are using,

The examples below show working with a PostgreSQL database, but should be similar for MySQL or others.

### Using cg-manage-rds

#### Exporting from a service instance

The `cg-manage-rds` application is meant to simplify and streamline import, export and cloning operations on service instances. Full usage docs can be found on the github [readme](https://github.com/cloud-gov/cg-manage-rds#usage)

To perform a basic export of a postgres instance using the compressed format:

```sh
cg-manage-rds export -o "-F c" -f ./backup.pg ${SERVICE_NAME}
```

This will create an export using `pg_dump` named `backup.pg`. Other options for the pg_dump command can be pased as a string with the `-o` option.

#### Importing to a service instance

This is a simple example of importing a previous export to database service instance.
By default `cg-manage-rds` adds options to remove ownership and create new objects to make porting easy.

```sh
cg-manage-rds import -o "-F c" -f ./backup.pg ${SERVICE_NAME}
```

#### Cloning a service instance

This is a simple example of replicating database service instance to another instance. The destination database must be created beforehand. The export is downloaded locally as in the `export` command.

```sh
cg-manage-rds clone ${SERVICE_NAME_SOURCE} ${SERVICE_NAME_DEST}
```

### Using cf-service-connect plugin

#### Exporting a database

First, open a terminal and connect to an instance using the [cf-service-connect plugin](https://github.com/cloud-gov/cf-service-connect#usage) to create a SSH tunnel:

```sh
$ cf connect-to-service -no-client ${APP_NAME} ${SERVICE_NAME}
...
Host: localhost
Port: ...
Username: ...
Password: ...
Name: ...
```

If this fails to open a SSH tunnel, try deleting any existing `connect-to-service` service keys first:

```sh
cf delete-service-key ${SERVICE_NAME} SERVICE_CONNECT
```

Then try the previous step again.

Once the SSH tunnel is created, keep it running in that terminal window and open a separate terminal session in another window/tab, then create the backup file using the parameters provided by the plugin in the new terminal session, e.g. (be sure to tailor the backup/export command to your specific needs):

```sh
$ pg_dump -F c \
    --no-acl \
    --no-owner \
    -f backup.pg \
    postgresql://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${NAME}
```

This will create the `backup.pg` file on your local machine in whatever your current working directory is.

When you are finished, you can terminate the SSH tunnel.  You should also clean up the `SERVICE_KEY` created by the cf-service-connect plugin so that you are able to reconnect in the future:

```sh
cf delete-service-key ${SERVICE_NAME} SERVICE_CONNECT
```

### Restoring to a local database

Continuing with the PostgreSQL example and the `backup.pg` file, load the dump into your local database using the [pg_restore](https://www.postgresql.org/docs/current/static/app-pgrestore.html) tool. If objects exist in a local copy of the database already, you might run into inconsistencies when doing a `pg_restore`. This pg_restore invocation does not drop all of the objects in the database when loading the dump:

```sh
pg_restore --clean --no-owner --no-acl --dbname={database name} backup.pg
```

## Encryption

Every RDS instance configured through cloud.gov is [encrypted at rest](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html). We use the industry standard AES-256 encryption algorithm to encrypt your data on the server that hosts your RDS instance. The RDS then handles authenticating access and decrypting your data, with minimal performance impact and without requiring you to modify your applications.

## Rotating credentials

You can rotate credentials by creating a new instance and [deleting the existing instance](https://cli.cloudfoundry.org/en-US/cf/delete-service.html). If this is not an option, email [support@cloud.gov][support] to request rotating the credentials manually.

## Working with OracleDB

Since Oracle is not open-source there are fewer resources available online to get started working with OracleDB and Cloud Foundry. We provide a few tips here.  This example worked with `ojdbc8.jar`, and will likely needs some tweaks for `ojdbc10.jar`.

### Demo with Spring Music and Oracle

To demonstrate the core Cloud Foundry / OracleDB functionality, we'll start by deploying the
[Spring Music app](https://github.com/cloudfoundry-samples/spring-music).

First, though, one needs the proprietary Oracle database drivers.
Visit the Oracle drivers' site at <http://www.oracle.com/technetwork/database/application-development/jdbc/downloads/index.html> and download the `ojdbc8.jar` from the latest available release. You will need to have a valid Oracle profile account for the download.

Then, clone the repository and make a `libs/` directory:

```bash
git clone https://github.com/cloudfoundry-samples/spring-music
cd spring-music
mkdir libs/
```

Copy the downloaded `ojdbc8.jar` to the `libs/` directory of `spring-music`.

Edit `build.gradle`, look for the following near line 60:

```
    // Oracle - uncomment one of the following after placing driver in ./libs
    // compile files('libs/ojdbc8.jar')
    // compile files('libs/ojdbc7.jar')
```

and remove the `//` comment from the line for `libs/ojdbc8.jar`. Save the `build.gradle` file.

After installing the 'cf' [command-line interface for Cloud Foundry](http://docs.cloudfoundry.org/cf-cli/), and logging in to cloud.gov, `cf login --sso -a https://api.fr.cloud.gov`, the application can be built and pushed using these commands:

```bash
cf create-service aws-rds medium-oracle-se2 spring-oracle
# Wait 20 minutes: get coffee, make a sandwich, ...
./gradlew clean assemble
cf push --no-start
cf bind-service spring-music spring-oracle
cf restart spring-music
```

When the restart completes, you can visit the app and view in the upper-right-hand `i` button that it's now using an OracleDB, or view the `/appinfo` path, as in: `curl https://spring-music-ADJECTIVE-ANIMAL.app.cloud.gov/appinfo`

### Connecting to Oracle

Install Oracle's `instantclient-basiclite` and `instantclient-sqlplus` for your operating system.

To get the database connection information, we'll use
[Cloud Foundry service keys](https://docs.cloudfoundry.org/devguide/services/service-keys.html) as follows, for the
case of an Oracle database called `spring-oracle`:

``` sh
$ cf create-service-key spring-oracle-key
Creating service key spring-oracle-key for service instance spring-oracle ...
OK

$ cf service-key spring-oracle spring-oracle-key
Getting key spring-oracle-key for service instance spring-oracle ...

{
  "name": "ORCL",
  "host": "cg-aws-broker-prod.RANDOMSTRING.us-gov-west-1.rds.amazonaws.com",
  "password": "secretpassword",
  "port": "1521",
  "uri": "oracle://random-username:secretpassword@cg-aws-broker-prodRANDOMSTRING.us-gov-west-1.rds.amazonaws.com:1521/ORCL",
  "username": "random-username"
}
```

Make an SSH tunnel from your workstation to Cloud Foundry to the OracleDB using the `host:` value, e.g. using port `15210` on the localhost:

``` sh
cf ssh -N -L 15210:cg-aws-broker-prod.RANDOMSTRING.us-gov-west-1.rds.amazonaws.com:1521 spring-music
```

Now connect using `sqlplus random-username/secretpassword@host:port/ORCL`, where host is `localhost` and `port` is the first part of the `-L` connection string above. e.g.:

```
./sqlplus random-username/secretpassword@localhost:15210/ORCL
```

Then you can use SQLPLUS commands like `SELECT table_name FROM user_tables;`

## Connect to databases without use of `connect-to-service`

Example for app name `hello-doe`

```
myapp_guid=$(cf app --guid hello-doe)

tunnel=$(cf curl /v2/apps/$myapp_guid/env \
    | jq -r '[.system_env_json.VCAP_SERVICES."aws-rds"[0].credentials \
    | .host, .port] \
    | join(":")')

cf ssh -N -L 5432:$tunnel hello-doe
```

Another window:

```
myapp_guid=$(cf app --guid hello-doe)

creds=$(cf curl /v2/apps/$myapp_guid/env \
    | jq -r '[.system_env_json.VCAP_SERVICES."aws-rds"[0].credentials \
    | .username, .password] \
    | join(":")')

dbname=$(cf curl /v2/apps/$myapp_guid/env \
    | jq -r '.system_env_json.VCAP_SERVICES."aws-rds"[0].credentials \
    | .name')

psql postgres://$creds@localhost:5432/$dbname

```

## Version information

The software versions listed in the table above are for new instances of those plans.

New instances of dedicated RDS plans use the latest default database version available from AWS RDS GovCloud (US) at the time.

The PostgreSQL and MySQL plans are configured to automatically upgrade currently-running dedicated instances to the most recent compatible [minor version](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_UpgradeDBInstance.Upgrading.html) available via AWS RDS GovCloud (US).

For Oracle plans, minor upgrades are not automatic. To upgrade an existing Oracle database instance, please contact [support@cloud.gov][support] and schedule a maintenance window for the upgrade to take place.

## The broker in GitHub

You can find the broker here: [https://github.com/18F/aws-broker](https://github.com/18F/aws-broker).

[support]: mailto:support@cloud.gov
