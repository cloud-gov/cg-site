---
menu:
  main:
    parent: advanced
title: Managing Teammates
---

To add a new teammate to your organization:

1. [Send them an invite](https://login.cloud.gov/invitations/new).
1. Confirm with them that they have received and accepted the invite.
1. Ensure you are running version >= [6.14.0](https://github.com/cloudfoundry/cli/releases/tag/v6.14.0) of the CLI. If not, you will need to [upgrade](https://docs.cloudfoundry.org/devguide/installcf/install-go-cli.html).

    ```bash
    cf -v
    ```

1. To give them read-only permissions to the organization, run

    ```bash
    cf set-org-role <email> <org> OrgAuditor
    ```

1. If you want to make them an admin for your organization, run

    ```bash
    cf set-org-role <email> <org> OrgManager
    ```

1. If you want to give them permission to deploy, add them to each space:

    ```bash
    cf set-space-role <email> <org> <space> SpaceDeveloper
    ```

[Learn more about Cloud Foundry roles](https://docs.cloudfoundry.org/concepts/roles.html).
