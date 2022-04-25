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

Plan Name                   | Description                                                                  | Software Version       |
---                         | ---                                                                          | ---                    |
`micro-psql`                | Dedicated micro RDS PostgreSQL DB instance                                   | AWS RDS Latest Default |
`micro-psql-redundant`      | Dedicated redundant micro RDS PostgreSQL DB instance                         | AWS RDS Latest Default |
`small-psql`                | Dedicated small RDS PostgreSQL DB instance                                   | AWS RDS Latest Default |
`small-psql-redundant`      | Dedicated redundant small RDS PostgreSQL DB instance                         | AWS RDS Latest Default |
`medium-psql`               | Dedicated medium RDS PostgreSQL DB instance                                  | AWS RDS Latest Default |
`medium-psql-redundant`     | Dedicated redundant medium RDS PostgreSQL DB instance                        | AWS RDS Latest Default |
`medium-gp-psql`            | Dedicated higher workload medium RDS PostgreSQL DB instance                  | AWS RDS Latest Default |
`medium-gp-psql-redundant`  | Dedicated higher workload redundant medium RDS PostgreSQL DB instance        | AWS RDS Latest Default |
`large-gp-psql`             | Dedicated higher workload large RDS PostgreSQL DB instance                   | AWS RDS Latest Default |
`large-gp-psql-redundant`   | Dedicated higher workload redundant large RDS PostgreSQL DB instance         | AWS RDS Latest Default |
`xlarge-gp-psql`            | Dedicated higher workload x-large RDS PostgreSQL DB instance                 | AWS RDS Latest Default |
`xlarge-gp-psql-redundant`  | Dedicated higher workload redundant xlarge RDS PostgreSQL DB instance        | AWS RDS Latest Default |
`small-mysql`               | Dedicated small RDS MySQL DB instance                                        | AWS RDS Latest Default |
`small-mysql-redundant`     | Dedicated redundant small RDS MySQL DB instance                              | AWS RDS Latest Default |
`medium-mysql`              | Dedicated medium RDS MySQL DB instance                                       | AWS RDS Latest Default |
`medium-mysql-redundant`    | Dedicated redundant medium RDS MySQL DB instance                             | AWS RDS Latest Default |
`medium-gp-mysql`           | Dedicated higher workload medium RDS MySQL DB instance                       | AWS RDS Latest Default |
`medium-gp-mysql-redundant` | Dedicated higher workload redundant medium RDS MySQL DB instance             | AWS RDS Latest Default |
`large-gp-mysql`            | Dedicated higher workload large RDS MySQL DB instance                        | AWS RDS Latest Default |
`large-gp-mysql-redundant`  | Dedicated higher workload redundant large RDS MySQL DB instance              | AWS RDS Latest Default |
`xlarge-gp-mysql`           | Dedicated higher workload x-large RDS MySQL DB instance                      | AWS RDS Latest Default |
`xlarge-gp-mysql-redundant` | Dedicated higher workload redundant x-large RDS MySQL DB instance            | AWS RDS Latest Default |
`medium-oracle-se2`         | Dedicated medium RDS Oracle SE2 DB                                           | AWS RDS Latest Default |

