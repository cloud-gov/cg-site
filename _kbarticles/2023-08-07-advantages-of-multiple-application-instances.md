---
layout: post
title: "Scaling your cloud.gov applications"
date: August 7, 2023
excerpt: How and why to scale your cloud.gov applications by adding more application instances
---

## Importance of multiple application instances

One of the benefits of Cloud.gov is the ability to [deploy applications with a simple command](https://cloud.gov/docs/deployment/deployment/#how-deployment-works). 

By default, applications are deployed with a single instance which handles all traffic and load for your application. If you have unexpected surges in application load, it is likely that your single application instance may run out of available CPU or memory or both, leading to an outage for your application. 

There is a solution to improve the availability of your applications on cloud.gov: horizontally scale your application by running multiple application instances. Running multiple application instances increases the overall load that your application can handle. The load is balanced among the application instances to ensure that no single instance is prematurely overloaded and thus to maximize the availability of your application. By default, the routing infrastructure in cloud.gov [distributes requests to application instances using a `round-robin` algorithm](https://docs.cloudfoundry.org/concepts/http-routing.html#balancing-algorithm).

Running multiple application instances allows your instances to be [scheduled across availability zones](https://docs.aws.amazon.com/whitepapers/latest/real-time-communication-on-aws/use-multiple-availability-zones.html). The increased number of instances also assists with load-balancing user requests to your application (Please note: you should set up your instances to share session data when using multiple application instances).

The benefits of running multiple application instances are [exemplified in the EPA AirNow.gov customer story]({{ site.baseurl }}{% link _docs/customer-stories/epa-airnow-gov.md %}), which details how the EPA utilized the ability to quickly and easily scale up their number of application instances to handle increased customer traffic for AirNow.gov.

## How it works

Using the [cf push command](https://docs.cloudfoundry.org/devguide/deploy-apps/deploy-app.html#custom-cf-push), you can use the `-i` flag to indicate the number of application instances you would like.

For example, pushing an application with 2 instances:

```shell
cf push myapp -i 2
```

Additionally, you can also define the number of application instances in your application `manifest.yml` file with the [`instances` manifest attribute](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest-attributes.html#instances).

An example for defining an application with 2 instances in your `manifest.yml` file:

```shell
    memory: 512mb
    instances: 2
    applications:
        name: myapp
        path: .
```

Please note the default number of instances is 1 instance.

You can also use the [cf scale](http://docs.cloudfoundry.org/devguide/deploy-apps/cf-scale.html) command to increase the number of instances for a running app.

`cf scale myapp -i 2`

Please note, running multiple instances may sometimes cause scheduled tasks or data loads to run multiple times. This issue can be prevented by using the [cf-instance-index](http://docs.cloudfoundry.org/devguide/deploy-apps/environment-variable.html#CF-INSTANCE-INDEX) environment variable. This variable denotes the specific instance number.

## Application instances and memory usage

Each individual application instance utilizes the same amount of [org memory and disk reservation/limit](https://cloud.gov/docs/management/limits/) that is specified in the application manifest or indicated in the `cf push` command. Please note the application cannot access more than the specified amount of memory. 

For example, if the org `my-example-org` had:

- a memory quota of 3 GB and were hosting a single application `myapp` 
- 256 MB of memory per application instance 
- 4 application instances

Then, the application would be utilizing 1 GB (256 MB * 4 instances) of the org’s 3 GB total memory quota. This would leave 2 GB available for the org to otherwise use. 
