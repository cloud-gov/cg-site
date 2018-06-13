---
menu:
  docs:
    parent: runbook
layout: ops

title: Restoring RDS
---

## Introduction
Many of the major services for the cloud.gov platform are backed by Postgres databases provided by RDS.  In the case of outages or corruption, it is imperative an operator be able to quickly find the affected database and restore it from a snapshot if possible.  These instructions augment the official RDS documentation.

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

The value displayed is the database to restore.  To restore the BOSH instance grep for `bosh_rds_host_curr`.

NOTE: These values can also be found in the AWS RDS console.  This can be faster.

## Restore the database
Refer to the [RDS documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_RestoreFromSnapshot.html) for restoring a database.

For the step that specifies choosing the database to restore, this database will be the respective database we found in the steps above.

Take note to carefully set options matching the configuration of the target database.  Specifically pay attention to these options:

1) Database publicly accessible from the internet (yes/no)
2) Instance size (m4_large, etc.)
3) Multi-zone (yes/no)

After the database is finished restoring you can then set the security group, ensure it matches the group of the previous configuration.  To do do this click 'Modify' for the database and find the entry in the form to set the security group (there will be a drop down of all groups to choose from).


### CloudFoundry Applications
The database restore process will create a new instance with the same credentials.  Create a user provided service with the credentials:
```sh
cf create-user-provided-service database-restore -p '{"db_name": "DATABASE_NAME", "host": "DATABASE_HOST", "password":"DATABASE_PASSWORD", "port": "5432", "uri": "postgres://DATABASE_USERNAME:DATABASE_PASSWORD@DATABASE_HOST:5432/DATABASE_NAME", "username": "DATABASE_USERNAME"}'
```

The methods described at [Relational Databases](https://cloud.gov/docs/services/relational-database/) can be used to connect to the restoration copy and restore data as needed.

### Platform Applications Database Restore Procedure
For these deployments we must perform a Terraform import to restore the database.  First follow the steps above to restore the database in question.

Now run `terraform init` and `terraform import` in the directory for the respective Terraform module.  For development Bosh, eg run these commands:

```sh
cd terraform/stacks/main
terraform init -backend=true -backend-config=encrypt=true -backend-config=bucket=terraform-state -backend-config=key=development/terraform.tfstate
terraform state rm module.stack.module.base.module.rds.aws_db_instance.rds_database
terraform import module.stack.module.base.module.rds.aws_db_instance.rds_database my-restored-db-id
```

where `my-restored-db-id` is the database instance defined during the restore procedure.

Now run the plan job pipeline in concourse for the respective database. If Concourse is not available you will need to run `terraform plan` and `terraform apply` from the command-line (use the `terraform-apply.sh` script in the cg-pipeline-tasks [repository](https://github.com/18F/cg-pipeline-tasks.git) for these commands).

If the diff from Terraform shows no changes for the plan, you are now safe to apply the changes by running the bootstrap pipeline for the proper environment.  The diff will likely show that some options are changed (parameter groups, password, etc.), terraform makes a best effort to approximate the effect of the plan.  Once apply is ran, these options will be set properly, verify this in the output in the `create-update-ENVIRONMENT` job within the bootstrap pipeline.

Now redeploy the respective application and verify proper operation.