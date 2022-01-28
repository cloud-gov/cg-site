---
parent: management
layout: docs
sidenav: true
redirect_from: 
    - /docs/apps/space-egress/
title: Controlling egress traffic
---

Developers have granular control of egress traffic from application instances, allowing you to control how your applications connect to external services and resources on the public internet.

By default, when new spaces are created in your organization an application security group (ASG) is applied that restricts access to only the internal cloud.gov network. Applications running in this ASG can respond to incoming requests, but new egress traffic to cloud.gov brokered services or to the public internet can't be initiated from these instances. And while this default ASG might be suitable for a limited number of use cases (e.g., serving a static website), for other application types, you will need to modify the ASGs that apply to your space.

A summary of each of the ASGs that can be applied to your space are as follows:

| ASG Type | Public Web | AWS S3 | AWS RDS | AWS Elasticache Redis | AWS Elasticsearch | Internal Routes |
| :-------- |  :-:  | :--: | :-------: | :---------------------: | :-----------------: | :---------------: |
| `closed-egress`     | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| `restricted-egress` | ❌  | ❌ | ✅ | ✅ | ✅ | ✅ |
| `public-egress`     | ✅  | ✅ | ✅ | ✅ | ✅ | ✅ | 


- ### `closed-egress`
  - Default ASG applied to new spaces in an organization.
  - Requests being executed from within the space can only successfully be sent to other internal routes you have created in your organization.
  - Any requests to the open internet or our brokered services will be blocked.

- ### `restricted-egress`
  - Requests being executed from within the space can only successfully be sent to some of our brokered services or other internal routes you have created in your organization.
    - Accessible brokered services: [AWS RDS](https://cloud.gov/docs/services/relational-database/), [AWS Elasticache Redis](https://cloud.gov/docs/services/aws-elasticache/), [AWS Elasticsearch](https://cloud.gov/docs/services/aws-elasticsearch/).
    - Inaccessible brokered service: [S3 Object Storage](https://cloud.gov/docs/services/s3/).
  - Any requests to the open internet are blocked.

- ### `public-egress`
  - Requests being executed from within the space [can successfully be sent to the open internet]({{ site.baseurl }}{% link _docs/management/static-egress.md %}), and other internal routes you have created in your organization.
  - Applications can make requests to third party APIs.
  - Applications can connect to our brokered services.

When you push your application to cloud.gov, the staging process may require outbound connections to the public internet to fetch dependencies and software modules. As such, during the staging process, your app will run under the `public-egress` until it is staged and ready to run. Once this process is complete, your app will run under the ASGs that have been applied, either by default or by modifications that have been made to your space.

For applications that need access to S3, you have the option of running them under the `public-egress` ASG, or running them in the `restricted-egress` ASG, and using a proxy application (e.g., [squid proxy](http://www.squid-cache.org/), [HA proxy](http://www.haproxy.org/), etc.) to proxy traffic to your S3 bucket(s). Reference implementations showing how to do this will be available soon, or you may reach out to the cloud.gov team for support.

To modify the ASG that applies to your space, you can open a support ticket by emailing [support@cloud.gov](mailto:support@cloud.gov) and requesting the addition of a new ASG to apply to your space.
