---
layout: post
title: New versions of PostgreSQL supported
date: August 1, 2023
excerpt: "PostgreSQL versions 13, 14, and 15 are now fully supported on cloud.gov"
---

# New versions of PostgreSQL

Cloud.gov is pleased to announce that the [PostgreSQL versions 13.x, 14.x, 15.x offered by AWS RDS](https://docs.aws.amazon.com/AmazonRDS/latest/PostgreSQLReleaseNotes/postgresql-versions.html) are now supported and able to be used in conjunction with cloud.gov applications. As part of this update, version `15` is now set as the default version when creating a new PostgreSQL database on cloud.gov. This enhancement empowers users with more flexibility and control over their database environments while benefitting from the latest advancements in PostgreSQL database functionality and security. 

Please note that users are still able to explicitly set any of the [currently supported PostgreSQL versions](https://cloud.gov/docs/services/relational-database/#create-an-instance) upon database creation with the following command: 

```shell
cf create-service aws-rds <database-plan> <database-name> -c '{"version":"<desired-version>"}'
```
