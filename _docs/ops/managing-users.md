---
parent: tenants
layout: ops
layout: docs
sidenav: true
title: Managing users
---

Only single sign-on user accounts and cloud.gov IDP accounts are allowed. Service accounts, such as deployer credentials, are to be generated only via the [service account]({{ site.baseurl }}/docs/services/cloud-gov-service-account/) managed service to ensure that they are scoped to a particular space with limited access.

No local accounts to UAA shall be created for user access.

## Creating users

Add new users by [inviting them]({{ site.baseurl }}{% link _docs/orgs-spaces/roles.md %}#adding-roles-via-the-dashboard-for-users-to-access-orgs-and-spaces).

## Changing passwords

Users should **[reset their own password]({{ site.baseurl }}{% link _docs/getting-started/accounts.md %}#to-change-your-password)**.

If a user logs in using their agency's account system, the only way to reset that password is for them to use their agency's normal password reset process.

## Resetting TOTP tokens

Follow the process below for users logging in with a cloud.gov account.

If the user requesting a reset has any apps, routes, or services in their sandbox or access to any other spaces or orgs, tell them that **[these will be removed]({{ site.baseurl }}{% link _docs/getting-started/accounts.md %}#cloudgov-accounts)** and ask them if we should proceed. If they agree:

1. Remove all apps, routes, and services from the user's sandbox. E.g.:

    ```sh
    cf target -o sandbox-agency -s some.user
    cf apps
    cf delete app
    cf services
    cf delete-service service
    ```

2. Remove user's permissions to all [spaces and orgs](https://docs.cloudfoundry.org/adminguide/cli-user-management.html#orgs-spaces) other than their sandbox. Search for the user in the Admin interface to locate the relevant orgs and spaces. 

    For those spaces and orgs, notify the Space Managers and Org Managers that we've removed the user's access because of their request to reset their account's authentication application. 
    
3. Reset the user's totp_seed in cloudfoundry's uaa database. 

    Login to a **[concourse jumpbox]({{ site.baseurl }}{% link _docs/ops/runbook/troubleshooting-bosh.md %}#creating-and-intercepting-ephemeral-jumpboxes)** and run the `reset-totp.sh` script:

        cg-scripts/reset-totp.sh cf-production ${username}

4. Let the user know the reset process is complete. _Do not include specific account information such as the user's roles or roles/contact info for other people in their organization_

     > I've reset your one-time password. To regain cloud.gov access, log in to cloud.gov again. After entering your username/password combination, you should be prompted to set up a new one-time password with your authenticator app (for example, 1password, Microsoft Authenticator, or Authy).  Since this reset removed your roles on orgs and spaces, you may need to request additional access from your Space Managers and Org Managers again. If you had a sandbox space, that has been reset and is available to you again.

## Managing Admins
Make sure you have a copy of the [cg-scripts repository](https://github.com/18F/cg-scripts) so you have access to several utility scripts.

### Creating Admins
First, target and get a token for the main CloudFoundry UAA, and make the user a CloudFoundry admin using their GSA email address.

```sh
cd /path/to/cg-scripts
uaac target <CF_UAA_FQDN>
uaac token client get admin -s <CF_UAA_ADMINCLIENT_PASSPHRASE>
./make-cf-admin.sh <EMAIL_ADDRESS>
```

Secondly, target and get a token for the Ops UAA, and then make the user a Concourse admin using their GSA email address.

```sh
uaac target <OPS_UAA_FQDN>
uaac token client get admin -s <OPS_UAA_ADMINCLIENT_PASSPHRASE>
./make-ops-admin.sh <EMAIL_ADDRESS>
```

### Removing Admins
First, target and get a token for the main CloudFoundry UAA, and remove the user as a CloudFoundry admin using their GSA email address.

```sh
cd /path/to/cg-scripts
uaac target <CF_UAA_FQDN>
uaac token client get admin -s <CF_UAA_ADMINCLIENT_PASSPHRASE>
./make-cf-admin.sh -r <EMAIL_ADDRESS>
```

Secondly, target and get a token for the Ops UAA, and then remove the user as a Concourse admin using their GSA email address.

```sh
cd /path/to/cg-scripts
uaac target <OPS_UAA_FQDN>
uaac token client get admin -s <OPS_UAA_ADMINCLIENT_PASSPHRASE>
./make-ops-admin.sh -r <EMAIL_ADDRESS>
```

Verify their permissions have been removed using `validate_admins.sh` and making sure their email address no longer appears in the lists.

```sh
cd /path/to/cg-scripts
./validate_admins.sh
```

### Deleting Admins

Before deleting an admin user using `cf delete-user`, be sure to follow the [Removing Admins](#RemovingAdmins) above. If you don't, you will end up with orphaned group membership. The username will be replaced with the user's GUID and will appear in roles in cf (`cf org-users` or `cf space-users`).

In the event you see an orphaned account (denoted by GUID), you need to clean up UAA groups and CF. You can remove the user from cf via:

```
cf curl /v3/users/${user_guid} -X DELETE
```

You can clean up UAA groups via [cg-scripts/remove-user-guid-from-all-groups.sh](https://github.com/cloud-gov/cg-scripts/blob/master/uaa/remove-user-guid-from-all-groups.sh) or manually using `uaac member remove`.
