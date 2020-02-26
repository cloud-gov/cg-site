---
parent: management
layout: docs
sidenav: true
redirect_from: 
    - /docs/apps/managing-teammates/
title: Managing teammates
---

## Beta dashboard migration

NOTE: We now recommend using the [beta dashboard](https://dashboard-beta.fr.cloud.gov/) to manage user roles and [have instructions available here]({{ site.baseurl }}{% link _docs/orgs-spaces/roles.md %}).

## Invite a teammate

If you're part of a team using cloud.gov, you can invite teammates to get cloud.gov accounts. You can invite anyone you need to work with, including federal employees and federal contractors.

First, [send them an invite](https://account.fr.cloud.gov/invite). (This may prompt you to log into your cloud.gov account first.)

Then, confirm with them that they have received and accepted the invite. Now they have a cloud.gov account!

If you invited them with an agency email address and they're part of an agency that has automatic sandbox spaces, they'll also automatically get a sandbox space in their agency's cloud.gov org.

## Give roles to a teammate

After a teammate gets a cloud.gov account, an Org Manager or Space Manager will need to give them roles in your orgs and spaces so they can collaborate with you. For details about how org and space roles and permissions work, see [Cloud Foundry's documentation](http://docs.cloudfoundry.org/concepts/roles.html#roles).

Org Managers can assign roles using the [dashboard](https://dashboard.fr.cloud.gov/) or command line. Space Managers can assign roles using the command line.


<div class="usa-accordion usa-accordion--bordered">
<!-- Use the accurate heading level to maintain the document outline -->
<h2 class="usa-accordion__heading">
<button class="usa-accordion__button"
    aria-expanded="true"
    aria-controls="b-a1">
    Dashboard
</button>
</h2>
<div id="b-a1" class="usa-accordion__content usa-prose" markdown="1">
### Organization users

If you're an Org Manager, go to your [dashboard](https://dashboard.fr.cloud.gov/) and click on the name of your org.

{% asset user-role-management.png alt="User Roles" %}

On the org page, scroll down to "Organization users". This lists the org users and their org roles. Change the roles by clicking the checkboxes beside their names. (If you're the only person in the org, you'll just see "You are the only user in this organization".)

### Space users

If you're a Space Manager, go to your [dashboard](https://dashboard.fr.cloud.gov/) and click on the name of your org, then click on the name of your space.

{% asset space-user-role-management.png alt="Adding users to the space" %}

On the space page, scroll down to "Space users". This lists the space users and their space roles. Change the roles by clicking the checkboxes beside their names. (If you're the only person in the space, you'll just see "You are the only user in this space".)

To give an existing organization user access to a space, go to your space page, click a space name, and scroll down to "Space users". You can add a person, and then you can give them roles with the checkboxes.
</div>

<!-- Use the accurate heading level to maintain the document outline -->
<h2 class="usa-accordion__heading">
<button class="usa-accordion__button"
    aria-expanded="false"
    aria-controls="b-a2">
    Commandline
</button>
</h2>
<div id="b-a2" class="usa-accordion__content usa-prose" markdown="1">
If you're an Org Manager or Space Manager, here's how to give your teammates roles for your orgs and spaces. You can check whether you're an Org Manager using `cf org-users <org>` and whether you're a Space Manager using `cf space-users <org> <space>`.

Check what version of the CLI you're running: `cf -v`. If that's older than the [latest version listed here](https://github.com/cloudfoundry/cli/releases), you should [upgrade it](https://docs.cloudfoundry.org/devguide/installcf/install-go-cli.html) to avoid unexpected errors.

Decide which roles to give them. For a complete list of roles, see [the Cloud Foundry guide to Org and Space Roles](https://docs.cloudfoundry.org/adminguide/cli-user-management.html#orgs-spaces). Examples:

* If you want to make them an admin for your organization, run:

    ```sh
    cf set-org-role <email> <org> OrgManager
    ```
* If you want to give them admin access for a space, run:

    ```sh
    cf set-space-role <email> <org> <space> SpaceManager
    ```
* If you want to give them permission to deploy applications in a space, run:

    ```sh
    cf set-space-role <email> <org> <space> SpaceDeveloper
    ```
* To give them read-only permissions to the organization, run:

    ```sh
    cf set-org-role <email> <org> OrgAuditor
    ```
</div>

<div markdown="1">
## Removing a teammate

If you are an Org Manager or Space Manager, you can remove teammates from orgs and spaces respectively.

<div >

<div class="usa-accordion usa-accordion--bordered">
<!-- Use the accurate heading level to maintain the document outline -->
<h2 class="usa-accordion__heading">
<button class="usa-accordion__button"
    aria-expanded="true"
    aria-controls="b-a1">
    Dashboard
</button>
</h2>
<div id="b-a1" class="usa-accordion__content usa-prose" markdown="1">
### Organization Users

If you're an Org Manager, go to the org with the teammate you want to remove.

On the Organization page, scroll down to the “Organization users” section. This has a list of all the organization users. Click the "Remove User From Org" button.

To remove a teammate from an organization, you must first remove them from any of the organization's spaces first.

{% asset remove-organization.png alt="Removing users" %}

### Space users

If you're an Org Manager or Space Manager, go to the space with the teammate you want to remove.

On the Space page, scroll down to the “Space users” section. This has a list of all the space users. Click the "Remove All Space Roles" button.

You can also remove a user from a Space by unchecking all of their space roles.
</div>

<!-- Use the accurate heading level to maintain the document outline -->
<h2 class="usa-accordion__heading">
<button class="usa-accordion__button"
    aria-expanded="false"
    aria-controls="b-a2">
    Commandline
</button>
</h2>
<div id="b-a2" class="usa-accordion__content usa-prose" markdown="1">
If you're an Org Manager or Space Manager, here's how to remove teammates from your orgs and spaces. You can check whether you're an Org Manager using `cf org-users <org>` and whether you're a Space Manager using `cf space-users <org> <space>`.

Check what version of the CLI you're running: `cf -v`. If that's older than the [latest version listed here](https://github.com/cloudfoundry/cli/releases), you should [upgrade it](https://docs.cloudfoundry.org/devguide/installcf/install-go-cli.html) to avoid unexpected errors.

### Organization users

To remove teammates from your organization, run the following:

1. Show your org info, by running:

    ```sh
    cf org <org>
    ```
2. List the spaces belonging to the org, by running:

    ```sh
    cf spaces
    ```
3. List the users and roles for each space, by running:

    ```sh
    cf space-users <org> <space>
    ```
4. Remove the user for each combination of space and role, by running:

    ```sh
    cf unset-space-role <email> <org> <space> <role>
    ```
5. Find the ORG_GUID, by running:

    ```sh
    cf org <org> --guid
    ```
6. Use the API to remove the user from the org, by running:

    ```sh
    cf curl -X DELETE '/v2/organizations/<ORG_GUID>/users' -d '{"username": "<email>"}'
    ```

### Space users

To remove teammates from your space, run the following:

1. Show your org info, by running:

    ```sh
    cf org <org>
    ```
2. List the spaces belonging to the org, by running:

    ```sh
    cf spaces
    ```
3. List the users and roles for each space, by running:

    ```sh
    cf space-users <org> <space>
    ```
4. Remove the user for each combination of space and role, by running:

    ```sh
    cf unset-space-role <email> <org> <space> <role>
    ```

</div>
