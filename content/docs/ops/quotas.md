---
menu:
  docs:
    parent: tenants
title: Managing quotas
---

Quota modification is most commonly necessary for increasing their resource allocation or enabling paid services. To modify the quota:

1. For memory quota changes, check whether the requester is an Org Manager or System Owner for that org. If they're not, ask them to get an Org Manager or System Owner to request this. Also ask the cloud.gov BU to calculate whether the request would cause them to go over their usage budget in their agreement. (You can increase number of routes or service instances without double-checking all that, since they have no billing impact.)
1. List the details about the organization.

    ```sh
    cf org <org>
    ```

1. Find the quota name from the `quota:` property.
1. [Update the quota](https://docs.cloudfoundry.org/adminguide/quota-plans.html#update-quota).

    ```sh
    cf update-quota <quota> [options]
    ```
