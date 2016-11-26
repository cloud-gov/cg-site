---
menu:
  docs:
    parent: operations
title: Security Incident Response checklist
linktitle: Security IR checklist
---

*This is a short, actionable checklist for the Incident Commander (IC) to follow during incident response. It's a companion to the [IR guide]({{< relref "security-ir.md" >}}), where you can find the full details of each step.*

## Initiate

You're the first cloud.gov team member to notice a non-team-member's report of a possible security incident regarding cloud.gov, or you've noticed an unreported possible security incident yourself. Congratulations, you're now the Incident Commander (IC)! Follow these steps:

First, **follow the the [18F security incident response process](https://handbook.18f.gov/security-incidents/)**. Done? Welcome back!


## Assess

- Confirm the incident — was it a real incident?
    - If it's not a real incident, go to [False Alarm](#false-alarm).
- Assess the severity, using [the rubric in the IR guide]({{< relref "security-ir.md#incident-severities" >}}).
- Update the GitHub issue:
    - Status → "confirmed"
    - Severity → high/medium/low
    - List of responders
- Assess whether to also activate the [contingency plan]({{< relref "contingency-plan.md" >}}).
- Send an initial situation report (“sitrep”) ([example sitrep]({{< relref "security-ir.md#assess" >}})) to:
    - Post in [`#incident-response`](https://gsa-tts.slack.com/messages/incident-response/)
    - Email to `gsa-ir@gsa.gov` and `devops@gsa.gov`
    - Email/Slack other stakeholders, if applicable

## Remediate

- Keep the ticket/docs updated as people work, tracking:
    - Leads, and who's following them
    - Remediation items, and who's working on them
- Send out sitreps on a regular cadence (high: hourly; medium: 2x daily; low: daily).
- Go into work shifts if the incident lasts longer then 3 hours.
- [Hand off IC](#handing-off-ic) if the incident lasts longer than 3 hours.

Once the incident is resolved:

- Update the ticket, set status → "resolved".
- Send a final sitrep to stakeholders.
- Schedule a retrospective.
- Thank everyone involved for their service!

## Special situations

Extra checklists for special situations that don't always occur during incidents:

### False Alarm

Follow this checklist if an event turns out not to be a security incident:

- Update the GitHub issue, setting status to `false alarm`.
- Close the GitHub issue.
- Notify `gsa-ir@gsa.gov` of the false alarm.
- If any sitreps have been sent out, send a final sitrep to all previous recipients, noting the false alarm.

### Handing off IC

Follow this checklist if you need to hand over IC duties:

- Old IC: brief New IC on the situation.
- New IC: confirm that you're taking over.
- New IC: update GitHub issue, noting that you're now the IC.
- New IC: send out a sitrep, noting that you're taking over IC.
- Old IC: stick around for 15-20 minutes to ensure a smooth handoff, then log off!
