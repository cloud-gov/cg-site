---
parent: tenants
layout: ops
layout: docs
sidenav: true
title: Managing quotas
---

Tenants may contact support to request quota modification, such as to increase their resource allocation.

Memory changes (or changes to whether an org can access paid services) need an authorized requester from the tenant side and cloud.gov BU review, since that has cost impact. Changing number of routes and services does not have cost impact; it's fine to change those without review.

We don't change quotas for sandboxes (they all get the default quota). If a sandbox user requests increased memory on a sandbox, coordinate with cloud.gov business unit, since that may mean the person should purchase a paid package (or use an existing paid package).

To modify the quota:

1. For memory quota changes, check whether the requester is an Org Manager (via `cf org-users` or Admin UI) or System Owner (via [customer info](https://docs.google.com/spreadsheets/d/1Bdzl9n2E1MXWV4elXvZ-nYuZmmEj4PEU-u5aZlNGZF4/edit#gid=131031416)) for that org. If they're not, ask them to get an Org Manager or System Owner to request this. Also ask the cloud.gov BU (for example in #cg-business) to calculate whether the request would cause them to go over their usage budget in their agreement.
1. List the details about the organization.

    ```sh
    cf org <org>
    ```

1. Find the quota name from the `quota:` property.
1. [Update the quota](https://docs.cloudfoundry.org/adminguide/quota-plans.html#update-quota).

    ```sh
    cf update-quota <quota> [options]
    ```
