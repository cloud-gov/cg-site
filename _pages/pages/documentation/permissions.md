---
title: Access and Permissions
permalink: /pages/documentation/access-permissions/
layout: docs
navigation: pages
sidenav: pages-documentation

---

## Initial access

### Personal access
Users can be granted access to Cloud.gov Pages in one of two ways:

1. Pages Users with the `manager` role in a Pages Organization can “invite” users to their Pages Organization. If the invited user is not currently a Pages User, a Cloud.gov UAA User is created for them. Once the UAA User accepts the invitation to join UAA and completes the authentication process with their chosen IdP, they are allowed access to the Pages Application. Additionally, once the UAA User is created, the corresponding Pages User is granted access to the appropriate Pages Organization, allowing the Pages User access to the organization’s corresponding Pages Sites.

1. When a Pages Operator creates a new Pages Organization in the Pages Application, a user will be designated as the first `manager` for the Pages Organization. If the user is not already a Pages User, the user follows the same process as in 1.


### Pages organizations
Pages Users within an Organization will be able to see all of the Sites in the Organization without having to manually add them. Pages Users can have one of two Roles within an Organization: `user` or `manager`. The roles are identical with the exception that Organization `manager`s have the ability to add/remove/manage other Pages Users within the Organization, including triggering invites to the Pages platform if necessary for new users. Organizations can only be created and deactivated by Pages Operators.


## Adding a user to an organization


- Navigate to the organizations tab
- Click edit in the lower right hand corner of the organization pane
  <img src="{{ site.baseurl }}/assets/images/pages/edit_organizations.png"
       alt="'Your Organizations' pane with an 'Edit' link highlighted"/>

- Click the plus sign under “Members”
  <img src="{{ site.baseurl }}/assets/images/pages/add_user.png"
       alt="Organization edit pane with the plus sign button next to 'Add user' highlighted"/>

- Fill out the required fields of Email and Role
 * If you do not know the GitHub username of the invitee you can add it post invite

- Click Invite


## User Acceptance

As a new user to the platform you will be sent an invitation via email. The link in the email will take you directly to the Cloud.gov login page to authenticate your credentials.  You will need to create a Cloud.gov account and then use these credentials to login to Pages.

\*Note if a user already belongs to these agencies FDIC, EPA, NIH, GSA, DOJ, OMB or has existing Cloud.gov credentials they can use their existing account login information to authenticate into Pages.


Netlify CMS users **must** login to pages.Cloud.gov prior to using the content editor.

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

