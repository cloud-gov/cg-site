---
parent: compliance
layout: docs
sidenav: true
title: Auditing activity
redirect_from:
  - /docs/apps/events
---

All operations performed on organizations and spaces are logged as `events`.  This includes over 75 distinct events which describe the action taken and the user who authorized the action.  Event logs are useful for continuous security, compliance and monitoring actions taken on the system.  For example, you can use event logs from cloud.gov to help meet [the Audit and Accountability (AU) requirements](https://nvd.nist.gov/800-53/Rev4/family/Audit%20and%20Accountability) of the NIST 800-53 family of controls.

To audit events, you'll need the `Org Manager` or `Org Auditor` roles for your organization, as discussed 
in [managing teammates]({{site.baseurl}}{% link _docs/management/managing-teammates.md %}).

There are two way of auditing events. The quickest way is to use the [cloud.gov dashboard](https://dashboard.fr.cloud.gov/cloud-foundry/) and navigate to `Cloud Foundry` on the left navigation. Then select your relevant `Organization`. From there you can view the users and their roles from the `Users` menu, or all the recent events from the `Events` menu. There's no ability to view _logins_ as such, since they're global events, not specific to any organization. 

Or you use the Cloud Foundry command line tooling. The remainder of this guide uses the `cf curl` command to issue commands against the `/v2/events` API.  For users who wish to build this into their systems, the API can be accessed using the [API Documentation](https://apidocs.cloudfoundry.org/280/events/list_all_events.html).

To use the following commands you will need:

* The `cf` command line tool, as described in our [getting started guide]({{site.baseurl}}{% link _docs/getting-started/setup.md %})
* The `jq` command line tool, available for MacOS (`brew install jq`) or [Windows](https://stedolan.github.io/jq/download/)

## All Events as JSON
To list all events:
`cf curl /v2/events`

## List All User Access Changes as JSON
To list all organization and space events, such as adding a SpaceDeveloper:
```
export GUID=$(cf org YOUR-ORG --guid)
cf curl "/v2/events?q=type+IN+audit.user.space_developer_add,audit.user.space_developer_remove,audit.user.space_auditor_add,audit.user.space_auditor_remove,audit.user.space_manager_add,audit.user.space_manager_remove&q=organization_guid:$GUID"
```

## List All User Access Changes as CSV
JSON is useful, but might not be a format the compliance team is familiar with.  To print the events as a CSV file instead, first download the [jq](https://stedolan.github.io/jq/) tool which will transform JSON into CSV.  Next add the following command to the end of the first command:
```
 | jq -c -r '.resources[].entity | [ .timestamp, .actor, .type, .metadata.request.name ] | @csv' | sed -e s/\"//g
```

For example, the full command would be:
```
cf curl "/v2/events?q=type+IN+audit.user.space_developer_add,audit.user.space_developer_remove,audit.user.space_auditor_add,audit.user.space_auditor_remove,audit.user.space_manager_add,audit.user.space_manager_remove&q=organization_guid:$GUID" | jq -c -r '.resources[].entity | [ .timestamp, .actor, .type, .metadata.request.name ] | @csv' | sed -e s/\"//g
```

Which will provide a table that can be imported into Excel:

| Timestamp | User Performing Action | Action Type | User |
| --------- | ---------------------- | ----------- | ---- |
| 2018-02-05T19:36:19Z | sandbox-bot | audit.user.space_manager_add | user.name@example.gov |

## List All Route Changes as CSV
To list all route changes for a organization:
```
export GUID=$(cf org YOUR-ORG --guid)
cf curl "/v2/events?q=type+IN+audit.route.create,audit.route.delete-request,audit.route.update&q=organization_guid:$GUID" | jq -c -r '.resources[].entity | [.timestamp, .actor_username, .type, .actee_name, .metadata.request.app ] | @csv' | sed -e s/\"//g
```

| Timestamp | User Performing Action | Action Type | Route | App GUID |
| --------- | ---------------------- | ----------- | ----- | -------- |
| 2018-02-05T19:36:19Z | user.name@example.gov | audit.route.update | myapproute | 7950afc2-dd7b-4a70-80a0-8f7207fd1382 |

## List All Service Instance Events as CSV
To list all events where a service is created, updated, unbound or deleted:
```
cf curl "/v2/events?q=type+IN+audit.service_instance.create,audit.service_instance.bind_route,audit.service_instance.update,audit.service_instance.unbind_route,audit.service_instance.delete&q=organization_guid:$GUID" | jq -c -r '.resources[].entity | [ .timestamp, .actor_username, .type, .actee_name ] | @csv' | sed -e s/\"//g
```
| Timestamp | User Performing Action | Action Type | Service Name |
| --------- | ---------------------- | ----------- | ------------ |
| 2018-02-05T19:36:19Z | user.name@example.gov | audit.service_instance.create | my-service-name |

## List All Service Bindings as CSV
To list all events where a service is bound to a application:
```
export GUID=$(cf org YOUR-ORG --guid)
cf curl "/v2/events?q=type+IN+audit.service_binding.create,service_instance.bind_route,audit.service_instance.unbind_route&q=organization_guid:$GUID" | jq -c -r '.resources[].entity | [.timestamp, .actor_username, .type, .metadata.request.relationships.app.data.guid, .metadata.request.relationships.service_instance.data.guid ] | @csv'  | sed -e s/\"//g
```
| Timestamp | User Performing Action | Action Type | App GUID | Service GUID |
| --------- | ---------------------- | ----------- | ----- | --- |
| 2018-02-05T19:36:19Z | sandbox-bot | audit.service_binding.create | d613b9a4-a536-47d2-8aa5-b7360c5e2f21 | 7950afc2-dd7b-4a70-80a0-8f7207fd1382 |

## List All Service Events as JSON
To list all changes to services such as databases and s3 buckets:
```
cf curl "/v2/events?q=type+IN+audit.service.create,audit.service.delete,audit.service.update,audit.service_binding.create,audit.service_binding.delete,service_instance.bind_route,audit.service_instance.create,audit.service_instance.delete,audit.service_instance.unbind_route,audit.service_instance.update&q=organization_guid:$GUID"
```
