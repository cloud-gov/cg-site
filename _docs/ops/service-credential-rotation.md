---
parent: tenants
layout: ops
layout: docs
sidenav: true
title: Rotating service credentials
---

## Verifying access

Some services do not support self-service credential rotation. We encourage users to rotate credentials by deleting and recreating services instances, but when this is not an option, we will rotate credentials manually by request. Before manually updating credentials, verify that the user making the request is either a `SpaceDeveloper` on the relevant space or an `OrgManager` on the relevant org.
