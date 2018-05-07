---
menu:
  docs:
    parent: tenants
layout: ops
title: Handling volume service requests
---

Customers occasionally request that a volume of a certain size be created for use via volume services in their space. Here's how to handle those requests.

1. Create a volume with the requested size and a hard-to-guess (ie random long) string for the name
  1. (procedure here)
2. Enable the nfs volume service broker in the requested organization 
  1. (procedure here)
3. [Enable the `volume-service-testing` isolation segment for their requested organization](https://docs.cloudfoundry.org/adminguide/isolation-segments.html#relationships)
  1. `cf enable-org-isolation ORG-NAME volume-service-testing`
4. [Set the isolation segment to `volume-service-testing` for their requested space](https://docs.cloudfoundry.org/adminguide/isolation-segments.html#relationships)
  1. `cf set-space-isolation-segment ORG-NAME volume-service-testing`
5. Reply to the support request with the volume name and refer them back to [the instructions]({{< relref "docs/services/volume-services.md" >}}) for next steps.
