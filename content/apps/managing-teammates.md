---
menu:
  main:
    parent: advanced
title: Managing teammates
weight: 10
---

To add a new teammate to your organization:

1. [Send them an invite](https://login.cloud.gov/invitations/new).
1. Run

    ```bash
    cf set-org-role <email> <org> OrgManager
    ```

1. Add them to each space:

    ```bash
    cf set-space-role <email> <org> <space> SpaceDeveloper
    ```

[Learn more](https://docs.cloudfoundry.org/concepts/roles.html).
