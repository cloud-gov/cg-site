---
menu:
  docs:
    parent: runbook
layout: ops

title: Restoring RDS
---

## Introduction

Many of the major services for the Cloud platform are backed by Postgres databases provided by RDS.  In the case of outages or corruption, it is imperative an operator be able to quickly find the affected database and restore it from a snapshot if possible.  These instructions are augment the documenation from the official RDS documentation.

### Find database identifier

If the database is a tenant application or any other CloudFoundry hosted application, coordinate with the tenant to acquire the applications Organization and Space.  Then perform the following:

```sh
cf target -s SPACE -o ORGANIZATION
```

Then we just need to print to console environment variables for the affected applicaiton:

```sh
cf env APP
```

Within the resulting JSON find the "host" name within the credentials map.  This will be the database identifier needed below for restoration.


If the restore is a Concourse application, we need to glean the database information from the Terraform state file.  This can be found in S3:

```sh
aws s3 cp s3://terraform-state/cf-staging/terraform.tfstate tmp/state.file
```

If the affected database is for staging Concourse we can find the host:

```sh
cat tmp/sample.file | grep staging_concourse_rds_host | less
```

The value displayed here is the database we need to restore.

This process is exactly the same for BOSH, but just grep for `bosh_rds_host_curr`

NOTE: These values can also be found via perusing the AWS RDS console.  This hastens that process.

#### Restore the database

Refer to the [RDS documentation] (https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_RestoreFromSnapshot.html) for restoring a database.

For the step that specifies choosing the database to restore, this database will be the respective database we found in the steps above.

Once these steps are complete, notify the tenant if this was a tenant request.  If this was a core service database, verify that the database updated for that service.  
