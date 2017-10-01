---
menu:
  docs:
    parent: tenants
layout: ops
title: Handling IaaS Sidecar requests
---

Customers occasionally request that an IaaS Sidecar be created for use in their space. Here's how to handle those requests.

1. Double-check that the target org and space is owned by a TTS team. (We're unable to procure AWS accounts for teams in other organizations or agencies yet!)
1. Allocate one of the available, pre-provisioned GovCloud accounts for that space.
  1. (procedure here)
1. Create all the requested administrative users. 
  1. (procedure here) 
1. Create a user-provided service containing all of the user credentials necessary to access the account in the requested space.
  1. (procedure here)
1. Kick off the creation of another AWS GovCloud account
  1. (procedure here)
1. Respond to the request to let the user know how to find the credentials, and include a pointer back to the warnings in the documentation for the service.

(This list is a ripe target for implementing in a dedicated IaaS Sidecar broker, which we hope to work on soon.)

