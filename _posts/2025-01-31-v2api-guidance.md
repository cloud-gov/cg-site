---
layout: post
date: "2025-01-07"
title: "Developer guidance for API v2 EOL"
excerpt: "Checklist for v2 end-of-life preparedness"
---

## 

As we announced earlier in January, the Cloud.gov API v2 at 
<https://api.fr.cloud.gov> will be discontinued in June, and 
developers should ensure their deployment and app management
code is using the v3 API, which has been the preferred API since 2021.

This guide provides a quick Readiness Checklist for this transition.

**The code you run _in_ Cloud.gov most likely does _not_ need
updating.** Your applications at <appname>.app.cloud.gov will not
be impacted. The API change may impact how you:

* deploy your apps in Cloud.gov
* manage or monitor your apps in Cloud.gov

## Readiness Checklist

- [ ] Ensure you and your developers are using a [recent version of CF CLI](#update-your-version-of-cf-cli) -- the Cloud Foundry command line interface (CLI).
- [ ] Ensure your deployment code, such as your CD pipeline, is using a [recent version of CF CLI](#update-your-version-of-cf-cli).
- [ ] Scan your application deployment code for the string '/v2'. If you find it, determine if it's a call to the v2 API, e.g. `cf curl /v2/....`.
  - [ ] As needed, update your code to use the `/v3/` equivalents. Contact [SupportTKTK] if you're not sure how to do this.
- [ ] If you use Terraform, ensure you're using [v3 CloudFoundry Terraform provider](https://github.com/cloudfoundry/terraform-provider-cloudfoundry)
- [ ] If you use the [cf-python-client](https://github.com/cloudfoundry-community/cf-python-client/), update to version v1.38.2 or higher, and test your code.
- [ ] If you use the [go-cfclient](https://github.com/cloudfoundry/go-cfclient), ensure you're using a version 



'
## Update your version of CF CLI

1. Check your version of version 


