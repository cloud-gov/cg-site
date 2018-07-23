---
menu:
  docs:
    parent: design
layout: ops

title: Secrets Management
---

* Problems with the status quo:
    * Generation:
        * We don't have an up-to-date list of secrets and how to generate them.
        * Some secrets are generated via [scripts](https://github.com/18F/cg-secret-rotation), others by hand.
    * Storage:
        * We store secrets differently for BOSH and Concourse.
        * We have to pull down secrets locally to update Concourse pipelines.
        * Secrets are duplicated to multiple locations and have to be kept in-sync.
* Goals:
    * Single source of truth for each secret.
    * BOSH and Concourse can read from same secret store.
    * Secrets are programmatically generated where possible.
    * Secrets are programmatically rotated where possible.
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
              
            * Copy creds from master-CredHub?
    * Architecture (Pros and Cons):
      * Credhub per BOSH deployment (5 Credhubs--dev, stage, prod, tooling, master):
            * Pros:
                - Namespacing is simpler, less state to encode into Bosh deployments
                - Risk of failure or comprise is distributed.
                - It's a common pattern (especially in the exemplar of BUCC)
                - If we ever choose to adopt BUCC (since many use it locally for development), this will offer the path of least resistance
            * Cons:
                - Maintenance heavy, five different servers to update/fail.
                - Propogating common secrets
                - Will require copying common creds across multiple environments (eg Bosh creds)
      * Single HA Credhub for all deployments:
            * Pros:
                - One source of truth
                - Easier to maintain
            * Cons:
                - It could be a single point of failure.


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
  * In order to have confidence that we've enumerated all BOSH creds, we want to convert all BOSH manifests to ops-file/var-file format (deploy-bosh is gross, many others are already done). (mostly done)
  * In order to reduce the operator burden of manipulating BOSH secrets, we want to remove redundant encryption of BOSH secrets stemming from when we didn't have dedicated AWS accounts. (done)

We'll groom these ASAP:
  * Detangle shared secrets between environments
  * Improve promotion strategy (eg separate blob store per environment)
  * Detangle shared secrets between BOSH and Concourse (eg replace Concourse cred-handling pipelines with Bosh errands?)
  * Put a CredHub in each environment
  * (For all X) get secrets for X in CredHub <-- These stories already exists
  * Put a Concourse in each environment
  * Deprecate our clever+cool but bespoke jumpbox in favor of the stock one
