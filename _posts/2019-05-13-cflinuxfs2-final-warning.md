---
layout: post
date: "2019-05-13"
title: "Final warning: cflinuxfs2 will be removed May 21st" 
redirect_from:
  - /updates/2019-05-13-cflinuxfs2-final-warning/
---

**Background:** [We announced on February 26]({{ site.baseurl }}/updates/2019-02-26-quarterly-update/) that Cloud.gov would remove support for the cflinuxfs2 stack (the operating system image for applications). This was the default stack for Cloud.gov applications deployed before April 15. On April 15 we set the default stack for new applications to cflinuxfs3.

**The change we’re making:** We will disable support for the outdated cflinuxfs2 stack on Tuesday May 21. Before we make the change, we will set any application still using the cflinuxfs2 stack to use cflinuxfs3, then restage it. There’s a risk that these applications will have a compatibility problem with cflinuxfs3 that prevents them from restaging, starting, and operating correctly, which would cause downtime until the application owner updates it.

**Why you may need to take action:**
We have noted some customer applications are still using the cflinuxfs2 stack.

Without action, these applications will be subject to risk of extended downtime if they have an unforeseen compatibility problem with cflinuxfs3. In that case, the application would remain down until the application owner makes an update. 

**How to tell if your applications are affected**

Here are three ways to inspect your applications to see if they're running cflinuxfs2:

1. You can inspect each app individually using the CF CLI by running `cf app YOUR-APPNAME-HERE` and looking for the `stack:` line in the output.
1. You can inspect the apps individually using the [beta Cloud.gov dashboard](https://dashboard-beta.fr.cloud.gov/applications) and looking for the `Build info:` line in the application details.
1. You can inspect all your apps at once by installing the [`stack-auditor` CLI plugin](https://github.com/cloudfoundry/stack-auditor) and running `cf audit-stack`.

We are also explicitly emailing people with administrative control over applications that are still using cflinuxfs2.

**What you should do to prevent downtime:** You should set the stack for these applications to cflinuxfs3 yourself, then redeploy them using your normal process (for example, checking the change in a staging environment before making the same change in your production environment). This will remove the risk of your apps being unavailable after we remove cflinuxfs2.

**How to change the stack:**
If you use a manifest for deployment, edit your application manifest to [set the `stack:`](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest-attributes.html#stack) to cflinuxfs3. For example:
```
stack: cflinuxfs3
```
If you don’t use a manifest for deployment, add the `-s` command-line parameter to the push command in your deployment script. For example:
```
cf push YOUR-APPNAME-HERE -s cflinuxfs3
```
In either case: after making that update, redeploy the app.

Please email [support@cloud.gov](mailto:support@cloud.gov) if you have questions or need help with this process. We’re happy to help.
