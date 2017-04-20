---
menu:
  docs:
    parent: advanced
title: Leveraging cloud.gov authentication
---

cloud.gov uses Cloud Foundry's [User Account and Authentication (UAA) server](https://docs.cloudfoundry.org/concepts/architecture/uaa.html) to provide identity management capabilities for the cloud.gov platform.

App developers can leverage cloud.gov's UAA instance as a backend that brokers authentication with [supported identity providers]({{< relref "accounts.md#to-get-access-to-cloud-gov" >}}) (currently EPA, FDIC, GSA, and a cloud.gov provider that supports other agencies). You can use cloud.gov's authentication brokering if the users that you need to authenticate in your application are federal employees and contractors who can use those authentication methods.

This service handles only authentication, not authorization -- it's up to your application to manage what they can access within the application. Once you set it up, you can direct your users to the [list of ways to get cloud.gov access]({{< relref "accounts.md#to-get-access-to-cloud-gov" >}}); they don't need any org or space roles, they just need to be able to log into cloud.gov.

## Using cloud.gov authentication

### Register your application instances

You will first need to register all instances (such as dev, staging, and production) with cloud.gov's UAA. To register your instance, use the [cloud.gov identity provider]({{< relref "docs/services/cloud-gov-identity-provider.md" >}}) service.

### Integrate with your application

UAA handles authentication according to the [OpenID Connect](http://openid.net/connect/) specification, which is "a simple identity layer on top of the OAuth 2.0 protocol."

There are two important cloud.gov URLs you will need to use:
{{% govcloud %}}
- `https://login.fr.cloud.gov/oauth/authorize`, which is where you will direct the user to login with their agency credentials
- `https://uaa.fr.cloud.gov/oauth/token`, which is where you will exchange auth codes for auth tokens
{{% /govcloud %}}

If you are already familiar with OAuth 2.0, you might know where to go from here. If not, read on for a basic example of how to do the OAuth dance.

#### Send your user to login.fr.cloud.gov

First, generate a link (or redirect the user) to the authorize URL with these
query parameters:

* `client_id=<YOUR APP'S REGISTERED NAME>`
* `response_type=code`
* (optional) `state=<ANYTHING>`

You can optionally set a `state` parameter with any value you'd like.
It will be returned to you in a later step. While optional, it's highly
recommended that you use it for [security reasons](http://www.twobotechnologies.com/blog/2014/02/importance-of-state-in-oauth2.html).

Here is an example:

```html
<a href="https://login.fr.cloud.gov/oauth/authorize?client_id=NAME&response_type=code">
  Log in
</a>
```

Once the user clicks on this link, they will be sent to cloud.gov to login.

#### The user is returned to your site

Once the user successfully logs in with their credentials, your app will
receive a `GET` request to the callback URL associated with the registered
app. The `GET` request will include query parameters:

* `code=<A UNIQUE ACCESS CODE>`
* (optional) `state=<VALUE FROM STATE PARAM IN AUTHORIZE LINK>`

Now your site's backend will need to exchange the access code for an
access token. Here is where things get fun.

1.  First, exchange the `code` for an authorization token by sending a
    `POST` request to the token endpoint
    (`https://uaa.fr.cloud.gov/oauth/token`) with the following form-encoded
    parameters:

    - `code=<CODE FROM QUERY PARAM IN CALLBACK REQUEST>`
    - `grant_type='authorization_code'`
    - `response_type='token'`
    - `client_id=<YOUR APP'S REGISTERED NAME>`
    - `client_secret=<THE SECRET KEY YOU RECEIVED WHEN REGISTERING YOUR APP>`

2.  If everything works and UAA is able to verify your request, the response
    from that `POST` request will be JSON encoded and will contain these
    important members:

    - `access_token` - a [JSON Web Token](https://jwt.io/)
    - `expires_in` - time in seconds until the `access_token` expires
    - `refresh_token` - a refresh token that can be exchanged for another
      `access_token` when the current one expires

3.  The `access_token` is a JSON Web Token that can be decoded using a
    library such as [node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken).
    See https://jwt.io/ for a list of libraries for various languages. Decode it
    to get the authenticated user's `email`, which you can then use within
    your application to identify and/or authorize the user.

    If you get an expired token error at some point in the future, you can
    exchange the `refresh_token` from the previous step to get a new `access_token`,
    so you might want to securely save the `refresh_token` associated with the
    authenticated user.

For an example of this entire process in under 100 lines of node JS, see the
[example client](https://github.com/18F/cg-fake-uaa/tree/master/example-client).

## Using the fake UAA server

During development, you may want to authenticate against a local server
running [cg-fake-uaa](https://github.com/18F/cg-fake-uaa), a minimal
"fake" version of the cloud.gov UAA server. Aside from making login easier
and allowing for offline development, it also makes the OAuth handshake
easier to debug.

## Resources

- [Full UAA API documentation](https://github.com/cloudfoundry/uaa/blob/master/docs/UAA-APIs.rst)
- [OpenID Connect](http://openid.net/connect/)
- [JSON Web Tokens](https://jwt.io/)
