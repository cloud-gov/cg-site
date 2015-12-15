---
menu:
  main:
    parent: technology
title: cloud.gov and IaaS options
weight: 20
---

## The IaaS underlying cloud.gov

Currently our services are provided by Amazon Web Services (AWS) regions located within the continental United States (US-East and US-West).

cloud.gov is not yet available on the AWS GovCloud. If you need a PaaS with the formal [ITAR compliance](https://en.wikipedia.org/wiki/International_Traffic_in_Arms_Regulations) AWS GovCloud would provide, please let us know so we can evaluate our roadmap.

## Other IaaS vendors we can support

A platform-as-a-service (PaaS) abstracts many of the functions associated with infrastructure-as-a-service (IaaS). We based cloud.gov on Cloud Foundry, which provides a high-level abstraction which enables mobility across IaaS providers. For that reason, it would be possible to provide cloud.gov services using Google Compute Engine, Microsoft Azure, or any public, commercial, or private OpenStack instance in the future.

## As an IaaS vendor, how do I offer my solution to cloud.gov users?

We would recommend examining the [mega-ci project](https://github.com/cloudfoundry/mega-ci) and the [BOSH CPI documentation](https://bosh.io/docs/cpi-api-v1.html). Provide a similar option which makes it easy to continuously deploy Cloud Foundry components on their cloud. This will enable cloud.gov (or any other PaaS based on Cloud Foundry) to offer alternative API endpoints corresponding to different IaaS providers with little effort. If it turns out many cloud.gov tenants ask for that, we could then support it.
