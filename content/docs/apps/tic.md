---
menu:
  docs:
    parent: advanced
title: Restricting access
---

To comply with the [TIC Initiative](https://www.dhs.gov/trusted-internet-connections), you can configure cloud.gov to restrict access to cloud.gov system services to a set of IP address ranges. This restriction prevents users from your email domain (e.g., `gsa.gov`) from accessing cloud.gov services unless their requests originate from one of your whitelisted IP address ranges.

To configure IP address restriction, create a [support ticket](mailto:cloud-gov-support@gsa.gov?body=Email%20domain%3A%0A%0AEgress%20IP%20ranges%3A%0A%0AAgency%20CIO%3A%0A). Because address restriction applies to all cloud.gov users within your email domain, we will confirm your request with your agency CIO before changing configuration.

Note: address restriction only applies to cloud.gov services, like the Cloud Foundry command line and the [cloud.gov dashboard](https://dashboard.fr.cloud.gov). This feature does not restrict aacces to applications that you run on cloud.gov.

Note: because we configure address restriction per email domain, you must ensure that all users on your team register using email addresses within your email domain. For example, if your email domain is `gsa.gov` but you grant access to a contractor whose email address is `contractor@contractor.com`, the contractor will not be restricted to your configured IP address ranges. To restrict access of this hypothetical contractor, ensure that their cloud.gov account uses an email address that belongs to your email domain, like `contractor@gsa.gov`.
