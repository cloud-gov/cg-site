---
parent: management
layout: docs
sidenav: true
redirect_from: 
    - /docs/apps/renaming-spaces/
title: Renaming Spaces
---

If you want to change the name of a space in your Cloud Foundry organization, you can follow the steps below.

Please note: if you would like to change the name of a space you need to have the space manager role for that space.

Login to cloud.gov using Cloud Foundry CLI:

`cf login -a api.cloud.gov --sso`

[Use the CLI to target the organization containing the space that you would like to rename](https://cloud.gov/docs/getting-started/concepts/#target-an-org):

`cf target -o ORGNAME`

Once you have targeted the correct organization, run the cf rename-space command to rename the space:

`cf rename-space SPACE NEW_SPACE_NAME`

If you have additional questions or run into issues, you can open a support ticket by emailing [support@cloud.gov](mailto:support@cloud.gov).
