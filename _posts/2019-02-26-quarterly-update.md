---
layout: post
date: "2019-02-26"
title: "Quarterly update - An OS upgrade, cross-IaaS services, R Shiny apps, and more!" 
redirect_from:
  - /updates/2019-02-26-quarterly-update/
---

**An OS upgrade, cross-IaaS services, R Shiny apps, and more!**

It’s a new year, and we’ve got a pile of changes and highlights to tell you about since we last checked in.

**Announcements**

#### **Ubuntu 18.04 is coming and 14.04 is going: Test your apps now!**

The base OS image used by your cloud.gov applications is called a "stack". The stack we’ve provided to date is called `cflinuxfs2`, and it’s based on Ubuntu 14.04 LTS, [released originally in early 2014](https://www.ubuntu.com/about/release-cycle) with continuous security updates since then. `cflinuxfs3` is a new OS image based on Ubuntu 18.04 LTS, and it’s already available for your use. **We’ll be making `cflinuxfs3` the default stack in cloud.gov on March 15th**. In addition, Ubuntu 14.04 will no longer receive security updates in April, so **we will stop supporting `cflinuxfs2` in cloud.gov April 30th.**

**What this means to you:** Most cloud.gov customers deploy their applications using buildpacks, and their apps don’t have any dependency on the particular OS version that runs them. If that describes you, this upgrade will probably be a miraculous non-event… You can request the new stack at your next `cf push` or `cf restage` and carry on as you always have. 

However, there may be exceptions! For example, you may have used the apt-buildpack to ensure that a particular library or utility is installed when your app is deployed. In that case, you might run into problems if the location or name of that dependency has changed between Ubuntu 14.04 and Ubuntu 18.04.

**What you should do:** You should try out the new `cflinuxfs3` stack before we make it the default on March 15th. Check out [the Cloud Foundry stack docs](https://docs.cloudfoundry.org/devguide/deploy-apps/stacks.html) to see how. If you find problems, you can continue using the deprecated `cflinuxfs2` stack until you’ve resolved any issues and are ready to transition your apps. However, this is only a temporary solution because `cflinuxfs2` will be removed as an option at the end of April. Plan to make the switch soon so you’re not up against the deadline! 

**Timeline**

| When | What|
|----|----|
| **Now - March 15th**  | Test your apps using `cflinuxfs3` |
| **March 15th - April 29th** |  Explicitly opt to use `cflinuxfs2` if you need more time |
| **April 30th onward** | Only `cflinuxfs3` will be available |

If you have any questions or concerns, please [contact support](mailto:support@cloud.gov) so we can help you out.

### Connect your cloud.gov apps to other apps securely through a VPN

Last October, we announced our team was working on a way for all of your cloud.gov applications to interact securely with your external applications through a VPN. This capability can make it easier to migrate applications from legacy infrastructure to cloud.gov, one application at a time. Good news: The FedRAMP assessment of this feature is wrapping up, and we’ll soon be ready to configure this capability for customers who need it.

Contact us if you’d like this to use this feature and we’ll work with the appropriate security and procurement team in your organization to get you set up. For more detail on how this will work, as well as benefits of adding this to your system, check out [our docs]({{ site.baseurl }}/docs/apps/private-egress). 

### The 2019 North America Cloud Foundry Summit: See you there!

Cloud.gov wouldn’t be possible without the robust collaboration in the bustling ecosystem around Cloud Foundry, and registration is open for the next North America Cloud Foundry Summit! The dates are April 2-4th, and it will be taking place in Philadelphia. The summit is a great place for anyone who uses cloud.gov to get training, share patterns, understand what features are in the CF pipeline, and finally to connect with the cloud.gov team! We are planning on attending, and would love to meet new faces and reconnect with others. [Learn more about the Summit](https://www.cloudfoundry.org/event/nasummit2019/) and let us know if you’d like to meet there!  

## New additions

### Extend your cloud.gov app across CSPs using your existing access

Can you imagine your team automatically provisioning a [Big Query](https://cloud.google.com/bigquery/) instance in Google Cloud Platform (GCP) a [Service Bus](https://azure.microsoft.com/en-us/services/service-bus/) instance in Microsoft Azure, and a [Kinesis](https://aws.amazon.com/kinesis/) instance in Amazon Web Services (AWS) East, then using those instances in your cloud.gov app (running in AWS GovCloud)? 

If your agency or organization has your own access to AWS, GCP, or Azure, you can use existing cloud.gov extension points to make additional services accessible to your cloud.gov teams. We’ve published [a tutorial](https://github.com/18F/cf-byo-broker) to help you understand how these brokers work and walk you through deploying and using the GCP broker, and we’ll be extending this tutorial with instructions for additional brokers in the future. Read more about [how to extend the cloud.gov service marketplace]({{ site.baseurl }}/docs/services/intro#extending-the-marketplace).

### Deploy your R data analytics applications on cloud.gov

There’s no denying the deep and abiding love that data analytics folks have for [R](https://www.r-project.org/about.html) and [Shiny](https://shiny.rstudio.com/). If you’ve ever browsed through an interactive presentation by the New York Times, [you’ve probably experienced this powerful, free, open source combination](https://blog.revolutionanalytics.com/2011/03/how-the-new-york-times-uses-r-for-data-visualization.html). For those late to the party: R is a programming language for statistical computing and graphics, while Shiny helps turn R analyses into interactive web applications without requiring HTML, CSS, or JavaScript knowledge. A free, open source desktop IDE called [RStudio](https://www.rstudio.com/) aimed at data scientists facilitates developing apps using R and Shiny.

Many customers have told us they want to deploy apps built using R and Shiny on cloud.gov, and now it’s possible! Check out the [new R buildpack](https://docs.cloudfoundry.org/buildpacks/r/index.html). We’ve also published [a demonstration](https://github.com/18f/cf-rshiny-demo) showing how to run the the movie explorer application from the official [Shiny examples](https://github.com/rstudio/shiny-examples), pictured below.

!["R Shiny movie explorer application screenshot"]({{site.baseurl}}/assets/"r-shiny-demo.png"){:style="border:1px solid grey;"}

### Build edge-facing web engineering apps using the NGINX buildpack

You can easily develop and deploy custom proxies or other front-ends for your applications using a new dedicated [NGINX buildpack](https://docs.cloudfoundry.org/buildpacks/nginx/index.html). You can also configure the buildpack to use [OpenResty](https://openresty.org/en/) for additional flexibility and extensibility. Writing apps with this buildpack makes it easy to decouple security concerns from other app logic, particularly when you use internal routing and [service discovery](https://docs.cloudfoundry.org/devguide/deploy-apps/cf-networking.html#discovery).

The new buildpack replaces the existing [Staticfile buildpack](https://docs.cloudfoundry.org/buildpacks/staticfile/index.html) for many applications, and includes forward-compatibility for customizing the nginx.conf file. (Forward compatibility was was never guaranteed for the Staticfile buildpack.) cloud.gov will select the NGINX buildpack instead of the existing Staticfile buildpack whenever your application includes an nginx.conf file.

### Log-cache delivers greater visibility and enables better integration

Using a new CLI plugin, you can now mine a greater range of logs and metrics thanks to a new addition to the platform called "log-cache"; [here’s how](https://github.com/cloudfoundry/log-cache-cli). In addition, the log-cache API accepts queries based on the Prometheus Query Language, [PromQL](https://prometheus.io/docs/prometheus/latest/querying/basics/). This compatible API makes log-cache an ideal foundation for building additional tooling such as monitoring or alerting. For example, you can use log-cache to easily extract data from cloud.gov for incorporation into your own visualizations and alerts.

### Ensure you have the latest CLI client!

While you’re checking out that new log-cache plugin, now would be a good time to make sure you’ve installed the latest version of the Cloud Foundry CLI, version 6.43.0. While the CLI is generally compatible with updates to cloud.gov, you’ll only get some features and bugfixes if you [keep your CLI up to date]({{ site.baseurl }}/docs/getting-started/setup/#set-up-the-command-line). For example, the most recent CLI version hides your credentials when running with the verbose flag, so it's easier to copy-and-paste transcripts to other people securely. The previous version added the ability to manage [space-to-space networking policies](https://github.com/cloudfoundry/cli/releases/tag/v6.42.0), a capability only previously available by working directly with the Cloud Foundry API.

## We want to hear from you!

### It’s _almost_ official! New web dashboard coming soon

In October, we gave you a glimpse into our new [web dashboard](https://dashboard-beta.fr.cloud.gov/login). Like the existing dashboard, the new dashboard gives you web-based access to an overview of your applications and a way to perform common tasks, but it also brings many more command-line tasks to the web. For example, you can deploy an app directly from a web-hosted Git repository, and SSH into an application instance via the browser.

While we are preparing to finalize the new dashboard, we’re still collecting feedback and want to know your thoughts. [Let us know](mailto:support@cloud.gov) if we are missing any specific workflows, what’s confusing, or what other visualization should be included! 

