---
menu:
  docs:
    parent: design
layout: ops

title: Secrets Management
---

## Problems with the status quo

Some secrets are currently generated via [scripts][cg-secrets], others by hand.
Operators also don't have an up-to-date list of secrets and how to generate
them.

For storage, operators store secrets for BOSH and Concourse as variable files.
Operators pull down secrets from S3 locally to update Concourse pipelines.
Operators also have Concourse pull down secrets as [pipeline tasks][cg-pipeline]
to use with BOSH interpolate. Because of these manual processes, secrets are
duplicated to multiple locations, e.g.  Concourse credential files and BOSH
secrets, and have to be kept in-sync.

[cg-pipeline]: https://github.com/18F/cg-pipeline-tasks
[cg-secrets]: https://github.com/18F/cg-secret-rotation

## Goals for secrets management

Goals the cloud.gov team wants in a secrets management solution:

* Single source of truth for each secret.
* BOSH and Concourse can read from same secret store.
* Secrets are programmatically generated where possible.
* Secrets are programmatically rotated where possible.

## Proposed Approach

The proposed approach is it to use [CredHub][gh-credhub]. The cloud.gov team has
several reasons to choose CredHub over other secrets management services.

* Integrates with BOSH (via config server API) and Concourse.
* Supports credential generation and rotation.
* De-facto standard for Pivotal products.

[gh-credhub]: https://github.com/cloudfoundry-incubator/credhub

### Proposed Architecture

There are three major architecture proposals that the cloud.gov operations team
is considering. These architecture decisions are outlined below with pros and
cons for each type of CredHub deployment strategy.

#### BOSH and CredHub co-location

This strategy co-locates a CredHub within the BOSH virtual machine per
environment. This solution means that CredHub would have a single database
that it would leverage to store its data for its specific BOSH director.

{{< diagrams id-prefix="colocated-diagram" >}}
graph LR;
  master[Master BOSH + CredHub]
  tooling[Tooling BOSH + CredHub]
  development[BOSH + CredHub]
  staging[BOSH + CredHub]
  production[BOSH + CredHub]
  tooling-d[Deployments]
  production-d[Deployments]
  staging-d[Deployments]
  development-d[Deployments]

  subgraph Tooling VPC
    master-->|Interpolates from Master CredHub|tooling
    tooling-->|Interpolates from Tooling CredHub|tooling-d
  end
  subgraph Production VPC
    tooling-->production
    subgraph Production BOSH
      production
    end
    production-->|Interpolates from Production CredHub|production-d
  end
  subgraph Staging VPC
    tooling-->staging
    subgraph Staging BOSH
      staging
    end
    staging-->|Interpolates from Staging CredHub|staging-d
  end
  subgraph Development VPC
    tooling-->development
    subgraph Development BOSH
      development
    end
    development-->|Interpolates from Development CredHub|development-d
  end
{{< /diagrams >}}

##### Pros

* Co-located BOSH and CredHub
* BOSH deployments within this director can read from CredHub.
* Namespacing is simpler, less state to encode into BOSH deployments
  * For example, you don't need to name the BOSH deployment and credentials
    would exist only for their own environment.
* Risk of failure or comprise is distributed.
* It's a common pattern (especially in the exemplar of BUCC)

##### Cons

* Co-location with BOSH would require maintenance of multiple CredHub
  deployments and databases for each BOSH director the cloud.gov operations team
  deploys
  * This includes backup strategies for each of these CredHub deployments.
* Maintenance heavy, multiple deployments to update/fail.
* Propagating common secrets across deployments would still be a manual process
  * e.g. The root `bosh_ca_cert` for every deployment of CredHub.
* Doesn't solve for Concourse being in the Tooling VPC but deploying to
  other VPCs and needing credentials from each environment's VPC.
  * e.g. Concourse deploys to `tooling`, `development`, `staging`, `production`
    VPC
* [Concourse can only speak to a single API endpoint of
  CredHub][con-ch-api-url].

[con-ch-api-url]: https://concourse-ci.org/creds.html#credhub

#### CredHub high-availability deployment per VPC

In this strategy, CredHub would be deployed with high-availability as a separate
deployment using BOSH. It would only be able to communicate with BOSH within
its own VPC. e.g. `bosh-staging` using `credhub-staging` for credential
management for `bosh-staging` deployments. This is already very similar to
co-locating CredHub within the BOSH deployment.

