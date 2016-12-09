---
menu:
  docs:
    parent: services
title: Elasticsearch 1.7
name: "elasticsearch17"
description: "[Elasticsearch](https://www.elastic.co/) version 1.7"
status: "Alpha"
---

cloud.gov offers [Elasticsearch](https://www.elastic.co/) 1.7 as a service. **This service is still in Alpha mode**: downtime and data loss is possible.

## Plans

Plan Name | Description | Price
--------- | ----------- | -----
`1x` | Elasticsearch instance with 1GB of RAM and 1 slice of CPU | Free in Alpha
`3x` | Elasticsearch instance with 3GB of RAM and 3 slices of CPU | Free in Alpha
`6x` | Elasticsearch instance with 6GB of RAM and 6 slices of CPU | Free in Alpha

## How to create an instance

To create a service instance run the following command:

```bash
cf create-service elasticsearch17 1x my-elastic-service
```

## More Information

### Deprecation of Elasticsearch 1.7

Elasticsearch 1.x is deprecated, we recommend that you use [Elasticsearch 2.3]({{< relref "docs/services/elasticsearch23.md" >}}). Also, please see the [Elastic guide for moving from 1.x to 2.x](https://www.elastic.co/blog/key-point-to-be-aware-of-when-upgrading-from-elasticsearch-1-to-2).

### The broker in GitHub

You can find the broker here: [https://github.com/18F/kubernetes-broker](https://github.com/18F/kubernetes-broker).