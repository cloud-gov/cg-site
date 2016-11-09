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
    * They can grant additional access using those same instructions.
1. Notify the `OrgManager` that the organization is created, and how to `target` it.
