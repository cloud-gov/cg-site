---
parent: runbook
layout: ops

layout: docs
sidenav: true
title: Suspending and Removing Orgs
---

cloud.gov Operators are responsible for suspending and activating `cf orgs` for
the platform. The following documentation covers how to do that.

We do not delete orgs when we are suspending them because it is usually due to a
lapse in funding rather than a need to delete the org.

## Suspending and stopping applications

Suspending a cloud.gov org is done using the `cf curl` command. A cloud.gov
Operator sets the status of the org as `suspended` and stops all applications in
all spaces. Use the [`cg-script/suspend-org.sh` script][cg-suspend] in the
`cg-scripts` repository to suspend orgs and stop applications.

To facilitate the un-suspending of orgs, cloud.gov Operators only stop
applications and do not remove any routes, domains, services, or
service-bindings. Suspended orgs are placed into a read-only state which only CF
admins (cloud.gov Operators) may access or change anything in the org. Read more
about [suspending orgs and RBAC in this documentation][cf-suspend-org-docs].

[cf-suspend-org-docs]: https://docs.cloudfoundry.org/concepts/roles.html#suspendedroles "RBAC for suspended orgs in Cloud Foundry"

## Un-suspending and starting applications

Un-suspending a cloud.gov org is done using the `cf curl` command. A cloud.gov
Operator sets the status of the org as `active` and starts all applications in
all spaces. Use the [`cg-script/activate-org.sh` script][cg-activate] in the
`cg-scripts` repository to un-suspend orgs and start applications.

[cg-activate]: https://github.com/18F/cg-scripts/blob/master/activate-org.sh
"Source for activating orgs programmatically"
[cg-suspend]: https://github.com/18F/cg-scripts/blob/master/suspend-org.sh "Source for suspending orgs programatically"

## Querying org statuses

Finding which orgs are already suspended is done via the following `cf curl`
command.

```sh
cf curl '/v2/organizations?q=status:suspended' | jq -r '(.resources[] | "org GUID: " + .metadata.guid, "org Status: " + .entity.status, "org Name: " + .entity.name)'
```

These results may be paginated. Check pagination by using the following
`cf curl` command. You must change the URL to whatever is in _Previous
URL_ or _Next URL_ with the previous command to get to the suspended orgs.

```sh
cf curl '/v2/organizations?q=status:suspended' | jq -r '"Total Results: " + (.total_results | tostring), "Total Page: " + (.total_pages | tostring), "Previous URL: " +  .prev_url, "Next URL" +  .next_url'
```

## Removing orgs

In cases where orgs need to be deleted, we give customers limited time to export
their data. Afterwards, we delete the org, spaces, services, and service-keys
for the given org. Refer to the [CF CLI reference guide.](http://cli.cloudfoundry.org/en-US/cf/)
