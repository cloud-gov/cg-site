---
layout: post
date: "2025-02-04"
title: "V2 EOL Readiness Checklist"
excerpt: "Checklist for v2 end-of-life preparedness"
---

As we [announced in January]({{site.baseurl}}/news/2025/01/07/v2api-deprecation/), 
the Cloud.gov v2 API at
<https://api.fr.cloud.gov> will be discontinued in June, and
developers should ensure their deployment and app management
code is using the v3 API. The v3 API has been the preferred API since 2021
and already accounts for 98% of API calls, so it's likely you are already
set for this change.

This guide provides a quick [Readiness Checklist](#readiness-checklist) for this transition. Taking
the steps in the checklist will address most uses of the v2 API.

Note: **The code you run _in_ Cloud.gov most likely does _not_ need
updating.** Your applications at &lt;appname&gt;.app.cloud.gov will not
be impacted. The API change may impact how you:

* deploy your apps in Cloud.gov
* manage or monitor your apps in Cloud.gov

## Readiness Checklist

Going through this checklist will address most places where the v2 API may still be in use.

- [ ] Ensure you and your developers are using a [version of the CF CLI](#update-your-version-of-cf-cli), the Cloud Foundry command line interface (CLI), later than v7.7.1 or v8.7.1.
  - Check your version by running `cf version`.
  - If you need to upgrade, follow the [V8 CLI Installation Guide](https://github.com/cloudfoundry/cli/wiki/V8-CLI-Installation-Guide).
  - If approval processes will delay adopting a supported version, please notify [Support](mailto:support@cloud.gov)
- [ ] Ensure your deployment code, such as your CD pipeline, is using a supported [version of the CF CLI](#update-your-version-of-cf-cli) later than v7.7.1 or v8.7.1 (see above).
- [ ] Scan your application deployment code for the string '/v2'. If you find it, determine if it's a call to the v2 API, e.g. `cf curl /v2/....`.
  - [ ] As needed, update your code to use the `/v3/` equivalents, per the [v3 upgrade guide](https://v3-apidocs.cloudfoundry.org/index.html#upgrade-guide).
- [ ] If you use Terraform, ensure you're using [v3 CloudFoundry Terraform provider](https://github.com/cloudfoundry/terraform-provider-cloudfoundry).
  - The [community-supported Terraform provider](https://registry.terraform.io/providers/cloudfoundry-community/cloudfoundry/latest) is not v3-compatible.
  - The CloudFoundry Terraform maintainers have a [migration guide](https://github.com/cloudfoundry/terraform-provider-cloudfoundry/blob/main/migration-guide/Readme.md) for adopting the v3-compatible provider.
- [ ] If you use the [cf-python-client](https://github.com/cloudfoundry-community/cf-python-client/), update to [version v1.38.2 or higher](https://github.com/cloudfoundry-community/cf-python-client/releases).
- [ ] If you use the [go-cfclient](https://github.com/cloudfoundry/go-cfclient), ensure you're using a [version 3.0.0.alpha release](https://github.com/cloudfoundry/go-cfclient/releases).

## Next steps

The Cloud.gov team will monitor use of the v2 API, and provide further guidance in the weeks ahead. As use declines, we should be able to identify specific programs using the v2 API and then notify them. If necessary, we may announce "brownouts" when we block access to the v2 API for short periods so teams can test their deployments and processes. Brownouts WILL NOT impact application availability.

As always, the [Support Team](mailto:support@cloud.gov) is ready to assist you with your questions.


