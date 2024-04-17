---
parent: technology
layout: docs
sidenav: true
title: Infrastructure under Cloud.gov
weight: 20
redirect_from:
  - /docs/intro/technology/iaas
  - /intro/technology/iaas
  - /overview/technology/iaas
---

## The infrastructure underlying Cloud.gov

Cloud.gov runs on top of Infrastructure as a Service provided by Amazon Web Services (AWS) in the [AWS GovCloud partition](https://aws.amazon.com/govcloud-us/) (specifically within the us-gov-west-1 region), which has a [FedRAMP JAB P-ATO at the High impact level](https://marketplace.fedramp.gov/index.html#/product/aws-govcloud-high). GovCloud also offers support for other formal compliance needs such as [ITAR compliance](https://en.wikipedia.org/wiki/International_Traffic_in_Arms_Regulations).

## Services in our marketplace

Cloud.gov brokers instances of:

- FedRAMP JAB-authorized services available in AWS GovCloud and
- Services run directly inside Cloud.gov (which benefit from our own FedRAMP JAB authorization)

In principle, Cloud.gov can broker any service provider for which there is an implementation of the [Open Service Broker API](https://www.openservicebrokerapi.org/). For more information, see our docs on [extending the marketplace]({{ site.baseurl }}{% link _docs/services/intro.md %}#extending-the-marketplace).

## Other IaaS vendors we can support

Cloud.gov is a Platform as a Service (PaaS), which offers an additional level of services and functions beyond the basics offered by an Infrastructure as a Service (IaaS) provider. We built Cloud.gov based on the [Cloud Foundry open source project](https://www.cloudfoundry.org/), which was designed to be compatible with multiple IaaS providers. For that reason, it would be possible to provide Cloud.gov services using Google Cloud Platform, Microsoft Azure, or any public, commercial, or private OpenStack instance in the future.

## If you’re an IaaS vendor interested in offering your solution to Cloud.gov users

We recommend examining the [BOSH Cloud Provider Interface (CPI) documentation](https://bosh.io/docs/bosh-components/#cpi). Provide a CPI which makes it possible for BOSH to manipulate your cloud. This will enable Cloud.gov (or any other PaaS based on Cloud Foundry) to offer alternative API endpoints corresponding to different IaaS providers with little effort. Cloud.gov will deploy on new IaaS providers and expose those as new API endpoints as warranted by agency demand.
