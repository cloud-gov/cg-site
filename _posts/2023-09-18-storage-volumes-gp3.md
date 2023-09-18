---
layout: post
title: Brokered storage volumes upgraded to gp3
date: September 18, 2023
excerpt: "Storage volumes across all brokered plans have been upgraded to gp3"
---

### Storage volumes upgraded to gp3

Cloud.gov is happy to announce that we have upgraded all our brokered Elasticsearch/Opensearch plans from `gp2` volumes to the high-performance `gp3` volumes by default. We have also upgraded all of our brokered database plans to use `gp3` as the storage volume type by default.

The `gp3` type comes with an increased max throughput per volume/instance versus the previous `gp2` type. A full breakdown comparison of `gp3` vs `gp2` [can be found here](https://aws.amazon.com/ebs/general-purpose/).

### How does this affect me?

These changes will only be applied to **new services (database, Elasticsearch/Opensearch)** that are created. Existing service instances will continue using `gp2` volumes.
