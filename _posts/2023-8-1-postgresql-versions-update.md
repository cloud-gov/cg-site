---
layout: post
title: New versions of PostgreSQL supported
date: August 1, 2023
excerpt: "PostgreSQL versions 13, 14, and 15 are now fully supported on cloud.gov"
---

# New versions of PostgreSQL

Cloud.gov is pleased to announce that all major and minor versions of PostgreSQL from 13.x-15.x are now supported and able to be used in conjunction with CloudFoundry applications. As part of this update version 15 will be set as the default version when creating a new PostgreSQL database. This enhancement empowers users with more flexibility and control over their databse environments while benefitting from the latest advancements in PostgreSQL database functionality and security. 

Please note that users are still able to explicitly set any of the [currently supported PostgreSQL versions](https://cloud.gov/docs/services/relational-database/#create-an-instance) upon database creation with the following command: 

```shell
cf create-service aws-rds <database-plan> <database-name> -c '{"version":"<desired-version>"}'
```
