---
parent: management
layout: docs
sidenav: true
redirect_from:
    - /docs/apps/space-egress/
title: Controlling egress traffic
---

Developers have granular control of egress traffic from application instances, allowing you to control how your applications connect to external services and resources on the public internet.

By default, when new spaces are created in your organization an application security group (ASG) is applied that restricts access to only the internal Cloud.gov network. Applications running in this ASG can respond to incoming requests, but new egress traffic to Cloud.gov brokered services or to the public internet can't be initiated from these instances. And while this default ASG might be suitable for a limited number of use cases (e.g., serving a static website), for other application types, you will need to modify the ASGs that apply to your space.

A summary of each of the ASGs that can be applied to your space are as follows:

| ASG Type | Public Web | AWS S3 (user-provided)| AWS S3 (brokered) | AWS RDS | AWS Elasticache Redis | AWS Elasticsearch | Internal Routes |
| :-------- |  :-: | :--:  | :--: | :-------: | :---------------------: | :-----------------: | :---------------: |
| `closed-egress`     | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| `trusted-local-egress` | ❌ | ❌ | ✅  | ✅ | ✅ | ✅ | ✅ |
| `public-egress`     | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ |


- ### `closed-egress`
  - Default ASG applied to new spaces in an organization.
  - Requests being executed from within the space can only successfully be sent to other internal routes you have created in your organization.
  - Any requests to the open internet or our brokered services will be blocked.

- ### `trusted-local-egress`
  - ASG name: `trusted_local_networks_egress`
  - Requests being executed from within the space can only successfully be sent to some of our brokered services or other internal routes you have created in your organization.
    - Accessible brokered services: [AWS RDS](https://cloud.gov/docs/services/relational-database/), [AWS Elasticache Redis](https://cloud.gov/docs/services/aws-elasticache/), [AWS Elasticsearch](https://cloud.gov/docs/services/aws-elasticsearch/), [S3 Object Storage](https://cloud.gov/docs/services/s3/).
  - Any requests to the open internet are blocked.

- ### `public-egress`
  - ASG name: `public_networks_egress`
  - Requests being executed from within the space [can successfully be sent to the open internet]({{ site.baseurl }}{% link _docs/management/static-egress.md %}) and other internal routes you have created in your organization.
  - Applications can make requests to third party APIs.
  - Any requests to our brokered services except for S3 will be blocked.
  - Applications connecting to their own S3 buckets (not brokered) that reside in AWS Govcloud West will need to use an alternate endpoint for s3:
 
      `*.vpce-01beaa66570dfb2b9-1hlav4x8.s3.us-gov-west-1.vpce.amazonaws.com`
    ```
      aws --endpoint-url https://bucket.vpce-01beaa66570dfb2b9-1hlav4x8.s3.us-gov-west-1.vpce.amazonaws.com s3 ls s3://my-private-bucket
    ```
      for more details on using alternate endpoints with S3 see [Accessing buckets and S3 access points from S3 interface endpoints](https://docs.aws.amazon.com/AmazonS3/latest/userguide/privatelink-interface-endpoints.html#accessing-bucket-and-aps-from-interface-endpoints)

Often, production applications need to communicate with an internal, brokered service like a database and make requests to the public internet for third-party APIs. Such applications would need **both `trusted-local-egress` and `public-egress`** applied to their space.

When you push your application to Cloud.gov, the staging process may require outbound connections to the public internet to fetch dependencies and software modules. As such, during the staging process, your app will run under the `public-egress` until it is staged and ready to run. Once this process is complete, your app will run under the ASGs that have been applied, either by default or by modifications that have been made to your space.

For applications that need access to their own S3 buckets, you have the option of running them under the `public-egress` ASG, or running them in the `trusted-local-egress` ASG, and using a proxy application (e.g., squid proxy, HA proxy, etc.) to proxy traffic to your S3 bucket(s). Reference implementations showing how to do this will be available soon, or you may reach out to the Cloud.gov team for support.

## Managing egress settings for your org or space

To inspect or modify the ASG that apply to your spaces, you can use the following `cf` CLI subcommands. Run `cf <subcommand> --help` to find out more about a specific command, or consult [the cf CLI documentation site](https://cli.cloudfoundry.org/en-US/v6/).

| CF CLI subcommand | Description |
| :- | :- |
| `cf security-group`                         | Show a single security group |
| `cf security-groups`                        | List all security groups |
| `cf bind-security-group`                    | Bind a security group to a particular space, or all existing spaces of an org |
| `cf unbind-security-group`                  | Unbind a security group from a space |
| `cf staging-security-groups`                | List security groups globally configured for staging applications |
| `cf running-security-groups`                | List security groups globally configured for running applications |

To adjust the security groups for a particular space, you must have the [SpaceManager role](https://docs.cloudfoundry.org/concepts/roles.html#roles). (To check the roles for a given space, use the `cf space-users` command.)

For example, to grant public egress to apps running in your sandbox space SPACE (where you are a SpaceManager), run

    cf bind-security-group public_networks_egress sandbox-gsa --space SPACE

To set the security group for all spaces in an organization, you must have the [OrgManager role](https://docs.cloudfoundry.org/concepts/roles.html#roles). (To check the roles for a given space, use the `cf org-users` command.)

For example, to grant public egress to apps running in _any_ space in organization ORG, someone with the OrgManager role should run

    cf bind-security-group public_networks_egress ORG

If you have additional questions or run into issues, you can open a support ticket by emailing [support@cloud.gov](mailto:support@cloud.gov).
