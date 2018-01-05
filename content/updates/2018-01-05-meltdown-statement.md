+++
date = "2018-01-05"
title = "cloud.gov Updates for the  Meltdown/Spectre Vulnerabilities"
+++

cloud.gov is tracking the recent public disclosure of vulnerabilities in modern CPUs, dubbed the [Meltdown](https://meltdownattack.com) 
and [Spectre](https://spectreattack.com) attacks ([CVE-2017-5715](http://www.cve.mitre.org/cgi-bin/cvename.cgi?name=2017-5715), 
[CVE-2017-5753](http://www.cve.mitre.org/cgi-bin/cvename.cgi?name=2017-5753), and 
[CVE-2017-5754](http://www.cve.mitre.org/cgi-bin/cvename.cgi?name=2017-5754)). 
We are taking all available steps to mitigate the impact of these vulnerabilities.

Our cloud service provider, AWS GovCloud, [has already updated their systems](https://aws.amazon.com/security/security-bulletins/AWS-2018-013/) so that cloud.gov systems are not susceptible to Meltdown attacks from other tenants in AWS GovCloud.

We are awaiting an upstream release of Cloud Foundry stemcells (based on Ubuntu) so we can patch all cloud.gov systems to prevent Meltdown exploits of tenants within cloud.gov. Since the vulnerabilities were disclosed before the coordinated release date of 2017-01-09, that [update is not yet available](https://wiki.ubuntu.com/SecurityTeam/KnowledgeBase/SpectreAndMeltdown) and the [Ubuntu team is pressing to release](http://blog.dustinkirkland.com/2018/01/ubuntu-updates-for-meltdown-spectre.html) as soon as they can. The [Cloud Foundry team should release their stemcell within 24 hours](https://www.cloudfoundry.org/meltdown-spectre-attacks/) after that, and at that point we will begin updating our cloud.gov systems.

At this point we expect to have cloud.gov updates complete on or before the public release of proof-of-concept Meltdown exploit code on 01-09. A [stemcell update is part of routine maintenance]({{< relref "docs/getting-started/app-maintenance.md#operating-system-patching" >}}) and will not require any action on the part of our customers.

There is no immediate remedy for the Spectre class of attacks, neither for cloud.gov or any cloud service provider. End users must [upgrade their OS and browsers](https://www.kb.cert.org/vuls/id/584653) to protect from all websites on the entire internet.

We will add updates to this statement as the release process progresses. If you have questions, you can email us at [cloud-gov-support@gsa.gov](mailto:cloud-gov-support@gsa.gov).

Released: 2017-01-05
Updates: 


