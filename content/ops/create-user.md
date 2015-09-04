---
menu:
  main:
    parent: ops
title: Creating a user
weight: 10
---

## Creating users
The helper script [cf-create-user](https://github.com/18F/cloud-foundry-scripts/blob/master/cf-create-user.sh) should always be used to create users so that account creation procedures happen consistently no matter who creates the account.

**Usage:**
```
cf-create-user.sh user@domain.tld [org]
```
This script will:

- create a new user with a randomly generated password
- securely deliver the new password to the user
- set up a personal space in the testing org and grant access to it 
- subscribe the user to notices about platform stability via the status page

The optional `org` parameter specifies an org for which the `OrgManager` permission should additionally be granted. The org will be created if it does not already exist.

Access to additional existing spaces can be granted individually as necessary via the normal `cf` command:
```
cf set-space-role user@domain.com ORG SPACE SpaceManager
cf set-space-role user@domain.com ORG SPACE SpaceDeveloper
```

More information on space and org roles is available in [the community Cloud Foundry documentation](http://docs.cloudfoundry.org/concepts/roles.html#roles).

