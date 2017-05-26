---
menu:
  docs:
    parent: runbook

title: Rotating Secrets - Bosh
---

### Introduction

Rotating Bosh secrets are pretty straight forward and should be done first.
There are known limitations of the Bosh agent when updating the main Bosh
password for each deployment. Deployments of Bosh should be done serially due to
the dependencies of where these Bosh directors are being deployed to. Please
reference the
