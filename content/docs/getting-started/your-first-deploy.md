---
menu:
  docs:
    parent: getting-started
title: Your first deploy
weight: -30
---

cloud.gov is an instance of Cloud Foundry, so [the Cloud Foundry documentation](http://docs.cloudfoundry.org), Stack Overflow questions, etc. should mostly be applicable.

To get used to Cloud Foundry, we recommend that you practice by deploying a simple application before moving into deploying something for production.


## Deploying

1. [Go through the setup.]({{< relref "setup.md" >}})
1. [Deploy a "hello world" application.](https://github.com/18F/cf-hello-worlds#readme)
1. Tweak the app (without committing) and re-`push`.

The changes will be reflected in Cloud Foundry even without being committed to Git. Cloud Foundry is not Git-aware – it simply deploys whatever is contained in the directory that you `push` from. That being said, you _can_ set up [continuous deployment]({{< relref "docs/apps/continuous-deployment.md" >}}) from a Git repository.

**Be tidy**: When you're done, please `cf delete <APPNAME>`. 

Next, take a look at the [Concepts]({{< relref "concepts.md" >}}) page. Once you're ready to deploy your own application, head over to the [general deployment tips]({{< relref "docs/apps/deployment.md" >}}).
