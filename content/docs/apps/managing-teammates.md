---
menu:
  docs:
    parent: advanced
title: Managing teammates
---

## Invite a teammate

If you're part of a team using cloud.gov, you can invite teammates to get cloud.gov accounts. You can invite anyone you need to work with, including federal employees and federal contractors.

First, [send them an invite](https://account.fr.cloud.gov/invite). (This may prompt you to log into your cloud.gov account first.)

Then, confirm with them that they have received and accepted the invite. Now they have a cloud.gov account!

If you invited them with an agency email address and they're part of an agency that has automatic sandbox spaces, they'll also automatically get a sandbox space in their agency's cloud.gov org.

## Give roles to a teammate

After a teammate gets a cloud.gov account, an Org Manager or Space Manager will need to give them roles in your orgs and spaces so they can collaborate with you. For details about how org and space roles and permissions work, see [Cloud Foundry roles and permissions](http://docs.cloudfoundry.org/concepts/roles.html#roles).

Org Managers can assign roles using the dashboard or command line. Space Managers can assign roles using the command line.

{{% dashboard %}}

If you're an Org Manager, go to your dashboard and click on the name of your org.

![User roles](/img/user-role-management.png)

On the Organization page, scroll down to the "Organization users" section. This has a list of all the organization users and their organization roles. You can change the user roles by clicking the checkboxes beside their names.

Note: If you are the only person in the organization, you won't see a list of users - you'll just see "You are the only user in this organization".

{{% /dashboard %}}

{{% commandline %}}

If you're an Org Manager or Space Manager, here's how to give your teammates roles for your orgs and spaces. You can check whether you're an Org Manager using `cf org-users <org>` and whether you're a Space Manager using `cf space-users <org> <space>`.

Check what version of the CLI you're running: `cf -v`. If that's older than the [latest version listed here](https://github.com/cloudfoundry/cli/releases), you should [upgrade it](https://docs.cloudfoundry.org/devguide/installcf/install-go-cli.html) to avoid unexpected errors.

Decide which roles to give them. For a complete list of roles, see [the Cloud Foundry guide to Org and Space Roles](https://docs.cloudfoundry.org/adminguide/cli-user-management.html#orgs-spaces). Examples:

* If you want to make them an admin for your organization, run:

    ```bash
    cf set-org-role <email> <org> OrgManager
    ```
* If you want to give them admin access for a space, run:

    ```bash
    cf set-space-role <email> <org> <space> SpaceManager
    ```
* If you want to give them permission to deploy applications in a space, run:

    ```bash
    cf set-space-role <email> <org> <space> SpaceDeveloper
    ```
* To give them read-only permissions to the organization, run:

    ```bash
    cf set-org-role <email> <org> OrgAuditor
    ```
{{% /commandline %}}
