---
menu:
  main:
    parent: operations
title: Accessing v1 Managed Services
weight: 10
---

#### Background:

Cloud Foundry Managed Services provide applications with on-demand access to services outside of the stateless application environment. Typical managed services include databases, queues and key-value stores.

The v1 services in [cf-services-contrib-release](https://github.com/cloudfoundry-community/cf-services-contrib-release) are a straightforward way to get started quickly with a suite of useful service bindings. Services included are elasticsearch, memcached, mongodb, postgresql, rabbitmq, redis, vblob and swift.

**Note:** These v1 services are currently deprecated and set to be removed in a future Cloud Foundry release. Consider using the v2 [containers service broker](https://github.com/cf-platform-eng/cf-containers-broker) with an appropriate Docker image going forward.

#### Prerequisites:

1.) Cloud Foundry [CLI](https://github.com/cloudfoundry/cli).

	brew tap pivotal/tap
	brew install cloudfoundry-cli

2.) The utility [jq](http://stedolan.github.io/jq/) JSON parsing utility is not strictly necessary, but comes into play in of one of the examples below.

	brew install jq

3.) An fully deployed and authorized v1 Cloud Foundry service such as the contrib services mentioned above.

#### Procedure:

In order to create a service instance and binding for use with an application we first need to identify the available services and their respective plans.

##### List v1 Services:

	cf service-auth-tokens

**Output:**

	Getting service auth tokens as USERNAME...
	OK

	label           provider   
	postgresql      core   
	elasticsearch   core   

##### List v1 Service Plans:

Unfortunately, the `cf` cli lacks a command to query for v1 service plans directly, but we can get that information from the Cloud Foundry API with the help of `cf curl`.

Identify the `service_plan_url` for the service `entity` (service label) you're interested in.

	cf curl /v2/services

Access the entity `service_plan_url` with `cf curl` to see available plans.

	cf curl SERVICE_PLAN_URL

We can do this as a one-liner with some help from jq.

	cf curl `cf curl /v2/services | jq -r '(.resources[] | select(.entity.label == SERVICE_LABEL) | .entity.service_plans_url)'`

##### Create a Service Instance:

Target the org and space which will hold the app to which the service instance will be bound.

	cf target -o ORG -s SPACE

Create a new service instance by specifying a service label, plan and a name of your choice for the service instance. Note that service instance names must be unique and they can be renamed.

	cf create-service SERVICE_LABEL SERVICE_PLAN INSTANCE_NAME

For example, the create an instance of the elasticsearch service using the free plan with name 'es'.

	cf create-service elasticsearch free es

##### Bind the Service Instance:

A service instance must be bound to the application which will access it. This can be done in a single step by adding a binding to the application's `manifest.yml`.

**manifest.yml**

	---
	applications:
	- name: app
	  command: node app.js
	  services:
	   - es

A service binding will be created with the next `cf push`.


Alternatively, a service instance can also bound to an existing application via the `cf` cli.

	cf bind-service APPLICATION SERVICE_INSTANCE

##### Understand the Service Configuration:

Use `cf env APPLICATION` to to display the application environment variables including `VCAP_SERVICES` which holds information for each bound service.

**Output:**

	...
	 "VCAP_SERVICES": {
	  "elasticsearch-0.20": [
	   {
	    "credentials": {
	     "host": "10.10.3.129",
	     "hostname": "10.10.3.129",
	     "name": "elasticsearch-UUID-A",
	     "password": "UUID-B",
	     "port": 45001,
	     "url": "http://UUID-C:UUID-B@10.10.3.129:45001",
	     "username": "UUID-C"
	    },
	    "label": "elasticsearch-0.20",
	    "name": "es",
	    "plan": "free",
	    "tags": [
	     "object store"
	    ]
	...

In this case, `url` alone could be sufficient for establishing a connection from the running application.

##### Access the Service Configuration:

Configuration and credentials for the bound service can be accessed in several ways.

1.) Manually parsing the JSON contained in the `VCAP_SERVICES` environment variable. For specifics of the `VCAP_SERVICES` format see the Cloud Foundry [environment variables documentation](http://docs.cloudfoundry.org/devguide/deploy-apps/environment-variable.html#VCAP-SERVICES).

2.) Through a language-specific module such as [cfenv](https://www.npmjs.org/package/cfenv) for node.js.

3.) Through buildpack-populated environment variables as in the [ruby buildpack](http://docs.cloudfoundry.org/buildpacks/ruby/ruby-service-bindings.html#vcap-services-defines-database-url).

###### Node.js Access Example:

To access the elasticsearch service described above with a node app.

**package.json**

 	...
	"dependencies": {
		...
	    "cfenv": "*",
	    ...
	  }
	...

**app.js**

	...
	var cfenv = require("cfenv")
	var appEnv = cfenv.getAppEnv()

	url = appEnv.getServiceURL("es")

	var client = new elasticsearch.Client({
		host: url,
	});
	...
