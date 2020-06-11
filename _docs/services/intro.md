---
title: Introduction
parent: services
layout: docs
sidenav: true
weight: -1
redirect_from:
  - /docs/services/
  - /docs/pricing/managed-services-cost/
---
You can expand the functionality of your cloud.gov application by making use of services. Before your application can use a service, you must provision the service and supply the credentials for using the service to your application. 

There are two ways to provision services:

* **User-provided service instances**: You can provision a service manually outside of cloud.gov, then supply the credentials yourself.
* **Managed service instances**: You can provision a [managed service instance](https://docs.cloudfoundry.org/devguide/services/#instances) through the marketplace in cloud.gov on demand, and let cloud.gov supply the credentials.

## When to use a user-provided service
User-provided services enable developers to use services that are not available in the marketplace with their apps running on Cloud.gov. 

If the provisioning of the service is not automated or already existent, you should set up a user-provided service.

You should use/setup a user-provided service when:
* You need to get credentials to a cloud.gov app
* You are using third-party APIs
* You want to link to a database external to cloud.gov

## Setting up user-provided service instances

Once you've provisioned a service manually, create a [user-provided service instance](https://docs.cloudfoundry.org/devguide/services/user-provided.html) to hold the credentials. [Bind the service instance to your application](https://docs.cloudfoundry.org/devguide/services/application-binding.html) to make the credentials available.

Example of creating a service that requires username and password:
```bash
cf create-user-provided-service <name-of-service> -p "username, password"
```
You will be prompted to enter a username and password for your app
```bash
username> <enter your username>
password> <enter your password>
```
Or you can pass in your username and password in one line with:
```bash
cf cups <name-of-service> -p '{"username":"admin","password":"pa55woRD"}'
```

## Provisioning managed services through the marketplace

cloud.gov offers a marketplace of FedRAMP-authorized [managed services]({{ site.baseurl }}{% link _docs/deployment/managed-services.md %}) that we operate in a secure and compliant manner on your behalf. You can also [extend the marketplace](#extending-the-marketplace) to include additional services run by other organizations.

To list all the managed services and plans available to a given space, you run `cf marketplace` from your command line. Here is a list of the managed services that are generally available: 

{% assign cgservices = site.data.services %}

<table class="usa-table usa-table--borderless">
<thead>
<tr><th>Service Name</th><th>Description</th><th>Support Status</th></tr>
</thead>
<tbody>
{% for item in cgservices %}
{% if item.page-name != null %}
{% assign itemurl = item.page-name %}
{% else %}
{% assign itemurl = item.name %}
{% endif %}
<tr><td><a href="{{ site.baseurl }}/docs/services/{{ itemurl }}">{{ item.name }}</a></td><td>{{ item.description | markdownify }}</td><td>{{ item.status }}</td></tr>
{% endfor %}
</tbody>
</table>

<h3><a id="support_status"></a>Support Status</h3>
<ul>
    <li><strong>Production</strong>: The service has been tested to ensure it has the resiliency required for a production system.</li>
    <li><strong>Beta</strong>: The service is stable but still requires further development to ensure it can be deployed to production systems.</li>
    <li><strong>Alpha</strong>: The service is under development and some downtime or data loss can occur.</li>
    <li><strong>Deprecated</strong>: The service is deprecated and will be removed in a future release - please update.</li>

</ul>

### Extending the marketplace

"Brokers" are the invisible integrators that enable you to set up managed service instances in cloud.gov in a consistent and self-service fashion. A broker offers a simple API that manages the service instance lifecycle. You can run your own broker to make a service from outside cloud.gov available through cloud.gov's marketplace. 

*Note that when you extend the cloud.gov marketplace with your own broker, the cloud.gov team cannot vouch for the security or compliance of the brokered services. You will need to document and authorize your own brokered services in accordance with  your agency's compliance requirements.*

This [tutorial](https://github.com/18F/cf-byo-broker) includes instructions for integrating your own broker, and demonstrates how to deploy sample brokers into cloud.gov. Once you've reviewed this tutorial, you may want to investigate some of the [community-supported broker add-ons for Cloud Foundry](https://github.com/cloudfoundry-community?q=broker) such as the [app-autoscaler](https://github.com/cloudfoundry-incubator/app-autoscaler).

The [Open Service Broker API](https://www.openservicebrokerapi.org/) (OSBAPI) standardizes the way brokers work between Cloud Foundry and Kubernetes. [Amazon Web Services (AWS)](https://github.com/awslabs/aws-servicebroker), [Google Cloud Platform (GCP)](https://github.com/GoogleCloudPlatform/gcp-service-broker), and [Microsoft Azure](https://osba.sh/) maintain open-source OSBAPI-compliant brokers. These brokers enable you to extend the cloud.gov marketplace with services from these providers.

You can also [write your own broker](https://docs.cloudfoundry.org/services/) to manage the lifecycle of a service or automate a process unique to your organization. Check out the [example service brokers](https://docs.cloudfoundry.org/services/examples.html) for some  interesting use-cases such as provisioning GitHub repositories or virtual machines.

*Note: If you're a vendor with a broker for a FedRAMP-authorized service that you'd like to be made available for all users of cloud.gov, please [contact us](mailto:inquiries@cloud.gov) to discuss whether it can be included in our marketplace.*
