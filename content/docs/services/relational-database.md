---
menu:
  docs:
    parent: services
title: Relational databases (RDS)
description: "Persistent, relational databases using Amazon RDS"
aliases:
  - /docs/apps/databases
---

If your application uses relational databases for storage, you can use the AWS RDS service to create a database instance. The `redundant` label in an RDS plan name indicates it is a [Multi-AZ (Availability Zone)](https://aws.amazon.com/rds/details/multi-az/) deployment.

## Plans

Plan Name | Description | Software Version | 
--------- | ----------- | ------- | -----
`shared-psql`            | Shared PostgreSQL database for prototyping (no sensitive or production data) | 9.4.7 | 
`medium-psql`            | Dedicated medium RDS PostgreSQL DB instance                                  | 9.6.10 | 
`medium-psql-redundant`  | Dedicated redundant medium RDS PostgreSQL DB instance                        | 9.6.10 | 
`large-psql`             | Dedicated large RDS PostgreSQL DB instance                                   | 9.6.10 | 
`large-psql-redundant`   | Dedicated redundant large RDS PostgreSQL DB instance                         | 9.6.10 | 
`shared-mysql`           | Shared MySQL database for prototyping (no sensitive or production data)      | 5.6.27 | 
`medium-mysql`           | Dedicated medium RDS MySQL DB instance                                       | 5.7.21 | 
`medium-mysql-redundant` | Dedicated redundant medium RDS MySQL DB instance                             | 5.7.21 | 
`large-mysql`            | Dedicated large RDS MySQL DB instance                                        | 5.7.21 | 
`large-mysql-redundant`  | Dedicated redundant large RDS MySQL DB instance                              | 5.7.21 | 
`medium-oracle-se2`      | Dedicated medium RDS Oracle SE2 DB                                           | 12.0.1.2.v11 |

*Note* All buckets have a limit of 1 TB in storage. If you need larger amounts of storage, contact cloud-gov-inquiries@gsa.gov

## Options

Name | Required | Description | Default
--- | --- | --- | ---
`storage` |  | Number of GB available to the database instance | 10
`enable_functions` | | Boolean to enable functions on supported databases | false

## Create an instance

To create a service instance run the following command:

```sh
cf create-service aws-rds medium-psql my-db-service
```

If you want to specify the storage available to the instance:

```sh
cf create-service aws-rds medium-psql my-db-service -c '{"storage": 50}'
```

Using functions:

```sh
cf create-service aws-rds medium-mysql my-db-service -c '{"enable_functions": true}'
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

For shared plans (`shared-psql` and `shared-mysql`), RDS does not back up your
data. For dedicated plans, RDS automatically retains daily backups for 14 days.
These backups are AWS RDS storage volume snapshot, backing up the entire DB
instance and not just individual databases. You can [email
support](mailto:cloud-gov-support@gsa.gov) to access that backup if you need to
as a separate RDS instance. You will be responsible for exporting and importing
the data from this snapshot into your existing database.
You can also create manual backups using the [export process](#export) described
above. In general, you are responsible for making sure that your backup
procedures are adequate for your needs; see CP-9 in the
cloud.gov SSP.

## Encryption

Every RDS instance configured through cloud.gov is [encrypted at rest](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html). We use the industry standard AES-256 encryption algorithm to encrypt your data on the server that hosts your RDS instance. The RDS then handles authenticating access and decrypting your data, with minimal performance impact and without requiring you to modify your applications.

## Rotating credentials

You can rotate credentials by creating a new instance and [deleting the existing instance](https://cli.cloudfoundry.org/en-US/cf/delete-service.html). If this is not an option, email [cloud.gov support](mailto:cloud-gov-support@gsa.gov) to request rotating the credentials manually.

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
  "db_name": "ORCL",
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

tunnel=$(cf curl /v2/apps/$myapp_guid/env | jq -r '[.system_env_json.VCAP_SERVICES."aws-rds"[0].credentials | .host, .port] | join(":")')

cf ssh -N -L 5432:$tunnel hello-doe
```

Another window:

```
myapp_guid=$(cf app --guid hello-doe)

creds=$(cf curl /v2/apps/$myapp_guid/env | jq -r '[.system_env_json.VCAP_SERVICES."aws-rds"[0].credentials | .username, .password] | join(":")')

dbname=$(cf curl /v2/apps/$myapp_guid/env | jq -r '.system_env_json.VCAP_SERVICES."aws-rds"[0].credentials | .db_name')

psql postgres://$creds@localhost:5432/$dbname

```

## Version information

The software versions listed in the table above are for new instances of those plans.

New instances of dedicated RDS plans use the latest database version available from AWS RDS GovCloud (US) at the time. New instances of shared plans may use older database versions.

The PostgreSQL and MySQL plans are configured to automatically upgrade currently-running dedicated instances to the most recent compatible [minor version](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_UpgradeDBInstance.Upgrading.html) available via AWS RDS GovCloud (US).

For Oracle plans, minor upgrades are not automatic. To upgrade an existing Oracle database instance, contact [support](mailto:cloud-gov-support@gsa.gov) and schedule a maintenance window for the upgrade to take place.

## The broker in GitHub

You can find the broker here: [https://github.com/18F/aws-broker](https://github.com/18F/aws-broker).
