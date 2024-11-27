---
layout: post
title: "Migrating to the OpenSearch Dashboard for Cloud.gov logs"
date: November 26, 2024
excerpt: Changes to expect in our logging system in December 2024

---

## What's Changing in December 2024

As we [announced on November 21, 2024]({{ site.base_url }}{% link _posts/2024-11-21-new-logging-system.md}), we are upgrading the Cloud.gov customer application logging system and the user interface
at https://logs.fr.cloud.gov. The application logs interface prior to December 2024
was based on [_Kibana_](https://www.elastic.co/kibana), and we are migrating to one based on [_OpenSearch Dashboards_](https://www.opensearch.org/docs/latest/dashboards/). 

While all the underlying functionality is unchanged, or improved, there are some 
differences between Kibana (old) and OpenSearch (new), which we'll outline here:


## Authentication and Tenancy Changes

<!-- >
In a cloud system like Cloud.gov, "tenancy" is used to describe the sharing of resources between 
the different users, or "tenants" of a system. As an analogy to the physical world, if you are a tenant of a
large apartment build, do you ever see the other tenants? Do you have to wait for an elevator because
another tenant is using it? Or do you ever run out of hot water in the shower?
-->

The first time you log in to the OpenSearch-based system you'll be presented
with the following Application Authorization dialog:

!['Screenshot of dialog box titled - Application Authorization: opensearch_dashboards_proxy - with boxes checked for "Access profile", "View details of your applications and services" and "Read all SCIM entries". The options are "Authorize" or "Deny"']({{site.baseurl}}/assets/images/content/opensearch-app-auth-dialog.png)

You'll need to accept all the scopes. The If you need to revoke access later, you can do so at: https://login.fr.cloud.gov/profile. 


Logging in to the new system
- First time
  - Accept Scopes
- Future times

## Migration

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


## Managed Information Security

