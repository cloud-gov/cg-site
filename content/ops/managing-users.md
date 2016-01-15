---
menu:
  main:
    parent: users
title: Managing Users
---

## Creating users

The preferred way to invite new users is to [invite them](https://login.cloud.gov/invitations/new). If you need to create a user manually, follow the instructions for [the `provision-user-space` CLI plugin](https://github.com/18F/cf-provision-user-space-plugin).

## Changing passwords

First, try to **have the user [reset their password themselves]({{< relref "getting-started/accounts.md#resetting-your-password" >}})**. If they are unable to do so, you can [change their password for them](http://docs.cloudfoundry.org/adminguide/uaa-user-management.html#changing-passwords), using

```bash
uaac target uaa.cloud.gov
```

## Additional access

### Organizations and spaces

You can grant the user access to additional organizations and spaces by giving them additional [roles](http://docs.cloudfoundry.org/concepts/roles.html#roles). See [the instructions](https://docs.cloudfoundry.org/adminguide/cli-user-management.html#orgs-spaces) for changing them.

### Admins

To make a new Cloud Foundry admin, follow [these instructions](http://docs.cloudfoundry.org/adminguide/uaa-user-management.html#creating-admin-users), using

```bash
uaac target uaa.cloud.gov
```

See our [admin password policy](https://docs.google.com/a/gsa.gov/document/d/10Do0hghoO-x3imKo9SKZZop_EoXckel0Qg241CHhiUY/edit?usp=sharing).
