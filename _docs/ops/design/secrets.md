---
parent: design
layout: ops

layout: docs
sidenav: true
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

## Proposed Architecture

The cloud.gov operations team is proposing to leverage BOSH + CredHub
co-location.

[The strategy suggested by the CredHub maintainers][cf-slack] is to leverage
co-located CredHub deployments with BOSH and to not allow BOSH directors to
communicate with a shared CredHub instance. This means that cloud.gov operators
will be moving forward with a [CredHub co-located deployment][bosh-colo] within
each BOSH director.

[cf-slack]: https://cloudfoundry.slack.com/archives/C3EN0BFC0/p1532382357000186?thread_ts=1532358425.000099&cid=C3EN0BFC0
[bosh-colo]: #bosh-and-credhub-co-location

The cloud.gov operations team will begin importing existing secrets into CredHub
and removing BOSH `vars` files from the interpolate commands in the current BOSH
deployment pipelines.

### BOSH and CredHub co-location

This strategy co-locates a CredHub within the BOSH virtual machine per
environment. This solution means that CredHub would have a single database
that it would leverage to store its data for its specific BOSH director.

{% mermaid_diagram id-prefix="colocated-diagram" %}
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
{% endmermaid_diagram %}

#### Pros

* Co-located BOSH and CredHub
* BOSH deployments within this director can read from CredHub.
* Namespacing is simpler, less state to encode into BOSH deployments
  * For example, you don't need to name the BOSH deployment and credentials
    would exist only for their own environment.
* Risk of failure or comprise is distributed.
* It's a common pattern (especially in the exemplar of BUCC)

#### Cons

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

### General CredHub, Concourse, BOSH concerns

The following pros and cons are based on general concerns related to BOSH,
Concourse, and CredHub.

#### Pros

* CredHub managing secrets alleviates developer headaches around secrets
  generate, rotation, and storage.
* There would be a single interface for secrets management for BOSH deployments
  using the `credhub-cli`.
* cloud.gov operators can create documented process, automation, and tooling
  around importing, setting, generating, and rotating credentials.

#### Cons

* Concourse uses paths that are different from BOSH paths, or arbitrary paths
  cloud.gov operators can define, with no desire to change this functionality.
    * BOSH paths: `/$director/$deployment/$secret` or absolute path.
    * Concourse paths: `/$team/$pipeline/$secret`; `$team/$secret`; no absolute path.
        * Closed pull-request: https://github.com/concourse/atc/pull/273

## Bootstrapping CredHub

Deploying anything before there is a CredHub available on the BOSH director
you're deploying to requires you to deploy CredHub manually using established
`operations` and `variables` files that leverage BOSH interpolate.

### Generating import file

