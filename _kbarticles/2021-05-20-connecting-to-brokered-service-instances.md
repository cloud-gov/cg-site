---
layout: post
title: "Connecting to brokered Elasticsearch service instances"
date: May 20, 2021
excerpt: Some suggestions for connecting to brokered Elasticsearch instances
---

For compliance purposes, brokered Elasticsearch service instances may only be accessed from within the cloud.gov environment. Additionally in order to connect to these instances, AWS requires the use of [signed HTTP headers](https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-request-signing.html). If you plan to connect to your Elasticsearch instance from your local environment frequently, this can present challenges.

Some things to consider:

* The brokered Elasticsearch instances are not well suited for running your own logging stack (if that's what you are trying to do), and are designed to be used for data storage in conjunction with an application running on cloud.gov.
* If you need to capture or analyze log data from your application, some better options include using the [cloud.gov logging dashboard](https://cloud.gov/docs/deployment/logs/#web-based-logs-with-historic-log-data), or setting up a [log drain to offload platform logs](https://cloud.gov/docs/deployment/logs/#how-to-automatically-copy-your-logs-elsewhere) to an external logging tool or platform.

If you do need to directly interact with your cloud.gov Elasticsearch instance you can configure and deploy a basic proxy application similar to the [example that can found here](https://github.com/cloud-gov/aws-elasticsearch-auth-proxy) - please note the documented security considerations.


