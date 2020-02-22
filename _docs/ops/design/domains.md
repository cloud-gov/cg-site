---
parent: design
layout: ops

layout: docs
sidenav: true
title: Custom Domains Support
---

Production applications typically require custom domains, so that they can be reached at my-app.my-agency.gov rather than my-app.app.cloud.gov. We've used several different approaches for this problem, and considered even more approaches. For historical context, this document outlines a range of approaches, along with pros and cons.

* Manually create load balancers per domain (used before CDN domain broker)
    * Design
        * Customers file a support ticket
        * Operators create a load balancer for the domain
        * Operators upload certificates
    * Advantages
        * No custom code
    * Disadvantages
        * No automation
        * No self-service
* [CDN domain broker](https://github.com/18F/cf-cdn-service-broker) (currently in use)
    * Design
        * Terminate TLS on CloudFront, managed by service broker
        * Forward to cloud.gov origin over public network
    * Advantages
        * Caching, edge serving, lambda support
    * Disadvantages
        * Not FedRAMP approved as of early 2018
        * Users may not need or want caching; must expose and explain caching options
        * No websocket support
        * Specific to AWS
* [ALB domain broker](https://github.com/18F/cf-domain-broker-alb) (in development)
    * Design
        * Terminate TLS on ALB, managed by service broker
        * Forward to cloud.gov routers over private network
        * Pre-provision load balancers so that BOSH can manage associations between load balancers and routers
        * Associate multiple domains with each load balancer using SNI
    * Advantages
        * Supports websockets
        * Simple to configure and explain for users
    * Disadvantages
        * Not a CDN
        * Specific to AWS
* Custom TLS termination proxy broker
    * Design
        * Terminate TLS on haproxy/nginx/traefik
        * Colocate with cloud.gov routers, or forward over private network
        * Store proxy state (endpoints, certificates, etc) in etcd/consul; use conf or consul-template to manage configuration files
    * Advantages
        * Can run on any IAAS
    * Disadvantages
        * Increased operational overhead of running additional services (proxy servers, key-value store)
        * Not a CDN
* TLS termination proxy without broker
    * Design
        * Watch for customer domains via CF API
        * Automatically provision certificates for customer domains with CNAME/ALIAS records
    * Advantages
        * No broker required; just `cf create-domain` and configure DNS
    * Disadvantages
        * No obvious interaction points for DNS challenge; could email DNS challenge token to customers
        * No customer feedback about provisioning stattus
* Do nothing
    * Design
        * Document options for custom domains that live outside the cloud.gov boundary, like Cloudflare or Akamai
    * Advantages
        * No burden on operators
    * Disadvantages
        * Customers may not be able to procure external services
        * Customers may not have knowledge to manage external services
