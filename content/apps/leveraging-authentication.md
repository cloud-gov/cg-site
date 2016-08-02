---
menu:
  main:
    parent: advanced
title: Leveraging cloud.gov Authentication
---

cloud.gov uses Cloud Foundry's [User Account and Authentication (UAA) server](https://docs.cloudfoundry.org/concepts/architecture/uaa.html) to provide identity management capabilities for the cloud.gov platform. App developers can also leverage cloud.gov's UAA instance as a backend that brokers authentication with supported identity providers (currently GSA and EPA). Essentially, you can (and probably should) use cloud.gov's authentication brokering if the users that you need to authenticate in your application are employees of any of the supported agencies.

## Using cloud.gov authentication

### Register your application instances

You will first need to register all instances (such as dev, staging, and production) with cloud.gov's UAA. Right now this is a manual process, so you will need to contact a member of the cloud.gov team, preferably through the [#cloud-gov-support](https://18f.slack.com/messages/cloud-gov-support) channel in Slack.

For each application instance, you will need to provide:

- a name (such as `my-project-dev`)
- a callback URL (such as `http://example.com/auth/callback`)

The cloud.gov team member who is assisting you will provide a `client_secret` for each registered application. You should protect these secret keys as you would a password.

### Integrate with your application

UAA handles authentication according to the [OpenID Connect](http://openid.net/connect/) specification, which is "a simple identity layer on top of the OAuth 2.0 protocol."

There are two important cloud.gov URLs you will need to use:

- `https://login.cloud.gov/oauth/authorize`, which is where you will direct the user to login with their agency credentials
- `https://uaa.cloud.gov/oauth/token`, which is where you will exchange auth codes for auth tokens

If you are already familiar with OAuth 2.0, you might know where to go from here. If not, read on for a minimal example of how to do the OAuth dance. Here's the basic gist of it:

`1.` Generate a link (or redirect the user) to the authorize URL with these query parameters:

* `client_id=<YOUR APP'S REGISTERED NAME>`
* `response_type=code`
* (optional) `state=<ANYTHING>`

You can optionally set a `state` parameter with any value you'd like.
It will be returned to you in a later step. An example of something you might
want to set in state is the URL in your application that the user was attempting
to access.

Here is an example:

  ```html
  <a href="https://login.cloud.gov/oauth/authorize?client_id=NAME&response_type=code">
    Log in
  </a>
  ```

`2.` Once the user visits the authorize URL and successfully logs in with their
credentials, your app will receive a `GET` request to the callback URL
associated with the registered app. The `GET` request will include query parameters:

* `code=<A UNIQUE ACCESS CODE`
* (optional) `state=<VALUE FROM STATE PARAM IN AUTHORIZE LINK>`

Here is where things get fun. A snippet of example NodeJS code is shown
[below](#token-exchange-example-code) to help illustrate this part of the process.

  `1)` First, exchange the `code` for an authorization token by sending a `POST`
  request to the token endpoint (`https://uaa.cloud.gov/oauth/token`)
  with the following form-encoded parameters:

  - `code=<CODE FROM QUERY PARAM IN CALLBACK REQUESt>`
  - `grant_type='authorization_code'`
  - `response_type='token'`
  - `client_id=<YOUR APP'S REGISTERED NAME>`
  - `client_secret=<THE SECRET KEY YOU RECEIVED WHEN REGISTERING YOUR APP>`

  `2)` If everything works and UAA is able to verify your request, the response
  from that `POST` request will be JSON encoded and will contain these important
  members:

  - `access_token` - a [JSON Web Token](https://jwt.io/)
  - `expires_in` - time in seconds until the `access_token` expires
  - `refresh_token` - a refresh token that can be exchanged for another
  `access_token` when the current one expires

  `3)` The `access_token` is a JSON Web Token that can be decoded using a
  library such as [node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken).
  See https://jwt.io/ for a list of libraries for various languages. Decode it
  to get the authenticated user's `email`, which you can then use within
  your application to identify and/or authorize the user.

  If you get an expired token error at some point in the future, you can
  exchange the `refresh_token` from the previous step to get a new `access_token`,
  so you might want to securely save the `refresh_token` associated with the
  authenticated user.


#### Token Exchange Example Code

```javascript
const UAA_TOKEN_URL = 'https://uaa.cloud.gov/oauth/token';

// Exchanges an authorization code for an authorization token
function exchangeCodeForAuthToken(code, callback) {
  request.post(UAA_TOKEN_URL, {
    form: {
      code,
      grant_type: 'authorization_code',
      response_type: 'token',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    },
  }, callback);
}

// Handler for the registered callback URL
app.get('/auth/callback', (req, res) => {
  if (!req.query.code) {
    res.status(400).send('Missing "code" query parameter');
    return;
  }

  exchangeCodeForAuthToken(req.query.code, (err, response, body) => {
    if (err) {
      res.status(400).send(err);
      return;
    }

    const responseBody = JSON.parse(body);

    // The access token is a JSON Web Token, which can be decoded
    // to retrieve encoded information.
    // ref: https://jwt.io/
    // The module used here is https://github.com/auth0/node-jsonwebtoken
    const decodedToken = jwt.decode(responseBody.access_token);
    const userEmail = decodedToken.email;

    res.send(`Hello, ${userEmail}! You have successfully authenticated.`);
  });
});
```

## Resources

- [Full UAA API documentation](https://github.com/cloudfoundry/uaa/blob/master/docs/UAA-APIs.rst)
- [OpenID Connect](http://openid.net/connect/)
- [JSON Web Tokens](https://jwt.io/)
