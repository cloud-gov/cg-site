---
layout: post
title: Upgrade your databases - AWS ending support for MySQL 5.7 in December 2023
date: June 1, 2023
excerpt: "AWS is ending support for MySQL 5.7 databases starting in December 2023. Read on for instructions for how to upgrade your brokered databases."
---

[AWS RDS is ending support for MySQL versions 5.7.x starting in December 2023](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/MySQL.Concepts.VersionMgmt.html).

## What this means for you

As a cloud.gov customer, if you are running a MySQL 5.7 database, then you will need to upgrade that database to at least MySQL version 8.0 by December 2023. **Affected customers will receive direct outreach from the cloud.gov team.**

To upgrade your database from MySQL 5.7 to 8.0, see the [guidance below](#how-to-upgrade).

If you do not upgrade your database by December 2023, then AWS will automatically upgrade your database to the next supported major version (currently 8.0) during the next maintenance window for your database.

## Updates to brokered database plans

As of today, June 1, 2023, it is no longer possible to create an RDS database using MySQL version 5.7 for any of the `mysql` plans in the marketplace. By default, version "8.0" will be used for new MySQL databases.

You can find more information about creating/updating RDS databases on [our database services documentation](({{ site.baseurl }}{% link _docs/services/relational-database.md %})).

## How to upgrade

To upgrade your existing MySQL 5.7 database to MySQL 8.0:

1. Target your organization and space
1. Create a new database service using the same database plan as your MySQL 5.7 database:

  ```shell
  cf create-service aws-rds <plan-name> <mysql-80-database-name>
  ```

1. Use the [`cg-manage-rds` plugin](https://github.com/cloud-gov/cg-manage-rds#usage) to export a backup of your MySQL 5.7 database:

  ```shell
  cg-manage-rds export -f backup.sql <mysql57-database-name>
  ```

1. Import the backup into your MySQL 8.0 database:

  ```shell
  cg-manage-rds import -f backup.sql <mysql80-database-name>
  ```
