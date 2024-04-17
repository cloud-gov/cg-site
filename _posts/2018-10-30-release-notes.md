---
layout: post
date: "2018-10-30"
title: "Release notes" 
redirect_from:
  - /updates/2018-10-30-release-notes/
---

Here's the latest on how we've been trying to make Cloud.gov simpler and more secure. (If you find yourself needing to explain Cloud.gov to coworkers or leadership, take a look at our [new two-pager]({{ site.baseurl }}/resources/cloudgov-overview-2018.pdf)!)

### New dashboard (now in preview mode)

Check out the preview version of our [new web dashboard](https://dashboard-beta.fr.cloud.gov/login). It still gives you web-based access to an overview of your applications and lets you do common tasks, but this new version brings many more command-line tasks to the web like  viewing application logs and the ability to SSH into your application. It’s still a preview because there are some confusing parts of the interface, and it’s missing a few tools from the current dashboard (such as inviting a new user at the same time as giving them a role in your org or space).

For now, both dashboards are live; we'll be retiring the original about a month from now. If you've got thoughts to share, [let us know]({{ site.baseurl }}/help). We especially want you to tell us if you rely on something in the current dashboard that you can’t find in the new dashboard!

### Updated password rotation policy

Following the revised [NIST Digital Identity Guidelines](https://pages.nist.gov/800-63-3/sp800-63b.html) and the corresponding [FedRAMP Digital Identity Requirements](https://www.fedramp.gov/assets/resources/documents/CSP_Digital_Identity_Requirements.pdf), we’ve improved our password security policies.

* If you log into Cloud.gov using a Cloud.gov user account (not using agency single sign-on at EPA, FDIC, GSA, or NSF), it no longer requires you to change your password every 90 days.

* If you use [service accounts]({{ site.baseurl }}/docs/services/cloud-gov-service-account/) for automating application deployment or event-auditing, those automatically-generated credentials no longer expire after 90 days.

To meet NIST and FedRAMP requirements, we’ve also added new security controls when you create or change a Cloud.gov account password. Cloud.gov prevents you from creating easily-compromised passwords by automatically checking against common weak passwords.

### Internal routing

In the past, every application route (address) that you created for a Cloud.gov application was automatically an address accessible over the internet, so if you wanted to have a route for an internal application, you needed to put in careful attention to what was accessible over that route (including thinking about authentication and authorization for that application).

Now, you can use **apps.internal** as a route for anything that shouldn't be public (or shouldn't be public yet). That'll make your app internal automatically. You use an allow list to decide which other applications should be able to talk to your internal application. For more details, see [Internal Routes in the Cloud Foundry documentation](https://docs.cloudfoundry.org/devguide/deploy-apps/routes-domains.html#internal-routes) and [this Cloud Foundry blog post](https://www.cloudfoundry.org/blog/polyglot-service-discovery-container-networking-cloud-foundry/).

### Polyglot service discovery

Along with internal routing, Cloud.gov now also offers polyglot service discovery. You can use DNS from within your applications to refer to instances of that application. That means you can have different instances of the app act as leader and follower nodes rather than just scaling naively, which enables clustered applications.

You can also use these routes across language stacks — because it's DNS-based, it's not tied to a particular language library. See [this Cloud Foundry blog post](https://www.cloudfoundry.org/blog/polyglot-service-discovery-container-networking-cloud-foundry/) for details.


### Coming soon

#### VPN backhaul to other networks

If you have applications on Cloud.gov and you want them to be able to interact with other applications over a VPN connection — in your data center, in an IaaS, with your hosting provider, anywhere — [we’re working on making this available to you]({{ site.baseurl }}/docs/apps/private-egress). We're able to dedicate a specific area for these types of applications, along with a VPN backhaul that enables direct connections to the applications you have on other networks.

Having this in place will make it easier to migrate applications from legacy infrastructure to the cloud. If your services are nested together and you can't move everything at once, you’ll be able to migrate one application at a time without interrupting service or exposing information to the open internet.

We’re working through FedRAMP testing and approval for this feature so it isn’t available yet, but if you're interested in learning more and setting this up in the future, [send us an email](mailto:inquiries@cloud.gov). We can set up a call with you and your agency network security team to preview how it will work, so that your agency can get on board when this is ready.

### Updates and upgrades

* [logs.fr.cloud.gov](https://logs.fr.cloud.gov) has been upgraded to [Elasticsearch/Kibana 6.x](https://www.elastic.co/guide/en/kibana/current/release-notes.html)
* Our network architecture has been improved, and our outgoing internet traffic capacity has increased 75x
* We have a new [S3 plan for sandboxes]({{ site.baseurl }}/updates/2018-10-22-s3-sandbox-plan) that automatically clears your S3 contents whenever your sandbox is cleared
* We offer a [custom domain service]({{ site.baseurl }}/updates/2018-05-21-new-custom-domain-service) that doesn't use CloudFront, since CloudFront is currently outside the AWS FedRAMP P-ATO boundary

Thanks for using Cloud.gov. If there's more we can do to make your work easier, [let us know]({{ site.baseurl }}/help).  
