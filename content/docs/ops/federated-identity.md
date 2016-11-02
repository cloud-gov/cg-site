---
menu:
  docs:
    parent: operations
title: Federated Identity
weight: 10
---

Federated Identity in cloud.gov is supported via [SAML 2.0](https://en.wikipedia.org/wiki/SAML_2.0).  UAA acts as a SAML service provider (SP) to authenticate with trusted identity providers (IdP).

Approval from the Program Manager is required before adding a new trusted identity provider.

### Adding a new Identity Provider

Provide the IdP with our [SP metadata](https://login.fr.cloud.gov/saml/metadata).  This is a machine-readable document describing our SAML endpoints and configuration.

In return, the IdP needs to provide their metadata (either as an XML file or a URL), a list of domains the IdP is responsible for authenticating, and a logo that will be displayed on our login page.

Using the information provided by the IdP, add a new entry under `login.providers` in the [Cloud Foundry secrets]({{< relref "secrets.md" >}}) using this template:

    example.com:
      assertionConsumerIndex: 0
      metadataTrustCheck: true
      showSamlLoginLink: true
      addShadowUserOnLogin: true
      idpMetadata: 'URL to IdP metadata or or contents of metadata XML file'
      linkText: 'name of the IdP'
      iconUrl: 'URL to the image or an image embedded as a data URI'
      emailDomain:
        - example.com

After Concourse deploys the updated secrets, the new IdP will be displayed and available for use on the [login page](https://login.fr.cloud.gov).
