---
menu:
  docs:
    parent: orgs-spaces
title: Create a new org as an existing customer
---

## Request a new organization as an existing customer

Existing cloud.gov customers can request an org creation by sending a [new org request email](mailto:cloud-gov-inquiries@gsa.gov,cloud-gov-support@gsa.gov?subject=New%20Org%20Request&body=System%20name%20(e.g.%20org-system)%3A%20%0ASystem%20type%3A%20Prototyping%2C%20FISMA%20Low%2C%20FISMA%20Moderate%0AQuota%3A%20%23GB%0AOrg%20manager%20email%20(project%20manager%20or%20technical%20POC)%3A%20%0ASystem%20owner%20email%20(security%2Fcompliance%20POC)%3A). This email link will pre-populate the required information.

## Required information

To create a new organization through this process, you must be an existing customer and have a current agreement in place. If you'd like to learn more about <>

### Org name

The new organization will be named for both the customer (e.g. "GSA") and the system, such as "CTO" or "18f-federalist". For a prototyping organization, the system name should be "prototyping".

The org and system then are combined with a dash, e.g. "gsa-18f-federalist".

Note: Names cannot contain spaces and should instead use dashes (-).

### System type

The system type is one of the [available packages](/pricing/):

- Prototyping space
- FISMA Low system
- FISMA High system

The package and system type reflects the org's intended use and determines price, features, allowable usage, available services, and level of support. For details, see [quota and pricing rates]({{<relref "docs/pricing/quotas.md">}}).

### Quota GB

The quota determines how many GB of memory should initially be available. The quota caps the amount an organization will be charged per month, but an organization is only ever charged for actual usage.

Note: Whole numbers only

### Org Manager email

The Org Manager manages access control for teammates and creates any needed spaces via the [dashboard]({{<relref "dashboard.md">}}).

This should be a person who is responsible for the system and the people who work on it, eg a project manager or technical team lead. An Org Manager should be a person who directly knows who should have access and is willing to maintain those permissions.

### System Owner email

The System Owner is the point-of-contact for any communications about security or compliance issues.
