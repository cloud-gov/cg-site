---
menu:
  docs:
    parent: experimental

title: IaaS Sidecar
---

[**This is an experimental feature.**]({{< relref "docs/apps/experimental/experimental.md" >}}) The IaaS Sidecar service makes it easy to get access to a dedicated IaaS account tied closely to your cloud.gov spaces and generate credentials in a controlled fashion. See below for caveats and notes about the availability and tradeoffs of using this service.

## Use cases

Sometimes you need to make a hybrid deployment, where some components of your system are more appropriate to run in cloud.gov, while others are more appropriate to run directly in a companion Infrastructure-as-a-Service (IaaS) account. For example:

- You need to run a stateful service that cloud.gov does not offer as a brokered service, and [volume services]({{< relref "docs/apps/experimental/volume-services.md" >}}) are not sufficient.
- You want to make use of a service that cloud.gov does not offer as a brokered service, which is available at the IaaS level.
- You want to run a machine image from a vendor as a component of your system.

## Caveats for using this service
We're making this service available in a limited fashion so that customers can explore hybrid deployments with cloud.gov. We'll need to address the following issues before we make the IaaS Sidecar service available in a fully self-service manner for use by all customers. **For this reason, the IaaS Sidecar service is currently only available for customers in the Technology Transformation Service (TTS) in the General Services Administration.**

* The IaaS Sidecar service is only available for particular spaces after customers contact cloud.gov support to have it turned on.
* IaaS Sidecar instances must be provisioned by hand.
* There is no ability to set a spending limit on the IaaS Sidecar instance.
* cloud.gov only has the authority to procure IaaS Sidecar instances for TTS teams.

**Warning: Your monthly cloud.gov invoice will include charges equal to the costs you incur by direct use of the account associated with the sidecar instance.**

**Warning: The contents of your IaaS service are _not_ covered under cloud.gov's FedRAMP JAB P-ATO.** We are simply brokering access and individual credentials. You should consider carefully how your agency will run the ATO process for a system that requires a hybrid deployment. We suggest that you run **two** ATOs, one for the components of your system that you run in cloud.gov, and another for the remaining components of your system in the IaaS Sidecar account, as if they were separate systems. 

Be forewarned that you will have to handle the implementation of many more NIST controls for components in the IaaS Sidecar content, so it's best to put as many components as you can in cloud.gov to minimize the effort involved. You will need to get familiar with [the FedRAMP package for cloud.gov's IaaS provider](https://s3.amazonaws.com/sitesusa/wp-content/uploads/sites/482/2015/03/FedRAMP-Package-Request-Form_V4_06192014.pdf) (the package ID for that form is `AGENCYAMAZONGC`).


## How to use this service

First [contact support]({{< relref "docs/help.md" >}}) to ask for the IaaS Sidecar service. Include the name of the org and space where you want to use the service. Also include the cloud.gov account names of anyone who should have their own credentials for administering the service.

Further instructions will be provided in response to your inquiry.
