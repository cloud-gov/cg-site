---
menu:
  docs:
    parent: runbook

title: Rotating Secrets
---

This guide assumes that you're following the Offboarding Checklist [found
here](https://github.com/18F/cg-product/blob/master/OffboardingChecklist.md) and
removed direct access to cloud.gov AWS accounts. The following guide walks a
cloud.gov operator through rotating all sensitive information (secrets)
including the following:

- Passphrases
    - [Read about secret key management]({{< relref "docs/ops/secrets.md" >}})
- AWS IAM users
    - [Read about rotating IAM users]({{< relref "docs/ops/runbook/rotating-iam-users.md" >}})
- Deployer users
- Certificates
- Clients
- Service Brokers

### Start by rotating access to various services and IAM accounts.

- Delete any IAM keys and users from AWS consoles belonging to the user.
- [Rotate all IAM Users]({{< relref "docs/ops/runbook/rotating-iam-users.md" >}})
- [Rotating Concourse secrets]({{< relref "docs/ops/runbook/rotating-concourse.md" >}})
- [Rotating Bosh secrets]({{< relref "docs/ops/runbook/rotating-bosh.md" >}})
- [Rotating Cloud Foundry / Diego secrets]({{< relref "docs/ops/runbook/rotating-cloudfoundry-diego.md" >}})

### Rotate CF deployment users

Some of our Concourse pipelines deploy to Cloud Foundry using cloud.gov service
account deployers. In order to rotate these, you need to target the correct
org and space in order to create the cloud.gov service deployer account
instance.

#### Auditing all CF deployment users

Use the `get-all-cf-deployers.sh` file in the
[`cg-scripts`](https://github.com/18F/cg-scripts) repository to audit all of the
CF users deploying to all environments using Concourse.

The script outputs the login commands for all matching environments for both the
deployer account and for operators using `--sso`. It's useful to run this
command redirect the output to a file for the next steps.

When rotating these accounts, you need ensure you don't delete the previous
deployer service instance _until after_ the credentials have been successfully
used in a deployment in order to minimize downtime.

#### Steps for rotating cloud.gov Service Account deployers

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
1. If the deployer user is used for more than a `cf push`, give it the proper
  `cloud_controller.admin` scope manually using `uaac`. Otherwise it will fail
  in the pipeline job in Concourse. Make sure you authenticate with the correct
  UAA server when escalating the scopes of the deployer user.
     - `uaac member add cloud_controller.admin ${guid_of_deployer}`
1. Refly the pipeline with updated credentials and start a new job.
1. Delete the `${name_of_deployer}_prev` service account deployer.
   - `cf delete-service ${name_of_deployer}_prev -f`

### Rotate secrets passphrases

Create a new temporary directory as a workspace for all the secrets file(s) for
any deployments which contain resources of type `common` and with names starting
with `common-*`.

```sh
mkdir rotate-all-passphrases
```

After creating the directory, make sure you have authenticated with Concourse
using `fly login`. Change into the temporary directory and run the following
command to loop through all the pipelines and create a `all-secrets-list` text
file with the current state of all `cg-common` resources matching a name that
starts with `common-*`.

### Downloading all pipelines and cg-common resources

The following command will create an audit file name `all-secrets-list.txt` and
individual `*.pipeline.yml` files for each pipeline it finds a `cg-common`
resource for. Use this file to build and track your progress on passphrase
rotation. Replace the `--target fr` with the correct name for your Concourse
target.

```sh
for pipeline in $( fly --target fr pipelines |  grep -vE 'yes.+no' |  grep -Eo '^[a-z0-9\-]+' )
do
  fly --target fr get-pipeline --pipeline "${pipeline}" | \
  spruce json | \
  jq -r -e '
    .resources[] |
    select(
      .name |
      test( "common-" )
    ) |
    select(
      .type |
      test( "common" )
    )
  '
  if [ $? -eq 0 ]
  then
    echo "^^^^^   ${pipeline}"
    echo "========================================"
    echo
    fly --target fr get-pipeline --pipeline ${pipeline} > ${pipeline}.pipeline.yml
  fi
done | tee all-secrets-list.txt
```

#### Reviewing the cg-common resources file

Now open the `all-secrets-list.txt` file in a text editor. You will be using
this file to create the following sets of commands to perform the secrets
passphrase rotation.

- **Get** the completed pipeline and `source` information for `cg-common` resources.
- **Download** the encrypted secrets file(s) using the `source` information.
- **Decrypt** the secrets file(s) using the `secrets_passphrase`.
- **Generate** a new `secrets_passphrase` using `$CG_SCRIPTS/generate-passphrase`.
- **Encrypt** the secrets file(s) using the generated `secrets_passphrase`.
- **Edit** the downloaded completed pipeline using `sed` to replace the previous
  `secrets_passphrase` with the current `secrets_passphrase`.
- **Set** the pipeline using the edited completed pipeline, verify that the
  `secrets_passphrase` are being updated in the pipeline.
- **Upload** the encrypted secrets file(s).

#### Running through the steps above using boilerplate

The example below is meant to be used as a boilerplate to help rotating the
passphrases manually. Below you will find guidance for following the steps from
above using the contents from `all-secrets-list.txt`. Paste this boilerplate
into the file between the `===` lines under each `deployment name: ` line in the
`all-secrets-list.txt` file.

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
sed -i -- \
's/old_passphrase/new_passphrase/' \
${deploy_pipeline_name}.yml;

# Set the pipeline with the newly updated properties ( the diff should show the secrets_passphrases being updated ).
fly --target fr \
set-pipeline \
--pipeline ${deploy_pipeline_name} \
--config=${deploy_pipeline_name}.yml;

# Upload the secrets file.
aws s3 cp \
--sse AES256 \
${secrets_file}.yml.enc \
s3://${bucket_name}/${secrets_file}.yml;
```
