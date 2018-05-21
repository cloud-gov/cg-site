---
menu:
  docs:
    parent: design
layout: ops
---

* Problems with the status quo
    * Generation
        * We don't have an up-to-date list of secrets and how to generate them
        * Some secrets are generated via [scripts](https://github.com/18F/cg-secret-rotation), others by hand
    * Storage
        * We store secrets differently for BOSH and Concourse
        * We have to pull down secrets locally to update Concourse pipelines
        * Secrets are duplicated to multiple locations and have to be kept in sync
* Goals
    * Single source of truth for each secret
    * BOSH and Concourse can read from same secret store
    * Secrets are programmatically generated where possible
    * Secrets are programmatically rotated where possible
* Approach: Credhub
    * Integrates with BOSH (via config server api) and Concourse
    * Supports credential generation and rotation
    * De facto standard for Pivotal products
    * Questions
        * Topology
            * Single shared Credhub per AWS account
            * Colocate Credhub on each BOSH Director / Concourse ATC; shared database
            * Separate Credhub and database for each BOSH Director / Concourse ATC
        * Secret paths
            * BOSH paths: `/$director/$deployment/$secret` or absolute path
            * Concourse paths: `/$team/$pipeline/$secret`; `$team/$secret`; no absolute path
                * https://github.com/concourse/atc/pull/273
            * For secrets shared between BOSH and Concourse
                * Copy secrets to multiple paths within a single Credhub (bad)
                * Copy secrets to multiple paths across multiple Credhubs (bad)
                * Store secrets in Concourse; use absolute paths in BOSH (bad)
                    * Secret path: `/concourse/main/secret`
                    * Access from Concourse: `secret`
                    * Access from BOSH: `/concourse/main/secret`
        * Bootstrap
            * Where do the Credhub creds live?
            * How to deploy services betfore Credhub exists?
            * Copy creds from master-Credhub?

* Links
    * https://docs.cloudfoundry.org/credhub/
    * https://concourse-ci.org/creds.html#credhub

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
