---
menu:
  main:
    parent: operations
title: Making Announcements
---

### Contents
* [Announcing Maintenance](#announcing-maintenance)
* [Announcing Incidents/Outages](#announcing-incidents)

## <a name="announcing-maintenance"></a>Announcing Maintenance
Cloud.gov users want advance notice when potentially disruptive changes are planned. Logging scheduled maintenance on [the cloud.gov status page](https://cloudgov.statuspage.io) accomplishes this and improves the chances that users will correctly identify unexpected problems attributable to the maintenance.

To announce maintenance on the status page:

1. Log into the [status page management console](https://manage.statuspage.io/pages/swcbylb1c30f).
1. Go to [Incidents | Scheduled Maintenance](https://manage.statuspage.io/pages/swcbylb1c30f/incidents#scheduled-maintenance).
1. Add a maintenance window
  * Describe the change briefly.
  * Indicate whether you expect any disruption in service as a result.
  * Direct users to support channels if they have questions or are worried about the timing of the maintenance.
  * Use an appropriate time window.
      * Pay attention to the timezone, which is specified in Eastern Time (EDT)!
      * Be sure to leave a little more time than you expect will be needed. Better to be done earlier than announced than run later than expected!
  * If disruption *is* expected, *check the box that says "Automatically remind subscribers"* so they are proactively warned in advance of the window.
1. Extend the window if you're not done in time. End it early if you're done sooner than announced.

## <a name="announcing-incidents"></a>Announcing Incidents/Outages
As soon as we are aware of a problem, [the cloud.gov status page](https://cloudgov.statuspage.io) should be updated reflect the incident. This automatically informs subscribed users, so they will sit tight rather than piling into our support channel.

To announce an incident on the status page:

1. Log into the [status page management console](https://manage.statuspage.io/pages/swcbylb1c30f).
1. Create an incident.
  * If there are user-visible problems, set the status of appropriate components.
  * Summarise the observable symptoms and the state of the incident; don't try to explain the detailed internal state/cause in detail!
  * Remind users of established support channels in case they have questions or are urgently affected.
1. Investigate and fix the problem.
1. Update the incident to reflect that it's resolved, and that a postmortem is pending. Ensure that the component status is set appropriately.
1. Enter a postmortem for the incident. In the postmortem, include these sections:
  1. **What Happened** - Describe in plain language what happened, referring to user-observable symptoms
  1. **Remediation Performed** - Specific steps taken to resolve the situation, eg "Restarted UAA and observed that authentication returned to normal".
  1. **Regression Prevention** - Indicate any improvements that we've added to the backlog which would prevent similar incidents in future, with a link to [the cloud.gov roadmap](https://18f.storiesonboard.com/m/gov-dev) so that interested users can follow our progress.
     * *Ideally this portion gets filled in after a "[5 Whys](https://en.wikipedia.org/wiki/5_Whys)" or "[Ishikawa](https://en.wikipedia.org/wiki/Ishikawa_diagram)" root-cause meeting has occurred.*
