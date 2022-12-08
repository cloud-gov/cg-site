---
layout: post
title: "Understanding Kibana and how to visualize your application logs"
date: December 8, 2022
excerpt: This article briefly explains what Kibana does, what types of logs are available in Kibana, and how to create log visualizations in Kibana.

---

## What does Kibana do?

Kibana is a user interface that lets you search and visualize your application logs. Kibana has a [user guide](https://www.elastic.co/guide/en/kibana/current/index.html) that explains more about how to use it and to create custom visualizations.

## What are some types of logs?

Cloud Foundry assigns a type to each log message depending on its origin. Application logs are assigned the APP log type.  HTTP requests being routed to an app will produce the RTR log type. The various types of logs are listed in the documentation [here](https://docs.cloudfoundry.org/devguide/deploy-apps/streaming-logs.html#format).

Cloudfoundry logs are often translated into field names in Elasticsearch/Kibana using the log type as a prefix. For example, APP logs in Kibana include fields like `app.name` for the application name.

## How to chart the information:

Spikes in traffic can be visualized by using the chart provided in Kibana. To find the specific information you are requesting you need to use the Discover tab to search RTR logs, and then create the chart based on the saved search. Use a count aggregation as the Y-Axis and a date histogram aggregation for the X-Axis.

## Fields for router requests

Listed below are the explanations of some field names for router (RTR) logs:

* **rtr.app.id**: The application guid
* **rtr.hostname**: The domain/hostname the request was sent to (e.g test.app.cloud.gov)
* **rtr.http_user_agent**: What user agent the request came from (Chrome, Firefox, Curl, etc…)
* **rtr.path**: The specific url path that was requested (e.g. /my/test/page)
* **rtr.status**: Gives the status of the request (200, 404, etc…)
* **rtr.verb**: The type of request (POST, GET, etc...)
* **rtr.x_forwarded_for**: The IP address the request came from
* **rtr.timestamp**: The time of the request in UTC

The full list of fields available for router logs can be found in [our Elasticsearch field mapping configuration](https://github.com/cloud-gov/logsearch-for-cloudfoundry/blob/develop/jobs/elasticsearch-config-lfc/templates/component-index-mappings-app.json.erb#L38).
