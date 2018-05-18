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
    * BOSH and Concourse can read from samae secret store
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
