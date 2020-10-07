---
parent: services
layout: docs
sidenav: true
title: "AWS Elasticsearch BETA"
name: aws-elasticsearchBETA"
description: "AWS Elasticsearch version 7.4: a distributed, RESTful search and analytics engine"
status: "BETA"
---

cloud.gov is prod to offer [Elasticsearch](https://www.elastic.co/) 7.4 as a service hosted in AWS Elasticsearch

## Changes

This new BETA service is currently running Elasticsearch 7.4.  Our prior Elasticsearch service ran version 5.8.  There has been a good deal of changes including breaking changes between the 5.X and 7.X releases.  Customers are encouraged to read the following links for more information on ES API changes:

  - [ES Release notes for 6.0](https://www.elastic.co/guide/en/elasticsearch/reference/6.0/release-notes-6.0.0.html)
  - [ES Breaking Changes for 7.0](https://www.elastic.co/guide/en/elasticsearch/reference/7.0/breaking-changes-7.0.html)
  - [AWS Supported ES Operations](https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/aes-supported-es-operations.html#es_version_7_4)

## Plans

Plan Name | Description |
--------- | ----------- | -----
`BETA-es-dev` | Single data node for non-prod use only |
`BETA-es-medium` | 3 Master and 2 Data node cluster |
`BETA-es-medium-ha` | 3 Master and 4 Data node cluster |


*Additional Cost:* Elasticsearch has a limit of 10GB in storage. After 10G, each additional gigabyte will cost $100 per month.

## How to create an instance

To create a service instance run the following command:

```sh
cf create-service aws-elasticsearch BETA-es-medium my-elastic-service
```

### Shard/replica configuration for high availability

When using the `medium` and `medium-ha` plans, please read [Scalability and resilience: clusters, nodes, and shards](https://www.elastic.co/guide/en/elasticsearch/reference/current/scalability.html) for the elasticsearch basics on clusters as well as the AWS specific [Developer Guide](https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/what-is-amazon-elasticsearch-service.html).  The `medium` plan is mainly focused for customers that need a single index and have coverage with 2 data nodes.  For customers wanting more coverage and more indexes, then the `medium-ha` plan scales the cluster to 4 data nodes to offer high availability (HA).

### AWS Singing requests requirement

In order to use the Elasticsearch service hosted on AWS you will need to use [AWS signed HTTP headers](https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-request-signing.html)

## Managing backups

By default AWS will create hourly snapshot backups of your Elasticsearch service instance and retain those snapshots for 14 days - 336 total snapshots are retained.  These snapshots are only accessible to cluster restore purposes only and can not be exported.

For customers that would like to import or export their Elasticsearch data, this can be done following the [AWS Elasticsearch Manual Snapshot Process](https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-managedomains-snapshots.html)

 As part of the process of using manual snapshots, customers will need to assign an existing S3 bucket and the broker will provide a AWS policy ARN to use with the manual S3 snapshot process

 * Create an instance of the [S3 service]({{ site.baseurl }}{% link _docs/services/s3.md %}):

     ```sh
     cf create-service s3 basic my-s3-bucket
     ```

 * Create a [service key](https://docs.cloudfoundry.org/devguide/services/service-keys.html) to access S3 credentials:

     ```sh
     cf create-service-key my-s3-bucket my-key
     ```

 * Get your s3 bucket name:

    ```sh
    s3_credentials=$(cf service-key my-s3-bucket my-key | tail -n +3)
    s3_bucket=$(echo "${s3_credentials}" | jq -r '.bucket')
    ```

 * Assign your new bucket to your Elasticsearch instance:

    ```sh
    cf create-service-key my-elastic-service my-key -c '{"bucket":"${s3_bucket}"}'
    ```

 * Find your AWS ARN for your AWS policy to reference for your backup:

    ```sh
    es_arn=$(cf service-key my-elastic-service my-key | tail -n +3)
    snapshotRoleARN=$(echo "${es_arn}" | jq -r '.snapshotRoleARN')
    ```

 Once you have your s3 bucket connected and have the `snapshotRoleARN` you can then inside your application connect to the AWS ES host and register your s3 repository endpoint and then perform your snapshot export/import operations using [AWS signed HTTP headers](https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-request-signing.html).  Due to the nature of [AWS Signature Calculations](https://docs.aws.amazon.com/AmazonS3/latest/API/sig-v4-header-based-auth.html) there is no direct way with curl to perform these operations and it's best left to client libraries in a programing language your applications are written in.

 cloud.gov does offer a code sample repository on Github - [aws-elasticsearch-example](https://github.com/cloud-gov/aws-elasticsearch-example) that shows an example in Python on how to interact with the new ES service using signed headers.  Our customers are encouraged to submit PRs of other examples to share with fellow customers.

## Migration from Kubernetes Elasticsearch 5.6 to AWS Elasticsearch 7.4
Migration is not recommended and very expertimental due to the nature of Elasticsearch indexes. This is only available for customers who ask for it. 

The overall process looks this:

1. Ask Cloud.gov Support to access the AWS Elasticsearch plan named `BETA-es-dev-6.8-migration`
2. Take a snapshot of your ES 5.6 index and store in an s3 bucket.
3. Create ES 6.8 service instance and create a service key with `s3-bucket` info attached (See Above Section)
4. Restore ES 5.6 Snapshot into your ES 6.8
5. Upgrade your ES 6.8 to 7.4

### Prepare for Migration
* Have a S3 service instance created with service key - [S3 Service Instructions](https://cloud.gov/docs/services/s3/)
* Have an existing ES 5.6 instance with snapshots to S3 - [ES 5.6 Backups Instructions](https://cloud.gov/docs/services/elasticsearch56/#managing-backups)
* Ask Cloud.gov Support to have access to migration plan `BETA-es-dev-6.8-migration`
* Create new AWS Elasticsearch service instance with `BETA-es-dev-6.8-migration` plan
* Create Service Key with attached S3 - [ES 7.4 Service Key](https://cloud.gov/docs/services/aws-elasticsearchBETA/#managing-backups)

### Backup your ES 5.6 to S3 Bucket
* Connect to your Elasticsearch service using port forwarding. **Note**: You'll need to leave the [`cf ssh`]({{ site.baseurl }}{% link _docs/management/using-ssh.md %}) command running and follow the next steps in a different terminal so that you can access the remote Elasticsearch instance from your local environment:

    ```sh
    es_credentials=$(cf service-key my-elastic-service my-key | tail -n +3)

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

### Restore from S3 to ES 6.8 and reindex
This part will vary greatly depending on which language your application is written in and which library is used. 
1. You need to add the following ES repository to your AWS Elasticsearch Domain
```
  {
    "type": "s3",
    "settings": {
      "bucket": "${s3_bucket}",
      "region": "${s3_region}",
      "role_arn" : "${snapshotRoleARN}"
    }
  }
```

`s3_bucket` and `s3_region` is same as previous step but the `snapshotRoleARN` is given from service-key credentials for the AWS ES 7.4.

2. Restore using above repository and matching snapshot name in previous step. [ES 6.8 Restore](https://www.elastic.co/guide/en/elasticsearch/reference/6.8/modules-snapshots.html#_restore)
3. Reindex your index - You will need to do this so the index will be the correct version for when upgrading. [ES 6.8 Reindexing API](https://www.elastic.co/guide/en/elasticsearch/reference/6.8/docs-reindex.html)
Example reindexing body:
``` 
{
  "source": {
    "index": "your_index"
  },
  "dest": {
    "index": "your_index_in_6.8"
  }
}
```
4. Once your indexes are at least version `6.8`, you can move on to the final part!
### Upgrading ES 6.8 to 7.4
1. Contact Cloud.gov Support to perform a ES 6.8 to ES 7.4 Upgrade Eligbility
2. Cloud.gov Support will let you know if it eligible or not
3. If is ready, then support can do the upgrade to ES 7.4



## Rotating credentials

You can rotate credentials by creating a new instance and [deleting the existing instance](https://cli.cloudfoundry.org/en-US/cf/delete-service.html). If this is not an option, email [cloud.gov support](mailto:support@cloud.gov) to request rotating the credentials manually.

### The broker in GitHub

You can find the broker here: [https://github.com/cloud-gov/aws-broker](https://github.com/cloud-gov/aws-broker).
