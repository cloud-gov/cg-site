---
layout: post
date: "2023-05-16"
title: "Deprecation Notice for cflinuxfs3 stack and cflinuxfs3 Buildpacks" 
excerpt: cflinuxfs4 buildpacks are here and cflinuxfs3 buildpacks are retiring, upgrade your apps now!
---



# Deprecation Notice for cflinuxfs3 stack and cflinuxfs3 Buildpacks


The base OS image used by your cloud.gov applications is called a "stack". The stack we’ve provided to date is called `cflinuxfs3`, and it’s based on Ubuntu 18.04 LTS, released originally in mid 2018 with continuous security updates since then. `cflinuxfs4` is a new OS image based on Ubuntu 22.04 LTS, and is now default stack in cloud.gov. 

### Important Dates
Ubuntu 18.04 will likely no longer receive security updates in May, so we will stop supporting the cflinuxfs3 stack and buildpacks in cloud.gov.  What this means is: 

 - On **June 29th, 2023** the platform will no longer provide cflinuxfs3 buildpacks. Applications will need to reference an external buildpack to continue to push updated versions of cflinuxfs3 applications.  Existing cflinuxfs3 applications will continue to restart without intervention.
 - On **September 28th, 2023**, all support for cflinuxfs3 will end and all applications still on this stack will stop and cannot be started unless migrated to cflinuxfs4.


Ubuntu 18.04 will likely no longer receive security updates in May, so we will stop supporting cflinuxfs3 in cloud.gov May 10th.

### Who is impacted?

If you push your Cloud Foundry applications as Docker containers with `cf push --docker-image `, these changes do not impact you.

However, most cloud.gov customers deploy their applications using buildpacks, and their apps don’t have any dependency on the particular OS version that runs them. If that describes you and you have existing applications running on cloud.gov, this upgrade will impact you and you'll need to update the stack on your applications.


### What should you do now for existing apps?


For existing applications which were created under `cflinuxfs3` you will need to update the stack declaration to `cflinuxfs4`, there are two common ways of doing this detailed below.  The options below only have to be run once for each application on `cflinuxfs3`, once the stack is set for an application, it is persistent until changed with any of these two steps. 

1. Push the app manually and specify the stack with the cf cli:

   ```
   cf push MY-APP -s cflinuxfs4
   ```

2. Use the `stack-auditor` cf cli plugin to change the stack without having to push the application.  Documentation for using this plugin is at [https://docs.cloudfoundry.org/adminguide/stack-auditor.html#change-stacks](https://docs.cloudfoundry.org/adminguide/stack-auditor.html#change-stacks), the basic workflow is:

   - Install the plugin
   - Use the `cf` cli to target the org and space for your existing application
   - Run `cf change-stack APP-NAME cflinuxfs4` to change the app to the `cflinuxfs4` stack

   Each application will take about a minute or so to run the `cf change-stack...` command depending on the size of the droplet.  


### What should you do now for new apps?

For any new applications, simply run a `cf push` to pick up the new `cflinuxfs4` stack:

```
cf push MY-APP
```

### How do you push a cflinuxfs3 app with an external buildpack?

Until September 28th, 2023, you can use an external buildpack to push apps to the cflinuxfs3 stack by referencing a URL in a `cf push` command.  As an example, to push a Ruby app using 2.7.6 on cflinuxfs3:

```
cf push MY-APP -b https://github.com/cloudfoundry/ruby-buildpack/releases/download/v1.9.4/ruby-buildpack-cflinuxfs3-v1.9.4.zip -s cflinuxfs3
```

Many of the external buildpacks can be found on Github at [https://github.com/cloudfoundry?q=buildpacks&type=all&language=&sort=](https://github.com/cloudfoundry?q=buildpacks&type=all&language=&sort=)


