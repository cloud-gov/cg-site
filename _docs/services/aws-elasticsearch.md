---
parent: services
layout: docs
sidenav: true
title: "AWS Elasticsearch"
name: aws-elasticsearch"
description: "AWS search: a distributed, RESTful search and analytics engine"
status: "Production Ready"
---

cloud.gov offers [aws-elasticsearch](https://aws.amazon.com/elasticsearch-service/) as a service hosted in AWS Elasticsearch and Opensearch.

## Plans

Service Name | Plan Name | Description | Number of nodes |
------------ | --------- | ----------- | --------------- | -----
`aws-elasticsearch` | `es-dev` | Single data node for non-prod use only | 1 |
`aws-elasticsearch` | `es-medium` | 3 Primary and 2 Data node cluster | 5 |
`aws-elasticsearch` | `es-medium-ha` | 3 Primary and 4 Data node cluster | 7 |
`aws-elasticsearch` | `es-large` | 3 Primary and 2 Data node cluster | 5 |
`aws-elasticsearch` | `es-large-ha` | 3 Primary and 4 Data node cluster | 7 |
`aws-elasticsearch` | `es-xlarge` | 3 Primary and 2 Data node cluster | 5 |
`aws-elasticsearch` | `es-xlarge-ha` | 3 Primary and 4 Data node cluster | 7 |
`aws-elasticsearch` | `es-2xlarge-gp` | 3 Primary and 2 Data node cluster | 5 |
`aws-elasticsearch` | `es-2xlarge-gp-ha` | 3 Primary and 4 Data node cluster | 7 |
`aws-elasticsearch` | `es-4xlarge-gp` | 3 Primary and 2 Data node cluster | 5 |
`aws-elasticsearch` | `es-4xlarge-gp-ha` | 3 Primary and 4 Data node cluster | 7 |

## When to use

This service is geared toward applications that need to provide search capability, or interact with indexed data. Although Elasticsearch is often used as part of the ELK logging stack (Elasticsearch + Logstash + Kibana), this service **does not** include Kibana, and isn't suitable as a component of a logging solution. To find out more about logging on the cloud.gov platform, please see [the section on logs]({{ site.baseurl }}/docs/deployment/logs/#web-based-logs-with-historic-log-data).

## Create an instance

To create a service instance run the following command:

```sh
cf create-service aws-elasticsearch {service-plan} {service-name}
```

For example, to create a new instance using the `es-medium` plan named `my-elastic-service`, you would enter the following at the cf CLI:

```shell
cf create-service aws-elasticsearch es-medium my-elastic-service
```

Note: AWS Elasticsearch creation times will vary and is outside of Cloud.gov's control. AWS says approximately 15-30 mins per node.

### Setting optional parameters

name             | required | description              | example
-----------------|----------|--------------------------|---------
`advanced_options` | false | map for advanced options | see below
`ElasticsearchVersion`  | false | Specifies a supported major version in search (must be in "")   | `OpenSearch_1.3`

These are the current supported major versions for Elasticsearch version:

- `Elasticsearch_7.4`
- `OpenSearch_1.3`
- `OpenSearch_2.3`

If you don't specify any option, currently `Elasticsearch_7.4` is used by default.

If you want to specify the Elasticsearch version:

```sh
cf create-service aws-elasticsearch \
    ${SERVICE_PLAN_NAME} \
    ${SERVICE_NAME} \
    -c '{"ElasticsearchVersion": "OpenSearch_2.3"}'
```

### Advanced Options

These are advanced tuning options that can have significant performance or behavior effects on your cluster. They are specified as key/value pairs under the `advanced_options` map in the core parameters. *Note*: although these all represent numbers, they are all specified as strings. Additionally, although they are dotted, they are not nested keys.

Name                                | description                                                 | default
------------------------------------|-------------------------------------------------------------|--------
indices.fielddata.cache.size        | percentage of JVM heap allocated to field data              | "20"
indices.query.bool.max_clause_count | maximum number of clauses allowed in a Lucene boolean query | "1024"

Here are some examples of how to set these values:

```shell
cf create-service aws-elasticsearch es-medium my-es-service-1 \
    -c '{"advanced_options": {"indices.fielddata.cache.size": "21"}}'

cf create-service aws-elasticsearch es-medium my-es-service-2 \
    -c '{"advanced_options": {"indices.query.bool.max_clause_count": "1025"}}'

cf create-service aws-elasticsearch es-medium my-es-service-3 \
    -c '{"advanced_options": {"indices.query.bool.max_clause_count": "1025", "indices.fielddata.cache.size": "21"}}'
```

Note - if you are using the cf CLI utility on Windows, see the [examples section of the Cloud Foundry documentation](https://cli.cloudfoundry.org/en-US/v6/create-service.html#EXAMPLES) for specific formatting of parameters.

### Shard/replica configuration for high availability

The `medium` and `large` plans are mainly geared toward customers that need a single index and have coverage with 2 data nodes.  For customers wanting more coverage and more indexes,  the `medium-ha` nd `large-ha` plans scale the cluster to 4 data nodes to offer high availability (HA).

For additional information on configuring your service for high availability when using anything other than the `es-dev` plan, you can refer to [this article from the Elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/scalability.html) for an overview of how clusters work.

AWS specific information can be found in the AWS [Developer Guide](https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/what-is-amazon-elasticsearch-service.html).  Note - AWS recently changed the name of this service to AWS OpenSearch.

## Update an instance

### Setting optional parameters

name             | required | description              | example
-----------------|----------|--------------------------|---------
`volume_type`  | false | Specifies the EBS storage volume type. Valid options: `gp3` | `gp3`

### Changing instance plans

Please note that you cannot use the broker to update the instance plan at this time.

### Updating storage volume type

To update an existing Elasticsearch/Opensearch instance to use `gp3` storage volumes:

```shell
cf update-service ${SERVICE_NAME} \
  -c '{"volume_type": "gp3"}'
```

[Updating the volume type to `gp3` for your Elasticsearch/Opensearch instance **will trigger a blue/green deployment and some amount of downtime**](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/managedomains-configuration-changes.html#bg) while the instance updates.

## Connecting to your service instance

If you need to directly access your service instance from your local environment, please read [this knowledge base article]({{ site.baseurl }}/knowledge-base/2021-05-20-connecting-to-brokered-service-instances/) for more information.

## Managing backups

By default AWS will create hourly snapshot backups of your Elasticsearch service instance and retain those snapshots for 14 days - 336 total snapshots are retained.  These snapshots are only accessible to cluster restore purposes only and can not be exported.

For customers that would like to import or export their Elasticsearch data, this can be done following the [AWS Elasticsearch Manual Snapshot Process](https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-managedomains-snapshots.html)

As part of the process of using manual snapshots, customers will need to assign an existing S3 bucket and the broker will provide a AWS policy ARN to use with the manual S3 snapshot process

- Create an instance of the [S3 service]({{ site.baseurl }}{% link _docs/services/s3.md %}):

    ```sh
    cf create-service s3 basic my-s3-bucket
    ```

- Create a [service key](https://docs.cloudfoundry.org/devguide/services/service-keys.html) to access S3 credentials:

    ```sh
    cf create-service-key my-s3-bucket my-key
    ```

- Get your s3 bucket name:

    ```sh
    s3_credentials=$(cf service-key my-s3-bucket my-key | tail -n +3)
    s3_bucket=$(echo "${s3_credentials}" | jq -r '.credentials.bucket')
    ```

- Assign your new bucket to your Elasticsearch instance:

    ```sh
    cf create-service-key my-elastic-service my-key -c '{"bucket":"${s3_bucket}"}'
    ```

- Find your AWS ARN for your AWS policy to reference for your backup:

    ```sh
    es_arn=$(cf service-key my-elastic-service my-key | tail -n +3)
    snapshotRoleARN=$(echo "${es_arn}" | jq -r '.credentials.snapshotRoleARN')
    ```

 Once you have your s3 bucket connected and have the `snapshotRoleARN` you can then inside your application connect to the AWS ES host and register your s3 repository endpoint and then perform your snapshot export/import operations using [AWS signed HTTP headers](https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-request-signing.html).  Due to the nature of [AWS Signature Calculations](https://docs.aws.amazon.com/AmazonS3/latest/API/sig-v4-header-based-auth.html) there is no direct way with curl to perform these operations and it's best left to client libraries in a programing language your applications are written in.

 cloud.gov does offer a code sample repository on Github - [aws-elasticsearch-example](https://github.com/cloud-gov/aws-elasticsearch-example) that shows an example in Python on how to interact with the new ES service using signed headers.  Our customers are encouraged to submit PRs of other examples to share with fellow customers.

## Encryption

Every non-dev AWS Elasticsearch instance configured through cloud.gov is [encrypted at rest](https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/encryption-at-rest.html). We use the industry standard AES-256 encryption algorithm to encrypt your data on the server that hosts your AWS Elasticsearch instance.

Service Name | Plan Name | Encryption at Rest |
------------ | --------- | --------------- |
`aws-elasticsearch` | `es-dev` | No |
`aws-elasticsearch` | `es-medium` | Yes |
`aws-elasticsearch` | `es-medium-ha` | Yes |

Note: If you have access to larger service plans, they will mirror same settings as `es-medium` or `es-medium-ha`.

## Rotating credentials

You can rotate credentials by creating a new instance and [deleting the existing instance](https://cli.cloudfoundry.org/en-US/cf/delete-service.html). If this is not an option, email [cloud.gov support](mailto:support@cloud.gov) to request rotating the credentials manually.

### The broker in GitHub

You can find the broker here: [https://github.com/cloud-gov/aws-broker](https://github.com/cloud-gov/aws-broker).
