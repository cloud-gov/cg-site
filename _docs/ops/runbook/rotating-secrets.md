---
parent: runbook
layout: ops

layout: docs
sidenav: true
title: Rotating Secrets I
---

## Introduction

This guide assumes that you're following the Offboarding Checklist [found
here](https://github.com/18F/cg-product/blob/master/OffboardingChecklist.md) and
removed direct access to cloud.gov AWS accounts. The following guide walks a
cloud.gov operator through rotating all sensitive information (secrets).

Please familiarize yourself with [secret key management]({{ site.baseurl }}{% link _docs/ops/secrets.md %}).
You will be touching various parts of the platform from soup to nuts. Remember
you have support from the entire team and it is helpful to coordinate with
cloud.gov operators in case they are working on a particular piece of software
that will requires a secrets rotation.

## Rotate Access

It's important that you rotate access to the platform first. This can be
categorized with three different types of secrets.

1. [Remove access to Ops UAA]({{ site.baseurl }}{% link _docs/ops/managing-users.md %}#removing-admins)
1. [Rotate `cg-common` passphrases](#rotate-secrets-passphrases)
1. [Rotate CF deployment users](#rotate-cf-deployment-users)
1. [Rotate all IAM Users]({{ site.baseurl }}{% link _docs/ops/runbook/rotating-iam-users.md %})
1. [Rotating Bosh]({{ site.baseurl }}{% link _docs/ops/runbook/rotating-bosh.md %})
1. [Rotating Concourse]({{ site.baseurl }}{% link _docs/ops/runbook/rotating-concourse.md %})
1. [Rotating Cloud Foundry / Diego]({{ site.baseurl }}{% link _docs/ops/runbook/rotating-cloudfoundry-diego.md %})
1. [Rotating Kubernetes]({{ site.baseurl }}{% link _docs/ops/runbook/rotating-kubernetes.md %})

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
snippet to loop through all the pipelines and create a `state-passphrases` JSON
file with the current state of all `cg-common` resources matching a name that
starts with `common-*`.

Once that's complete, run the `grab-all-cg-common-resources.sh` script from
`cg-scripts`. The output file contains all of the cg-common resources found in
Concourse.

### Downloading all Concourse credentials

Leverage the Concourse Credentials bucket to update secrets passphrases. You can
verify generate a list of all passphrases that need to be updated by querying
Concourse. Though, every pipeline's `credentials.yml` must also be updated and
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
pipelines`, e.g. match the name based on GitHub URL.

#### Get the name of the repository by the origin remote URL

```sh
file_name=$(git config --local --get-regexp remote.origin.url | awk '{ print $2 }' | cut -d '/' -f 2 | sed 's/\.git//')
aws s3 cp s3://concourse-credentials/${file_name}.yml .
```

#### Get the name of the repository by the directory name

```sh
aws s3 cp s3://concourse-credentials/${PWD##*/}.yml .
```


### Rotating Passphrases

Please reference [secret key management]({{ site.baseurl }}{% link _docs/ops/secrets.md %})
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
--config=pipeline.yml \
--load-vars-from=credentials.yml;

# Upload the secrets file.
aws s3 cp \
--sse AES256 \
${secrets_file}.yml.enc \
s3://${bucket_name}/${secrets_file}.yml;
```

## Rotating certificates

Generate new certificates for deployments using mutual TLS from the same Root CA
certificate. These certificates should be rotated in three steps, as described in https://docs.cloudfoundry.org/deploying/common/consul-security.html#rotating-certs:

1. Append new CA certificate
1. Replace old certificates and keys
1. Drop old CA certificate

Please see the [`cg-secret-rotation`](`https://github.com/18F/cg-secret-rotation)
repository for more information about generating these certificates.
