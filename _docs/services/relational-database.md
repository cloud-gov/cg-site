---
parent: services
layout: docs
sidenav: true
title: Relational databases (RDS)
description: "Persistent, relational databases using Amazon RDS"
redirect_from:
  - /docs/apps/databases
---


If your application uses relational databases for storage, you can use the AWS RDS service to create a database instance. The `redundant` label in an RDS plan name indicates it is a [Multi-AZ (Availability Zone)](https://aws.amazon.com/rds/details/multi-az/) deployment.

## Plans

Plan Name                | Description                                                                  | Software Version |
---------                | -----------                                                                  | ---------------- |
`shared-psql`            | Shared PostgreSQL database for prototyping (no sensitive or production data) | 9.5.15           |
`micro-psql`             | Dedicated micro RDS PostgreSQL DB instance                                   | AWS RDS Latest   |
`medium-psql`            | Dedicated medium RDS PostgreSQL DB instance                                  | AWS RDS Latest   |
`medium-psql-redundant`  | Dedicated redundant medium RDS PostgreSQL DB instance                        | AWS RDS Latest   |
`large-psql`             | Dedicated large RDS PostgreSQL DB instance                                   | AWS RDS Latest   |
`large-psql-redundant`   | Dedicated redundant large RDS PostgreSQL DB instance                         | AWS RDS Latest   |
`xlarge-psql`            | Dedicated x-large RDS PostgreSQL DB instance                                 | AWS RDS Latest   |
`xlarge-psql-redundant`  | Dedicated redundant xlarge RDS PostgreSQL DB instance                        | AWS RDS Latest   |
`shared-mysql`           | Shared MySQL database for prototyping (no sensitive or production data)      | 5.6.27           |
`small-mysql`            | Dedicated small RDS MySQL DB instance                                        | 5.7.21           |
`medium-mysql`           | Dedicated medium RDS MySQL DB instance                                       | 5.7.21           |
`medium-mysql-redundant` | Dedicated redundant medium RDS MySQL DB instance                             | 5.7.21           |
`large-mysql`            | Dedicated large RDS MySQL DB instance                                        | 5.7.21           |
`large-mysql-redundant`  | Dedicated redundant large RDS MySQL DB instance                              | 5.7.21           |
`xlarge-mysql`           | Dedicated x-large RDS MySQL DB instance                                      | 5.7.21           |
`xlarge-mysql-redundant` | Dedicated redundant x-large RDS MySQL DB instance                            | 5.7.21           |
`medium-oracle-se2`      | Dedicated medium RDS Oracle SE2 DB                                           | AWS RDS Latest   |

*Only the `shared-psql`, `shared-mysql`, `micro-psql`, and `small-mysql` plans are available in [sandbox spaces]({{ site.baseurl }}{% link _docs/pricing/free-limited-sandbox.md %}#sandbox-limitations).*

You can always view an up-to-date version of this list directly in your command line as well with the following command:

```sh
cf marketplace -s aws-rds
```

The dedicated PostgreSQL plans (marked "AWS RDS Latest") deploy the default version as advertised by AWS.  To determine this version ahead of time, run the following awscli command and observe the `EngineVersion` field in the resulting JSON:

``` console
$ aws rds describe-db-engine-versions --engine=postgres --default
{
  "DBEngineVersions": [
    {
      "Engine": "postgres",
      "EngineVersion": "11.5",
      "DBParameterGroupFamily": "postgres11",
      "DBEngineDescription": "PostgreSQL",
      "DBEngineVersionDescription": "PostgreSQL 11.5-R1",
      "ValidUpgradeTarget": [],
      "ExportableLogTypes": [
          "postgresql",
          "upgrade"
      ],
      "SupportsLogExportsToCloudwatchLogs": true,
      "SupportsReadReplica": true,
      "SupportedFeatureNames": [],
      "Status": "available"
    }
  ]
}
```

Note that you can also look at the [AWS RDS PostgreSQL User Guide](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_PostgreSQL.html), but it often lists versions that are not yet available on AWS GovCloud.

*Additional Cost:* All databases have a limit of 1TB in storage. After 1TB, each additional terabyte will cost $300 per month.


## Options

Name               | Required | Description                                        | Default
---                | ---      | ---                                                | ---
`storage`          |          | Number of GB available to the database instance    | 10
`enable_functions` |          | Boolean to enable functions on supported databases | false


## Create an instance

To create a service instance run the following command:

```sh
cf create-service aws-rds ${SERVICE_PLAN_NAME} ${SERVICE_NAME}
```

For example, if you wanted to create a new micro PostgreSQL instance called `my-service-db`, run the following command:

```sh
cf create-service aws-rds micro-psql my-service-db
```

If you want to specify the storage available (in gigabytes) to the instance:

```sh
cf create-service aws-rds ${SERVICE_PLAN_NAME} ${SERVICE_NAME} -c '{"storage": 50}'
```

Using functions in MySQL:

```sh
cf create-service aws-rds ${MYSQL_SERVICE_PLAN_NAME} ${SERVICE_NAME} -c '{"enable_functions": true}'
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

## Update an instance

To update an existing service instance to a different plan run the following command:

```sh
cf update-service ${SERVICE_NAME} -p ${NEW_SERVICE_PLAN_NAME}
```

`${NEW_SERVICE_PLAN_NAME}` can be any of the *dedicated* service plans that are listed above.

There are several caveats regarding this command:

- You can only update dedicated RDS instances; updates to shared instances are not supported.
- You can only update using plans with the same database engine as your existing service instance. This means that if your original service instance was using a PostgreSQL plan (e.g., `micro-psql`), you can only update to one of the other `psql`-based plans.
- You can **only** switch service plans with this command; you cannot do things like update your database size or set any other custom parameters.

You can update to larger or smaller plans depending on your specific needs, and you can switch between redundant and non-redundant plans.

To update an existing service instance size, run the following command and replace ${SERVICE_NAME} with your service instance name, and SIZE with your desired larger size (in GB):

```sh
cf update-service ${SERVICE_NAME} -c '{"storage": SIZE}’
```

There is one caveat regarding this command:

- You can only update to a larger size. If you want to downgrade to a lesser size, you will need to email support.

**NOTE: Performing an update in place like this will result in a brief period of downtime (seconds to minutes) while the service instance restarts as a part of the update.**

### Bind to an application

To use the service instance from your application, bind the service instance to the application. For an overview of this process and how to retrieve the credentials for the service instance from environment variables, see [Bind a Service Instance](https://docs.cloudfoundry.org/devguide/services/managing-services.html#bind) and the linked details at [Delivering Service Credentials to an Application](https://docs.cloudfoundry.org/devguide/services/application-binding.html).

In short, `cf bind-service` will provide a `DATABASE_URL` environment variable for your app, which is then picked up by the `restage`.

The contents of the `DATABASE_URL` environment variable contain the credentials to access your database. Treat the contents of this and all other environment variables as sensitive.

## Backups

*Please note that these instructions will change in the future as we expand our service offerings and provide more options for customers.*

For shared plans (`shared-psql` and `shared-mysql`), cloud.gov and RDS does not back up your data. These are only intended for limited use development and testing instances.

For dedicated plans, RDS automatically retains daily backups for 14 days. These backups are AWS RDS storage volume snapshots, backing up the entire DB instance and not just individual databases. If you need to have a database restored using one of these backups, you can [email support](mailto:support@cloud.gov).  For non-emergency situations, please provide at least 48 hours advance notice.

If you have an emergency situation, such as data loss or a compromised system, please [email support](mailto:support@cloud.gov) immediately and inform us of the situation.

When you do [contact support](mailto:support@cloud.gov) with a database backup request, please include the following information:

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

To access a service database, use the [cf-service-connect plugin](https://github.com/18F/cf-service-connect#readme) and the corresponding CLI (command line interface) tools for the database service you are using.

### Exporting a database

The instructions below are for PostgreSQL, but should be similar for MySQL or others.

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
$ pg_dump -F c --no-acl --no-owner -f backup.pg postgresql://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${NAME}
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

tunnel=$(cf curl /v2/apps/$myapp_guid/env | jq -r '[.system_env_json.VCAP_SERVICES."aws-rds"[0].credentials | .host, .port] | join(":")')

cf ssh -N -L 5432:$tunnel hello-doe
```

Another window:

```
myapp_guid=$(cf app --guid hello-doe)

creds=$(cf curl /v2/apps/$myapp_guid/env | jq -r '[.system_env_json.VCAP_SERVICES."aws-rds"[0].credentials | .username, .password] | join(":")')

dbname=$(cf curl /v2/apps/$myapp_guid/env | jq -r '.system_env_json.VCAP_SERVICES."aws-rds"[0].credentials | .name')

psql postgres://$creds@localhost:5432/$dbname

```

## Version information

The software versions listed in the table above are for new instances of those plans.

New instances of dedicated RDS plans use the latest database version available from AWS RDS GovCloud (US) at the time. New instances of shared plans may use older database versions.

The PostgreSQL and MySQL plans are configured to automatically upgrade currently-running dedicated instances to the most recent compatible [minor version](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_UpgradeDBInstance.Upgrading.html) available via AWS RDS GovCloud (US).

For Oracle plans, minor upgrades are not automatic. To upgrade an existing Oracle database instance, contact [support](mailto:support@cloud.gov) and schedule a maintenance window for the upgrade to take place.

## The broker in GitHub

You can find the broker here: [https://github.com/18F/aws-broker](https://github.com/18F/aws-broker).
