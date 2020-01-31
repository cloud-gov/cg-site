---
menu:
  docs:
    parent: orgs-spaces
title: Single Sign-On Integration
---

If your agency has an identity provider that supports SAML 2.0-based Single Sign-On (SSO), such as Active Directory Federation Service (ADFS) or SecureAuth, you can integrate your identity provider (IDP) with cloud.gov so that users from your agency can authenticate to cloud.gov using your agency IDP.

## Process

The process for integrating with cloud.gov using your SSO solution is fairly simple and straightforward. To properly integrate, here is a high-level overview of what the process looks like.

1. Send an email to cloud.gov Support to get the process started, notifying us you'd like to integrate.
1. cloud.gov Support will ask you for three things:
    * Public SAML 2.0 Endpoint (preferred) or Federation Metadata
    * 100x100 transparent PNG of your agency's seal
    * List of email domains to authenticate users against
1. Once cloud.gov Support has the information, we'll schedule and then deploy the configuration to our staging environment. This aspect can take several weeks.
1. cloud.gov will notify you of when the IDP configuration is available in our staging environment.
1. You can try to log into our staging environment's user portal to ensure the login process works as intended and verify with cloud.gov Support you can log in successfully.
1. Once the previous step has been completed, the cloud.gov Operations team will schedule and deploy the configuration to our production environment, at which point your SSO configuration will be ready to go!

## System Information

By default, your SSO integration will appear on our default login page for all customers with your agency seal and base email domain for an easy user experience. Below is a list of things that you may find useful for integrating with us, depending on your IDP's configuration. 

### Staging

This is the environment where we test the configuration first. It matches our production configuration minus the hostnames and endpoints.

*Endpoints* 
* https://uaa.fr-stage.cloud.gov
* https://login.fr-stage.cloud.gov

*Entity ID*
* login.fr-stage.cloud.gov

*OIDC Configuration*
* https://login.fr-stage.cloud.gov/.well-known/openid-configuration

### Production

The same configuration as our staging environment, just with production hostnames and endpoints.

*Endpoints* 
* https://uaa.fr.cloud.gov
* https://login.fr.cloud.gov

*Entity ID*
* login.fr.cloud.gov

*OIDC Configuration*
* https://login.fr.cloud.gov/.well-known/openid-configuration

### Root Certificate

Here is the public key of our root certificate. Use this if you need to trust our SAML provider.

```
-----BEGIN CERTIFICATE-----
MIIFSDCCAzCgAwIBAgIBATANBgkqhkiG9w0BAQsFADBEMRgwFgYDVQQKEw9HU0Eg
LyBUVFMgLyAxOEYxEjAQBgNVBAsTCWNsb3VkLmdvdjEUMBIGA1UEAxMLbWFzdGVy
LWJvc2gwHhcNMTcwOTE1MDM1ODIwWhcNMjcwOTE1MDM1ODI3WjBEMRgwFgYDVQQK
Ew9HU0EgLyBUVFMgLyAxOEYxEjAQBgNVBAsTCWNsb3VkLmdvdjEUMBIGA1UEAxML
bWFzdGVyLWJvc2gwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQDMYV8M
2uYMCaeqnfIL2aV59VNzad7ahNywftR+l/7TtKNW6/fHgKtfBCIKnUG0ef1X0Stc
WcgAhNSzn70DA25Hak+cqV90vRh5UPi2XsLXvWvO9A8jksrMxcOKzEVjmz4iu98Q
2BVkVHy2mDLTuXO2WZ6/Qh0/ahpRyc7hIjmMidL//BayOmMp/2ynqq1OeWfybsR1
yr9L9odCVKyfENG6Tedg+F2tm39yNVZvDM6sSMsmjq/XL9zpnPq1NE0HPq3rG4KZ
EYTcyhIdsLN/bnwQ2IcvpE8VJoxmw8tO2Q70nVrfh5VuX7FHp1kmKvIdHZRujUl/
FE8PEzKHt2kPJtj+tpthBvUGMsSla2FP6ZkjPbbKiUBRTTcbgFDr1l9uA+mliPL+
lIUrU9IDTU4K/gH4esMbw8uYSIaVh6lLR8AT0FPtdEYBg1PTDtY37vVoA0vZS4zH
rhgXqZ45APRNcloHdxFfeB6Kk8KfV5PuIpXh5bupk1jZQQ759yI78myJEPSlvZjn
eqpp7ZM7eoTcGjHBXRVIwMHPCki+2yZ9EAPbkuFUTL9cs1xea5jz6bbugQOSY/yS
xfQkiPQpDLVv522PNJpTfpXHHk5z7aKfB4TzoxbP+Xd/omkexzM2711fKHcsjd7j
sLn0vxqBaw2Lm+Y9QczltMfHx0bo3RvlykHedwIDAQABo0UwQzAOBgNVHQ8BAf8E
BAMCAQYwEgYDVR0TAQH/BAgwBgEB/wIBADAdBgNVHQ4EFgQUDLeETJEoxUyUzz8y
yhq/JSJIAXgwDQYJKoZIhvcNAQELBQADggIBAHGP+ZIg8shzgQS7MKv0wfj/Z5ei
an30oHds/QdtFYU6Il8wJaHS4bbrRfhvSljQt9fDe+RiuDeKn2fu/N1EMGWo8zfJ
I6dekjM/6sg7mGpRsZND4R2BMg8L3/ITLunVKDl2AIVO/j59sbLytz/0N0KcmPyT
gmFFAmU5TipMpTRd4c6sSCquUm6sJLp19zcbnOovb0Mxpf/aTsWU9bnNjcudvNwT
tLISqHTzRPhwIKNJ6hIK04/1hJVcG8HjWkV7qqOLARYru4eFQgn4gMXxSF/5y+Pg
jsOtenCo1/CJz31xxjzU2kMnSyb+VTdV0/2vb04qSkgYrLB4gbqQnRMFXoU6rNBe
T2MYzgTReB4kqOnEn2d2gE1SSDS8RbZSIZTpP7ncrUeYmvzWY94XyNyJwGnKBrKF
dh2qb68wbLYoOlVQ85q+SF9u8HUtMx0JV8SX9FHFee5+rqhpw8QXtzmWb0LnPA4M
xo+EfQrpXDxrKzaUDV4/DoQaAeYLTjoedSis7MdKJJs4ZSbSfPPkItcUGLRlEMGL
NKzvsaMXJlBk3J+lUM5hpgM4qRJgqK8AGqLyraFPal9uD5ed5R/scZzHznY9BzGF
ml254TrTDTplo4qoBbWH4amGqN8A4T55Uf34s8K6DjE9hmR3zAWcIc7L7pYkEAH2
xY5KVL5IjegnPTy+
-----END CERTIFICATE-----
```

### Upstream Documentation

If you would like to understand how the integration works, please see the [open source documentation](https://docs.cloudfoundry.org/uaa/identity-providers.html). LDAP integration is not supported, only SAML. In the existing configuration, cloud.gov acts as the Service Provider (SP) in the SAML assertion workflow, and any authentication requests coming from cloud.gov will be SP initiated. IDP initiated authentication is not supported.
