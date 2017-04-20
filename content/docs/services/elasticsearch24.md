---
menu:
  docs:
    parent: services
title: Elasticsearch 2.4
name: "elasticsearch24"
description: "Elasticsearch version 2.4: a distributed, RESTful search and analytics engine"
status: "Alpha"
---

cloud.gov offers [Elasticsearch](https://www.elastic.co/) 2.4 as a service. **This service is still in Alpha mode**: downtime and data loss is possible.

## Plans

Plan Name | Description | Price
--------- | ----------- | -----
`1x`  | Elasticsearch instance with 1GB of RAM and 1 slice of CPU   | Free in Alpha
`3x`  | Elasticsearch instance with 3GB of RAM and 1 slice of CPU   | Free in Alpha
`6x`  | Elasticsearch instance with 6GB of RAM and 1 slice of CPU   | Free in Alpha
`12x` | Elasticsearch instance with 12GB of RAM and 2 slices of CPU | Free in Alpha

## How to create an instance

To create a service instance run the following command:

```bash
cf create-service elasticsearch24 1x my-elastic-service
```

### Additional notes

Each instance is one node; there is not currently a way to make multi-node instances.

ElasticSearch 2.4 allows for dots in field names. This is a feature that existed
pre-ElasticSearch 2.0 but was disabled in versions 2.0 to 2.3. Learn more about
that [here](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/dots-in-names.html).

### The broker in GitHub

You can find the broker here: [https://github.com/18F/kubernetes-broker](https://github.com/18F/kubernetes-broker).
