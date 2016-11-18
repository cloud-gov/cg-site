+++
date = "2016-11-18"
title = "Platform Release Notes"
+++

### Added
- The [.NET Core Buildpack](https://docs.cloudfoundry.org/buildpacks/dotnet-core/index.html) is now supported.
- Cloud.gov authentication now supports the FDIC agency login.
- Cloud.gov accounts with multi-factor authentication can now be created without using the already integrated agency logins (GSA, EPA, FDIC) upon [invitation](https://invite.fr.cloud.gov). 
- The [Dashboard](https://dashboard.fr.cloud.gov) now shows the current memory, disk usage and quota limits of apps.
- [Deployer accounts]({{< relref "docs/apps/continuous-deployment.md" >}}#govcloud-environment-deployer-account-broker) can now be created programmatically.

### Changed
- Cloud Foundry has been upgraded to [Release v246](https://github.com/cloudfoundry/cf-release/releases/tag/v246).