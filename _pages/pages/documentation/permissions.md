---
title: Access and Permissions
permalink: /pages/documentation/access-permissions/
layout: docs
navigation: pages
sidenav: pages-documentation

---

## Initial access

### Personal access
Basic access to Pages is authenticated using GitHub OAuth. Please ask your team's primary contact for Pages to request access to Pages by e-mailing pages-support@cloud.gov with the GitHub usernames of those that should have access. Next, you should receive an invitation to join the federalist-users GitHub organization which you must accept before you can log in to Pages. Primary contacts should also let us know when to remove access as part of offboarding.

***Note:*** If a user is inactive for 90 days, their account will be disabled and they will not be able to login to Pages. In order to regain access to Pages, their team's primary contact for Pages must re-submit a request for access to Pages by e-mailing pages-support@cloud.gov with the user's GitHub username.

### Organizational access
In order to manage sites where the repository is owned by an organization, Pages uses GitHub oAuth at the organizational level. After you have logged in to Pages, as described in the Personal Access section above, you must [request organization approval](https://help.github.com/en/articles/requesting-organization-approval-for-oauth-apps) for the Pages oAuth App. Be sure to follow up with your organization's GitHub admin to confirm approval.

## Site permissions

To take any actions on a site in Pages, you need permissions set on the corresponding GitHub repository. Write access grants most permissions.

### Collaborator or write access

Collaborators with write access to a site's repository can:
- add a current Pages site to their sites list
- trigger site rebuilds
- view site build history and build logs
- view site collaborator list
- view and update site settings
- view site branches, branch previews and uploaded files

### Administrator

Administrators of a site's repository can take all actions available to collaborator and can:
- add a new repo to Pages
- delete a site from Pages
- add/remove site collaborators

