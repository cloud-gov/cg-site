---
menu:
  docs:
    parent: apps
title: Databases
---

There are multiple options for how to set up databases for use with applications in cloud.gov's version of Cloud Foundry.

## Services

The easiest way to set up a database is via [services](http://docs.cloudfoundry.org/devguide/services/), which are managed by Cloud Foundry itself. To see what database options are available, run `cf marketplace`. You will now see a list of `service`s, each with a corresponding list of `plan`s.

To start a database service instance within Cloud Foundry (where `DB_NAME` is something like `APP_NAME-ENV-db`):

```bash
cf create-service <SERVICE> <PLAN> <DB_NAME>
cf bind-service <APP_NAME> <DB_NAME>
cf restage <APP_NAME>
```

If you want to use PostgreSQL, use the `aws-rds` service rather than `postgresql*`. This gives you things like database snapshots automatically. The `shared-psql` plan(s) uses an existing instance, which is preferred for staging environments or simple open data apps. For a production application with sensitive data, use `micro-psql` or `medium-psql`. To use the `aws-rds` service with `myapp` in your staging environment, for example, you would do something like:

```bash
cf create-service aws-rds shared-psql myapp-staging-db
cf bind-service myapp myapp-staging-db
cf restage myapp
```

`cf bind-service` will provide a `DATABASE_URL` environment variable for your app, which is then picked up by the `restage`. Note that for a Rails app, `bind-service` will [overwrite your `database.yml`](http://docs.cloudfoundry.org/buildpacks/ruby/ruby-service-bindings.html#rails-applications-have-autoconfigured-database-yml). The full documentation for managing service instances is [here](https://docs.cloudfoundry.org/devguide/services/managing-services.html).

The contents of the `DATABASE_URL` environment variable contain the credentials to access your database. Treat the contents of this and all other environment variables as sensitive.

## Access a postgres database

*These instructions are different depending on the "environment" your application lives in. If you're not sure, pick East/West. (GovCloud is our new environment.)*

### *East/West environment:* Using cf-ssh

To access a service database, use the [cf-ssh]({{< relref "docs/getting-started/one-off-tasks.md#cf-ssh" >}}) CLI to start an instance that is bound to the service and download the `psql` binary to that instance:

    cf-ssh APP_NAME
    curl https://s3.amazonaws.com/18f-cf-cli/psql-9.4.4-ubuntu-14.04.tar.gz | tar xvz
    ./psql/bin/psql $DATABASE_URL

You should now have an open `psql` terminal connected to the service database.

### *GovCloud environment:* Using cf ssh

To access a service database, use the [cf ssh]({{< relref "docs/getting-started/one-off-tasks.md#cf-ssh" >}}) CLI command to login to an instance that is bound to the service and download the `psql` binary to that instance:

    cf ssh APP_NAME
    curl https://s3.amazonaws.com/18f-cf-cli/psql-9.4.4-ubuntu-14.04.tar.gz | tar xvz
    ./psql/bin/psql $DATABASE_URL

You should now have an open `psql` terminal connected to the service database.


## Export

### Create backup

*These instructions are different depending on the "environment" your application lives in. If you're not sure, pick East/West. (GovCloud is our new environment.)*

#### *East/West environment:* Using cf-ssh

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

#### *GovCloud environment:* Using cf ssh

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


### Download

*These instructions are different depending on the "environment" your application lives in. If you're not sure, pick East/West. (GovCloud is our new environment.)*

#### *East/West environment*

On your local host:

```sh
$ cf files {app name} app/backup.pg | tail -n +4 > backup.pg
```

> [Documentation for `cf files`](http://cli.cloudfoundry.org/en-US/cf/files.html)

Now you may close the ssh connection to cloud.gov, back in tmux:

```sh
$ exit
```

#### *GovCloud environment*

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
`pg_restore`. This Pg_restore invocation does not drop all of the objects in the database when loading the
dump.

```sh
$  pg_restore --clean --no-owner --no-acl --dbname={database name} backup.pg
```
