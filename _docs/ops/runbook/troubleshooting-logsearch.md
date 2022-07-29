---
parent: runbook
layout: ops

layout: docs
sidenav: true
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
curl -X PUT localhost:9200/_cluster/settings -H "Content-Type: application/json" -d '{"transient":{"cluster.routing.allocation.enable":"all"}}'
```

If reenabling allocation doesn't restore the cluster, [manually reassigning unallocated shards may be necessary]((#force-reallocation %})

### Check cluster health

Log into any `bosh ssh elasticsearch_*` node and check the cluster health:

```
curl localhost:9200/_cluster/health
```

If the cluster state is not green or has a high number of pending tasks then ElasticSearch cannot accept data from the ingestors.  Resolve the issues with the ElasticSearch cluster and once its state is green, the ingestor queues should be begin to drain.

### Check ingestor health

If the cluster state is green, then validate the ingestors are healthly:  Log into each ingestor node and check the system health. Review the logs for the logstash instance running on the ingestor which are stored in `/var/vcap/sys/log/ingestor_syslog/`. Restart the ingestors if needed by running `monit restart ingestor_syslog`.

#### Are the ingestors behind?

You can check the ingestor delay by:

- `bosh ssh` to an ingestor node
- As root, go to `/var/vcap/store/ingestor_syslog/queue/main/`
- look for the oldest `page.*` file (ie the one with the lowest number). View the timestamps on the logs in this file to see how backed up the ingestor is.

This is a common cause of smoke test failure in logs-platform. We do not currently have guidance on speeding up ingestion to resolve this and therefore you should wait it out.

### Continue to monitor ingestor queues

Once the issue has been resolved, continue to monitor the number of messages waiting in the ingestor queues. Once the queue lengths have reached 0 the system has returned to normal operation.

## Reindexing data from S3

A copy of all data received by the logsearch ingestors is archived in S3.  This
data can be used to restore logsearch to a known good state if the data in
ElasticSearch is corrupted or lost.

Also note that you may want to pause some Concourse pipelines before starting
this work so that redeployments don't disrupt your progress, particularly those
that would impact logsearch.

### Create a custom logstash.conf for the restore operation

Log into any `ingestor` node and make a copy of its current logstash configuration.

```sh
bosh -d logsearch ssh ingestor/0

cp /var/vcap/jobs/ingestor_syslog/config/logstash.conf /var/vcap/data/ingestor_syslog/tmp/logstash-restore.conf
```

Edit the `/var/vcap/data/ingestor_syslog/tmp/logstash-restore.conf` and make the
following changes:

#### Update the "input" block to only contain S3 information

```conf
input {
  s3 {
    bucket => ":bucket:"
    region => ":region:"
    access_key_id => ":access_key_id:"
    secret_access_key => ":secret_access_key:"

    type => "syslog"
    sincedb_path => "/var/vcap/data/ingestor_syslog/tmp/s3_import.sincedb"
  }
}
```

The values for `:bucket:` and `:region:` can be found in [cg-provision](https://github.com/18F/cg-provision/blob/main/terraform/modules/cloudfoundry/buckets.tf#L25-L30)
or retrieved from the bosh manifest:

```sh
bosh -d logsearch manifest
```

**When run with default configuration the S3 input plugin will reindex ALL data in
the bucket**. To reindex a specific subset of data pass
[additional options to the S3 input plugin](https://www.elastic.co/guide/en/logstash/7.17/plugins-inputs-s3.html).

For example, to reindex only data from November 15th, 1968 use a `prefix` to
limit to files that match that date:

```conf
prefix => "1968/11/15"
```

To reindex data from a specific hour of that day, include that in the `prefix`:

```conf
prefix => "1968/11/15/08"
```

You're able to go down to the minute; check the S3 bucket to verify the path(s) that you would like to reindex.

Lastly, if you want to run multiple months, days, hours or minutes, you can declare multiple S3 blocks with the unique prefix paths (e.g., `2021/01/00`, `2021/01/01`, `2021/01/02/00`) to run multiple batches of data without needing to rerun and update the S3 block settings. Each block just needs a unique prefix and unique `.sincedb` file. For example:

```conf
input {
  s3 {
    bucket => ":bucket:"
    region => ":region:"
    access_key_id => ":access_key_id:"
    secret_access_key => ":secret_access_key:"
    prefix => "2022/06"

    type => "syslog"
    sincedb_path => "/var/vcap/data/ingestor_syslog/tmp/s3_import_2022_06.sincedb"
  }
  s3 {
    bucket => ":bucket:"
    region => ":region:"
    access_key_id => ":access_key_id:"
    secret_access_key => ":secret_access_key:"
    prefix => "2022/05"

    type => "syslog"
    sincedb_path => "/var/vcap/data/ingestor_syslog/tmp/s3_import_2022_05.sincedb"
  }
}
```

#### Optional: Configure logstash to handle partial day data

**Note: These instructions are for indexing arbitrary lengths of time into the existing
daily indices.** It's often easier to reindex a whole day's data, replacing the
existing index for that day. [See the instructions for reindexing a whole day's
data from S3](#reindexing-whole-days-from-s3).

Using the default configuration logstash will reindex documents into an index for
the current day. To avoid this, configure logstash to generate indexes based on
the timestamps in the data being imported from S3.

Add this stanza to the end of the `filters` section in `/var/vcap/data/ingestor_syslog/tmp/logstash-restore.conf`

```conf
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

