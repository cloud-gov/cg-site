---
parent: runbook
layout: ops

layout: docs
sidenav: true
title: Restoring RDS
---

cloud.gov structured data is stored using Amazon's Relational Database Service (RDS).  RDS provides multiple availability zones, automated backups and snapshots allowing operators to restore the database in the event of a failure.

## Customer Databases
Coordinate with the tenant to determine the point in time to restore the database from, and when the operation will take place:

1. Shared database plans do not include backups and restores.
1. Dedicated RDS plans include backups as described in the [user documentation]({{ site.baseurl }}{% link _docs/services/relational-database.md %}#backups).
1. The restore will result in the database being restored to a point in time.
1. Data written after the restore point in time will be lost.

### Identify RDS Hostname
Once the tenant agreed to a database restore, identify the RDS instance attached to the application:
```sh
cf target -s SPACE -o ORGANIZATION
cf env APP
```

The JSON contains the **database identifier** under the key `host` within the credentials map.

## Restoring the Database
Refer to the [RDS documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_RestoreFromSnapshot.html) for restoring a database.

### Restoring from a Snapshot

Prior to restoring, record the configuration settings:
1. DB identifier
1. Database publicly accessible from the internet (yes/no)
1. Instance size (m4.large, etc.)
1. Multi-zone (yes/no)
1. VPC (dev, staging, etc.)
1. Subnet
1. Security Groups

Launching the snapshot:
- Log into the AWS Console and navigate to *RDS* > *Snapshots* and filter by <DB identifier>
- Select the latest snapshot and click *Actions* > *Restore Snapshot*
- In *Restore DB Instance*
  - Under *Settings* > *DB Instance Identifier* enter a new DB identifier ie (`<DB identifier>-restore`)
  - Using the configuration settings recorded prior to restore, fill in the relevant fields with the corresponding values.
  - Finally, click *Restore DB Instance*
- Navigate back to *RDS* > *Databases* and filter by the new DB identifier
- Once *Status* is changed to *Available*, copy the `endpoint` in the database settings we can compare and verify the restored database

Verifying the restored database:
- Log into the jumpbox
- Grab the database credentials (`password`, `address`, `dbuser`...) from `bosh`
- If possible, log into the database
  - Connect `psql "postgres://${dbuser}:${password}@${address}:${port}/${name}"`
  - List all the tables in the database: `psql> \dt+`
  - Grab record counts for key tables
    - ie *Cloud Controller DB*: `select count(*) from organizations;`
    - ie *Cloud Controller DB*: `select count(*) from spaces;`
    - ie *Cloud Controller DB*: `select count(*) from apps;`
- Log into the new, restored database
  - *Note:* Change the `address` from bosh to the `endpoint` copied from the database settings
  - Connect `psql "postgres://${dbuser}:${password}@${endpoint}:${port}/${name}"`
  - List all the tables in the database: `psql> \dt+`
  - Grab record counts for key tables
    - ie *Cloud Controller DB*: `select count(*) from organizations;`
    - ie *Cloud Controller DB*: `select count(*) from spaces;`
    - ie *Cloud Controller DB*: `select count(*) from apps;`
- Compare tables and record counts between the original and restored databases

Once the restore has finished, confirm the new instance matches the previous configuration.  To update a configuration setting, click 'Modify' from the RDS console instance view.

Also set the `master password` using the Modify form.  Since Terraform lacks the capability to import rds credentials, please set the password to the old password of the database we are restoring.

## Platform Databases
Databases created by Terraform store credentials in the Terraform State S3 Bucket:
```sh
aws s3 cp s3://${TF_STATE_BUCKET}/cf-${ENVIRONMENT}/terraform.tfstate tmp/state.file
```

To retrieve the RDS instance provisioned for `staging concourse`:
```sh
cat tmp/sample.file | grep staging_concourse_rds_host | less
```

The value displayed is the **database identifier**.  To restore the BOSH instance, grep for `bosh_rds_host_curr`.  Database identifiers can also be found in the AWS RDS console.

### Updating Terraform
Platform database configuration is stored in Terraform.  After a restore, update Terraform with the new database instance using `terraform init` and `terraform import`.

For example, to update Terraform configuration for development BOSH (`my-restored-db-id` is the restored database identifier):
```sh
cd terraform/stacks/main
terraform init -backend=true -backend-config=encrypt=true -backend-config=bucket=terraform-state -backend-config=key=development/terraform.tfstate
terraform state rm module.stack.module.base.module.rds.aws_db_instance.rds_database
terraform import module.stack.module.base.module.rds.aws_db_instance.rds_database my-restored-db-id
```

Once updated, run the `Plan` pipeline task in Concourse.  If Concourse is unavailable, run `terraform plan` from the command-line (using the `terraform-apply.sh` script from [cg-pipeline-tasks repository](https://github.com/18F/cg-pipeline-tasks)).

Confirm the plan matches the state updates (it may list changes such as parameter groups and passwords).   Apply the plan using `bootstrap-*` in Concourse or `terraform apply` on the cli and verify the output in the `create-update-ENVIRONMENT` job within the bootstrap pipeline.

Redeploy the respective application and verify proper operation.
