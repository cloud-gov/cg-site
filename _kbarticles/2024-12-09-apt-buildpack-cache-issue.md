---
layout: post
title: "Apt buildpack cache issue"
date: December 9, 2024
excerpt: Apt buildpack cache issue that can affect application deployment
---

### What does the buildpack cache do?

The buildpack cache (aka "app cache," or "build artifacts cache") is a per-application cache that is stored in the blob (binary large object) store and recovered when an existing application is restaged (regardless of application code or buildpack changes).

Different buildpacks use this cache for different things. [System buildpacks]({% link _docs/deployment/frameworks.md %}#supported-languages-and-frameworks) are cached on the VM hosting the application container and then mounted as read-only volumes into each staging container. If your application references a custom buildpack or buildpack version via a URLs (to a git repo or a zip file), those buildpacks are downloaded every time application staging occurs.

### Potential cache issue with apt-buildpack 

The potential issue with the `apt-buildpack` cache involves the `/` directory disk allocation. The `apt-buildpack` uses `/tmp` for its cache like other buildpacks. In all buildpacks, the `/` directory is allocated approximately 9% of the disk allocation, meaning that the size of the `/tmp` subdirectory cannot exceed that disk allocation. For most buildpacks, this disk allocation is sufficient as all the possible packages that they could be installing is known with the only variable being the application code. However, the `apt-buildpack` can install an unknown number of packages of variable size, such as the AWS CLI. Depending on how many packages are installed and their individual size, the allotted 9% of disk space may not be sufficient, causing application staging to fail.

```shell
stdout: No space left on device. /usr/bin/tar: /tmp/output-cache: Wrote only 2048 of 10240 bytes
```

### How to address the issue

If the number of packages that you are installing during staging is within the allotted 9% of the disk limit (2 GB default) you can attempt to resolve the issue by clearing the buildpack cache and attempting to push your application again. Please refer to the commands below to clear your buildpack cache.

```shell
app_guid=$(cf app --guid <staging-app-name>)
cf curl /v3/apps/${app_guid}/actions/clear_buildpack_cache
```

You can additionally configure the apt buildpack cache to purge any cached content by setting `cleancache` to true which calls `apt-get clean` and `apt-get autoclean` and is useful to remove any cached content per the apt buildpack [documentation](https://github.com/cloudfoundry/apt-buildpack?tab=readme-ov-file#cloud-foundry-experimental-apt-buildpack).

If you encounter any difficulties deploying this solution or have any questions, please contact
[{{site.support_email_address}}]({{site.support_email}}) and we would be happy to assist you.
