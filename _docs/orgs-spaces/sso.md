---
parent: orgs-spaces
layout: docs
sidenav: true
title: Single Sign-On Integration
---

If your agency has an identity provider that supports Single Sign-On (SSO) using one of the following protocols:

- SAML 2.0, such as Active Directory Federation Service (ADFS) or SecureAuth
- OAuth 2.0
- OpenID Connect (OIDC)

Then you can integrate your identity provider (IdP) with cloud.gov, at no cost, so users from your agency can authenticate to cloud.gov using your agency IdP.

## Process

The process for integrating with cloud.gov using your SSO solution is fairly simple and straightforward. To properly integrate, here is a high-level overview of the process:

1. Send an email to cloud.gov Support to get the process started, notifying us you'd like to integrate.
1. cloud.gov Support will ask you for the necessary information to integrate with your provider:
    - SAML 2.0
      - Public SAML 2.0 Endpoint (preferred) or Federation Metadata, **required**
      - 100x100 transparent PNG of your agency's seal, **required**
      - List of email domains to authenticate users against, **required**
    - OAuth
      - Client ID/secret, **required**
      - URL for authorize endpoint, **required**
      - URL for token endpoint, **required**
      - Token verification key **or** URL for token verification endpoint, **required**
      - Issuer URL for token verification endpoint if it is different than the token endpoint, **optional**
      - Attribute mappings, **required**
          - given_name: Attribute holding given name in the access token
          - family_name: Attribute holding family name in the access token
          - user_name: Attribute holding email in the access token
    - OIDC
      - Client ID/secret, **required**
      - List of email domains to authenticate users against, **required**
      - Discovery URL, **optional** (e.g. <https://accounts.google.com/.well-known/openid-configuration>)
        - If a discovery URL is provided, then you can omit several attributes like URLs for the issuer, authorization endpoint, token endpoint, userinfo endpoint, and token key endpoint
      - Issuer URL, **required if discovery URL is not provided**
      - URL for authorize endpoint, **required if discovery URL is not provided**
      - URL for token endpoint, **required if discovery URL is not provided**
      - URL for userinfo endpoint, **required if discovery URL is not provided**
      - URL for token keys endpoint, **optional**
      - Attribute mappings, **required**
          - given_name: Attribute holding given name in the OIDC ID Token
          - family_name: Attribute holding family name in the OIDC ID Token
          - user_name: Attribute holding email in the OIDC ID Token

    **Please note that displaying an agency seal when logging in is only supported for SAML integrations.**
1. Once cloud.gov Support has the information, we'll schedule and then deploy the configuration to our staging environment. This aspect can take a few weeks as it requires manual steps from the cloud.gov Operations team.
1. cloud.gov will notify you of when the IdP configuration is available in our staging environment.
1. You can try to log into our staging environment's user portal to ensure the login process works as intended and verify with cloud.gov Support you can log in successfully.
1. Once the previous step has been completed, the cloud.gov Operations team will schedule and deploy the configuration to our production environment, at which point your SSO configuration will be ready to go!

We provide SSO integration with federal agencies at no cost, since using an agency IdP reduces our overall support and compliance costs. Validation that you control an IdP with a valid U.S. government email domain is sufficient for our needs.

## System Information

By default, your SSO integration will appear on our default login page for all customers with your agency seal (for SAML only) and base email domain for an easy user experience. Below is a list of things that you may find useful for integrating with us, depending on your IdP's configuration.  The only attribute cloud.gov needs to authenticate a user is the email attribute as we manage group membership independently of the downstream IdP.

### Staging

This is the environment where we test the configuration first. It matches our production configuration minus the hostnames and endpoints.

#### Endpoints

- <https://uaa.fr-stage.cloud.gov>
- <https://login.fr-stage.cloud.gov>
- <https://login.fr-stage.cloud.gov/saml/metadata>

#### Entity ID

- `login.fr-stage.cloud.gov`

#### OIDC Configuration

- <https://login.fr-stage.cloud.gov/.well-known/openid-configuration>

### Production

The same configuration as our staging environment, just with production hostnames and endpoints.

#### Endpoints

- <https://uaa.fr.cloud.gov>
- <https://login.fr.cloud.gov>
- <https://login.fr.cloud.gov/saml/metadata>

#### Entity ID

- `login.fr.cloud.gov`

#### OIDC Configuration

- <https://login.fr.cloud.gov/.well-known/openid-configuration>

### Root Certificate

Here is the public key of our root certificate. Use this if you need to trust our SAML provider and you can't properly get it from our SAML endpoints.

```text
-----BEGIN CERTIFICATE-----
MIIDQDCCAiigAwIBAgIUdSLj/sB8SQy28obAq1Ya5VIn1CQwDQYJKoZIhvcNAQEL
BQAwMTEbMBkGA1UEAxMSbG9naW4uZnIuY2xvdWQuZ292MRIwEAYDVQQKEwljbG91
ZC5nb3YwHhcNMjMwNDI0MTQ1NTAwWhcNMjUwNDIzMTQ1NTAwWjAxMRswGQYDVQQD
ExJsb2dpbi5mci5jbG91ZC5nb3YxEjAQBgNVBAoTCWNsb3VkLmdvdjCCASIwDQYJ
KoZIhvcNAQEBBQADggEPADCCAQoCggEBAK3+XAy4xtG0tn4CRtURQLCHOYPPUdAZ
vf4XXxdpgA4YX2K/JeAPkcvGXe3z+ctPb0kpwhpcW03QJkANQ9TyPc+fgVmkqw9p
UaJcrr6idUqmnf7fmpHUlPMBsXuEkaWGrKP1V8Isar+t6vvpYO0KHRZN+rmePcyN
wsVSrmXFDkMSj/9+PgzDluP5OvYs/MhItMZb3w6hA3fx2iAnFAS9SnjMZhV9AHj9
gqJlHaa1pVFpAxYcnlngl6was+lKdsn3uWmzg7sV8jP/iqxTGviceFSFGgql1dOO
aBLQ2IFGM8db23gNyutSQNaBOmoJUZK6aMF3fxSoVPmWvzApS/9JBpECAwEAAaNQ
ME4wHQYDVR0OBBYEFKNmHGxEFv0tMWiOIkZyBO54D8WOMB8GA1UdIwQYMBaAFHcv
H3gWxXx9Lqiws6rvPUHA97qQMAwGA1UdEwEB/wQCMAAwDQYJKoZIhvcNAQELBQAD
ggEBAH+KOPGKn4DAFQSTzuGZGSvSjOeKNesZf27IwpsP2Pjf/tSO8BkpvvQPzcsv
MFM5Rilj9o6SD+iW1Cl7LAqbOgKLa4FXXgJE5Wf22KutEru9hdleYVSq+dDJfiZ/
CwW3BnCgfZ7L5sSUTx8RG6FpX5mS6Rxl9Y76MO+x56GpHdhewHtPxNubKdK2SDfB
wTIQPR49xbHQtWoTTSIrq4mgacfrDAgaVIIPG6P8jC54lnZWSTDraSOFGdXeJ7Wl
DETKz0Dk7ReewYLckujTDebf8U1NVc6dAedg6+AmXjP5VFheYT59w69hPQ+q48FN
QsUE9cqEYgqzbPgWAYCtmTQW6Xw=
-----END CERTIFICATE-----
```

### Upstream Documentation

If you would like to understand how the integration works, please see the [open source documentation](https://docs.cloudfoundry.org/uaa/identity-providers.html). LDAP integration is not supported, only SAML. In the existing configuration, cloud.gov acts as the Service Provider (SP) in the SAML assertion workflow, and any authentication requests coming from cloud.gov will be SP initiated. IdP initiated authentication is not supported.

## Active Directory Federation Services Integration Reference

This is a basic reference of steps used to configure Active Directory Federation Services (ADFS) as a SAML IdP for your agency in cloud.gov. These steps listed are intended to be used as a reference, not a source of truth, as every agency will likely have a different configuration. These steps were kindly donated to cloud.gov by the folks from the Office of Management and Budget (OMB).

### Add Relying Party Trust

#### Add a new Relying Party Trust

You can find the Microsoft documentation for configuring a Relying Party Trust [here](https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/operations/create-a-relying-party-trust). You will need to select the *Claims-aware Trust* radio button.

#### Select a Data Source

Select the *Import data about the relying party published online or on a local network* radio button. While you can download the cloud.gov SAML SP metadata, by referencing our metadata endpoint, you can receive any updates as we push them out. Enter the staging or production metadata URL referenced in the System Information section.

#### Specify Display Name

This value can be whatever you want it to be, we recommend attaching an environment reference so it's easily distinguishable between the cloud.gov environments at a glance. Notes are optional and at your discretion.

#### Choose Access Control Policy

Apply whichever policy is relevant to your agency, however it's recommended to allow _Permit Everyone_ as cloud.gov manages user authorization within the platform.

#### Ready to Add Trust

Verify the initial configuration is valid and then save it.

#### Secure Hash Algorithm

In order to properly ensure all data is encrypted and decrypted in the same format, the relying party trust needs to use the same algorithm cloud.gov uses.

1. Double-click the new relying party trust.
1. In the Advanced tab, select SHA1 for the Secure hash algorithm.

#### Configure Certificate

You can find our root certificate referenced above if you need to explicitly trust our system. Our referenced root certificate is PEM encoded, so you will need to convert it to a format supported by Windows. You can use whichever tools you are most comfortable with for the conversion, if you would like to use open source tooling, Stack Overflow user evergreen has a great guide about using OpenSSL to convert certificates between various encodings, you can find that guide [here](https://stackoverflow.com/a/38408666/4949938).

To import the encoded certificate into ADFS, you will need to execute these steps on all servers configured to respond to SAML requests.

1. On the ADFS server, start MMC (`mmc.exe`).
1. Add the Certificates snap-in for the computer account and manage certificates for the local computer.
1. Import the root CA certificate into Trusted Root Certification Authorities > Certificates.

ADFS will refresh it's certificate store the next time an authentication request comes in, no need to take manual steps.

#### Disable Revocation Checking

cloud.gov does not support certificate revocation checking, so the certificate revocation check will need to be disabled. This is specific to the cloud.gov relying party trust and will not impact other configurations.

Run this command in Powershell:

```powershell
Set-AdfsRelyingPartyTrust -TargetName "<display-name>" `
  -EncryptionCertificateRevocationCheck None `
  -SigningCertificateRevocationCheck None
```

#### Create a Claim Mapping

In order to properly map users in your SSO system to the cloud.gov SAML identifier, you may need to create a claim policy. If this is the case, you will need to take these steps for each of the cloud.gov environments.

1. Select the cloud.gov relying party trust.
1. Right-click > Edit Claim Issuance Policy
1. Add Rule
1. You can name the rule whatever is easiest to understand, we recommend something similar to *Transform NameID to Email* so it's clear.
1. Here are the field values to set
    1. Incoming claim type: *E-Mail Address*
    1. Outgoing claim type: *Name ID*
    1. Outgoing name ID format: *Email*
1. Select the *Pass through all claim values* radio button.
1. Save the policy.

#### Test

This is the end of the reference kindly donated by OMB, please ensure you try to log into cloud.gov.

## Help

We are committed to improving the user experience of government. If you have questions, please don't hesitate to reach out at [support@cloud.gov](mailto:support@cloud.gov). We recommend that you subscribe to service updates at the [cloud.gov StatusPage](https://cloudgov.statuspage.io/).
