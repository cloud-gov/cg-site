---
menu:
  docs:
    parent: apps
title: Deployment troubleshooting
linktitle: Troubleshooting
weight: 100
---

Here are some common problems and recommended practices for solving them. Make sure to [look at the logs]({{< relref "logs.md" >}}) to help troubleshoot.

## [STG] Staging Phase

### App dependency specification

Dependencies are resolved during staging. For information beyond what's presented in `cf logs`, use the the verbose logging option for your buildpack if available.

For example, `cf set-env APPNAME VERBOSE true` enables verbose logging for the default node.js buildpack.

### App size and build complexity

- Pushed application files must total less than 1GB. Use `.cfignore` to specify files which should be excluded from the push.
- The combined size of application files and the specified buildpack must total less than 1.5GB.
- The entire compiled droplet must total less than 4GB.
- Staging must complete within 15 minutes and application must start within 5 minutes by default.

### Buildpacks used

Cloud Foundry will attempt to detect the buildpack to use with your app by examining the application files. Use the `buildpack:` key in your manifest to specify a native buildpack by name or a custom buildpack by providing a URL. Override the buildpack setting and detection with the `-b` command line switch, which takes the same arguments.

### Python dependency errors

If you're seeing errors installing any Python dependencies, check whether you have a `vendor/` directory in your app's root. The Python buildpack won't use PyPI if you have a `vendor/` directory, so you'll need to rename that directory to something else.

## [DEA] Droplet Execution Phase

### App manifest contents

When starting multiple apps via a single manifest tree, apps will start in the order they are encountered. Ensure worker apps running queues or migrations start before the apps which depend on them.

### Command line options to cf push

By default, an application will start with a command specified by its buildpack. The `command:` in an application manifest will override the buildpack start command. The `-c` switch used with `cf push` overrides both the buildpack and manifest start commands.

Application start commands are cached during staging. Specifying a start command via `-c` does not update the staged command. Check the staged command with `cf files APPNAME app_staging.yml`. Specifying `-c 'null'` forces the buildpack start command to be used.

### Environment variables and service bindings

- Apps must listen on the port specified in the `PORT` environment variable.
- Environment variables are updated when the app is staged and persist between application restarts. Be sure to run `cf restage` after updating variables.
- Specify services in the application manifest via the `application:key`. Bindings will be created when the application is pushed. Avoid creating bindings after the fact with `cf bind-service` as that will create a hidden dependency.
- Service instance credentials and connection parameters are stored in the JSON-formatted `VCAP_SERVICES`. The format of this variable differs between v1 and v2 services; see [this section](http://docs.cloudfoundry.org/devguide/deploy-apps/environment-variable.html#VCAP-SERVICES) of the Cloud Foundry docs for more information.
- Inspect the entire application environment including `VCAP_SERVICES` with `cf env APPNAME`.

### Application start up time

By default, applications must start within 60 seconds. This timeout can be extended to a maximum of 180 second via the `-t` command line switch or `timeout:` manifest key.

Avoid placing long-running or multi-step tasks in the application start command. Consider using worker apps as part of a multi-application manifest instead.
