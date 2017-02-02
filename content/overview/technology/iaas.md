---
menu:
  overview:
    parent: technology
title: cloud.gov and IaaS options
weight: 20
aliases:
  - /docs/intro/technology/iaas
  - /intro/technology/iaas
---

## The IaaS underlying cloud.gov

Currently cloud.gov runs on top of Infrastructure as a Service provided by Amazon Web Services (AWS) regions located within the continental United States (US-East and US-West). We are transitioning cloud.gov to the [AWS GovCloud region](https://aws.amazon.com/govcloud-us/), which offers support for formal compliance needs such as [ITAR compliance](https://en.wikipedia.org/wiki/International_Traffic_in_Arms_Regulations). In most cases, new tenants will be placed in the AWS GovCloud environment.

## Other IaaS vendors we can support

cloud.gov is a Platform as a Service (PaaS), which offers an additional level of services and functions beyond the basics offered by an Infrastructure as a Service (IaaS) provider. We built cloud.gov based on the [Cloud Foundry open source project](https://www.cloudfoundry.org/), which was designed to be compatible with multiple IaaS providers. For that reason, it would be possible to provide cloud.gov services using Google Compute Engine, Microsoft Azure, or any public, commercial, or private OpenStack instance in the future.

## As an IaaS vendor, how do I offer my solution to cloud.gov users?

We would recommend examining the [mega-ci project](https://github.com/cloudfoundry/mega-ci) and the [BOSH CPI documentation](https://bosh.io/docs/cpi-api-v1.html). Provide a similar option which makes it easy to continuously deploy Cloud Foundry components on their cloud. This will enable cloud.gov (or any other PaaS based on Cloud Foundry) to offer alternative API endpoints corresponding to different IaaS providers with little effort. cloud.gov will deploy on new IaaS providers and expose those as new API endpoints as warranted by agency demand.
