---
layout: post
date: "2023-04-19"
title: "Off-peak windows now defined for all brokered Elasticsearch/Opensearch domains"
excerpt: We have configured off-peak windows for software updates on all brokered Elasticsearch/Opensearch domains to minimize service disruption
---

# Off-peak windows now enabled for all Elasticsearch/Opensearch domains

## Background

[Periodically, AWS pushes out required software updates for Elasticsearch/Opensearch](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/service-software.html). While these updates are applied using a blue/green deployment to minimize disruption, it is still possible for customers to experience partial downtime or outages for their domains during the upgrade.

To give customers more control over when updates are applied to their domains, [in February 2023 AWS released a new feature for Elasticsearch/Opensearch domains called off-peak windows](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/off-peak.html). Off-peak windows are a daily 10-hour block of time defined by customers to control when software updates can be scheduled.

While AWS automatically enables and defines off-peak windows for domains **created after February 16 2023**, any domains created before this date do not have off-peak windows defined.

## What we did

To use off-peak windows for all of our brokered Elasticsearch/Opensearch domains, the cloud.gov team took a few steps for each domain:

1. [Enable and define off-peak window if it wasn't already enabled](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/off-peak.html#off-peak-enable)
2. [Configure the domain to use off-peak windows for auto-tune updates](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/off-peak.html#off-peak-migrate)

For domains which didn't have an off-peak window already defined, the default off-peak window (00:00 UTC - 10:00 UTC) was applied.

Furthermore, for many of the domains which had newly created off-peak windows, there were already pending updates scheduled for outside the off-peak window. So the cloud.gov team also **rescheduled all pending updates to occur within the off-peak window**.

If you are curious about how we made these changes, you can [view the PR containing the scripts that we used](https://github.com/cloud-gov/cg-scripts/pull/254/files).

## Conclusion

As part of fulfilling our mission to deliver secure, scalable cloud services to our customers, we hope that these changes will minimize Elasticsearch/Opensearch service disruptions from software updates.

If you have any questions about these changes, don't hesitate to contact us at [support@cloud.gov](mailto:support@cloud.gov).
