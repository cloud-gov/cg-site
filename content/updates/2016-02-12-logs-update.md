+++
date = "2016-02-12"
title = "Logging service"
+++

New feature: Zero-setup persistent logs.
<!--more-->

Given the universal need for compliant logging, we've recently added a common logging facility to cloud.gov. Now, logs and events for every cloud.gov application are stored and indexed automatically, with zero setup required. 

For more information about this feature, please see [our documentation about logging](https://docs.cloud.gov/apps/logs/#historic-logs:6d6e87c8985e9c9e781f22ee066f5a45).

Now that cloud.gov provides platform-level logging, the ELK service we previously provided will be deprecated. If you are still using it, we recommend you delete the instance whenever is convenient to reduce your resource usage (and hence costs).

If you have feedback about this service, please don't hesitate to [contact us](mailto:cloud-gov-support@gsa.gov).
