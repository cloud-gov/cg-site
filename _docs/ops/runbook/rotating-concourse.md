---
parent: runbook
layout: ops

layout: docs
sidenav: true
title: Rotating Secrets IV - Concourse
---

## Introduction

We integrate and deliver cloud.gov with Concourse. Concourse is also
used for the [`18F/concourse-broker`](https://github.com/18F/concourse-broker)
and is called `tenant-concourse-*`.

### Working with the deployment

The deployment for Concourse is in the
[`cg-deploy-concourse`](https://github.com/18F/cg-deploy-concourse) repository.
You will need to update both the deployment pipelines for Concourse and the
Concourse Jumpboxes used to access the system.

### Dependencies

Rotating Concourse secrets has some external dependencies with [Bosh
secrets]({{ site.baseurl }}{% link _docs/ops/runbook/rotating-bosh.md %}) and [IAM
roles]({{ site.baseurl }}{% link _docs/ops/runbook/rotating-iam-users.md %}). Please complete
these rotations first, or reference them at the same time to properly rotate
Concourse credentials.

## Working with multiple Concourses

Concourse is running in multiple environments of cloud.gov. Take note the of the
Bosh targets in the `deploy-concourse` pipeline. Save it locally to a `./tmp`
directory.

```sh
fly --target ${ci_env} \
    get-pipeline \
    --pipeline deploy-concourse \
> tmp/deploy-concourse.pipeline.yml
```

Pull down the secrets files for each Concourse. Reference the [secret key
management documentation]({{ site.baseurl }}{% link _docs/ops/secrets.md %}) for downloading
and uploading those secrets.
