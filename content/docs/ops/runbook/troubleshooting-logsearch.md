---
menu:
  docs:
    parent: runbook

title: Troubleshooting Logsearch
---
### Debugging unallocated shards

Shard allocation is disabled on elasticsearch [drain](https://github.com/cloudfoundry-community/logsearch-boshrelease/blob/develop/jobs/elasticsearch/templates/bin/drain.erb). Check that allocation was reenabled:

```bash
curl localhost:9200/_cluster/settings?pretty
```

If necessary, reenable allocation:

```bash
curl -X PUT localhost:9200/_cluster/settings -d '{"transient":{"cluster.routing.allocation.enable":"all"}}'
```

If reenabling allocation doesn't restore the cluster, manually reassigning unallocated shards may be necessary: https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-reroute.html.
