---
menu:
  main:
    parent: ops
title: Changing a password
weight: 10
---

First, try to have the user [reset their password themselves]({{< relref "getting-started/accounts.md#resetting-your-password" >}}). If they are unable to do so, you can change their password for them – see [this page](http://docs.cloudfoundry.org/adminguide/uaa-user-management.html) from the admin guide. In short:

1. Install `uaac` CLI: `gem install cf-uaac`
1. Target UAA: `uaac target uaa.cloud.gov`
1. Get token: `uaac token client get admin -s MyAdminPassword`
      - If `uaac contexts` doesn't have scim.write:
      - `uaac client update admin --authorities "OTHER-EXISTING-PERMISSIONS uaa.admin clients.secret scim.read scim.write password.write"`
      - `uaac token delete`
      - `uaac token client get admin`
1. Change the user's password: `uaac password set Charlie -p YourPassword
