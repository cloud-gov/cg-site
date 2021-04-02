---
parent: orgs-spaces
layout: docs
sidenav: true
redirect_from: 
    - /docs/apps/managing-teammates/
    - /docs/management/managing-teammates/
title: Managing user access to orgs and spaces
---

## Make sure the user has a cloud.gov account

Anyone with a .mil or .gov account can [sign up for their own cloud.gov account]({{ site.baseurl }}/sign-up/) with a sandbox space in their agency's cloud.gov sandbox org.

To invite someone to a non-sandbox org, including federal employees and federal contractors without .gov or .mil email addresses, [send them an invite](https://account.fr.cloud.gov/invite). This may prompt you to log into your cloud.gov account first.

Then, confirm with them that they have received and accepted the invite. Now they have a cloud.gov account!

You can manage users [using the dashboard](#managing-roles-via-the-dashboard) or the [cf cli](#managing-roles-via-the-cli)

## Managing roles via the dashboard

After a user has a cloud.gov account and has logged in, an Org Manager can assign roles using the [dashboard](https://dashboard.fr.cloud.gov/) as follows.

Log into the [Dashboard (https://dashboard.fr.cloud.gov)](https://dashboard.fr.cloud.gov)

1. In the left menu, click on the "Cloud Foundry" text.
{% asset roles-01-open-cloud-foundry.png alt="In the left menu, click on the Cloud Foundry text." %}
1. Click either "Organizations" in the secondary left menu that appears or the box labeled "Orgs" in the bottom center of the screen.
{% asset roles-02-open-organizations.png alt="Click either Organizations in the secondary left menu that appears or the box labeled Orgs in the bottom center of the screen." %}
1. Click on the box of the organization that you want to manage users for.
{% asset roles-03-select-organization.png alt="Click on the box of the organization that you want to manage users for." %}
1. Click on either "Users" in the secondary left menu that appears or the box labeled "Users" in the bottom center of the screen.
{% asset roles-04-open-users.png alt="Click on either Users in the secondary left menu that appears or the box labeled Users in the bottom center of the screen." %}
1. Click on the "Manage Roles by Username" icon toward the top of the screen.
{% asset roles-05-open-manage-users.png alt="Click on the Manage Roles by Username icon toward the top of the screen." %}
1. Type in the username that you want to either add or remove roles for in the organization, then click on the "Next" button at the bottom right of the screen.
{% asset roles-06-specify-username.png alt="Type in the username that you want to either add or remove roles for in the organization, then click on the Next button at the bottom right of the screen." %}
1. Select the roles that you would like to add or remove from the user.  You may also set roles for any spaces within the organization that you would like to add or remove them from on this screen.
{% asset roles-07-select-roles.png alt="Select the roles that you would like to add or remove from the user.  You may also set roles for any spaces within the organization that you would like to add or remove them from on this screen." %}
1. Confirm your changes and selections by clicking on the "Apply" button on the bottom of the screen.
{% asset roles-08-confirm-changes.png alt="Confirm your changes and selections by clicking on the Apply button on the bottom of the screen." %}

The user will immediately be granted access to (or removed from) the orgs and spaces you have set. Repeat the process to add or modify additional users and their roles and permissions.

## Managing roles via the cli

After a user has a cloud.gov account and has logged in, an Org Manager can assign roles using the [cf cli]({{ site.baseurl }}{% link _docs/getting-started/setup.md %}#set-up-the-command-line).

### Adding and removing org roles

Adding org roles is done using the `cf set-org-role` command, which takes the form:

```
cf set-org-role USERNAME ORG ROLE
```

Where ROLE is one of:
  - `OrgManager` - Invite and manage users, select and change plans, and set spending limits
  - `BillingManager` - Create and manage the billing account and payment info
  - `OrgAuditor` - Read-only access to org info and reports

Removing roles uses the command `cf unset-org-role`:

```
cf unset-org-role USERNAME ORG ROLE
```

### Adding and removing space roles

Adding space roles is done using the `cf set-space-role` command, which takes the form:

```
cf set-space-role USERNAME ORG SPACE ROLE
```

Where ROLE is one of:
  - `SpaceManager` - Invite and manage users, and enable features for a given space
  - `SpaceDeveloper` - Create and manage apps and services, and see logs and reports
  - `SpaceAuditor` - View logs, reports, and settings on this space

Removing space roles uses the command `cf unset-space-role`:

```
cf unset-space-role USERNAME ORG SPACE ROLE
```
