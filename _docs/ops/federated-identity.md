---
parent: tenants
layout: ops
layout: docs
sidenav: true
title: Federated identity
weight: 10
---

Federated identity in cloud.gov is supported via [SAML 2.0](https://en.wikipedia.org/wiki/SAML_2.0).  UAA acts as a SAML service provider (SP) to authenticate with trusted identity providers (IdP).

Approval from the Program Manager is required before adding a new trusted identity provider.

### Adding a new Identity Provider

Provide the IdP with our [SP metadata](https://login.fr.cloud.gov/saml/metadata).  This is a machine-readable document describing our SAML endpoints and configuration.

In return, the IdP needs to provide their metadata (either as an XML file or a URL), a list of domains the IdP is responsible for authenticating, and a logo that will be displayed on our login page.

Using the information provided by the IdP, add a new IDP entry in Credhub to the `uaa-saml-providers` property using this template:

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


### Removing an Identity Provider

Identity provider metadata removed from the BOSH deployment does not remove it from the UAA DB. Therefore, removing an IDP involves removing the metadata used during deployment (from Credhub) as well as removing the metadata from UAA directly. 

A script to remove IDPs is included [here](https://github.com/cloud-gov/cg-scripts/blob/master/uaa/remove-idp.sh). This script will remove an IDP from both Credhub and UAA, or can remove orphaned elements only in UAA via the `--uaa-only` option. 

Removing an entry for UAA will immediately remove the IDP from the login page. The changes in Credhub will be applied on the next cf deployment.
