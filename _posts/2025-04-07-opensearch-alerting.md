---
layout: post
title: "OpenSearch Alerting"
date: April 7th, 2025
excerpt: How to setup alerting for your applications on Cloud.gov using OpenSearch
---

Opensearch Alerting has been added to Cloud.Gov opensearch, this new feature allows for users to monitor data and send alert when certain conditions or thresholds are met.

You will be able to setup monitors for different conditions using fields, this will allow you to do things such as

1. Track the metrics of your logs
2. Query based on field specific filters (size of value, contents of value,etc)
3. Write a query for a specific section of your logs in which you want to look for conditions to trigger on. (Alert on prod space only, This app only, etc)

This will allow to see if your logs have a increase in 404 messages in a certain timeframe, track log contents for certain words, etc..

## How access for OpenSearch notifications works

Most of the objects that you create in OpenSearch, such as queries, visualization, or dashboards, are only visible to other members of your OpenSearch tenant. We have configured OpenSearch to have tenants for each cloud.gov organization, meaning there is a one-to-one mapping between tenants and organizations. For whichever tenant you choose when using OpenSearch, only other members of the associated cloud.gov organization can see your objects.

Unfortunately, the OpenSearch alerting plugin [does not support the use of tenants for storing associated objects such as email recipient groups or channels](https://github.com/opensearch-project/alerting-dashboards-plugin/issues/1096).

Given the current behavior of the OpenSearch alerting plugin, to ensure maximum security we have customized OpenSearch so that **only users who share all of the same cloud.gov organizations as your user will be able to see the notification objects that you create**. If another user shares some but not all of the same cloud.gov organizations as you, the names of your notification objects will be visible to the other user, but they will not be able to see any details about those objects.

In OpenSearch 3.x, the concept of "workspaces" is going to be introduced, which may allow for a permissions model for notifications that more closely matches how we handle multi-tenancy for other OpenSearch objects.

## Setting up a Notification

To setup a notification you need to setup an email group and channel.

### Making an email recipient group

1. From the OpenSearch navigation menu, select **Notifications** under **Management**
2. Select **Email recipient groups**
3. Click **Create recipient Group**
4. Enter a meaningful name description. In the email textbox, add the email addresses that you wish to be included in the group.

### Setting up a notification channel

1. From the OpenSearch navigation menu, select **Notifications** under **Management**
2. Choose **Channels**
3. Click **Create channel**
4. Provide a name and description for the channel.
5. Under **Channel Type** select email (Note: Cloud.gov does not support other channel types)
6. Under **SMTP sender** choose **cloudgovemail**
7. Under **default recipients** put the chosen email group you created earlier.

## Setting up an alert

To create an alert, you must first create a monitor that will trigger the alert when the specified conditions are met.

### Creating a monitor

A monitor allows you to specify multiple conditions, and it can send alerts to different notification channels based on those conditions.

1. From the OpenSearch navigation menu, select **Alerting** under **OpenSearch Plugins**
2. Select **Monitors**, then click **Create Monitor**
3. Give the monitor a descriptive name.
4. Choose a monitor type from the list of available options below.

- **per query**: Runs a query and generates alert notifications based on the matching criteria. See [Per query monitors](https://OpenSearch.org/docs/latest/observing-your-data/alerting/per-query-bucket-monitors/) for information about creating and using this monitor type.
- **per document**: Runs a query (or multiple queries combined by a tag) that returns individual documents that match the alert notification trigger condition. See [Per document monitors](https://OpenSearch.org/docs/latest/observing-your-data/alerting/per-document-monitors/) for information about creating and using this monitor type.
- **composite monitor**: Runs multiple monitors in a single workflow and generates a single alert based on multiple trigger conditions. See [Composite monitors](https://OpenSearch.org/docs/latest/observing-your-data/alerting/composite-monitors/) for information about creating and using this monitor type.

5. Select the desired timeframe under **Schedule**
6. Under **index** put "logs-app-\*" (this will put a wildcard to match index pattern)
7. Fill out **Query** refereeing to Monitor Types for your chose monitor
8. Create a **Trigger**, this can be for any alert condition or specific queries/tags.
9. Under **Actions** fill out the notification info.
10. When the trigger is activated next, it will notify users.
