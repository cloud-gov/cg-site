---
menu:
  docs:
    parent: tenants
title: Managing quotas
---

Quota modification is most commonly necessary for increasing their resource allocation or enabling paid services. To modify the quota:

1. List the details about the organization.

    ```sh
    cf org <org>
    ```

1. Find the quota name from the `quota:` property.
1. View the current quota.

    ```bash
    cf quota <quota>
    ```

1. [Update the quota](https://docs.cloudfoundry.org/adminguide/quota-plans.html#update-quota).

    ```sh
    cf update-quota <quota> [options]
    ```
