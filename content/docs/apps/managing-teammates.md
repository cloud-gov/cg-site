---
menu:
  docs:
    parent: advanced
title: Managing teammates
---

## Invite a teammate

If you're part of a team using cloud.gov, you can invite teammates to get cloud.gov accounts. You can invite anyone you need to work with, including federal employees and federal contractors.

First, send them an invite from the following link. (This may prompt you to log into your cloud.gov account first.)

{{% eastwest %}}
https://invite.cloud.gov/
{{% /eastwest %}}

{{% govcloud %}}
https://invite.fr.cloud.gov/
{{% /govcloud %}}

Then, confirm with them that they have received and accepted the invite. Now they have a cloud.gov account!

If you invited them with an agency email address and they're part of an agency that has automatic sandbox spaces, they'll also automatically get a sandbox space in their agency's cloud.gov org.

## Give roles to a teammate

After a teammate gets a cloud.gov account, an Org Manager or Space Manager will need to give them roles in your orgs and spaces so they can collaborate with you.

If you're an Org Manager or Space Manager, here's how to give roles to your teammates to give them permissions for your orgs and spaces. For details about how cloud.gov org and space roles and permissions work, see [Cloud Foundry roles and permissions](http://docs.cloudfoundry.org/concepts/roles.html#roles).

First check whether you're running version >= [6.14.0](https://github.com/cloudfoundry/cli/releases/tag/v6.14.0) of the CLI:

```bash
cf -v
```

(If not, you'll need to [upgrade](https://docs.cloudfoundry.org/devguide/installcf/install-go-cli.html).)

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