Edit the `output` section in `/var/vcap/data/ingestor_syslog/tmp/logstash-restore.conf`
and change `index` to:

```conf
index => "logs-%{@index_type}-%{[@metadata][index-date]}"
```

### Disable the timecop filter

The default Logsearch-for-CloudFoundry configuration will drop any messages older than 24 hours. When reindexing older data this sanity check needs to be disabled.

To disable the timecop filter set the environment variable `TIMECOP_REJECT_LESS_THAN_HOURS` to match the desired rentention policy:

```sh
export TIMECOP_REJECT_LESS_THAN_HOURS=$((180 * 24))
```

### Adjust the IAM role policy to allow the reindexing to read from the S3 bucket

You must go in to the AWS console and adjust the IAM role policy for the environment
ingestor you are restoring in, then attach the role policy to the ingestor VM you
are working in.

You can find information about your ingestor VM by running:

```shell
bosh -d logsearch vms
```

When you find the IAM role policy, make sure the Allow Actions match this block:

```text
"s3:PutObject",
"s3:DeleteObject",
"s3:GetObject",
"s3:ListObjects",
"s3:ListObjectsV2",
"s3:ListObjectVersions",
"s3:ListBucket"
```

Then make sure that Allow Resources matches this block:

```text
"arn:${aws_partition}:s3:::logsearch-*/*",
"arn:${aws_partition}:s3:::logsearch-*"
```

Save the role policy adjustments, then attach the role policy to the ingestor VM
you are working in.

### Start the reindexing

Run logstash passing in your edited configuration file:

```sh
source /var/vcap/packages/openjdk-11/bosh/runtime.env
/var/vcap/packages/logstash/bin/logstash --path.config /var/vcap/data/ingestor_syslog/tmp/logstash-restore.conf
```

### Monitor reindexing progress

Logstash will run forever once started. Monitor the progress of the reindex, and stop logstash once the data has been reindexed. Progress can be monitored by first setting turning the logstash reindexing to a background process and then by tailing the sincedb file which logstash will update after each file it processes:

```sh
# While logstash process is running in your foreground:
<Ctrl>+Z
bg
disown

# Once the process is in the background and you're back at the terminal:
watch cat /var/vcap/data/ingestor_syslog/tmp/s3_import.sincedb
```

When the process has finishing ingesting up to the point at which you are done,
kill the background process:

```sh
# Find the pid (process ID) of the logstash process you put in the background:
ps aux | grep <process name>

# Terminate the process:
kill <pid>
```

### Recreate ingestor and restore IAM role policy

To restore the ingestor to known good configuration after the restore, recreate the VM:

```sh
bosh -d logsearch recreate ingestor/0
```

