---
menu:
  docs:
    parent: experimental
title: MongoDB
description: "MongoDB"
aliases:
- /docs/services/mongodb32
- /docs/services/mongodb36
---

[**This is an experimental feature.**]({{< relref "docs/apps/experimental/experimental.md" >}}) This service cannot be made generally available until FedRAMP has approved this service. Please email [cloud.gov support](mailto:cloud-gov-support@gsa.gov) to register your interest in this feature so we can let you know when the service is available.

## Plans

Service Name | Plan Name | Description | Price
------------ | --------- | ----------- | -----
`mongodb32` | `standard` | MongoDB instance with 10 GB storage | Free in Alpha
`mongodb36` | `standard` | MongoDB instance with 10 GB storage | Free in Alpha

Note: MongoDB plans run a single instance and will be briefly unavailable during platform maintenance; this service should not be used for production applications.

#### How to create an instance

To create a service instance, run the following command (replace `my-mongodb-service` with a name for the service):

```sh
cf create-service mongodb36 standard my-mongodb-service
```

### Connecting to your MongoDB service locally

To facilitate backing up your MongoDB service, cloud.gov offers port forwarding if
SSH is enabled for your organization and application. Follow the following
instructions to create a service key and use it to set up a SSH tunnel.

Create a [service key](https://docs.cloudfoundry.org/devguide/services/service-keys.html)
to access MongoDB credentials:

```sh
cf create-service-key my-mongodb-service my-key
```

Connect to your MongoDB service using port forwarding (see [Using SSH]({{< relref "docs/apps/using-ssh.md" >}})). You'll need to
leave the `cf ssh` command running
and follow the next steps in a different terminal so that you can access the
remote MongoDB instance from your local environment. These steps assume you have [jq](https://stedolan.github.io/jq/) installed locally.

```sh
mongodb_credentials=$(cf service-key my-mongodb-service my-key | tail -n +3)

mongodb_hostname=$(echo "${mongodb_credentials}" | jq -r '.hostname')
mongodb_dbname=$(echo "${mongodb_credentials}" | jq -r '.dbname')
mongodb_port=$(echo "${mongodb_credentials}" | jq -r '.port')
mongodb_username=$(echo "${mongodb_credentials}" | jq -r '.username')
mongodb_password=$(echo "${mongodb_credentials}" | jq -r '.password')

cf ssh my-app -L "27017:${mongodb_hostname}:${mongodb_port}"
```

You can now connect to your MongoDB service from your local machine using port `27017` and the password set to `$mongodb_password`, e.g. using the MongoDB command line:

```sh
mongo --authenticationDatabase "${mongodb_dbname}" --username "${mongodb_username}" --password "${mongodb_password}"
```

## Rotating credentials

You can rotate credentials by creating a new instance and [deleting the existing instance](https://cli.cloudfoundry.org/en-US/cf/delete-service.html). If this is not an option, email [cloud.gov support](mailto:cloud-gov-support@gsa.gov) to request rotating the credentials manually.

## The broker in GitHub

You can find the broker here: [https://github.com/18F/kubernetes-broker](https://github.com/18F/kubernetes-broker).
