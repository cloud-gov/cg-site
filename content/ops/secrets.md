---
menu:
  main:
    parent: operations
title: Secrets Management
weight: 10
---

To meet NIST security control [SC-12 (1)](https://web.nvd.nist.gov/view/800-53/Rev4/control?controlName=SC-12) we maintain the availability of all information on the platform in the event a crypotographic access key is lost or compromised.

Authorized federal staff rotate, encrypt, and backup keys monthly. Privileged users can access the keys only with two-factor authentication and a decryption passphrase. In the rare case that both the keys and the decryption passphrase for the backup are lost or compromised, new keys can be rotated in by authorized federal staff, while maintaining availability of information.

### Grabbing AWS credentials

Note that access here is gated by membership in [the cloud-gov-ci team](https://github.com/orgs/18F/teams/cloud-gov-ci) in GitHub.

1. Go to https://ci.fr.cloud.gov/pipelines/terraform-provision (substitute relevant Concourse instance).
1. Click the `bootstrap-tooling` job.
1. Expand the `create-update-tooling` step.
1. Grab `ci_access_key_id` and `ci_secret_access_key`.

#### Using with the AWS CLI

If you have your own AWS credentials, set up a [named profile](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html#cli-multiple-profiles) for [the AWS CLI](https://aws.amazon.com/cli/). If you don't, set the AWS environment variables locally. Note [the space at the beginning of the latter commands so they are excluded from history](http://unix.stackexchange.com/questions/32460/excluding-some-of-the-commands-from-being-getting-stored-in-bash-history#comment505752_32461).

```bash
export HISTCONTROL="ignorespace"
export AWS_DEFAULT_REGION=us-gov-west-1
 export AWS_ACCESS_KEY_ID=...
 export AWS_SECRET_ACCESS_KEY=...
```

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

1. If you don't already have the AWS CLI set up with credentials, see [the steps above](#grabbing-aws-credentials).
1. Download the credentials file.

    ```bash
    mkdir -p tmp
    aws s3 cp s3://cloud-gov-varz/cf.yml tmp/cf.yml.enc
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
    aws s3 cp tmp/cf.yml.enc-new s3://cloud-gov-varz/cf.yml
    ```

1. Clean up the secrets.

    ```bash
    rm -rf tmp
    ```
