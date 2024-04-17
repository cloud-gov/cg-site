---
layout: post
title: "Encryption in transit on Cloud.gov"
date: November 4, 2022
excerpt: This article documents the status of encryption in transit for various types of traffic on the Cloud.gov platform.
---

## Application to services

The status of encryption in transit between a customer application and [a service instance](https://cloud.gov/docs/services/intro/) is dependent on the service. Traffic from applications to ElastiCache and ElasticSearch has TLS enabled by default. The same is true for traffic to S3 as long as you are not using a public bucket in web server mode. For traffic to RDS databases, TLS is enabled but not enforced by default. Customers can require TLS in the code library that they are using to make connections to the RDS database.

## Application to application

While traffic between customer applications is not secured with TLS by default, customers can enable [secure container networking with TLS](https://www.cloudfoundry.org/blog/secure-container-networking-with-tls/) between their applications on [internal routes](https://docs.cloudfoundry.org/devguide/deploy-apps/routes-domains.html#internal-routes).

## Inbound traffic to applications

All inbound connections to customer applications on Cloud.gov are protected by TLS. As that traffic comes into Cloud.gov, it crosses a few boundaries where in memory it's decrypted for inspection/routing and then encrypted when it leaves that boundary all the way to the customer application endpoint. For further details, see the documentation on our [SSL/TLS implementation](https://cloud.gov/docs/compliance/domain-standards/#ssltls-implementation).
