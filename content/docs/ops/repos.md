---
menu:
  docs:
    parent: ops
title: Code repositories
weight: -100
aliases:
  - /docs/intro/security/auditing-contributing-security
  - /intro/security/auditing-contributing-security
---

cloud.gov is built and maintained by 18F, which has an [open source policy](https://18f.gsa.gov/open-source-policy/) that guides our work: we use and develop open source software, and we encourage you to reuse and adapt our work.

cloud.gov is an open source project based on [Cloud Foundry](https://www.cloudfoundry.org/) with additional components built by our team and other community members. We welcome you to audit our security or contribute to it — or to make any other kind of contribution, from documentation to design.

If you'd like to contribute security research, see our [vulnerability disclosure policy](https://18f.gsa.gov/vulnerability-disclosure-policy/).

If you're interested in contributing to cloud.gov but not sure where to start, or if you have questions about contributing, feel free to join the [18F DevOps or open source chat channels](https://chat.18f.gov/) and explain your question. You can also open an issue with your question in a relevant repository.

To contribute to these repositories, you'll need to use [a GitHub account](https://help.github.com/articles/signing-up-for-a-new-github-account/), which is free to open and use. If you're part of the federal government, many agencies have approved use of public repository services such as GitHub ([some examples here](https://18f.gsa.gov/2016/08/08/facts-about-publishing-open-source-code-in-government/)).

## Repositories

Here are many of our main repositories with components, tools, and configuration for the platform. This isn't a complete or fully up-to-date list; we intend to continuously update it, but sometimes we fall behind a bit. You can [find more cloud.gov repositories on GitHub](https://github.com/search?utf8=%E2%9C%93&q=user%3A18F+%28cf+OR+cg+OR+%22cloud+foundry%22+OR+cloud.gov%29+NOT+cfn+fork%3Atrue&type=Repositories&ref=advsearch&l=&l=).

Components run as applications on top of the platform, for users:

- [cloud.gov website (this site)](https://github.com/18F/cg-site)
- [Dashboard](https://github.com/18F/cg-dashboard)
- [Styles](https://github.com/18F/cg-style) (a library supporting the website and dashboard)

Components run as applications on top of the platform, for our team:

- [Compliance documentation (draft)](https://github.com/18F/cg-compliance) ([accompanying deployment pipeline](https://github.com/18F/cg-deploy-compliance-documentation))
- [Compliance documentation system diagrams](https://github.com/18F/cg-diagrams)
- [Quota database](https://github.com/18F/cg-quotas-db)

Custom components for our Cloud Foundry deployment:

- [User Account and Authentication (UAA) Server](https://github.com/18F/cg-uaa)
- [UAA extra features](https://github.com/18F/cg-uaa-extras)
- [Sandbox creation bot](https://github.com/18F/cg-sandbox-bot)
- [CF-SSH](https://github.com/18F/cf-ssh)
- [InfluxDB firehose nozzle](https://github.com/18F/influxdb-firehose-nozzle)

BOSH releases:

- [awslogs](https://github.com/18F/cg-awslogs-boshrelease)
- [ClamAV](https://github.com/18F/cg-clamav-boshrelease)
- [Cloud Foundry](https://github.com/18F/cg-cf-release)
- [collectd](https://github.com/18F/cg-collectd-boshrelease)
- [Encrypt S3 blobstores](https://github.com/18F/cg-encrypt-blobstore-boshrelease)
- [Grafana](https://github.com/18F/cg-grafana-boshrelease)
- [InfluxDB](https://github.com/18F/cg-influxdb-boshrelease)
- [Nessus Agent](https://github.com/18F/cg-nessus-agent-boshrelease)
- [Nessus Manager](https://github.com/18F/cg-nessus-manager-boshrelease)
- [New Relic #1](https://github.com/cloudfoundry-community/newrelic-boshrelease)
- [New Relic #2](https://github.com/18F/cg-newrelic-boshrelease)
- [Riemann](https://github.com/18F/cg-riemann-boshrelease)
- [riemannc](https://github.com/18F/cg-riemannc-boshrelease)
- [SecureProxy](https://github.com/18F/cg-secureproxy-boshrelease)
- [Snort](https://github.com/18F/cg-snort-boshrelease)
- [Ubuntu hardening](https://github.com/18F/cg-harden-boshrelease)
- [Tripwire](https://github.com/18F/cg-tripwire-boshrelease)

Service brokers:

- [RDS #1](https://github.com/cloudfoundry-community/rds-broker)
- [RDS #2](https://github.com/18F/aws-broker)
- [CDN (CloudFront and Let's Encrypt)](https://github.com/18F/cf-cdn-service-broker)
- [Kubernetes](https://github.com/18F/kubernetes-broker)
- [UAA credentials](https://github.com/cloudfoundry-community/uaa-credentials-broker)
- [S3](https://github.com/cloudfoundry-community/s3-broker)

Configuration/deployment support:

- [Infrastructure provisioning and deployment](https://github.com/18F/cg-provision)
- [Common Concourse pipeline tasks](https://github.com/18F/cg-pipeline-tasks)
- [Common Concourse resource](https://github.com/18F/cg-common-resource)
- [Bootstrap Concourse AMI](https://github.com/18F/cg-bootstrap-concourse-ami)

Deployment pipelines:

- [Abacus](https://github.com/18F/cg-deploy-abacus)
- [Admin user interface](https://github.com/18F/cg-deploy-admin-ui)
- [AWS light stemcell images](https://github.com/18F/cg-deploy-aws-light-stemcell-builder)
- [BOSH](https://github.com/18F/cg-deploy-bosh)
- [Bots](https://github.com/18F/cg-deploy-bots)
- [Cloud Foundry](https://github.com/18F/cg-deploy-cf)
- [Concourse](https://github.com/18F/cg-deploy-concourse)
- [Concourse task Docker image](https://github.com/18F/cg-deploy-concourse-docker-image)
- [Diego](https://github.com/18F/cg-deploy-diego)
- [Discourse](https://github.com/18F/cg-deploy-discourse)
- [ELK/logsearch](https://github.com/18F/cg-deploy-logsearch)
- [Fugacious](https://github.com/18F/cg-deploy-fugacious)
- [InfluxDB firehose nozzle](https://github.com/18F/cg-deploy-influxdb-firehose-nozzle)
- [Kubernetes](https://github.com/18F/cg-deploy-kubernetes)
- [Monitoring](https://github.com/18F/cg-deploy-monitoring)
- [Nessus Manager](https://github.com/18F/cg-deploy-nessus-manager)
- [Riemann firehose nozzle](https://github.com/18F/cg-deploy-riemann-firehose-nozzle)
- [RDS broker](https://github.com/18F/cg-deploy-rds-broker)
- [S3 broker](https://github.com/18F/cg-deploy-s3-broker)
- [Shibboleth](https://github.com/18F/cg-deploy-shibboleth)

Metadata for our team, such as issues, checklists, and other documents:

- [Agent Q theme work](https://github.com/18F/cg-agent-q)
- [Atlas theme work](https://github.com/18F/cg-atlas)
- [Design work](https://github.com/18F/cg-design)
- [Policies and procedures](https://github.com/18F/compliance-docs)
- [Postmortems](https://github.com/18F/cg-postmortems)
- [Product work](https://github.com/18F/cg-product)

Collections of scripts for our team:

- [Scripts](https://github.com/18F/cg-scripts)

Optional code offered to our team and customers:

- [Hello world apps](https://github.com/18F/cf-hello-worlds)
- [Notifications plugin for Hubot](https://github.com/18F/hubot-cf-notifications)
- [Redirect app](https://github.com/18F/cf-redirect)
- [Fake UAA for testing](https://github.com/18F/cg-fake-uaa)

Optional Cloud Foundry CLI plugins offered to our team and customers:

- [Route lookup](https://github.com/18F/cf-route-lookup)
- [Service connection](https://github.com/18F/cf-service-connect)

## Public domain

All components by the cloud.gov team (or other parts of 18F) are in the worldwide [public domain](https://github.com/18F/cg-site/blob/master/LICENSE.md). As stated in [CONTRIBUTING](https://github.com/18F/cg-site/blob/master/CONTRIBUTING.md) for our components:

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.

Components based on work from other people may be in the public domain or have various open source licenses. All license details for each component are listed in the LICENSE file for that repository.
