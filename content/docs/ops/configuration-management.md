---
menu:
  docs:
    parent: operations
title: Configuration management
---

<!-- This page is important for FedRAMP compliance. See the CM family of controls, including CM-9. Code Climate is part of SA-11 (1), SI-3, and RA-5. -->

This document describes how the 18F cloud.gov team approaches configuration management of the core platform.

## What goes into configuration management?
In short, everything needed to run and operate the platform that is not a _secret_. (See [Secret Key Management]({{< relref "docs/ops/secrets.md" >}}) for that.)

Here are some examples that should be in configuration management:

- CI pipelines (Concourse)
- Infrastructure/network configuration (Terraform)
- VM setup and quantity (BOSH)
- Software configuration (BOSH)
- 18F-developed code

## Where should all this configuration go?
All configuration must be stored in GitHub using the following "Change Workflow" unless it is a _secret_.

## How do we test these changes?
If possible, first test the changes locally. After that, upload them to a staging environment where either manual or automated testing needs to be run.
Security tests need to be executed in the staging environment where changes are applied.

## Change workflow

1. All configuration changes must flow through a git repository, centrally managed through GitHub, unless they contain sensitive information. In these cases, sensitive information should be stored in an S3 bucket with a proper security policy, encryption, and versioned, so that changes can be easily rolled back.
1. A change is initiated and discussed as a GitHub issue in [the relevant 18F repository](https://github.com/18F).
1. A Pull Request (PR) is created that addresses the change and references the created issue.
    If there is a staging environment available for a given repository, the PR should be
    created against the `staging` branch. Otherwise, the PR should be created against the `master` branch on the canonical repository.
1. If the repository contains 18F-developed code, the PR must have an automated Code Climate check, which must pass before the PR can be merged.
1. The PR is reviewed by someone other than the committer. Pairing via screen-sharing
is encouraged and qualifies as a review. Review should include architectural design, DRY principles, security and code quality.
1. The reviewer merges the PR.
1. A continuous integration (CI) server handles automated tests and continuous deployment (CD) of the merged changes.
    - All changes are deployed to a testing environment, such as staging.
    - Any and all automated tests are run.
    - If all tests pass, changes can be promoted for deployment to production in the pipeline.

1. The CI/CD tool uses GitHub repositories and S3 stored sensitive content as the canonical source of truth for what the platform should look like, and it will reset the state of all systems to match in the case of any manual changes.

![Pipeline Example](/img/pipeline-example.png)

A more detailed example of this process can be seen in [Updating Cloud Foundry]({{< relref "updating-cf.md" >}}).

## What if a configuration changed and it is not in Configuration Management?
If possible, Configuration Management tools need to be set up to always roll back to a known state. Other than that, these tools need to be able to "recreate" all settings from the known configurations.

## GitHub contribution guidelines
### Forking vs. branching

The team prefers forking.

The rationale for preferring forking is that all contributors work the same way,
regardless of whether or not they may commit directly to the canonical repository, such as the case of contractors that may work on the platform.

### Squashing commits

[Squashing commits](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History#Squashing-Commits) is allowed but discouraged, except in rare instances.

### Rebase or merge

The team prefers [rebasing over merging](https://www.atlassian.com/git/tutorials/merging-vs-rebasing/).

### When should a PR be created?

Work-in-progress PRs are allowed. When a PR is ready for review, it should be tagged in GitHub
with the `review-needed` label. If you create a work-in-progress PR, you might also make it plain in the PR name with a `[WIP]` prefix.

### Should PRs be assigned?

PRs are typically not assigned in GitHub, unless someone specifically needs to sign off on the change.
Mentioning someone in the PR with the `@` notation and/or contacting them outside the GitHub
context to request a review is preferred.

### When reviewing a PR, should the change be tested locally?

Whenever possible, the proposed changes should be tested locally. Because of the nature of many of the cloud.gov repositories and deployment environments, local testing is not always possible or practical. Visual code review, however, is always required.
