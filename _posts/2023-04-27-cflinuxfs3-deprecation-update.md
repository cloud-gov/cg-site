---
layout: post
date: "2023-04-27"
title: "Upgrading App to cflinuxfs4 Important Update" 
excerpt: Ubuntu 22.04 stack (cflinuxfs4) buildpacks are here and you likely need to upgrade your existing apps to use the new stack!
---

# Deprecation of cflinuxfs3

## Ubuntu 22.04 stack (cflinuxfs4) buildpacks are here and Ubuntu 18.04 (cflinuxfs3) are retiring: upgrade your apps now!


The base OS image used by your cloud.gov applications is called a "stack". The stack we’ve provided to date is called `cflinuxfs3`, and it’s based on Ubuntu 18.04 LTS, released originally in mid 2018 with continuous security updates since then. `cflinuxfs4` is a new OS image based on Ubuntu 22.04 LTS, and is now default stack in cloud.gov. Ubuntu 18.04 will likely no longer receive security updates in May, so we will stop supporting cflinuxfs3 in cloud.gov May 10th.

### Who is impacted?

If you push your Cloud Foundry applications as Docker containers with `cf push --docker-image `, these changes do not impact you.

However, most cloud.gov customers deploy their applications using buildpacks, and their apps don’t have any dependency on the particular OS version that runs them. If that describes you and you have existing applications running on cloud.gov, this upgrade will impact you and you'll need to update the stack on your applications.


### What should you do now for existing apps?


For existing applications which were created under `cflinuxfs3` you will need to update the stack declaration to `cflinuxfs4`, there are three common ways of doing this detailed below.  The options below only have to be run once for each application on `cflinuxfs3`, once the stack is set for an application, it is persistent until changed with any of these 3 steps. 

1. Push the app manually and specify the stack with the cf cli:

   ```
   cf push MY-APP -s cflinuxfs4
   ```

2. Add the stack to your app manifest and push the app, this is documented at [https://docs.cloudfoundry.org/devguide/deploy-apps/manifest-attributes.html#stack](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest-attributes.html#stack):


   ```
   ---
     ...
     stack: cflinuxfs4
   ```

3. Use the `stack-auditor` cf cli plugin to change the stack without having to push the application.  Documentation for using this plugin is at [https://docs.cloudfoundry.org/adminguide/stack-auditor.html#change-stacks](https://docs.cloudfoundry.org/adminguide/stack-auditor.html#change-stacks), the basic workflow is:

   - Install the plugin
   - Use the `cf` cli to target the org and space for your existing application
   - Run `cf change-stack APP-NAME cflinuxfs4` to change the app to the `cflinuxfs4` stack

   Each application will take about a minute or so to run the `cf change-stack...` command depending on the size of the droplet.  


### What should you do now for new apps?

For any new applications, simply run a `cf push` to pick up the new `cflinuxfs4` stack:

```
cf push MY-APP
```



### Timeline

| When | What | Available Stacks | Default Stack |
| ----------------|-------------|------------------|---------------|
| **March 23** | Roll out all cflinuxfs4 buildpacks | cflinuxfs3, cflinuxfs4 | cflinuxfs3
| **March 23 - April 27** | Developers test and update apps to use cflinuxfs4 | cflinuxfs3, cflinuxfs4 | cflinuxfs3
| **April 27** | Support ends for cflinuxfs3.  All new apps pushed will use cflinuxfs4 by default, existing apps will need to be migrated.  | cflinuxfs3, cflinuxfs4 | **cflinuxfs4**
| **April 27 - May 10** | Explicitly opt to use cflinuxfs3 if you need more time | cflinuxfs3, cflinuxfs4 | **cflinuxfs4**
| **May 10 - onward** | Only cflinuxfs4 will be available, this is a breaking change for apps not updated to use cflinuxfs4 |  cflinuxfs4 | **cflinuxfs4**

