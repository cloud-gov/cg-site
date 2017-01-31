---
menu:
  docs:
    parent: runbook

title: Troubleshooting Logsearch
---
## Overview
ElasticSearch is generally resilient when configured with multiple primary and  data nodes according to best practices. Typical issues observed are file systems filling up and undersized instances.

## Debugging unallocated shards

Shard allocation is disabled on elasticsearch [drain](https://github.com/cloudfoundry-community/logsearch-boshrelease/blob/develop/jobs/elasticsearch/templates/bin/drain.erb). Check that allocation was reenabled:

```bash
curl localhost:9200/_cluster/settings?pretty
```

If necessary, reenable allocation:

```bash
curl -X PUT localhost:9200/_cluster/settings -d '{"transient":{"cluster.routing.allocation.enable":"all"}}'
```

If reenabling allocation doesn't restore the cluster, [manually reassigning unallocated shards may be necessary]({{< ref "#force-reallocation" >}})


## Debugging queue memory usage
High memory usage on queue nodes is an indicator that logs are backing up in redis and not reaching ElasticSearch. [This diagram](https://github.com/cloudfoundry-community/logsearch-boshrelease/blob/develop/docs/architecture.md) illustrates how data flows through the queue to reach ElasticSearch.

### Ensure the high memory usage is from redis and not some other process
Login to the queue node, examine the list of processes and validate it is redis using the majority of memory.

Check the number of log messages waiting in redis:
```bash
/var/vcap/packages/redis/bin/redis-cli llen logsearch
```
Normally this number should be 0. If it is greater than 0 and climbing then logs are not reaching ElasticSearch and accumulating in memory.

### Check cluster health
Log into any `elasticsearch_*` node and [check the cluster health]({{< ref "#check-cluster-health">}}). If the cluster state is not green or has a high number of pending tasks then ElasticSearch cannot accept data from the redis queue.  Resolve the issues with the ElasticSearch cluster and once it's state is green, the queue should be begin to drain.

### Check parser health
If the cluster state is green, then validate the parsers are healthly:  Log into each parser node and check the system health. Review the logs for the logstash instance running on the parser which are stored in `/var/vcap/sys/log/parser/`. Restart the parsers if needed by running `monit restart parser`.

### Continue to monitor memory usage and redis queue
Once the issue has been resolved, continue to monitor the memory usage and number of messages waiting in redis and ensure both are decreasing.  Once the redis queue length has reached 0 the system has returned to normal operation.

## Other Useful ElasticSearch commands

### Check Disk Space
```shell
# df -h
```
### Check Allocation Status
```shell
curl -s 'localhost:9200/_cat/allocation?v'
```

### Check Cluster Settings
```shell
curl 'http://localhost:9200/_cluster/settings?pretty'
```

### List Indices
```shell
curl -s 'localhost:9200/_cat/indices'
```

### Check Cluster Health
```shell
curl -XGET 'http://localhost:9200/_cluster/health?pretty=true'
```

### Isolate Unassigned
```shell
curl -XGET http://localhost:9200/_cat/shards | grep UNASSIGNED | tee unassigned-shards
```

### Force Reallocation
```shell
curl -XGET http://localhost:9200/_cat/shards | grep UNASSIGNED > unassigned-shards
for line in `cat unassigned-shards | awk '{print $1 ":" $2}'`; do index=`echo $line | awk -F: '{print $1}'`; \
    shard=`echo $line | awk -F: '{print $2}'`; curl -XPOST 'localhost:9200/_cluster/reroute' -d "{
        \"commands\" : [ {
              \"allocate\" : {
                  \"index\" : \"$index\",
                  \"shard\" : \"$shard\",
                  \"node\" : \"elasticsearch_data/7\",
                  \"allow_primary\" : true
              }
            }
        ]
    }"; sleep 5; done
```
