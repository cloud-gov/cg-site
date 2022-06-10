---
parent: operations
layout: ops
layout: docs
sidenav: true
title: Ongoing customer support
---

The platform requires regular support and maintenance activities to remain in a
compliant state. If you are on support and you can’t complete any of the items
personally, you are responsible for ensuring that an appropriate person does it.
If you haven't already reached out on Slack, reach out during standup to get
visibility with the people who might best help.

## Are you new to platform support?

- Join/unmute [`#cg-support`](https://gsa-tts.slack.com/messages/cg-support/)
- Ensure you are added to the `Platform experts` group in Zendesk, and that the person you are replacing on support is removed.

## Support Rotations

cloud.gov utilizes a tiered support model, with `Tier 1` handling frequently requested support issues that do not require the assistance of a platform engineer. `Tier 1` support personnel can escalate an issue to the `Platform experts` group when more intensive assistance is required to resolve a support issue.

The cloud.gov team utilizes a staggered pair rotation for the `Platform experts` group. Support assignments for this group last two weeks. One team member exits support duty each week, with a new member starting their two-week rotation. With the other support team member in the middle of their two-week rotation, we ensure continuity of situational awareness, task handoffs, and work in progress.

The support team is not required to "pair" in the traditional sense unless the task as hand necessitates doing so. Having multiple platform engineers rather than a single person on support allows us to better serve our customers by:

- Improving  situational awareness and communication through necessary, regular check-ins
- Increasing debugging capabilities and problem-solving capacity (cloud.gov is a vast system to reason over, and more minds are better than one)
- Providing a higher likelihood of coverage during planned or unplanned absences
- Allowing for multiple tasks to be worked at once

As the `Platform experts` group has free cycles, they can pick up tasks from the backlog designated with the `support-team` label. These tasks aim to improve our ability to support the platform by paying down technical debt, adding automation, improving monitoring and alerting, or adding to system documentation such as run-books. Because support team members inevitably face interruptions that cause context switching, the `support-team` backlog is groomed by the team with this in mind. These stories are not mission-critical, easy to pick up, and easy to hand off to another team member.

All members of the support team should also monitor requests for support in Zendesk (and other channels) to identify commonly asked questions or frequently requested issues. These topics should be added to [new or existing knowledge base articles]({{ site.baseurl }}/knowledge-base) to make answering these requests more efficient going forward.

## Zendesk Support Process

1. All support requests should be answered within Zendesk. Avoid responding via
   Google Groups or email, since it will distort our metrics.
1. All new requests for support are assigned by default to the `Tier 1` support group, and are escalated 
   to the `Platform experts` group as needed.
1. There are two people designated to the `Platform experts` group every week. Each week,
   one person is swapped for another to ensure that there is overlapping
   context awareness.
1. At the start of the week, the entire support team should schedule a 15 min meeting
   to review unresolved issues from the previous week.
1. Every day, the support team should set up a brief meeting to review and
   assign New and Open issues. If they like, they can cowork or just assign
   themselves issues.
1. For specialized tickets, like security and compliance, the support team can
   assign tasks to other team members, but they will need to follow up and make
   sure the status of the ticket is accurate.
1. Before the day is over, the support team will ensure that all New issues are
   acknowledged and set to Open or Pending (more details below).
1. Everyone currently on support should join #cg-supportstream to get notifications on Slack. This
   can be useful to alert and coordinate with other team members.
1. Commonly asked questions or frequently requested items should be considered for 
   adding to the [cloud.gov knowledge base]({{ site.baseurl }}/knowledge-base).

## Support Status

### New

We've not responded. The support team will coordinate on a response to the customer before the
end of day (5:00 PM local time). If we do not know the answer, we let the customer
know that we’ll get back to them within 24-48hrs.

### Open

We’ve assigned the ticket but we’ve not responded, or the customer has
responded, and the ticket is waiting on our input. We will use this status if, for
example, we require additional research. Open status should not last more than a day
and we should let the customer know if we need more time.

### Pending

We've responded to the ticket and may get a follow up response. If there is no further
activity, the issue auto-closes in 5 days. A ticket can move back to Open for a
day if a response from the customer requires additional research.

### Solved

We've responded in a manner that does not expect a response from the customer.