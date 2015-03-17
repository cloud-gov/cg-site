---
menu:
  main:
    parent: apps
title: Basic Deploy Troubleshooting
weight: 10
---

The most direct way to view events related to your application through the deploy process is `cf logs APPNAME`. Used alone, `cf logs` will tail the combined stream of logs from each Cloud Foundry service involved in your application deploy. Running with the recent flag as in `cf logs APPNAME --recent` will stream the entire loggregator buffer for your app.

**API:**
Calls to stop, start and udpate the application. Exit status of errors reported by the DEA.

**App:**
Stdout and stderr of the application start command.

**DEA:**
Responses to API stop, start and update calls.

**RTR:**
Responses to clients requests made to the application route.

**STG:**
Buildpack activity.

##### Log Format:

Each line of log output has the following format: A timestamp, the source service / instance the type of output (OUT/ERR) and finally the output detail. 

	Timestamp                   Svc/Ins      Type      Detail
	2015-01-01T00:00:00.00-0400 [XXX/N]      OUT/ERR   ...

**Example Log:**
	       
	2015-03-16T17:37:47.82-0400 [DEA/1]      OUT Starting app instance (index 0) with guid GUID
	2015-03-16T17:37:50.85-0400 [DEA/1]      ERR Instance (index 0) failed to start accepting connections
	2015-03-16T17:37:53.54-0400 [API/0]      OUT App instance exited with guid GUID0 payload: {"cc_partition"=>"default", "droplet"=>"GUID0", "version"=>"GUID1", "instance"=>"GUID2", "index"=>0, "reason"=>"CRASHED", "exit_status"=>127, "exit_description"=>"failed to accept connections within health check timeout", "crash_timestamp"=>1426541870}

##### Common Problems and Recommended Practices:

###### [STG] Staging Phase:
 
**Influences:**
 
App dependency specification.

- Dependencies are resolved during staging. For information beyond what's presented in `cf logs` Use the the verbose logging option for your buildpack if availble.

	For example, `cf set env APPANME VERBOSE true` enables verbose logging for the default node.js buildpack.

App size and build complexity.

- Pushed application files must total less than 1GB. Use `.cfignore` to specify files which should be excluded from the push. 
- The combined size of application files and the specified buildpack must totale less 1.5GB. 
- The entire compiled droplet must total less than 4GB.
- Staging must complete with 15 minutes and application must start within 5 minutes by default.

Buildpacks used.

- Cloud Foundry will attempt to detect the buildpack to use with your app by examining the application files in search Use the `buildpack:` key in your manifest to specify a native buildpack by name or a custom buildpack by providing a URL. Override the buildpack setting and detection with the `-b` commandline switch which takes the same arguments.

###### [DEA] Droplet Execution Phase:

**Influences:**

App manifest contents.

- When starting multiple apps via a single manifest tree apps will start in the order they are encountered. Ensure worker apps running queues or migrations start before the apps which depend on them.

Command line options to cf push. 

- By default, an application will start with a command specified by its buildpack. The `command:` in an application manifest will override the buildpack start command. The `-c` switch used with `cf push` overrides both the buildpack and manifest start commands. 

	Application start commands are cached during staging. Specifying a start command via `-c` does not update the staged command. Check the staged command with `cf files APPNAME app_staging.yml`. Specifying `-c 'null'` forces the buildpack start command to be used. 

Environment variables and service bindings.

- Apps must listen on the port specified in the `VCAP_APP_PORT` environment variable.
- Environment variables are updated when the app is staged and persist between application restarts. Be sure to run `cf restage` after updating an variables.
- Specify services in the application manifest via the `application:key`, bindings will be created when the application is pushed. Avoid creating creating bindings after the fact with `cf bind-service` as that will create a hidden dependency 
- Service instance credentials and connection parameters are stored the JSON formatted `VCAP_SERVICES`. The format of this variable differs between v1 and v2 services, see [this section](http://docs.cloudfoundry.org/devguide/deploy-apps/environment-variable.html#VCAP-SERVICES) of the Cloud Foundry docs for more information.
- Inspect the entire application environment including `VCAP_SERVICES` with `cf env APPNAME`.

Application start up time.

- By default, applications must start with 60 seconds. This timeout can be extend to a maximum of 180 second via the `-t` command line switch or `timeout:` manifest key.

	Avoid placing long running or multi-step tasks in the application start command. Consider using worker apps as part of a multi-application manifest instead.






