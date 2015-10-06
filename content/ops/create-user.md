---
menu:
  main:
    parent: ops
title: Creating a user
weight: 10
---

## Creating users

Follow the instructions for [the `provision-user-space` CLI plugin](https://github.com/18F/cf-provision-user-space-plugin).

Access to additional existing spaces can be granted individually as necessary via the normal `cf` command:
```
cf set-space-role user@domain.com ORG SPACE SpaceManager
cf set-space-role user@domain.com ORG SPACE SpaceDeveloper
```

More information on space and org roles is available in [the community Cloud Foundry documentation](http://docs.cloudfoundry.org/concepts/roles.html#roles).
