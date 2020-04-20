---
layout: post
date: "2016-12-21"
title: "East/West Sandbox Deprecation Notice"
redirect_from:
  - /updates/2016-12-20-ew-sandbox-deprecation/
---

Update: since the time of this posting, we have postponed the cutoff date from January 15th to a new date that we expect to confirm and announce soon. 

The original cloud.gov environment in AWS East/West is now officially deprecated and will be retired. We will be in touch to assist with migration of Prototyping, FISMA Moderate, and FISMA Low organizations to the new environment shortly.

Sandbox organizations in AWS East/West will be retired as of January 15. We will be deleting these sandbox organizations after this date. If you have hosted anything in a sandbox space that you would like to preserve, you must back it up or migrate it to the new environment yourself.
<!--more-->
### Required steps

1. Create a GovCloud sandbox space.
  - EPA, FDIC and GSA users log into [dashboard.fr.cloud.gov](https://dashboard.fr.cloud.gov).
  - All others please request an invitation by contacting [inquiries@cloud.gov](mailto:inquiries@cloud.gov).
1. Using the Cloud Foundry command line interface (CLI) `cf` run the command `cf login -a api.fr.cloud.gov --sso` and follow the instructions.
1. (Optional) Migrate your application.

### Background
We heard loud and clear that a FedRAMP Moderate JAB P-ATO for cloud.gov would be critical to ensuring cloud.gov could be used in production for most federal agencies. Getting that ATO required hosting on AWS GovCloud instead of AWS East/West so we have created a new and improved version of cloud.gov there. We anticipate receiving JAB P-ATO for cloud.gov in January, 2017. The new version of cloud.gov includes additional features that many have asked for, including: more reliable and faster SSH, better services, easy custom domains and IPv6 support. We are now opening access to this new environment to everyone.