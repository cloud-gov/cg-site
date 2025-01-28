---
layout: post
title: "Migrating to the OpenSearch Dashboard for Cloud.gov logs"
date: December 6, 2024
excerpt: Changes to expect in our logging system in December 2024

---

## What's Changing in December 2024

As we [announced on November 21, 2024]({{site.base_url}}{% link _posts/2024-11-21-new-logging-system.md %}),
we are upgrading the Cloud.gov customer application logging system and the user interface
at <https://logs.fr.cloud.gov>. The application logs interface prior to December 2024
was based on [_Kibana_](https://www.elastic.co/kibana), and we are migrating to one
based on [_OpenSearch Dashboards_](https://www.opensearch.org/docs/latest/dashboards/).

While all the underlying functionality is unchanged, or improved, there are some
differences between Kibana (old) and OpenSearch (new), which we'll outline here.

**Note: You will need to [migrate your saved objects](#migrating-kibana-customizations-to-opensearch)** (searches, visualizations) from Kibana
to OpenSearch before January 7, 2025. After that date, importing objects will require a support request.

## Logging in to the new system

The first time you log in to the OpenSearch-based system you'll be presented
with the following OpenId "Application Authorization" dialog:

!['Screenshot of dialog box titled "Application Authorization: opensearch_dashboards_proxy" with boxes checked for "Access profile", "View details of your applications and services" and "Read all SCIM entries". The options are "Authorize" or "Deny"']({{site.baseurl}}/assets/images/content/opensearch-app-auth-dialog.png)

You'll need to accept all the scopes. If for some reason you need to revoke
access later, you can do so at: <https://login.fr.cloud.gov/profile>

You'll then need to choose the Cloud.gov org you want to work with in the "Select you Tenant" dialog:

!['Screenshot of dialog box titled "Select your tenant"']({{site.baseurl}}/assets/images/content/opensearch_select_tenant.png)

If you have access to multiple orgs, you can switch your tenant later by clicking the OpenSearch user avatar on top right.

The main OpenSearch Dashboard should resemble the Kibana dashboard. If you're provided a 
Dashboard selection screen (see below), choose "App - Overview".  

!['Screenshot of dialog box titled "Dashboards"']({{site.baseurl}}/assets/images/content/opensearch_choose_dashboard.png)

Otherwise the main navigation menus should be familiar and you're now ready to explore your Cloud.gov logs with OpenSearch.

## Migrating Kibana customizations to OpenSearch

All of the application and CloudFoundry logs that have been available in Kibana
will be available to you in OpenSearch. You needn't take any action to ensure that.
You will need to migrate custom dashboards and saved searches by exporting them
from Kibana and importing them into OpenSearch.

### Export Saved Objects from Kibana

In Kibana, use the left navigation menu to select "Management" -> "Stack Management":

!['Screenshot of Kibana leftnav with "Stack Management" highlighted']({{site.baseurl}}/assets/images/content/kibana_select_stack_mgmt.png)

Then in the Stack Management view, select "Saved Objects" under the "Kibana" heading:

!['Screenshot of Kibana Stack Management with "Saved Objects" highlighted']({{site.baseurl}}/assets/images/content/kibana_select_saved_objects.png)

From the Saved Objects screen, you can search for the visualizations or
searches you've previously saved. From that screen you can export all the matching objects as a single `export.ndjson` file (as shown below),
or as individual `.ndjson` files:


!['Screenshot of Kibana View Saved Objects with "Export 7 Objects" highlighted']({{site.baseurl}}/assets/images/content/kibana_view_saved_objects.png)

### Importing saved objects into OpenSearch

**If you used the same saved object in Kibana across multiple Cloud.gov orgs**,
you will need to import it into each OpenSearch tenant (each tenant corresponds to a Cloud.gov Cloud Foundry "org").

Once you've exported the objects as `.ndjson` files, switch to OpenSearch, then:

* From the LeftNav menu, select, "Management -> Dashboards Management".
* On the "Dashboards Management" window, select "Saved Objects" on the left menu.
* Then select "Import" on the upper right corner.
* On the "Import saved objects" window:
  * Select the file to upload
  * For "Import options" select:
    * "Check for existing objects"
    * "Request action on conflict"
  * The click the "Import" button, as show below: ![Screenshot of Import saved objects, with selections as described]({{site.baseurl}}/assets/images/content/opensearch-import-saved-objects.png)
  * If the import results in an "Overwrite index-pattern" dialog, you will likely want to "Skip" the overwrite: ![Screenshot of Overwrite index-pattern with "Skip" selected]({{site.baseurl}}/assets/images/content/opensearch-import-overwrite-dialog.png)
  * When the import is complete, click "Done"



### Recovering Saved Searches and Visualizations after Kibana decomissioning

If you missed migrating a Saved Object
from Kibana to OpenSearch, and Kibana is no longer available,
please contact [Cloud.gov Support](mailto:support@cloud.gov).
We have saved all customer objects and can recover those for you.

## User interface changes

The screenshot below show some of the major changes to the user interfaces, such as:

1. The drop down menus have moved from the upper left to the upper right.
2. The "Top 5 values" for a field view is now an option to the right of the field, instead of a double-click.
3. There are a lot more values gathered for container metrics (see below) so you may notice a higher message count in OpenSearch.

![Screenshot comparing Kibana to OpenSearch]({{site.baseurl}}/assets/images/content/opensearch-ui-differences.png)

## Key system differences

The Cloud.gov team has implemented OpenSearch to deliver a number of benefits to our customers. Among these are:

* Twelve months of live access to system logs, in alignment with [M-21-31](https://bidenwhitehouse.archives.gov/wp-content/uploads/2021/08/M-21-31-Improving-the-Federal-Governments-Investigative-and-Remediation-Capabilities-Related-to-Cybersecurity-Incidents.pdf).
* Definitions of saved searches and visualizations are now isolated by OpenSearch tenants that correspond to Cloud.gov organizations.
  * You no longer need to worry about choosing a globally unique name.
  * If you share the same saved object across multiple orgs, you will need to import it into each of your orgs.
* Better handling of large log messages. Both Kibana/ELK and OpenSearch have a 32kb limit on message size. The older system dropped such messages from Kibana (although they were still retained in cold storage), the newer system, for JSON messages, keeps the first 32kb and discards the rest
  * Truncated messages are tagged with `_messagetrimmed`.
  * Extremely large log messages (over 1Mb) are trimmed and tagged `_logtrimmed` -- such message are probably indicative of a coding error in your application.
  * You can search for such messages with a filter of `@logs is one of "_messagetrimmed", "_logtrimmed"`, as shown here
  ![Screenshot from OpenSearch edit filter with settings as described above]({{site.baseurl}}/assets/images/content/opensearch-logtrimmed.png)
* AWS Brokered Service Logs (Beta): If your Cloud.gov organization had already worked with Cloud.gov support to enable publishing of your RDS database logs to Cloudwatch, then you can search for those logs with the filter `@version: 1`. Most databases, as of December 2024, are not yet publishing their logs to CloudWatch and thus will not appear in OpenSearch.
  * Cloud.gov will be expanding the availability of logs from other brokered services in 2025. This is a [beta feature]({{site.baseurl}}/docs/services/intro/#support-status) and subject to change.
  * Cloud.gov is working to make enabling publishing of RDS database logs to CloudWatch a self-service feature of the [database broker]({{ site.baseurl }}/docs/services/relational-database.md), but there is no ETA yet for delivery of this feature.
* JSON log parsing: Custom logs are not at risk of being dropped because of index field limits. JSON logs are now ingested using the [flat_object field type](https://opensearch.org/docs/latest/field-types/supported-field-types/flat-object/) in OpenSearch. The `flat_object` field type allows for [searching nested fields of a JSON object](https://opensearch.org/docs/latest/field-types/supported-field-types/flat-object/#using-flat-object) using dot notation.
* Additional container metrics: We now log additional container metrics, available under the `containermetric.name` field. Particularly useful is the `containermetric.name: cpu_entitlement`, which is a way to track whether you're [exceeding the allowed CPU for your apps](https://www.cloudfoundry.org/blog/better-way-split-cake-cpu-entitlements/).

## Reporting Issues and Getting Help

Report any undocumented issues you encounter, or questions you may have, to <support@cloud.gov>.


