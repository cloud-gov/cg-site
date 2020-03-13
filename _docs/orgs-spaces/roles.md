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

## Adding roles via the dashboard for users to access orgs and spaces

After a user has a cloud.gov account and has logged in, an Org Manager can assign roles using the [dashboard](https://dashboard.fr.cloud.gov/) as follows.

### Adding users outside of your organization

> A bug exists in the current [dashboard (https://dashboard.fr.cloud.gov)](https://dashboard.fr.cloud.gov) which prevents adding a user outside of an organization to roles within that organization or spaces. If you are trying to add a user outside the organization, please follow these instructions.

Log into the old [dashboard-deprecated (https://dashboard-deprecated.fr.cloud.gov)](https://dashboard-deprecated.fr.cloud.gov)

1. Select the organization from the list on the main page
1. Scroll down to the “Organization users”
1. In the “User's email” box, enter the email of the user to add and select “Add user to this organization”
1. You can then assign users to roles in the organization and spaces on that page or you can follow the instructions using the new dashboard below


### Managing users in your organization

Log into the [Dashboard (https://dashboard.fr.cloud.gov)](https://dashboard.fr.cloud.gov)

1. In the left menu, click the “Cloud Foundry” entry
1. In the top blue bar, click on the “Organizations” tab or the box at the bottom, then click on the organization you would like to manage
{% asset roles-1-open-orgs-list.png alt="Open the organization to manage roles in the Cloud Foundry menu option" %}
1. Click on the “Users” box in the top blue bar or at the bottom
{% asset roles-2-open-users-list.png alt="Open the Users list" %}
1. To add a new user, set the left dropdown to “Users without roles” or “All users”, then in the right “Search by username” text entry, click and start typing their email address or some common keyword, like the domain name of a contractor
1. To the right of the user you want to manage, click the three-dot menu and select “Manage roles”
{% asset roles-3-open-manage-menu.png alt="Find a user and open the Manage Roles menu" %}
1. You’ll then be able to use checkboxes to set roles for that user within the org and its spaces
{% asset roles-4-select-role-changes.png alt="Set user roles via checkboxes" %}
1. Click "Apply" and check the resulting role changes, then "Apply" again to confirm
{% asset roles-5-apply-role-changes.png alt="Confirm and apply changes" %}

The user will immediately be granted access to the orgs and spaces you have set. Repeat the process to add or modify additional users and their roles and permissions.