{{< diagrams id-prefix="ha-vpc-diagram" >}}
graph LR;
  master[Master BOSH]
  tooling[Tooling BOSH]
  development[BOSH]
  staging[BOSH]
  production[BOSH]
  master-ch[Master CredHub Deployment]
  tooling-ch[Tooling CredHub Deployment]
  development-ch[CredHub Deployment]
  staging-ch[CredHub Deployment]
  production-ch[CredHub Deployment]
  tooling-d[Deployments]
  production-d[Deployments]
  staging-d[Deployments]
  development-d[Deployments]

  subgraph Tooling VPC
    master-->|Interpolates from Master CredHub|tooling
    master-->master-ch
    tooling-->tooling-ch
    tooling-->|Interpolates from Tooling CredHub|tooling-d
  end
  subgraph Production VPC
    tooling-->production
    subgraph Production BOSH
      production
    end
    production-->production-ch
    production-->|Interpolates from Production CredHub|production-d
  end
  subgraph Staging VPC
    tooling-->staging
    subgraph Staging BOSH
      staging
    end
    staging-->staging-ch
    staging-->|Interpolates from Staging CredHub|staging-d
  end
  subgraph Development VPC
    tooling-->development
    subgraph Development BOSH
      development
    end
    development-->development-ch
    development-->|Interpolates from Development CredHub|development-d
  end
{{< /diagrams >}}

##### Pros

* BOSH deployments within this director can read from CredHub.
* Name-spacing is simpler, less state to encode into BOSH deployments
  * For example, you don't need to name the BOSH deployment and credentials
    would exist only for their own environment.
* Risk of failure or comprise is distributed.

##### Cons

* Co-location with BOSH would require maintenance of multiple CredHub
  deployments and databases for each BOSH director the cloud.gov operations team
  deploys
  * This includes backup strategies for each of these CredHub deployments.
* Maintenance heavy, multiple deployments to update/fail.
* Propagating common secrets across deployments would still be a manual process.
  * e.g. The root `bosh_ca_cert` for every deployment of CredHub.
* Doesn't solve for Concourse being in the Tooling VPC but deploying to
  other VPCs and needing credentials from each environment's VPC.
  * e.g. Concourse deploys to `tooling`, `development`, `staging`, `production`
    VPC
* [Concourse can only speak to a single API endpoint of
  CredHub][con-ch-api-url].

[con-ch-api-url]: https://concourse-ci.org/creds.html#credhub

#### CredHub high-availability single deployment

The following strategy is a single CredHub deployment in the `tooling` VPC which
would be used by BOSH directors spread across all the other VPCs.

{{< diagrams id-prefix="ha-single-diagram" >}}
graph LR;
  master[Master BOSH]
  tooling[Tooling BOSH]
  development[BOSH]
  staging[BOSH]
  production[BOSH]
  credhub[CredHub Deployment]
  tooling-d[Deployments]
  production-d[Deployments]
  staging-d[Deployments]
  development-d[Deployments]

  subgraph Tooling VPC
    master-->|Interpolates from CredHub|tooling
    master-->credhub
    tooling-->|Interpolates from CredHub|tooling-d
    credhub-->tooling
  end
  subgraph Production VPC
    tooling-->production
    subgraph Production BOSH
      production
      credhub-->production
    end
    production-->|Interpolates from CredHub|production-d
  end
  subgraph Staging VPC
    tooling-->staging
    subgraph Staging BOSH
      staging
      credhub-->staging
    end
    staging-->|Interpolates from CredHub|staging-d
  end
  subgraph Development VPC
    tooling-->development
    subgraph Development BOSH
      development
      credhub-->development
    end
    development-->|Interpolates from CredHub|development-d
  end
{{< /diagrams >}}

##### Pros

* BOSH deployments within all VPCs can read from CredHub.
* A single CredHub deployment means that we could share certificates across
  various VPC deployments. e.g. The root CA cert cloud.gov uses to generate
  additional certificates.
* A single database to backup.
* The root `bosh_ca_cert` would exist in a single CredHub.
* Single deployment to maintain/update/operate.

