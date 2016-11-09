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

1. Run the [`cf-create-org`](https://github.com/18F/cg-scripts/blob/master/cf-create-org.sh) script.
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
