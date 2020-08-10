---
parent: orgs-spaces
layout: docs
sidenav: true
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
1. Once cloud.gov Support has the information, we'll schedule and then deploy the configuration to our staging environment. This aspect can take a few weeks as it requires manual steps from the cloud.gov Operations team.
1. cloud.gov will notify you of when the IDP configuration is available in our staging environment.
1. You can try to log into our staging environment's user portal to ensure the login process works as intended and verify with cloud.gov Support you can log in successfully.
1. Once the previous step has been completed, the cloud.gov Operations team will schedule and deploy the configuration to our production environment, at which point your SSO configuration will be ready to go!

## System Information

By default, your SSO integration will appear on our default login page for all customers with your agency seal and base email domain for an easy user experience. Below is a list of things that you may find useful for integrating with us, depending on your IDP's configuration.  The only attribute cloud.gov needs to authenticate a user is the email attribute as we manage group membership independently of the downstream IDP.

### Staging

This is the environment where we test the configuration first. It matches our production configuration minus the hostnames and endpoints.

*Endpoints* 

* https://uaa.fr-stage.cloud.gov
* https://login.fr-stage.cloud.gov
* https://login.fr-stage.cloud.gov/saml/metadata

*Entity ID*

* login.fr-stage.cloud.gov

*OIDC Configuration*

* https://login.fr-stage.cloud.gov/.well-known/openid-configuration

### Production

The same configuration as our staging environment, just with production hostnames and endpoints.

*Endpoints* 

* https://uaa.fr.cloud.gov
* https://login.fr.cloud.gov
* https://login.fr.cloud.gov/saml/metadata

*Entity ID*

* login.fr.cloud.gov

*OIDC Configuration*

* https://login.fr.cloud.gov/.well-known/openid-configuration

### Root Certificate

Here is the public key of our root certificate. Use this if you need to trust our SAML provider and you can't properly get it from our SAML endpoints.

```
-----BEGIN CERTIFICATE-----
MIIC+jCCAeICCQCyj8QPRt2mDzANBgkqhkiG9w0BAQUFADA/MRIwEAYDVQQKEwljbG91ZC5nb3Yx
DDAKBgNVBAsTA3VhYTEbMBkGA1UEAxMSbG9naW4uZnIuY2xvdWQuZ292MB4XDTE3MDUwODE5NDg0
MFoXDTIwMDUwNzE5NDg0MFowPzESMBAGA1UEChMJY2xvdWQuZ292MQwwCgYDVQQLEwN1YWExGzAZ
BgNVBAMTEmxvZ2luLmZyLmNsb3VkLmdvdjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEB
AMI0485EcNpsyV9WxQjct1Ah27VgvkYbakM2bFOaD4SJHuPpfLzCKUuxnw5u8u8XaEBJlnDg1hi+
XTcOI8ktNPbcDYVNYUyiDvgk1pOf3onVPWtnYstYXGA8lQMrT8LVokXp1or8RgVXpYMbIcM6yLqy
3YdMrrNl7le/fyaTYIJ9IQWXFvVR3SNkuEY7MQHdg37FoJrxq8tHaOtvz7ZXK2/sxrr6ErYuSxxL
N+aptQ1vgw6dhRULOoLtyZhd6FUaY+pdbA5QidQiU/KdDaw90lWkH1FrB7qqqJ7kjhM2AkQTKSSt
7zhnZDJHkN8RRuKbVBF+0aTJO98i93KZVJ8BaEcCAwEAATANBgkqhkiG9w0BAQUFAAOCAQEAaUiV
0aVIfqR0gVn3wu+DeCPutVKVtC2afKH1tiRwDuiJ7Yd1hCfMTiGuZ8xwJIEUwxgBOIilV+AeqnuX
dLY1qzEfVK2WIkawWbSpMfK/6C/4j1BsnOmeIhipMCFdVMMLY2A5MS8INEkRf8Nh9TmZNIZdvGd9
CNZ2kHv8uQlwkJSCggeXppgaD+C+AwgWbh8mpJIqxyzu9f75TngU3RtXvm6JAZcVq0SHp7u8HKzy
vFHkfedk7feVMe5eLmWN08026FlHQgsyh2EG5Ha23IGMTNNrsJatVQzdhPkm9k2xt+YGTZsRTMAB
YO7mV+lNdia80VDJnruK5oNjJnOaydbmKA==
-----END CERTIFICATE-----
```

