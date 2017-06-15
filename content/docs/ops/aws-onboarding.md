---
menu:
  docs:
    parent: operations
title: AWS onboarding
---

### Levels of access

While we try to minimize interaction with AWS directly (explained in next section), there are three different levels of AWS IAM access, provided to different roles:

* **Full administrative accounts:** This is be provided to the people known in our compliance documentation as the "Cloud Operations team".
* **Read-only accounts:** This is provided to GSA Security staff, who need access for incident response.
* **Indirect access through jumpboxes:** While the remainder of the Atlas team isn't given an AWS IAM account directly, they are able to SSH in to access the various BOSH machines by creating ephemeral jumpboxes. See the [Troubleshooting BOSH](../troubleshooting-bosh/) page for more information.

#### Restoring access for team members

If cloud.gov team members have lost access to their MFA application or need to
reset their password, verify their identity and coordinate or pair with them.

1. Find their user in AWS console.
1. Delete any AWS access keys they may have in their account.
1. Remove their MFA device.
1. Reset their password and download the CSV from Amazon.
1. Use https://fugacious.18f.gov to send them their credentials. Set the expiration to 2 views / 12 hours.
1. Slack DM the Fugacious link to them. Remind them to set their two-factor authentication via MFA device.

*** Setting up two-factor authentication

To set up multi-factor authentication (MFA):

1. Click your account name in the upper right corner.
1. Click 'Security Credentials'.
1. You might think this would be where you'd be able to add MFA. Sadly, no.
1. Click 'Users' in the left-side menu.
1. Search for your own username.
1. Click your username.
1. Click the resulting 'Security credentials' tab.
1. Look for the words 'Assigned MFA device'. If the words 'No' appear next to them, click the pencil icon and proceed from there.

### Changing AWS configuration

As mentioned previously, the cloud.gov team tries to minimize the amount of direct access and manipulation made to AWS directly, instead favoring automation and configuration-as-code through [BOSH](http://bosh.io/) and [Terraform](https://www.terraform.io/). Terraform is used to do the bootstrapping of the AWS environment—this information can be found in the [cg-provision](https://github.com/18F/cg-provision) repository. This includes:

* EC2 instances for BOSH
* Networking (VPCs)
* Security groups
* User accounts to be used by BOSH and the various brokers
* S3 buckets for use by Cloud Foundry (the system itself, not tenants)

Any new/changed AWS configuration should be done in that repository and applied via Terraform.
