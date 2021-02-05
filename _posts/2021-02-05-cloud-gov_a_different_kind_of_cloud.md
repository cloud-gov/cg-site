---
layout: post
title: "cloud.gov: A Different Kind of Cloud"
date: February 5, 2021
excerpt: The cloud.gov platform acts as a concierge for your cloud deployments,
  removing a lot of the hard work of setting up a scalable and compliant
  infrastructure, and streamlining the ATO process.
---
As a program manager or CIO tasked with moving applications to the cloud, one of the first questions you might find yourself faced with is: which cloud should I move to?

One of the many benefits of the continued advancement of cloud technologies is that [there are lots of different cloud deployment and operational models](https://cic.gsa.gov/basics/cloud-basics/) to choose from. And it’s also one of the main drawbacks. 

Which cloud option is right for your project? Which service model offers the best mix of cost effectiveness, security, and ease of use? 

We believe that cloud.gov offers the most favorable blend of these different factors for agencies that are looking to migrate their applications to the cloud. That’s because cloud.gov acts as a sort of concierge for your cloud deployments, removing a lot of the hard work of setting up a scalable and compliant infrastructure, and streamlining the ATO process.

### cloud.gov: At your Service

Technically speaking, cloud.gov is a platform-as-a-service - typically referred to as a PaaS offering. It is an implementation of the open source [Cloud Foundry](https://www.cloudfoundry.org/) application platform [on top of Infrastructure as a Service (IaaS) provided by Amazon Web Services](https://cloud.gov/docs/technology/iaas/) (AWS). We often get asked how cloud.gov is different from the underlying IaaS services provided by AWS or other cloud service providers.

A good way to think about this question is to think of a concierge service.

With IaaS services like AWS, you have the ability to architect and implement your cloud infrastructure as you wish, and some projects opt to do this - often those that have specialized or unusual project requirements. Projects that use this approach, will need to first procure AWS, and then set up, configure and test all of the required cloud infrastructure components. They will also be required to document how the infrastructure is set up for compliance purposes, so that a security auditor or authorizing official can view artifacts describing how the environment operates.

With cloud.gov, this approach is different and greatly simplified. 

The cloud.gov platform is already set up to instantly broker different services from AWS to support your application. When cloud.gov brokers a service, like for example an [RDS service from AWS](https://aws.amazon.com/rds/), the service is created in a repeatable, secure, and compliant manner. The service is immediately made available for your applications to use, requiring minimal additional configuration and set up. These services are brokered on demand from customers, using a simple command syntax, meaning you can add or remove services whenever you need to.

Best of all, because these services are brokered inside the cloud.gov FedRAMP boundary, security documentation is minimal and often may not be required for [components managed by the cloud.gov team](https://cloud.gov/docs/overview/fedramp-tracker/#how-you-can-use-this-p-ato).

### Deployments Made Simple

The ability to leverage cloud.gov’s baked-in security compliance to streamline the ATO process is an attractive feature. But it isn’t the only reason that cloud.gov is different from other cloud platforms.

One of the defining characteristics of cloud.gov is this: it’s just plain easy. Complex application deployments involving multi-tiered applications, with multiple backing services, running concurrent application instances can be executed with a single command.

When an app is deployed to cloud.gov, the platform’s concierge qualities really stand out. Simply by pushing an application, a project team gets all of the following courtesy of the cloud.gov platform:

* The platform automatically loads the appropriate runtime for the application based on the programming language used. cloud.gov [currently supports almost a dozen different language runtimes.](https://cloud.gov/docs/overview/portfolio-analysis/)
* The platform binds the application to [backing services](https://cloud.gov/docs/services/intro/), like an RDS service or a caching service, and automatically makes the credentials for these services available to the application, minimizing the need for complex configuration and credential management.
* The platform automatically scales the application from one to dozens of instances depending on what is needed, and automatically load balances traffic between instances. 
* The platform will continually monitor the health of an application and recycle app instances that become unhealthy, automatically routing traffic only to healthy app instances.

Because the cloud.gov platform handles all of the hard parts of deploying an application, a project team can focus on building a great app. Instead of worrying about the many details and requirements of setting up a cloud infrastructure, cloud.gov acts as a concierge service for your application, making complex, risky, multi-step deployments simple and efficient.

To learn more about cloud.gov, you can reach out to the team at [inquiries@cloud.gov](mailto:inquiries@cloud.gov) for more information, or to set up an introductory call.
