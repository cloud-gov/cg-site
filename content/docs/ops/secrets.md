---
menu:
  docs:
    parent: operations
title: Secret key management
---

### Sharing secret keys

For sharing the following types of [sensitive information](https://github.com/18F/open-source-policy/blob/master/practice.md#protecting-sensitive-information) related to cloud.gov, cloud.gov team members must use [Fugacious](https://fugacious.18f.gov/) links, shared over a GSA application (such as GSA Gmail or TTS Slack). The team member must share the Fugacious link only with intended recipient(s) who need to know the sensitive information.

* Passwords
* Secret keys
* Sensitive environment variables
* Other secret authentication information

The cloud.gov team must comply with 18F's [policies in the Handbook](https://handbook.18f.gov/sensitive-information/#fugacious), with the following additional restrictions (for security and compliance reasons):

* Expiry must be set to 12 hours or fewer
* Number of opens must be set to two views, per person who needs to open it

### Maintenance of system secret keys

To meet NIST security control [SC-12 (1)](https://web.nvd.nist.gov/view/800-53/Rev4/control?controlName=SC-12), we maintain the availability of all information on the platform in the event a cryptographic access key is lost or compromised.

Authorized federal staff rotate, encrypt, and backup keys monthly. Privileged users can access the keys only with two-factor authentication and a decryption passphrase. In the rare case that both the keys and the decryption passphrase for the backup are lost or compromised, new keys can be rotated in by authorized federal staff, while maintaining availability of information.

#### AWS credentials

If you need to view/update secrets:

1. Ask in [#cg-platform](https://gsa-tts.slack.com/messages/cg-platform/) for an account to read/write from the S3 buckets.
1. Set up a [named profile](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html#cli-multiple-profiles) for [the AWS CLI](https://aws.amazon.com/cli/).

The examples below use `--profile govcloud`, but replace with the name of your profile.

#### Generate and upload keys

Use [this script](https://github.com/18F/cg-pipeline-tasks/blob/master/generate_key.sh) to generate keys and upload them as access keys to AWS EC2 and an encrypted backup to AWS S3. You just need to provide a `BUCKET` destination for the backup and a decryption `PASSPHRASE`. In your terminal:

```bash
BUCKET=my-bucket PASSPHRASE=somethingorother ./generate_key.sh
```

Once the key is uploaded to AWS, the [cf-secrets.yml](https://github.com/18F/cg-deploy-cf/blob/staging/cf-secrets-example.yml) file you use for deployment needs to be updated. Modify `key_name` to use the new key, then start a new production deployment.

#### Dealing with secrets

Substitute `cf.main.yml` in the following steps for the relevant file.


#### UAA credentials

All UAA clients and users and associated credentials should be created via the Cloud Foundry secrets or the [service account]({{< relref "docs/services/cloud-gov-service-account.md" >}}) or [identity provider]({{< relref "docs/services/cloud-gov-identity-provider.md" >}}) services. UAA accounts should not be created manually; we reserve the right to drop permissions for or deprovision hand-propped accounts.

##### View secrets

1. Clone the [cg-pipeline-tasks](https://github.com/18F/cg-pipeline-tasks) repository.

    ```bash
    git clone https://github.com/18F/cg-pipeline-tasks.git
    ```

1. If you don't already have the AWS CLI set up with credentials, see [the steps above](#aws-credentials).
1. Download the credentials file.

    ```bash
    mkdir -p tmp
    aws s3 cp s3://cloud-gov-varz/cf.main.yml tmp/cf.main.yml.enc --profile govcloud
    ```

1. Get the encryption passphrase.
    1. View the `deploy-cf` pipeline configuration for any of the `common-*`
       environments. The following command outputs all the `cg-common`
       resources. You can modify the test for `test("common-")` to grab specific
       credentials about each resource.

        ```bash
        fly --target <target> get-pipeline --pipeline deploy-cf | \
        spruce json | \
        jq -r '.resources[] | select(.name | test("common-"))'
        ```

    1. Grab the `secrets_passphrase` under the **common-prod** resource. The
       following command grabs just the **common-prod** resource and parses out
       the `secrets_passphrase` found in the `pipeline.yml` file for
       `cg-deploy-cf`. This is useful for feeding this value to other commands
       without visually exposing the secret in your terminal.

        ```bash
        fly --target <target> get-pipeline --pipeline deploy-cf | \
        spruce json | \
        jq -r '.resources[] | select(.name | test("common-prod")) | .sources.secrets_passphrase'
        ```

1. Decrypt the secrets file.

    ```bash
    INPUT_FILE=tmp/cf.main.yml.enc
    OUTPUT_FILE=tmp/cf.main.yml
    PASSPHRASE=$(fly --target <target> get-pipeline --pipeline deploy-cf | spruce json | jq -r '.resources[] | select(.name | test("common-prod")) | .sources.secrets_passphrase')
    ./decrypt.sh
    ```

1. Don't leave the secrets lying around (for security reasons, and because they get stale).

    ```bash
    rm -rf tmp
    ```

##### Change secrets

1. Post in [#cg-platform](https://gsa-tts.slack.com/messages/cg-platform/) saying you're updating `cf.main.yml`.
1. Follow the decryption steps above, up until the cleanup.
1. Modify the `cf.main.yml` with the new values.
1. Re-encrypt the file.

    ```bash
    INPUT_FILE=tmp/cf.main.yml
    OUTPUT_FILE=tmp/cf.main.yml.enc
    PASSPHRASE=$(fly --target <target> get-pipeline --pipeline deploy-cf | spruce json | jq -r '.resources[] | select(.name | test("common-prod")) | .sources.secrets_passphrase')
    ./encrypt.sh
    ```

1. Copy the new file up to S3.

    ```bash
    aws s3 cp tmp/cf.main.yml.enc-new s3://cloud-gov-varz/cf.main.yml --profile govcloud --sse AES256
    ```

1. Clean up the secrets.

    ```bash
    rm -rf tmp
    ```
