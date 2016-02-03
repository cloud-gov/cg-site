---
menu:
  main:
    parent: operations
title: Code Review
---

This document describes how the 18F cloud.gov team has agreed to work together
with regard to Git, Github and facilitating changes to the repositories they administer.

## Workflow

The most common workflow is:

1. A change is initiatied and discussed via a [Trello card](https://trello.com/b/ChGzyepo/paas-dev).
1. A Pull Request (PR) is created on Github.
1. The PR is reviewed by someone other than the committer. Pairing via screen-sharing
is encouraged and qualifies as a review.
1. The reviewer merges the PR.

## Forking vs Branching

The team prefers forking.

The master branch on the canonical repository is what gets deployed to production.
If there is a staging environment available for a given repository, the PR should be
created against the staging branch. Otherwise, the PR should be created against the master
branch on the canonical repository.

The rationale for preferring forking is that all contributors work the same way,
regardless of whether or not they may commit directly to the canonical repository.

## Squashing commits

[Squashing commits](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History#Squashing-Commits)
is allowed but discouraged, except in rare instances.

## Rebase or Merge

The team prefers [rebasing over merging](https://www.atlassian.com/git/tutorials/merging-vs-rebasing/).

## When should a PR be created?

Work-in-progress PRs are allowed. When a PR is ready for review, it should be tagged in Github
with the `review-needed` label. If you create a work-in-progress PR, you might also make it plain
in the PR name with a `[WIP]` prefix.

## Should PRs be assigned?

PRs are typically not assigned in Github, unless someone specifically needs to sign off on the change.
Mentioning someone in the PR with the `@` notation and/or contacting them outside the Github
context to request a review is preferred.

## When reviewing a PR, should the change be tested locally?

Whenever possible, the proposed changes should be tested locally. Because of the nature of many of
the cloud.gov repositories and deployment environments, local testing is not always possible
or practical. Visual code review, however, is always required.
