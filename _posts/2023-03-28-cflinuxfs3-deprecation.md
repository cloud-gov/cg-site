---
layout: post
date: "2023-03-28"
title: "Deprecation of cflinuxfs3" 
excerpt: Ubuntu 22.04 stack (cflinuxfs4) buildpacks are here and Ubuntu 18.04 (cflinuxfs3) are retiring, test and upgrade your apps now!
---

# Deprecation of cflinuxfs3

## Ubuntu 22.04 stack (cflinuxfs4) buildpacks are here and Ubuntu 18.04 (cflinuxfs3) are retiring: Test and upgrade your apps now!


The base OS image used by your cloud.gov applications is called a "stack". The stack we’ve provided to date is called `cflinuxfs3`, and it’s based on Ubuntu 18.04 LTS, released originally in mid 2018 with continuous security updates since then. `cflinuxfs4` is a new OS image based on Ubuntu 22.04 LTS, and it’s already available for your use. We’ll be making cflinuxfs4 the default stack in cloud.gov on April 27th. In addition, Ubuntu 18.04 will likely no longer receive security updates in May, so we will stop supporting cflinuxfs3 in cloud.gov May 10th.

### Who is impacted?

If you push your Cloud Foundry applications as Docker containers with `cf push --docker-image `, these changes do not impact you.

However, most cloud.gov customers deploy their applications using buildpacks, and their apps don’t have any dependency on the particular OS version that runs them. If that describes you, this upgrade will probably be a miraculous non-event… You can request the new stack at your next cf push or cf restage and carry on as you always have.

However, there may be exceptions! For example, you may have used the `apt-buildpack` to ensure that a particular library or utility is installed when your app is deployed. In that case, you might run into problems if the location or name of that dependency has changed between Ubuntu 18.04 and Ubuntu 22.04.  You'll also want to be sure to use the newest [v0.3.0](https://github.com/cloudfoundry/apt-buildpack/releases/tag/v0.3.0) version of this release which supports cflinuxfs4.

### What should you do now?

If you are using buildpacks to build your apps, you should try out the new cflinuxfs4 stack before we make it the default on April 27th. Check out the [Cloud Foundry stack docs](https://docs.cloudfoundry.org/devguide/deploy-apps/stacks.html) to see how. To change your stack and restage your app, run the following command:

```
cf push MY-APP -s cflinuxfs4
```

### What happens if your testing fails?


If you find problems, you can continue using the deprecated cflinuxfs3 stack until you’ve resolved any issues and are ready to transition your apps.  After April 27th you can use the following command to temporarily use the older stack:

```
cf push MY-APP -s cflinuxfs3
```


However, this is only a temporary solution because cflinuxfs3 will be removed as an option after May 10th. Plan to make the switch soon so you’re not up against the deadline!


### Checking your progress

#### Option 1 - Use the Dashboard UI for individual apps

You can use the Stratos UI dashboard at `https://dashboard.fr.cloud.gov/` and navigate to "Applications > select an app > Build info" to see what stack version each of your applications is using.  If it says "cflinuxfs3" you still need to upgade your stack by repushing your application.

#### Option 2 - Use the CF cli for all apps

To quickly see the which of your applications are still using `cflinuxfs3`, the following script can be used.  Note that it requires you to be logged in with the CF cli, target an org and have `jq` installed:



```
cf curl "/v3/apps?per_page=5000&include=space.organization" | jq '(.included.spaces | INDEX(.guid)) as $spaces | (.included.organizations | INDEX(.guid)) as $orgs | [ .resources[] | select(.lifecycle.data.stack == "cflinuxfs3") | {app: .name, org:$orgs[$spaces[.relationships.space.data.guid].relationships.organization.data.guid].name ,space: $spaces[.relationships.space.data.guid].name , lifecycle} ]'
```


(Note of thanks to the folks at SAP who created that command at [https://blogs.sap.com/2023/02/16/deprecation-of-cloud-foundry-stack-cflinuxfs3-and-migration-to-cflinuxfs4/](https://blogs.sap.com/2023/02/16/deprecation-of-cloud-foundry-stack-cflinuxfs3-and-migration-to-cflinuxfs4/)  )



### Timeline

| When | What | Available Stacks | Default Stack |
| ----------------|-------------|------------------|---------------|
| **March 23** | Roll out all cflinuxfs4 buildpacks | cflinuxfs3, cflinuxfs4 | cflinuxfs3
| **March 23 - April 27** | Developers test and update apps to use cflinuxfs4 | cflinuxfs3, cflinuxfs4 | cflinuxfs3
| **April 27** | Support ends for cflinuxfs3.  All apps pushed or staged will use cflinuxfs4 by default  | cflinuxfs3, cflinuxfs4 | **cflinuxfs4**
| **April 27 - May 10** | Explicitly opt to use cflinuxfs3 if you need more time | cflinuxfs3, cflinuxfs4 | **cflinuxfs4**
| **May 10 - onward** | Only cflinuxfs4 will be available, this is a breaking change for apps not updated to use cflinuxfs4 |  cflinuxfs4 | **cflinuxfs4**



### Platform Buildpacks

| Buildpack Name | Version | Exists for Both Stacks |
|----------------|---------|--------|
| staticfile_buildpack  | v1.6.0  | Yes
| java_buildpack        | v4.54   | Yes
| ruby_buildpack        | v1.9.3  | Yes
| dotnet_core_buildpack | v2.4.8  | Yes
| nodejs_buildpack      | v1.8.7  | Yes
| go_buildpack          | v1.10.6 | Yes
| python_buildpack      | v1.8.8  | Yes
| php_buildpack         | v4.6.1  | Yes
| binary_buildpack      | v1.1.3  | Yes
| nginx_buildpack       | v1.2.1  | Yes
| r_buildpack           | v1.2.0  | Yes

