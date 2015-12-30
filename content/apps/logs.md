---
menu:
  main:
    parent: apps
title: Logs
weight: 80
---

The most direct way to view events related to your application through the deploy process is `cf logs APPNAME`. Used alone, `cf logs` will tail the combined stream of logs from each Cloud Foundry service involved in your application deploy. Running with the recent flag as in `cf logs APPNAME --recent` will stream the entire loggregator buffer for your app.

## Log types

**API:**
Calls to stop, start and update the application. Exit status of errors reported by the DEA.

**App:**
Stdout and stderr of the application start command.

**DEA:**
Responses to API stop, start and update calls.

**RTR:**
Responses to clients requests made to the application route.

**STG:**
Buildpack activity.

## Log format

Each line of log output has the following format: A timestamp, the source service / instance the type of output (OUT/ERR) and finally the output detail.

  	Timestamp                   Svc/Ins      Type      Detail
  	2015-01-01T00:00:00.00-0400 [XXX/N]      OUT/ERR   ...

## Example log

  	2015-03-16T17:37:47.82-0400 [DEA/1]      OUT Starting app instance (index 0) with guid GUID
  	2015-03-16T17:37:50.85-0400 [DEA/1]      ERR Instance (index 0) failed to start accepting connections
  	2015-03-16T17:37:53.54-0400 [API/0]      OUT App instance exited with guid GUID0 payload: {"cc_partition"=>"default", "droplet"=>"GUID0", "version"=>"GUID1", "instance"=>"GUID2", "index"=>0, "reason"=>"CRASHED", "exit_status"=>127, "exit_description"=>"failed to accept connections within health check timeout", "crash_timestamp"=>1426541870}