This will also remove the IAM role policy you added to the VM.  Finally, restore the IAM role policy itself.  Refer to the current policy definition in the [logsearch IAM role policy](https://github.com/cloud-gov/cg-provision/blob/master/terraform/modules/iam_role_policy/logsearch_ingestor/policy.json) to revert the changes properly and save the changes.

### If you need to rerun the reindexing

When running the reindexing, if there is an issue at any point and you need to restart, make whatever adjustments you need to and be sure to remove any of the new `.sincedb` files created before starting again.

## Reindexing whole days from S3

Indexing a whole day makes it easier to align the start/end times of a reingest, but it's slower than reindexing a partial day

### Overview

In this process, we'll:

1. Create a new index to put logs in
2. Run logstash to index logs into the new index
3. Create an alias on the new index so it's seen by kibana users
4. Drop the old index

### Create a new index to index documents into

We need to create a new index for the day with the correct settings and mappings, but if it matches the Kibana index pattern, users will see duplicate logs for the whole process. To get the correct settings but not match the patterns, we'll stash the settings and mappings from an existing index, and use an index name that doesn't match index patterns in Kibana.

Modify this and run it from a jumpbox:

```shell
ELASTICSEARCH_IP_PORT=<get this from `bosh -d logsearch vms`, include port 9200>
EXISTING_INDEX="logs-app-2020.12.26"  # use a date with the correct settings and mappings
NEW_INDEX="reindex-logs-app-2020.12.31"  # this is the date you're reindexing
curl ${ELASTICSEARCH_IP_PORT}/${EXISTING_INDEX} \
    | jq ".\"${EXISTING_INDEX}\"" \
    | jq '{settings: .settings, mappings} |
        delpaths([
          ["settings", "index", "uuid"],
          ["settings", "index", "creation_date"],
          ["settings", "index", "version"],
          ["settings", "index", "provided_name"]
        ])' \
    > settings-and-mappings.json
curl -XPUT ${ELASTICSEARCH_IP_PORT}/${NEW_INDEX} \
    -H "content-type: application/json" \
    -d @settings-and-mappings.json
```

### Create a custom logstash.conf for the restore operation

Log into any `ingestor` node and make a copy of its current logstash configuration.

```sh
bosh -d logsearch ssh ingestor/0

cp /var/vcap/jobs/ingestor_syslog/config/logstash.conf /var/vcap/data/ingestor_syslog/tmp/logstash-restore.conf
```

Edit `/var/vcap/data/ingestor_syslog/tmp/logstash-restore.conf` and make the following
changes:

#### Update the "input" and "output" blocks

```conf
input {
  s3 {
    bucket => ":bucket:"
    region => ":region:"
    access_key_id => ":access_key_id:"
    secret_access_key => ":secret_access_key:"
    # update "prefix" to appropriate date
    prefix => "2020/12/31"

    type => "syslog"
    sincedb_path => "/var/vcap/data/ingestor_syslog/tmp/s3_import.sincedb"
  }
}
output {
  elasticsearch {
    hosts => ["127.0.0.1:9200"]
    # update "index" to the appropriate date
    index => "reindex-logs-app-2020.12.31"
    manage_template => false
  }
}
```

The values for `:bucket:` and `:region:` can be found in [cg-provision](https://github.com/18F/cg-provision/blob/master/terraform/modules/cloudfoundry/buckets.tf#L25-L30)
or retrieved from the bosh manifest via `bosh -d logsearch manifest`.

### Run the reindexing

1. [Adjust IAM permissions to allow reindexing](#adjust-the-iam-role-policy-to-allow-the-reindexing-to-read-from-the-s3-bucket)
1. [Disable the Timecop filter](#disable-the-timecop-filter)
1. [Start the reindexing](#start-the-reindexing)
1. [Monitor reindexing process](#monitor-reindexing-progress)
1. [Recreate the ingestor](#recreate-ingestor-and-restore-iam-role-policy)

### Alias the new index and drop the old

To make the logs in the new index available to users, we'll create an alias to make it match Kibana's index pattern. Then, to make it so duplicate logs don't show, we'll drop the old index. Validate the index was successful before following these steps. Checking the number of documents and the timestamps on the oldest and newest are some checks you can run.

```shell
curl -XPOST localhost:9200/_aliases -d '{"actions": [ {"add": {"index": "reindex-logs-app-2020.12.31", "alias": "logs-app-2020.12.31-reindex"}}]}' -H "content-type: application/json"
curl -XDELETE localhost:9200/logs-app-2020.12.11
```

## Fixing 5 of 900 shards failed

Kibana sometimes fails any search containing a single day, and displays the error message `5 of 900 shards failed`.
This can be caused by dynamic fields changing from a non-string type to a string type, causing that day's index
mapping to be different from and incompatible with all other days. For example, if `app.request.time` is a timestamp
one day and a text field the next, this error can occur.

In some cases, the solution is to refresh the field list in Kibana:

1. log into Kibana
1. click on the `Stack Management` tab
1. click on `Index Patterns` under the Kibana left hand menu.
1. make sure you have the `logs-app-*` index pattern selected
1. click the refresh icon in the top right (it should say `refresh field list` when you hover your mouse over it)
1. try reloading the `discovery` tab - it should work within a minute or so.

This works by forcing Kibana to reload the list of fields. Doing so makes it realise there's an inconsistent mapping
on the problem field, so it queries Elasticsearch more smartly about this field.

If that doesn't work, you can use the steps below to rename the field on the documents with a mismatched field type.

1. Use your browser's dev tools to figure out what index is failing the search. Using the network tab, look at requests for the `_msearch` endpoint (they'll also have query params).
1. In the response, look at `responses[0]['_shards']['failures'][0]['reason']['reason']`, which should have a message like `Fielddata is disabled on text fields by default. Set fielddata=true on [app.data.cert.Expiration]`. In this case `app.data.cert.Expiration` is the field that broke.
1. run this command, changing the field name and date as appropriate (in two places in script.source, one place in query.boo.filter.exists.field).

   ```
   curl -XPOST localhost/logs-app-2020.05.04/_update_by_query?refresh -H 'content-type: application/json' -d '{
     "script": {
       "source": "ctx._source.app.data.cert.Expiration20200504 = ctx._source.app.data.cert.remove(\"Expiration\");",
       "lang": "painless"
     },
     "query": {
       "bool": {
         "filter": [
           {
             "exists": {
               "field": "app.data.cert.Expiration"
             }
           }
         ]
       }
     }
   }
   ```

In the `script` field, `ctx._source` is basically the document being updated. On the right hand of the statement, we're calling `remove("Expiration")` on
`app.data.cert`, which drops that field from the document and returns its value. We then use the value to set the new field `Expiration20200504`.
The `query` section says to only run this update on fields where `app.data.cert.Expiration` exists.

Note: this means this field will not be searchable by its usual name for that day's index.

## Fixing Max Payload Size Error

Occasionally, Kibana may display client-side errors for all searches that have the following profile:

```
Getting Cannot read properties of undefined (reading 'get')
```

This may be related to the `maxPayloadBytes` property in logsearch, which needs to be adjusted from time to time. If this payload size setting is exceeded, an error is returned on log searches. The client-side logic for displaying log search results is unable to parse the error message returned from the backend (which will have a different JSON structure from valid log search results) and therefore displays the error message above.

This issue may manifest _only_ in production, and not in staging, as the relative size of log data in production is greater. Check the JSON response from the backend in Chrome Dev Tools (or similar) to verify the error message being returned.

An example of how to adjust this setting and address the problem [can be seen here](https://github.com/cloud-gov/cg-deploy-logsearch/pull/263).

## Reindexing

Sometimes, we may need to reindex to fix datatypes. While going through this process, keep in mind the index patterns we use - reindexing will
necessarily cause either moments of all logs within an index showing up twice or disappearing for some length of time.
The cases where we've so far needed to do this are usually related to updating mappings, but there may be other cases where it's required.

we'll assume the index you want to operate on is `logs-app-2020.03.04`, and that all commands are being run from one of the elasticsearch hosts

1. export the mapping of your index:

   ```
   # jq call here makes the later post work
   $ curl -XGET localhost:9200/logs-app-2020.03.04/_mappings?pretty | jq '."logs-app-2020.03.04"' > mappings.json
   ```

2. _optional, depending on what you're fixing_ edit mappings.json to change mappings
3. create the new index with the new mapping. Note that by prefixing the name, it violates the index pattern defined in Kibana, so it won't cause duplicate results in people's searches

   ```
   $ curl -XPOST localhost:9200/reindex-logs-app-2020.03.04 -H 'Content-type: application/json' --data-binary "@mappings.json"
   {"acknowledged":true,"shards_acknowledged":true,"index":"reindex-logs-app-2020.03.04"}
   ```

4. reindex the old into the new. This will run in the background, and will take some time:

   ```
   $ curl -XPOST localhost:9200/_reindex?wait_for_completion=false -H 'Content-type: application/json' -d '
   {
     "source": {
       "index": "logs-app-2020.03.04"
     },
     "dest": {
       "index": "reindex-logs-app-2020.03.04"
     }
   }'
   {"task":"asdfasdfasdf:1116281"}
   ```

5. Watch the reindex task to see when it completes, using the task id from the previous command. It's done when `completed` is `true`:

   ```
   $ curl -XGET localhost:9200/_tasks/asdfasdfasdf:1116281?pretty
   {
     "completed" : true,
     "task" : {
       "node" : "asdfasdfasdf",
       "id" : 1116281,
       "type" : "transport",
       "action" : "indices:data/write/reindex",
       "status" : {
         "total" : 14289369,
         "updated" : 0,
         "created" : 14289369,
         "deleted" : 0,
         "batches" : 14290,
         "version_conflicts" : 0,
         "noops" : 0,
         "retries" : {
           "bulk" : 0,
           "search" : 0
         },
         "throttled_millis" : 0,
         "requests_per_second" : -1.0,
         "throttled_until_millis" : 0
       },
       "description" : "reindex from [logs-app-2020.03.04] to [reindex-logs-app-2020.03.04]",
       "start_time_in_millis" : 1590600000000,
       "running_time_in_nanos" : 2518237996135,
       "cancellable" : true,
       "headers" : { }
     },
     "response" : {
       "took" : 2518237,
       "timed_out" : false,
       "total" : 14289369,
       "updated" : 0,
       "created" : 14289369,
       "deleted" : 0,
       "batches" : 14290,
       "version_conflicts" : 0,
    "noops" : 0,
    "retries" : {
      "bulk" : 0,
      "search" : 0
    },
    "throttled" : "0s",
    "throttled_millis" : 0,
    "requests_per_second" : -1.0,
    "throttled_until" : "0s",
    "throttled_until_millis" : 0,
    "failures" : [ ]
     }
   }
   ```

6. Validate that the number of docs is the same (note that the size will probably be different, though):

   ```
   $ curl -XGET localhost:9200/_cat/indices/*logs-app-2020.03.04?v
   health status index                       uuid                   pri rep docs.count docs.deleted store.size pri.store.size
   green  open   logs-app-2020.03.04         ASDFSADFASDFSlsdfasadf   5   1     201997            0    296.3mb        148.3mb
   green  open   reindex-logs-app-2020.03.04 zxcvzxcvzxcvzxcvzxcvzx   5   1     201997            0    274.3mb        137.1mb
   ```

7. Create an alias on the new index so it's included in the Kibana index pattern.
   Note that doing this before deleting the old index will mean that we will briefly see 2x as many documents for that time in Kibana.

   ```
   $ curl -XPOST localhost:9200/reindex-logs-app-2020.03.04/_alias/logs-app-2020.03.04
   {"acknowledged": true}
   ```

8. Drop the old index

   ```
   $ curl -XDELETE localhost:9200/logs-app-2020.03.04
   {"acknowledged": true}
   ```

9. refresh the index list in kibana, under Management -> Index Management
10. refresh the field list in kibana, under Managment -> Index Patterns

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

This command tells each index to forcefully reassign it's shards somewhere else in the cluster.

It:

1. Fetches the shard list.
1. Filters unassigned shards.
1. Pipelines only the index and it's unassigned shard.
1. Where it's rendered as a JSON payload and then pipelined.
1. To curl where it forces the reallocation.

A bit complicated but it's copy & paste, that's the important part.

```sh
curl -XGET http://localhost:9200/_cat/shards | grep -i unassigned | awk '{print $1 " " $2}' | xargs -l bash -c 'echo -e "{\"commands\" : [ {\"allocate_empty_primary\":{\"index\" : \""$0\"",\"shard\" : "$1",\"node\" : \"elasticsearch_data/0\",\"accept_data_loss\" : true}}]}"' | xargs -i -0 -d"\n" curl http://localhost:9200/_cluster/reroute -H "Content-Type: application/json" -d {}
```

### Get Elasticsearch Document Counts

```bash
# get into a node, app or platform.
bosh -d logsearch{-platform} ssh $(bosh -d logsearch vms | grep "elastisearch_data" | head -n1)

# install jq
sudo su -
apt update
apt install -y jq

# set the counter to 0
counter=0

# for each logging index, get the count of all logs and increase the counter.
for index in $(curl -s http://localhost:9200/_cat/indices -H "Content-Type: application/json" | awk '{print $3}' | sort | grep "logs");
  do ((counter+=$(curl -s http://localhost:9200/$index/_count -H "Content-Type: application/json" -d '{"query":{"match_all":{}}}' | jq '.count')))
done

# print out how many logs we have.
echo $counter
```

## Restarting log archivers

If you are seeing `BOSHJobLowFreeRAM` alerts from Prometheus, it may indicate that the log archivers need to be restarted. Check the **bosh_job_name** field on the alert, and if it indicates the `archiver`, follow these steps to restart the archivers

- From a production jumpbox, run the following to log into the archiver VM instances (replacing `instance` with the index of the VM you want to connect to): `bosh -d logsearch ssh archiver/{instance}`
- Elevate privledges to root: `sudo su -`
- Restart all: `monit restart all`
- Observe that all jobs restart: `watch monit summary`

Repeat these steps for each affected archiver VM instance.
