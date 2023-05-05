---
title: Customer Responsibilities
permalink: /pages/documentation/customer-responsibilities/
layout: docs
navigation: pages
sidenav: pages-documentation
---


## Your Responsibilities

Using Pages places certain responsibilities on you as the government user of Pages. GSA has many internal sites running on Pages, but GSA cannot guarantee that Pages is compatable with your agency's specific policies.

Pages retains other responsibilities, clarified below. The intent of these policies is to empower you to use Pages to its full potential with awareness of your responsibilities when using advanced features.

#### You must use a GitHub account to work with Pages.

Pages is a service that leverages GitHub repositories for publishing. A Pages user with editing access to a repository must authorize the Pages application on their GitHub account **and** Pages must be approved by the parent organizations of repos that are hosted with Pages. We strongly recommend that users and organizations enable two factor authentication for their GitHub accounts.

GitHub is used across the government (see [this dashboard](https://gsa.github.io/github-federal-stats/) from our partners in GSA's Office of Government-wide Policy), and a majority of cabinet agencies have a GitHub presence. However, GSA does not endorse Github and there are other ways to launch sites if your agency is not prepared to use GitHub. At this time, no prospective Pages customer has been deterred by integration with GitHub.

#### You own your content

Pages provides templates for you to start with in configuring your sites, but is not responsible for editing or updating the content or local configuration of your site. The Pages team ensures that the publishing mechanism remains available to you so that your content edits can be published within minutes. Your content must be low impact according to [FIPS 199](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.199.pdf) and each branch on GitHub is published publicly by Pages. Pages is not suitable for hosting the following types of information:
- PII (Personally Identifiable Information)
- FOUO (For Official Use Only)
- CUI (Confidential Unclassified Information)
- Classified Information
- other content that otherwise requires authorization to view

Pages suggests that you add your point of contact to your repo with editing rights for troubleshooting purposes, but this is not required.

#### You own your code

You may wish to use Jekyll plugins, Google Analytics from GSA's [Digital Analytics Program](https://www.digitalgov.gov/services/dap/) using embedded Javascript, or other code on your site. Pages makes this possible - we use analytics extensively on our sites - but you are responsible for the security and stability of any custom code.

You are responsible for ensuring compliance with any and all additional federal regulations, including the [21st Century IDEA](https://digital.gov/resources/21st-century-integrated-digital-experience-act/).

#### You own your domain and DNS

Pages does not manage your domain name nor provide DNS services. To launch a site on Pages, you must configure the DNS for your domain to point to a domain provided by the Pages team (meaning, that visitors to that address will be pointed at Pages so they can load your site from us). Setting DNS for a new or existing domain may involve working with other offices at your agency; these processes typically vary.

If your domain is not an apex (e.g. 2nd level) domain, the process may be more challenging as some DNS providers do not support all required DNS record types. We recommend that you plan a solution before signing an agreement, please see [custom domains]({{site.baseurl}}/pages/documentation/custom-domains) for more details.

#### You must use a MAX.gov account to download the FedRAMP package.

MAX.gov is a suite of government service and resources. You will need a MAX.gov account to access the FedRAMP packgage. MAX.gov accounts are available to those with .gov or .mil email addresses. You will need to [register online for a MAX.gov account](https://portal.max.gov/portal/main/displayRegistrationForm) if you do not already have one. Please [contact MAX.gov](https://portal.max.gov/portal/contactUs) if you require support with this registration process.

##### SPF, DMARC, and MTA-STS records
GSA IT requires that your your URL's apex domain has appropriately set DMARC and SPF records in accordance with [BOD 18-01](https://cyber.dhs.gov/bod/18-01/).

_Expected DMARC record:_
>`v=DMARC1; p=reject; pct=100; fo=1; ri=86400; rua=mailto:dmarcreports@gsa.gov,mailto:reports@dmarc.cyber.dhs.gov; ruf=mailto:dmarcfailures@gsa.gov`

_Expected SPF record:_
>`v=spf1 -all`

SMTP MTA Strict Transport Security (MTA-STS) is a new standard that can enable domain names to opt into the strict transport layer security mode for email that requires public certificates and encryption. This standard may not be supported by all email providers but we encourage our customers to use this standard if possible when using the domain for email. See the standard ([RFC 3207](https://tools.ietf.org/html/rfc3207)).

_Expected MTA-STS record:_
>`_mta-sts.example.gov IN TXT "v=STSv1; id=<id-value>"`
>`_smtp._tls.example.gov IN TXT "v=TLSRPTv1; rua=reporting-email-address"`

Update `id-value` identifies the MTA-STS policy in use and `reporting-email-address` will be where you TLS reports will be sent. The `reporting-email-address` can be prefixed with `mailto:tls-reports@example.gov` or sent to a URL like an API endpoint.

## Pages' Responsibilities

#### We control access to the core Pages codebase.

Access to Pages' configuration tools for your specific content does not grant you access to Pages' "backend." Pages' code is open source, but only approved members of the Pages team are allowed to make or approve changes. No one can access Pages' management tools in [cloud.gov]({{ site.baseurl }}) without FedRAMP-approved two factor authentication.

#### We control access to the hosting service that serves your webpages

Pages moves content from your GitHub repositories into a secure build process and then into a file storage system that holds your site files. The credentials for the file storage system (Amazon S3 for those familiar) are secured within cloud.gov.

#### We maintain customer build logs for 180 days
In accordance with [cloud.gov's log retention policy]({{ site.baseurl }}/docs/deployment/logs/#web-based-logs-with-historic-log-data), we will store logs from customer builds for 180 days, after which they will no longer be available.
