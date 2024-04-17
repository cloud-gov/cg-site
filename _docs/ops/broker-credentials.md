---
parent: policies
layout: ops
layout: docs
sidenav: true
title: Broker credential handling
linktitle: Broker credential handling
---

<!-- During the work to approve the SCR for AWS Redis and Elasticsearch the
JAB TRs requested more information in the SSP and related documents on how we
satisfy IA-5 with broker credential management. This level of detail seemed 
excessive for the SSP, so this is page is referenced in 10.1, under the 
"Secrets" heading. -->

This page is primarily for auditors who need to understand how the Cloud.gov brokers, and related components, handle credentials so that they aren't stored or transmitted in the clear. All calls between entities are made over HTTPS, unless otherwise specified. The Cloud.gov brokers follow the [Open Server Broker API standards](https://www.openservicebrokerapi.org/), as specified in the [Cloud Foundry Service Broker interface](https://docs.cloudfoundry.org/services/api.html).

This is specific to the operation of the [AWS Server Broker](https://github.com/cloud-gov/aws-broker). Other brokers will document their handling with their source code, as follows:

{% assign cgservices = site.data.services %}

<table class="usa-table usa-table--borderless">
<thead>
<tr><th>Service Name</th><th>Broker source code</th></tr>
</thead>
<tbody>
{% for item in cgservices %}
<tr>
    <td><a href="{{ site.baseurl }}/docs/services/{{ itemurl }}">{{ item.name }}</a></td>
    <td><a href="{{item.source-code}}">{{ item.source-code }}</a></td>
</tr>
{% endfor %}
</tbody>
</table>

## Broker environment variables

There are important environment variables that should be overriden inside the `manifest.yml` file

> Note: All environment variables prefixed with `DB_` refer to attributes for the database the broker itself will use for internal uses.

1. `DB_URL`: The hostname / IP address of the database.
1. `DB_PORT`: The port number to access the database.
1. `DB_NAME`: The database name.
1. `DB_USER`: Username to access the database.
1. `DB_PASS`: Password to access the database.
1. `DB_TYPE`: The type of database. Currently supported types: `postgres` and `sqlite3`.
1. `DB_SSLMODE`: The type of SSL Mode to use when connecting to the database. Supported modes: `disabled`, `require` and `verify-ca`.
1. `AWS_ACCESS_KEY_ID`: The id credential (treat like a password) with access to make requests to the Amazon RDS .
1. `AWS_SECRET_ACCESS_KEY`: The secret key (treat like a password) credential to access Amazon RDS.
1. `AWS_DEFAULT_REGION`: Region you wish to provision services in.
1. `AUTH_USER`: The username used by cf to authenticate to the broker
1. `AUTH_PASS`: The password used by cf to authenticate to the broker
1. `ENC_KEY`: This is an string that must be 16, 24, or 32 bytes long.  It is an AES key that is used to encrypt the password.

## Instantiation

The broker is deployed by Concourse CI onto CloudFoundry, using a manifest that is built by the Cloud.gov secrets management system to specify the environment variables. When the app is deployed, Concourse [registers](https://docs.cloudfoundry.org/services/managing-service-brokers.html#register-broker) the broker, specifying the AUTH_USER and AUTH_PASS.

The CF Cloud Controller stores the configuration for the app, including these environment variables, in an encrypted database table on the CCDB, as described in [Cloud Foundry security concepts](https://docs.cloudfoundry.org/concepts/security.html). The `aws-broker` app does not write these to static storage since Cloud Foundry makes them available as environment variables.

## Provision a new instance

When an authenticated, authorized CloudFoundry user runs `cf create-service aws-rds _plan_name_ _service_name_`, the CloudFoundry platform uses the OSBAPI (open-service broker API) (https://github.com/openservicebrokerapi/servicebroker/blob/master/spec.md) to call the registered broker with a `PUT` request, `/v2/service_instances/:instance_id` where instance_id is a GUID. The request uses BASIC AUTH, e,g.:

``` sh
curl -X PUT https://username:password@aws-broker..../v2/service_instances/:instance_id
```

The broker expects the `AUTH_PASS`and `AUTH_USER` as specified in the environment, which the Platform has provided (see above)

The response indicates if the provisioning request has been accepted.

## Broker to AWS to provision an instance

The broker application calls the AWS API with the AWS Access Key and Secret Key, which were provided as environment variables at instantiation. 

When the provisioning is complete, the broker takes the following actions:
- For RDS and Redis, it creates a username/password in the AWS service, and stores the credentials in the broker database
- For AWS Elasticsearch, it creates an IAM user with privileges to the new instance, then stores the credentials in the broker database

## Storing credentials in the broker database

The broker uses a dedicated AWS RDS PostgreSQL database. The RDS instance data are encrypted at rest using AWS storage encryption. The communication between the broker and the database is over postgres StartTLS with TLS 1.2 enabled.

The broker is instantiated with encryption key, `ENC_KEY`, and all credentials are written to the database encrypted with that key and a random salt, as in the `setPassword` function of each _service_instance.go file, e.g.: https://github.com/cloud-gov/aws-broker/blob/20f70bb/services/redis/redisinstance.go#L50

## Providing credentials to CloudFoundry applications

The CloudFoundry applications have access to the credentials only if the user `binds` an app to a service instance, as specified at https://github.com/openservicebrokerapi/servicebroker/blob/master/spec.md#binding of the OSBAPI standard. The credentials are fetched from the service broker and are stored in the environment of the application container, and not written the static storage. If the application instance is re-instantiated, the platform fetches the credentials for the application container from the broker.