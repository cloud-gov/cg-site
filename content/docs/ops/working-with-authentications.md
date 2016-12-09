---
menu:
  docs:
    parent: operations
title: Working with cloud.gov authentication
---

When users of cloud.gov want to leverage the cloud.gov UAA for authentication for an application, they should follow [the "Leveraging cloud.gov authentication" guide]({{< relref "docs/apps/leveraging-authentication.md" >}}). That guide includes contacting a member of the cloud.gov team for help setting it up.

The following documentation provides the associated steps for cloud.gov team members for creating cloud.gov authentication.

## Creating a cloud.gov authentication

To work with the UAA server, you will need to have the `uaac` client installed
on your system. For more information, [please refer to the official UAA
documentation](https://github.com/cloudfoundry/cf-uaac#installation).

```shell
gem install cf-uaac
```

### Targeting the UAA server

Once the `cf-uaac` gem is installed, you need to target the UAA server.

```shell
$ uaac target https://uaa.cloud.gov

Target: https://uaa.cloud.gov
```

After targeting the server, you need to fetch the client token for the admin
user. The `ADMIN_CLIENT_SECRET` will need to be added to the command for the
specific environment that is being targeted in the previous command.

```shell
$ uaac token client get admin -s <ADMIN_CLIENT_SECRET>

Successfully fetched token via client credentials grant.
Target: https://uaa.cloud.gov
Context: admin, from client admin
```

### Use the cg-scripts repository

To help with the creation of authentication endpoints for application instances,
the [`cg-scripts` repository](https://github.com/18F/cg-scripts) provides scripts to automate parts of
the process involving `scope`, `authorized_grant_types`, and `authorities`.

```shell
  # ... parameter flags passed to uaac
  --scope "openid" \
  --authorized_grant_types "authorization_code,refresh_token" \
  --authorities "uaa.none"  \
  # ... truncated for brevity
```

Please use the `cg-scripts/uaa-create-auth-client.sh` script to create
authentication clients, instead of doing this process manually.

### Generating a client creation file

To help with the transferring of the `client_secret` to the user who requested
the application instances, it's helpful to create executable files which hard-
code the `CLIENT_NAME`, `CLIENT_SECRET`, and `CLIENT_CALLBACK` as parameters.

This file should be used to both create the authentication client _and_ to provide
the credentials to the user using [Fugacious](https://fugacious.18f.gov/).

Running the following command will generate boilerplate for a client creation
file. Create a separate client secret file for each kind application instance
requested.

```shell
$ echo "#\!/bin/sh\nset -e\n./uaa-create-auth-client.sh '<CLIENT_NAME>' '<CLIENT_SECRET>' '<CLIENT_CALLBACK>'" > <CLIENT_NAME>-auth

# Remember to use 'full-quoting' to avoid reinterpretation of all special characters within the quoted string
# '<CLIENT_NAME>' - the name supplied in the user's request
# '<CLIENT_SECRET>' - the generated secret / password
# '<CLIENT_CALLBACK>' - the callback URL supplied in the user's request
```

Edit the newly created `*-auth` file(s), generated via the command above, in a
text editor and replace the `CLIENT_NAME` and `CLIENT_CALLBACK` values with the
values from the user's request.

### Generating a `CLIENT_SECRET`

The `CLIENT_SECRET` value should be generated using the commands in
`cg-scripts/generate-passphrase`.

```shell
# example output from `cg-scripts/generate-passphrase`

$ ./generate-passphrase 48
t73secuR3P@$$w0rd # ... fake generated password
```

### Using the generated client creation file

Once the files are generated and edited, you can begin the creation process for
client authentications by executing the `*-auth` file(s) in a shell.

```shell
# examples below assume CLIENT_NAME is `my-project-*`

sh my-project-dev-auth
sh my-project-staging-auth
sh my-project-production-auth
```

### Handing off credentials to the user

Once the client creation file(s) have successfully been run, here's how to hand over credentials.

Open the client creation file(s) in a text
editor and copy out the `CLIENT_NAME` and `CLIENT_SECRET` values, removing the
single quotes at the beginning and end of each, and separate them with a `:`
(colon character).

Then use [Fugacious](https://fugacious.18f.gov/) to send it to the user. Choose the Fugacious settings according to our [sharing secret keys policy]({{< relref "docs/ops/secrets.md#sharing-secret-keys" >}}), and tell the user that the link is limited to those hours and views. Due to a limitation of how Fugacious processes whitespace, you should create one Fugacious link for each client authorization instance.

```txt
Example credentials pasted into Fugacious
    => my-project-dev:t73secuR3P@$$w0rd
Example URL from Fugacious
    => https://fugacious.18f.gov/m/iWmMDEl6zZoEx78Lxsa5QJLLQVpiuLGox

Example credentials pasted into Fugacious
    => my-project-staging:t73secuR3P@$$w0rd2
Example URL from Fugacious
    => https://fugacious.18f.gov/m/iWmMDEl6zZoEx78Lxsa5QJLLQVpiuLGox

Example credentials pasted into Fugacious
    => my-project-production:t73secuR3P@$$w0rd3
Example URL from Fugacious
    => https://fugacious.18f.gov/m/iWmMDEl6zZoEx78Lxsa5QJLLQVpiuLGox
```
