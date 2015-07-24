---
menu:
  main:
    parent: ops
title: Deploying the Docker Broker
weight: 10
---

This guide covers the high level steps required to configure, deploy and enable docker-boshrelease and included cf-containers-broker.

#### Background

**[docker-boshrelease:](https://github.com/cf-platform-eng/docker-boshrelease)** Provides a quick way to deploy a bosh-managed Docker host or swarm.

**[cf-containers-broker:](https://github.com/cf-platform-eng/cf-containers-broker)** A Cloud Foundry [service broker](https://docs.cloudfoundry.org/services/api.html) which enables launching containerized services to a Docker backend.

#### Prerequisites

- Access to the bosh director of a functional Cloud Foundry environment.
- AWS credentials with permission to provision Elastic IPs.

#### Procedure

1. [Deployment]({{< relref "#deployment" >}})
1. [Configuration]({{< relref "#configuration" >}})
1. [Operation]({{< relref "#operation" >}})

#### Deployment

1. Obtain the current release source.

		git clone https://github.com/cf-platform-eng/docker-boshrelease.git
		cd docker-boshrelease

1. Upload the latest release.

		bosh upload release releases/docker/docker-XX.yml

1. Provision an elastic IP for use by the broker.

		aws ec2 allocate-address --domain vpc
	
	Note the provided `PublicIp` for use as the `elastic_ip` variable below.

1. Choose an appropriate template from the `./examples` directory replacing the variables which describe your environment and secrets. For the purpose of this guide we're working with `docker-broker-aws.yml` where we'll need to provide the following variables.

		deployment_name
		director_uuid
		elastic_ip
		root_domain
		
		properties.nats.user
		properties.nats.password
		properties.nats.machines
		
		properties.cf.admin_username
		properties.cf.admin_password
		
		properties.broker.username
		properties.broker.password
		
	Save the complete manifest to a new file. For example, `docker-broker-aws-deploy.yml`.
	
	**Note:** The manifest describes each Docker image to be downloaded and made available as a service in the `properties.broker.services` section. Service configuration is covered in greater detail in [Configuration]({{< relref "#configuration" >}}).

1. Generate a deployment from the manifest.

		bosh deployment docker-broker-aws-deploy.yml

1. Initiate the deployment.

		bosh deploy 

#### Configuration

Docker images are configured in the `properties.broker.services` key which contains a list of images, each with its own respective metadata, credential configuration and plans.

For more information about each field in a service description see: 

* [Services Metadata Fields](http://docs.cloudfoundry.org/services/catalog-metadata.html#services-metadata-fields)
* [Plan Metadata Fields](http://docs.cloudfoundry.org/services/catalog-metadata.html#plan-metadata-fields)
* [Plan Credentials](https://github.com/cf-platform-eng/cf-containers-broker/blob/master/CREDENTIALS.md)
* [Docker Properties Format](https://github.com/cf-platform-eng/cf-containers-broker/blob/master/DOCKER.md#properties-format)

##### Adding New Services:

If you're thinking about adding an additional service, have a look at the Dockerfiles describing some of the services found in the default templates.

* [frodenas/postgresql](https://github.com/frodenas/docker-postgresql)
* [frodenas/mongodb](https://github.com/frodenas/docker-mongodb)
* [18F/elasticsearch](https://github.com/18F/docker-elasticsearch)

A few critical things to note when adding a service.

* Provide a [runtime script](https://github.com/18F/docker-elasticsearch/blob/master/scripts/start.sh) to capture the broker-inserted [plan credentials](https://github.com/cf-platform-eng/cf-containers-broker/blob/master/CREDENTIALS.md) and [configure your service to use them](https://github.com/18F/docker-elasticsearch/blob/d71890d8a2dc05c499d5d98127a6051a730c555e/scripts/start.sh#L11-12).
* Provide a [volume mount](https://github.com/18F/docker-elasticsearch/blob/d71890d8a2dc05c499d5d98127a6051a730c555e/Dockerfile#L92) and configure your service to [use it for persistent data](https://github.com/18F/docker-elasticsearch/blob/d71890d8a2dc05c499d5d98127a6051a730c555e/config/elasticsearch.yml#L2-4).
* Ensure the `id:` of your service and each included plan is unique. Linux and OSX users will find [uuidgen](https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man1/uuidgen.1.html) handy for this.
* Make the image available on the [Docker Hub](https://hub.docker.com).




#### Operation

1. Enable the broker.

		cf create-service-broker BROKER_NAME BROKER_USER BROKER_PASS https://BROKER_HOST
		
	Where each variable correlates to a section of the manifest used to create the deployment.
	
	- `BROKER_NAME` = properties.broker.name
	- `BROKER_USER` = properties.broker.username
	- `BROKER_PASS` = properties.broker.password
	- `BROKER_HOST` = properties.broker.host
	
1. Enable services.

	To enable all plans of a service for all orgs.

		cf enable-service-access SERVICE
		
	To enable a specific service plan or enable plans in a specific org use the `-p` and/or `-o` option.
		
		cf enable-service-access SERVICE -p PLAN -o ORG

1. Create service instances.

		cf create-service SERVICE PLAN SERVICE_INSTANCE_NAME
	
1. Bind those services to your apps using `cf bind-service` or the `services` key in your application `manifest.yml`.