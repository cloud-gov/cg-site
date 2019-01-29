---
menu:
  docs:
    parent: runbook
layout: ops

title: Suspending Orgs
---

cloud.gov Operators are responsible for suspending and activating `cf orgs` for
the platform. The following documentation covers how to do that.

## Suspending

Suspending a cloud.gov org is done using the `cf curl` command. A cloud.gov
Operator sets the status of the org as `suspended`. Please note that
`${org_name}` must be set to an org name in order for the `--guid` command to
properly find the org GUID in the sub-shell.

```shell
org_name="";
cf curl /v2/organizations/$(cf org ${org_name} --guid) -X PUT -d '{"status":"suspended"}'
```

## Activating

Activating a cloud.gov org is done using the `cf curl` command. A cloud.gov
Operator sets the status of the org as `active`. Please note that
`${org_name}` must be set to an org name in order for the `--guid` command to
properly find the org GUID in the sub-shell.


```shell
org_name="";
cf curl /v2/organizations/$(cf org ${org_name} --guid) -X PUT -d '{"status":"active"}'
```

## Querying org statuses

Finding which orgs are already suspended is done via the following `cf curl`
command.

```shell
cf curl '/v2/organizations?q=status:suspended' | jq -r '(.resources[] | "GUID: " + .metadata.guid, "Status: " + .entity.status, "Name: " + .entity.name)'
```

These results may be paginated. Check pagination by using the following
`cf curl` command. You must change the URL to whatever is in _Previous
URL_ or _Next URL_ with the previous command to get to the suspended orgs.

```shell
cf curl '/v2/organizations?q=status:suspended' | jq -r '"Total Results: " + (.total_results | tostring), "Total Page: " + (.total_pages | tostring), "Previous URL: " +  .prev_url, "Next URL" +  .next_url'
```
