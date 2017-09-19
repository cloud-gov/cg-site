---
menu:
  docs:
    parent: orgs
title: Restricting users to trusted IP ranges
---

We can configure cloud.gov to restrict users in a particular domain (e.g., `gsa.gov`) from using cloud.gov services unless their requests originate from a trusted network location. Your users will still be able to connect to cloud.gov from other locations, but any requests they make will be rejected. You can use this feature to help your agency comply with the [Trusted Internet Connections (TIC) Initiative](https://www.dhs.gov/trusted-internet-connections) while using cloud.gov. 

### Contact support to configure restrictions for your domain
Create a [support ticket](mailto:cloud-gov-support@gsa.gov?body=Email%20domain%3A%0A%0AEgress%20IP%20ranges%3A%0A%0AAgency%20CIO%3A%0A) specifying the IP address ranges that are valid for your domain. Because address restriction applies to all cloud.gov users from your email domain, we will confirm your request with your agency CIO before changing the configuration.

### Grant roles only to users from your restricted domain
To fully limit access to your apps and services, you must ensure that all users with roles in your orgs and spaces are using email addresses within your email domain. For example, if your email domain is `gsa.gov` but you grant access to a contractor whose email address is `bob@contractor.com`, the contractor will not be limited to your configured IP address ranges. We recommend you give contractors an e-mail address within your domain like `contractor-bob@gsa.gov`, and grant roles to them using only that address.

## Restricting access to your own applications
This feature only limits requests to cloud.gov services, such as the Cloud Foundry API accessed via the command line and the [cloud.gov dashboard](https://dashboard.fr.cloud.gov). This feature does not restrict requests directly to applications that you run on cloud.gov. 

To limit requests to your own applications, [create a route service](https://docs.cloudfoundry.org/services/route-services.html#introduction) to act as a gatekeeper, then bind the gatekeeper service to the routes bound to your application. (The route service itself can run as an appliation in cloud.gov that proxies according to your needs.)
