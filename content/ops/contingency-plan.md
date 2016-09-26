---
menu:
  main:
    parent: operations
title: Contingency Plan
---

## Contingency plan

### Formal plan

We have [a formal contingency plan in our GSA Google Drive](https://drive.google.com/drive/u/0/folders/0B1cewEqKcWCbeUI1TmdzQkRVVVU) (using the [FedRAMP template](https://www.fedramp.gov/resources/templates-2016/)).

### This supplemental plan

This document supports that formal plan by providing additional practical guidance for our team in the case of disruption, compromise, or failure of any component of cloud.gov. Our goal is to maximize speed and success while minimizing stress and confusion.

This plan coordinates with our [Security Incident Response Guide](https://docs.cloud.gov/ops/security-ir).

## Example situations for contingency planning

This plan is for situations where we're having trouble delivering our essential mission and business functions because of a service provider disruption, compromise, or failure. As a general guideline, we consider "disruption" to mean more than 30 minutes of unexpected downtime or significantly reduced service. Scenarios where that could happen include:

* Unexpected downtime of services we use, causing disruption in our services:
  * A component critical to delivering our services (such as AWS GovCloud) is unavailable or expected to be unavailable for more than 30 minutes.
  * A component we use to store code/documentation or communicate among the team (such as GitHub or Slack) is unavailable or expected to be unavailable for more than 30 minutes while we’re dealing with a time-sensitive issue/incident or more than 6 hours while doing ordinary work.
* Data loss that causes disruption:
  * By mistake we delete or corrupt data that is essential to our service, causing us to need to restore an essential system or configuration from backup, and this causes disruption in our service delivery.
* High-severity security incidents:
  * A high-severity security incident related to system confidentiality/integrity (such as a root-level compromise) requires us to rebuild components of cloud.gov based on trusted sources.
  * A high-severity security incident related to system availability (such as a malicious DDOS) requires mitigation.
* Two or more of these things happen at the same time.

## Recovery objective

Short-term disruptions lasting less than 30 minutes are outside the scope of this plan.

More than 3 hours of cloud.gov being offline would be unacceptable. Our objective is to recover from any significant problem (disruption, compromise, or failure) within that span of time, and this plan is designed to support that objective.

## Essential functions and their requirements

These are essential functions of our cloud.gov information systems, listed in the order they would need to be restored in case of critical problems with more than one function:

1. **The cloud.gov team is able to communicate with each other.** Key components and plans to restore this function if disrupted:
    * We primarily use 18F Slack to communicate among our geographically distributed team. If Slack is unavailable or expected to be unavailable for more than 30 minutes while we're working on a time-sensitive problem (or 6 hours while doing ordinary work), team leads will reach out to team members via GSA email to coordinate use of GSA Google Apps (Gmail, Hangouts, and Drive) as a temporary replacement.
    * If neither Slack nor GSA Google Apps are available, team leads will coordinate using the GSA phone numbers of team members.
1. **The cloud.gov team is able to diagnose and mitigate issues.** Key components and plans to restore this function if disrupted:
    * We need access to the critical platforms and services that cloud.gov relies on: AWS. If we lose access, team members who have access to the credentials and contacts for these systems should work to restore access.
    * We need to be able to log into our cloud.gov systems, get information from them, and modify them. If we lose access, team members who have access to the credentials for these systems should work to restore access.
    * We need access to our logging and notification systems. If we lose access, team members who have access to the credentials for these systems should work to restore access.
    * We need access to our code and documentation, which means access to the information in our 18F GitHub organization. If we lose access to GitHub, each cloud.gov team member has local copies of some cloud.gov git repositories created as part of their ordinary day-to-day work, which can serve as a temporary resource. The 18F Director of Infrastructure makes systematic backups of 18F GitHub repositories at a daily frequency.
1. **Our systems are secure (we maintain confidentiality and integrity).** Plan to restore this function if disrupted:
    * If this is threatened, we follow our [Security Incident Response Guide](https://docs.cloud.gov/ops/security-ir).
1. **The team can communicate with customers about the status of cloud.gov.** Key components and plans to restore this function if disrupted:
    * If we have more than a small amount of service disruption, team leads will post to our [externally-hosted status page](https://cloudgov.statuspage.io), post to the 18F Slack #cloud-gov-support channel, and email key contacts at customer teams. If the status page and/or Slack are unavailable, we’ll use GSA email as a backup method to communicate with our key customers. If that’s not possible, we can fall back to phone numbers.
    * If the disruption is significantly affecting the delivery of our services to customers, team leads will coordinate with the the 18F Outreach team (@commsquad in Slack) on how we should communicate this externally, including potentially using @18F Twitter and later following up with an 18F blog post.
1. **Our core services and customer services are online and functional (we maintain availability).** The team should be able to fix this (and the following items on this list) if all of the above are functioning.
    *  cloud.gov supports customers doing self-service modifications and updates to their systems, such as the web user interface and command line login.
    *  All of our systems are online and functional (full cloud.gov website, etc.).

## Team roles and contact information

Contact information is available in GSA Google Drive:

* [cloud.gov team roster sheet](https://docs.google.com/spreadsheets/d/1mW3tphZ98ExmMxLHPogSpTq8DzYr5Oh8_SHnOTvjRWM/edit) with names and roles for cloud.gov team members.
* [18F contact info sheet](https://docs.google.com/spreadsheets/d/1QqqS_-V44MHyVqRIyHj6Eojg1Oz5EC3fS3j1e3mDrkg/edit#gid=3) with phone numbers, email addresses, and additional contact information for 18F team members (including cloud.gov members).

## Responsibilities

* **Incident Commander**: Similar to our [Security Incident Response Guide](https://docs.cloud.gov/ops/security-ir), a cloud.gov team member (usually the first to notice the problem) serves as a communications coordinator, so that the rest of the team can focus on technical work.
* **cloud.gov operations team**: The ops team will work to recover the system.

In the case of an an incident, the Incident Commander notifies the following and coordinates with them:

* cloud.gov team, including the Product Manager
* Director of Infrastructure and 18F Outreach team (@commsquad)
* cloud.gov users ([through StatusPage](https://docs.cloud.gov/ops/making-announcements/))
* Designated FedRAMP personnel (when applicable)

## Risk management practices that support restoring key functions

If something goes wrong, we have these continuously maintained resources to support our work:

* GitHub backup in [Backhub](https://backhub.co/) (we have access to all of our data in GitHub even if GitHub is offline/unavailable/compromised).
* We maintain a [team roster](https://docs.google.com/spreadsheets/d/1mW3tphZ98ExmMxLHPogSpTq8DzYr5Oh8_SHnOTvjRWM/edit).
* Each team member core to cloud.gov operations should maintain a list of the phone numbers of the other core team members, stored offline in a protected way (such as in the contacts app in their GSA phone or in a file on their GSA laptop).
* The basic steps for rebuilding cloud.gov are written in our [cg-provision repository](https://github.com/18f/cg-provision).
* We take snapshots of all RDS instances and store them for at least 30 days.
* For AWS availability we use hot multi [Availability Zone](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html) replication. By doing that we inherit AWS controls for alternate processing.

## External Dependencies

cloud.gov depends on serveral external services.  In the event one or more of these services has a long-term disruption the team will mitigate impact by following this plan.

### GitHub
cloud.gov will continue to operate in it's current state without access to GitHub, only updates to the platform are impacted. 

#### Disruption lasting less than 7 days
Cloud Operations will postpone any non-critical updates to the platform until the disruption is resolved.  If a critical update must be deployed, Cloud Operations will:

* Locate a copy of current version of the required repository by comparing last commit times of all checked out versions on Cloud Operations local systems and any copies held by cloud.gov systems (Concourse, BOSH director, etc)
* Pair with another member of Cloud Operations to:
  * Perform the change on the local copy of the repository
  * Manually deploy the change by provisioning a Concourse jumpbox container, copying in the repository,  and executing any required steps by hand.

When the distruption is resolved, Cloud Operations with push any changes made to the appropriate repositories in GitHub to restore them to the current known good state.  Cloud Operations will monitor Concourse to ensure it redploys any changes pushed to GitHub and then verify the system is in the expected state after all automated deployments complete.

#### Disruption lasting more than 7 days
* Cloud Operations will and configure [GitLab Community Edition](https://about.gitlab.com/) to newly provisioned instances
* Migrate GitHub repositories from backups to GitLab
* Update all Concourse jobs to retreieve resources from the newly provisioned Gitlab instance.

After these steps are complete, updates will be deployed per policy using GitLab in place of GitHub.

### Pager Duty
Cloud Operations will configure all alerts to be delivered via email to [cloud-gov-support@gsa.gov](mailto:cloud-gov-support@gsa.gov) if there is a disruption in Pager Duty service.

### New Relic
There is no direct impact to the platform if a disruption occurs.  When debugging any issues where New Relic would provide insight, the team will use manual investigation to access the same information directly from the affected system(s).

### GSA SecureAuth
Cloud Operations will update the `opslogin` UAA instance to allow temporary access via password authentication for any accounts that require access during a disruption in service.

When the disruption in service is resolved, Cloud Operations will disable password authentication for all accounts.

### AWS
In case of a significant disruption, after receiving approval from our AO, Cloud Operations can deploy a new instance of the entire system to a different region using the instructions stored in the [cg-provision repository](https://github.com/18f/cg-provision).

If all AWS regions are disrupted, Cloud Operations would deploy the system to another BOSH supported IaaS provider (such as Microsoft Azure).


## Updating this contingency plan

At least once a year the cloud.gov team will review this contingency plan and update it as needed.

## How this document works

This plan is going to be most effective if all core cloud.gov team members know about it, remember that it exists, have the ongoing opportunity to give input based on their expertise, and keep it up to date. Here’s how we’ll make that happen.

* Initial review and approval:
  * cloud.gov team leads propose this draft to the team, inviting all team members to review and comment on it. The team leads approve an initial version to be published on docs.cloud.gov as our working document. Team leads coordinate with 18F Director of Infrastructure to make sure our plan complies with all necessary requirements.
* Distribution:
  * We publish this plan on [https://docs.cloud.gov/](https://docs.cloud.gov) (which is sourced from [https://github.com/18F/cg-docs](https://github.com/18F/cg-docs)) in our Operations section, alongside our Security Incident Response Guide and other key team policies. Our [Onboarding Checklist](https://github.com/18F/cg-product/blob/master/OnboardingChecklist.md) includes an item for all new team members to read this plan as well as other key team policies when they join.
* How we review and update this plan and communicate those updates (to address changes to our team or systems, along with any problems we find while testing or using this plan):
  * The cloud.gov team is responsible for maintaining this document and updating it as needed. Any change to it must be approved and peer reviewed by at least another member of the team.
  * All changes to the plan should be communicated to the rest of the team.
* How we protect this plan from unauthorized modification:
  * This plan is stored in a public GitHub repository ([https://github.com/18F/cg-docs](https://github.com/18F/cg-docs)) with authorization to modify it limited to 18F staff by GitHub access controls. cloud.gov team policy is that 18F staff may not directly make changes to this document; they must propose a change by making a pull request and ask another team member to review and merge the pull request.
