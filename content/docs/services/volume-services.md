---
menu:
  docs:
    parent: services
title: Volume services
description: "Existing NFSv3 volumes (see: https://code.cloudfoundry.org/nfs-volume-release/)"
status: "Experimental"
aliases: 
    - /docs/apps/experimental/volume-services/
---

[**This is an experimental feature.**]({{< relref "docs/apps/experimental/experimental.md" >}}) cloud.gov has enabled experimental support for provisioning persistent filesystem volumes for use by customer applications. This experimental service is provided to help test whether cloud.gov is suitable for hosting applications that depend on a durable filesystem to store their state. See below for caveats and notes about production use.

Volumes are brokered and then bound to applications in the same way as our [Redis]({{< relref "docs/services/redis.md">}}), [Elasticsearch]({{< relref "docs/services/elasticsearch24.md">}}), [database]({{< relref "docs/services/relational-database.md">}}), and [blob store]({{< relref "docs/services/s3.md">}}) services. The volume will be available to the application at a path provided in the `VCAP_SERVICES` environment variable.

## Caveats for this service
We're making this service available so that customers can explore migrating their filesystem-dependent applications to cloud.gov. We encourage use of this service now as a way to determine whether certain applications could run in cloud.gov, but we do not regard is as suitable for supporting a production application. **For this reason, the filesystem service will only be turned on for spaces in sandbox and prototyping organizations.**

We'll address the following points before we make the filesystem service available in a fully self-service manner for use by all customers:

* The filesystem service is only available for particular spaces after customers contact cloud.gov support to have it turned on.
* The filesystem service is *not* highly-available. This means that the brokered volume may be unavailable briefly from time to time as we update cloud.gov.
* The filesystem service is *not* tuned for high performance. 
* The filesystem service is backed by NFS, and applications requiring file locking will therefore need to be aware of NFS file locking mechanics. 

## How to use this service

First [contact support]({{< relref "docs/help.md" >}}) to ask that the service be made available. Include:

* The name of the org and space where you want to use the service
* The size of the volume you want to be created

You will be provided with a unique string corresponding to your volume. 

Using the string returned by support as the `share` attribute in `SHARE-JSON`, follow the [instructions for creating the service and binding the volume to your application](https://docs.cloudfoundry.org/devguide/services/using-vol-services.html).
