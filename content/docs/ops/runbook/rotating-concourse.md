---
menu:
  docs:
    parent: runbook

title: Rotating Secrets - Concourse
---

## Introduction

Rotate the UAA client secret

### Working with the deployment

The deployment for Concourse is in the
[`cg-deploy-concourse`](https://github.com/18F/cg-deploy-concourse) repository.
You will need to update both the deployment pipelines for Concourse and the
Concourse Jumpboxes used to access the system.

### Dependencies

Rotating Concourse secrets has some external dependencies with [Bosh
secrets]({{< relref "docs/ops/runbook/rotating-bosh.md" >}}) and [IAM
roles]({{< relref "docs/ops/runbook/rotating-iam-users.md" >}}). Please complete
these rotations first, or reference them at the same time to properly rotate
Concourse credentials.

## Working with multiple Concourses

Concourse is running in multiple environments of cloud.gov. Take note the of the
Bosh targets in the `deploy-concourse` pipeline.

```sh
fly --target ${ci_env} \
    get-pipeline \
    --pipeline deploy-concourse \
> tmp/deploy-concourse.pipeline.yml
```

## Working with both pipelines
