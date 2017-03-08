---
menu:
  overview:
    parent: overview
title: Who can use it?
weight: 15
aliases:
  - /docs/intro/overview/who-can-use-cloudgov
  - /intro/overview/who-can-use-cloudgov
  - /docs/intro/technology/appropriate-deployments
  - /intro/technology/appropriate-deployments
  - /overview/overview/who-can-use-cloudgov/
---

cloud.gov is suitable for a wide range of applications, including websites and non-website applications for internal and public uses.

## Good fit for cloud.gov

- You have a technical team (employees and/or contractors) that can push applications to cloud.gov. (See technical requirements below.)
- Your application is for a United States federal government organization.
- You understand that cloud.gov is a product under active development and will see changes in the future.
- Your application is FISMA Moderate or lower.
- You can pay for cloud.gov through the federal Interagency Agreement (IAA/MOU) process (see [how to purchase]({{< relref "overview/pricing/start-using-cloudgov.md" >}})).

### Technical requirements

- Your team can install the [cloud.gov command line interface]({{< relref "docs/getting-started/setup.md" >}}) (compatible with Windows, Mac, and Linux).
- Your application can read configuration from the environment.
- Your application uses one stateless process at a time (that can be horizontally scaled).
- Your application listens to a single port.
- Your application's dependencies are explicitly declared (such as `requirements.txt` for Python).
- Your application doesn't rely on local storage for long-term data stores.

### Optional but recommended
- Your organization can integrate your identity system with cloud.gov over SAML.
- Your application can follow the [12-Factor App guidelines](https://12factor.net/).

## Not a good fit

- Your application requires Oracle, SQL Server, or proprietary databases.
- Your team is unable to use the [federal Interagency Agreement process]({{< relref "overview/pricing/start-using-cloudgov.md" >}}) for payment. For example, this may apply for teams working for U.S. local, state, tribal, or territory government organizations. If this applies to your team, [sign up for updates](/#updates) so that we can notify you if we add other options.

## Cannot use cloud.gov

- The applications you're building are not on behalf of a U.S. government organization.
