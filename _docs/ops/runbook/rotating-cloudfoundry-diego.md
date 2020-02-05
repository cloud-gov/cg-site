---
parent: runbook
layout: ops

layout: docs
sidenav: true
title: Rotating Secrets V - Cloud Foundry and Diego
---

## Introduction

When rotating secrets for Cloud Foundry and Diego you will need to follow the
proper steps in order to perform a rolling update to the platform. There are six
deployments that need to be synchronized across two Bosh deployments. These
deployments are focused on the Consul components for Cloud Foundry and Diego.

Follow the following documentation to get familiar with which values are going
to be replaced.

- [Cloud Foundry AWS Stub](http://docs.cloudfoundry.org/deploying/aws/cf-stub.html)
- [Security Configuration for Consul](http://docs.cloudfoundry.org/deploying/common/consul-security.html)
- [Generating all the Cloud Foundry certificates](https://github.com/18F/cg-deploy-cf#how-to-generate-the-final-manifest)

## Prepare a local directory for rotating secret files

Create a directory you can use to generate all the various artifacts that need
to be rotated for the secrets files. Create a `./tmp` directory inside the
`cg-deploy-cf` repository. Delete this directory at the end of secrets rotation.

## Dealing with multiple secret files

The Cloud Foundry secrets are split into two parts, a `main.yml` and
`external.yml`. Internal secrets can be rotated either all at once or on a
rolling schedule of deployments. You can pull the information needed to decrypt
these from the `cg-deploy-cf` pipeline. You can easily grab the information
needed to [decrypt and encrypt secrets]({{ site.baseurl }}{% link _docs/ops/secrets.md %}) from
Concourse using the `fly-cli`.

```sh
# note the target name `fr` here is the output of `fly targets`
$ fly -t fr get-pipeline --pipeline deploy-cf | \
  spruce json | \
  jq -r '.resources | select(.name | test("common-"))'
```

### Internal secrets (main.yml)

1. Rotate all UAA user passwords with passwords matching the UAA restrictions
   set in [the spec](https://github.com/18F/uaa-customized-boshrelease/) for our
   `uaa-customized-boshrelease`. Be sure to match these UAA restrictions as it
   can cause a stalled deployment when the users cannot be set appropriately.
1. Rotate all the `uaa.clients.*` secrets.
    - For `uaa.clients.doppler` change `loggregator.uaa.client_secret` as well.
    - For `uaa.clients.tcp_emitter` change `acceptance_tests.oauth_password` as well.

#### Generate all the certificates

Add all the CA certificates signed by the Bosh root CA certificate. These root
certificate and key files can be grabbed with the `--grab-cert` flag for the
`generate-all-certificates.sh` file in
[18F/cg-deploy-cf](https://github.com/18F/cg-deploy-cf).

The `ci_env` environmental variable is the value for the name of the Concourse
you would like to target to get the root CA certificate from. (e.g. `fly targets`).
From inside the `./tmp` directory, run the following commands:

```sh
$ ci_env=fr ../generate-all-certificates.sh --grab-cert && \
  mv all-cf-certs staging-cf-diego-certs
$ ci_env=fr ../generate-all-certificates.sh --grab-cert && \
  mv all-cert-certs production-cf-diego-certs
```

This script will generate all of the certificates for both Diego and
Cloud Foundry. Since these deployments need to be deployed back-to-back, the
certificate generation is consolidated in the `cg-deploy-cf` repository.

#### Mind the Security Configuration for Consul schedule

Please see the documentation for [_Rotating certificates_]({{ site.baseurl }}{% link _docs/ops/runbook/rotating-secrets.md %}#rotating-certificates).

#### Updating certificates in secrets

Replace all the certificates corresponding to the filename and property matching
in the secrets file, e.g. `certs_dir/cloud-controller.crt` maps to
`properties.cc.public_cert`. Be sure to include the `-----BEGIN
CERTIFICATE-----` and `-----END CERTIFICATE----- ` and indent the value under
the YAML stanza to ensure valid YAML syntax.

#### Remaining secrets

The remaining secrets in this file besides certificates can all be rotated at
once. Do this ahead of the first deployment so that subsequent deployments only
need to follow the _Security Configuration for Consul_.

### External secrets (external.yml)

External secrets fall into a spectrum categories which ranges from _rotatable
with coordination_ with other cloud.gov deployments on one end and _non-rotatable
without data loss_ on the other.

#### Properties used in other deployments

1. `uaa.clients.*.secrets` properties need to be coordinated across various Bosh
   deployments and cloud.gov apps or service brokers.
1. `uaa.users.*.password` properties need to be coordinated across various Bosh
   deployments and cloud.gov apps or service brokers.
1. `login.smtp.*` properties for Mandrill.
1. `uaa.scim.users.broker-deployer` secret needs to be coordinated across our
   Service Broker deployments for cloud.gov.

#### New Relic external accounts

1. `collector.newrelic_insights.*` properties NewRelic license keys and
   configuration.
1. `collector.newrelic_plugin.*` properties NewRelic license keys and
   configuration.
1. `uaa.newrelic.*` properties NewRelic license keys and configuration.
1. `newrelic.*` properties NewRelic license keys and configuration.

#### Non-rotatable properties
1. `cc.db_encryption_key` **cannot be rotated** once set on a running CF deployment.
    - There is currently no way to rotate this encryption key for the Cloud
      Controller database.
1. `login.providers.*` metadata along with `login.saml.*` properties for
   certificates and keys.
    - The metadata comes from our external SAML providers. [These properties
      cannot _currently_ be rotated without downtime](https://www.pivotaltracker.com/n/projects/997278/stories/142082611).

#### Rotating external UAA client secrets

You will need to coordinate these changes with secrets and passphrase changes
for various other deployments. You can [reference the list of external
clients](https://github.com/18F/cg-deploy-cf/blob/master/cf-properties.yml)
in the `cf-properties.yml` file in the `cg-deploy-cf` repository under the
`properties.uaa.clients.*` YAML stanza.

You can search through the `cg-deploy-*` repositories to find which client secret goes
with which deployment. If you have all the repositories cloned locally, you can
`grep` through all of the repositories with the following command or using the
GitHub search

```sh
path_to_local_cg_respositories='file/path';
client_name='example';
open "https://github.com/search?q=user%3A18F+cg-deploy+%22${client_name}%22&type=Code"
find ${path_to_local_cg_repositories} -d 2 | xargs ack -n -i "(client.+: ${client_name})" -A2 -B2
```

## Recreating the Smoke Tests VMs

If after secrets rotation, the smoke test VMs for staging and production fail to
start, you may need to restart the VM. From inside a Concourse jumpbox, run the
following command to restart the VM and clear up the old smoke tests VM.

```sh
$ bosh-cli restart \
  -d cf-production
  $(bosh-cli vms -d cf-production | grep smoke_tests | cut -d ' ' -f 1)
```

This should clear up any strange errors that reference

```sh
Running errand 'smoke_tests':
  Expected task ${task_number} to succeed but was state is 'error'
```
