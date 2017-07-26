---
menu:
  docs:
    parent: tenants
title: Managing quotas
---

Quota modification is most commonly necessary for increasing their resource allocation or enabling paid services. To modify the quota:

1. For memory quota changes, check whether the requester is an Org Manager (via `cf org-users` or Admin UI) or System Owner (via [customer info](https://docs.google.com/spreadsheets/d/1Bdzl9n2E1MXWV4elXvZ-nYuZmmEj4PEU-u5aZlNGZF4/edit#gid=131031416)) for that org. If they're not, ask them to get an Org Manager or System Owner to request this. Also ask the cloud.gov BU (for example in #cg-business) to calculate whether the request would cause them to go over their usage budget in their agreement. (You can increase number of routes or service instances without double-checking all that, because that has no billing impact.)
1. List the details about the organization.

    ```sh
    cf org <org>
    ```

1. Find the quota name from the `quota:` property.
1. [Update the quota](https://docs.cloudfoundry.org/adminguide/quota-plans.html#update-quota).

    ```sh
    cf update-quota <quota> [options]
    ```
