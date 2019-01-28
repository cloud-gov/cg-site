---
menu:
  docs:
    parent: runbook
layout: ops

title: Troubleshooting Logsearch
---
## Overview
ElasticSearch is generally resilient when configured with multiple primary and  data nodes according to best practices. Typical issues observed are file systems filling up and undersized instances.

## Debugging unallocated shards

Shard allocation is disabled on elasticsearch [drain](https://github.com/cloudfoundry-community/logsearch-boshrelease/blob/develop/jobs/elasticsearch/templates/bin/drain.erb). Check that allocation was reenabled:

```sh
curl localhost:9200/_cluster/settings?pretty
```

If necessary, reenable allocation:

```sh
curl -X PUT localhost:9200/_cluster/settings -d '{"transient":{"cluster.routing.allocation.enable":"all"}}'
```

If reenabling allocation doesn't restore the cluster, [manually reassigning unallocated shards may be necessary]({{< ref "#force-reallocation" >}})

### Check cluster health
Log into any `elasticsearch_*` node and [check the cluster health]({{< ref "#check-cluster-health">}}). If the cluster state is not green or has a high number of pending tasks then ElasticSearch cannot accept data from the ingestors.  Resolve the issues with the ElasticSearch cluster and once its state is green, the ingestor queues should be begin to drain.

### Check ingestor health
If the cluster state is green, then validate the ingestors are healthly:  Log into each ingestor node and check the system health. Review the logs for the logstash instance running on the ingestor which are stored in `/var/vcap/sys/log/ingestor_syslog/`. Restart the ingestors if needed by running `monit restart ingestor_syslog`.

### Continue to monitor ingestor queues
Once the issue has been resolved, continue to monitor the number of messages waiting in the ingestor queues. Once the queue lengths have reached 0 the system has returned to normal operation.

## Reindexing data from S3

A copy of all data received by the logsearch ingestors is archived in S3.  This data can be used to restore logsearch to a known good state if the data in ElasticSearch is corrupted or lost.

### Create a custom logstash.conf for the restore operation

Log into any `ingestor` node and make a copy of its current logstash configuration.
```sh
bosh -d logsearch ssh ingestor/0

cp /var/vcap/jobs/ingestor_syslog/config/logstash.conf /tmp/logstash-restore.conf
```

Edit the `/tmp/logstash-restore.conf` and make the following changes:

#### Update the "input" block to only contain s3
```
input {
  s3 {
    bucket => ":bucket:"
    region => ":region:"
    access_key_id => ":access_key_id:"
    secret_access_key => ":secret_access_key:"

    type => "syslog"
    sincedb_path => "/tmp/s3_import.sincedb"
  }
}
```

The values for `:bucket:` and `:region:` can be found in [cg-provision](https://github.com/18F/cg-provision/blob/master/terraform/modules/cloudfoundry/buckets.tf#L25-L30) or retrieved from the bosh manifest:
```sh
spruce merge --cherry-pick properties.logstash_ingestor.outputs <(bosh -d logsearch manifest)`
```

When run with default configuration the S3 input plugin will reindex ALL data in the bucket. To reindex a specific subset of data pass [additional options to the s3 input plugin](https://www.elastic.co/guide/en/logstash/current/plugins-inputs-s3.html).

For example, to reindex only data from November 15th, 1968 use a `prefix` to limit to files that match that date: `prefix => "1968/11/15"`.

#### Disable the timecop filter

The default Logsearch-for-CloudFoundry configuration will drop any messages older than 24 hours. When reindexing older data this sanity check needs to be disabled.

To disable the timecop filter set the environment variable `TIMECOP_REJECT_LESS_THAN_HOURS` to match the desired rentention policy:
```sh
export TIMECOP_REJECT_LESS_THAN_HOURS=$((180 * 24))
```

or remove this section from `/tmp/logstash-restore.conf`

```
# Unparse logs with @timestamps outside the configured acceptable range
ruby {
  code => '
    max_hours = (ENV["TIMECOP_REJECT_GREATER_THAN_HOURS"] || 1).to_i
    min_hours = (ENV["TIMECOP_REJECT_LESS_THAN_HOURS"] || 24).to_i
    max_timestamp = Time.now + 60 * 60 * max_hours
    min_timestamp = Time.new - 60 * 60 * min_hours
    if event["@timestamp"] > max_timestamp || event["@timestamp"] < min_timestamp
      event.overwrite( LogStash::Event.new( {
        "tags" => event["tags"] << "fail/timecop",
        "invalid_fields" => { "@timestamp" => event["@timestamp"] },
        "@raw" => event["@raw"],
        "@source" => event["@source"],
        "@shipper" => event["@shipper"]
      } ) )
    end
  '
}
```

#### Configure logstash to index log entries by the date in the file and not the current time.

Using the default configuration logstash will reindex documents into an index for the current day. To avoid this configure logstash to generate indexes based on the timestamps in the data being imported from S3.


Add this stanza to the end of the `filters` section in `/tmp/logstash-restore.conf`

```
mutate {
  add_field => {"index-date" => "%{@timestamp}"}
}
date {
  match => [ "index-date", "ISO8601" ]
  timezone => "UTC"
  add_field => { "[@metadata][index-date]" => "%{+YYYY.MM.dd}" }
}
mutate {
  remove_field => "index-date"
}
```

Edit the `output` section in `/tmp/logstash-restore.conf` and change `index` to:
```
index => "logs-%{@index_type}-%{[@metadata][index-date]}"
```

### Start the reindexing
Run logstash passing in your edited configuration file:

```sh
export JAVA_HOME=/var/vcap/packages/java8
rm /tmp/s3_import.sincedb
/var/vcap/packages/logstash/bin/logstash --path.config /tmp/logstash-restore.config
```

### Monitor progress

Logstash will run forever once started. Monitor the progress of the reindex, and stop logstash once the data has been reindexed. Progress can be monitored by tailing the sincedb file which logstash will update after each file it processes.

```sh
tail -f /tmp/s3_import.sincedb
```

### Recreate ingestor

To restore the ingestor to known good configuration after the restore, recreate the VM:

```sh
bosh -d logsearch recreate ingestor/0
```

## Other Useful ElasticSearch commands

### Check Disk Space
```sh
# df -h
```
### Check Allocation Status
```sh
curl -s 'localhost:9200/_cat/allocation?v'
```

### Check Cluster Settings
```sh
curl 'http://localhost:9200/_cluster/settings?pretty'
```

### List Indices
```sh
curl -s 'localhost:9200/_cat/indices'
```

### Check Cluster Health
```sh
curl -XGET 'http://localhost:9200/_cluster/health?pretty=true'
```

### Isolate Unassigned
```sh
curl -XGET http://localhost:9200/_cat/shards | grep UNASSIGNED | tee unassigned-shards
```

### Force Reallocation
```sh
curl -XGET http://localhost:9200/_cat/shards | grep UNASSIGNED > unassigned-shards
for line in `cat unassigned-shards | awk '{print $1 ":" $2}'`; do index=`echo $line | awk -F: '{print $1}'`; \
    shard=`echo $line | awk -F: '{print $2}'`; curl -H 'Content-Type: application/json' -XPOST 'localhost:9200/_cluster/reroute' -d "{
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
