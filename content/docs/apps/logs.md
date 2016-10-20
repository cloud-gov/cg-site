---
menu:
  docs:
    parent: apps
title: Logs
---

For logs to be captured by Cloud Foundry, your application should be writing them to `STDOUT`/`STDERR`, rather than a log file – see the framework-specific guidance in the menu.

## Current logs

The most direct way to view events related to your application through the deploy process is

```bash
cf logs APPNAME
```

Used alone, `cf logs` will tail the combined stream of logs from each Cloud Foundry service involved in your application deploy. Running with the `--recent` flag will stream the entire loggregator buffer for your app.

```bash
cf logs APPNAME --recent
```

### Example log

  	2015-03-16T17:37:47.82-0400 [DEA/1]      OUT Starting app instance (index 0) with guid GUID
  	2015-03-16T17:37:50.85-0400 [DEA/1]      ERR Instance (index 0) failed to start accepting connections
  	2015-03-16T17:37:53.54-0400 [API/0]      OUT App instance exited with guid GUID0 payload: {"cc_partition"=>"default", "droplet"=>"GUID0", "version"=>"GUID1", "instance"=>"GUID2", "index"=>0, "reason"=>"CRASHED", "exit_status"=>127, "exit_description"=>"failed to accept connections within health check timeout", "crash_timestamp"=>1426541870}


### See also

* [Information about the log format](https://docs.cloudfoundry.org/devguide/deploy-apps/streaming-logs.html)
* [Viewing your application's logs](https://docs.cloudfoundry.org/devguide/deploy-apps/streaming-logs.html#view)

## Historic logs

To view and search your historic log data, visit https://logs.cloud.gov. Logs are currently retained for 180 days, and you will only see data for applications deployed within the [orgs](http://docs.cloudfoundry.org/concepts/roles.html#orgs) and [spaces](http://docs.cloudfoundry.org/concepts/roles.html#spaces) where you have access.

After logging in, you will be placed into the 'App Overview' dashboard.

![App Overview dashboard](/img/app-overview-450.png)

If you would like to change the time period of data that you are viewing, or to turn on auto-refresh, click on the time period you are currently viewing the top menu. The default time period is 'Last 15 minutes'.

![Time period selection](/img/time-period-450.png)

We have also provided several dashboards that present different visualizations of your log data. You can select these by clicking on the 'Load Saved Dashboard' icon near the search bar.

![Select dashboards](/img/select-dashboard-450.png)

These visualizations are provided via Kibana; you may want to [find out more about it](https://www.elastic.co/guide/en/kibana/current/index.html).
