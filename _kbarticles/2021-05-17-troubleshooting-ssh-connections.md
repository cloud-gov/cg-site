---
layout: post
title: "Troubleshooting SSH Connections"
date: May 17, 2021
excerpt: Some tips and tricks for logging into app instances using SSH
---

This post will help you troubleshoot issues when [connecting to your app using SSH](https://docs.cloudfoundry.org/devguide/deploy-apps/ssh-apps.html).

Some things to check:

* Make sure you have SSH access enabled. You can check to see of SSH is enabled by running `cf ssh-enabled APP_NAME`. Enable it by running `cf enable-ssh APP_NAME`.
* Make sure you are not in an environment that blocks outgoing traffic on port 22 (the default port for SSH traffic). Some offices or corporate locations may block traffic on this port.

If you are still experiencing trouble connecting to your app using SSH, it may be the result of some changes in a newer version of the Cloud Foundry API (CAPI). In prior versions of the CAPI, app instances used a single process. In version 3 of the CAPI, there can be more than 1 process that makes up an app. This may occasionally cause issues when trying to SSH to your app. 

If a modification or update was made to an app using a v3 command or process - even if that change was made by someone else (e.g., another member of a development team) - the app’s schema in the Cloud Controller might have changed to version 3, and a standard cf ssh may no longer work. 

If this occurs, you can try using `cf v3-ssh {app-name}`. By default a cf v3-ssh will select the `web` process. You can also select a different process if needed with v3-ssh using the `--process` flag.