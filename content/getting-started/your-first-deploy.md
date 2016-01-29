---
menu:
  main:
    parent: getting-started
title: Your First Deploy
weight: 0
---

To get used to Cloud Foundry, we recommend that you practice by deploying a simple application before moving into deploying something for production. This was originally written as an outline for live training, so will be expanded over time.

The first thing to know is that cloud.gov is a stock instance of Cloud Foundry, so [the general Cloud Foundry documentation](http://docs.cloudfoundry.org), Stack Overflow questions, etc. should mostly be applicable.

## Deploying

1. Go through the [setup]({{< relref "setup.md" >}}).
1. Follow instructions at [github.com/18F/cf-hello-worlds](https://github.com/18F/cf-hello-worlds#readme).
1. Tweak the app (without committing) and re-`push`.

## Explanation of the magic

* [Concepts]({{< relref "concepts.md" >}})
* Routing and what that means in terms of DNS/requests
    * ELBs
    * [Custom domains]({{< relref "apps/custom-domains.md" >}})
* Packaging up the app (based on what’s in that directory, so commit your code!)

## Caveats

* Don’t write to local storage (it’s ephemeral)
* Assets must be precompiled
* Instances will be restarted if exceed memory usage
* Proper logging might require extra libraries for your app
* [`.gitignore`/`.cfignore`]({{< relref "apps/deployment.md#exclude-files" >}})

## Other stuff you might need to do

* [Continuous deployment]({{< relref "apps/continuous-deployment.md" >}})
* Connecting to a service? (or just a RDS example for now)
    * [Databases]({{< relref "apps/databases.md" >}})
* Deploying with zero downtime by flipping between 2 apps?
    * [Blue-green deployments](http://docs.pivotal.io/pivotalcf/devguide/deploy-apps/blue-green.html)
* Rollback?
    * Just `checkout` the old version and `cf-push`
* [one-off commands]({{< relref "getting-started/cf-ssh.md" >}})
* Delete application

## Useful links

* [EPA training notes](https://docs.google.com/document/d/1HOWUV_cqwyfOXJ_2ssb_FU7pdHjhQGmvi1OKxxN0aCc/edit)
* [@mhz's notes from one of the sessions](https://docs.google.com/document/d/10Ql-HrxVOm7KHld48HiZMSdONuy2TTUnB-bYVna8wz4/edit)
