---
menu:
  main:
    parent: operations
title: Deployer OAuth Client
---

## Creating OAuth Client for deployer accounts

In order to provide posibility for users to create long lived tokens for their deployer accounts, you should create additional OAuth client. This client should be configured to issue refresh tokens with large expiration date. As long as refresh token is not expired, cf cli can use it to obtain access token and login to Cloud Foundry, even if user's password is already expired. You can create OAuth client with proper configuration using the following steps:

*It is also posible to configure the client to issue long lived access tokens, instead of refresh tokens. This is not the best option, because you lose posibility to change user rights or delete user - as long as access token is not expired user can use it to login to Cloud Foundry, even if user by itself is already deleted.*

1. Install [uaac](https://docs.cloudfoundry.org/adminguide/uaa-user-management.html) command line tool
  ```
  sudo apt-get install ruby2.1-dev -y
  sudo gem install cf-uaac
  ```
  *The version of ruby-dev gem may be different, if you use different version of ruby*
1. Target your UAA server
  ```
  uaac target <uaa-server-url>
  ``` 
1. Obtain admin token
  ```
  uaac token client get admin -s <admin-client-secret>
  ```
  *The value for <admin-client-secret> can be found in Cloud Foundry deployment manifest at `uaa.clients.admin.secret` path* 
1. Create new OAuth client with large value for `refresh_token_validity` parameter
  ```
  uaac client add cd_client --name cd_client  --scope cloud_controller.read,cloud_controller.write,openid,password.write,cloud_controller.admin,scim.read,scim.write,doppler.firehose,uaa.user,routing.router_groups.read --authorized_grant_types password,refresh_token --refresh_token_validity <value-in-seconds>
  ```
  You will be prompted for the password. You should keep it empty. There is no point in setting the password for the client, because even if you set it, you must expose this password for all you users. Without knowing client password cf cli will be unable to use refresh token and obtain access token.
  *The scopes and grant types for this client are copied from default `cf` client, that cf cli uses to authetificate against UAA*
