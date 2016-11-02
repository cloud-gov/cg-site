---
menu:
  overview:
    parent: technology
title: Other PaaS choices
weight: 30
aliases:
  - /docs/intro/technology/paas-options
  - /intro/technology/paas-options
---

## Open source

18F uses and contributes to open source solutions whenever possible. We didn’t build cloud.gov from scratch; the hard work was done in the [open source Cloud Foundry project](https://github.com/cloudfoundry), which is open to anyone, including vendors in the PaaS space.

By using Cloud Foundry and making cloud.gov available as open source, we’re raising the “lowest common denominator” capabilities that agencies should expect from any PaaS vendor, while enabling greater competition.

## Commercial alternatives

Commercial vendors can provide managed services and support/consulting options that are beyond 18F’s capabilities due to our funding or staffing. An open source PaaS built specifically for the needs of federal agencies can decrease the likelihood of vendor lock-in to services that don’t add value, while broadening the market for vendors who have value-adding capabilities that we do not. Because everything we do is open source, including our deployment, any vendor or agency can follow our path and provide value-adding alternatives based on specific agency needs.

### Cloud Foundry vendors

Cloud Foundry maintains a [list of certified commercial vendors](https://www.cloudfoundry.org/learn/certified-providers/). The common use of the Cloud Foundry API provides easy mobility from cloud.gov to commercial vendors’ services for government-developed applications as warranted, or vice-versa.

### Non-Cloud Foundry vendors

PaaS vendors who are not using Cloud Foundry will also benefit from cloud.gov’s existence. Our service will increase the migration of government applications to a [12-factor architecture](http://12factor.net/), making PaaS and similar products more usable for government digital products. 12-factor applications have very little dependency on the exact platform that is supporting them, so they can be ported from cloud.gov to non-Cloud Foundry solutions more easily than applications designed for a straight IaaS model.

Because cloud.gov is open source, vendors of non-Cloud Foundry systems have open access to how it works. They can provide easy on-ramp solutions to migrate government applications to their platform, or innovate on top of what we’re doing.
