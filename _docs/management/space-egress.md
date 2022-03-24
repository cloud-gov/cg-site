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
  - Requests being executed from within the space [can successfully be sent to the open internet]({{ site.baseurl }}{% link _docs/management/static-egress.md %}), our brokered services, and other internal routes you have created in your organization.
  - Applications can make requests to third party APIs.
  - Applications can connect to our brokered services.

When you push your application to cloud.gov, the staging process may require outbound connections to the public internet to fetch dependencies and software modules. As such, during the staging process, your app will run under the `public-egress` until it is staged and ready to run. Once this process is complete, your app will run under the ASGs that have been applied, either by default or by modifications that have been made to your space.

For applications that need access to S3, you have the option of running them under the `public-egress` ASG, or running them in the `restricted-egress` ASG, and using a proxy application (e.g., [squid proxy](http://www.squid-cache.org/), [HA proxy](http://www.haproxy.org/), etc.) to proxy traffic to your S3 bucket(s). Reference implementations showing how to do this will be available soon, or you may reach out to the cloud.gov team for support.

To inspect or modify the ASG that apply to your spaces, you can use the following cf CLI subcommands. Run `cf <subcommand> --help` to find out more about a specific command, or consult [the cf CLI documentation site](https://cli.cloudfoundry.org/en-US/v6/).

| CF CLI subcommand | Description | 
| :- | :- |
| `cf security-group`                         | Show a single security group |
| `cf security-groups`                        | List all security groups |
| `cf bind-security-group`                    | Bind a security group to a particular space, or all existing spaces of an org |
| `cf unbind-security-group`                 | Unbind a security group from a space |
| `cf bind-staging-security-group`            | Bind a security group to the list of security groups to be used for staging applications globally |
| `cf staging-security-groups`                | List security groups globally configured for staging applications |
| `cf unbind-staging-security-group`          | Unbind a security group from the set of security groups for staging applications globally |
| `cf bind-running-security-group`            | Bind a security group to the list of security groups to be used for running applications |
| `cf running-security-groups`                | List security groups globally configured for running applications |
| `cf unbind-running-security-group`          | Unbind a security group from the set of security groups for running applications globally |

If you have additional questions or run into issues, you can open a support ticket by emailing [support@cloud.gov](mailto:support@cloud.gov.