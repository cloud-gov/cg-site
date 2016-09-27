---
menu:
  main:
    parent: experimental
title: Experimental Services
slug: services
---

### [THIS IS AN EXPERIMENTAL FEATURE](/apps/experimental/)

Some services in the cloud.gov platform are experimental but can provide value to your applications:

To enable any of these services email cloud-gov-support@gsa.gov. Use them at your own risk.

#### Docker Swarm - Elasitcsearch and Redis

Elasticsearch and Redis are available in the `cf marketplace` and they can be instantiated for your application. You can see the plans and their information in the marketplace. To create an instance you can type:

`cf create-service elasticsearch-swarm-1.7.5 1x mysearch` or `cf create-service redis28-swarm standard myredis`.


#### Authorization proxy

In the [govcloud environment](/apps/govcloud) a service can be enable to automatically require cloud.gov authentication to access your application. The authorization proxy is a (route service)[https://docs.cloudfoundry.org/services/route-services.html].

To use it first create an instance:
`cf create-service uaa-auth uaa-auth authy`.

Then bind it to a route:
`cf bind-route-service apps.cloud.gov authy --hostname hello`

After that your apps will require cloud.gov authentication before proceeding.
