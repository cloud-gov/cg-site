---
menu:
  main:
    parent: advanced
title: Managing Teammates
---

## Invite a teammate

If you're part of an agency team using cloud.gov, you can invite other people at your agency to get cloud.gov accounts:

1. [Send them an invite](https://login.cloud.gov/invitations/new) (this may prompt you to log into your cloud.gov account first).

1. Confirm with them that they have received and accepted the invite.

## Give roles to a teammate

If you're an Org Manager or Space Manager, here's how to give roles to your teammates to give them permissions. For details about how cloud.gov org and space roles and permissions work, see [Cloud Foundry roles and permissions](http://docs.cloudfoundry.org/concepts/roles.html#roles).

First check whether you're running version >= [6.14.0](https://github.com/cloudfoundry/cli/releases/tag/v6.14.0) of the CLI. (If not, you'll need to [upgrade](https://docs.cloudfoundry.org/devguide/installcf/install-go-cli.html).)

    ```bash
    cf -v
    ```

Then decide which roles to give them, such as:

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
    
For a complete list of cloud.gov roles and permissions that Org and Space Managers can give and remove, see [the Cloud Foundry guide to Org and Space Roles](https://docs.cloudfoundry.org/adminguide/cli-user-management.html#orgs-spaces).