##### Cons

* Single point of failure
  * cloud.gov operators have no way to test credentials outside of the single
    CredHub deployment.
* It would require a connection from `development`, `staging`, and `production`
  VPCs to communicate with the `tooling` VPC.
* Name-spacing of credentials would need to exist in order to prevent collisions
  with similar credentials across various deployments.

#### General CredHub, Concourse, BOSH



The following pros and cons aren't based on any particular deployment strategy.

##### Pros

* CredHub managing secrets would alleviate developer headaches around secrets
  generate, rotation, and storage.
* There would be a single interface for secrets management for BOSH deployments
  using the `credhub-cli`.
* cloud.gov operators can create documented process, automation, and tooling
  around importing, setting, generating, and rotating credentials.

##### Cons

* Concourse uses paths that are different from BOSH paths, or arbitrary paths
  cloud.gov operators can define, with no desire to change this functionality.
    * BOSH paths: `/$director/$deployment/$secret` or absolute path.
    * Concourse paths: `/$team/$pipeline/$secret`; `$team/$secret`; no absolute path.
        * Closed pull-request: https://github.com/concourse/atc/pull/273

## Bootstrapping CredHub

Today bootstrapping CredHub would require a manual deployment of CredHub into
our environment. Whichever strategy cloud.gov operators use, they would rely on
BOSH interpolate and ops/vars files stored in S3. These files would also be
leveraged to store the credentials required to maintain CredHub such as the
encryption key to decrypt the data in CredHub.

### Deploying services before CredHub credentials exist

This is an issue when deploying credentials that cannot be automatically
generated by CredHub, such as URLs or arbitrary JSON or values. These values
would need to be set in CredHub ahead of time before BOSH deploys the service.

## Next Steps

[The strategy suggested by the CredHub maintainers][cf-slack] is to leverage
co-located CredHub deployments with BOSH and to not allow BOSH directors to
communicate with a shared CredHub instance. This means that cloud.gov operators
will be moving forward with a [CredHub co-located deployment][bosh-colo] within
each BOSH director.

### cloud.gov Operator Tooling

CredHub operations will require particular tooling around importing and
exporting credentials with CredHub. Some of our common secrets shared across
deployments will need to be manually synchronized across various CredHub
deployments.

https://github.com/18f/cg-scripts/tree/master/credhub/import.sh
https://github.com/18f/cg-scripts/tree/master/credhub/export.sh

[cf-slack]: https://cloudfoundry.slack.com/archives/C3EN0BFC0/p1532382357000186?thread_ts=1532358425.000099&cid=C3EN0BFC0
[bosh-colo]: #bosh-and-credhub-co-location

## Pertinent Links

* https://docs.cloudfoundry.org/credhub/
* https://concourse-ci.org/creds.html#credhub
* https://cloud.gov/docs/ops/runbook/credhub-import

<!---
We had a meeting on 5/21/2018. Some decisions we made:

* We agreed that deploying a CredHub per environment was not a bad thing to do first.
* We think if there's a CredHub per environment, it may not make sense to expose prefix/suffix/location/path differences as something pipelines and manifests have to concern themselves with. But whatever we do, we want it to be consistent so that onboarding is easier and everyone has confidence where to find stuff.

Generally everything else felt too big and scary and there are too many unknowns and tangled dependencies and tech debt to jump right on CredHub. So, we're going to do some smaller, more tractable stuff to detangle things first.

* Proto-backlog:
  * In order to have confidence that we've enumerated all BOSH creds, we want to convert all BOSH manifests to ops-file/var-file format (deploy-bosh is gross, many others are already done).
  * In order to reduce the operator burden of manipulating BOSH secrets, we want to remove redundant encryption of BOSH secrets stemming from when we didn't have dedicated AWS accounts.

We'll groom these ASAP:
  * Detangle shared secrets between environments
  * Improve promotion strategy (eg separate blob store per environment)
  * Detangle shared secrets between BOSH and Concourse (eg replace Concourse cred-handling pipelines with Bosh errands?)
  * Put a CredHub in each environment
  * (For all X) get secrets for X in CredHub <-- These stories already exists
  * Put a Concourse in each environment
  * Deprecate our clever+cool but bespoke jumpbox in favor of the stock one
-->

