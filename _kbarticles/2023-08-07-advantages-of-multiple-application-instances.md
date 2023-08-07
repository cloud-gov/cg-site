---
layout: post
title: "Advantages of multiple application instances"
date: August 7, 2023
excerpt: Advantages of multiple application instances.
---

## Importance of multiple application instances

One of the benefits of Cloud.gov is the ability to [deploy applications with a simple command](https://cloud.gov/docs/deployment/deployment/#how-deployment-works). 

Once an application is up and available, resiliency of that application becomes a consideration and as such running multiple application instances is paramount. Running multiple instances of an application increases the resilience and availability of the application.

Multiple application instances allow customer traffic to continue being served if there are any issues with any individual application instance such as if an underlying platform component is being upgraded. Additionally having multiple application instances provides decreased chance of downtime. 

Running multiple application instances allows your instances to be [scheduled across availability zones](https://docs.aws.amazon.com/whitepapers/latest/real-time-communication-on-aws/use-multiple-availability-zones.html). The increased number of instances also assists with load-balancing user requests to your application (Please note: you should set up your instances to share session data when using multiple application instances).

Most recently, [as detailed in the EPA AirNow customer story](https://cloud.gov/docs/customer-stories/epa-airnow-gov/), the EPA’s AirNow program utilized the ability to quickly and easily scale up their number of application instances to handle increased customer traffic.

## How it works

Using the [cf push command](https://docs.cloudfoundry.org/devguide/deploy-apps/deploy-app.html#custom-cf-push), you can use the `-i` flag to indicate the number of application instances you would like.

Example pushing an application with 2 instances:
`cf push myapp -i 2`

Additionally you can also define the number of application instances in your application manifest.yml file with the [instance manifest attribute](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest-attributes.html#instances).

Example for defining an application with 2 instances in your manifest.yml file:
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

For example if the org `my-example-org` had a memory quota of 3 GB and were hosting a single application `myapp` that had specified 256 mb of memory per application instance in their manifest with 4 application instances specified in their manifest, then the application would be utilizing 1 GB of the org’s 3 GB total memory quota. This would leave 2 GB available for the org to otherwise use. 

If the org wanted to scale up their number of running application instances they could use the cf scale command to increase their number of instances to 6 instances `cf scale myapp -i 6` which would then increase their number of running application instances to 6 instances. Which should increase their org memory being used from 1 GB to 1.5 GB and leaving 1.5 GB free.

If `my-example-org` wanted to later decrease their number of running application instances from 6 instances down to 4 instances, they could also use `cf scale myapp -i 4` which would result in 1 GB of org memory being used and leaving 2 GB available for the org to otherwise use.
