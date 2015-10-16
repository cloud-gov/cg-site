---
menu:
  main:
    parent: ops
title: Creating an admin user
weight: 10
---

The true "root" admin user is defined in the initial deployment manifest under uaa > admin. We’ll use those credentials to connect to the deployed UAA instance and create delegated admin users.


#### Background:

The [User Account and Authentication server](https://github.com/cloudfoundry/uaa) is the identity management component of Cloud Foundry. Beyond the initial deployment manifest, all users and their permissions are defined in UAA.

#### Prerequisites:

- Knowledge of the secrets specified in the initial deployment manifest.
- A reachable CF UAA instance.
- A working ruby install.

#### Procedure:

1. [Installing the UAA CLI]({{< relref "#installing-the-uaa-cli" >}})
1. [Specifying the UAA Target]({{< relref "#specifying-the-uaa-target" >}})
1. [Obtaining A Token]({{< relref "#obtaining-a-token" >}})
1. [Confirming Authorization]({{< relref "#confirming-authorization" >}})
1. [Missing Permissions]({{< relref "#missing-permissions" >}})
1. [Creating A New User]({{< relref "#creating-a-new-user" >}})
1. [Adding User Permissions]({{< relref "#adding-user-permissions" >}})
1. [Confirming Creation]({{< relref "#confirming-creation" >}})
1. [Additional Resources]({{< relref "#additional-resources" >}})

##### Installing the UAA CLI:

	gem install cf-uaac

##### Specifying the UAA Target:

	uaac target uaa.cloud.gov

##### Obtaining A Token:

	uaac token client get admin

At the `Client secret:` prompt enter the secret specified in `uaa:admin:client_secret` in the deployment manifest.

Note: The client secret can specified on the command line with the `-s` switch, but it’s a good habit to avoid the possibility of leaving secrets in your shell history.

	Client secret:  ********************************

	Successfully fetched token via client credentials grant.
	Target: https://uaa.cloud.gov
	Context: admin, from client admin

##### Confirming Authorization:

Use `uaac context` to confirm your current authorization and permissions.

	[1]*[https://uaa.cloud.gov]
	  skip_ssl_validation: true

	  [0]*[admin]
	    client_id: admin
	    access token: ****
	    token_type: bearer
	      expires_in: ****
	    scope: scim.read uaa.admin password.write scim.write clients.write clients.read clients.secret
	    jti: ****

Note that the admin user has the scim.write permission which is required to create user accounts. If the admin account is missing this permission we’ll need to add it as described in Missing Permissions. Otherwise, jump ahead to Creating an Admin User.

##### Missing Permissions:

In the event that the admin user does not have the scim.write permission we can add it. First, we need to record the existing permissions of the admin account as displayed by the uaac context command above. We’ll use that space-delimited list of permissions in place of EXISTING-PERMISSIONS below.

	uaac client update admin --authorities “EXISTING-PERMISSIONS scim.write”

Delete the existing authorization token.

	uaac token delete

Obtain a new token bearing the update permissions.

	uaac token client get admin


##### Creating A New User:

Now that we have a authorization token bearing the scim.write permission in hand we can create a new user.

	uaac user add NEW-ADMIN-USERNAME --emails NEW-ADMIN-EMAIL

You’ll be prompted to provide an initial password.  Currently, we’re using first.last@gsa.gov as the convention for new usernames with the same for email.

**Note:** The client secret can specified on the command line with the `-p` switch, but it’s a good habit to avoid the possibility of leaving secrets in your shell history.


##### Adding User Permissions:

An admin user should be part of the four groups: `cloud_controller.admin`, `uaa.admin`, `scim.read` and `scim.write`. Add each with `uaac member add`.

    uaac member add cloud_controller.admin first.last@gsa.gov
    uaac member add uaa.admin first.last@gsa.gov
    uaac member add scim.read first.last@gsa.gov
    uaac member add scim.write first.last@gsa.gov

##### Confirming Creation:

We can view information about the newly created user by filtering the output of `uaac users`.

	uaac users 'username eq "first.last@gsa.gov"'

**Output:**

	resources:
	  -
	    id: ***
	    meta
	      version: 0
	      created: 2015-02-25T02:10:06.566Z
	      lastmodified: 2015-02-25T02:10:06.566Z
	    name
	    emails:
	    -
	      value: first.last@gsa.gov
	    groups:
	    -
	      value: ***
	      display: cloud_controller.read
	      type: DIRECT

		...lots of groups...

	      value: ***
	      display: oauth.approvals
	      type: DIRECT
	    approvals:
	    active: true
	    verified: false
	    origin: uaa
	    schemas: urn:scim:schemas:core:1.0
	    username: first.last@gsa.gov
	  schemas: urn:scim:schemas:core:1.0
	  startindex: 1
	  itemsperpage: 100
	  totalresults: 1

##### Additional Resources:

- For more information on filtering see the [UAA API docs](https://github.com/cloudfoundry/uaa/blob/master/docs/UAA-APIs.rst#a-note-on-filtering).

- The Cloud Foundry documentation includes a comprehensive [guide to user creation and management via cf-uaac](http://docs.cloudfoundry.org/adminguide/uaa-user-management.html#creating-admin-users).
