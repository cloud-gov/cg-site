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
that it would leverage to store its data.

##### Pros

* Co-located BOSH and CredHub
* BOSH deployments within this director can read from CredHub.

##### Cons

* Co-location with BOSH would require maintenance of multiple CredHub
  deployments and databases for each BOSH director the cloud.gov operations team
  deploys

#### CredHub high-availability deployment per VPC


#### CredHub high-availability single deployment


#### Concourse and CredHub co-location

* Approach: CredHub
    * Integrates with BOSH (via config server API) and Concourse.
    * Supports credential generation and rotation.
    * De facto standard for Pivotal products.
    * Questions:
        * Topology:
            * Single shared CredHub per AWS account.
            * Colocate CredHub on each BOSH Director / Concourse ATC; shared database.
            * Separate CredHub and database for each BOSH Director / Concourse ATC.
        * Secret paths:
            * BOSH paths: `/$director/$deployment/$secret` or absolute path.
            * Concourse paths: `/$team/$pipeline/$secret`; `$team/$secret`; no absolute path.
                * https://github.com/concourse/atc/pull/273
            * For secrets shared between BOSH and Concourse.
                * Copy secrets to multiple paths within a single CredHub (bad).
                * Copy secrets to multiple paths across multiple CredHubs (bad).
                * Store secrets in Concourse; use absolute paths in BOSH (bad).
                    * Secret path: `/concourse/main/secret`.
                    * Access from Concourse: `secret`.
                    * Access from BOSH: `/concourse/main/secret`.
        * Bootstrap:
            * Where do the CredHub creds live?
              * CredHub credentials live in S3 where secrets live now. These
                would be secrets used to deploy CredHub during the first
                deployment.
            * How to deploy services before CredHub exists?
              * I'm (jcc) not sure what this question is asking.  But  if it's asking how do you do deploy something before its credentials exist in credhub -- if there is a variables block defined, Credhub will generate them.
            * Copy creds from master-CredHub?
    * Architecture:
      * DEFINE IT HERE


* Links
    * https://docs.cloudfoundry.org/credhub/
    * https://concourse-ci.org/creds.html#credhub
    * https://cloud.gov/docs/ops/runbook/credhub-import

---
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
