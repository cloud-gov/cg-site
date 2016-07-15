---
menu:
  main:
    parent: operations
title: Secrets Management
weight: 10
---

To meet NIST security control [SC-12 (1)](https://web.nvd.nist.gov/view/800-53/Rev4/control?controlName=SC-12) we maintain the availability of all information on the platform in the event a crypotographic access key is lost or compromised.

Authorized federal staff rotate, encrypt, and backup keys monthly. Privileged users can access the keys only with two-factor authentication and a decryption passphrase. In the rare case that both the keys and the decryption passphrase for the backup are lost or compromised, new keys can be rotated in by authorized federal staff, while maintaining availability of information.

### AWS credentials

If you need to view/update secrets:

1. Ask in [#cloud-gov-atlas](https://18f.slack.com/messages/cloud-gov-atlas/) for an account to read/write from the S3 buckets.
1. Set up a [named profile](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html#cli-multiple-profiles) for [the AWS CLI](https://aws.amazon.com/cli/).

The examples below use `--profile govcloud`, but replace with the name of your profile.

### Generate and upload keys

Use [this script](https://github.com/18F/cg-pipeline-tasks/blob/master/generate_key.sh) to generate keys and upload them as access keys to AWS EC2 and an encrypted backup to AWS S3. You just need to provide a `BUCKET` destination for the backup and a decryption `PASSPHRASE`. In your terminal:

```bash
BUCKET=my-bucket PASSPHRASE=somethingorother ./generate_key.sh
```

Once the key is uploaded to AWS the [cf-secrets.yml](https://github.com/18F/cg-manifests/blob/master/cf/cf-secrets-example.yml) file you use for deployment needs to be updated. Modify `key_name` to use the new key, then start a new production deployment.

### Dealing with secrets

Substitute `cf.yml` in the following steps for the relevant file.

#### View secrets

1. Clone the [cg-pipeline-tasks](https://github.com/18F/cg-pipeline-tasks) repository.

    ```bash
    git clone https://github.com/18F/cg-pipeline-tasks.git
    ```

1. If you don't already have the AWS CLI set up with credentials, see [the steps above](#aws-credentials).
1. Download the credentials file.

    ```bash
    mkdir -p tmp
    aws s3 cp s3://cloud-gov-varz/cf.yml tmp/cf.yml.enc --profile govcloud
    ```

1. Get the encryption passphrase.
    1. View the `deploy-cf` pipeline configuration.

        ```bash
        fly -t <target> get-pipeline -p deploy-cf | less
        ```

    1. Grab the `secrets_passphrase` under the `common-prod` section.
1. Decrypt the secrets file.

    ```bash
    INPUT_FILE=tmp/cf.yml.enc OUTPUT_FILE=tmp/cf.yml PASSPHRASE=... ./decrypt.sh
    ```

1. Don't leave the secrets lying around (for security reasons, and because they get stale).

    ```bash
    rm -rf tmp
    ```

#### Change secrets

1. Post in [#cloud-gov-atlas](https://18f.slack.com/messages/cloud-gov-atlas/) saying you're updating `cf.yml`.
1. Follow the decryption steps above, up until the cleanup.
1. Modify the `cf.yml` with the new values.
1. Re-encrypt the file.

    ```bash
    INPUT_FILE=tmp/cf.yml OUTPUT_FILE=tmp/cf.yml.enc-new PASSPHRASE=... ./encrypt.sh
    ```

1. Copy the new file up to S3.

    ```bash
    aws s3 cp tmp/cf.yml.enc-new s3://cloud-gov-varz/cf.yml --profile govcloud
    ```

1. Clean up the secrets.

    ```bash
    rm -rf tmp
    ```
