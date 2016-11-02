---
menu:
  docs:
    parent: advanced
title: Cloning applications
---

Say you have an existing deployment on Cloud Foundry, and you want to make a new staging environment. Below are the different scenarios around [application manifests](http://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html).

## If you have a single manifest

1. Run `cf push <NEW_APP_NAME>`.
1. Use the CLI to do any other necessary configuration.

## If you have environment-specific manifests

1. Use [manifest inheritance](http://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html#multi-manifests) to do any necessary configuration.
1. Run `cf push <NEW_APP_NAME> -f <PATH_TO_MANIFEST>`.
1. Make sure to run any necessary database setup commands, etc.

## If you don't have a manifest

1. Generate a manifest from an existing application:

    ```bash
    cf target -o <EXISTING_APP_ORG> -s <EXISTING_APP_SPACE>
    cf create-app-manifest <EXISTING_APP_NAME>
    cp <EXISTING_APP_NAME>_manifest.yml <NEW_APP_NAME>_manifest.yml
    ```

1. Clean up `<NEW_APP_NAME>_manifest.yml`. You probably only need the following properties:
    * `name` (required) – make sure to change it to the new app name
    * `env` – change any environment-specific variables, e.g. the `DATABASE_URL`
    * `services`
1. Deploy the new environment:

    ```bash
    cf push <NEW_APP_NAME> -f <NEW_APP_NAME>_manifest.yml
    ```

1. Make sure to run any necessary database setup commands, etc. for the new application.
