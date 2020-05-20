---
parent: operations
layout: ops
layout: docs
sidenav: true
title: Secret key management
---

## Sharing secret keys

For sharing the following types of [sensitive information](https://github.com/18F/open-source-policy/blob/master/practice.md#protecting-sensitive-information) related to cloud.gov, cloud.gov team members must use GSA Google Meet. The team member must share the information only with intended recipient(s) who need to know the sensitive information. Team members can use the Meet screen-sharing feature or verbally share the information.

* Passwords
* Secret keys
* Sensitive environment variables
* Other secret authentication information



## AWS credentials

### About AWS credential management

Multi-factor authentication is not only important to interactive console logins, but also for command-line interaction. Checking for console MFA is a standard compliance check, e.g. a [Chef Inspec check that all AWS users have MFA enabled](https://github.com/inspec/inspec-aws#ensure-all-aws-users-have-mfa-enabled), but at cloud.gov we go beyond that to ensure we have MFA enabled for _all_ API calls. We do so with the following IAM policy snippet:

```javascript
      {
          "Sid": "DenyAllExceptListedIfNoMFA",
          "Effect": "Deny",
          "NotAction": [
              "iam:CreateVirtualMFADevice",
              "iam:EnableMFADevice",
              "iam:GetUser",
              "iam:ListMFADevices",
              "iam:ListVirtualMFADevices",
              "iam:ResyncMFADevice",
              "sts:GetSessionToken"
          ],
          "Resource": "*",
          "Condition": {
              "BoolIfExists": {"aws:MultiFactorAuthPresent": "false"}
          }
      }
```

If operators attempt to use their keys without MFA, an API error is thrown such as:

```
An error occurred (AccessDenied) when calling the ListUsers operation: User: ... is not authorized to perform: iam:ListUsers on resource: with an explicit deny
```
To work with AWS credentials on a day-to-day basis, we rely on [`aws-vault`](https://github.com/99designs/aws-vault/).

### Install aws-vault for AWS credentials and create a profile

Install `aws-vault` with this [Homebrew](https://brew.sh/) command:

```sh
brew cask install aws-vault
```

Now create a profile, e.g., for the AWS GovCloud account:

```sh
aws-vault add cloud-gov-govcloud
```

### Configure MFA for aws-vault

All operators must have MFA enabled, which is taken care of as a part of the platform operator onboarding process.  This can be confirmed by checking in the AWS console under `Services -> IAM -> Users -> firstname.lastname -> Security Credentials`, or in the command line with `aws iam list-virtual-mfa-devices`.  Confirm that MFA is enabled for your account, then use the following commands to add the ARN of the MFA device to the local Amazon configuration in order to enable short lived tokens:

```sh
me=$(aws iam get-user | jq -r '.User.UserName')
mfa_serial=$(aws iam list-virtual-mfa-devices | jq --arg me "$me" -r '.VirtualMFADevices[]|select(.User.UserName==$me) | .SerialNumber')
echo '[profile cloud-gov-govcloud]' >> ~/.aws/config
echo 'region = us-gov-west-1' >> ~/.aws/config
echo "mfa_serial = $mfa_serial" >> ~/.aws/config
```

### Executing a command with short lived credentials

You can execute any system command with short lived credentials using the `aws-vault exec` command.  For example, to open a new shell session with the credentials set in the environment, run the following command:

```sh
aws-vault exec cloud-gov-govcloud bash
```

If you do this, running `env | grep AWS` will show you a new set of credentials which are different from the primary IAM role credentials because they are short lived and issued at runtime.  This means that if a malicious script or program attempts to read `~/.aws/credentials` or `~/.aws/config` they will be unable to retrieve the primary credentials.

### Next Steps for aws-vault configuration and usage

Once this is complete, you can provision additional profiles which use only specific resources, or specific permissions such as read only.  This scopes the role of the temporary credentials to further reduce the attack surface.

## Maintenance of system secret keys

To meet NIST security control [SC-12 (1)](https://web.nvd.nist.gov/view/800-53/Rev4/control?controlName=SC-12), we maintain the availability of all information on the platform in the event a cryptographic access key is lost or compromised.

Authorized federal staff rotate, encrypt, and backup keys yearly. Privileged users can access the keys only with two-factor authentication and a decryption passphrase. In the rare case that both the keys and the decryption passphrase for the backup are lost or compromised, new keys can be rotated in by authorized federal staff, while maintaining availability of information.

## Managing legacy cloud.gov credentials

Most credentials are moving to CredHub, but some are still managed in S3. 
To work with them you'll need your AWS account set up, along with `aws-vault` (see above).

### UAA credentials
All UAA clients and users and associated credentials should be created via the Cloud Foundry secrets or the [service account]({{ site.baseurl }}{% link _docs/services/cloud-gov-service-account.md %}) or [identity provider]({{ site.baseurl }}{% link _docs/services/cloud-gov-identity-provider.md %}) services. UAA accounts should not be created manually; we reserve the right to drop permissions for or deprovision hand-propped accounts.

### Updating Secrets

System secrets fall into one of three categories.

1. [Shared](#updating-shared-secrets) - centrally managed secrets used across multiple deployments
1. [Deployment](#updating-deployment-secrets) - secrets managed and stored per bosh deployment and environment
1. [Concourse](#updating-concourse-secrets) - secrets consumed as credentials in Concourse CI pipelines

Updating Deployment and Concourse secrets requires first configuring [AWS credentials (above)](#aws-credentials).

#### Updating Shared Secrets

Centrally managed secrets are generated by a Concourse pipeline.

1. Trigger the relevent build in [secrets-rotation](https://ci.fr.cloud.gov/teams/main/pipelines/secret-rotation). This creates new secrets and stores them in a common file.
2. Trigger the relevent deployment(s).

#### Updating Deployment Secrets

Secrets which are not centrally managed must be updated per deployment and environment. Substitute `cf.main.yml` in the following steps for the relevant file.

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

#### Updating Concourse Secrets

Updating Concourse secrets combines the shared secrets above with local config to change a Concourse pipeline.  Note: The steps below are for updating the `deploy-bosh` pipeline, the same steps can also be applied to the `deploy-concourse` pipeline.

1. Clone the [cg-scripts](https://github.com/18F/cg-scripts) repository.

    ```sh
    git clone https://github.com/18F/cg-scripts.git
    ```

1. If you don't already have the AWS CLI set up with credentials, see [the steps above](#aws-credentials).

1. `cd` to the local clone of the Concourse pipeline you are updating

1. Create a `concourse-environment` file.

    ```sh
    aws-vault exec cloud-gov-govcloud bash
    cd $(mktemp -d)
    CI_ENV=cloud-gov-govcloud SECRETS_BUCKET=cloud-gov-varz CG_PIPELINE=~/cg-pipeline-tasks ~/cg-scripts/generate-concourse-environment.sh ~/cg-deploy-bosh/cg-deploy-bosh.yml
    ```

    Where `CI_ENV` is the environment configured for local Concourse `fly` CLI, `SECRETS_BUCKET` is the encrypted S3 bucket where credentials are stored, and `CG_PIPELINE` is the path to a local clone of the `cg-pipeline-tasks` git repository.

    Any number of local yml files (`cg-deploy-bosh.yml`) can also be merged to create the final `concourse-environment.yml`.

1. Update the Concourse pipeline with `fly`.

    ```sh
    fly -t cloud-gov-govcloud set-pipeline -p deploy-bosh -c ~/cg-deploy-bosh/ci/pipeline.yml -l concourse-environment.yml
    ```

    If the repository includes a `ci/concourse-defaults.yml` file, you'll need to load variables from there as well:

    ```sh
    fly -t cloud-gov-govcloud set-pipeline -p deploy-bosh -c ~/cg-deploy-bosh/ci/pipeline.yml -l concourse-environment.yml -l ~/cg-deploy-bosh/ci/concourse-defaults.yml`
    ```

1. Don't leave the secrets lying around (for security reasons, and because they get stale).

    ```sh
    rm -rf concourse-environment.yml
    ```