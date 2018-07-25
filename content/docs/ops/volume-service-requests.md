---
menu:
  docs:
    parent: tenants
layout: ops
title: Handling volume service requests
---

Customers occasionally request that a volume be created for use via volume services in their space. Here's how to handle those requests.

1. Create a volume with the requested size and a hard-to-guess (i.e. random long) string for the name
    1. Generate volume name with `uuidgen` or similar
    1. Add volume to `nfstestserver.export_volumes` array in nfs server BOSH deployment
1. Enable the nfs volume service broker in the requested organization
    1. Add organization to `service-organizations-production` in volume services Concourse pipeline
1. [Expose the `volume` isolation segment for their requested organization](https://docs.cloudfoundry.org/adminguide/isolation-segments.html#relationships)
    1. Add organization and space to `volume-targets-production` in Cloud Foundry Concourse pipeline
1. Reply to the support request with the volume name and refer them back to [the instructions]({{< relref "docs/services/volume-services.md" >}}) for next steps.
