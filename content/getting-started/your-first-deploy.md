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

Note that the changes will be reflected in Cloud Foundry even without being committed to Git. Cloud Foundry is not Git-aware – it simply deploys whatever is contained in the directory that you `push` from. That being said, you _can_ set up [continuous deployment]({{< relref "apps/continuous-deployment.md" >}}) from a Git repository.

Once you're ready to deploy your own application, head over to the [general deployment tips]({{< relref "apps/deployment.md" >}}).

## Explanation of the magic

Take a look at the [Concepts]({{< relref "concepts.md" >}}) page.

## Caveats

* Don't write to local storage (it's ephemeral) – use S3 [service]({{< relref "apps/managed-services.md" >}}) instead
* Instances will be restarted if they exceed [memory limits]({{< relref "apps/limits.md" >}})
* Proper [logging]({{< relref "apps/logs.md" >}}) might require special libraries/configuration for your app

## Other stuff you might need to do

* Connecting to a [service]({{< relref "apps/managed-services.md" >}})
    * [Databases]({{< relref "apps/databases.md" >}})
* Rollback
    * Just `checkout` the old version and `cf-push`
* [One-off commands]({{< relref "getting-started/cf-ssh.md" >}})
* Deleting an application
