---
layout: post
title: "Migrating to the OpenSearch Dashboard for Cloud.gov logs"
date: December 3, 2024
excerpt: Changes to expect in our logging system in December 2024

---

## What's Changing in December 2024

As we [announced on November 21, 2024]({{site.base_url}}{% link _posts/2024-11-21-new-logging-system.md %}),
we are upgrading the Cloud.gov customer application logging system and the user interface
at https://logs.fr.cloud.gov. The application logs interface prior to December 2024
was based on [_Kibana_](https://www.elastic.co/kibana), and we are migrating to one
based on [_OpenSearch Dashboards_](https://www.opensearch.org/docs/latest/dashboards/).

While all the underlying functionality is unchanged, or improved, there are some
differences between Kibana (old) and OpenSearch (new), which we'll outline here:

## Logging in to the new system

The first time you log in to the OpenSearch-based system you'll be presented
with the following OpenId "Application Authorization" dialog:

!['Screenshot of dialog box titled "Application Authorization: opensearch_dashboards_proxy" with boxes checked for "Access profile", "View details of your applications and services" and "Read all SCIM entries". The options are "Authorize" or "Deny"']({{site.baseurl}}/assets/images/content/opensearch-app-auth-dialog.png)

You'll need to accept all the scopes. If for some reason you need to revoke
access later, you can do so at: https://login.fr.cloud.gov/profile

You'll then need to choose the Cloud.gov org you want to work with in the "Select you Tenant" dialog:

!['Screenshot of dialog box titled "Select your tenant"']({{site.baseurl}}/assets/images/content/_assets/images/content/opensearch_select_tenant.png)

If you have access to multiple orgs, you can switch your tenant later by clicking the OpenSearch user avatar on top right.

The main OpenSearch Dashboard should resemble the Kibana dashboard. If you're provided a 
Dashboard selection screen (see below), choose "App - Overview".  Otherwise the main
navigation menus should be familiar and you're now ready to explore your Cloud.gov logs
with OpenSearch.

!['Screenshot of dialog box titled "Dashboards"']({{site.baseurl}}/assets/images/content/opensearch_choose_dashboard.png)


## Migrating Kibana customizations to OpenSearch

All of the application and CloudFoundry logs that have been available in Kibana
will be available to you in OpenSearch. You needn't take any action to ensure that.
You will need to migrate custom dashboards and saved searches by exporting them
from Kibana and importing them into OpenSearch.

**Export Saved Objects from Kibana**

In Kibana, use the left navigation menu to select "Management" -> "Stack Management":

!['Screenshot of Kibana leftnav with "Stack Management" highlighted']({{site.baseurl}}/assets/images/content/kibana_select_stack_mgmt.png)

Then in the Stack Management view, select "Saved Objects" under the "Kibana" heading:

!['Screenshot of Kibana Stack Management with "Saved Objects" highlighted']({{site.baseurl}}/assets/images/content/kibana_select_saved_objects.png)

From the Saved Objects screen, you can search for the Visualizations or
Searches you've previously saved. The example belows shows the ones with "PeterB"
in the name:

!['Screenshot of Kibana View Saved Objects with "Export 7 Objects" highlighted']({{site.baseurl}}/assets/images/content/kibana_view_saved_objects.png)

From that screen you can export all the matching objects as a single `export.ndjson` file,
or as individual `.ndjson` files:

!['Screenshot of Kibana export single selected object']({{site.baseurl}}/assets/images/content/kibana_export_single_object.png)



**Importing saved objects into Opensearch**

Once you've exported the objects as `.ndjson` files, switch to OpenSearch, then:

* From the LeftNav menu, select, "Management -> Dashboards Management"
* On the"Dashboards Management" window, select "Saved Objects" on the left menu
* Then select "Import" on the upper right corner.
* On the "Import saved objects" window:
  * Select the file to upload
  * For "Import options" select:
    * "Check for existing objects"
    * "Request action on conflict"
  * The click the "Import" button, as show below: ![Screenshot of Import saved objects, with selections as described]({{site.baseurl}}/assets/images/content/opensearch-import-saved-objects.png)
  * If the import results in an "Overwrite index-pattern" dialog, you will likely want to "Skip" the overwrite: ![Screenshot of Overwrite index-pattern with "Skip" selected]({{site.baseurl}}/assets/images/content/opensearch-import-overwrite-dialog.png)
  * When the import is complete, click "Done"


**Recovering Saved Searches and Visualizations after Kibana decomissioning**: If you missed migrating a Saved Object
from Kibana to OpenSearch, and Kibana is no longer available,
please contact [Cloud.gov Support](mailto:support@cloud.gov).
We have saved all customer objects and can recover those for you.


### Compare the two systems

The Cloud.gov team encourages to you explore the OpenSearch system and compare
your findings to Kibana. If you suspect that any log messages are missing. 
- Customization migration
- Bookmarks

## System differences


Index exhaustion fixed
Handling large (over 32kb) messages
AWS Service Logging
Retention


> @peterb another new thing in opensearch, the new cpu_entitlement metric. the meaning of the metric is discussed here: https://www.cloudfoundry.org/blog/better-way-split-cake-cpu-entitlements/ it basically is a better way for customers to track whether they're exceeding the allowed CPU for their app and borrowing CPU cycles from the host VM

## User interface changes

- How to change your homedashboard
- How to graph metrics



## Reporting Issues and Getting Help

## Coming soon

- Alerting

