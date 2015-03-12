# Databases

While databases can be spun up within Cloud Foundry via [services](http://docs.cloudfoundry.org/devguide/services/), the preference is to use AWS-managed resources when possible. These make things like automatic backups easy to set up, and have a more sane default configuration than the default Postgres/MySQL install on Ubuntu.

## RDS

1. Create the database instance on AWS.
1. Connect the database to the `CloudFoundry-live` VPC.
1. Set the `DATABASE_URL` environment variable:

    ```bash
    cf set-env <APP_NAME> DATABASE_URL postgresql://<USERNAME>:<PASSWORD>@<HOST>:5432/<NAME>
    ```

The [dj_database_url](https://github.com/kennethreitz/dj-database-url#url-schema) Python package README describes the possible formats of this URL.

## Service

To start a database service instance within Cloud Foundry (where `DB_NAME` is something like `APP_NAME-ENV-db`):

```bash
cf create-service postgresql default <DB_NAME>
cf bind-service <APP_NAME> <DB_NAME>
cf restage <APP_NAME>
```

Note that for a Rails app, this will [overwrite your `database.yml`](http://docs.cloudfoundry.org/buildpacks/ruby/ruby-service-bindings.html#rails-applications-have-autoconfigured-database-yml).
