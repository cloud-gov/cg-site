---
layout: post
title: "Troubleshooting SSH Connections"
date: May 17, 2021
excerpt: Some tips and tricks for logging into app instances using SSH
---

**UPDATE: As of November 28, 2022, cloud.gov only supports connecting to applications using SSH over port 2222. It is no longer possible to use port 22 to connect to applications over SSH.**

This post will help you troubleshoot issues when [connecting to your app using SSH](https://docs.cloudfoundry.org/devguide/deploy-apps/ssh-apps.html).

Some things to check:

* Check which version of the `cf` CLI tool you are using. The approaches listed below may vary based on whether you are using v6 or v7 of the CLI tool.
* Make sure you have SSH access enabled. You can check to see if SSH is enabled by running `cf ssh-enabled APP_NAME`. Enable it by running `cf enable-ssh APP_NAME`.
* If you recently enabled SSH access to your application using the approach above, ensure that you have also run `cf restart APP_NAME` so that the changes can take effect.
* Make sure you are not in an environment that blocks outgoing traffic on port 2222 (the default port for `cf ssh` traffic). Some offices or corporate locations may block traffic on this port.

### Working around port blocking

`cf ssh` uses port 2222. If your network blocks port 2222, you may receive an error message such as `Error opening SSH connection` or `psql: could not connect to server: Connection refused`.

It is possible your internet service provider or network provider will block traffic on port 2222. You can work around this by using a VPN (like the GSA VPN) or using a native ssh client and following the instructions below.

1. Retrieve the APP_GUID for your app: `cf app APP_NAME --guid`.
2. Retrieve a one-time ssh passcode using `cf ssh-code`. You will be prompted for this code below.
3. Use `ssh` (not `cf ssh`) to connect to your app container. Substitute the value for your APP_GUID: `ssh -p 22 cf:APP_GUID/0@ssh.fr.cloud.gov`. You will be prompted to enter a password. Use the one-time ssh passcode you generated in step 2.

This will open an ssh connection using port 22 to your app instance with index of 0. If you need to connect to a different instance, replace the `0` in the command above.

Note - If this approach does not work for you, and you see an error that says **Permission denied, please try again.**, then you should review the section below on changes to your application in the CAPI.

### Changes to your app in the CAPI

If you are still experiencing trouble connecting to your app using SSH, it may be the result of some changes in a newer version of the Cloud Foundry API (CAPI). In prior versions of the CAPI, app instances used a single process. In version 3 of the CAPI, there can be more than 1 process that makes up an app. This may occasionally cause issues when trying to SSH to your app.

If a modification or update was made to an app using a v3 command or process - even if that change was made by someone else (e.g., another member of a development team) - the app’s schema in the Cloud Controller might have changed to version 3, and a standard cf ssh may no longer work.

#### Using v6 of the cf CLI

If this occurs and you are using v6 of the `cf` CLI, you can try using `cf v3-ssh {app-name}`. By default a cf v3-ssh will select the `web` process. You can also select a different process if needed with v3-ssh using the `--process` flag.

You may also want to upgrade your version of the CLI tool. [v7 of this tool](https://github.com/cloudfoundry/cli/wiki/V7-CLI-Installation-Guide) automatically connects to the `web` process.

#### Using other utilities

If you need to use a tool like `scp` or a native `ssh` utility to connect to your application instance, you may need to take a slightly different approach. You want to obtain the GUID for the **web** process for your application.

1. Retrieve the PROCESS_GUID for the web process for your app: `cf curl /v3/apps/$(cf app APP_NAME --guid)/processes | jq --raw-output '.resources | .[] | select(.type == "web").guid'` (note - assumes that you have [jq installed](https://stedolan.github.io/jq/)).

(The remaining steps are identical to those listed in the prior section, except instead of using the APP_GUID, you will use the PROCESS_GUID you just identified to connect to your application.)

2. Retrieve a one-time ssh passcode using `cf ssh-code`. You will be prompted for this code below.
3. Use `ssh` (not `cf ssh`) to connect to your app container. Substitute the value for your APP_GUID: `ssh -p 22 cf:PROCESS_GUID/0@ssh.fr.cloud.gov`. You will be prompted to enter a password. Use the one-time ssh passcode you generated in step 2.
