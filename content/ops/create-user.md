---
menu:
  main:
    parent: ops
title: Creating a user
weight: 10
---

1. Get random password: `openssl rand -base64 15`
1. Create user: `cf create-user user@domain.com PASSWORD`
1. Assign user to space:
```
cf set-space-role user@domain.com ORG SPACE SpaceManager
cf set-space-role user@domain.com ORG SPACE SpaceDeveloper
```

#### Helper Script:

The script [cf-create-user](https://github.com/18F/cloud-foundry-scripts/blob/master/cf-create-user.sh) automates creation of a new user with a generated password, personal space with permissions in the testing org. An optional parameter specifies an org to create and/or assign the `OrgManager` permission to.

**Usage:**

	cf-create-user.sh user@domain.tld [org]

For more information on space and org roles: http://docs.cloudfoundry.org/concepts/roles.html#roles