### Upstream Documentation

If you would like to understand how the integration works, please see the [open source documentation](https://docs.cloudfoundry.org/uaa/identity-providers.html). LDAP integration is not supported, only SAML. In the existing configuration, cloud.gov acts as the Service Provider (SP) in the SAML assertion workflow, and any authentication requests coming from cloud.gov will be SP initiated. IDP initiated authentication is not supported.

## Active Directory Federation Services Integration Reference

This is a basic reference of steps used to configure Active Directory Federation Services (ADFS) as a SAML IDP for your agency in cloud.gov. These steps listed are intended to be used as a reference, not a source of truth, as every agency will likely have a different configuration. These steps were kindly donated to cloud.gov by the folks from the Office of Management and Budget (OMB).

### Add Relying Party Trust

*Add a new Relying Party Trust*

You can find the Microsoft documentation for configuring a Relying Party Trust [here](https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/operations/create-a-relying-party-trust). You will need to select the _Claims-aware Trust_ radio button.

*Select a Data Source*

Select the *Import data about the relying party published online or on a local network* radio button. While you can download the cloud.gov SAML SP metadata, by referencing our metadata endpoint, you can receive any updates as we push them out. Enter the staging or production metadata URL referenced in the System Information section.

*Specify Display Name*

This value can be whatever you want it to be, we recommend attaching an environment reference so it's easily distinguishable between the cloud.gov environments at a glance. Notes are optional and at your discretion.

*Choose Access Control Policy*

Apply whichever policy is relevant to your agency, however it's recommended to allow _Permit Everyone_ as cloud.gov manages user authorization within the platform.

*Ready to Add Trust*

Verify the initial configuration is valid and then save it.

*Secure Hash Algorithm*

In order to properly ensure all data is encrypted and decrypted in the same format, the relying party trust needs to use the same algorithm cloud.gov uses.

1. Double-click the new relying party trust.
1. In the Advanced tab, select SHA1 for the Secure hash algorithm.

*Configure Certificate*

You can find our root certificate referenced above if you need to explicitly trust our system. Our referenced root certificate is PEM encoded, so you will need to convert it to a format supported by Windows. You can use whichever tools you are most comfortable with for the conversion, if you would like to use open source tooling, Stack Overflow user evergreen has a great guide about using OpenSSL to convert certificates between various encodings, you can find that guide [here](https://stackoverflow.com/a/38408666/4949938). 

To import the encoded certificate into ADFS, you will need to execute these steps on all servers configured to respond to SAML requests.

1. On the ADFS server, start MMC (`mmc.exe`).
1. Add the Certificates snap-in for the computer account and manage certificates for the local computer.
1. Import the root CA certificate into Trusted Root Certification Authorities > Certificates.

ADFS will refresh it's certificate store the next time an authentication request comes in, no need to take manual steps.

*Disable Revocation Checking*

cloud.gov does not support certificate revocation checking, so the certificate revocation check will need to be disabled. This is specific to the cloud.gov relying party trust and will not impact other configurations.

Run this command in Powershell:

```powershell
Set-AdfsRelyingPartyTrust -TargetName "<display-name>" `
  -EncryptionCertificateRevocationCheck None `
  -SigningCertificateRevocationCheck None
```

*Create a Claim Mapping*

In order to properly map users in your SSO system to the cloud.gov SAML identifier, you may need to create a claim policy. If this is the case, you will need to take these steps for each of the cloud.gov environments.

1. Select the cloud.gov relying party trust.
1. Right-click > Edit Claim Issuance Policy
1. Add Rule
1. You can name the rule whatever is easiest to understand, we recommend something similar to _Transform NameID to Email_ so it's clear.
1. Here are the field values to set
    1. Incoming claim type: _E-Mail Address_
    1. Outgoing claim type: _Name ID_
    1. Outgoing name ID format: _Email_
1. Select the _Pass through all claim values_ radio button.
1. Save the policy.

*Test*

This is the end of the reference kindly donated by OMB, please ensure you try to log into cloud.gov.

## Help

We are committed to improving the user experience of government. If you have questions, please don't hesitate to reach out at [support@cloud.gov](mailto:support@cloud.gov). We recommend that you subscribe to service updates at the [cloud.gov StatusPage](https://cloudgov.statuspage.io/).
