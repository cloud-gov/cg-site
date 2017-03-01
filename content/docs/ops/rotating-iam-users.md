---
menu:
  docs:
    parent: operations
title: Rotating IAM users with Terraform
---

### IAM Users infrastructure as a code

In the [18F/cg-provision](https://github.com/18F/cg-provision) contains the
Terraform files used to maintain our AWS infrastructure as code. User modules
are in the `terraform/modules/iam_user/*` path. Each module is leveraged in the
`terraform/stacks/*` path.

Outputs are for the `iam_user` modules are versioned with a `_vN` suffix with
`(N)` representing the version number. When creating new keys, make sure that
versions get incremented across all stacks when updating them.

### Rotating IAM user access key ids and secret access keys

When rotating IAM user credentials, it's important to generate new ones while
making sure the old ones stay around until Concourse pipelines and Bosh
manifests are updated with the latest version's output.

You achieve this by updating the `module/iam_user/rotation` files to create the
current named version – the string after `resource "aws_iam_access_key"` – and
the new named version. The version name is important as Terraform will
automatically re-create `acccess_key_id` and `secret_access_key` based on the
version name.

Create a new sequential version of the output in the main
`module/iam_user/rotation/output.tf` and `module/iam_user/rotation/user.tf` files.

```terraform
# module/iam_user/rotation/user.tf
resource "aws_iam_access_key" "iam_access_key_v<CurrentVersion>" {
  user = "${aws_iam_user.iam_user.name}"
}
resource "aws_iam_access_key" "iam_access_key_v<NewVersion>" {
  user = "${aws_iam_user.iam_user.name}"
}

# module/iam_user/rotation/output.tf
output "access_key_id_v<CurrentVersion>" {
  value = "${aws_iam_access_key.iam_access_key_v<CurrentVersion>.id}"
}

output "secret_access_key_v<CurrentVersion>" {
  value = "${aws_iam_access_key.iam_access_key_v<CurrentVersion>.secret}"
}

output "access_key_id_v<NewVersion>" {
  value = "${aws_iam_access_key.iam_access_key_v<NewVersion>.id}"
}

output "secret_access_key_v<NewVersion>" {
  value = "${aws_iam_access_key.iam_access_key_v<NewVersion>.secret}"
}
```
