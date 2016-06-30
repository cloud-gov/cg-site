---
menu:
  main:
    parent: advanced
title: Managing Teammates
---

If you have OrgManager permissions for your organization, here's how to add new teammates to your organization. (For details about how cloud.gov org and space permissions work, see [Cloud Foundry roles and permissions](http://docs.cloudfoundry.org/concepts/roles.html#roles).)

1. [Send them an invite](https://login.cloud.gov/invitations/new) (this may prompt you to log into your cloud.gov account first).

1. Confirm with them that they have received and accepted the invite.

1. Check whether you're running version >= [6.14.0](https://github.com/cloudfoundry/cli/releases/tag/v6.14.0) of the CLI. (If not, you'll need to [upgrade](https://docs.cloudfoundry.org/devguide/installcf/install-go-cli.html).)

    ```bash
    cf -v
    ```

Then decide which permissions to give them:

* To give them read-only permissions to the organization, run

    ```bash
    cf set-org-role <email> <org> OrgAuditor
    ```

* If you want to make them an admin for your organization, run

    ```bash
    cf set-org-role <email> <org> OrgManager
    ```
* If you want to give them permission to deploy, add them to each space:

    ```bash
    cf set-space-role <email> <org> <space> SpaceDeveloper
    ```
