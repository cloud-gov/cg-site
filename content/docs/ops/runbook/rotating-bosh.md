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


Enumerate dependencies in CF pipelines. These pipelines should be paused before rotating BOSH secrets, 
as they will fail until corresponding values have been rotated in each of their secrets files.
```bash
https://github.com/search?l=YAML&q=user%3A18F+BOSH_TARGET&type=Code&utf8=%E2%9C%93
https://github.com/search?l=YAML&q=user%3A18F+BOSH_ENVIRONMENT&type=Code&utf8=%E2%9C%93
```

