---
menu:
  main:
    parent: operations
title: Key Rotation and availability
weight: 10
---

In order to comply with [SC 12 (1)](https://web.nvd.nist.gov/view/800-53/Rev4/control?controlName=SC-12) the organization needs to maintain availability of information in the event of the loss of cryptographic keys by users.

To do that cloud.gov has established a process to rotate and backup keys that ensures that keys are available to those who have access to the encryption passphrase. In the case of loss of both the keys and the encryption passphrase, the keys can be rotated while maintaining availability of information.

### How to rotate keys

There is a script to generate keys and upload them to AWS EC2: https://github.com/18F/cg-pipelines/blob/master/tasks/generate_key.sh

To run it you just need to provide a `BUCKET` and a `PASSPHRASE`:

```
BUCKET=my-bucket PASSPHRASE=somethingorother ./generate_key.sh
```

Once the key is uploaded to AWS the [cf-secrets.yml](https://github.com/18F/cg-manifests/blob/master/cf/cf-secrets-example.yml) file needs to be updated to use the new key and a new production deploy needs to be started.

### Access Backed up keys

In the case that keys need to be accessed, they have to be downloaded in their encrypted form from the `BUCKET` used in the step above and decrypted.

To decrypt the use this script https://github.com/18F/cg-pipelines/blob/master/tasks/decrypt.sh:

```
INPUT_FILE=bosh-123.enc.pem OUTPUT_FILE=bosh-123.pem PASSPHRASE=somethingorother ./decrypt.sh
