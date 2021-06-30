---
layout: post
title: "Getting RDS version information"
date: May 20, 2021
excerpt: Find out what version of AWS RDS version your app is using
---

The dedicated plans listed in the [RDS Services page](https://cloud.gov/docs/services/relational-database/) (marked “AWS RDS Latest”) deploy the default version as advertised by AWS. 

There is currently no way to verify ahead of time the version of an RDS service that will be deployed by the cloud.gov broker, but you can check the version once an instance has been created by connecting to that instance using the cf-service-connect plugin.  Once the database prompt appears, run the command that matches the database you're using:

- PostgreSQL:  `SELECT version();`
- MySQL:  `SELECT VERSION();`
- Oracle:  `SELECT * FROM v$version;`

Note that you can also look at the AWS RDS User Guides for [PostgreSQL](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_PostgreSQL.html#PostgreSQL.Concepts.General.DBVersions), [MySQL](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_MySQL.html), and [Oracle](Oracle) for version information, but these documents sometimes lists versions that are not yet available on AWS GovCloud.
