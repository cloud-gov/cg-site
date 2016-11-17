---
menu:
  docs:
    parent: operations
title: AWS Onboarding
---

### Levels of access

While we try to minimize interaction with AWS directly (explained in next section), there are three different levels of AWS IAM access, provided to different roles:

* **Full administrative accounts:** This is be provided to the people known in our compliance documentation as the "Cloud Operations team".
* **Read-only accounts:** This is provided to GSA Security staff, who need access for incident response.
* **Indirect access through jumpboxes:** While the remainder of the Atlas team isn't given an AWS IAM account directly, they are able to SSH in to access the various BOSH machines by creating ephemeral jumpboxes. See the [Troubleshooting BOSH](../troubleshooting-bosh/) page for more information.

### Changing AWS configuration

As mentioned previously, the cloud.gov team tries to minimize the amount of direct access and manipulation made to AWS directly, instead favoring automation and configuration-as-code through [BOSH](http://bosh.io/) and [Terraform](https://www.terraform.io/). Terraform is used to do the bootstrapping of the AWS environment—this information can be found in the [cg-provision](https://github.com/18F/cg-provision) repository. This includes:

* EC2 instances for BOSH
* Networking (VPCs)
* Security groups
* User accounts to be used by BOSH and the various brokers
* S3 buckets for use by Cloud Foundry (the system itself, not tenants)

Any new/changed AWS configuration should be done in that repository and applied via Terraform.
