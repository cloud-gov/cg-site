---
menu:
  docs:
    parent: operations
layout: ops
title: Secrets Dependencies
---

This page exists to contain the secrets documentation for the dependencies
across all of our deployments. As more of our secrets are automated, they will
be address / removed from this age as resolved.

### Certificate dependencies

{{< diagrams id-prefix="certificates-depending-on-single-root-certificate" >}}
graph TB;
    %% ID Definition

    s3(s3://cloud-gov-varz)
    pipelines(Concourse Pipelines)

    subgraph Root CA Certificates
      ca_cert[Root CA Certificate]
      pipelines_resource_bosh-deployment("`resource: bosh-deployment`")
      deployments(Bosh Deployment Manifest)
      deployments_bosh(Bosh)
      deployments_cf(Cloud Foundry)
      deployments_diego(Diego)
      deployments_k8s(Kubernetes)
      deployments_ls(Logsearch)
    end
    subgraph Bosh Director Certificates
      bosh_director_cert[Bosh Director Certificate]
      pipelines_resource_cg-common("`resource: cg-common`")
    end

    %% Chart definition

    ca_cert --> deployments
    ca_cert --> pipelines
    ca_cert --> s3
    bosh_director_cert --> s3
    s3 --> pipelines
    deployments --> deployments_bosh
    deployments --> deployments_cf
    deployments --> deployments_diego
    deployments --> deployments_k8s
    deployments --> deployments_ls
    pipelines --> pipelines_resource_bosh-deployment
    pipelines --> pipelines_resource_cg-common

{{< /diagrams >}}

This chart represents the dependencies that rely on the single Root CA
certificate. These dependencies exist in BOSH deployment manifests and in
Concourse pipelines.

Any Concourse pipelines with a type of `bosh-deployment` all use the Root CA
certificate in the pipeline definition.
