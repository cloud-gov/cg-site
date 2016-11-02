---
menu:
  docs:
    parent: deployment
title: Updating Cloud Foundry
---

Updates to Cloud Foundry should be handled by the [`deploy-cf`](https://ci.cloud.gov/pipelines/deploy-cf) pipeline in [Concourse](https://concourse.ci).

### Staging
The pipeline starts with the [`deploy-cf-staging` job](https://ci.cloud.gov/pipelines/deploy-cf/jobs/deploy-cf-staging), that is triggered **automatically** when one of the following is updated:

- The upstream [CloudFoundry release](https://github.com/cloudfoundry/cf-release/releases)
- The `staging` branch of [cg-deploy-cf]() repository.
- A [secrets.yml](https://github.com/18F/cg-deploy-cf/blob/master/cf-secrets-example.yml) stored in S3

If the deployment job is successful, it then runs a job for basic set of 'smoke tests' to check a minimal set of functionality of CloudFoundry. When the 'smoke tests' job passes, the pipeline will run a job for a suite of acceptance tests to fully exercise the system.

#### Using staging

Using the [`targets`](https://github.com/guidowb/cf-targets-plugin) plugin is recommended.

1. Visit [login.green.18f.gov](https://login.green.18f.gov).
1. Click "Sign in with GSA.gov".
1. Run

    ```bash
    cf login --sso -a https://api.green.18f.gov
    ```

1. Follow the instructions.

You may need to ask in #cloud-gov-atlas to be given access to orgs.

### Production
Upon successfully going through the staging portion of the pipeline, you are now ready to tackle production.

1. If there were any changes to the manifests in the `staging` branch, they will need to be merged into `master` for the production deployment.
1. If you made changes to the secrets.yml for staging, more than likely, you'll need to address those changes for the production version as well.
1. Run the [`deploy-cf-prod` job](https://ci.cloud.gov/pipelines/deploy-cf/jobs/deploy-cf-prod)
1. When the `deploy-cf-prod` job completes successfully, run the [`smoke-tests-prod` job](https://ci.cloud.gov/pipelines/deploy-cf/jobs/smoke-tests-prod)
1. Finally, when `smoke-tests-prod` completes successfully, run the [`acceptance-tests-prod` job](https://ci.cloud.gov/pipelines/deploy-cf/jobs/acceptance-tests-prod). These set of tests are expected to fail at this time, in the following test:

```
• Failure in Spec Setup (BeforeEach) [2.238 seconds]
Wildcard Routes [BeforeEach] Adding a wildcard route to a domain completes successfully
/var/vcap/packages/acceptance-tests/src/github.com/cloudfoundry/cf-acceptance-tests/apps/wildcard_routes_test.go
```

## Updating secrets.yml
- Download the appropriate `secrets.yml` from S3
    - Staging: `cloud-gov-varz-stage/cf-staging.yml`
    - Production: `cloud-gov-varz/cf.yml`
- Get the passphrase from the pipeline

```
fly get-pipeline --pipeline deploy-cf
```

- Use [this script](https://github.com/18F/cg-pipeline-tasks/blob/master/decrypt.sh) for decryption. In your terminal:

```
INPUT_FILE=secrets.yml OUTPUT_FILE=unencrypted-secrets.yml PASSPHRASE=pipelinepassphrase ./decrypt.sh
```

- Make changes to the `unencrypted-secrets.yml`
- Use [this script](https://github.com/18F/cg-pipeline-tasks/blob/master/encrypt.sh) for encryption. In your terminal:

```
INPUT_FILE=unencrypted-secrets.yml OUTPUT_FILE=secrets.yml PASSPHRASE=pipelinepassphrase ./encrypt.sh
```

- Upload the encrypted YAML file back to the appropriate S3 bucket, with the correct filename

## Common Problems
- **Problem**: The upstream manifests have added new configuration
- **Problem**: The upstream manifests have removed a default value that must now be provided
- **Problem**: Removed packages/jobs still being configured in our own manifests (likely, cruft)
    - **Solution**: Use [this script](https://github.com/18F/cg-scripts/blob/master/template-changes.sh) to identify upstream changes in the CloudFoundry release configuration and address as necessary
- **Problem**: Timeouts from dependent services (NewRelic, etc)
    - **Solution**: Check status of dependent services, restart job when available
