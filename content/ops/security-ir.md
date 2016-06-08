# cloud.gov Incident Response process

This document outlines cloud.gov's process for responding to security incidents. It outlines roles and responsibilities during and after incidents, and lays out the steps we'll take to resolve them.

## Response process

### Initiate

An incident begins when someone (the *reporter*) becomes aware of a potential incident. We define "incident" broadly, following [NIST SP 800-61](http://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf), as "a violation or imminent threat of violation of computer security policies, acceptable use policies, or standard security practices" (6). This is a deliberately broad definition, designed to encompass any scenario that might threaten the security of cloud.gov.

The reporter should contact [FIXME: initial contact?] to become the response process. They should escalate [FIXME: how?] until they receive acknowledgment of their report.

The first responder at this point becomes *Incident Commander* (IC), and carries out the next steps in the response. The IC's responsibility is coordination, not necessarily investigation. The IC's primary role is to guide the process.

The first step for the IC is to create an issue in the [security-incidents](https://github.com/18f/security-incidents) github repo. Copy the following template to create the issue:

```
Short description of what's going on

- **Status**: investigating
- **Severity**: unknown
- **Reporter**: who initially reported the issue
- **IC**: Your Name
- **Responders**: Any other responders

Any extra details about the issue can go here.
```

The IC is responsible for keeping this issue up-to-date as investigation and remediation progresses. Everyone involved in the issue (*responders*) should leave notes as comments on the issue.

#### Comms at the Initiate phase

Note that at this point the issue's status is "investigating" - we haven't confirmed that it's really an issue yet. So, we should actually refer to this as just an "event" at this point; it doesn't become an "incident" until we've confirmed it. 

At this phase, communications should follow these guidelines: 

- Updates should be posted to the Github issue.
- Real-time chat should happen in `#incident-response`
- The IC may start a Google Hangout so that responders can share sensitive information not suitable for sharing in Github or Slack.
- No mandatory reporting yet, though the IC may give relevant stakeholders an early notice if they deem in necessary.

### Assess

The next step is to assess the issue. We need to answer two questions:

- Is this an incident (i.e., did the thing we suspect happen actually happen?)
- If so, how severe is it? (This will determine how our response proceeds.)

To answer these questions, the IC should form a response team. [FIXME: how to contact people here?]. The response team should work to confirm the issue and assess its impact. 

If the issue turns out to be a false alarm, the IC should update the ticket, setting the status to "false alarm", and closing the issue. 

If the issue is valid, the team should assess its impact and determine an initial severity following the incident severity guide below. (Note that the severity can change over the lifespan of the incident, so it's OK to determine the initial severity fairly quickly.)

Once this is done, the IC should update the ticket, noting:

- Status: "confirmed"
- Severity: High/Med/Low
- Any new/changed responders

#### Comms at the Assess phase

Updates and real-time chat should continue as above (updates on the issue, chat in Slack or Google Hangouts). 

Additionally, once the incident is confirmed, the IC has some reporting obligations at this point:

- The IC should post an initial situation report ("sitrep") to `#incident-response`, noting what's going on, who's IC, and linking back to the ticket for info. The IC should continue to post updated sitreps on a regular cadence (the section on severities, below, suggests should cadences for each level).
- FIXME: email sitrep? To whom?
- FIXME: notify GSA-IT?
- FIXME: notify US-CERT?

### Remediate

At this point, we're trying to fix the issue! Remediation will be very situation-specific, so specific steps are hard to suggest. However, a few guidelines to follow during this process:

- The IC's responsibility is coordination, communication, and information-collection. The remediation team will be focused on resolving the issue, so it's up to the IC to make sure that we properly track what happened, how we're fixing it, who's doing what, etc. Ideally, the notes kept by the IC should be sufficient for an outside investigator to independently follow the work of the response team and validate the team's work.

- The team will develop a list of "leads" -- actionable information about breaches, stolen data, etc. The IC should track these leads, maintain information about which are being investigated (and by whom), and what information that investigation leads. These can be tracked as checklists in the Github issue.

- Similarly, the team will develop a list of remediation steps. The IC is likewise responsible for tracking those, making sure they're assigned and followed-up, and verifying them as they're completed. These may be tracked in the central Github issue as well.

- The response team should aim to adopt a *containment* strategy: if machines are compromised, they should avoid destroying or shutting them down if possible (this can hamper forensics). For AWS instances, you can leave the instance running and instead reconfigure the Security Group for the instance to drop all ingress and egress traffic until forensics can be performed.

- Remediation may require service disruption. If it does, the team should proceed in a different way depending on the severity:

    - For High-severity incidents, the team should take action immediately, even if this causes disruption. A notification about the disruption should be sent out as soon as possible, but the team needs no permission to take action at this level.

    - For Medium-severity incidents, the team should notify [FIXME: who? inf lead? cgov lead?] of the planned action, and help [this person] assess the relative risk of disruption vs security. The team should reach a collaborative decision on action, with a bias towards disruption. If [FIXME: person] can't be reached within 1 hour, the team may take action without them.

    - For Low-severity issues, the team should notify [FIXME] as above, and not take action until a mutually-agreed-on course of action has been determined.

- Remediation can sometimes take a long time. If the issue progresses for more than 3 hours without being resolved, the IC should plan for a long remediation. This means:

    - Determine if remediation efforts should be "business hours" or "24/7". This will depend on the severity of the issue, and whether breaches are ongoing.

    - For 24/7 responses, the IC should begin shift-planning. Generally, responders should only work 3 hour shifts, so the IC should begin scheduling shifts and sending people "home" to preserve their ability to function.

    - The IC also needs to get into rotation -- again, 3 hour shifts are about the maximum suggested. So, the IC should likely hand off duties at this point.

Once the incident is no longer active -- i.e. the breach has been contained, the issue has been fixed, etc. -- the IC should spin down the incident. There may still be longer-term remediation needed, and possibly more investigation, but as long as the incident is no longer active these activities can proceed at the regular pace of business. To close out an incident, the IC should:

- Set the status of the incident to "resolved"
- Send a final sitrep to stakeholders
- Thank everyone involved for their service!

#### Comms at the Remediate phase

- Updates and real-time chat should continue as above (updates on the issue, chat in Slack or Google Hangouts). 

- The IC should continue to post updated sitreps on a regular cadence (the section on severities, below, suggests should cadences for each level). These sitreps should be sent to Slack, to GSA-IT and US-CERT via email, and to any other stakeholders identified throughout the process (e.g. clients).

### Retrospective

The final step in handling a security incident is figuring out what we learned. The IC (or one of the ICs, if there were multiple, or a designated other party) should lead a retrospective and develop an incident report. 

The report should contain a timelines of the incident, details about how the incident progressed, and information about the vulnerabilities that led to the incident. A cause analysis is an important part of this report; the team should use tools like [Five Whys](#) or [Infinite Hows](#) to try to dig into causes, how future incidents could be prevented, how responses could be better in the future, etc.

The report should also contain some basic response metrics:

- Discovery method (how did we become aware of the issue?)
- Time to discovery (how long did it take from when the incident started until we became aware of it?)
- Time to containment (how long did it take from when we became aware until the issue was contained?)
- Threat actions (which specific actions -- e.g. phishing, password attacks, etc) -- were taken by the actor)?

This report should be posted as a final comment on the Github issue, which can then be closed.

[FIXME: VERIS?]

## Incident Severities

Severity ratings drive the actions of the response team. Below are the severities ratings we use, some examples of incidents that might fall into that bucket, and some guidelines for ICs and response teams about how to treat each class of incident.

Note the severities may (and often will) change during the lifecycle of the incident. That's normal.

### 1 - High Severity

High-sev incidents successfully compromise the confidentiality/integrity of Personally Identifiable Information (PII), impacts the availability of services for a large number of customers, or has significant financial impact. Examples include:

- Confirmed breach of PII
- Successful root-level compromise of production systems
- Financial malware (ie. CryptoLocker) targeting 18F staff
- Denial of Service attacks resulting on severe outages

Guidelines for addressing High-sev issues:

- Work will likely be 24/7 (e.g. work until the issue is contained)
- Responders are empowered to take any step needed to contain the issue, up to and including complete service degradation.
- Sitreps should be sent every hour, or more.

### 2 - Medium Severity

Medium-sev incidents represent attempts (possibly un- or not-yet-successful) at breaching PII, or those with limited availability/financial impact. Examples include:

- Suspected PII breach
- Targeted (but as-of-yet) attempts to compromise production systems
- Spam/phishing attacks targeting 18F staff
- DoS attacks resulting in limited service degradation

Guidelines for addressing Medium-sev issues:

- Response should be business-hours
- Responders should attempt to consult stakeholders before causing downtime, but may proceed without them if they can't be contacted in a reasonable time-frame.
- Sitreps should be sent approximately twice a day

### 3 - Low Severity

Low-sev incidents don't affect PII, and have no availability or financial impact. Examples include:

- Attempted compromise of non-important systems (staging/testing instances, etc)
- Incidents involving specific employees
- DoS attacks with no noticeable customer impact

Guidelines for addressing Low-sev issues:

- Response should be business-hours
- Responders should avoid service degradation unless stakeholders agree
- Sitreps should be sent approximately daily.

