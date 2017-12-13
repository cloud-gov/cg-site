---
menu:
  docs:
    parent: operations
layout: ops
title: Secret key management
---

## Sharing secret keys

For sharing the following types of [sensitive information](https://github.com/18F/open-source-policy/blob/master/practice.md#protecting-sensitive-information) related to cloud.gov, cloud.gov team members must use GSA Google Hangouts. The team member must share the information only with intended recipient(s) who need to know the sensitive information. Team members can use the Hangouts screen-sharing feature or verbally share the information.

* Passwords
* Secret keys
* Sensitive environment variables
* Other secret authentication information

## Maintenance of system secret keys

To meet NIST security control [SC-12 (1)](https://web.nvd.nist.gov/view/800-53/Rev4/control?controlName=SC-12), we maintain the availability of all information on the platform in the event a cryptographic access key is lost or compromised.

Authorized federal staff rotate, encrypt, and backup keys yearly. Privileged users can access the keys only with two-factor authentication and a decryption passphrase. In the rare case that both the keys and the decryption passphrase for the backup are lost or compromised, new keys can be rotated in by authorized federal staff, while maintaining availability of information.

System secrets fall into one of three categories:
1. Shared - centrally managed secrets used across multiple bosh deployments
1. Deployment - secrets managed and stored per bosh deployment
1. Concourse - secrets consumed in concourse CI pipelines

### AWS credentials

If you need to view/update secrets:

1. Ask in [#cg-platform](https://gsa-tts.slack.com/messages/cg-platform/) for an account to read/write from the S3 buckets.
1. Setup aws-vault

#### Install aws-vault for AWS credentials
`aws-vault` secures credentials locally and generates temporary credentials to provide an additional layer of security.  To install `aws-vault` use the brew command:
```sh
brew cask install aws-vault
aws-vault add cloud-gov-govcloud
```

#### Configure MFA for aws-vault
All operators should have MFA enabled, which can be viewed under `Services -> IAM -> Users -> firstname.lastname -> Security Credentials`.  This MFA device needs to be added to the Amazon configuration to enable short lived tokens:

```sh
echo '[profile cloud-gov-govcloud]' >> ~/.aws/config
echo 'region = us-gov-west-1' >> ~/.aws/config
echo 'mfa_serial = arn:aws-us-gov:iam::1234567890:mfa/firstname.lastname' >> ~/.aws/config
```

#### Executing a command with short lived credentials
You can execute any system command with short lived credentials using the `aws-vault exec` command:

```sh
aws-vault exec cloud-gov-govcloud bash
```

Running `env | grep AWS` will show you a new set of credentials which are different from the primary IAM role credentials, as they are short lived and issued at runtime.  This means that if a malicious script or program attempts to read `~/.aws/credentials` or `~/.aws/config` all they will be unable to retrieve the primary credentials.

### Next Steps
Once this is complete, operators can provision profiles which use only specific resources, or specific permissions such as read only.  This scopes the role of the temporary credentials to further reduce the attack surface.

#### Generate and upload keys

Use [this script](https://github.com/18F/cg-pipeline-tasks/blob/master/generate_key.sh) to generate keys and upload them as access keys to AWS EC2 and an encrypted backup to AWS S3. You just need to provide a `BUCKET` destination for the backup and a decryption `PASSPHRASE`. In your terminal:

```sh
BUCKET=my-bucket PASSPHRASE=somethingorother ./generate_key.sh
```

Once the key is uploaded to AWS, the [cf-secrets.yml](https://github.com/18F/cg-deploy-cf/blob/staging/cf-secrets-example.yml) file you use for deployment needs to be updated. Modify `key_name` to use the new key, then start a new production deployment.

#### Dealing with secrets

Substitute `cf.main.yml` in the following steps for the relevant file.


#### UAA credentials

All UAA clients and users and associated credentials should be created via the Cloud Foundry secrets or the [service account]({{< relref "docs/services/cloud-gov-service-account.md" >}}) or [identity provider]({{< relref "docs/services/cloud-gov-identity-provider.md" >}}) services. UAA accounts should not be created manually; we reserve the right to drop permissions for or deprovision hand-propped accounts.

##### View secrets

1. Clone the [cg-pipeline-tasks](https://github.com/18F/cg-pipeline-tasks) repository.

    ```sh
    git clone https://github.com/18F/cg-pipeline-tasks.git
    ```

1. If you don't already have the AWS CLI set up with credentials, see [the steps above](#aws-credentials).
1. Download the credentials file.

    ```sh
    aws-vault exec cloud-gov-govcloud bash
    mkdir -p tmp
    aws s3 cp s3://cloud-gov-varz/cf.main.yml tmp/cf.main.yml.enc
    ```

1. Get the encryption passphrase.
    1. View the `deploy-cf` pipeline configuration for any of the `common-*`
       environments. The following command outputs all the `cg-common`
       resources. You can modify the test for `test("common-")` to grab specific
       credentials about each resource.

        ```sh
        fly --target <target> get-pipeline --pipeline deploy-cf | \
        spruce json | \
        jq -r '.resources[] | select(.name | test("common-"))'
        ```

    1. Grab the `secrets_passphrase` under the **common-prod** resource. The
       following command grabs just the **common-prod** resource and parses out
       the `secrets_passphrase` found in the `pipeline.yml` file for
       `cg-deploy-cf`. This is useful for feeding this value to other commands
       without visually exposing the secret in your terminal.

        ```sh
        fly --target <target> get-pipeline --pipeline deploy-cf | \
        spruce json | \
        jq -r '.resources[] | select(.name | test("common-prod")) | .sources.secrets_passphrase'
        ```

1. Decrypt the secrets file.

    ```sh
    INPUT_FILE=tmp/cf.main.yml.enc
    OUTPUT_FILE=tmp/cf.main.yml
    PASSPHRASE=$(fly --target <target> get-pipeline --pipeline deploy-cf | spruce json | jq -r '.resources[] | select(.name | test("common-prod")) | .sources.secrets_passphrase')
    ./decrypt.sh
    ```

1. Don't leave the secrets lying around (for security reasons, and because they get stale).

    ```sh
    rm -rf tmp
    ```

##### Change secrets

1. Post in [#cg-platform](https://gsa-tts.slack.com/messages/cg-platform/) saying you're updating `cf.main.yml`.
1. Follow the decryption steps above, up until the cleanup.
1. Modify the `cf.main.yml` with the new values.
1. Re-encrypt the file.

    ```sh
    INPUT_FILE=tmp/cf.main.yml
    OUTPUT_FILE=tmp/cf.main.yml.enc
    PASSPHRASE=$(fly --target <target> get-pipeline --pipeline deploy-cf | spruce json | jq -r '.resources[] | select(.name | test("common-prod")) | .sources.secrets_passphrase')
    ./encrypt.sh
    ```

1. Copy the new file up to S3.

    ```sh
    aws-vault exec cloud-gov-govcloud bash
    aws s3 cp tmp/cf.main.yml.enc-new s3://cloud-gov-varz/cf.main.yml --sse AES256
    ```

1. Clean up the secrets.

    ```sh
    rm -rf tmp
    ```