To ease the import of secrets into a fresh deployment of CredHub, take the
`common/secrets.yml` file run [it through Pivotal's `vars-to-credhub`
tool](https://github.com/pivotalservices/vars-to-credhub).

> Note that `vars-to-credhub` only supports valid CredHub variable types. If the
> tool errors on the YAML structure of the secrets file, refer to the
> documentation below on [CredHub variable types](#credhub-variable-types)

Get the name from the BOSH director using `bosh environment`.

```sh
$ bosh environment --tty | grep Name | awk '{ print $2 }'
```
Get the name of the deployments available in BOSH by using `bosh deployments`.

```sh
bosh deployments --column=Name
```

```sh
prefix="/${bosh-director-name}/${bosh-deployment-name}";
vars-to-credhub \
  --prefix "${prefix}" \
  --vars-file tmp/path-to/common-secrets-file.yml > \
credhub-import-${bosh-director-name}-${bosh-deployment-name}.yml
```

cloud.gov operators inspect the `credhub-import-*` file for types and names that
are referenced in BOSH operation files, BOSH variable files, or upstream
manifest partials. Keep in mind names that are not prefixed by a forward-slash
`/` will be converted by BOSH before being looked up in CredHub with a prefix of
`/${bosh-director-name}/${bosh-deployment-name}/`.

To transfer the file from a cloud.gov operator's local machine to a jumpbox,
cloud.gov operators leverage the `s3://cloud-gov-varz` bucket to temporary
upload `credhub-import-*` files to be downloaded from within a jumpbox using
the cloud.gov operator's AWS credentials using ephemeral environmental variables
using the `aws-cli`.

```sh
aws s3 cp tmp/credhub-import-file.yml s3://cloud-gov-varz/credhub-import-file.yml --sse AES256
```

cloud.gov operators ensure that these credentials are not saved on the jumpbox
nor in the shell's `history` by preceding the commands with a single space ` `
to prevent it being saved in `history`.

```sh
 AWS_DEFAULT_REGION=us-gov-west-1 \
AWS_ACCESS_KEY_ID=${operator-access-key-id} \
AWS_SECRET_ACCESS_KEY= ${operator-secret-access-key} \
aws s3 cp s3://cloud-gov-varz/credhub-import-file.yml tmp/credhub-import-file.yml
```

With the file locally in the jumpbox, you can then import it using the
`credhub-cli`.

```sh
credhub import \
  -f credhub-import-${bosh-director-name}-${bosh-deployment-name}.yml
```

Once this file is successfully imported into CredHub, cloud.gov operators will
delete the `credhub-import-*` file from the `s3://cloud-gov-varz/` bucket.

```sh
aws s3 rm s3://cloud-gov-varz/credhub-import-file.yml
```

#### CredHub variable types

CredHub only [supports specific
types](https://docs.cloudfoundry.org/credhub/credential-types.html#cred-types).
If a cloud.gov operator needs to store a different type of credential, such as
an array. It's required to modify the structure of the manifest using an opsfile
and storing the key of the array in the CredHub database. An generic example is
described below:

```yaml
  - name: nfstestserver
    release: nfs-volume
    properties:
      nfstestserver:
        # value stored in secrets file as an array
        export_volumes: ((nfstestserver-volumes))
```

Modify the manifest using an opsfile so that the secret included the
`export_volumes` property in the value.

```yaml
  - name: nfstestserver
    release: nfs-volume
    properties:
      nfstestserver: ((nfstestserver-volumes))

```

This credential will then be stored in CredHub as a JSON type.

```sh
credhub set \
  -n /bosh/deploy/nfstestserver-volumes \
  -t json \
  -v '{ "export_volumes": [ "val1", "val2" ] }'
```

When it is retrieved from CredHub it will be a YAML array with a key of
`export_volumes`.

#### Handling dependencies among deployments with CredHub

With a co-located CredHub for every BOSH director, different deployments within
the same BOSH director may not run into namespacing issues requiring different
variable files to update manifests across environments. It is possible though
that there will be issues with credentials that flow through various
deployments.

A prime example of a dependency across deployments are Cloud Foundry UAA clients
defined in the deployment of Cloud Foundry in each environment. These
deployments normally do not have a prefix `/` slash in their name. This means
that they would be looked up in CredHub by the BOSH director adding a prefix of
`/${director}/${deployment}/${variable-name}`. [See the documentation here](https://github.com/cloudfoundry-incubator/credhub/blob/master/docs/bosh-config-server.md#namespacing).

This means for the cloud.gov Cloud Foundry deployments, there would be three
different variable look ups in each respective CredHub deployment for
variables without a prefix which requires different variable files for each
environment cloud.gov operators deploy:

```sh
/bosh/cf-development/cdn-broker-client-secret
/bosh/cf-staging/cdn-broker-client-secret
/bosh/cf-production/cdn-broker-client-secret
```

In order to avoid the need to create variable files for deployments in different
environments, the cloud.gov operations team will leverage custom absolute paths
for dependencies across different deployments. This requires manifests to be
modified from their previous variable names without a prefix `/` slash to the
new customer absolute path.

```sh
/cf/clients/cdn-broker-client-secret
```

This custom absolute path is best described as:

```sh
/${generalized-deployment-name}/${type}/${original-secret-name}`
```

- `${generalized-deployment-name}` would be the name of the BOSH deployment
  without an environment.
- `${type}` would be the type of credential respective of the
  deployment name, e.g. `clients` for a Cloud Foundry deployment.
- `${original-secret-name}` would be the original name of the secret being moved
  over to this custom absolute path.

The `${generalized-deployment-name}` should be named after the producer of the
secret, e.g. where the secret is set or configured. In the case of Cloud Foundry
UAA client secrets, it's the `cf` deployment name. Consumers of the credential
should never be considered for the `${generalized-deployment-name}`. In order to
create a custom absolute path for a credential, cloud.gov operators must
understand the consumer/producer relationship of the dependencies of the
software they're deploying.

### Deploying services before CredHub credentials exist

> To Be Decided

## Rotating secrets

> To Be Decided

### cloud.gov Operator Tooling

> To Be Decided

## Pertinent Links

* https://docs.cloudfoundry.org/credhub/
* https://concourse-ci.org/creds.html#credhub

<!--
* {{ site.baseurl }}/docs/ops/runbook/credhub-import
-->

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

