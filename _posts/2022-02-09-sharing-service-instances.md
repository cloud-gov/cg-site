---
layout: post
date: February 9, 2022
title: "New Feature: Sharing Service Instances"
excerpt: A new feature just added to the cloud.gov platform allows developers to share service instances.
---

The ability to self-provision service instances and easily bind them to applications is one of the most powerful features of the cloud.gov platform. With two simple commands, developers can instantiate new service instances and connect them to an application, [delivering the credentials the application needs to interact with the service](https://docs.cloudfoundry.org/devguide/services/application-binding.html) easily and securely. 

In the past, we have heard from developers that have wanted to extend this functionality further - to allow service instances to be shared across different spaces in a cloud.gov organization. This was something that the cloud.gov platform did not support. 

Until today.

### Sharing is caring

We are happy to announce that [service instance sharing](https://docs.cloudfoundry.org/devguide/services/sharing-instances.html#sharing) has now been enabled on the cloud.gov platform. Here's how it works:

* A developer uses the standard `cf create-service` command to instantiate a new service instance in a particular space.
* When initially created, viewing the service details via `cf service {service_name}` will indicate that the service is not currently shared with any other spaces (see below).

!["Showing details of a service that is not shared"]({{site.baseurl}}/assets/service-not-shared.png)

* A developer can share a service instance created in one space with another space - provided that they have the Space Developer role in _both_ spaces - by using `cf share-service {service_name} -s {other-space}`
* Once the service instance is shared, viewing the service details via `cf service {service_name}` **in the space it was created in** will indicate which other spaces it is shared with and the number of bound apps  (see below).

!["Showing details of a service that is shared"]({{site.baseurl}}/assets/service-shared.png)

* Viewing the service details **in the space the service was shared with** indicates that this is a shared service, and the org/space the service it was shared from  (see below).

!["Showing service details from another space"]({{site.baseurl}}/assets/show-service-details.png)

### Security considerations

While this new functionality provides enhanced options in how developers manage service instances, it may also raise additional security considerations. Application owners should engage their security teams and carefully consider any potential security implications for managing service instances in this way.

With service instance sharing, the cloud.gov platform provides new options for developers, allowing users to manage service instances in the way that best fits their own needs and security requirements.

The needs of our users will continue to drive new feature adoption on the cloud.gov platform. Stay tuned as more new features get rolled out in the weeks and months ahead! 