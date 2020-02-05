---
parent: runbook
layout: ops

layout: docs
sidenav: true
title: Rotating Secrets II - IAM users via Terraform
---

### IAM Users infrastructure as a code with Terraform

In the [18F/cg-provision](https://github.com/18F/cg-provision) contains the
Terraform files used to maintain our AWS infrastructure as code. User modules
are in the `terraform/modules/iam_user/*` path. Each module is utilized in
`stack.tf` and prints the `output.tf` contents after a successful Terrafrom
apply.

Each of the user modules in `iam_user` individually leverage the
`aws_iam_access_key` and support having up to two of these resources. We name
the resources with a `_vX` version suffix. These resources are then referenced
in our output with a suffix for previous and current keys e.g. `_prev` and `_curr`.

This is used to avoid invalidating all the previous credentials during a secrets
rotation. This gives the operator enough of a window to update credentials across
our various deployments.

### Rotating IAM user access key ids and secret access keys

When rotating IAM user credentials, it's important to generate new ones while
making sure the old ones stay around until Concourse pipelines and Bosh
manifests are updated with the latest version output. The following examples
show file-diffs for a single user. You will repeat this process across all user
modules and submit a single PR to begin the secret rotation window. You can also
find examples of closed and merged pull requests in the [`cg-provision`
repository](https://github.com/18F/cg-provision/pulls?utf8=✓&q=is%3Apr%20is%3Aclosed%20rotate)
around rotating IAM roles

#### Update the rotation iam_user module to have two access key resources

Create a new sequential version of the credentials in the modules found in
`module/iam_user/*/output.tf` and `module/iam_user/*/user.tf` for each `iam_user`.

> Note: These file-diffs are simply examples. They will not apply properly, so
> please don't apply them. These changes will need to be made manually.

```diff
diff --git a/terraform/modules/iam_user/limit_check_user/user.tf b/terraform/modules/iam_user/limit_check_user/user.tf
--- a/terraform/modules/iam_user/limit_check_user/user.tf
+++ b/terraform/modules/iam_user/limit_check_user/user.tf
@@ -10,6 +10,10 @@

 resource "aws_iam_access_key" "iam_access_key_v2" {
   user = "${aws_iam_user.iam_user.name}"
 }

+resource "aws_iam_access_key" "iam_access_key_v3" {
+  user = "${aws_iam_user.iam_user.name}"
+}
+
 resource "aws_iam_user_policy" "iam_policy" {
   name = "${aws_iam_user.iam_user.name}-policy"
   user = "${aws_iam_user.iam_user.name}"

```

The example above shows keys being rotated from `_v2` to `_v3`. The example
below shows that the named resources from above `iam_access_key_vX` are set as
values for the `_prev` and `_curr` outputs.

```diff

diff --git a/terraform/modules/iam_user/limit_check_user/outputs.tf b/terraform/modules/iam_user/limit_check_user/outputs.tf
--- a/terraform/modules/iam_user/limit_check_user/outputs.tf
+++ b/terraform/modules/iam_user/limit_check_user/outputs.tf
@@ -2,14 +2,14 @@ output "username" {
   value = "${aws_iam_user.iam_user.username}"
 }
 output "access_key_id_prev" {
-  value = ""
+  value = "${aws_iam_access_key.iam_access_key_v2.access_key_id}"
 }
 output "secret_access_key_prev" {
-  value = ""
+  value = "${aws_iam_access_key.iam_access_key_v2.secret_access_key}"
 }
 output "access_key_id_curr" {
-  value = "${aws_iam_access_key.iam_access_key_v2.access_key_id}"
+  value = "${aws_iam_access_key.iam_access_key_v3.access_key_id}"
 }
 output "secret_access_key_curr" {
-  value = "${aws_iam_access_key.iam_access_key_v2.secret_access_key}"
+  value = "${aws_iam_access_key.iam_access_key_v3.secret_access_key}"
 }
```

Repeat this process across all the `modules/iam_user/*/user.tf` and
`modules/iam_user/*/outputs.tf` files. Once that's done, submit a pull request
against `master` for `cg-provision`. Once the pull request is merged, run the
provisioning step in Concourse.

Capture the outputs for `_curr` and replace all the values of `_prev` in either
Bosh manifests secrets stubs or Concourse credentials.

#### Revert the source for all modules

Once all the `iam_user` modules have been updated, revert the source back to the
`iam_user/base` with a single updated version. This deletes the previous version
credentials from the IAM users.

```diff
diff --git a/terraform/modules/iam_user/limit_check_user/user.tf b/terraform/modules/iam_user/limit_check_user/user.tf
--- a/terraform/modules/iam_user/limit_check_user/user.tf
+++ b/terraform/modules/iam_user/limit_check_user/user.tf
@@ -10,6 +10,10 @@

-resource "aws_iam_access_key" "iam_access_key_v2" {
-  user = "${aws_iam_user.iam_user.name}"
-}
-

 resource "aws_iam_access_key" "iam_access_key_v3" {
   user = "${aws_iam_user.iam_user.name}"
 }

 resource "aws_iam_user_policy" "iam_policy" {

```

The example above references `_v3` as the now current version by removing the
`_v2` version from the `user.tf` file. The example below removes the output
value from the `_prev` output since the previous version was removed in the
`user.tf` file.

```diff

diff --git a/terraform/modules/iam_user/limit_check_user/outputs.tf b/terraform/modules/iam_user/limit_check_user/outputs.tf
--- a/terraform/modules/iam_user/limit_check_user/outputs.tf
+++ b/terraform/modules/iam_user/limit_check_user/outputs.tf
@@ -2,14 +2,14 @@ output "username" {
   value = "${aws_iam_user.iam_user.username}"
 }
 output "access_key_id_prev" {
-  value = "${aws_iam_access_key.iam_access_key_v2.access_key_id}"
+  value = ""
 }
 output "secret_access_key_prev" {
-  value = "${aws_iam_access_key.iam_access_key_v2.secret_access_key}"
+  value = ""
 }
 output "access_key_id_curr" {
   value = "${aws_iam_access_key.iam_access_key_v3.access_key_id}"
 }
 output "secret_access_key_curr" {
   value = "${aws_iam_access_key.iam_access_key_v3.secret_access_key}"
 }
```

Once that's done, submit a pull request against `master` for `cg-provision`
again. Once the pull request is merged, run the provisioning step in Concourse.
The Terraform `apply` will delete all the `_prev` credentials from AWS.
