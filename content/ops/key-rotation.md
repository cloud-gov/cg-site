---
menu:
  main:
    parent: operations
title: Key Rotation and Availability
weight: 10
---

To meet NIST security control [SC-12 (1)](https://web.nvd.nist.gov/view/800-53/Rev4/control?controlName=SC-12) we maintain the availability of all information on the platform in the event a crypotographic access key is lost or compromised.

Authorized federal staff rotate, encrypt, and backup keys monthly. Priviliged users can access the keys only with two-factor authentication and a decryption passphrase. In the rare case that both the keys and the decryption passphrase for the backup are lost or compromised, new keys can be rotated in by authorized federal staff, while maintaining availability of information.

### Generate and upload keys

Use [this script](https://github.com/18F/cg-pipelines/blob/master/tasks/generate_key.sh) to generate keys and upload them as access keys to AWS EC2 and an encrypted backup to AWS S3: 

You just need to provide a `BUCKET` destination for the backup and a decryption `PASSPHRASE`. In your terminal:

```
BUCKET=my-bucket PASSPHRASE=somethingorother ./generate_key.sh
```

Once the key is uploaded to AWS the [cf-secrets.yml](https://github.com/18F/cg-manifests/blob/master/cf/cf-secrets-example.yml) file you use for deployment needs to be updated. Modify `key_name` to use the new key, then start a new production deployment.

### Access key backup

In the case that keys need to be accessed, downloaded and decrypt them from the `BUCKET` used in the first step.

Use [this script](https://github.com/18F/cg-pipelines/blob/master/tasks/decrypt.sh) for decryption. In your terminal:

```
INPUT_FILE=bosh-123.enc.pem OUTPUT_FILE=bosh-123.pem PASSPHRASE=somethingorother ./decrypt.sh
