---
menu:
  docs:
    parent: experimental
title: Experimental services
slug: services
---

[**This is an experimental feature.**]({{< relref "docs/apps/experimental/experimental.md" >}})

Some services in the cloud.gov platform are experimental but can provide value to your applications.

To enable any of these services, email cloud-gov-support@gsa.gov. Use them at your own risk.

### Elasticsearch and Redis

Elasticsearch and Redis are available in the `cf marketplace`, and they can be instantiated for your application. You can see the plans and their information in the marketplace. To create an instance, you can use:

`cf create-service elasticsearch-swarm-1.7.5 1x mysearch`

or

`cf create-service redis28-swarm standard myredis`


### Authorization proxy

In the [GovCloud environment]({{< relref "docs/apps/govcloud.md" >}}), you can enable a service to automatically require cloud.gov authentication to access your application. The authorization proxy is a [route service](https://docs.cloudfoundry.org/services/route-services.html).

To use it, first create an instance:

`cf create-service uaa-auth uaa-auth authy`

Then bind it to a route:

`cf bind-route-service apps.cloud.gov authy --hostname hello`

After that, your apps will require cloud.gov authentication before proceeding.
