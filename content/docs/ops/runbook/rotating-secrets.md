---
menu:
  docs:
    parent: runbook
layout: ops

title: Rotating Secrets I
---

## Introduction

This guide assumes that you're following the Offboarding Checklist [found
here](https://github.com/18F/cg-product/blob/master/OffboardingChecklist.md) and
removed direct access to cloud.gov AWS accounts. The following guide walks a
cloud.gov operator through rotating all sensitive information (secrets).

Please familiarize yourself with [secret key management]({{< relref "docs/ops/secrets.md" >}}).
You will be touching various parts of the platform from soup to nuts. Remember
you have support from the entire team and it is helpful to coordinate with
cloud.gov operators in case they are working on a particular piece of software
that will requires a secrets rotation.

## Rotate Access

It's important that you rotate access to the platform first. This can be
categorized with three different types of secrets.

1. [Remove access to Ops UAA]({{< relref "docs/ops/managing-users.md#removing-admins" >}})
1. [Rotate `cg-common` passphrases](#rotate-secrets-passphrases)
1. [Rotate CF deployment users](#rotate-cf-deployment-users)
1. [Rotate all IAM Users]({{< relref "docs/ops/runbook/rotating-iam-users.md" >}})
1. [Rotating Bosh]({{< relref "docs/ops/runbook/rotating-bosh.md" >}})
1. [Rotating Concourse]({{< relref "docs/ops/runbook/rotating-concourse.md" >}})
1. [Rotating Cloud Foundry / Diego]({{< relref "docs/ops/runbook/rotating-cloudfoundry-diego.md" >}})
1. [Rotating Kubernetes]({{< relref "docs/ops/runbook/rotating-kubernetes.md" >}})

## Rotate secrets passphrases

Create a new temporary directory as a workspace for all the secrets file(s) for
any deployments which contain resources of type `common` and with names starting
with `common-*`.

```sh
mkdir rotate-all-passphrases
```

### Downloading all cg-common resources

After creating the directory, make sure you have authenticated with Concourse
using `fly login`. Change into the temporary directory and run the following
snippet to loop through all the pipelines and create a `all-secrets-list` JSON
file with the current state of all `cg-common` resources matching a name that
starts with `common-*`.

```sh
echo "{" >> all-secrets-list.json
for pipeline in $(fly --target fr pipelines | grep -Eo '^[a-z0-9\-]+' | grep 'deploy')
do
  hash=$(fly --target fr get-pipeline --pipeline $pipeline --json |
  jq -er '.resources[] | select( .name | test( "common-?" ) ) | { "name": .name, "secrets_files": .source.secrets_files, "secrets_file": .source.secrets_file, "passphrase", .source.passphrase, "bucket": .source.bucket_name }' |
  jq -s '.')
  echo
  echo -n "\"${pipeline}\": "
  echo -n $hash
  echo ","
done | tee -a all-secrets-list.json
echo "\"generated_at\": \"$( date "+%Y-%m-%d %H:%M:%S" )\"" >> all-secrets-list.json
echo "}" >> all-secrets-list.json
```

### Downloading all Concourse credentials

Leverage the Concourse Credentials bucket to update secrets passphrases. You can
verify generate a list of all passphrases that need to be updated by querying
Concourse. Though, every pipeline's `credentials.yml` must alos be updated and
uploaded from that bucket in order to sync work across team members. **In other
words, _do not rotate passphrases without also updating the matching
`concourse-credentials` file in the S3 bucket_**.

Gather a list of all the pipelines currently deployed from Concourse.

```sh
fly --target fr pipelines | grep -Eo '^[a-z0-9\-]+'
```

Match this audit of active pipelines with those from Concourse credentials.

```sh
aws s3 ls s3://concourse-credentials/
```

Names found in the S3 bucket reference the name of the GitHub repository so it
is necessary to add a prefix of `cg-` to the pipelines returned from `fly
pipelines`, e.g. match the name based GitHub URL

#### Get the name of the repository by the remote URL

```sh
file_name=$(git config --local --get-regexp remote.origin.url | awk '{ print $2 }' | cut -d '/' -f 2 | sed 's/\.git//')
aws s3 cp s3://concourse-credentials/${file_name}.yml .
```

#### Get the name of the repository by the directory name

```sh
aws s3 cp s3://concourse-credentials/${PWD##*/}.yml .
```


### Reviewing the cg-common resources file

Now open the `all-secrets-list.txt` file in a text editor. You will be using
this file to create the following sets of commands to perform the secrets
passphrase rotation.

- **Get** the pipeline and `source` information for `cg-common` resources.
- **Download** Concourse credentials in order to fly the new pipeline
- **Download** the encrypted secrets file(s) using the `source` information.
- **Decrypt** the secrets file(s) using the `secrets_passphrase`.
- **Generate** a new `secrets_passphrase` using `$CG_SCRIPTS/generate-passphrase`.
- **Encrypt** the secrets file(s) using the generated `secrets_passphrase`.
- **Edit** the downloaded completed pipeline using `sed` to replace the previous
  `secrets_passphrase` with the current `secrets_passphrase`.
- **Set** the pipeline using the edited Concourse credentials, verify that the
  `secrets_passphrase` are being updated in the pipeline.
- **Upload** Concourse credentials to the appropriate file path in the Concourse
  credentials bucket.
- **Upload** the encrypted secrets file(s).

### Running through the steps above using boilerplate

Please reference [secret key management]({{< relref "docs/ops/secrets.md" >}})
for more information on what `$CG_PIPELINE/decrypt.sh` and `$CG_PIPELINE/encrypt.sh`
are doing in the example below.

```sh
# Download secrets file.
aws s3 cp \
s3://${bucket_name}/${secrets_file}.yml \
${secrets_file}.yml.enc;

# Decrypt secrets file.
INPUT_FILE=${secrets_file}.yml.enc \
OUTPUT_FILE=${secrets_file}.yml \
PASSPHRASE="${old_passphrase}" \
$CG_PIPELINE/decrypt.sh;

# Encrypt secrets file with newly generated passphrase.
INPUT_FILE=${secrets_file}.yml \
OUTPUT_FILE=${secrets_file}.yml.enc \
PASSPHRASE="${new_passphrase}" \
$CG_PIPELINE/encrypt.sh;

# Edit the downloaded pipeline and replace the old_passphrase with the new_passphrase.
sed -i -- 's/old_passphrase/new_passphrase/' credentials.yml;

# Set the pipeline with the newly updated properties ( the diff only shows the secrets_passphrases being updated ).
fly --target fr \
set-pipeline \
--pipeline ${deploy_pipeline_name} \
--config=pipeline.yml;
--load-vars-from=credentials.yml;

# Upload the secrets file.
aws s3 cp \
--sse AES256 \
${secrets_file}.yml.enc \
s3://${bucket_name}/${secrets_file}.yml;
```

## Rotate CF deployment users

Some of our Concourse pipelines deploy to Cloud Foundry using cloud.gov service
account deployers. In order to rotate these, you need to target the correct
org and space in order to create the cloud.gov service deployer account
instance.

### Auditing all CF deployment users

Use the `get-all-cf-deployers.sh` file in the
[`cg-scripts`](https://github.com/18F/cg-scripts) repository to audit all of the
CF users deploying to all environments using Concourse.

The script outputs the login commands for all matching environments for both the
deployer account and for operators using `--sso`. It's useful to run this
command redirect the output to a file for the next steps.

When rotating these accounts, you need ensure you don't delete the previous
deployer service instance _until after_ the credentials have been successfully
used in a deployment in order to minimize downtime.

### Steps for rotating cloud.gov Service Account deployers

Make sure that cloud.gov Service Account users are only used for basic `cf push`
deployments. If you're deploying service brokers, read the [Rotate Secrets V CF
external secrets section]({{< relref "docs/ops/runbook/rotating-cloudfoundry-diego.md" >}}).

1. Target the appropriate org and space in the current environment.
1. Check the services, if one exists for this deployer renamed it with a `_prev`
   suffix for later deletion.
   - `cf rename-service ${name_of_deployer} ${name_of_deployer}_prev`
1. Create a new service instance.
  - `cf create-service cloud-gov-service-account space-deployer "${name_of_deployer}"`
1. Read the service instance details for the deployer.
  - `cf service "${name_of_deployer}"`
1. Open the Fugacious link and save the credentials locally in the `credentials.yml`
  - `cf service ${name_of_deployer} | grep Dashboard | awk '{ print $2 }'`
1. Refly the pipeline with updated credentials and start a new job.
1. Delete the `${name_of_deployer}_prev` service account deployer.
   - `cf delete-service ${name_of_deployer}_prev -f`
