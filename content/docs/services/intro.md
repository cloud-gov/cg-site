---
menu:
  docs:
    parent: services
aliases: 
    - /docs/services/
title: Introduction
weight: -1
---

You can expand the functionality of your cloud.gov application by making use of services. Before your application can use a service, the service must be provisioned, and credentials for using the service must be supplied to your application. 

There are two ways to provision services:

- You can provision a service manually outside of cloud.gov, then create a [user-provided service instance](https://docs.cloudfoundry.org/devguide/services/user-provided.html) to hold the credentials.
- You can provision a [managed service instance](https://docs.cloudfoundry.org/devguide/services/#instances) through the marketplace in cloud.gov on demand.

In both cases, you make the credentials available by [binding the service instance to your application](https://docs.cloudfoundry.org/devguide/services/application-binding.html). 

## Marketplace services
cloud.gov offers a marketplace of FedRAMP-authorized [managed services]({{< relref "docs/apps/managed-services.md" >}}) that we operate in a secure and compliant manner on your behalf. You can also [extend the marketplace](#extending-the-marketplace) to include additional services run by other organizations.

To list all the managed services and plans available to a given space, you run `cf marketplace` from your command line. Here is a list of the managed services that are generally available: 

{{% services-table %}}

## Extending the marketplace

"Brokers" are the invisible integrators that enable you to set up managed service instances in cloud.gov in a consistent and self-service fashion. A broker offers a simple API that manages the service instance lifecycle. You can run your own broker to make a service from outside cloud.gov available through cloud.gov's marketplace. 

*Note that when you extend the cloud.gov marketplace with your own broker, the cloud.gov team cannot vouch for the security or compliace of the brokered services. You should consider the security and compliance impact of the services you broker yourself.*

We've supplied a [tutorial to help you understand how to operate your own broker](https://github.com/18F/cf-byo-broker), including instructions for deploying some sample brokers into cloud.gov. Once you've reviewed this tutorial, you may want to investigate some of the [community-supported broker add-ons for Cloud Foundry](https://github.com/cloudfoundry-community?q=broker) such as the [app-autoscaler](https://github.com/cloudfoundry-incubator/app-autoscaler).

The [Open Service Broker API](https://www.openservicebrokerapi.org/) (OSBAPI) standardizes the way brokers work between Cloud Foundry and Kubernetes. [Amazon Web Services (AWS)](https://github.com/awslabs/aws-servicebroker), [Google Cloud Platform (GCP)](https://github.com/GoogleCloudPlatform/gcp-service-broker), and [Microsoft Azure](https://osba.sh/) maintain open-source OSBAPI-compliant brokers. These brokers enable you to extend the cloud.gov marketplace with services from these providers.

You can also [write your own broker](https://docs.cloudfoundry.org/services/) to manage the lifecycle of a service or automate a process unique to your organization. Check out the [example service brokers](https://docs.cloudfoundry.org/services/examples.html) for some  interesting use-cases such as provisioning GitHub repositories or virtual machines.

*Note: If you write a broker for a FedRAMP-authorized service that you'd like to be made available for all users of cloud.gov, please contact us to discuss whether it can be included in our marketplace.*

