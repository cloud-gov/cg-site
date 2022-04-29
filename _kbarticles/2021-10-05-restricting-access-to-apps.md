---
layout: post
title: "Restricting access to apps"
date: October 05, 2021
excerpt: Information to help you restrict access to your apps
---

Applications sometimes need to restrict access to content, functionality, or components. This is particularly true of applications that are built using microservices, or that utilize backend APIs to power front-end interfaces.

There are different ways of restricting access to your applications on cloud.gov, and the approach you choose may benefit from a discussion of the relative pros and cons of each. 

### Route service

The Cloud Foundry platform offers a feature called [route services](https://docs.cloudfoundry.org/services/route-services.html) that enable you to set up a special service that modifies requests to your application (e.g., filtering by IP address) before the traffic is delivered to your app.  

Route services are a good option to choose if you have a website or application that needs access restricted to a small group of authenticated users, or to a specific set of IP addresses (or IP range). This is common for intranet like applications that provide content or information that is not for public consumption, but rather for sharing inside an agency or office. 

You can think of a route service as working in tandem with the network infrastructure that manages traffic between the outside world and the cloud.gov environment. When you [register a route service](https://docs.cloud.service.gov.uk/deploying_services/route_services/#implement-a-route-service) for your app:

* The router that manages inbound traffic first send requests for your application to the route service.
* The route service manipulates or checks the incoming requests, as it's logic dictates.
* The route service then sends the request back to the router, which sees that the route service has finished its work, and then sends the request on to your app.

In short, all traffic to your app is first sent by the router to your route service, before it is then sent on to your app. 

### Internal route

Cloud Foundry also support a concept called [internal routes](https://docs.cloudfoundry.org/devguide/deploy-apps/routes-domains.html#internal-routes). Internal routes allow you to deploy applications on a special domain (`*.apps.internal`) that can only be reached from another app container in your space.

Internal routes are a good option to choose if you have components of your application that do not need to be exposed to outside traffic (e.g., an API application that is used by a front-end interface). Setting up your backend components on internal routes allows you to have granular control over the specific apps that can interact with these backend components, the type of traffic to allow (TCP or UDP), and the port to accept connections on. This is done through the use of [network policies](https://cli.cloudfoundry.org/en-US/v6/add-network-policy.html).

The cloud.gov team has some good documentation and resources available for those interested in learning about and using internal routes.

* The cloud.gov team [presented a tech talk on internal](https://www.youtube.com/watch?v=2m4FP522DU8)
* There are some [examples apps that went along with this talk here](https://github.com/cloud-gov/tech-talk-internal-routes)
* [More resources](https://github.com/cloud-gov/tech-talk-internal-routes#additional-resources) that might be useful are here

### Potential areas of confusion

For some use cases (e.g., and intranet application), either route services or internal routes may be used to restrict access to an application. In addition, for both route services and proxy apps that are used to control traffic to internal routes, the same kind of application may be used - nginx is a common application component in both scenarios.

In addition, there are some use cases where the use of **both** route services and internal routes make sense (for example, an application that needs to filter by IP address that also uses a backend API that does not need to be exposed to external traffic).

### Pros and cons of each approach

Route services may be simpler to use in some scenarios as they do not require you to set up and manage network policies. However, because traffic through route services will make more network hops, some latency may be introduced.

Internal routes require a bit more set up, but can be a good fit for applications that employ a microservices architecture, with multiple backend components that do not need to be exposed to external traffic. However, traffic to components running on internal routes from other app instances is not automatically encrypted, which may require some additional work by application owners.