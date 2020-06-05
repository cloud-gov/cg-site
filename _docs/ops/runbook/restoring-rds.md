---
parent: runbook
layout: ops

layout: docs
sidenav: true
title: Restoring RDS
---

cloud.gov structured data is stored using Amazon's Relational Database Service (RDS).  RDS provides multiple availability zones, automated backups and snapshots allowing operators to restore the database in the event of a failure.

## Tenant Databases

Coordinate with the tenant to determine the point in time to restore the database from, and when the operation will take place:

1. Shared database plans do not include backups and restores.
1. Dedicated RDS plans include backups as described in the [user documentation]({{ site.baseurl }}{% link _docs/services/relational-database.md %}#backups).
1. The restore will result in the database being restored to a point in time.
1. Data written after the restore point in time will be lost.

### Obtain information and confirmation from the tenant

In order to perform a restore, we need the following information from the tenant:

- The organization name
- The space they are working within
- The name of the application(s) connected to the database service they need a restoration performed on
- Phone numbers and contact information if it's an urgent situation

Be sure to confirm this information and remind them that a restoration may result in a brief period of downtime with database connectivity.  Ask if they have some way of shutting off access/enabling a maintenance mode of the website and if so, they should do so prior to the restoration process starting.

If the tenant agrees to proceed given this information, coordinate with them on the date and time to perform the restore and with which PITR (point in time restore) or snapshot to use.  At the agreed upon date and time, continue with the steps below.

### Identify RDS Hostname

Once the tenant agrees to a database restore, identify the RDS instance attached to the application using the information that they provide:

```sh
cf target -s SPACE -o ORGANIZATION
cf env APP
```

The JSON containing the environment variables includes the `database identifier` and `password` under the key `host` within the credentials map for the database service (look for `aws-rds`).  The `database identifier` is needed to find the database instance in the AWS RDS instance listing, and the `password` is required for setting the master password in the new instance.

### Performing the database restore

Refer to the [RDS documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_RestoreFromSnapshot.html) for restoring a database.

Prior to restoring, record the configuration settings of the existing instance:
- DB identifier (instance name)
- Instance size (m4.large, etc.)
- Multi-zone (yes/no)
- VPC (dev, staging, etc.)
- Subnet
- Security Groups
- Master password (this is the `password` you saw above in the application environment variables)

Copy all of these values and configure them in the restore form to mirror the configuration of the existing database instance.  For the `identifier` name, provide a name like `<instance name>-<date>-restore` to make the instance easy to find.  Note that the database should never be set to publicly accessible.

Steps for launching the snapshot:
- Log into the AWS Console and navigate to *RDS* > *Snapshots* and filter by <DB identifier>
- Select the latest snapshot and click *Actions* > *Restore Snapshot*
- In *Restore DB Instance*
  - Under *Settings* > *DB Instance Identifier* enter a new DB identifier ie (`<instance name>-<date>-restore`)
  - Using the configuration settings recorded prior to restore, fill in the relevant fields with the corresponding values.
  - Finally, click *Restore DB Instance*
- Navigate back to *RDS* > *Databases* and filter by the new DB identifier
- Once *Status* is changed to *Available*, copy the `endpoint` in the database settings we can compare and verify the restored database

Once the restore has finished, confirm the new instance matches the previous configuration.  To update a configuration setting, click 'Modify' from the RDS console instance view and make the required modifications.

Steps for verifying the finished restore:
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

When the settings and configuration of the new restored instance are confirmed, rename the original instance with a new qualifier, e.g, `<instance name>-<date>-old`.

Finally, rename the new instance to be just `<instance name>` so it matches what the original instance was, and what the application(s) is bound to.  This ensures that the application will still function properly and connect to the new database instance.

### Follow up and confirm with the tenant

When the restore is completely finished, notify the tenant and ask them to confirm that their application(s) is still functioning properly and that the data is properly restored.  Help them troubleshoot any other issues if there is anything still wrong.

Once we receive confirmation that the restore has been completed successfully, we must coordinate with the tenant when it is appropriate to remove the old instance and set a specific date and time to do so, particularly if it is needed for a security audit or forensic analysis.  This is important as we do not want old database instances hanging around, which contribute to extraneous overhead costs.

Work with the tenant to come to a firm agreed upon date and time that the old database instance will be removed.  Be sure to also remind them that no backups or snapshots will be saved either unless they are explicitly requested.

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
