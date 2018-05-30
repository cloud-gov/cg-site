---
menu:
  docs:
    parent: runbook
layout: ops

title: Restoring RDS
---

## Introduction
Many of the major services for the cloud.gov platform are backed by Postgres databases provided by RDS.  In the case of outages or corruption, it is imperative an operator be able to quickly find the affected database and restore it from a snapshot if possible.  These instructions are augment the documenation from the official RDS documentation.

## Find database identifier

### CloudFoundry Applications
Coordinate with the tenant, informing them that a restore is going to take place:
1. Shared database plans do not include backups and restores
2. Dedicated RDS plans include 1 day of backups
3. The restore will result in data lost after the point of the most recent snapshot
4. This restore needs to be initiated before the day passes, otherwise new snapshots will be written

Once the tenant consents, identify their Organization and Space.  Then perform the following:
```sh
cf target -s SPACE -o ORGANIZATION
```

Print environment variables for the affected application:
```sh
cf env APP
```

The resulting JSON contains the "host" name within the credentials map.  This will be the database identifier needed below for restoration.

### Platform Applications
Databases created by Terraform store their credentials in a Terraform State Bucket.  This can be found in S3:
```sh
aws s3 cp s3://${TF_STATE_BUCKET}/cf-${ENVIRONMENT}/terraform.tfstate tmp/state.file
```

To retrieve the RDS instance provisioned for `staging concourse`:
```sh
cat tmp/sample.file | grep staging_concourse_rds_host | less
```

The value displayed is the database to restore.  To restore the BOSH instnace grep for `bosh_rds_host_curr`.

NOTE: These values can also be found in the AWS RDS console.  This can be faster.

## Restore the database
Refer to the [RDS documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_RestoreFromSnapshot.html) for restoring a database.

For the step that specifies choosing the database to restore, this database will be the respective database we found in the steps above.

### CloudFoundry Applications
The database restore process will create a new instance with the same credentials.  Create a user provided service with the credentials:
```sh
cf create-user-provided-service database-restore -p '{"db_name": "DATABASE_NAME", "host": "DATABASE_HOST", "password":"DATABASE_PASSWORD", "port": "5432", "uri": "postgres://DATABASE_USERNAME:DATABASE_PASSWORD@DATABASE_HOST:5432/DATABASE_NAME", "username": "DATABASE_USERNAME"}'
```

The methods described at [Relational Databases](https://cloud.gov/docs/services/relational-database/) can be used to connect to the restoration copy and restore data as needed.
