---
menu:
  main:
    parent: getting-started
title: Your First Deploy
weight: -30
---

To get used to Cloud Foundry, we recommend that you practice by deploying a simple application before moving into deploying something for production. This was originally written as an outline for live training, so will be expanded over time.

The first thing to know is that cloud.gov is a stock instance of Cloud Foundry, so [the general Cloud Foundry documentation](http://docs.cloudfoundry.org), Stack Overflow questions, etc. should mostly be applicable.

## Deploying

1. [Go through the setup.]({{< relref "setup.md" >}})
1. [Deploy a "hello world" application.](https://github.com/18F/cf-hello-worlds#readme)
1. Tweak the app (without committing) and re-`push`.

## Explanation of the magic

* [Concepts]({{< relref "concepts.md" >}})
* Routing and what that means in terms of DNS/requests
    * [Custom domains]({{< relref "apps/custom-domains.md" >}})
* Packaging up the app (based on what's in that directory, so commit your code!)

## Caveats

* Don't write to local storage (it's ephemeral) – use S3 [service]({{< relref "apps/managed-services.md" >}}) instead
* Assets must be precompiled
* Instances will be restarted if they exceed [memory limits]({{< relref "apps/limits.md" >}})
* Proper [logging]({{< relref "apps/logs.md" >}}) might require special libraries/configuration for your app
* [`.gitignore`/`.cfignore`]({{< relref "apps/deployment.md#exclude-files" >}})

## Other stuff you might need to do

* [Continuous deployment]({{< relref "apps/continuous-deployment.md" >}})
* Connecting to a [service]({{< relref "apps/managed-services.md" >}})
    * [Databases]({{< relref "apps/databases.md" >}})
* Rollback
    * Just `checkout` the old version and `cf-push`
* [One-off commands]({{< relref "getting-started/cf-ssh.md" >}})
* Deleting an application

## Useful links

* [EPA training notes](https://docs.google.com/document/d/1HOWUV_cqwyfOXJ_2ssb_FU7pdHjhQGmvi1OKxxN0aCc/edit)
* [@mhz's notes from one of the sessions](https://docs.google.com/document/d/10Ql-HrxVOm7KHld48HiZMSdONuy2TTUnB-bYVna8wz4/edit)
