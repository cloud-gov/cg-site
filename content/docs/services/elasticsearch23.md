---
menu:
  docs:
    parent: services
title: Elasticsearch 2.3
name: "elasticsearch23"
description: "[Elasticsearch](https://www.elastic.co/products/elasticsearch) version 2.3 a distributed, RESTful search and analytics engine"
status: "Alpha"
---

cloud.gov offers [Elasticsearch](https://www.elastic.co/) 2.3 as a service. **This service is still in Alpha mode**: downtime and data loss is possible.

## Plans

Plan Name | Description | Price
--------- | ----------- | -----
`1x` | Elasticsearch instance with 1GB of RAM and 1 slice of CPU | Free in Alpha
`3x` | Elasticsearch instance with 3GB of RAM and 3 slices of CPU | Free in Alpha
`6x` | Elasticsearch instance with 6GB of RAM and 6 slices of CPU | Free in Alpha

## How to create an instance

To create a service instance run the following command:

```bash
cf create-service elasticsearch23 1x my-elastic-service
```

## More Information

### Deprecation of Elasticsearch 2.3

We recommend that you use [Elasticsearch 2.4]({{< relref "docs/services/elasticsearch24.md" >}}) instead of ElasticSearch 2.3.

### The broker in GitHub

You can find the broker here: [https://github.com/18F/kubernetes-broker](https://github.com/18F/kubernetes-broker).
