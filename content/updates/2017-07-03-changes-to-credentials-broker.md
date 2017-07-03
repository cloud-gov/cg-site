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

## Usage

### UAA users

* Create service instance:

    ```bash
    $ cf create-service cloud-gov-service-account space-deployer my-service-account
    ```

* Create service key:

    ```bash
    $ cf create-service-key my-service-account my-service-key
    ```

* Retrieve credentials from service key:

    ```bash
    $ cf service-key my-service-account my-service-key
    ```

* To rotate or deprovision when user is no longer needed, delete the service key:

    ```bash
    $ cf delete-service-key my-service-account my-service-key
    ```

### UAA clients

* Create a service instance:

    ```bash
    $ cf create-service cloud-gov-identity-provider oauth-client my-uaa-client
    ```

* Create service key:
dashboard link accessible via:

    ```bash
    $ cf create-service-key my-uaa-client my-service-key \
        -c '{"redirect_uri": ["https://my.app.cloud.gov/auth/callback"]}'
    ```

* Retrieve credentials from service key:

    ```bash
    $ cf service-key my-uaa-client my-service-key
    ```

* To rotate or deprovision when client is no longer needed, delete the service key:

    ```bash
    $ cf delete-service-key my-uaa-client my-service-key
    ```
