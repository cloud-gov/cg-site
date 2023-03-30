---
parent: operations
layout: ops
layout: docs
sidenav: true
title: Ongoing customer support
---

Platform operators are scheduled for regular 2-week rotations to provide customer support. This document outlines the customer support process and responsibilities.

## Are you new to platform support?
{:.no_toc}

- Join/unmute [`#cg-support`](https://gsa-tts.slack.com/messages/cg-support/)
- Join [`#cg-supportstream`](https://gsa-tts.slack.com/messages/cg-supportstream/) to get notifications on Slack for Zendesk tickets

## Support rotation checklist
{:.no_toc}

On the first day of a support rotation:

- Update the [`#cg-support`](https://gsa-tts.slack.com/messages/cg-support/) Slack channel topic to include your name as the support contact.

Every day on a support rotation:

- table of contents
{:toc}

## Handle support requests in Zendesk

Most customers submit questions by emailing [support@cloud.gov](mailto:support@cloud.gov), which creates a ticket in our Zendesk instance.

The support process for handling tickets created in Zendesk is:

- All support requests should be answered within Zendesk. Avoid responding via Google Groups or email, since it will distort our metrics.
- `Tier 1` support has primary responsibility to do the work of responding to Zendesk tickets, and
`Platform experts` serve as second-tier support providing technical expertise.
- If `Tier 1` support personnel need assistance in responding to a customer issue, they will escalate the ticket to the `Platform experts` group in Zendesk. The main responsibility of the platform operator on support is to provide technical diagnoses/advice/details where needed. The most efficient way to do that is to write comments on the
associated posts in [`#cg-supportstream`](https://gsa-tts.slack.com/messages/cg-supportstream).
- `Tier 1` support may also ask for pairing time to work out responses
together.
- Before the day is over, the support team will ensure that all New issues are acknowledged and set to [Open or Pending](#support-status).

If you are on support and you can’t complete any of the items personally, **you are responsible for ensuring that an appropriate person does it**. If you haven't already reached out on Slack, reach out during standup to get visibility with the people who might best help.

For specialized tickets, like security and compliance, the support team can assign tasks to other team members, but they will need to follow up and make sure the status of the ticket is accurate.

See also: [Detailed guidance on working with our support tools](https://docs.google.com/document/d/1QXZvcUl-6gtI7jEQObXV9FyiIpJC-Fx1R7RzB0C6PHM/edit#heading=h.80zn694rriw3).

## Additional Support

If the support engineer on duty requires additional engineering assistance to satisfy/address support ticket requests then the support engineer on duty creates a GitHub ticket/issue on the matter which is then prioritized after a discussion as a team.

## Support documentation For ongoing customer requests

For customer tickets and requests that are considering modifying cloud.gov infrastructure and/or require more than 1 business day towards developing a solution/answer to a customer request a GitHub issue/ticket will be started.

## Monitor \#cg-support

Some customers have access to post questions in the `#cg-support` channel. As with Zendesk support requests, `Tier 1` support operators will be primarily responsible for answering these questions and can escalate to the platform operator on support as necessary.

## Update documentation

Platform operators on the support rotation should monitor requests for support in Zendesk (and other channels) to identify commonly asked questions or frequently requested issues. These topics should be added to [new or existing knowledge base articles]({{ site.baseurl }}/knowledge-base) to make answering these requests more efficient going forward.

## Support Status
{:.no_toc}

**New**

We've not responded. The support team will coordinate on a response to the customer before the
end of day (5:00 PM local time). If we do not know the answer, we let the customer
know that we’ll get back to them within 24-48hrs.

**Open**

We’ve assigned the ticket but we’ve not responded, or the customer has
responded, and the ticket is waiting on our input. We will use this status if, for
example, we require additional research. Open status should not last more than a day
and we should let the customer know if we need more time.

**Pending**

We've responded to the ticket and may get a follow up response. If there is no further
activity, the issue auto-closes in 5 days. A ticket can move back to Open for a
day if a response from the customer requires additional research.

**Solved**

We've responded in a manner that does not expect a response from the customer.

## Support handoff

The support engineer coming off duty meets with the oncoming support engineer at the beginning of a new support rotation at which time the off coming support engineer debriefs the oncoming support engineer on the status and contents of the tickets/customer matters that are currently under consideration and being addressed as well as any details, documentation and thoughts put towards any potential solutions. The tickets/customer matters going forward are then the responsibility of the oncoming/on rotation support engineer until their rotation ends and is then responsibility is transferred to the next support engineer coming on duty/rotation.
