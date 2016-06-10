---
menu:
  main:
    parent: operations
title: Security IR Checklist
---

# Security Incident Response Checklist

*This is a short, actionable checklist for the IC to follow during incident response. It's a companion to the detailed [IR guide]({{< relref "security-ir.md" >}}), where you can find the full messy details of each step.*

## Initiate

You've just responded to a possible security incident. Congratulations, you're now the IC! Follow these steps:

- create an issue in the [security-incidents](https://github.com/18f/security-incidents) github repo ([use this template]({{< relref "security-ir.md#initiate" >}}))
- move incident discssion to `#incident-response`
- if needed, create a Google Doc to track sensitive information that can't be shared in Slack/Github
- if needed, start a Google Hangout for responders
- notify `gsa-ir@gsa.gov` and `devops@gsa.gov` of the investigation. **This needs to happen within one hour.**

## Assess

- confirm the incident - is it a real incident?
    - if it's not a real incident, go to [false alarm](#false-alarm)
- assess the severity, using [the rubric in the IR guide]({{< relref "security-ir.md#incident-severities" >}})
- update the github issue:
    - status -> "confirmed"
    - severity -> high/medium/low
    - list of responders
- send an initial sitrep ([example]({{< relref "security-ir.md#assess" >}})) to: 
    - post in `#incident-response`
    - email to `gsa-ir@gsa.gov` and `devops@gsa.gov`
    - email/Slack other stakeholders, if applicable

## Remediate

- keep the ticket/docs updated as people work, tracking:
    - leads, and who's following them
    - remediation items, and who's working on them
- send out sitreps on a regular cadence (high: hourly; medium: 2x daily; low: daily)
- go into work shifts if the incident lasts longer then 3 hours
- [hand off IC](#handing-off-ic) if the incident lasts longer than 3 hours

Once the incident is resolved:

- update the ticket, set status -> "resolved"
- send a final sitrep to stakeholders
- schedule a retrospective
- thank everyone involved for their service!

## Special situations

Some extra checklists for special situations that don't always occur during incidents:

### False Alarm

Follow this checklist if an event turns out not to be a security incident:

- update the Github issue, setting status to `false alarm`
- close the Github issue
- notify `gsa-ir@gsa.gov` of the false alarm
- if any sitreps have been sent out, send a final sitrep to all previous recipients, noting the false alarm.

### Handing off IC

Follow this checklist of you need to hand over IC duties

- Old IC: brief New IC on the situation
- New IC: confirm that you're taking over
- New IC: update github issue, noting that you're now the IC
- New IC: send out a sitrep, noting that you're taking over IC
- Old IC: stick around for 15-20 minutes to ensure a smooth handoff, then logoff!