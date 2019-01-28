---
menu:
  docs:
    parent: experimental
title: Restricting users to trusted IP ranges
---

You can configure cloud.gov to restrict users in a particular domain (e.g., `agency.gov`) from using cloud.gov services unless their requests originate from a trusted network location. You can use this feature to help your agency comply with the [Trusted Internet Connections (TIC) Initiative](https://www.dhs.gov/trusted-internet-connections) while using cloud.gov. For more context, see [Meeting TIC requirements]({{< relref "docs/compliance/meeting-tic-requirements.md" >}}).

This feature only limits requests to cloud.gov services, such as the cloud.gov API accessed via the command line and the [cloud.gov dashboard](https://dashboard.fr.cloud.gov). This feature does not restrict requests directly to applications that you run on cloud.gov, though [you can do that](#restricting-access-to-your-own-applications) on your own.

### Contact support to configure restrictions for your domain

_Note: As of October 2017, this feature is not yet available, pending FedRAMP approval. If you want to configure this feature, create a ticket and our team will let you know our estimated timeline for approval._

Create a [support ticket](mailto:cloud-gov-support@gsa.gov?body=Email%20domain%3A%0A%0AEgress%20IP%20ranges%3A%0A%0AAgency%20CIO%3A%0A) specifying the IP address ranges that are valid for your domain. Because address restriction applies to all cloud.gov users from your email domain, we will request confirmation from your agency CIO before changing the configuration.

### Grant roles only to users from your restricted domain
To fully limit access to your apps and services, you must ensure that all users with roles in your orgs and spaces are using email addresses within your email domain. For example, if your email domain is `agency.gov` but you grant access to a contractor whose email address is `bob@example.com`, the contractor will not be limited to your configured IP address ranges. We recommend you give contractors an e-mail address within your domain like `contractor-bob@agency.gov`, and grant roles to them using only that address.

## Restricting access to your own applications

To limit requests to your own applications, you can modify your application logic directly. Alternatively, you can [create a route service](https://docs.cloudfoundry.org/services/route-services.html#introduction) to act as a gatekeeper, then bind the gatekeeper to the routes bound to your application. The route service itself can be an application in cloud.gov that proxies according to your needs. For example, you can create a simple route service by [deploying the Staticfile buildpack configured with a custom `nginx.conf` file](https://docs.cloudfoundry.org/buildpacks/staticfile/index.html#config-process).
