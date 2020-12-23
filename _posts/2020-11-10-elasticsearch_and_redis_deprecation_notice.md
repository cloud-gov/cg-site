---
layout: post
title: Elasticsearch and Redis deprecation notice
date: November 10, 2020
---
As part of our reliability and stability enhancements to cloud.gov, the legacy Redis 3.2 and Elasticsearch 5.6 offerings from cloud.gov will be deprecated as of April 5, 2021. In accordance with our deprecation policy, provisioning of new instances will be disabled on December 6, 2020 and on April 5, 2021 we will shut down all active instances. This work is an important step in moving cloud.gov towards a more stable and reliable platform by moving away from a bespoke Kubernetes cluster to AWS-hosted services. Learn more about our deprecation policy here:<https://cloud.gov/docs/technology/responsibilities/#deprecation-policy>

The new services of AWS Elasticache for Redis 5.0.6 and AWS Elasticsearch 7.4 replace the legacy Redis 3.2 and Elasticsearch 5.6 services. These new offerings will offer substantial benefits over our legacy offerings, including:

- Higher availability due to being hosted and managed services from AWS.

- Automatic snapshots with no customer intervention for purposes of data restore/recovery.
- Allowing for future transitions to newer versions of these services as AWS makes them available.

As part of the transition of these new replacement services from beta to production the following will take place:

- The beta plan names will change but the existing services instances created during the beta will remain for now. In general the ‘BETA’ name prefix will be dropped from the plan name

- Beta customers - if you would like to continue using your beta instances as production instances, please contact support via a support ticket or my emailing us at[support@cloud.gov](mailto:support@cloud.gov). Let us know the org, space, and service instance name that you would like to remain as a production instance.

- Beta customers - If you don’t want to keep your beta instances - after two weeks from this announcement (November 20, 2020) any Beta instances remaining on the platform not converted to production instances via a customer support request will be deleted.

More technical details on these new services can be found below:

- AWS-Elasticache-Redis:<https://cloud.gov/docs/services/aws-elasticache/>

- AWS-Elasticsearch:<https://cloud.gov/docs/services/aws-elasticsearch/>

If you have any questions, please contact[support@cloud.gov](mailto:support@cloud.gov).
