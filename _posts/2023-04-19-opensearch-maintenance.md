---
layout: post
date: "2023-04-19"
title: "Off-peak windows now defined for all brokered Elasticsearch/Opensearch domains"
excerpt: We have configured off-peak windows for software updates on all brokered Elasticsearch/Opensearch domains to minimize service disruption.
---

## Background

[Periodically, AWS pushes out required software updates for Elasticsearch/Opensearch](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/service-software.html). While these updates are applied using a blue/green deployment to minimize disruption, it is still possible for customers to experience partial downtime or outages for their domains during the upgrade.

To give customers more control over when updates are applied to their domains, [in February 2023 AWS released a new feature for Elasticsearch/Opensearch domains called off-peak windows](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/off-peak.html). Off-peak windows are a daily 10-hour block of time defined by customers to control when software updates can be scheduled.

While AWS automatically enables and defines off-peak windows for domains **created after February 16 2023**, any domains created before this date do not have off-peak windows defined.

## What we did

[To give all of our customers the benefit of off-peak windows, **the cloud.gov team enabled off-peak windows for any domains where they were not already enabled**](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/off-peak.html#off-peak-enable). A default off-peak window of 00:00 UTC - 10:00 UTC was applied to these domains.

**All Elasticsearch/Opensearch domains managed by cloud.gov now have off-peak windows enabled.**

Furthermore, for many of the domains which had newly created off-peak windows, there were already pending updates scheduled for outside the off-peak window. So the cloud.gov team also **rescheduled all pending updates to occur within the off-peak window**.

## Conclusion

As part of fulfilling our mission to deliver secure, scalable cloud services to our customers, we hope that enabling off-peak windows will minimize Elasticsearch/Opensearch service disruptions from software updates.

If you have any questions about these changes, don't hesitate to contact us at [support@cloud.gov](mailto:support@cloud.gov).
