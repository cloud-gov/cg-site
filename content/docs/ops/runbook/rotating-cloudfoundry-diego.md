---
menu:
  docs:
    parent: runbook

title: Rotating Cloud Foundry and Diego
---

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

The Cloud Foundry manifest is split into two parts, a `main.yml` and
`external.yml`. Internal secrets can be rotated either all at once or on a
rolling schedule of deployments. You can pull the information needed to decrypt
these from the `cg-deploy-cf` pipeline. You can easily grab the information
needed to [decrypt and encrypt secrets]({{< relref "ops/secrets.md" >}}) from
Concourse using the `fly-cli`.

```sh
# note the target name `fr` here is the output of `fly targets`
$ fly -t fr get-pipeline --pipeline deploy-cf | \
  spurce json | \
  jq -r '.resources | select(.name | test("common-"))'
```

### Internal secrets (main.yml)

1. Rotate all UAA user passwords with passwords matching the UAA restrictions
   set in [the spec](https://github.com/18F/uaa-customized-boshrelease/) for our
   `uaa-customized-boshrelease`.
    - `uaa.password.policy.minLength`
    - `uaa.password.policy.requireUpperCaseCharacter`
    - `uaa.password.policy.requireLowerCaseCharacter`
    - `uaa.password.policy.requireDigit`
    - `uaa.password.policy.requireSpecialCharacter`
1. Rotate all the `uaa.clients.*` secrets.
    - For `uaa.clients.doppler` change `loggregator.uaa.client_secret` as well.
    - For `uaa.clients.tcp_emitter` change `acceptance_tests.oauth_password` as well.


Add all the CA certificates signed by the Bosh root CA certificate. These root
certificate and key files can be grabbed with the `--grab-cert` flag for the
`generate-all-certificates.sh` file in
[18F/cg-deploy-cf](https://github.com/18F/cg-deploy-cf).

From inside the `./tmp` directory, run the following commands:

```sh
# fr is the name of the Concourse target, see the output from `fly targets`
$ ci_env=fr ../generate-all-certificates.sh --grab-cert && \
  mv all-cf-certs staging-cf-certs
$ ci_env=fr ../generate-all-certificates.sh --grab-cert && \
  mv all-cert-certs production-cf-certs
```

These properties need to be rotated on the same schedule mentioned in the
_Security Configuration for Consul_ documentation.

- `consul.ca_cert`
    - Deploy the new CA certificate after the old one for the first deployment.
      And remove the old CA certificate for the last deployment.
- `consul.agent_cert`
    - Deploy this only after a successful deployment of `consul.ca_cert`.
- `consul.agent_key`
    - Deploy this only after a successful deployment of `consul.ca_cert`.
- `consul.server_cert`
    - Deploy this only after a successful deployment of `consul.ca_cert`.
- `consul.server_key`
    - Deploy this only after a successful deployment of `consul.ca_cert`.
- `consul.encrypt_keys`
    - Deploy the new encrypt key before the old one for the first deployment.
      And remove the old encrypt key for the last deployment.

Make sure that Diego deploys after each rotation step for the certificate
updates from _Security Configuration for Consul_ in order to prevent downtime.

### External secrets (external.yml)

1. `cc.db_encryption_key` **cannot be rotated** once set on a running CF deployment.
    - There is currently no way to rotate this encryption key for the Cloud
      Controller database.
1. `login.providers.*` metadata along with `login.saml.*` properties for
   certificates and keys.
    - The metadata comes from our external SAML providers. In order to rotate
      these coordinate with them to exchange new metadata. The properties for
      `login.saml.*` can be generate with the following documentation, although
      this data will also need to be coordinated and exchanged with all
      providers.
1. `ccdb.*` properties AWS RDS connection configuration.
    - These properties need to be coordinated with our `cg-provision`
      repository.
1. `uaadb.*` properties AWS RDS connection configuration.
    - These properties need to be coordinated with our `cg-provision`
      repository.
1. `uaa.clients.*` properties need to be coordinated across various Concourse
   deployments and cloud.gov apps or service brokers.
1. `collector.newrelic_insights.*` properties NewRelic license keys and
   configuration.
1. `collector.newrelic_plugin.*` properties NewRelic license keys and
   configuration.
1. `uaa.newrelic.*` properties NewRelic license keys and configuration.
1. `newrelic.*` properties NewRelic license keys and configuration.
1. `nessus-agent.*` properties for Nessus.
1. `login.smtp.*` properties for Mandrill.
1. `collectd.riemann_server` property for Riemann server address.

## Recreating the Smoke Tests VMs

If after secrets rotation, the smoke test VMs for staging and production fail to
start, you may need to restart the VM. From inside a Production jumpbox, run the
following command to restart the VM and clear up the old smoke tests VM.

```sh
$ bosh-cli restart \
  -d cf-production
  $(bosh-cli vms -d cf-production | grep smoke_tests | cut -d ' ' -f 1)
```

