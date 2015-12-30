---
menu:
  main:
    parent: users
title: Changing a password
weight: 10
---

First, try to **have the user [reset their password themselves]({{< relref "getting-started/accounts.md#resetting-your-password" >}})**. If they are unable to do so, you can change their password for them – see [this page](http://docs.cloudfoundry.org/adminguide/uaa-user-management.html) from the admin guide. In short:

1. [Install the `uaac` CLI](https://github.com/cloudfoundry/cf-uaac#install-it).
1. Target UAA:

    ```bash
    uaac target uaa.cloud.gov
    ```

1. Get token:

    ```bash
    uaac token client get admin -s MyAdminPassword
    ```

1. If `uaac contexts` doesn't have `scim.write`:

    ```bash
    uaac client update admin --authorities "OTHER-EXISTING-PERMISSIONS uaa.admin clients.secret scim.read scim.write password.write"
    uaac token delete
    uaac token client get admin
    ```

1. Change the user's password:

    ```bash
    uaac password set Charlie -p YourPassword
    ```
