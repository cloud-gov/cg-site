---
menu:
  docs:
    parent: apps
title: GovCloud guide
---

cloud.gov currently has two "environments" where orgs can live: the legacy East/West environment (located in AWS East/West) and the main GovCloud environment (located in [AWS GovCloud](https://aws.amazon.com/govcloud-us/)). The cloud.gov [FedRAMP JAB P-ATO]({{< relref "overview/security/fedramp-tracker.md" >}}) only covers the GovCloud environment.

**For new users:** All new sandboxes and orgs are in the GovCloud environment, so if you just started using cloud.gov, follow the GovCloud instructions throughout the cloud.gov documentation.

**For teams migrating to GovCloud:** If you've been using cloud.gov for a while, you and your team may have already migrated your orgs and applications to GovCloud, or you may still be in the process of migrating. This page explains changes to look out for in GovCloud.

### Documentation for East/West and GovCloud

cloud.gov documentation has different instructions for East/West and GovCloud users in many places, especially for [logging into the command line interface and dashboard]({{< relref "docs/getting-started/setup.md" >}}). You'll see the following notation:

{{% govcloud %}}
GovCloud-specific information
{{% /govcloud %}}

### Breaking changes in GovCloud

- GSA, EPA and FDIC accounts already work in GovCloud. Others need to be explicitly [invited](https://account.fr.cloud.gov/invite).
- The API endpoint (for now) is `api.fr.cloud.gov`. When you [log in on the command line]({{< relref "docs/getting-started/setup.md" >}}), use this new command: `cf login -a https://api.fr.cloud.gov --sso`
- To access the Dashboard, visit [`https://dashboard.fr.cloud.gov/`](https://dashboard.fr.cloud.gov/).
- There are different names and plans for some services.

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

### Tips

- If you need to work in both the East/West and GovCloud environments, [this Cloud Foundry plugin](https://github.com/guidowb/cf-targets-plugin) may be helpful.

### Migration

As part of [cloud.gov achieving FedRAMP authorization](https://18f.gsa.gov/2016/07/18/cloud-gov-full-steam-ahead-fedramp-assessment-process/), all tenants in the AWS East/West will need to move to the new GovCloud environment. **March 15th is the deadline** for moving to the new GovCloud environment.

#### Who this affects

Any systems running in the AWS East/West version of cloud.gov. To find all of the apps you have access to, visit https://dashboard.cloud.gov. All apps that aren't moved by March 15th **will be deleted,** so make sure that you or someone on your team [coordinates]({{< relref "docs/help.md" >}}) with the cloud.gov team to ensure your migration is completed as smoothly as possible.

#### Costs

For [resource usage]({{< relref "overview/pricing/rates.md" >}}), we will bill East/West usage until your migration is complete, then switch to billing GovCloud usage. In other words, you will not be double-charged while migrating.

The cloud.gov team estimates that **migrating a single "system" should take between one hour and one week** of developer time, depending on:

* For the developer(s) handling the move:
    * Level of cloud.gov experience
    * Familiarity with the architecture of the system
* Complexity of the architecture
* Whether the system is already following the [deployment best practices]({{< relref "docs/apps/production-ready.md" >}})
* If the system is using one or more databases/[services]({{< relref "docs/apps/managed-services.md" >}})
* The [availability](https://simple.wikipedia.org/wiki/Availability) requirements of your system
    * How big of a deal is it if your system goes down for a few minutes? or an hour or more?

Any labor involved from your project team is the responsibility of your project. There is no additional charge for support from the cloud.gov team assisting your developers with the migration.

#### Process

1. [Get access to the GovCloud environment](https://account.fr.cloud.gov/signup).
1. Request the creation of your org in the GovCloud environment:
    * If you are in 18F/TTS at GSA, fill out the [organization request form](https://docs.google.com/a/gsa.gov/forms/d/e/1FAIpQLSd4HmcGfJW3EBnpewTFDD-urRFPp1LN0DcwNB_FxZgUn8ho9g/viewform?c=0&w=1). Specify that the org should be created in `GovCloud`. An admin will confirm the information, [create the org]({{< relref "docs/ops/create-org.md#non-sandboxes" >}}) for you, and notify you. This should happen within one business day.
    * For everyone else, one of your org managers should email [cloud-gov-support@gsa.gov](mailto:cloud-gov-support@gsa.gov?subject=[GovCloud%20Org%20Request]?body=The%20name%20of%20my%20East/West%20org%20is:) to request the creation of your org in GovCloud. Please include "[GovCloud Org Request]" in the subject heading and specify the name of your current East/West org.
1. Install the [CF Targets plugin](https://github.com/guidowb/cf-targets-plugin).
1. [Give permissions to the appropriate people.]({{< relref "docs/apps/managing-teammates.md" >}})
1. Deploy the application to the GovCloud environment.
    * This is a good time to ensure that you are following [deployment best practices]({{< relref "docs/apps/production-ready.md" >}}).
1. If you are using a data store provided by cloud.gov, migrate the data. See the [services documentation]({{< relref "docs/apps/managed-services.md" >}}). For MySQL and PostgreSQL, you can use [the cg-migrate-db plugin]({{< relref "docs/services/relational-database.md#cg-migrate-db-plugin" >}}).
1. If you are [leveraging cloud.gov's User Account and Authentication (UAA) server]({{< relref "docs/apps/leveraging-authentication.md" >}})
   you must [register your application with the GovCloud UAA server]({{< relref "docs/apps/leveraging-authentication.md#register-your-application-instances" >}}), [update your integration to use the GovCloud endpoints]({{< relref "docs/apps/leveraging-authentication.md#integrate-with-your-application" >}}) and make sure to use your newly issued `client_secret`.
1. Test the new deployment(s) thoroughly.
1. [Set up your custom domain]({{< relref "docs/apps/custom-domains.md#managed-service-method" >}}), if applicable.
1. [Set up continuous deployment.]({{< relref "docs/apps/continuous-deployment.md" >}}) (Not required, but strongly recommended.)
1. Once you are confident that the move is complete, [ask support]({{< relref "docs/help.md" >}}) to delete the old resources. Some might not be applicable.
    * [Elastic Load Balancers](https://aws.amazon.com/elasticloadbalancing/)
    * Organizations
    * [Quotas]({{< relref "overview/pricing/quotas.md" >}})
    * [RDS](https://aws.amazon.com/rds/) instances
    * [Route 53](https://aws.amazon.com/route53/) entries
    * [S3](https://aws.amazon.com/s3/) buckets
