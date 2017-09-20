---
menu:
  docs:
    parent: services
title: Elasticsearch
name: "elasticsearch24"
description: "Elasticsearch version 2.4: a distributed, RESTful search and analytics engine"
status: "Beta"
---

cloud.gov offers [Elasticsearch](https://www.elastic.co/) 2.4 as a service.

## Plans

Plan Name | Description | Price
--------- | ----------- | -----
`1x`  | Elasticsearch instance with 1GB of RAM and 1 slice of CPU   | Will be paid per hour + storage
`3x`  | Elasticsearch instance with 3GB of RAM and 1 slice of CPU   | Will be paid per hour + storage
`6x`  | Elasticsearch instance with 6GB of RAM and 1 slice of CPU   | Will be paid per hour + storage
`12x` | Elasticsearch instance with 12GB of RAM and 2 slices of CPU | Will be paid per hour + storage
`medium-ha` | Elasticsearch cluster with three master nodes (3584M memory limit, 1792M heap) and three data nodes (3584M memory limit, 1792M heap, 10G disk) | Will be paid per hour + storage

Note: The `medium-ha` plan runs multiple Elasticsearch master and data nodes on different machines, so that service is not interrupted by routine platform maintenance. The `1x`, `3x`, `6x`, and `12x` plans all run on a single instance and will be briefly unavailable during platform maintenance; these plans should not be used for production applications.

## How to create an instance

To create a service instance run the following command:

```sh
cf create-service elasticsearch24 1x my-elastic-service
```

### Additional notes

Elasticsearch 2.4 allows for dots in field names. This is a feature that existed
pre-ElasticSearch 2.0 but was disabled in versions 2.0 to 2.3. Learn more about
that [here](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/dots-in-names.html).

### Shard/replica configuration for high availability

When using a high availability (HA) plan, indexes must be configured with a proper number of [shards and replicas](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/_basic_concepts.html#_shards_amp_replicas) or it is still possible for your instance to experience downtime during platform maintenance.

All HA instances default to 3 shards and 2 replicas per index which is the recommended configuration.

### Managing backups

Note: The Elasticsearch service does not currently have the ability to back up and restore your data. Data loss is possible in the event of a catastrophic failure at the infrastructure layer or user error (e.g., accidentally deleting your data).

The Elasticsearch service includes the [AWS Cloud Plugin](https://www.elastic.co/guide/en/elasticsearch/plugins/2.4/cloud-aws.html), which supports snapshot and restore with AWS S3. For detailed instructions, see the [Snapshot and Restore](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/modules-snapshots.html) [Cloud AWS Repository](https://www.elastic.co/guide/en/elasticsearch/plugins/2.2/cloud-aws-repository.html) documentation.

You can also use this simple example. The example assumes you already have an Elasticsearch service called `my-elasticsearch` and an app called `my-app`, and that you have [curl](https://curl.haxx.se/), [jq](https://stedolan.github.io/jq/), and the [AWS command line interface](https://aws.amazon.com/cli/) available.

### Rotating credentials

You can rotate credentials by creating a new instance and [deleting the existing instance](https://cli.cloudfoundry.org/en-US/cf/delete-service.html). If this is not an option, email [cloud.gov support](mailto:cloud-gov-support@gsa.gov) to request rotating the credentials manually.


* Create an instance of the [S3 service]({{< relref "docs/services/s3.md" >}}):

    ```sh
    cf create-service s3 basic my-s3-bucket
    ```

* Create a [service key](https://docs.cloudfoundry.org/devguide/services/service-keys.html) to access S3 credentials:

    ```sh
    cf create-service-key my-elasticsearch-backup my-key
    ```

* Connect to your Elasticsearch service using port forwarding. Note: You'll need to leave the [`cf ssh`]({{< relref "docs/apps/using-ssh.md" >}}) command running and follow the next steps in a different terminal so that you can access the remote Elasticsearch instance from your local environment:

    ```sh
    es_credentials=$(cf service-key my-elasticsearch my-key | tail -n +3)

    es_hostname=$(echo "${es_credentials}" | jq -r '.hostname')
    es_port=$(echo "${es_credentials}" | jq -r '.port')
    es_username=$(echo "${es_credentials}" | jq -r '.username')
    es_password=$(echo "${es_credentials}" | jq -r '.password')

    cf ssh my-app -L "9200:${es_hostname}:${es_port}"
    ```

* Create a snapshot repository:

    ```sh
    s3_credentials=$(cf service-key my-s3-bucket my-key | tail -n +3)

    s3_bucket=$(echo "${s3_credentials}" | jq -r '.bucket')
    s3_region=$(echo "${s3_credentials}" | jq -r '.region')
    s3_access_key=$(echo "${s3_credentials}" | jq -r '.access_key_id')
    s3_secret_key=$(echo "${s3_credentials}" | jq -r '.secret_access_key')

    curl -X PUT -u "${es_username}:${es_password}" "localhost:9200/_snapshot/my_s3_repository" -d @<(cat <<EOF
    {
      "type": "s3",
      "settings": {
        "bucket": "${s3_bucket}",
        "region": "${s3_region}",
        "access_key": "${s3_access_key}",
        "secret_key": "${s3_secret_key}"
      }
    }
    EOF
    )
    ```

* Create a snapshot:

    ```sh
    curl -X PUT -u "${es_username}:${es_password}" "localhost:9200/_snapshot/my_s3_repository/my_s3_snapshot"
    ```

* Restore from a snapshot. Note: to restore to a new Elasticsearch instance, you'll need to connect to your new instance (see "Connect to your Elasticsearch service using port forwarding" above) and add the existing S3 repository (see "Create a snapshot repository" above).

    ```sh
    curl -X POST -u "${es_username}:${es_password}" "localhost:9200/_snapshot/my_s3_repository/my_s3_snapshot/_restore"
    ```

### The broker in GitHub

You can find the broker here: [https://github.com/18F/kubernetes-broker](https://github.com/18F/kubernetes-broker).
