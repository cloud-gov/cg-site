---
layout: post
date: November 09, 2021
title: "New Controlled Space Egress"
excerpt: The cloud.gov platform is releasing new space types to help customers better control app egress.
---

To better help our customers control egress from their apps, we are offering additional space types for your organization with new application security group (ASG) rules. These new ASG rules allow space egress to be more locked down to minimize the impacts of possible data exfiltration. Currently, all cloud.gov org spaces allow egress from an app to the open internet, our brokered services ([AWS RDS](https://cloud.gov/docs/services/relational-database/), [AWS Elasticache Redis](https://cloud.gov/docs/services/aws-elasticache/), [AWS Elasticsearch](https://cloud.gov/docs/services/aws-elasticsearch/)), and [internal routes](https://docs.cloudfoundry.org/devguide/deploy-apps/routes-domains.html#internal-routes) to other apps within your organization. Our additional space ASG offerings will now include `public-egress`, `restricted-egress`, and `closed-egress`. These ASG rules will apply to all apps running within a certain space type and will allow you to group apps based on functionality.

Here are the following rules associated to the different space ASG types:

- ### `public-egress`
  - Requests being executed from within the app can successfully be sent to the open internet, our brokered services, and other internal routes you have created in your organization.
  - Your app can make requests to third party APIs.
  - Your app can connect to our brokered services.

- ### `restricted-egress`
  - Requests being executed from within the app can only successfully be sent to some of our brokered services or other internal routes you have created in your organization.
    - Accessible brokered services: [AWS RDS](https://cloud.gov/docs/services/relational-database/), [AWS Elasticache Redis](https://cloud.gov/docs/services/aws-elasticache/), [AWS Elasticsearch](https://cloud.gov/docs/services/aws-elasticsearch/).
    - Inaccessible brokered service: [S3 Object Storage](https://cloud.gov/docs/services/s3/).
  - Any requests to the open internet are blocked.

- ### `closed-egress`
  - Requests being executed from within the app can only successfully be sent to other internal routes you have created in your organization.
  - Any requests to the open internet or our brokered services will be blocked.

All current organization spaces will be unaffected by the new space types and will continue to function with the same ASG rules as the `public-egress` space type. As we hear more from our customers using the new space ASG types, we will have the opportunity to iterate on the ASGs as well as release additional guides on working the new space types. If you are interested in adding new spaces with the new ASG rules to your organization, please send requests to [support@cloud.gov](mailto:support@cloud.gov).
