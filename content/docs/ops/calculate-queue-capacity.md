---
menu:
  docs:
    parent: operations
title: Calculate Queue Capacity
---

What are we trying to do here?

## Provision a staging jumpbox

this is only for the parsers and the queue

## Get the `memory_per_log_bytes`

```shell
redis-cli -c info | grep used_memory:
```

```shell
redis-cli -c info | grep used_memory:
```

    $ redis-cli -c info | grep used_memory:
    used_memory:633400


Run this from within a jumpbox, preferably staging, with the parser turned off.
This will allow for the queue to


This will return the past two weeks of logs. Divide this number by 14 to get a
rough estimate of the **logs per day**



## Get the `logs_per_day`

```shell
curl localhost:9200/logs-app-*/_search -d '{"query": {"range": {"@timestamp": {"gte": "now-2w"}}}}' | $JQ '.hits.total'
```


Run this from within a jumpbox, preferably staging, with the parser turned off.
This will allow for the queue to


To calculate **memory per log bytes** take the `used_memory` using redis-cli



Figure out how many logs we have in the queueo
