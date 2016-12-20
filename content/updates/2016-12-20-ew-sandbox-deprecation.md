+++
date = "2016-12-20"
title = "East/West Sandbox Deprecation Notice"
+++

The original cloud.gov in AWS East/West is now officially deprecated and will be retired soon. We will be in touch to assist with migration of Prototyping, FISMA Moderate, and FISMA Low organizations to the new environment shortly. 

Sandbox organizations will be retired as of December 31st. If you have hosted anything in a sandbox space that you would like to preserve, you must back it up or [migrate it to the new environment]({{< relref "docs/apps/govcloud.md" >}}) yourself.
<!--more-->
### Required steps

1. Create a GovCloud sandbox space
  - EPA, FDIC and GSA users log into [dashboard.fr.cloud.gov](https://dashboard.fr.cloud.gov).
  - All others please request an invitation by contacting cloud-gov-inquiries@gsa.gov.
1. Using the Cloud Foundry command line interface (CLI) `cf` run the command `cf login -a api.fr.cloud.gov --sso` and follow the instructions.
1. (Optional) [Migrate your application]({{< relref "docs/apps/govcloud.md" >}}).

### Background
We heard loud and clear that getting a FedRAMP Moderate JAB P-ATO for cloud.gov would be critical to ensuring cloud.gov could be used in production for most federal agencies. That required hosting on AWS GovCloud instead of AWS East/West so we have created a new and improved version of cloud.gov there. The new version of cloud.gov includes additional features that many have been asking for including: more reliable and faster SSH, better services, easy custom domains and IPv6 support. We are now opening access to this new environment for everyone. [Find out more about the changes and how you can get access]({{< relref "docs/apps/govcloud.md" >}}).
