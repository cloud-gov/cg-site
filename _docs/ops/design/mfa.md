---
parent: design
layout: ops

layout: docs
sidenav: true
title: Multi-factor authentication
---

Users can authenticate to cloud.gov either via a SAML IDP managed by their agency or, if their agency has not configured an IDP, using the cloud.gov fallback IDP. The current fallback IDP is based on Shibboleth, with users stored in the Cloud Foundry UAA database.

Problem: the current fallback IDP is solely maintained by the cloud.gov team, which means that it's missing useful features and in need of updates.

Solution: use Cloud Foundry UAA with MFA as the fallback IDP, and deprecate Shibboleth.

Blockers: UAA MFA requires that *all* users in an identity zone use MFA, including service accounts used by CI. Because service accounts can't use MFA, enabling UAA MFA today would essentially break service accounts. Based on https://github.com/cloudfoundry/cf-deployment/pull/540, upcoming features in UAA, CAPI, and perm will allow assigning granular permissions to UAA clients, which don't require MFA. Once these features are released, we can refactor https://github.com/cloudfoundry-community/uaa-credentials-broker to broker UAA users instead of UAA clients.

Tasks:
* Wait for upstream to allow granular permissions for UAA clients
* Enable UAA MFA
* Migrate existing fallback accounts to UAA
* Update UAA credentials broker to provision UAA clients instead of users
* Drop custom database triggers from https://github.com/18F/cg-provision/blob/master/ci/scripts/create-and-update-db.sh
* Deprecate shibboleth
* Document changes for users
