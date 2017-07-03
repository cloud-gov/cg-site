+++
date = "2017-07-03"
title = "Changes to our UAA credentials broker"
+++

Use our [UAA credentials broker](https://github.com/cloudfoundry-community/uaa-credentials-broker)
for either [cloud.gov identity provider]({{< relref "services/cloud-gov-identity-provider" >}})
or [cloud.gov service account]({{< relref "services/cloud-gov-service-account" >}})?
Check out our latest update which removes the Fugacious / Toaster dependency and
improves the user experience of managing UAA credentials.
<!--more-->

The service account and identity provider services have been updated to give you service credentials directly from cloud.gov, without using Toaster (formerly Fugacious). This simplifies how you set up these services, and it enables you to access the service credentials any time you need to. It also reduces our dependencies on other services.

Previously, you provisioned a service instance to create a service account or identity provider, then accessed the credentials using a temporary link from Toaster (Fugacious). Now you provision a service instance, then bind it to a service key to create a service account or identity provider. You now access credentials for that service key directly from the cloud.gov command line (CF CLI). If you want another service account or identity provider for the same space, you can bind it to another service key.

Create service key:

    $ cf create-service-key ${my_service_account} my-service-key

Retrieve credentials from service key:

    $ cf service-key ${my_service_account} my-service-key

To rotate or deprovision when user or client is no longer needed, delete the service key:

    $ cf delete-service-key my-service-account my-service-key

Existing service accounts and identity providers will continue to work as normal (your existing credentials for those services continue to work, so your continuous deployments won’t be disrupted). To switch to using this new method for getting credentials, delete your service instances and create new ones.

