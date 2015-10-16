---
menu:
  main:
    parent: apps
title: Durable Logging with the ELK Service
weight: 10
---

The ELK service provides Elasticsearch, Logstash and Kibana in a single service offering. By binding an instance of the service to your applications logs will be drained to a Logstash syslog receiver and stored in Elasticsearch with Kibana as the interface for search and visualization.

### Usage

Getting the most out of the ELK service requires several steps.

#### Basics

- [Create the service](#create-the-service)
- [Bind the service](#bind-the-service)
- [Make it permanent](#make-it-permanent)

#### Kibana Access

- [Create a Kibana proxy](#create-a-kibana-proxy)
- [Access Kibana for the first time](#access-kibana-for-the-first-time)

#### Advanced Access

- [Create an Elasticsearch / Marvel proxy](#create-an-elasticsearch-marvel-proxy)

### Basics

##### Create the service

Ensure that the service is offered in your orangization.

```bash
cf marketplace
```

**output**

```bash
Getting services from marketplace in org ORG / space SPACE as USER...
OK

service        plans        description
ELK            free         Elasticsearch, Logstash and Kibana
```

Create an ELK instance.

```bash
cf cs elk free MY_ELK
```

##### Bind the service

Bind the ELK instance to your applications.

```bash
cf bs APPNAME MY_ELK
```

Application logs will begin draining to the ELK instance shortly, you do not need to restage the newly bound applications. 

##### Make it permanent

Add the ELK binding to your application manifest as shown below to ensure ELK is re-bound whenever your app is recreated.

**manifest.yml**

```yml
---
  ...
  services:
    - MY_ELK
```


### Kibana Access

#### Create a Kibana proxy

Access to Kibana requires the creation of a service proxy. Use [make-proxy](https://github.com/18F/cf-service-proxy/blob/master/make-proxy.sh) to do this. 

	./make-proxy.sh -p \
	  -s MY_ELK \
	  -n MY_ELK-kibana \
	  -d DOMAIN \
	  -g "./nginx-auth"
	
**output**

	Looking for jq.
	  - Found jq.
	Getting domains for ed.
	Getting status for MY_ELK.
	  - Checking service bindings for MY_ELK.
	    - Found bindings.
	Checking status for MY_ELK-proxy.
	Creating MY_ELK-proxy...
	
	Getting service credentials for MY_ELK.
	  Port: 12345
	  IP: 10.10.10.1
	
	Getting app environment for MY_ELK-proxy.
	! Proxy vars don't match.
	+ Injecting service credentials into MY_ELK-proxy.
	  + Binding MY_ELK-proxy to PROXY_HOST in 10.10.10.1
	  + Binding MY_ELK-proxy to PROXY_PORT in 12345.
	Checking status for MY_ELK-proxy.
	- Finishing start of MY_ELK-proxy.
	  - Getting credentials for MY_ELK-proxy.
	Checking status for MY_ELK-proxy.
	
	Access the the proxied service here:
	
	https://user:pass@proxy.domain
	Done.

Now your ELK service instance is accessible through an nginx service proxy using basic authentication. Be sure to record the generated password.

#### Access Kibana for the first time.

Launch a browser and head to the provided URL, logging in with the provided username and password.

Kibana requires a few moments to load.

![Selecting an index pattern is the first step in accessing a new Kibana instance.](/img/kibana_loading-450.png "Selecting an index pattern.")

Proceed with the default index name and pattern. This can always be changed later via the 'Settings' link at the top of each Kibana view.

For more information on these settings see [Getting Kibana Up and Running](https://www.elastic.co/guide/en/kibana/current/setup.html) in the official docs. 

![Selecting an index pattern is the first step in accessing a new Kibana instance.](/img/configure_index_pattern-450.png)

Click 'Create' to proceed.

![Creating the index.](/img/logstash-450.png)

Click 'Discover' to head to the search view.

![Click Discover to reach the search view.](/img/links-450.png)

Enter a search filter and press Enter to being reviewing your logs.

![Enter a search filter.](/img/search-450.png)

### Kibana Access

#### Create an Elasticsearch / Marvel Proxy

Creating the Elasticsearch / Marvel proxy follows much the same process as the Kibana proxy with two differences.

1. Elasticsearch in the ELK service container uses the [http-basic](https://github.com/Asquera/elasticsearch-http-basic) plugin for authentication in place of nginx.

1. By default the `make-proxy` script uses proxies the first service port, 5601 for Kibana. The service container also exposes 9200 and 9300 for Elasticsearch http and transport respectively as well as 5000 to recieve syslog messages.

	This proxy will connect the Elasticsearch http port by specifying `"9200/tcp"` with the `-z` switch.


```
./make-proxy.sh \
  -s MY_ELK \
  -d DOMAIN \
  -z "9200/tcp" \
  -p
```
	
**output**

	Looking for jq.
	  - Found jq.
	Getting status for MY_ELK.
	  - Checking service bindings for MY_ELK.
	Creating temp app: placeholder-7D45FC20-2A19-48C8-BCC6-3DECA5530DFB
	Binding service to temp app: placeholder-7D45FC20-2A19-48C8-BCC6-3DECA5530DFB
	  - Checking service bindings for MY_ELK.
	Deleting: placeholder-7D45FC20-2A19-48C8-BCC6-3DECA5530DFB
	Cleaning up: /tmp/placeholder-7D45FC20-2A19-48C8-BCC6-3DECA5530DFB
	Checking status for MY_ELK-proxy.
	Creating MY_ELK-proxy...
	
	Getting service credentials for MY_ELK.
	  Port: 12345
	  IP: 10.10.10.1
	
	Getting app environment for MY_ELK-proxy.
	! Proxy vars don't match.
	+ Injecting service credentials into MY_ELK-proxy.
	  + Binding MY_ELK-proxy to PROXY_HOST in 10.10.10.1.
	  + Binding MY_ELK-proxy to PROXY_PORT in 12345.
	Checking status for MY_ELK-proxy.
	- Finishing start of MY_ELK-proxy.
	  - Getting credentials for MY_ELK-proxy.
	Checking status for MY_ELK-proxy.
	
	Access the the proxied service here:
	
	https://user:password@proxy.domain
	Done.
