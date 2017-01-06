---
menu:
  docs:
    parent: runbook

title: Troubleshooting ElasticSearch
---

### Overview
ElasticSearch is generally resilient when configured with multiple primary and 
data nodes according to best practices.  Typical issues observed are file systems
filling up and undersized instances.

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
