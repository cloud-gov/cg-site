---
menu:
  docs:
    parent: apps
title: GovCloud guide
---

cloud.gov has consolidated to one "environment" where orgs can live: GovCloud (located in [AWS GovCloud](https://aws.amazon.com/govcloud-us/)). The cloud.gov [FedRAMP JAB P-ATO]({{< relref "overview/security/fedramp-tracker.md" >}}) only covers the GovCloud environment.

### Breaking changes in GovCloud

- GSA, EPA and FDIC accounts already work in GovCloud. Others need to be explicitly [invited](https://account.fr.cloud.gov/invite).
- The API endpoint (for now) is `api.fr.cloud.gov`. When you [log in on the command line]({{< relref "docs/getting-started/setup.md" >}}), use this new command: `cf login -a https://api.fr.cloud.gov --sso`
- To access the Dashboard, visit [`https://dashboard.fr.cloud.gov/`](https://dashboard.fr.cloud.gov/).
- If you previously used the East/West environment, you'll want to know the different names and plans for some services in GovCloud:

    | AWS East/West service name | AWS GovCloud equivalent |
    | --- | --- |
    | `elasticsearch-swarm-*` | `elasticsearch*` |
    | `rds` | `aws-rds` |
    | `redis*-swarm` | `redis*` |
    
- There is a small set of differences between the older "Warden/DEA" backend (used for the AWS East/West environment) and the newer "Diego/cells" backend (used for the AWS GovCloud environment). Review the [Diego migration guide](https://docs.cloudfoundry.org/running/apps-enable-diego.html#disable-health-checks) for minor changes you may need to make before migrating, and [check for common issues](https://docs.cloudfoundry.org/running/apps-enable-diego.html#troubleshoot) if you run into a problem.

### New features

- To run [one-off tasks]({{< relref "docs/getting-started/one-off-tasks.md" >}}), [`cf-ssh`]({{< relref "docs/apps/using-ssh.md#east-west-environment-cf-ssh" >}}) is not available in GovCloud. Instead, you can use [`cf ssh`]({{< relref "docs/apps/using-ssh.md#govcloud-environment-cf-ssh" >}}) (note the space instead of the `-`), which is more flexible than `cf-ssh`.
- To set up custom domains, you can use the [managed service method]({{< relref "docs/apps/custom-domains.md#managed-service-method" >}}).
- Elasticsearch 2.4 is available.
    - If you're using 1.7, it's recommended that you upgrade, since 1.7 hits [end of life](https://www.elastic.co/support/eol) on January 6, 2017. [Read about the breaking changes.](https://www.elastic.co/guide/en/elasticsearch/reference/2.0/breaking-changes-2.0.html)

#### Experimental new features

- You can [require cloud.gov authentication to access your application]({{< relref "docs/apps/experimental/experimental-services.md#authorization-proxy" >}}).
- You can [push Docker images]({{< relref "docs/apps/experimental/docker.md" >}}).
