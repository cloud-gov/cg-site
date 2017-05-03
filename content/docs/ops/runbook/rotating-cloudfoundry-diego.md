---
menu:
  docs:
    parent: runbook

title: Rotating Cloud Foundry and Diego
---

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

