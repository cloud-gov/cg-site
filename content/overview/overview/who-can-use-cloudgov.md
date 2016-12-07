---
menu:
  overview:
    parent: overview
title: Who can use it?
weight: 20
aliases:
  - /docs/intro/overview/who-can-use-cloudgov
  - /intro/overview/who-can-use-cloudgov
---

## Good fit for cloud.gov

- You have a technical team (internal or contracted) that can push applications to cloud.gov. (See technical requirements below.)
- You work for a United States federal government organization.
- You understand that cloud.gov is a product under active development and will see changes in the future.
- Your application is FISMA Moderate or lower.
- You have to be able to pay for cloud.gov through the IAA/MOU process (see [pricing]({{< relref "overview/pricing/rates.md" >}})).

### Technical requirements

- Your team has access to the cloud.gov API through the cloud.gov command line interface (compatible with Windows, Mac, and Linux).
- Your application stores configuration in the environment.
- Your application uses one stateless process at a time (that can be horizontally scaled).
- Your application listens to a single port.
- Your dependencies are explicitly declared (such as `requirements.txt` for Python).
- You don't rely on local storage for long-term data stores.

### Optional but recommended
- Your organization can integrate your identity system with cloud.gov over SAML.
- Your application can follow the [12-Factor App guidelines](https://12factor.net/).

## Not a good fit

- Your application requires Oracle, SQL Server, or proprietary databases.
- You work for a local or state government organization.

## Cannot use cloud.gov

- You work for a non-government organization.
