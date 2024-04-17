---
parent: pricing
layout: docs
sidenav: true
title: Quota costs, billing, and limits
weight: 5
redirect_from:
  - /docs/intro/pricing/quotas
  - /intro/pricing/quotas
  - /overview/pricing/quotas

---

Cloud.gov usage is billed by org memory quota.

## Costs

The cost is $130 per GB of memory reserved per month, with no limit except the quota you set.

You set your memory quota **in advance**. This helps you control the maximum amount that your team will spend, and helps us avoid over-provisioning resources that won’t be used.

([Sandboxes]({{ site.baseurl }}{% link _docs/pricing/free-limited-sandbox.md %}) offer resource usage for free, but it is capped at 1 GB of RAM.)

## Billing

Quotas are associated with and billed to a project IAA number or equivalent billing tag. Quotas are billed by the amount of memory reserved and tallied monthly. 
## What quotas limit

Quotas provide a not-to-exceed reservation of memory, which you set at the amount appropriate to your usage. In the underlying technical system, quotas also limit number of application routes and service instances, but you can request an expansion of those limits at any time.

Quotas limit the following resources:  

- Number of [application routes]({{ site.baseurl }}{% link _docs/management/custom-domains.md %})
- Amount of application memory
- Number of [service instances]({{ site.baseurl }}{% link _docs/deployment/managed-services.md %})

If a new application `push` would exceed your organization's quota, the request will fail with status code `400` and a message that describes the limit that would be exceeded.

**Example:**

  Creating app APPLICATION in org ORG / space SPACE as USER...
  FAILED
  Server error, status code: 400, error code: 100007, message: You have exceeded the instance memory limit for your organization's quota.

In this situation you have three options:

1. Delete existing resources with `cf delete`, `delete-service`, `delete-route` or similar.
2. Reconfigure individual existing [application quotas]({{ site.baseurl }}{% link _docs/management/limits.md %}#app) and redeploy.
3. Request a quota change by [asking support]({{ site.baseurl }}/docs/help/). You can request an increase in number of routes or service instances with no cost impact. Increasing memory quota changes your costs (as described above).
