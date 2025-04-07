---
layout: post
title: "OpenSearch Alerting"
date: April 7th, 2025
excerpt: How to setup alerting for your applications on Cloud.gov using OpenSearch
---

# OpenSearch Alerting

## Access Criteria

We have configured OpenSearch so users who share all backend roles with the creator of them can see the alerts and notifications. If you share some but not all backend roles the config name of the notification and alerts will show up but not the info behind them.

### Setting up a Notification

To setup a notification you need to setup an email group and channel.

#### Making an Email Receipient group

1. From the OpenSearch navigation menu, select **Nofitifcations** under **Managemenet**
2. Select **Email recipient groups**
3. Click **Create recipient Group**
4. Enter a meaningful name description. In the email textbox, add the email addresses that you wish to be included in the group.

#### Setting up a Notificaiton channel

1. From the OpenSearch navigation menu, select **Nofitifcations** under **Managemenet**
2. Choose **Channels**
3. Click **Create channel**
4. Provide a name and description for the channel.
5. Under **Channel Type** select email (Note: Cloud.gov does not support other channel types)
6. Under **SMTP sender** choose **cloudgovemail**
7. Under **default recipients** put the chosen email group you created earlier.

### Setting up for alerts.

To create an **alert**, you must first create a monitor that will trigger the alert when the speicifed conditions are met.

#### Creating a monitor

A monitor allows you to specify multiple conditions, and it can send alerts to different notification channels based on those conditions.

1. From the OpenSearch navigation menu, select **Alerting** under **OpenSearch Plugins**
2. Select **Monitors**, then click **Create Monitor**
3. Give the monitor a descriptive name.
4. Choose a monitor type from the list of available options below.

##### Supported Monitor Types

a. **per query**: Runs a query and generates alert notifications based on the matching criteria. See [Per query monitors](https://OpenSearch.org/docs/latest/observing-your-data/alerting/per-query-bucket-monitors/) for information about creating and using this monitor type.
b. **per document**: Runs a query (or multiple queries combined by a tag) that returns individual documents that match the alert notification trigger condition. See [Per document monitors](https://OpenSearch.org/docs/latest/observing-your-data/alerting/per-document-monitors/) for information about creating and using this monitor type.
c. **composite monitor**: Runs multiple monitors in a single workflow and generates a single alert based on multiple trigger conditions. See [Composite monitors](https://OpenSearch.org/docs/latest/observing-your-data/alerting/composite-monitors/) for information about creating and using this monitor type.

5. Select the desired timeframe under **Schedule**
6. Under **index** put "logs-app-\*" (this will put a wildcard to match index pattern)
7. Fill out **Query** refereeing to Monitor Types for your chose monitor
8. Create a **Trigger**, this can be for any alert condition or specific queries/tags.
9. Under **Actions** fill out notification info. 10. when Trigger is activated next it will notify users.
