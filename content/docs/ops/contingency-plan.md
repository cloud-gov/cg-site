---
menu:
  docs:
    parent: operations
title: Contingency Plan
---

This Contingency Plan provides guidance for our team in the case of trouble delivering our essential mission and business functions because of disruption, compromise, or failure of any component of cloud.gov. As a general guideline, we consider "disruption" to mean more than 30 minutes of unexpected downtime or significantly reduced service.

Scenarios where that could happen include unexpected downtime of key external services, data loss, or high-severity security incidents.

This plan coordinates with our [Security Incident Response Guide](https://docs.cloud.gov/ops/security-ir).

## Recovery objective

Short-term disruptions lasting less than 30 minutes are outside the scope of this plan.

More than 3 hours of cloud.gov being offline would be unacceptable. Our objective is to recover from any significant problem (disruption, compromise, or failure) within that span of time.

## Team information

### Contact information

Team contact information is available in GSA Google Drive:

* [cloud.gov team roster sheet](https://docs.google.com/spreadsheets/d/1mW3tphZ98ExmMxLHPogSpTq8DzYr5Oh8_SHnOTvjRWM/edit) with names and roles for cloud.gov team members.
* [18F contact info sheet](https://docs.google.com/spreadsheets/d/1QqqS_-V44MHyVqRIyHj6Eojg1Oz5EC3fS3j1e3mDrkg/edit#gid=3) with phone numbers, email addresses, and additional contact information for 18F team members (including cloud.gov members).

## Contingency plan outline

### Activation and notification

Similar to our [Security Incident Response Guide](https://docs.cloud.gov/ops/security-ir), the first cloud.gov team member who notices or reports a potential contingency-plan-level problem becomes the **Incident Commander** (communications coordinator) until recovery efforts are complete or the Incident Commander role is explicitly reassigned.

They first notify and coordinate with the people who are authorized to decide that cloud.gov is in a contingency plan situation:

* From cloud.gov:
    * Program Managers
    * System Owner
    * Authorizing Official
* 18F Products and Platforms Director
* TTS Infrastructure Staff

The Incident Commander notifies and coordinates with the following people as well:

* Cloud Operations
* GSA IT, including ISSO
* Designated FedRAMP personnel (when applicable)
* cloud.gov users ([through StatusPage](https://docs.cloud.gov/ops/making-announcements/)) (when applicable)

The Cloud Operations team assesses the situation and works to recover the system. The Incident Commander keeps a log of the situation in a GSA Google Drive document.

### Recovery

During the recovery phase, the team resolves the problem. See the list of [external dependencies](#external-dependencies) for procedures for recovery from problems with external services.

### Reconstitution

The Cloud Operations team tests and validates the system as operational.

The Incident Commander declares that recovery efforts are complete and notifies all relevant people. The last step is to [schedule a postmortem](https://github.com/18F/cg-postmortems) to discuss the event.

## External dependencies

cloud.gov depends on several external services.  In the event one or more of these services has a long-term disruption, the team will mitigate impact by following this plan.

### GitHub
If GitHub becomes unavailable, the live cloud.gov will continue to operate in its current state. The disruption would only impact the team's ability to update cloud.gov.

#### Disruption lasting less than 7 days
Cloud Operations will postpone any non-critical updates to the platform until the disruption is resolved.  If a critical update **must** be deployed, Cloud Operations will:

* Locate a copy of the current version of the required repository by comparing last commit times of all checked out versions on Cloud Operations local systems and any copies held by cloud.gov systems (Concourse, BOSH director, etc.) Cloud Operations can also coordinate with the 18F Infrastructure team to retrieve 18F's org-wide GitHub backups, which are stored in [Backhub](https://backhub.co/).
* Pair with another member of Cloud Operations to:
  * Perform the change on the local copy of the repository
  * Manually deploy the change by provisioning a Concourse jumpbox container, copying in the repository, and executing any required steps by hand

When the disruption is resolved, Cloud Operations will push any changes to the appropriate repositories in GitHub to restore them to the current known-good state. Cloud Operations will monitor Concourse to ensure it redeploys any changes pushed to GitHub. Then, Cloud Operations will verify the system is in the expected state after all automated deployments complete.

#### Disruption lasting more than 7 days

Cloud Operations will:

* Deploy and configure [GitLab Community Edition](https://about.gitlab.com/) to newly-provisioned instances
* Migrate repositories from local backups to GitLab
* Update all Concourse jobs to retrieve resources from the newly-provisioned Gitlab instance

After these steps are complete, updates will be deployed per usual policy using GitLab in place of GitHub.

### PagerDuty
If there is a disruption in PagerDuty service, Cloud Operations will configure all alerts to be delivered via email to [cloud-gov-support@gsa.gov](mailto:cloud-gov-support@gsa.gov).

### New Relic
There is no direct impact to the platform if a disruption occurs.  When debugging any issues where New Relic would provide insight, the team will use manual investigation to access the same information directly from the affected system(s).

### GSA SecureAuth
Cloud Operations will update the `opslogin` UAA instance to allow temporary access via password authentication for any accounts that require access during a disruption in service.

When the disruption in service is resolved, Cloud Operations will disable password authentication for all accounts.

### AWS
In case of a **significant** disruption, after receiving approval from our Authorizing Official, Cloud Operations will deploy a new instance of the entire system to a different region using the instructions stored in the [cg-provision repository](https://github.com/18f/cg-provision).

If all AWS regions are disrupted, Cloud Operations will deploy the system to another BOSH-supported IaaS provider (such as Microsoft Azure).

## How this document works

This plan is most effective if all core cloud.gov team members know about it, remember that it exists, have the ongoing opportunity to give input based on their expertise, and keep it up to date. Here’s how we make that happen.

* Initial review and approval:
  * cloud.gov team leads propose this draft to the team, inviting all team members to review and comment on it. The team leads approve an initial version to be published on docs.cloud.gov as our working document. Team leads coordinate with 18F Director of Infrastructure to make sure our plan complies with all necessary requirements.
* Distribution:
  * We publish this plan on [https://docs.cloud.gov/](https://docs.cloud.gov) (which is sourced from [https://github.com/18F/cg-docs](https://github.com/18F/cg-docs)) in our Operations section, alongside our Security Incident Response Guide and other key team policies. Our [Onboarding Checklist](https://github.com/18F/cg-product/blob/master/OnboardingChecklist.md) includes an item for all new team members to read this plan as well as other key team policies when they join.
* How we review and update this plan and communicate those updates (to address changes to our team or systems, along with any problems we find while testing or using this plan):
  * The cloud.gov team is responsible for maintaining this document and updating it as needed. Any change to it must be approved and peer reviewed by at least another member of the team.
  * All changes to the plan should be communicated to the rest of the team.
  * At least once a year, and after major changes to our systems, we review and update the plan.
* How we protect this plan from unauthorized modification:
  * This plan is stored in a public GitHub repository ([https://github.com/18F/cg-docs](https://github.com/18F/cg-docs)) with authorization to modify it limited to 18F staff by GitHub access controls. cloud.gov team policy is that 18F staff may not directly make changes to this document; they must propose a change by making a pull request and ask another team member to review and merge the pull request.
