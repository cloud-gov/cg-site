---
menu:
  overview:
    parent: technology
title: Overview for assessors
weight: 50
aliases:
  - /docs/intro/security/for-assessors
  - /intro/security/for-assessors
  - /overview/security/for-assessors/
---

## How cloud.gov works

[@todo: Add a quick start to understanding how different components relate to each other, and the security implication of each component. ("Containers in containers in a virtualized resource [has been] unclear.")]

[ illustration or graphic — captioned, of course — TK ]


## Terminology / Overview of terms

[@todo: Validate the assumption that it's important for them to retain the relevant jargon (orgs, spaces, roles). If the understanding is important but the jargon isn't, let's explain this using the simplest possible terms.]

['org assessor' has been a point of considerable confusion.]

- orgs:
- spaces:
- roles:


## Division of responsibilities

### Security updates

When a new security update is available, cloud.gov updates the relevant buildpacks (ex: PHP for [X], [Y]). These changes don't take effect on individual apps until the apps are restaged, though. You know your apps better than we do, and we prefer to minimize surprises, so your dev team is responsible for restaging your app(s).

### Encryption

Every database service configured through cloud.gov is encrypted at rest. For an RDS example, see [Amazon's overview](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html). For details, see SC-28 in the cloud.gov SSP in our [P-ATO documentation package](https://cloud.gov/overview/security/fedramp-tracker/#how-you-can-use-this-p-ato).

### Auditing login attempts

Through multi-factor authentication and other means, the cloud.gov team verifies that people logging into cloud.gov legitimately own their accounts. But users don't log in to orgs and spaces, they log into cloud.gov itself. Accordingly, instead of monitoring cloud.gov logins/logouts, you'll want to audit what individual accounts did in the individual spaces to which they had access. For more information, see https://docs.cloudfoundry.org/loggregator/cc-uaa-logging.html.