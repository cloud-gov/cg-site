---
menu:
  main:
    parent: users
title: Managing Users
---

## Creating users

The preferred way to invite new users is to [invite them](https://login.cloud.gov/invitations/new). If you need to create a user manually, follow the instructions for [the `provision-user-space` CLI plugin](https://github.com/18F/cf-provision-user-space-plugin).

## Changing passwords

First ask the user **[to try resetting their own password]({{< relref "getting-started/accounts.md#resetting-your-password" >}})**.

If a user logs in using their agency's account system, the only way to reset that password is for them to use their agency's normal password reset process.

If they log in with a cloud.gov account that has its own password (including `ORGNAME_deployer` accounts), you can [change their password for them](http://docs.cloudfoundry.org/adminguide/uaa-user-management.html#changing-passwords), using

```bash
uaac target uaa.cloud.gov
```

## Additional access

### Organizations and spaces

You can grant the user access to additional organizations and spaces by giving them additional [roles](http://docs.cloudfoundry.org/concepts/roles.html#roles). See [the instructions](https://docs.cloudfoundry.org/adminguide/cli-user-management.html#orgs-spaces) for changing them.

### Creating Admins

First, create the user as normal. Then, to convert a user into a cloud.gov admin:

1. If you haven't already, install the UAAC client.

    ```bash
    gem install cf-uaac
    ```
2. If you haven't already, authenticate and get an admin token.

    ```bash
    uaac target uaa.cloud.gov
    uaac token client get admin [supplying the uaa:admin:client_secret token from our manifests]
    ```

3. Add the user to the `cloud_controller.admin`, `uaa.admin`, `scim.read`, and `scim.write` groups.

    ```bash
    uaac member add cloud_controller.admin ACCOUNTNAME
    uaac member add uaa.admin ACCOUNTNAME
    uaac member add scim.read ACCOUNTNAME
    uaac member add scim.write ACCOUNTNAME
    ```

4. Ensure the user can see logs and events for all applications.

    ```bash
    cf set-org-role ACCOUNTNAME cf OrgManager
    ```

More context is available in the [upstream instructions](http://docs.cloudfoundry.org/adminguide/uaa-user-management.html#creating-admin-users).

See our [admin password policy](https://docs.google.com/a/gsa.gov/document/d/10Do0hghoO-x3imKo9SKZZop_EoXckel0Qg241CHhiUY/edit?usp=sharing).
