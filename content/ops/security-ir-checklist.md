---
menu:
  main:
    parent: operations
title: Security IR Checklist
---

# Security Incident Response Checklist

*This is a short, actionable checklist for the IC to follow during incident response. It's a companion to the detailed [IR guide]({{< relref "security-ir.md" >}}), where you can find the full messy details of each step.*

## Initiate

You've just responded to a possible security incident. Congratulations, you're now the Incident Commander (IC)! Follow these steps:

- Create an issue in the [security-incidents](https://github.com/18f/security-incidents) github repo ([use this template]({{< relref "security-ir.md#initiate" >}}))
- Move incident discussion to `#incident-response`
- If needed, create a Google Doc to track sensitive information that can't be shared in Slack/Github
- If needed, start a Google Hangout for responders
- Notify `gsa-ir@gsa.gov` and `devops@gsa.gov` of the investigation. **This needs to happen within one hour.**

## Assess

- Confirm the incident - Is it a real incident?
    - If it's not a real incident, go to [false alarm](#false-alarm)
- Assess the severity, using [the rubric in the IR guide]({{< relref "security-ir.md#incident-severities" >}})
- Update the github issue:
    - Status -> "confirmed"
    - Severity -> high/medium/low
    - List of responders
- Send an initial sitrep ([example]({{< relref "security-ir.md#assess" >}})) to: 
    - Post in `#incident-response`
    - Email to `gsa-ir@gsa.gov` and `devops@gsa.gov`
    - Email/Slack other stakeholders, if applicable

## Remediate

- Keep the ticket/docs updated as people work, tracking:
    - Leads, and who's following them
    - Remediation items, and who's working on them
- Send out sitreps on a regular cadence (high: hourly; medium: 2x daily; low: daily)
- Go into work shifts if the incident lasts longer then 3 hours
- [hand off IC](#handing-off-ic) if the incident lasts longer than 3 hours

Once the incident is resolved:

- Update the ticket, set status -> "resolved"
- Send a final sitrep to stakeholders
- Schedule a retrospective
- Thank everyone involved for their service!

## Special situations

Some extra checklists for special situations that don't always occur during incidents:

### False Alarm

Follow this checklist if an event turns out not to be a security incident:

- Update the Github issue, setting status to `false alarm`
- Close the Github issue
- Notify `gsa-ir@gsa.gov` of the false alarm
- If any sitreps have been sent out, send a final sitrep to all previous recipients, noting the false alarm.

### Handing off IC

Follow this checklist of you need to hand over IC duties

- Old IC: brief New IC on the situation
- New IC: confirm that you're taking over
- New IC: update github issue, noting that you're now the IC
- New IC: send out a sitrep, noting that you're taking over IC
- Old IC: stick around for 15-20 minutes to ensure a smooth handoff, then logoff!
