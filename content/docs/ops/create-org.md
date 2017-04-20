---
menu:
  docs:
    parent: tenants
title: Creating organizations
---

## Sandboxes

New sandbox organizations are automatically created when users sign in for the first time, via the [sandbox bot](https://github.com/18F/cg-sandbox-bot).

## Non-sandboxes

Non-sandbox organizations need to be created by hand. To do so:

1. The [organization request form](https://docs.google.com/a/gsa.gov/forms/d/e/1FAIpQLSd4HmcGfJW3EBnpewTFDD-urRFPp1LN0DcwNB_FxZgUn8ho9g/viewform?c=0&w=1) should be filled out by a cloud.gov team member or the tenant.
1. After requesting an org, a cloud.gov Business Unit person must verify the org request and check that all the necessary info is there. They automatically receive a notification (it goes to Zendesk), but if they haven't responded yet and you need a response soon, ask in #cloud-gov-business for a cloud.gov Business Unit person to take a look. They will verify the info and assign the Zendesk ticket to a person who can run the command (this may be you if you have permission).
1. If you don't already have [`cg-scripts`](https://github.com/18F/cg-scripts), `git clone` or otherwise download it to your computer, because you'll use the [`cf-create-org`](https://github.com/18F/cg-scripts/blob/master/cf-create-org.sh) script for this step. Navigate to the `cg-scripts` directory, then copy and paste the command in column M of the [form output](https://docs.google.com/spreadsheets/d/1Bdzl9n2E1MXWV4elXvZ-nYuZmmEj4PEU-u5aZlNGZF4/edit#gid=131031416) that corresponds to the appropriate row of the form — the spreadsheet should have automatically created the appropriate command using a formula. Using that script will automatically give the org the right name (column B + C).

1. [Make the primary (technical) point of contact an `OrgManager`.]({{< relref "docs/apps/managing-teammates.md#give-roles-to-a-teammate" >}})
    * If they don't have an account yet (for example if they don't have a GovCloud account yet), [invite them](https://account.fr.cloud.gov/invite) and ask them to accept the invite (and to let you know when they've accepted it). After they have an account, make them an OrgManager.
    * They can grant themselves and others additional access using those same instructions.

1. Check to make sure you're removed from any roles in the org that you automatically received.

1. Notify the `OrgManager` that the organization is created. Here's a template:

    > Your organization has been created in the GovCloud environment. After signing in (https://cloud.gov/docs/getting-started/setup/), you can target it with
    >
    >     $ cf target -o [org name]
    >
    > The following pages may be helpful for next steps:
    >
    > * https://cloud.gov/docs/getting-started/your-first-deploy/
    > * https://cloud.gov/docs/apps/managing-teammates/
    >
    > If you need the quota (https://cloud.gov/overview/pricing/quotas/) adjusted or any other help, let us know!
1. Notify the Business Unit person that you created the org and notified the Org Manager, so they can mark the relevant spreadsheet row green as verified and complete (and close the Zendesk ticket if it isn't closed yet).
