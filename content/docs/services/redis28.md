---
menu:
  docs:
    parent: services
title: Redis 2.8
name: "redis28"
description: "[Redis](https://redis.io/) version 2.8"
status: "Alpha"
---

cloud.gov offers [Redis](https://www.redis.io/) 2.8 as a service. **This service is still in Alpha mode**: downtime and data loss is possible.

## Plans

Plan Name | Description | Price
--------- | ----------- | -----
`standard` | Redis instance with unlimited storage | Free in Alpha

## How to create an instance

To create a service instance run the following command:

```bash
cf create-service redis28 standard my-redis-service
```

### The broker in GitHub

You can find the broker here: [https://github.com/18F/kubernetes-broker](https://github.com/18F/kubernetes-broker).
