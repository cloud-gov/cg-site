---
menu:
  overview:
    parent: overview
title: Who Can Use It?
weight: 20
aliases:
  - /docs/intro/overview/who-can-use-cloudgov
  - /intro/overview/who-can-use-cloudgov
---

## What is the best fit for cloud.gov?

- You have a technical team, or contractor, that can push applications to cloud.gov (See technical requirements).
- You work for a federal government organization.
- You understand that cloud.gov is a product under active development and will see changes in the future.
- Your application is FISMA Moderate or lower.
- You have to be able to pay for cloud.gov through the IAA/MOU process (see (pricing)[https://cloud.gov/overview/pricing/rates/]).

## What are the technical requirements?

- Your team has access to the cloud.gov API through the cloud.gov command line interface (compatible with Windows, Mac and Linux).
- Your application stores configuration in the environment.
- Your application uses one stateless process at a time (that can be horizontally scaled).
- Your application listens to a single port.
- Your dependcies are explicitly declared (like `requirements.txt` for Python).
- You don't rely on local storage for long term data stores.
- (Optional) Your organization can integrate your identity system with cloud.gov over SAML.

## Who is not a good fit?

- .NET applications (might require custom buildpacks and be compatible with Linux deployments).
- Your application requires Oracle, SQL Server or propietary databases.
- You are a local/state government organization.

## Who cannot use cloud.gov?

- Non government organizations.

## Reading Material:
- (12-factor applications)[https://12factor.net/].