*Only the `micro-psql` and `small-mysql` plans are available in [sandbox spaces]({{ site.baseurl }}{% link _docs/pricing/free-limited-sandbox.md %}#sandbox-limitations).*

You can always view an up-to-date version of this list directly in your command line as well with the following command (using cf cli version 6):

```sh
cf marketplace -s aws-rds
```

Or, the following command (using cf cli version 7):

```sh
cf marketplace -e aws-rds
```

The dedicated plans listed above (marked "AWS RDS Latest") deploy the default version as advertised by AWS. If you need to determine the exact version of the RDS service deployed, see [this knowledge base article]({{ site.baseurl }}/knowledge-base/2021-05-20-getting-rds-version-information/).

*Additional Cost:* All databases have a limit of 1TB in storage. After 1TB, each additional terabyte will cost $300 per month.

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
`version`          | Specifies a supported major version in RDS (must be in quotes) | AWS RDS Latest Default |
`backup_retention_period` | Specifies a number of days to retain daily snapshots. | 14           |

A couple of notes regarding the optional `version` parameter:

- It is currently only supported for dedicated MySQL and PostgreSQL instances; if you specify it for any other type of instance it is ignored.
- It only supports major version numbers; if you specify a minor/patch level version, e.g., "11.8" for PostgreSQL or "5.7.22" for MySQL, the command will fail.
- The version number must be provided in double quotes (`"`); this is because the value is treated as a string to account for different engine types and version schemes.

These are the current supported major versions for PostgreSQL:

- 10
- 11
- 12

These are the current supported major versions for MySQL:

- 5.7
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

Name               | Required | Description                                     |
---                | ---      | ---                                             |
`storage`          |          | Number of GB available to the database instance |
`backup_retention_period` | | Specifies a number of days to retain daily snapshots. |

#### Examples of optional parameters

If you want to increase the storage available to the instance to be 50 GB:

```sh
cf update-service ${SERVICE_NAME} -c '{"storage": 50}'
```

Note that you can only update to a larger size. If you want to downgrade to a lesser size, please email [support](mailto:support@cloud.gov) for assistance.

#### A note about upgrading major versions

**You cannot update an existing instance to a new major version** with the `update-service` command.  If you'd like to update your existing database instance to a new major version, please email [support](mailto:support@cloud.gov) for assistance.

### Bind to an application

To use the service instance from your application, bind the service instance to the application. For an overview of this process and how to retrieve the credentials for the service instance from environment variables, see [Bind a Service Instance](https://docs.cloudfoundry.org/devguide/services/managing-services.html#bind) and the linked details at [Delivering Service Credentials to an Application](https://docs.cloudfoundry.org/devguide/services/application-binding.html).

In short, `cf bind-service` will provide a `DATABASE_URL` environment variable for your app, which is then picked up by the `restage`.

The contents of the `DATABASE_URL` environment variable contain the credentials to access your database. Treat the contents of this and all other environment variables as sensitive.

## Backups

*Please note that these instructions will change in the future as we expand our service offerings and provide more options for customers.*

RDS automatically retains daily backups for 14 days. These backups are AWS RDS storage volume snapshots, backing up the entire DB instance and not just individual databases. You can extend the length of retention up to 35 days by using the option detailed above. If you need to have a database restored using one of these backups, you can [email support](mailto:support@cloud.gov).  For non-emergency situations, please provide at least 48 hours advance notice.

If you have an emergency situation, such as data loss or a compromised system, please [email support](mailto:support@cloud.gov) immediately and inform us of the situation.

If you deleted your database instance and want to recover it, the recovery must be done within 14 days of the instance being deleted.  We can perform a restoration using the automated backups that are retained for that 14 day window after a database is removed.

When you do [contact support](mailto:support@cloud.gov) with a database backup or restoration request, please include the following information:

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

The examples below are for PostgreSQL, but should be similar for MySQL or others.

### Using cg-manage-rds

#### Exporting from a service instance

The `cg-manage-rds` application is meant to simplify and streeamine import, export and cloning operations on service instances. Full usage docs can be found on the github [readme](https://github.com/cloud-gov/cg-manage-rds#usage)

To perform a basic export of a postgres instance using the compressed format:

```sh
$ cg-manage-rds export -o "-F c" -f ./backup.pg ${SERVICE_NAME}
```

This will create an export using `pg_dump` named `backup.pg`. Other options for the pg_dump command can be pased as a string with the `-o` option.

#### Importing to a service instance

A basic example of importing a previous export to database service instance.
By default `cg-manage-rds` adds options to remove ownership and create new objects to make porting easy.

```sh
$ cg-manage-rds import -o "-F c" -f ./backup.pg ${SERVICE_NAME}
```

#### Cloning a service instance

A basic example of replicating database service instance to another instance. The destination database must be created beforehand. The export is downloaded locally as in the `export` command. 

```sh
$ cg-manage-rds clone ${SERVICE_NAME_SOURCE} ${SERVICE_NAME_DEST} 
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
$ cf delete-service-key ${SERVICE_NAME} SERVICE_CONNECT
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
$ cf delete-service-key ${SERVICE_NAME} SERVICE_CONNECT
```


### Restoring to a local database

Continuing with the PostgreSQL example and the `backup.pg` file, load the dump into your local database using the [pg_restore](https://www.postgresql.org/docs/current/static/app-pgrestore.html) tool. If objects exist in a local copy of the database already, you might run into inconsistencies when doing a `pg_restore`. This pg_restore invocation does not drop all of the objects in the database when loading the dump:

```sh
$ pg_restore --clean --no-owner --no-acl --dbname={database name} backup.pg
```

## Encryption

Every RDS instance configured through cloud.gov is [encrypted at rest](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html). We use the industry standard AES-256 encryption algorithm to encrypt your data on the server that hosts your RDS instance. The RDS then handles authenticating access and decrypting your data, with minimal performance impact and without requiring you to modify your applications.

## Rotating credentials

You can rotate credentials by creating a new instance and [deleting the existing instance](https://cli.cloudfoundry.org/en-US/cf/delete-service.html). If this is not an option, email [cloud.gov support](mailto:support@cloud.gov) to request rotating the credentials manually.

## Working with OracleDB

Since Oracle is not open-source there are fewer resources available online to get started working with OracleDB and Cloud Foundry. We provide a few tips here.  This example worked with `ojdbc8.jar`, and will likely needs some tweaks for `ojdbc10.jar`.


### Demo with Spring Music and Oracle

To demonstrate the core Cloud Foundry / OracleDB functionality, we'll start by deploying the
[Spring Music app](https://github.com/cloudfoundry-samples/spring-music).

First, though, one needs the proprietary Oracle database drivers.
Visit the Oracle drivers' site at http://www.oracle.com/technetwork/database/application-development/jdbc/downloads/index.html and download the `ojdbc8.jar` from the latest available release. You will need to have a valid Oracle profile account for the download.

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

For Oracle plans, minor upgrades are not automatic. To upgrade an existing Oracle database instance, please contact [support](mailto:support@cloud.gov) and schedule a maintenance window for the upgrade to take place.

## The broker in GitHub

You can find the broker here: [https://github.com/18F/aws-broker](https://github.com/18F/aws-broker).
