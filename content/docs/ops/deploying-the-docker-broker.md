---
menu:
  docs:
    parent: deployment
title: Deploying the Docker broker
---

{{% eastwest %}}
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

### Understanding how hosts are made visible to the appropriate orgs in New Relic

This is done by including the organization’s New Relic license key in the broker manifest.

##### License Key:

The license key can be obtained from the New Relic account settings panel. Refer to the New Relic guide [Find Your License Key](https://docs.newrelic.com/docs/accounts-partnerships/accounts/account-setup/license-key#finding) if necessary.

##### Manifest Configuration:

Include the `newrelic` release.

```
releases:
 ...
 - name: newrelic
   version: latest
```

Include the `newrelic-monitor` template in each job.

```
jobs:
  - name: broker
    templates:
      ...
      - name: newrelic-monitor
        release: newrelic
  - name: docker
    templates:
      ...
      - name: newrelic-monitor
        release: newrelic

```

Include the license key and a concise deployment tag in the manifest properties.

```
properties:
  ...
  newrelic:
    license_key: efbbff3bd9467907b59ef75c68248c801ca3984a
    deployment_tag: docker-swarm
```

After deploying the manifest data should begin appearing in the New Relic console wit 5 minutes.

##### Tagging and Alerting

1. Tag each host as `docker` in the New Relic servers console at `https://rpm.newrelic.com/accounts/ACCOUNTID/servers`.
2. Associate each `docker` host with the `docker host` Server alert policy at `https://rpm.newrelic.com/accounts/ACCOUNTID/server_alert_policies`. This policy policy warns and alerts at a lower threshold than the default server alert policy. Of course, alert policies are a fluid thing and should be adjusted frequently to minimize false positives.

### We understand how to add a services/plans to the docker swarm broker

##### Plan Examples

Plans are added in the `broker.services` section of the manifest. Several example plans can be found in the [cloudfoundry-community/docker-boshrelease](https://github.com/cloudfoundry-community/docker-boshrelease/tree/master/examples). A set of templates which should be useful for generating a new broker manifest can be found in [18F/cg-manifests](https://github.com/18F/cg-manifests/tree/master/docker-boshrelease/docker-swarm).

##### Plan Requirements

Certain keys within each service offering and service plan must be unique across the entire Cloud Foundry environment.

- properties.broker.services.id
- properties.broker.services.name
- properties.broker.services.plans.id
- properties.broker.services.dashboard_client
- properties.broker.services.dashboard_client.id
- properties.broker.services.dashboard_client.secret
- properties.broker.services.dashboard_client.redirect_ui

For a more examples of the typical content of these keys see the `secrets_example.yml` template in [18F/cg-manifests](https://github.com/18F/cg-manifests/blob/be0f0dffce622ef1f56e32bb9920d4c9109e1e0b/docker-boshrelease/docker-swarm/secrets_example.yml#L56-L64) or an example plan in [cloudfoundry-community/docker-boshrelease](https://github.com/cloudfoundry-community/docker-boshrelease/blob/82ff153b993bc377c6feaec8a7bbe11553d5d347/examples/docker-swarm-broker-aws.yml#L191-L234).

##### Deploying New Plans

Deploying plan updates requires a momentary restart of the hosts using the `cf-containers-broker` release template. The restart normally completes in less than 1 minute. During this time new service instances cannot be created or deleted and existing service bindings cannot be updated. Docker container hosts using the `docker` release template do not require a restart.

1. Target the updated deployment manifest.

```
	bosh deployment DEPLOYMENT
```


1. Deploy the broker manifest containing updated plans.

```
	bosh deploy DEPLOYMENT
```

1. Run the fetch-containers-images errand to pull any new or updated container images.

```
	bosh run errand fetch-containers-images
```

### We understand how to troubleshoot problems

##### Initial Triage

Confirm that the running CF application is bound to the service instance.

```
cf services

Getting services in org ORG / space SPACE as user@gsa.gov...
OK

name                 service             plan       bound apps         last operation   
es                   elasticsearch-swarm standard   my-app             update
```

Confirm that the host:port and any credentials have been injected into the application env.

```
cf env my-app

Getting env variables for app my-app in org ORG / space SPACE as user.johnson@gsa.gov...
OK

System-Provided:
{
 "VCAP_SERVICES": {
  "es": [
   {
    "credentials": {
     "hostname": "10.10.10.100",
     "password": "639ec1d00ecdb218321964008646c561",
     "port": "32781",
     "ports": {
...
```

Make note of the provided `hostname`, `port(s)`, `username`, and `password`.

If the service environment variables are not present, restage the application with `cf restage APP`. Otherwise, compare the reported host:port to any errors being reported in your application logs. If the reported host:port or credentials differ, ubind the service instance with `cf us APP SERVICE`, re-bind the service with `cf bs APP SERVICE` then restage the app with `cf restage APP`.

##### Basic Troubleshooting

**Broker won't start after updating plans.**

All service offering and service offering plan ids and names must be unique. A duplicate name / id or invalid docker image reference will cause the broker startup to fail, possibly with misleading errors. Confirm your ids, names, image references and yaml syntax first.

**Broker takes a long time to start.**

By default, the broker fetches images before starting, a large number of images or large image sizes will necessarily take longer to pull. This behavior can be toggled in the broker job properties. If you turn off fetching you need to be sure to run `fetch-containers-images` manually.

**Service instance creation fails once, succeeds on retry.**

Not clear what causes this. Theorizing that newly added docker nodes must fetch images the first time they recieve placement for that service. Perhaps solved by ensuring the fetch errand is run after every manifest update.

**Service instance port assignments don't persist after update/restart.**

This functionality was added in release 13 or 14 so it should not be an issue moving forward. If this happens, any application bound the service must be unbound, re-bound and restaged. Nic has a '[dodgy script](https://gist.github.com/drnic/cb695417db200bd10f6c)' that might help with this. Permanently fixing this is accomplished by setting container `PortBindings` via the [remote API](https://docs.docker.com/engine/reference/api/docker_remote_api_v1.21/) when creating of starting a container. If a service instance isn't retaining its bindings check for proper port bindings with `docker inspect`. Populate those bindings stopping the container and restarting with a proper binding via the remote API.


### We understand how container placement works

By default, the spread [placement strategy](https://docs.docker.com/swarm/scheduler/strategy/) is used. This is configurable in the `swarm_manager` job properties:
- [code](https://github.com/cloudfoundry-community/docker-boshrelease/blob/1521218c438b774a8f6f3f24bbd560511f1b2a67/jobs/swarm_manager/templates/bin/job_properties.sh.erb#L31-L32)
- [template](https://bosh.io/jobs/swarm_manager?source=github.com/cf-platform-eng/docker-boshrelease&version=22).

### We understand how new services offered via the broker should control access

Access control must be baked into the docker image used to provide the service. For example, [docker-elasticsearch](https://github.com/18F/docker-elasticsearch) includes the [http-basic](https://github.com/18F/docker-elasticsearch/blob/4b4530e622f172ea911b50f386fdd52e995c779c/Dockerfile#L62-L68) plugin for elasticsearch. The plugin is configured when the service instance is created as part of the [start.sh](https://github.com/18F/docker-elasticsearch/blob/4b4530e622f172ea911b50f386fdd52e995c779c/scripts/start.sh#L11-L12) script. The auto-generated vars used by the script are described in the [cf-containers-broker docs](https://github.com/cloudfoundry-community/cf-containers-broker/blob/master/CREDENTIALS.md).


### Logging into Docker Container
1. SSH into the docker vm. `bosh ssh docker <index>`
1. Once in the docker vm, find the container you want by listing all the containers via `/var/vcap/packages/docker/bin/docker -H=tcp://127.0.0.1:4243 ps`
1. Connect to the container by taking the id hash of the container and running `/var/vcap/packages/docker/bin/docker -H=tcp://127.0.0.1:4243 exec -it <hash id> /bin/bash`
{{% /eastwest %}}
