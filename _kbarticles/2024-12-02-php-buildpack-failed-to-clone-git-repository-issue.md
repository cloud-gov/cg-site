---
layout: post
title: "PHP buildpack failed to clone git repository issue"
date: December 02, 2024
excerpt: How to resolve the PHP buildpack failed to clone git repository issue
---

On December 2nd, 2024 it was brought to our attention that Cloud.gov customers attempting to push or restage applications using PHP buildpack versions 4.6.24 and above were experiencing a “Failed to clone git repository at https://github.com/cloudfoundry/php-buildpack” error.

The reason why this issue is occurring is because the recently updated buildpack versions are trying to clone some git submodules over SSH instead of HTTPS. Cloud.gov supports HTTPS egress for buildpacks during staging, not SSH, as such the buildpack is unable to be fetched and the staging process fails. An [issue](https://github.com/cloudfoundry/php-buildpack/issues/1110) with the PHP buildpack has already been posted to the CloudFoundry GitHub.

The solution to this issue is pin the version of the buildpack that you are using with your application to version 4.6.23 or a prior version.

To pin the buildpack version, specify the buildpack version URL in your application manifest under the `buildpacks:` attribute as shown below.

```yaml
buildpacks:
- https://github.com/cloudfoundry/php-buildpack#v4.6.23
```

If you encounter any difficulties deploying this solution or have any questions, please contact
[{{site.support_email_address}}]({{site.support_email}}) and we would be happy to assist you.
