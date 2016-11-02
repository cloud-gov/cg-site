---
menu:
  docs:
    parent: operations
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
1. Add a maintenance window
  * Describe the change briefly (including how it makes cloud.gov better).
  * Indicate whether you expect any disruption in service as a result.
  * Direct users to support channels if they have questions or are worried about the timing of the maintenance.
  * Use an appropriate time window.
      * Pay attention to the timezone, which is specified in Eastern Time (EDT)!
      * Be sure to leave a little more time than you expect will be needed. Better to be done earlier than announced than run later than expected!
  * If disruption *is* expected, *check the box that says "Automatically remind subscribers"* so they are proactively warned in advance of the window.
1. Extend the window if you're not done in time. End it early if you're done sooner than announced.

## <a name="announcing-incidents"></a>Announcing Incidents/Outages
As soon as we are aware of a problem, we should update [the cloud.gov status page](https://cloudgov.statuspage.io) to reflect the incident. This automatically informs subscribed users, so they will sit tight rather than piling into our support channel.

To announce an incident on the status page:

1. Log into the [status page management console](https://manage.statuspage.io/pages/swcbylb1c30f).
1. Create an incident.
  * If there are user-visible problems, set the status of appropriate components.
  * Summarise the observable symptoms and the state of the incident; don't try to explain the detailed internal state/cause in detail! Use active voice as much as you can (*"we discovered x"* rather than *"x was discovered"*).
  * Remind users of established support channels in case they have questions or are urgently affected.
1. Investigate and fix the problem.
1. Update the incident to reflect that it's resolved, and that we're working on a postmortem. Ensure that the component status is set appropriately.
1. Enter a postmortem for the incident. In the postmortem, include these sections:
  1. **What Happened** - Describe in plain language what happened, referring to user-observable symptoms.
  1. **Remediation Performed** - Describe specific steps we took to resolve the situation, for example "We restarted UAA and observed that authentication returned to normal".
  1. **Regression Prevention** - Indicate any improvements that we've added to the backlog which would prevent similar incidents in the future. You can link to the relevant GitHub issues.
     * *Ideally this portion gets filled in after a "[5 Whys](https://en.wikipedia.org/wiki/5_Whys)" or "[Ishikawa](https://en.wikipedia.org/wiki/Ishikawa_diagram)" root-cause meeting has occurred.*
