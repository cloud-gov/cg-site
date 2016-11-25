---
menu:
  docs:
    parent: operations
title: Creating organizations
---

## Sandboxes

New sandbox organizations are automatically created when users sign in for the first time, via the [sandbox bot](https://github.com/18F/cg-sandbox-bot).

## Non-sandboxes

Non-sandbox organizations need to be created by hand. To do so:

1. The [organization request form](https://docs.google.com/a/gsa.gov/forms/d/e/1FAIpQLSd4HmcGfJW3EBnpewTFDD-urRFPp1LN0DcwNB_FxZgUn8ho9g/viewform?c=0&w=1) should be filled out by you or the tenant.
1. Run the [`cf-create-org`](https://github.com/18F/cg-scripts/blob/master/cf-create-org.sh) script. You will need the following information, some of which is in the [form output](https://docs.google.com/spreadsheets/d/1Bdzl9n2E1MXWV4elXvZ-nYuZmmEj4PEU-u5aZlNGZF4/edit#gid=131031416) (consult the script itself for how to pass in the arguments):
   * **Agency**: the requesting agency, column B of the form output.
   * **Note**: currently provided by first-tier support.
   * **Memory**: 4G by default; this should be set to a reasonable initial cap for the systems expected to live in that quota so that clients aren't shocked at their first bill. They can ask for increases as needed.
   * **System name**: the agency's system, column C of the form output.
   * **Unique business ID**: the organization and agency should allow you to find the business ID in column H of [this document](https://docs.google.com/spreadsheets/d/1v4QfXGaJVy9-CZ0n6cFLHGGs_5TL1l8uCh6ZyNYjMDk/edit#gid=0), or consult first-tier support
NOTE: We don't yet have a standard convention for what to put in the note field.
1. [Make the primary (technical) point of contact an `OrgManager`.]({{< relref "docs/apps/managing-teammates.md#give-roles-to-a-teammate" >}})
    * They can grant themselves and others additional access using those same instructions.
1. Notify the `OrgManager` that the organization is created. Here's a template:

    > Your organization has been created in the [East/West or GovCloud] environment. After signing in (https://cloud.gov/docs/getting-started/setup/), you can target it with
    >
    >     $ cf target -o [org name]
    >
    > The following pages may be helpful for next steps:
    >
    > * https://cloud.gov/docs/getting-started/your-first-deploy/
    > * https://cloud.gov/docs/apps/managing-teammates/
    >
    > If you need the quota (https://cloud.gov/overview/pricing/quotas/) adjusted or any other help, let us know!
