---
menu:
  main:
    parent: apps
title: Custom Domains
weight: 10
---

1. Create the [load balancer (ELB)](http://aws.amazon.com/elasticloadbalancing/) – there needs to be one ELB pointing to Cloud Foundry per TLS certificate.
    * If domains under the cert already point to apps on Cloud Foundry (e.g. `18f.us`), you're all set.
    * If not, follow the [ELB instructions]({{< relref "ops/elb.md" >}}).
1. Set up the [Hosted Zone](http://docs.aws.amazon.com/Route53/latest/DeveloperGuide/AboutHZWorkingWith.html).
    * If it already exists in [Route 53](https://console.aws.amazon.com/route53/home?region=us-east-1#hosted-zones:), you're good.
    * If not, follow [these instructions](https://github.com/18F/tls-standards/tree/master/certificates#set-up-the-domain).
1. Create the [Record Set](http://docs.aws.amazon.com/Route53/latest/DeveloperGuide/rrsets-working-with.html).
    1. Click on the Domain Name of the Hosted Zone.
    1. Click "Create Record Set".
    1. For `Alias`, select `Yes`.
    1. For `Alias Target`, type the name of your ELB and select it from the list.
        * For `*.18.us` domains, use `dualstack.cf-app-router-*`.
1. Create and assign the domain in Cloud Foundry.

    ```bash
    cf create-domain <ORG> <DOMAIN>
    cf map-route <APP> <DOMAIN>
    ```

See also: [official Cloud Foundry documentation](http://docs.cloudfoundry.org/devguide/deploy-apps/domains-routes.html).
