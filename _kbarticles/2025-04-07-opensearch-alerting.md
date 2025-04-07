---
layout: post
title: "Opensearch Alerting"
date: April 7th, 2025
excerpt: How to setup alerting for your applications on Cloud.gov using OpenSearch
---

# Opensearch Alerting

## Access Criteria

We have configured Opensearch so users who share all backend roles with the creator of them can see the alerts and notifications. If you share some but not all backend roles the config name of the notification and alerts will show up but not the info behind them.

### Setting up a Notification

To setup a notification you need to setup an email group and channel.

#### Making an email group

1. From the opensearch hamburger menu, select **Nofitifcations** under **Managemenet**
2. select **Email recipient groups**
3. **Create recipient Group**
4. Give it a useful name and description, the email textbox should be filled out with the emails you want in the group

#### Setting up a channel

1. From the opensearch hamburger menu, select **Nofitifcations** under **Managemenet**
2. select **Channels**
3. **Create channel**
4. Give it a useful name and description.
5. Under **Channel Type** select email (**Cloud.gov does not support other channel types**)
6. Under **SMTP sender** choose **cloudgovemail**
7. Under **default recipients** put the chosen email group

### Setting up for alerting.

To Make an alert you need to first create a monitor to trigger the creation of an alert.

#### Create a monitor

A monitor can have multiple conditions it alerts on and can send alerts to different notifications based on conditions.

1. From the opensearch hamburger menu, select **Alerting** under **OpenSearch Plugins**
2. select **Monitors** then **Create Monitor**
3. Give it a useful name
4. Choose a monitor type from the options below.

##### Supported Monitor Types

a. **per query**: Runs a query and generates alert notifications based on the matching criteria. See [Per query monitors](https://opensearch.org/docs/latest/observing-your-data/alerting/per-query-bucket-monitors/) for information about creating and using this monitor type.
b. **per document**: Runs a query (or multiple queries combined by a tag) that returns individual documents that match the alert notification trigger condition. See [Per document monitors](https://opensearch.org/docs/latest/observing-your-data/alerting/per-document-monitors/) for information about creating and using this monitor type.
c. **composite monitor**: Runs multiple monitors in a single workflow and generates a single alert based on multiple trigger conditions. See [Composite monitors](https://opensearch.org/docs/latest/observing-your-data/alerting/composite-monitors/) for information about creating and using this monitor type. 5. Select the desired timeframe under **Schedule** 6. under **index** put "logs-app-\*" (this will put a wildcard to match index pattern) 7. Fill out **Query** refereeing to Monitor Types for your chose monitor. 8. Create a **Trigger**, this can be for any alert condition or specific queries/tags. 9. Under **Actions** fill out notification info. 10. when Trigger is activated next it will notify users.
