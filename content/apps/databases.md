---
menu:
  main:
    parent: apps
title: Databases
weight: 10
---

The current recommendation is to use our RDS service broker to spin up and manage a database for you. If you need more control, however, you can use AWS-managed resources directly.

## Service Broker

```bash
cf create-service rds <PLAN> <DB_NAME>
cf bind-service <APP_NAME> <DB_NAME>
cf restage <APP_NAME>
```

Where `PLAN` is one of `shared-psql`, `micro-psql`, or `medium-psql`. The shared instance is preferred as an existing, shared database will be used. The other two options will take longer to spin up, but may be required by your application.

This will create a new `DATABASE_URL` environment variable for your app. Note that for a Rails app, `bind-service` will [overwrite your `database.yml`](http://docs.cloudfoundry.org/buildpacks/ruby/ruby-service-bindings.html#rails-applications-have-autoconfigured-database-yml).

## RDS

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
