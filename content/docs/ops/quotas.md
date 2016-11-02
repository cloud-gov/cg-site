---
menu:
  docs:
    parent: operations
title: Managing quotas
---

Quota modification is most commonly necessary for increasing their resource allocation or enabling paid services. To modify the quota:

1. List the details about the organization.

    ```bash
    cf org <org>
    ```

1. Find the quota name from the `quota:` property.
1. [Update the quota](https://docs.cloudfoundry.org/adminguide/quota-plans.html#update-quota).

    ```bash
    cf update-quota <quota> [options]
    ```
