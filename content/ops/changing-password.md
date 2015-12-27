---
menu:
  main:
    parent: ops
title: Changing a password
weight: 10
---

This document from the admin guide is useful: http://docs.cloudfoundry.org/adminguide/uaa-user-management.html.

In short:

- Install `uaac` CLI: `gem install cf-uaac`
- Target UAA: `uaac target uaa.cloud.gov`
- Get token: `uaac token client get admin -s MyAdminPassword`
  - If `uaac contexts` doesn't have scim.write:
  - `uaac client update admin --authorities "OTHER-EXISTING-PERMISSIONS uaa.admin clients.secret scim.read scim.write password.write"`
  - `uaac token delete`
  - `uaac token client get admin`
- Change the user's password: `uaac password set Charlie -p YourPassword
