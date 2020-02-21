---
parent: deployment
layout: docs
sidenav: true
title: Troubleshooting
redirect_from: 
    - /docs/apps/troubleshooting/
linktitle: Troubleshooting
weight: 100
---

Seeing problems with your applications? Take a look at [your app logs]({{ site.baseurl }}{% link _docs/deployment/logs.md %}) and [review these common issues and solutions](https://docs.cloudfoundry.org/devguide/deploy-apps/troubleshoot-app-health.html).

## Application restarts and crash messages

The platform [automatically restarts application instances]({{ site.baseurl }}{% link _docs/deployment/deployment.md %}#application-architecture-principles) due to routine platform updates, which can be several times a week. If you review logs for an app that is functioning normally and you see recent messages about a series of instance restarts for no apparent reason, platform updates are probably the reason. This is normal and ok!

If you see recent messages such as `The app crashed because of an unknown reason.` and `audit.app.process.crash isn't handled`, this may be because your application didn't stop on request. The platform sends a request to apps to stop nicely so the platform can move them while this happens, but when they don't stop on request, the platform force-kills them, reports them as crashed, and moves them anyway. Usually this doesn't cause interruptions in service, just a few crash messages. To prevent the error messages, you can change your application to [stop gracefully]({{ site.baseurl }}{% link _docs/deployment/production-ready.md %}#graceful-shutdown). In the recommended [12-factor app architecture](https://12factor.net/), see the [disposability factor](https://12factor.net/disposability).

If your application only has one instance, you may see brief interruptions in service during restarts due to routine platform updates. You can fix this by setting up [multiple application instances]({{ site.baseurl }}{% link _docs/management/multiple-instances.md %}).

## Potential causes of issues during staging phase ([STG])

If you see problems in your logs in lines that include the label `[STG]`, these explanations may help you resolve them.

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

## Potential causes of issues during app starting/stopping [CELL]

If you see problems in your logs in lines that include the label `[CELL]`, these explanations may help you resolve them.

### App manifest contents

When starting multiple apps via a single manifest tree, apps will start in the order they are encountered. Ensure worker apps running queues or migrations start before the apps which depend on them.

### Command line options to cf push

By default, an application will start with a command specified by its buildpack. The `command:` in an application manifest will override the buildpack start command. The `-c` switch used with `cf push` overrides both the buildpack and manifest start commands.

Application start commands are cached during staging. Specifying a start command via `-c` does not update the staged command. Check the staged command with `cf ssh APPNAME -c "cat staging_info.yml"`. Specifying `-c 'null'` forces the buildpack start command to be used.

### Environment variables and service bindings

- Apps must listen on the port specified in the `PORT` environment variable.
- Environment variables are updated when the app is staged and persist between application restarts. Be sure to run `cf restage` after updating variables.
- Specify services in the application manifest via the `application:key`. Bindings will be created when the application is pushed. Avoid creating bindings after the fact with `cf bind-service` as that will create a hidden dependency.
- Service instance credentials and connection parameters are stored in the JSON-formatted `VCAP_SERVICES`. The format of this variable differs between v1 and v2 services; see [this section](http://docs.cloudfoundry.org/devguide/deploy-apps/environment-variable.html#VCAP-SERVICES) of the Cloud Foundry docs for more information.
- Inspect the entire application environment including `VCAP_SERVICES` with `cf env APPNAME`.

### Application start up time

By default, applications must start within 60 seconds. This timeout can be extended to a maximum of 180 second via the `-t` command line switch or `timeout:` manifest key.

Avoid placing long-running or multi-step tasks in the application start command. Consider using worker apps as part of a multi-application manifest instead.
