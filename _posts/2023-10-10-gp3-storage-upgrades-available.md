---
layout: post
title: Upgrading existing instance to gp3 storage volumes is now supported
date: October 10, 2023
excerpt: "Upgrading to gp3 storage volumes for existing RDS and Elasticsearch/Opensearch instances is now supported"
---

### Upgrading existing instances to `gp3` storage volumes is now supported

In a previous post, [we announced that **new** RDS and Elasticsearch/Opensearch instances created on cloud.gov would default to `gp3` for their storage volumes]({{ site.baseurl }}{% link _posts/2023-09-18-storage-volumes-gp3.md %}).

We are happy to announce that upgrading your **existing** RDS and Elasticsearch/Opensearch instances to use `gp3` storage volumes is also now supported on cloud.gov.

### How to upgrade your existing instances

To upgrade an existing RDS instance to use `gp3` storage volumes:

```shell
cf update-service SERVICE-NAME -c '{"storage_type": "gp3"}'
```

[There is no expected downtime when upgrading the storage volume type for an RDS instance](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.Modifying.html).

To upgrade an existing Elasticsearch/Opensearch instance to use `gp3` storage volumes:

```shell
cf update-service SERVICE-NAME -c '{"volume_type": "gp3"}'
```

[Upgrading the volume type to `gp3` for your Elasticsearch/Opensearch instance **will trigger a blue/green deployment and some amount of downtime**](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/managedomains-configuration-changes.html#bg) while the instance upgrades.
