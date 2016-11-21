---
menu:
  docs:
    parent: tenants
title: Managing users
---

{{% govcloud %}}
Only single sign-on user accounts are allowed. Service accounts, such as deployer credentials, are permissible with the condition that they are scoped to a particular space with limited access.

No local accounts to UAA shall be created for user access.
{{% /govcloud %}}

## Creating users

The preferred way to add new users is to [invite them]({{< relref "docs/apps/managing-teammates.md#invite-a-teammate" >}}). If you need to create a user manually, follow the instructions for [the `provision-user-space` CLI plugin](https://github.com/18F/cf-provision-user-space-plugin).

## Changing passwords

First ask the user **[to try resetting their own password]({{< relref "docs/getting-started/accounts.md#resetting-your-password" >}})**.

If a user logs in using their agency's account system, the only way to reset that password is for them to use their agency's normal password reset process.

If they log in with a cloud.gov account that has its own password (including `ORGNAME_deployer` accounts), you can [change their password for them](http://docs.cloudfoundry.org/adminguide/uaa-user-management.html#changing-passwords), using

```bash
uaac target uaa.cloud.gov
```

## Additional access

### Organizations and spaces

You can grant the user access to additional organizations and spaces by giving them additional [roles](http://docs.cloudfoundry.org/concepts/roles.html#roles). See [the instructions](https://docs.cloudfoundry.org/adminguide/cli-user-management.html#orgs-spaces) for changing them.

## Managing Admins
Make sure you have a copy of the [cg-scripts repository](https://github.com/18F/cg-scripts) so you have access to several utility scripts.

### Creating Admins
First, target and get a token for the main CloudFoundry UAA, and make the user a CloudFoundry admin using their GSA email address.

```bash
cd /path/to/cg-scripts
uaac target <CF_UAA_FQDN>
uaac token client get admin -s <CF_UAA_ADMINCLIENT_PASSPHRASE>
./make-cf-admin.sh <EMAIL_ADDRESS>
```

Secondly, target and get a token for the Ops UAA, and then make the user a Concourse admin using their GSA email address.

```bash
uaac target <OPS_UAA_FQDN>
uaac token client get admin -s <OPS_UAA_ADMINCLIENT_PASSPHRASE>
./make-ops-admin.sh <EMAIL_ADDRESS>
```

### Removing Admins
First, target and get a token for the main CloudFoundry UAA, and remove the user as a CloudFoundry admin using their GSA email address.

```bash
cd /path/to/cg-scripts
uaac target <CF_UAA_FQDN>
uaac token client get admin -s <CF_UAA_ADMINCLIENT_PASSPHRASE>
./make-cf-admin.sh -r <EMAIL_ADDRESS>
```

Secondly, target and get a token for the Ops UAA, and then remove the user as a Concourse admin using their GSA email address.

```bash
cd /path/to/cg-scripts
uaac target <OPS_UAA_FQDN>
uaac token client get admin -s <OPS_UAA_ADMINCLIENT_PASSPHRASE>
./make-ops-admin.sh -r <EMAIL_ADDRESS>
```
