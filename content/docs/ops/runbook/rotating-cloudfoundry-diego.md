---
menu:
  docs:
    parent: runbook

title: Rotating Cloud Foundry and Diego
---

When rotating secrets for Cloud Foundry and Diego you will need to follow the
proper steps in order to perform a rolling update to the platform. There are six
deployments that need to be synchronized across two Bosh deployments.

Follow the following documentation to see which values to replace.

- [Cloud Foundry AWS Stub](http://docs.cloudfoundry.org/deploying/aws/cf-stub.html)
- [Security Configuration for Consul](http://docs.cloudfoundry.org/deploying/common/consul-security.html)
- [Generating all the deploy-cf certificates](https://github.com/18F/cg-deploy-cf#how-to-generate-the-final-manifest)

## Add new certificates and keys

Add all the CA certificates signed by the Bosh root CA certificate. These root
certificate and key files can be grabbed with the `--grab-cert` flag for the
`generate-all-certificates.sh` file in
[18F/cg-deploy-cf](https://github.com/18F/cg-deploy-cf).

You can rotate every certificate / key property except for the following:

- `consul.ca_cert`
- `consul.agent_cert`
- `consul.agent_key`
- `consul.server_cert`
- `consul.server_key`
- `consul.encrypt_keys`

These properties need to be rotated on the same schedule mentioned in the
_Security Configuration for Consul_ documentation. For the first deployment, add
the root CA certificate and the new encrypt_key

```
consul:
  encrypt_keys
  - cffb_ddfffccf_fb_ecabaaafbfdadce
  - be_aded_ecacfff_ce_aac_ebebdacca
```

## Replace leaf key pairs in CF deployment
## Remove old CA from CF

# Things you will be rotating

1. Rotate all AWS keys
1. Rotate all UAA user passwords with correct password type
1. Rotate all certs with `./generate-all-certificates.sh`
    1. Consul certificates need to rotated based on the Security Configuration
       for Consul
    1. Add new CA cert for Consul & Deploy CF
    1. Add new Agent / Server cert and keys & Deploy CF
    1. Remove old CA cert for Consul & Deploy CF
    1. Add new `encrypt_keys` value above previous `encryp_keys` value & Deploy
       CF
    1. Remove old `encrypt_keys` value & Deploy CF
1. `db_encryption_key` cannot be rotated once set on a running CF deployment

