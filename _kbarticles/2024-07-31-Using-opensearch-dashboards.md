---
layout: post
title: "Understanding Opensearch Dashboards, logging and how to visualize your application logs"
date: July 31, 2024
excerpt: This article briefly explains what opensearch dashboards does, what types of logs are available in Dashboards, creating dashboards, and how to create log visualizations in Dashboards.
---

## What does Dashboard do?

Dashboard is a user interface that lets you search and visualize your application logs. Dashboard has a [user guide](https://opensearch.org/docs/latest/dashboards/) that explains more about how to use it and to create custom visualizations.

## What are some types of logs?

Cloud Foundry assigns a type to each log message depending on its origin. Application logs are assigned the APP log type. HTTP requests being routed to an app will produce the RTR log type. The various types of logs are listed in the documentation [here](https://docs.cloudfoundry.org/devguide/deploy-apps/streaming-logs.html#format).

Cloudfoundry logs are often translated into field names in Opensearch/Dashboards using the log type as a prefix. For example, APP logs in Dashboards include fields like `app.name` for the application name.

## Querying Logs

Cloudfoundry logs have a few useful fields which will be helpful for querying logs.
Cloudfoundry has 3 fields that can be very helpful to filter down what app logs show up.
@cf.org - The organization, this is applicable to multi-org users
@cf.space - The space in a organization.
@cf.app - The app in a space.

For further query
@message - the app specific message attached to the log
@raw - the entire log, useful when looking for cloudfoundry specific values, when looking for app use @message

## How to visualize application traffic

Router log data can be used to create a visualization of your application traffic following the steps below.

After you have logged into Dashboard, click "Discover" in the left sidebar menu. Then, add filters(under search bar) and search terms to query for router logs as seen in the screenshot below. Please note that the filters shown here for a specific space and application are just an example. You might want to view logs for all requests to application in a given space, in which case you would not want a filter for `@cf.app`.

![Screenshot of Dashboard interface showing a query for router logs for a given CloudFoundry space and application]({{ site.baseurl }}/assets/images/content/dashboard-router.png)

The next step is to visualize your search results based on a specific field. To visualize request logs over time, choose the `@timestamp` field from the left sidebar of "Available fields". Then, click "Visualize".

![Screenshot of Dashboards interface showing the selection of @timestamp as field to use for visualizing request logs]({{ site.baseurl }}/assets/images/content/opensearch-timestamp.png)

By default, visualizing logs based on `@timestamp` will produce a histogram chart. To change the chart type to line, which might be more useful for this type of data, click the "Metrics & axes" link in the chart configuration panel on the right side of the screen. Then, under "Metrics" and "Count", select "Line" from the "Chart type" drop-down. Finally, click the "Update" button at the bottom right of the screen and the chart should update to a line chart.

![Screenshot of Dashboards visualization interface showing a line chart of requests over time with a panel for chart configuration options visible on the right side of the screen. In the chart configuration options, "line" is selected as the chart type]({{ site.baseurl }}/assets/images/content/dashboard-line.png)

## Fields for router requests

Listed below are the explanations of some field names for router (RTR) logs:

- **rtr.app.id**: The application guid
- **rtr.hostname**: The domain/hostname the request was sent to (e.g test.app.cloud.gov)
- **rtr.http_user_agent**: What user agent the request came from (Chrome, Firefox, Curl, etc…)
- **rtr.path**: The specific url path that was requested (e.g. /my/test/page)
- **rtr.status**: Gives the status of the request (200, 404, etc…)
- **rtr.verb**: The type of request (POST, GET, etc...)
- **rtr.x_forwarded_for**: The IP address the request came from
- **rtr.timestamp**: The time of the request in UTC

The full list of fields available for router logs can be found in [our Opensearch field mapping configuration](https://github.com/cloud-gov/opensearch-boshrelease/blob/5100229e391237f4a41df023338a247c55276ee8/jobs/opensearch_templates/templates/component-index-mappings-app.json.erb#L44).
