---
menu:
  docs:
    parent: policies
layout: ops
title: Configuration management
---

<!-- This page is important for FedRAMP compliance. See the CM family of controls, including CM-9. Code Climate is part of SA-11 (1), SI-3, and RA-5. -->

This document describes how the cloud.gov team approaches configuration management of the core platform. Before configuration changes go into production, they need to pass our [significant change rubric]({{< relref "docs/ops/continuous-monitoring.md#appendix-significant-change-rubric" >}}), as described in our [Feature Lifecycle](https://github.com/18F/cg-product/blob/master/FeatureLifecycle.md) and [Story Lifecycle](https://github.com/18F/cg-product/blob/master/StoryLifecycle.md).

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
If possible, first test the changes locally. After that, upload them to a development environment where either manual or automated testing needs to be run.
Security tests need to be executed in the development environment where changes are applied.

## Change workflow

1. All configuration changes must flow through a git repository, centrally managed through GitHub, unless they contain sensitive information. In these cases, sensitive information should be stored in an S3 bucket with a proper security policy and encryption, versioned such that changes can be easily rolled back.
1. A change is initiated and discussed, following the steps in our [Story Lifecycle](https://github.com/18F/cg-product/blob/master/StoryLifecycle.md).
1. In the appropriate GitHub repository for the component, a pull request (PR) against the `master` branch is created that addresses the change.
1. If the repository contains 18F-developed code, the PR must have an automated [Code Climate](https://codeclimate.com) check, which must pass before the PR can be merged.
1. The PR is reviewed by someone other than the committer. Pairing via screen-sharing
is encouraged and qualifies as a review. Review should include assessment of architectural design, DRY principles, security and code quality.
    The reviewer approves the PR via GitHub.
1. The reviewer merges the approved PR.
    The committer may merge an approved PR if the changes made are time-sensitive.
1. A continuous integration (CI) server handles automated tests and continuous deployment (CD) of the merged changes.
    - All changes are deployed to a testing environment, such as development.
    - Any and all automated tests are run.
    - If all tests pass, changes can be promoted for deployment to production in the pipeline.

1. The CI/CD tool uses GitHub repositories and S3-stored sensitive content as the canonical source of truth for what the platform should look like. If there are manual changes, it will reset the state of all systems to match.

![Pipeline Example](/img/pipeline-example.png)

A more detailed example of this process can be seen in [Updating Cloud Foundry]({{< relref "updating-cf.md" >}}).

## What if a configuration changed and it is not in Configuration Management?
If possible, Configuration Management tools need to be set up to always roll back to a known state. Other than that, these tools need to be able to "recreate" all settings from the known configurations.

## GitHub contribution guidelines

<!-- As long as these GitHub guidelines comply with the FedRAMP-required policies above and our 18F GitHub requirements, we can adjust them at will, according to our team preferences. -->

Because cloud.gov is built and maintained by 18F, we follow [the 18F requirements for using GitHub](https://handbook.18f.gov/github/). These are our team practices within those requirements.

### Forking vs. branching

Both forking and branching are welcome in our repositories. Contributors inside 18F can use forking or branching according to their personal preferences, and contributors outside 18F can fork repositories.

The team often practices branching. The rationale for branching within a team is
that paired collaboration on a single branch avoids certain types of friction:

- Having to create multiple forked PRs in order to contribute to the branch
- Having to add new users to forked repositories as collaborators in order to
  have people directly contribute on short-lived forked branches

When contributing directly on a branch, we're able to modify work-in-progress (WIP) pull requests and encourage collaboration across the Cloud Operations team.

### Squashing commits

[Squashing commits](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History#Squashing-Commits) is allowed but discouraged, except in rare instances.

### Rebase or merge

The team prefers [rebasing over merging](https://www.atlassian.com/git/tutorials/merging-vs-rebasing/).

### When should a PR be created?

Work-in-progress PRs are encouraged. When a PR is ready for review, it should be tagged in GitHub
with the `review-needed` label. If you create a work-in-progress PR, you might also make it plain in the PR name with a `[WIP]` prefix.

### Should PRs be assigned?

PRs are typically not assigned in GitHub, unless someone specifically needs to sign off on the change.

You can request a review using GitHub's built-in tools, mention someone in the PR with the `@` notation, or contact them outside the GitHub context to request a review.

### When reviewing a PR, should the change be tested locally?

Whenever possible, the proposed changes should be tested locally. Because of the nature of many of the cloud.gov repositories and deployment environments, local testing is not always possible or practical. Visual code review, however, is always required.
