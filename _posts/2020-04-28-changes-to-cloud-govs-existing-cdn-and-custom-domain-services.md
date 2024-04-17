---
layout: post
title: Changes to Cloud.gov’s existing CDN and custom domain services
date: April 28, 2020
redirect_from:
  - /2020/04/28/changes-to-cloud-gov-s-existing-cdn-and-custom-domain-services-1/
---
This message is to let you know about upcoming changes to Cloud.gov’s CDN and domain services.

**What is happening to the old services?**

Let’s Encrypt, which the Cloud.gov custom domain service uses to provision SSL certificates for custom domains, is deprecating their v1 API. If you already have a domain registered, you will not be impacted, but you should still prepare for changes.

**Here are the details:**

Cloud.gov’s existing CDN service (provided by the cdn-broker) and the custom-domain service (provided by the domains-broker) will no longer be able to provision *new domains* starting June 1, 2020. All *existing domains* will continue to operate normally.

We are working on a new version of the service that will use the Let’s Encrypt v2 API and anticipate having a new service in place before the existing services retire in June.

We’ve attempted to answer some questions below, but as always, feel free to reach out to us directly at support@cloud.gov.

**What is a service broker?**

Service brokers are a fundamental part of the Cloud.gov platform. They allow developers to provision production-grade third-party services though the familiar Cloud Foundry interface. Some brokers, like the custom domain broker, orchestrate multiple services and configure the complex interactions. This saves countless hours of developer time and allows the platform to manage these services on your behalf.

**What are the cdn and domains services used for?**

You can see the cdn and domains services in the [Dashboard](https://dashboard.fr.cloud.gov/), or by running cf marketplace from the command line:

```
$ cf marketplace
  cdn-route Custom domains, CDN caching, and TLS certificates
    with automatic renewal cdn-broker
  custom-domain Custom domains and TLS certificates
    with automatic renewal domains-broker
```

The CDN service provisions and configures AWS CloudFront and Let’s Encrypt TLS certificates to serve traffic from a custom domain provided by your engineering team.

Similarly, the domain service does the same job, but using AWS ALBs and Let’s Encrypt TLS certificates (without the AWS CloudFront CDN in front).

**What is replacing the old services?**

The Cloud.gov team is actively working on a replacement broker that will be compatible with the Let’s Encrypt v2 API. This broker will offer replacements for both of the old services. We plan to have this new service in place in advance of the June 1st deadline.

**What is the impact to Cloud.gov customers?**

Cloud.gov’s existing domain service will no longer be able to provision new instances starting June 1, 2020. All existing instances will continue to work until June 2021. This will not cause any issues or downtime for applications that have already provisioned custom-domain service instances.

**What do Cloud.gov customers need to do?**

Once the new service is in place, you should use this new service for all new custom domain provisioning. At that time, we will provide instructions for migrating existing domains to the new service as well. We understand changes like this are disruptive and we are doing all we can to make this transition as smooth as possible.

**Questions? Contact support@cloud.gov**
