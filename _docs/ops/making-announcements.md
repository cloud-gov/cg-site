---
parent: operations
layout: ops
layout: docs
sidenav: true
title: Making announcements
---

### Contents
* [Announcing Maintenance](#announcing-maintenance)
* [Announcing Incidents/Outages](#announcing-incidents)

## <a name="announcing-maintenance"></a>Announcing Maintenance
cloud.gov users need advance notice when we plan potentially disruptive changes. We give users notice by logging scheduled maintenance on [the cloud.gov status page](https://cloudgov.statuspage.io), which helps them plan their own work and correctly identify errors and problems caused by the maintenance.

To announce maintenance on the status page:

1. Log into the [status page management console](https://manage.statuspage.io/pages/swcbylb1c30f).
1. Go to [Incidents | Scheduled Maintenance](https://manage.statuspage.io/pages/swcbylb1c30f/incidents#scheduled-maintenance).
1. Add a maintenance window.
  * Describe the change briefly (including how it makes cloud.gov better).
  * Indicate whether you expect any disruption in service as a result.
  * Direct users to support channels if they have questions or are worried about the timing of the maintenance.
  * Use an appropriate time window.
      * Pay attention to the timezone, which is specified in Eastern Time.
      * Be sure to leave a little more time than you expect will be needed. Better to be done earlier than announced than run later than expected.
  * If disruption *is* expected, *check the box that says "Automatically remind subscribers"* so they are proactively warned in advance of the window.
  * Ask another team member for a content review before posting.
1. Extend the window if you're not done in time. End it early if you're done sooner than announced.

## <a name="announcing-incidents"></a>Announcing Incidents/Outages

See the [service disruption guide]({{ site.baseurl }}{% link _docs/ops/service-disruption-guide.md %}).