---
menu:
  main:
    parent: apps
title: Databases
---

There are multiple options for how to set up databases for use with applications in Cloud Foundry.

## Services

The easiest way to set up a database is via [services](http://docs.cloudfoundry.org/devguide/services/), which are managed by Cloud Foundry itself. To see what database options are available, run `cf marketplace`. You will now see a list of `service`s, each with a corresponding list of `plan`s.

To start a database service instance within Cloud Foundry (where `DB_NAME` is something like `APP_NAME-ENV-db`):

```bash
cf create-service <SERVICE> <PLAN> <DB_NAME>
cf bind-service <APP_NAME> <DB_NAME>
cf restage <APP_NAME>
```

If you want to use PostgreSQL, use the `rds` service rather than `postgresql*`. This gives you things like database snapshots automatically. The `shared-psql` plan(s) uses an existing instance, which is preferred for staging environments or simple open data apps. For a production application with sensitive data, use `micro-psql` or `medium-psql`. To use the `rds` service with `myapp` in your staging environment, for example, you would do something like:

```bash
cf create-service rds shared-psql myapp-staging-db
cf bind-service myapp myapp-staging-db
cf restage myapp
```

`cf bind-service` will provide a `DATABASE_URL` environment variable for your app, which is then picked up by the `restage`. Note that for a Rails app, `bind-service` will [overwrite your `database.yml`](http://docs.cloudfoundry.org/buildpacks/ruby/ruby-service-bindings.html#rails-applications-have-autoconfigured-database-yml). The full documentation for managing service instances is [here](https://docs.cloudfoundry.org/devguide/services/managing-services.html).

## RDS

This isn't recommended, but if you need, you can create databases in RDS by hand.

1. [Create the database instance](https://console.aws.amazon.com/rds/home?region=us-east-1#launch-dbinstance:ct=dashboard:) on AWS in the `us-east-1` region. On the "Configure Advanced Settings" step:
    1. Set the [VPC](http://aws.amazon.com/vpc/) to be `CloudFoundry-live`.
    1. Set the [VPC Security Group](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_SecurityGroups.html) to be `CloudFoundry-live-BoshSecurityGroup-*`.
    1. The settings should now look like this:

        ![RDS settings](/img/rds-settings.png)

1. Create a `client` tag so that it's billed properly.
1. Get the DB instance hostname once it's created.

    ![RDS instance](/img/rds-instance.png)

1. Set the `DATABASE_URL` environment variable, using the `USERNAME`, `PASSWORD`, and `DBNAME` you set when creating the RDS instance, and the `HOST` from the previous step.

    ```bash
    cf set-env <APP_NAME> DATABASE_URL postgresql://<USERNAME>:<PASSWORD>@<HOST>:5432/<DBNAME>
    ```

The [dj_database_url](https://github.com/kennethreitz/dj-database-url#url-schema) Python package README describes the possible formats of this URL.

## Access a postgres database using cf-ssh

To access a service database, use the [cf-ssh]({{< relref "getting-started/one-off-tasks.md#cf-ssh" >}}) CLI to start an instance that is bound to the service and download the `psql` binary to that instance:

    cf-ssh APP_NAME
    curl https://s3.amazonaws.com/18f-cf-cli/psql-9.4.4-ubuntu-14.04.tar.gz | tar xvz
    ./psql/bin/psql $DATABASE_URL

You should now have an open `psql` terminal connected to the service database.

## Export

### Create backup

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


### Download

On your local host:

```sh
$ cf files {app name} backup.pg | tail -n +4 > backup.pg
```

> [Documentation for `cf files`](http://cli.cloudfoundry.org/en-US/cf/files.html)

Now you may close the ssh connection to cloud.gov, back in tmux:

```sh
$ exit
```


### Restore to local database

Load the dump into your local database using the [pg_restore](https://www.postgresql.org/docs/current/static/app-pgrestore.html) tool. If objects exist in a
local copy of the database already, you might run into inconsistencies when doing a
`pg_restore`. This Pg_restore invocation does not drop all of the objects in the database when loading the
dump.

```sh
$  pg_restore --clean --no-owner --no-acl --dbname={database name} backup.pg
```
