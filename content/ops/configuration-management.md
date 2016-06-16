---
menu:
  main:
    parent: operations
title: Configuration Management
---
# Configuration Management Process
This document describes how the 18F cloud.gov team approaches configuration management of the core platform.

## Change Workflow

1. All configuration changes must flow through a git repository, centrally managed through GitHub.
1. A change is initiatied and discussed as a [GitHub issue in 18F/cg-atlas repository](https://GitHub.com/18F/cg-atlas/issues).
2. A Pull Request (PR) is created that addresses the change and references the created issue.
    If there is a staging environment available for a given repository, the PR should be
    created against the `staging` branch. Otherwise, the PR should be created against the `master` branch on the canonical repository.
3. The PR is reviewed by someone other than the committer. Pairing via screen-sharing
is encouraged and qualifies as a review. Review should include architectural design, DRY principles, security and code quality.
4. The reviewer merges the PR.
5. A continuous integration server handles automated tests and deployment of the merged changes
    * All changes are deployed to a testing environment, such as staging
    * Any and all automated tests are run
    * If all tests pass, changes can be promoted for deployment to production in the pipeline.
![Pipeline Example](/img/pipeline-example.png)

A more detailed example of this process can be seen in [Updating Cloud Foundry]({{< relref "updating-cf.md" >}})

## GitHub Contribution Guidelines
### Forking vs Branching

The team prefers forking.

The rationale for preferring forking is that all contributors work the same way,
regardless of whether or not they may commit directly to the canonical repository, such as the case of contractors that may work on the platform.

### Squashing commits

[Squashing commits](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History#Squashing-Commits) is allowed but discouraged, except in rare instances.

### Rebase or Merge

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
